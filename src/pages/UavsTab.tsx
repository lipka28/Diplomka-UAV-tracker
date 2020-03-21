import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, 
         IonToolbar, IonFabButton, IonFab, IonIcon, IonList, IonItem } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import UavAddDialog from '../components/AddUAVWindow';
import UavBadge from '../components/UavBadge';
import Firebase from '../components/Firebase';
import IUav from '../Interfaces/IUav';

const UavsTab: React.FC = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [data, setData] = useState<Array<IUav>>();

  useEffect(() => {
    setData(Firebase.getMyUAVs());
  }, [showAddDialog])

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
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
            <UavBadge/>
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
