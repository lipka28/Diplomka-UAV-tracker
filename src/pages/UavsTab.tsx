import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFabButton, IonFab, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons'

const UavsTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">UAVs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">UAV List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab horizontal="center" vertical="bottom" slot="fixed">
            <IonFabButton color="primary">
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UavsTab;
