import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
         IonItem, IonInput, IonButton, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'

const Login: React.FC = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bussy, setBussy] = useState<boolean>(false);

    async function login(){
      setBussy(true)
      try{
        await firebase.login(userEmail, password);
        window.history.replaceState({}, '', '/');
        window.location.reload();
      } catch(error) {
        presentToast("Wrong username or password!")
      }
      setBussy(false)
        
    }

  return (
    <IonPage>
      <IonContent>
        <IonLoading message="Loging in.." duration={0} isOpen={bussy}/>
          <IonCard>
              image placeohlder
              <IonCardHeader  class="ion-text-center">
                  <IonCardTitle>Sign-in</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                  <IonInput
                    placeholder="Email" 
                    onIonChange={(e: any) => setUserEmail(e.target.value)}></IonInput>
                  <IonInput 
                    type="password" 
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                  <IonButton expand="block" onClick={login}>Login</IonButton>
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
