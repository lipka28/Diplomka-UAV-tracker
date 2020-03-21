import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import IUser from '../Interfaces/IUser'

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

    async getCurrentUserInfo(){
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

}

export default new Firebase()