import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
         IonLabel, IonInput, IonItem, IonButton, IonFab, IonButtons, 
         IonBackButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading, IonIcon, IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import Firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'
import { qrCodeOutline, qrCode } from 'ionicons/icons';
import QRCode from 'qrcode.react';
import Scrambler from '../components/Scrambler';

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

  // jen test pro zaobfuskovani predavanych dat 8275114951
  function test(){
    let idToProcess = uavId;
    //let ts = Math.round((new Date()).getTime() / 1000).toString();
    //let tsRev = ts.split("").reverse().join("");
    //let letters = makeid(ts.length);
    //let passedValue = idToProcess;
    let newPassedValue = Scrambler.encode(uavId);
    //let test = encode("xxxxxxxxxx","999999999");
    console.log(uavId);
    console.log(newPassedValue);
    //console.log(test);
    //console.log(ts);
    //console.log(letters);
    //console.log(merge(ts, letters));
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
              <QRCode size={230} value="5sad6f1sd56f1sd65f1sd654g56fsd4gh56fds1g56dsfh4g56fg165sf1gh65sf1h65f" />
              <IonCardHeader  class="ion-text-center">
                  <IonCardTitle>QR-Sahre</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                  <IonItem lines="none">
                      <p>
                        QR Code Expires in: 123
                      </p>
                  </IonItem>
                  <IonButton color="primary" expand="block" onClick={() => test()}>Test</IonButton>
                  <IonButton color="danger" expand="block">Cancel</IonButton>
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
