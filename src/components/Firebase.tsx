import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import IUser from '../Interfaces/IUser'
import IUav from '../Interfaces/IUav'

const config = {
    apiKey: "AIzaSyDM4PKLJY3Ag09PcgTilm4fSFSsqz54zGY",
    authDomain: "uav-tracker.firebaseapp.com",
    databaseURL: "https://uav-tracker.firebaseio.com",
    projectId: "uav-tracker",
    storageBucket: "uav-tracker.appspot.com",
    messagingSenderId: "550282888545",
    appId: "1:550282888545:web:1951d20f245bd7b9bdb120",
    measurementId: "G-KTVVM40M2Z"
};

class Firebase {
    private auth:app.auth.Auth;
    private db:app.firestore.Firestore;

    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
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
                    ownerName : data.owner_name === this.auth.currentUser?.displayName ? "you" : data.owner_name,
                    name : data.name,
                    iconUrl : data.icon_url
                };
                uavs.push(uav);
            });
        }).then(() => {
            if(uavs){
                resolve(uavs)
            }
            else {
                resolve(null)
            }
        });

        })
        
    }
    
    /*{
        return await this.db.collection("uavs").where("shared_with", "array-contains", this.auth.currentUser?.uid)
        .get().then(querrySnapshot => {
            querrySnapshot.forEach(doc => {
                let data = doc.data();
                let uav:IUav = {
                    uavId : doc.id,
                    ownerName : data.owner_name === this.auth.currentUser?.displayName ? "you" : data.owner_name,
                    name : data.name,
                    iconUrl : data.icon_url
                };
            });
        });
    }*/
}

export default new Firebase()