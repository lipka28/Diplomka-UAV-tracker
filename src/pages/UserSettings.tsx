import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
         IonLabel, IonInput, IonItem, IonButton, IonFab, IonButtons, IonBackButton } from '@ionic/react';
import Firebase from '../components/Firebase';
import { presentAlert } from '../components/Alert'

const UserSettings: React.FC = () => {
  const [fullName, setFullname] = useState('Placeholder Name');
  const [email, setEmail] = useState('Placeholder@email.mail');

  async function deleteUserPrompt(){
    const buttons = [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Yes',
        cssClass: 'danger',
        handler: () => {
          console.log('Confirm Okay');
          Firebase.deleteUser().then(() => {
            Firebase.logout().then(() => {
              window.location.reload();
            });
          });
          }
        }
      ];
    presentAlert("Are you sure?", 
    "This action will completly <strong>delete</strong> your account. Are you sure you want to continue?", 
    buttons);
  }

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
            <IonInput 
            value={fullName}
            placeholder="Full name"
            onIonChange={(e: any) => setFullname(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Email:</IonLabel>
            <IonInput 
            value={email}
            placeholder="Email"
            onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
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
          <IonButton color="danger" onClick={deleteUserPrompt}>Delete Account</IonButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
