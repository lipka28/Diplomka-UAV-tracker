import React, { useState, useEffect } from 'react';
import { IonInput, IonButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading, 
         IonLabel, IonIcon, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';
import { locateOutline } from 'ionicons/icons';
import Geo from '../components/Geo';
import IUav from '../Interfaces/IUav';

const AddLog = (props:any) => {
  const [tempUavs, setTempUavs] = useState<Array<IUav>>();
  const [pilotLogId, setPilotLogId] = useState(props.pilotID);

  const [date, setDate] = useState('');
  const [uavId, setUavId] = useState('');
  const [gps, setGps] = useState('');
  const [duration, setDuration] = useState('01:00');
  const [ftype, setFtype] = useState('');
  const [sEvents, setSEvents] = useState('');

  const [bussy, setBussy] = useState(false);
  const [mess, setMess] = useState('');

  useEffect(() => {
    Firebase.getMyUAVs().then(data => 
      setTempUavs(data));

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      setDate(yyyy+"-"+mm+"-"+dd);
    
  }, [props.isOpen])

  async function getLocation(){
    setMess("Trying to get location...");
    setBussy(true);
    await Geo.getPosition()
    .then(res => {
      let coor:string = res.coords.latitude + ", " + res.coords.longitude;
      setGps(coor)
      setBussy(false);
    })
    .catch(() => {
      setBussy(false);
      presentToast("Failed to get your position");
    })
  }

  async function addLog(){
    setMess("Adding log");
    setBussy(true);

    setBussy(false); 
  }

    return(
        <IonPopover
            isOpen={props.isOpen}
            onDidDismiss={props.onDidDismiss}
            cssClass="WideDialog">
              <IonLoading message={mess} duration={0} isOpen={bussy}/>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                   <h2>Log Flight</h2>
                </IonCol>
              </IonRow>
              <IonRow>
                  <IonCol>
                   <strong>Date:</strong>
                   <IonInput 
                   type="date" 
                   value={date}
                   onIonChange={(e: any) => setDate(e.target.value)}/>
                   </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <strong>UAV:</strong>
                   <IonSelect value={uavId} okText="Okay" cancelText="Dismiss" onIonChange={e => setUavId(e.detail.value)}>
                   {tempUavs?.map((item:IUav, index:number) => (
                     <IonSelectOption key={index} value={item.uavId}>{item.name}</IonSelectOption>))}
                   </IonSelect>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <strong>GPS:</strong>
                   <IonInput 
                   value={gps}
                   type="text" 
                   placeholder="Latitude, Longitude"
                   onIonChange={(e: any) => setGps(e.target.value)}/>
                </IonCol>
                <IonButton color="light" onClick={getLocation}><IonIcon icon={locateOutline} /></IonButton>
              </IonRow>
              <IonRow>
                <IonCol>
                   <strong>Flight duration</strong>
                   <IonInput 
                   type="time" 
                   value={duration}
                   onIonChange={(e: any) => setDuration(e.target.value)}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <strong>Flight type</strong>
                   <IonInput 
                   type="text" 
                   placeholder="Type of flight"
                   value={ftype}
                   onIonChange={(e: any) => setFtype(e.target.value)}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <strong>Special events</strong>
                   <IonTextarea placeholder="Events"
                   value={sEvents}
                   onIonChange={(e: any) => setSEvents(e.target.value)}>
                   </IonTextarea>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol><IonButton color="light" onClick={props.onDidDismiss}>Cancle</IonButton></IonCol>
                <IonCol class="ion-text-right"><IonButton color="success"
                onClick={addLog}>Add</IonButton></IonCol>
              </IonRow>
            </IonGrid>
        </IonPopover>
    );
}

export default AddLog;