import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, 
         IonBackButton, IonLoading, IonMenuButton, IonButton, IonIcon, IonItem, IonCol, IonCard, IonLabel, IonCardContent, IonGrid, IonRow } from '@ionic/react';
import Firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'
import { menuOutline, removeOutline, removeCircleOutline, downloadOutline } from 'ionicons/icons';

const LogTable: React.FC = () => {
  const [bussy, setBussy] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Dashboard"/>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
                <IonIcon icon={downloadOutline}/>
            </IonButton>
          </IonButtons>
          <IonTitle>User settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message={message} duration={0} isOpen={bussy}/>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonItem>
            <IonLabel>Log id: y56csd6wc54yxd6g4yd6g</IonLabel>
            <IonIcon color="danger" icon={removeCircleOutline} slot="end" />
          </IonItem>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol><strong>Date:</strong></IonCol>
                <IonCol>10.10.1010</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>Pilot name:</strong></IonCol>
                <IonCol>Tester Test</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>UAV:</strong></IonCol>
                <IonCol>OK-XXXXXX</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>GPS:</strong></IonCol>
                <IonCol>40.23251, 19.56423</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>Flight duration:</strong></IonCol>
                <IonCol>01:30</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>Flight type:</strong></IonCol>
                <IonCol>Test flight</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>Special events:</strong></IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LogTable;
