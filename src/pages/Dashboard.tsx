import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React from 'react';
import './Dashboard.css';
import firebase from '../components/Firebase'

const Dashboard: React.FC = () => {

  async function logut() {
    await firebase.logout();
    window.history.replaceState({}, '', '/');
    window.location.reload();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton class="ion-padding" onClick={logut}>Lgout</IonButton>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
