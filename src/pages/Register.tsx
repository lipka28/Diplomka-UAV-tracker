import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
         IonCard, IonCardContent, IonCardHeader, IonCardTitle,
         IonLabel, IonItem, IonInput, IonButton, IonRouterLink, } from '@ionic/react';
import React, { useState } from 'react';
import firebase from '../components/Firebase';
import { Link, Route, Router } from 'react-router-dom';
import { register } from '../serviceWorker';
import { attachProps } from '@ionic/react/dist/types/components/utils';

const Register: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    function goBack(){
      window.history.back();
    }

    async function register() {
      try {
        await firebase.register(userName, userEmail, password);
      } catch (error) {
        alert(error.message);
      }
    }

  return (
    <IonPage>
      <IonContent>
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>Register</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                  <IonInput 
                    placeholder="User name" 
                    onIonChange={(e: any) => setUserName(e.target.value)}>
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
                  <IonButton onClick={register}>Create new account</IonButton>
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
