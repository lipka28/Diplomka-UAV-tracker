import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, 
         IonBackButton, IonLoading, IonButton, IonIcon } from '@ionic/react';
import Firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'
import { downloadOutline } from 'ionicons/icons';
import LogPanel from '../components/LogPanel';
import ILog from '../Interfaces/ILog';

const LogTable: React.FC = () => {
  const [logs, setLogs] = useState<Array<ILog>>();
  const [bussy, setBussy] = useState(false);
  const [message, setMessage] = useState('');
  const [pageName, setPageName] = useState(window.history.state[2])

  useEffect(() => {
    let type = window.history.state[0];
    let id = window.history.state[1];

    if(type === 'pilot'){
      Firebase.getLogsForPilot(id)
      .then(data => {
        setLogs(data);
      })
      .catch(() => presentToast("Can't get data from database. Please try again later."))
    } else {
      Firebase.getLogsForUAV(id)
      .then(data => {
        setLogs(data);
      })
      .catch(() => presentToast("Can't get data from database. Please try again later."))
    }
  }, [])

  function getCsv(){
    setMessage("Downloading file...");
    setBussy(true);
    let type = window.history.state[0];
    let id = window.history.state[1];
    if(type === 'pilot'){
      Firebase.getCsv('pilot', id)
      .then( file => {
        console.log(file);
        setBussy(false);
      })
      .catch(err => {console.log(err);
        setBussy(false);})
    } else {
      Firebase.getCsv('uav', id)
      .then( file => {
        console.log(file);
        setBussy(false);
      })
      .catch(err => {console.log(err);
        setBussy(false);})
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Dashboard"/>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton onClick={getCsv}>
                <IonIcon icon={downloadOutline}/>
            </IonButton>
          </IonButtons>
          <IonTitle>{pageName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message={message} duration={0} isOpen={bussy}/>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {logs?.map((item, index) => (
          <LogPanel key={index} date={item.date} pilotName={item.pilotName} uavId={item.uavCode}
                    gps={item.gps} fdur={item.flightDur} ftype={item.flightType} sevents={item.specEvents}/>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default LogTable;
