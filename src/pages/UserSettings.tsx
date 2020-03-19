import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
         IonLabel, IonInput, IonItem, IonButton, IonFab, IonButtons, 
         IonBackButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading } from '@ionic/react';
import Firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'

const UserSettings: React.FC = () => {
  const [fullName, setFullname] = useState('Placeholder Name');
  const [oldName, setOldName] = useState('Placeholder Name');
  const [email, setEmail] = useState('Placeholder@email.mail');
  const [oldEmail, setOldEmail] = useState('Placeholder@email.mail');
  const [showPopover, setShowPopover] = useState(false);
  const [showEmailPopover, setShowEmailPopover] = useState(false);
  const [showPassPopover, setShowPassPopover] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConf, setNewPasswordConf] = useState('');
  const [bussy, setBussy] = useState(false);
  const [message, setMessage] = useState('');
  const [firstRun, setFirstRun] = useState(true);

  async function deleteUser(){
    setMessage('Deleting user...');
    setBussy(true);
    await Firebase.reAuthUser(oldEmail, password).then(() => {
      Firebase.deleteUser().then(() => {
        window.location.reload();
      }).catch((reason) => {
        presentToast(reason);
      })
    }).catch((reason) => {
      presentToast(reason);
    });
    setBussy(false);
  }

  async function changeEmail(){
    setMessage('Changing email...');
    setBussy(true);
    await Firebase.reAuthUser(oldEmail, password).then(() => {
      Firebase.changeLoginEmail(email).then(() => {
        setOldEmail(email);
        setShowEmailPopover(false);
      }).catch((reason) => {
        presentToast(reason);
      })
    }).catch((reason) => {
      presentToast(reason);
    });
    setBussy(false);
  }

  async function changePassword(){
    setMessage('Changing password...');
    setBussy(true);
    if(newPassword !== newPasswordConf){
      presentToast("Passwords do not match!")
    } else if (newPassword === password) {
      presentToast("New password is same as the old one.")
    } else {
      await Firebase.reAuthUser(oldEmail, password).then(() => {
        Firebase.changePassword(newPassword).then(() => {
          setShowPassPopover(false);
        }).catch((reason) => {
          presentToast(reason);
        })
      }).catch((reason) => {
        presentToast(reason);
      });
    }
    setBussy(false);
  }

  async function saveChanges(){
    setMessage("Saving changes...");
    setBussy(true);
    if(fullName !== oldName){
      Firebase.changeUserName(fullName).then(() => {
        window.location.href = "/Dashboard";
      })
    } else {
      window.location.href = "/Dashboard";
    }
  }

  Firebase.getCurrentUserInfo().then(user => {
    if(firstRun) {
      setFullname(user.name);
      setOldName(user.name);
      setEmail(user.email);
      setOldEmail(user.email);
      setFirstRun(false);
    }
  })  

  return (
    <IonPage>
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => setShowPopover(false)}>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
               To delete your account 
               you must confirm your
               action by providing your <strong>Password</strong>.
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput 
                type="password"
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton color="light" onClick={() => setShowPopover(false)}>Cancle</IonButton></IonCol>
            <IonCol class="ion-text-right"><IonButton color="danger" onClick={deleteUser}>Delete</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonPopover>
      <IonPopover
        isOpen={showEmailPopover}
        onDidDismiss={e => setShowEmailPopover(false)}>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
               <h2>Change login email</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput 
                type="email"
                value={email}
                placeholder="Email"
                onIonChange={(e: any) => setEmail(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput 
                type="password"
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton color="light" onClick={() => setShowEmailPopover(false)}>Cancle</IonButton></IonCol>
            <IonCol class="ion-text-right"><IonButton color="primary" onClick={changeEmail}>Save</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonPopover>
      <IonPopover
        isOpen={showPassPopover}
        onDidDismiss={e => setShowPassPopover(false)}>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
               <h2>Change Password</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput 
                type="password"
                placeholder="Old Password"
                onIonChange={(e: any) => setPassword(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput 
                type="password"
                placeholder="New Password"
                onIonChange={(e: any) => setNewPassword(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput 
                type="password"
                placeholder="Repeat New Password"
                onIonChange={(e: any) => setNewPasswordConf(e.target.value)}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton color="light" onClick={() => setShowPassPopover(false)}>Cancle</IonButton></IonCol>
            <IonCol class="ion-text-right"><IonButton color="primary" onClick={changePassword}>Save</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonPopover>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Dashboard"/>
          </IonButtons>
          <IonTitle>User settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message={message} duration={0} isOpen={bussy}/>
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
            onIonChange={(e: any) => setFullname(e.target.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel>Email:</IonLabel>
            <IonInput disabled={true} value={oldEmail}/>
            <IonButton slot="end" color="light" onClick={() => setShowEmailPopover(true)}>Change Email</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Password:</IonLabel>
            <IonInput disabled={true} value="***********" />
            <IonButton slot="end" color="light" onClick={() => setShowPassPopover(true)}>Change Password</IonButton>
          </IonItem>
        </IonList>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonButton color="primary" onClick={saveChanges}>Save changes</IonButton>
          </IonFab>
        <IonFab horizontal="start" vertical="bottom" slot="fixed">
          <IonButton color="danger" onClick={() => setShowPopover(true)}>Delete Account</IonButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
