import React, { useState } from 'react';
import { IonInput, IonButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';

const UavAddDialog = (props:any) => {
  const [name, setName] = useState('');
  const [opName, setOpName] = useState('');
  const [ok, setOk] = useState('');
  const [bussy, setBussy] = useState(false);

  async function addUAV(){
    setBussy(true)
    if (name === "" ||
        opName === "" ||
        ok === ""){
          presentToast("All fields are mandatory!!");
          setBussy(false);
        } else {
          await Firebase.addUAV(name, opName, ok).then(() => {
            props.onDidDismiss();
            setBussy(false);
          }).catch((reason) => {
            presentToast(reason)
            setBussy(false);
          })

          setName('');
          setOpName('');
          setOk('');
        }    
  }

    return(
        <IonPopover
            isOpen={props.isOpen}
            onDidDismiss={props.onDidDismiss}
            cssClass="WideDialog">
              <IonLoading message="Adding UAV" duration={0} isOpen={bussy}/>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                   <h2>Add UAV</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonInput 
                   type="text" 
                   value={name}
                   placeholder="Display name"
                   onIonChange={(e: any) => setName(e.target.value)}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonInput 
                   type="text" 
                   value={opName}
                   placeholder="Registered operator name"
                   onIonChange={(e: any) => setOpName(e.target.value)}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonInput 
                   type="text"
                   value={ok} 
                   placeholder="Registration Code (OK-XXXXXX)"
                   onIonChange={(e: any) => setOk(e.target.value)}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol><IonButton color="light" onClick={props.onDidDismiss}>Cancel</IonButton></IonCol>
                <IonCol class="ion-text-right"><IonButton color="primary"
                onClick={addUAV}>Add</IonButton></IonCol>
              </IonRow>
            </IonGrid>
        </IonPopover>
    );
}

export default UavAddDialog;