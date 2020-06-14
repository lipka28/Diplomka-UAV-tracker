import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFabButton, IonFab, IonIcon, IonList, IonPopover, IonGrid, IonRow, IonCol, IonInput, IonButton } from '@ionic/react';
import { addOutline, qrCodeOutline } from 'ionicons/icons';
import UavAddDialog from '../components/AddUAVWindow';
import UavBadge from '../components/UavBadge';
import Firebase from '../components/Firebase';
import IUav from '../Interfaces/IUav';
import { ok } from 'assert';
const UavsTab: React.FC = () => {
  const [data, setData] = useState<Array<IUav>>();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAddNewDialog, setShowAddNewDialog] = useState(false);
  const [showAddSharedDialog, setShowAddSharedDialog] = useState(false);

  useEffect(() => {
      Firebase.getMyUAVs().then( data => (setData(data)));
  }, [, showAddNewDialog])

  return (
    <IonPage>
      <IonPopover
            isOpen={showAddDialog}
            onDidDismiss={() => setShowAddDialog(false)}
            cssClass="WideDialog">
            <IonGrid>
              <IonRow>
                  <IonButton color="primary" onClick={() => {setShowAddDialog(false); setShowAddNewDialog(true)}}>Add New UAV</IonButton>
                </IonRow>
                <IonRow>
                  <IonButton color="light"
                onClick={() => setShowAddDialog(false)}><IonIcon icon={qrCodeOutline} /> Add Shared UAV</IonButton>
              </IonRow>
            </IonGrid>
        </IonPopover>
      <UavAddDialog isOpen={showAddNewDialog} onDidDismiss={() => setShowAddNewDialog(false)} />
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
          <UavBadge key={Math.random()*5000} uavID={item.uavId} img={item.iconUrl} uavName={item.name} ownerName={item.ownerName}/>))}
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
