import React, { useState } from 'react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';
import { IonCard, IonItem, IonLabel, IonIcon, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { removeCircleOutline } from 'ionicons/icons';

const LogPanel = (props:any) => {
    return(
        <IonCard>
          <IonItem>
            <IonLabel>{props.date}</IonLabel>
            <IonIcon color="danger" icon={removeCircleOutline} slot="end" />
          </IonItem>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol><strong>Pilot name:</strong></IonCol>
                <IonCol>{props.pilotName}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>UAV:</strong></IonCol>
                <IonCol>{props.uavId}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>GPS:</strong></IonCol>
                <IonCol>{props.gps}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>Flight duration:</strong></IonCol>
                <IonCol>{props.fdur}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>Flight type:</strong></IonCol>
                <IonCol>{props.ftype}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol><strong>Special events:</strong></IonCol>
                <IonCol>{props.sevents}</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
    );
}

export default LogPanel;