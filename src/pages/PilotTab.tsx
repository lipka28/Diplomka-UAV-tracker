import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFab, IonFabButton, IonIcon, IonList } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import LogsAddDialog from '../components/AddLogsWindow';
import IPilot from '../Interfaces/IPilotLogs';
import Firebase from '../components/Firebase';
import PilotBadge from '../components/PilotBadge';

const PilotTab: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [data, setData] = useState<Array<IPilot>>();

  useEffect(() => {
      Firebase.getPilots().then( data => (setData(data))).then(() => console.log(data));
  }, [])

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
        <IonList>
        {data?.map((item, index) => (
          <PilotBadge key={index} pilotID={item.logsFileId} pilotName={item.name}/>))}
        </IonList>
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
