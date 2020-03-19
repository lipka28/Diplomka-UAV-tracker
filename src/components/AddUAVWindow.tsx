import React, { useState } from 'react';
import { IonInput, IonButton, IonPopover, IonGrid, IonRow, IonCol } from '@ionic/react';
import '../theme/cust.css';
import Firebase from '../components/Firebase';

const UavAddDialog = (props:any) => {

    return(
        <IonPopover
            isOpen={props.isOpen}
            onDidDismiss={props.onDidDismiss}
            cssClass="WideDialog">
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
                   placeholder="Display name"/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonInput 
                   type="text" 
                   placeholder="Registered operator name"/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                   <IonInput 
                   type="text" 
                   placeholder="Registration Code (OK-XXXXXX)"/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol><IonButton color="light" onClick={props.onDidDismiss}>Cancle</IonButton></IonCol>
                <IonCol class="ion-text-right"><IonButton color="primary">Add</IonButton></IonCol>
              </IonRow>
            </IonGrid>
        </IonPopover>
    );
}

export default UavAddDialog;