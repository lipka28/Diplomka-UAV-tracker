import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
         IonLabel, IonInput, IonItem, IonButton, IonFab, IonButtons, IonBackButton } from '@ionic/react';
import Firebase from '../components/Firebase';

const UserSettings: React.FC = () => {
  const [fullName, setFullname] = useState('Placeholder Name');
  const [email, setEmail] = useState('Placeholder@email.mail');

  Firebase.getCurrentUserInfo().then(user => {
    setFullname(user.name);
    setEmail(user.email);
  })  

  //console.log(us);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Dashboard"/>
          </IonButtons>
          <IonTitle>User settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Real Name:</IonLabel>
            <IonInput value={fullName}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Email:</IonLabel>
            <IonInput value={email}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Password:</IonLabel>
            <IonInput disabled={true} value="***********" ></IonInput>
            <IonButton slot="end" color="light">Change password</IonButton>
          </IonItem>
        </IonList>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonButton color="primary">Save changes</IonButton>
          </IonFab>
        <IonFab horizontal="start" vertical="bottom" slot="fixed">
          <IonButton color="danger">Delete Account</IonButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
