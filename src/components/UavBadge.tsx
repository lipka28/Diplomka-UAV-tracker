import React, { useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';
import { menuOutline } from 'ionicons/icons'

const UavAddDialog = (props:any) => {
    return(
        <div className="UAVBadge-base">
            <div className="imbed-image"></div>
            
            <div className="mid-section">
                <div>text upper</div>
                <div className="cust-splitter-hor" />
                <div>text bottom</div>
            </div>
            
            <div className="ham-menu">
                <IonButton className="btn-fill" color="light"><IonIcon icon={menuOutline}/></IonButton>
            </div>
        </div>
    );
}

export default UavAddDialog;