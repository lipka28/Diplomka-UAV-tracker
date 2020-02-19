import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
         IonCard, IonCardContent, IonCardHeader, IonCardTitle,
         IonLabel, IonItem, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';

const Login: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function debug_login(){
        console.log(userName, password);
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
                    onIonChange={(e: any) => setUserName(e.target.value)}></IonInput>
                  <IonInput 
                    type="password" 
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                  <IonButton onClick={debug_login}>Login</IonButton>
              </IonCardContent>
          </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
