import React, { useState } from 'react';
import { IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';
import { menuOutline, airplaneOutline, closeOutline, documentTextOutline, createOutline } from 'ionicons/icons'

const UAVBadge = (props:any) => {
    const [id, setId] = useState(props.uavID);
    const [img,setImg] = useState(props.img);
    const [name, setName] = useState(props.uavName);
    const [owner, setOwner] = useState(props.ownerName);
    const [showPopover, setShowPopover] = useState(false);
    const [showPopDelete, setShowPopDelete] = useState(false);

    function goToLog(){
        window.history.pushState(['uav', id, name], '','/logTable');
        window.location.reload();
    }

    return(
        <div className="UAVBadge-base">
            <div className="imbed-image">
                <IonIcon style={{"fontSize": 200+"%","paddingLeft": 35+"%","paddingTop": 30+"%"}} icon={airplaneOutline}/>
            </div>
            <div className="mid-section">
                <div>
                    <h2>{name}</h2>
                </div>
                <div className="cust-splitter-hor" />
                <div className="sub-text"><strong>Owner: </strong>{owner}</div>
            </div> 
            <div className="ham-menu">
                <IonPopover
                isOpen={showPopover}
                onDidDismiss={e => setShowPopover(false)}>
                    <IonList>
                        <IonItem><h2>{name}</h2></IonItem>
                        <IonItem disabled={owner !== "You" ? true : false}
                                 onClick={() => {window.history.replaceState([id, name], '', '/uavSettings'); window.location.reload();}}>
                            <IonIcon icon={createOutline} />
                            <IonLabel>Edit Details</IonLabel>
                        </IonItem>
                        <IonItem onClick={goToLog}>
                            <IonIcon icon={documentTextOutline} />
                            <IonLabel>Logs</IonLabel>
                        </IonItem>
                        <IonItem onClick={e => (setShowPopover(false))}>
                            <IonIcon icon={closeOutline} />
                            <IonLabel>Close</IonLabel>
                        </IonItem>
                    </IonList>
                </IonPopover>
                <IonButton className="btn-fill" color="light" onClick={e => (setShowPopover(true))}>
                    <IonIcon style={{"fontSize": 200+"%"}} icon={menuOutline}/>
                </IonButton>
            </div>
        </div>
    );
}

export default UAVBadge;