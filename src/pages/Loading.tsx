import React from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import '../theme/cust.css';

const CustSpinner: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonSpinner color="primary" class="SpinnerCenter" />
      </IonContent>
    </IonPage>
  );
};

export default CustSpinner;
