import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
         IonCard, IonCardContent, IonCardHeader, IonCardTitle,
         IonLabel, IonItem, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../components/Firebase'

const Login: React.FC = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(){
        try {
            await firebase.login(userEmail, password);
        } catch (error) {
            alert(error.message);
        }
    }

  return (
    <IonPage>
      <IonContent>
          <IonCard>
              image placeohlder
              <IonCardHeader>
                  <IonCardTitle>Login</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                  <IonInput 
                    placeholder="Email" 
                    onIonChange={(e: any) => setUserEmail(e.target.value)}></IonInput>
                  <IonInput 
                    type="password" 
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                  <IonButton onClick={login}>Login</IonButton>
                  <IonItem lines="none">
                      <p>
                      Don't have account? <Link to="/register">Register</Link>
                      </p>
                  </IonItem>
              </IonCardContent>
          </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
