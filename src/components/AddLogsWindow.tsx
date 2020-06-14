import React, { useState } from 'react';
import { IonInput, IonButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';

const LogsAddDialog = (props:any) => {
  const [name, setName] = useState('');
  const [bussy, setBussy] = useState(false);

  async function addLogsFile(){
    setBussy(true)
    if (name === ""){
          presentToast("All fields are mandatory!!");
          setBussy(false);
        } else {
          await Firebase.addPilotLogs(name).then(() => {
            props.onDidDismiss();
            setBussy(false);
          }).catch((reason) => {
            presentToast(reason)
            setBussy(false);
          })

          setName('');
          
        }    
  }
    return(
        <IonPopover
            isOpen={props.isOpen}
            onDidDismiss={props.onDidDismiss}
            cssClass="WideDialog">
              <IonLoading message="Adding Pilot Logs" duration={0} isOpen={bussy}/>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                   <h2>Add Pilot Logs</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonInput 
                   type="text" 
                   value={name}
                   placeholder="Name of file"
                   onIonChange={(e: any) => setName(e.target.value)}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol><IonButton color="light" onClick={props.onDidDismiss}>Cancle</IonButton></IonCol>
                <IonCol class="ion-text-right"><IonButton color="primary"
                onClick={addLogsFile}>Add</IonButton></IonCol>
              </IonRow>
            </IonGrid>
        </IonPopover>
    );
}

export default LogsAddDialog;