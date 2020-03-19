import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
         IonLabel, IonInput, IonItem, IonButton, IonFab, IonButtons, 
         IonBackButton, IonPopover, IonGrid, IonRow, IonCol, IonLoading } from '@ionic/react';
import '../theme/cust.css';
import Firebase from '../components/Firebase';
import { presentToast } from '../components/Toast'

const UavAddDialog = (props:any) => {

    return(
        <IonPopover
            isOpen={props.isOpen}
            onDidDismiss={props.onDidDismiss}
            cssClass="WideDialog">
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                   Testklydjklydjdskjfsdfsdfsdjfisijhsdfhdlijsdflsdfl
                   Testklydjklydjdskjfsdfsdfsdjfisijhsdfhdlijsdflsdfl
                   Testklydjklydjdskjfsdfsdfsdjfisijhsdfhdlijsdflsdfl
                   Testklydjklydjdskjfsdfsdfsdjfisijhsdfhdlijsdflsdfl
                   Testklydjklydjdskjfsdfsdfsdjfisijhsdfhdlijsdflsdfl
                   Testklydjklydjdskjfsdfsdfsdjfisijhsdfhdlijsdflsdfl
                </IonCol>
              </IonRow>
            </IonGrid>
        </IonPopover>
    );
}

export default UavAddDialog;