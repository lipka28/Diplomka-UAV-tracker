import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

const PilotTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Pilot's Diarry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pilot's Diarry</IonTitle>
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

export default PilotTab;
