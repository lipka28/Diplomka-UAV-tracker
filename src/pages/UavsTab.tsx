import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFabButton, IonFab, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons'
import UavAddDialog from '../components/AddUAVWindow'

const UavsTab: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  var date = new Date();

  return (
    <IonPage>
      <UavAddDialog isOpen={showAddDialog} onDidDismiss={() => setShowAddDialog(false)} />
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
        {date.getMilliseconds()}
        <IonFab horizontal="center" vertical="bottom" slot="fixed">
            <IonFabButton color="primary" onClick={() => {setShowAddDialog(true)}}>
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UavsTab;
