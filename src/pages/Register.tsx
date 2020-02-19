import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
         IonCard, IonCardContent, IonCardHeader, IonCardTitle,
         IonLabel, IonItem, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import React, { useState } from 'react';
import { Link, Route, Router } from 'react-router-dom';

const Register: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    function goBack(){
      window.history.back();
    }

    function debug_Register(){
        if (password != cPassword) {
          console.log("Hesla nejsou stejná")
        } else {
          console.log(userName, password);
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
                    placeholder="Email" 
                    onIonChange={(e: any) => setUserName(e.target.value)}></IonInput>
                  <IonInput 
                    type="password" 
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                  <IonInput 
                    type="password" 
                    placeholder="Confirm password"
                    onIonChange={(e: any) => setCPassword(e.target.value)}></IonInput>
                  <IonButton onClick={debug_Register}>Create new account</IonButton>
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
