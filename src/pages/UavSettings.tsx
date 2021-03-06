import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
         IonLabel, IonInput, IonItem, IonButton, IonFab, IonButtons, 
         IonBackButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading, IonIcon, IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import Firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'
import { qrCodeOutline, qrCode } from 'ionicons/icons';
import QRCode from 'qrcode.react';
import Scrambler from '../components/Scrambler';
import CountDown from '../components/CountDown'

const UavSettings: React.FC = () => {
    const [uavId, setUavId] = useState(window.history.state[0]);
    const [uavName, setUavName] = useState(window.history.state[1]);
    const [operatorName, setOperatorName] = useState('');
    const [shared, setShared] = useState<Array<string>>();
    const [privileged, setPrivileged] = useState(false);
    const [uavCode, setUavCode] = useState('');
    const [message, setMessage] = useState('');
    const [bussy, setBussy] = useState(false);
    const [firstRun, setFirstRun] = useState(true);
    const [showPopover, setShowPopover] = useState(false);
    const [showQrDialog, setShowQrDialog] = useState(false);
    const [tick, setTick] = useState(120);

  async function saveChanges(){
    setMessage("Saving changes...");
    setBussy(true);
    if(privileged){
      await Firebase.changeUav(uavName, operatorName, uavId)
      .then(() => window.location.href = "/Dashboard")
      .catch(e => (presentToast("Failed to save changes, please try later.")))
    } else {
      window.location.href = "/Dashboard";
    }
  }

  async function deleteUAV(){
    setMessage("Deleting...");
    setBussy(true);
    if(privileged){
      await Firebase.deleteUav(uavId)
      .then(() => window.location.href = "/Dashboard")
      .catch(e => (presentToast("Failed to delete UAV please try again later.")))
    } else {
      window.location.href = "/Dashboard";
    }
  }

  useEffect(() => {
    Firebase.getUAVbyId(uavId).then( data => {
        if(data){
            setUavName(data.name);
            setOperatorName(data.operatorName);
            setShared(data.sharedWith);
            setUavCode(data.uavCode);
            if(data.ownerName === "You") setPrivileged(true);         
        }
    });
    }, [])

  return (
    <IonPage>
      <IonPopover
            isOpen={showQrDialog}
            onDidDismiss={() => setShowQrDialog(false)}>
        <IonCard>
              <QRCode size={230} value={Scrambler.encode(uavId)} />
              <IonCardHeader  class="ion-text-center">
                <IonCardTitle color="danger"><CountDown /></IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                  <IonButton color="danger" expand="block" onClick={() => setShowQrDialog(false)}>Cancel</IonButton>
              </IonCardContent>
          </IonCard>
      </IonPopover>
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => setShowPopover(false)}>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center">
              Are you shure you wnat to delete UAV with name: <strong>{uavName} </strong>
              and code <strong>{uavCode}</strong> 
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton color="light" onClick={() => setShowPopover(false)}>Cancel</IonButton></IonCol>
            <IonCol class="ion-text-right"><IonButton color="danger" onClick={deleteUAV}>Delete</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonPopover>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Dashboard"/>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton color="primary" onClick={() => setShowQrDialog(true)}>
                Share this UAV
              <IonIcon icon={qrCodeOutline}/>
            </IonButton>
          </IonButtons>
          <IonTitle>{uavName} details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message={message} duration={0} isOpen={bussy}/>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{uavName} details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Display name:</IonLabel>
            <IonInput disabled={!privileged} value={uavName}
            onIonChange={(e: any) => setUavName(e.target.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel>Registered operator:</IonLabel>
            <IonInput disabled={!privileged} value={operatorName} 
            onIonChange={(e: any) => setOperatorName(e.target.value)}/>
          </IonItem>
          <IonItem>
            <IonLabel>UAV Code:</IonLabel>
            <IonInput 
            value={uavCode}
            disabled={true}
            placeholder="OK-XXXXXX"/>
          </IonItem>
        </IonList>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonButton color="primary" disabled={!privileged} onClick={saveChanges}>Save changes</IonButton>
          </IonFab>
        <IonFab horizontal="start" vertical="bottom" slot="fixed">
          <IonButton color="danger" disabled={!privileged} onClick={() => setShowPopover(true)}>Delete UAV</IonButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UavSettings;
