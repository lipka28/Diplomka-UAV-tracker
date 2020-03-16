import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonApp } from '@ionic/react';

const UserSettings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">User settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        Test 1234
      </IonContent>
    </IonPage>
  );
};

export default UserSettings;
