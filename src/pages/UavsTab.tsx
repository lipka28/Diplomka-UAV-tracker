import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFabButton, IonFab, IonIcon, IonList } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import UavAddDialog from '../components/AddUAVWindow';
import UavBadge from '../components/UavBadge';
import Firebase from '../components/Firebase';
import IUav from '../Interfaces/IUav';
const UavsTab: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [first, setFirst] = useState(true);
  const [data, setData] = useState<Array<IUav>>();

  useEffect(() => {
      Firebase.getMyUAVs().then( data => (setData(data)));
  }, [, showAddDialog])

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
        <IonList>
          {data?.map((item, index) => (
          <UavBadge key={index} uavID={item.uavId} img={item.iconUrl} uavName={item.name} ownerName={item.ownerName}/>))}
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

export default UavsTab;
