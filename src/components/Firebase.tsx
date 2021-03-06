import app, { analytics, firestore, functions } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-functions';
import IUser from '../Interfaces/IUser'
import IUav from '../Interfaces/IUav'
import IPilot from '../Interfaces/IPilotLogs'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { trailSignSharp } from 'ionicons/icons'
import ILog from '../Interfaces/ILog'

const config = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    measurementId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

class Firebase {
    private auth:app.auth.Auth;
    private db:app.firestore.Firestore;

    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.db.enablePersistence()
    }

    //-------------------------------------------Firebase stuff-------------------------//
    getCurrentUser(){
        return new Promise((resolve:any, reject:any) => {

            const unsubscribe = this.auth.onAuthStateChanged(function(user) {
                if(user){
                    resolve(user)
                } else {
                    resolve(null)
                }
                unsubscribe()
            })

        })
        
    }

    async login(email:string, password:string) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout () {
        return await this.auth.signOut();
    }

    async register (name:string, email:string, password:string){
        await this.auth.createUserWithEmailAndPassword(email, password)
        await this.auth.currentUser?.updateProfile({
            displayName: name
        });
        return await this.db.collection("users").doc(this.auth.currentUser?.uid).set({
            full_name: name,
            icon_url: "null",
            accessible_UAVs: []

        });
    }

    async changeUserName (name:string){
        await this.auth.currentUser?.updateProfile({
            displayName: name
        });
        return await this.db.collection("users").doc(this.auth.currentUser?.uid).set({
            full_name: name,
        }, {merge: true});
    }

    getCurrentUserInfo(){
        let user:IUser = {
            name : this.auth.currentUser?.displayName!,
            email : this.auth.currentUser?.email!
        }

        return user;
    }

    async reAuthUser(email:string, password:string){
        var credentials = app.auth.EmailAuthProvider.credential(
            email,
            password
        );
        return await this.auth.currentUser?.reauthenticateWithCredential(credentials)
    }

    async deleteUser(){
        return await this.auth.currentUser?.delete();
    }

    async changeLoginEmail(email:string){
        return await this.auth.currentUser?.updateEmail(email);
    }

    async changePassword(pass:string){
        return await this.auth.currentUser?.updatePassword(pass);
    }

    //------------------------FiresStore Stuff---------------------------//

    //-------------------------------UAVs---------------------------------//

    async addUAV(name:string, operatorName:string, uavCode:string){
        return await this.db.collection("uavs").add({
            owner_id: this.auth.currentUser?.uid,
            icon_url: "null",
            name: name,
            owner_name: this.auth.currentUser?.displayName,
            operator_name: operatorName,
            uav_code: uavCode,
            shared_with: [this.auth.currentUser?.uid]
        });
    }

    getMyUAVs():Promise<Array<IUav>>{
        return new Promise((resolve:any, reject:any) => {
            var uavs:Array<IUav> = [];
            this.db.collection("uavs").where("shared_with", "array-contains", this.auth.currentUser?.uid)
            .get().then(querrySnapshot => {
            querrySnapshot.forEach(doc => {
                let data = doc.data();
                let uav:IUav = {
                    uavId : doc.id,
                    ownerName : data.owner_name === this.auth.currentUser?.displayName ? "You" : data.owner_name,
                    name : data.name,
                    operatorName: data.operator_name,
                    uavCode: data.uav_code,
                    sharedWith: data.shared_with,
                    iconUrl : data.icon_url
                };
                uavs.push(uav);
            });
        }).then(() => {
            if(uavs){
                resolve(uavs.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
            }
            else {
                resolve(null)
            }
        });

        })
        
    }

    getUAVbyId(id:string):Promise<IUav>{
        return new Promise((resolve:any, reject:any) => {
            this.db.collection("uavs").doc(id).get().then(dbUav => {
                let data = dbUav.data();
                let uav:IUav = {
                    uavId: id,
                    ownerName: data?.owner_name === this.auth.currentUser?.displayName ? "You" : data?.owner_name,
                    name: data?.name,
                    operatorName: data?.operator_name,
                    uavCode: data?.uav_code,
                    sharedWith: data?.shared_with,
                    iconUrl: data?.icon_url
                }
                
                if(uav){
                    resolve(uav)
                } else {
                    resolve(null)
                }
            }).catch(() => resolve(null))
        })
    }

    async changeUav(newName:string, newOpName:string, uavId:string){
        return await this.db.collection("uavs")
                    .doc(uavId)
                    .set({
            name: newName,
            operator_name: newOpName
        }, {merge: true});
    }

    async deleteUav(uavId:string){
        // TODO: Rework for multiuser
        return await this.db.collection("uavs").doc(uavId).delete()
    }

    //----------------------------------Pilots---------------------------//

    async addPilotLogs(name:string){
        return await this.db.collection("users")
                    .doc(this.auth.currentUser?.uid)
                    .collection("pilotLogs")
                    .add({
            name: name
        });
    }

    getPilots():Promise<Array<IPilot>>{
        return new Promise((resolve:any, reject:any) => {
            var logs:Array<IPilot> = [];
            this.db.collection("users")
            .doc(this.auth.currentUser?.uid)
            .collection("pilotLogs")
            .get().then(querrySnapshot => {
            querrySnapshot.forEach(doc => {
                let data = doc.data();
                let log:IPilot = {
                    logsFileId : doc.id,
                    name : data.name,
                };
                logs.push(log);
            });
        }).then(() => {
            if(logs){
                resolve(logs.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
            }
            else {
                resolve(null)
            }
        });

        }) 
    }
    async renamePilotLogs(newName:string, colId:string){
        return await this.db.collection("users")
                    .doc(this.auth.currentUser?.uid)
                    .collection("pilotLogs")
                    .doc(colId)
                    .set({
            name: newName
        }, {merge: true});
    }  

    async deletePilotLogs(colId:string){
        return await this.db.collection("users")
                    .doc(this.auth.currentUser?.uid)
                    .collection("pilotLogs")
                    .doc(colId).delete();
    }
    
//---------------------------------------------Logs-------------------------------------------//

    async newLog(tarUav:IUav, loggerId:string, date:string,
                 gps:string, duration:string, fType:string, sEvents:string){
        let ts = new Date();
        let logName = ts.toISOString();
        let singleName = [logName];

        let pilotLogsUpRef = this.db.collection("users")
                                    .doc(this.auth.currentUser?.uid)
                                    .collection("pilotLogs")
                                    .doc(loggerId);

        let uavLogsUpRef = this.db.collection("uavs")
                                  .doc(tarUav.uavId);

        await this.db.runTransaction(async tran => {
            await tran.get(pilotLogsUpRef).then(doc => {
                let subDoc:app.firestore.DocumentSnapshot<app.firestore.DocumentData>;
                doc.ref.collection("pilotLog")
                       .where("count", "<", 1000)
                       .get().then(querrySnapshot => {
                        querrySnapshot.forEach(document => (subDoc = document))
                }).then(() => {
                    if (!subDoc){
                        doc.ref.collection("pilotLog")
                        .add({
                            count: 1,
                            logs: singleName,
                            [logName]: {
                                date: date,
                                pilot_name: this.auth.currentUser?.displayName,
                                uav_code: tarUav.uavCode,
                                gps: gps,
                                flight_dur: duration,
                                flight_type: fType,
                                spec_events: sEvents
                            }
                        })
                    } else {
                        let newCount = subDoc.data()!.count + 1;
                        subDoc.ref.set({
                            count: newCount,
                            logs: firestore.FieldValue.arrayUnion(logName),
                            [logName]: {
                                date: date,
                                pilot_name: this.auth.currentUser?.displayName,
                                uav_code: tarUav.uavCode,
                                gps: gps,
                                flight_dur: duration,
                                flight_type: fType,
                                spec_events: sEvents
                            }
                        }, {merge: true})
                    }
                })
                
            });
            return await tran.get(uavLogsUpRef).then(doc => {
                let subDoc:app.firestore.DocumentSnapshot<app.firestore.DocumentData>;
                doc.ref.collection("uavLog")
                       .where("count", "<", 1000)
                       .get().then(querrySnapshot => {
                        querrySnapshot.forEach(document => (subDoc = document))
                }).then(() => {
                    if (!subDoc){
                        doc.ref.collection("uavLog")
                        .add({
                            count: 1,
                            logs: singleName,
                            [logName]: {
                                date: date,
                                pilot_name: this.auth.currentUser?.displayName,
                                uav_code: tarUav.uavCode,
                                gps: gps,
                                flight_dur: duration,
                                flight_type: fType,
                                spec_events: sEvents
                            }
                        })
                    } else {
                        let newCount = subDoc.data()!.count + 1;
                        subDoc.ref.set({
                            count: newCount,
                            logs: firestore.FieldValue.arrayUnion(logName),
                            [logName]: {
                                date: date,
                                pilot_name: this.auth.currentUser?.displayName,
                                uav_code: tarUav.uavCode,
                                gps: gps,
                                flight_dur: duration,
                                flight_type: fType,
                                spec_events: sEvents
                            }
                        }, {merge: true})
                    }
                })
            })
        })
    }

    getLogsForPilot(pilotId:string):Promise<Array<ILog>>{
        return new Promise((resolve:any, reject:any) => {
            var logs:Array<ILog> = [];
            this.db.collection("users")
            .doc(this.auth.currentUser?.uid)
            .collection("pilotLogs")
            .doc(pilotId)
            .collection("pilotLog")
            .get().then(querrySnapshot => {
            querrySnapshot.forEach(doc => {
                let data = doc.data();
                let logFileds:Array<string> = data.logs;
                logFileds.forEach(item => {
                    let log:ILog = {
                        date: data[item].date,
                        pilotName: data[item].pilot_name,
                        uavCode: data[item].uav_code,
                        gps: data[item].gps,
                        flightDur: data[item].flight_dur,
                        flightType: data[item].flight_type,
                        specEvents: data[item].spec_events
                    };
                    logs.push(log);
                })
            });
        }).then(() => {
            if(logs){
                resolve(logs)
            }
            else {
                resolve(null)
            }
        });

        }) 
    }

    getLogsForUAV(uavId:string):Promise<Array<ILog>>{
        return new Promise((resolve:any, reject:any) => {
            var logs:Array<ILog> = [];
            this.db.collection("uavs")
            .doc(uavId)
            .collection("uavLog")
            .get().then(querrySnapshot => {
            querrySnapshot.forEach(doc => {
                let data = doc.data();
                let logFileds:Array<string> = data.logs;
                logFileds.forEach(item => {
                    let log:ILog = {
                        date: data[item].date,
                        pilotName: data[item].pilot_name,
                        uavCode: data[item].uav_code,
                        gps: data[item].gps,
                        flightDur: data[item].flight_dur,
                        flightType: data[item].flight_type,
                        specEvents: data[item].spec_events
                    };
                    logs.push(log);
                })
            });
        }).then(() => {
            if(logs){
                resolve(logs)
            }
            else {
                resolve(null)
            }
        });

        }) 
    }

//-----------------------------------Custom cloud functions---------------------------//
    getCsv(type:string, id:string):Promise<any>{
        const userId = (type === 'pilot' ? this.auth.currentUser?.uid : '');
        return new Promise((resolve:any, reject:any) => {
            let toCSV = functions().httpsCallable('generateCSV');
            toCSV({type: type, id: id, userId: userId}).then(result => {
                console.log(result);
                if (result){
                    resolve(result);
                } else {
                    resolve(null);
                }
            }).catch(err => console.log(err));
        })
    }
}

export default new Firebase()