import React, { useState } from 'react';
import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';
import { menuOutline, airplaneOutline } from 'ionicons/icons'

const UavAddDialog = (props:any) => {
    const [id, setId] = useState(props.uavID);
    const [img,setImg] = useState(props.img);
    const [name, setName] = useState(props.uavName);
    const [owner, setOwner] = useState(props.ownerName);
    const [showPopover, setShowPopover] = useState(false);

    //console.log(props.uavID);


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
                    <p>{id}</p>
                </IonPopover>
                <IonButton className="btn-fill" color="light" onClick={e => (setShowPopover(true))}>
                    <IonIcon style={{"fontSize": 200+"%"}} icon={menuOutline}/>
                </IonButton>
            </div>
        </div>
    );
}

export default UavAddDialog;