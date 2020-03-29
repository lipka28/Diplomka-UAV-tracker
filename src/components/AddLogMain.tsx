import React, { useState } from 'react';
import { IonInput, IonButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading, IonLabel, IonIcon } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';
import { locateOutline } from 'ionicons/icons';

const AddLog = (props:any) => {
  const [name, setName] = useState('');
  const [pilotLogId, setPilotLogId] = useState(props.pilotID);
  const [bussy, setBussy] = useState(false);

  async function addLogsFile(){
    setBussy(true)
    setBussy(false) 
  }

    return(
        <IonPopover
            isOpen={props.isOpen}
            onDidDismiss={props.onDidDismiss}
            cssClass="WideDialog">
              <IonLoading message="Adding Log" duration={0} isOpen={bussy}/>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                   <h2>Log Flight</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                  <IonCol>
                   Date:
                   <IonInput 
                   type="date" 
                   placeholder="Name of file"
                   /*onIonChange={(e: any) => setName(e.target.value)}*//>
                   </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonLabel>Pilot name:</IonLabel>
                   <IonInput 
                   type="text" 
                   placeholder="Pilot name"
                   /*onIonChange={(e: any) => setName(e.target.value)}*//>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonLabel>UAV:</IonLabel>
                   <IonInput 
                   type="text" 
                   placeholder="Uav Selector here"
                   /*onIonChange={(e: any) => setName(e.target.value)}*//>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonLabel>GPS:</IonLabel>
                   <IonInput 
                   type="text" 
                   placeholder="Latitude, Longitude"
                   /*onIonChange={(e: any) => setName(e.target.value)}*//>
                </IonCol>
                <IonButton color="light"><IonIcon icon={locateOutline} /></IonButton>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonLabel>Flight duration</IonLabel>
                   <IonInput 
                   type="time" 
                   value="00:00"
                   /*onIonChange={(e: any) => setName(e.target.value)}*//>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonLabel>Flight type</IonLabel>
                   <IonInput 
                   type="text" 
                   placeholder="Type of flight"
                   /*onIonChange={(e: any) => setName(e.target.value)}*//>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonLabel>Special events</IonLabel>
                   <IonInput 
                   type="text" 
                   placeholder="Events"
                   /*onIonChange={(e: any) => setName(e.target.value)}*//>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol><IonButton color="light" onClick={props.onDidDismiss}>Cancle</IonButton></IonCol>
                <IonCol class="ion-text-right"><IonButton color="success"
                onClick={addLogsFile}>Add</IonButton></IonCol>
              </IonRow>
            </IonGrid>
        </IonPopover>
    );
}

export default AddLog;