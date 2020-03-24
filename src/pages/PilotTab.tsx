import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import LogsAddDialog from '../components/AddLogsWindow';
import IPilot from '../Interfaces/IPilotLogs';

const PilotTab: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <IonPage>
      <LogsAddDialog isOpen={showAddDialog} onDidDismiss={() => setShowAddDialog(false)} />
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Pilot's Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pilot's Logs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab horizontal="center" vertical="bottom" slot="fixed">
            <IonFabButton color="primary" onClick={() => {setShowAddDialog(true)}}>
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default PilotTab;
