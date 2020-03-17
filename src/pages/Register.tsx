import { IonContent, IonPage, IonCard, IonCardContent, 
         IonCardHeader, IonCardTitle, IonItem, IonInput,
         IonButton, IonRouterLink, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'

const Register: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    
    const [bussy, setBussy] = useState<boolean>(false);

    function goBack(){
      window.history.back();
    }

    async function register() {
      setBussy(true)
      if (cPassword !== password){
        presentToast("Passwords do not match")
      }

      if (userName.trim() === '' 
          || password.trim() === ''
          || userEmail.trim() === ''){
            
        presentToast("All fields are required")

      } else {
        try {
          var realName = userName + " " + userSurname;
          await firebase.register(realName, userEmail, password);
          presentToast("Account created succesfully");
        } catch (error) {
          presentToast(error.message, 4000);
        }
      }
      setBussy(false)
    }

  return (
    <IonPage>
      <IonContent>
          <IonCard>
              <IonCardHeader class="ion-text-center">
                  <IonCardTitle>Register</IonCardTitle>
              </IonCardHeader>
              <IonLoading message="Creating new user.." duration={0} isOpen={bussy}/>
              <IonCardContent>
                  <IonInput 
                    placeholder="Name" 
                    onIonChange={(e: any) => setUserName(e.target.value)}>
                    </IonInput>
                  <IonInput 
                    placeholder="Surname" 
                    onIonChange={(e: any) => setUserSurname(e.target.value)}>
                    </IonInput>
                  <IonInput 
                    placeholder="Email" 
                    onIonChange={(e: any) => setUserEmail(e.target.value)}>
                    </IonInput>
                  <IonInput 
                    type="password" 
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}>
                    </IonInput>
                  <IonInput 
                    type="password" 
                    placeholder="Confirm password"
                    onIonChange={(e: any) => setCPassword(e.target.value)}>
                    </IonInput>
                  <IonButton expand="block" onClick={register}>Create new account</IonButton>
                  <IonItem lines="none">
                      <p>
                      Already have an account? <IonRouterLink onClick={goBack}>Login</IonRouterLink>
                      </p>
                  </IonItem>
              </IonCardContent>
          </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
