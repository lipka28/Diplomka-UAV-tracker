import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
         IonLabel, IonInput, IonItem, IonButton, IonFab, IonButtons, 
         IonBackButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading } from '@ionic/react';
import Firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'

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

  async function saveChanges(){
    setMessage("Saving changes...");
    setBussy(true);
    if(/*check*/false){
      // firebase function
    } else {
      window.location.href = "/Dashboard";
    }
  }

  async function deleteUAV(){
    setMessage("Deleting...");
    setBussy(true);
    if(/*check*/false){
      // firebase function
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
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Dashboard"/>
          </IonButtons>
          <IonTitle>{uavName} details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message={message} duration={0} isOpen={bussy}/>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Real Name:</IonLabel>
            <IonInput 
            value={uavId}
            placeholder="Full name"
            /*onIonChange={(e: any) => setFullname(e.target.value)}*//>
          </IonItem>
          <IonItem>
            <IonLabel>Email:</IonLabel>
            <IonInput disabled={true} value={uavId}/>
          </IonItem>
          <IonItem>
            <IonLabel>Password:</IonLabel>
            <IonInput disabled={true} value={uavId} />
          </IonItem>
        </IonList>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonButton color="primary" onClick={saveChanges}>Save changes</IonButton>
          </IonFab>
        <IonFab horizontal="start" vertical="bottom" slot="fixed">
          <IonButton color="Danger" onClick={saveChanges}>Delete UAV</IonButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default UavSettings;
