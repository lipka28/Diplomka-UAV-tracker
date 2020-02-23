import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonContent, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { newspaper, airplane } from 'ionicons/icons'
import firebase from './components/Firebase'
import Login from './pages/Login'
import Register from './pages/Register'
import PilotTab from './pages/PilotTab'
import UavsTab from './pages/UavsTab'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const RoutingSystem: React.FC = () => {
  return(

    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/pilotTab" component={PilotTab} exact={true} />
            <Route path="/uavTab" component={UavsTab} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/pilotTab" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="test1" href="/pilotTab">
              <IonIcon icon={newspaper} />
              <IonLabel>Diarry</IonLabel>
            </IonTabButton>
            <IonTabButton tab="test2" href="/uavTab">
              <IonIcon icon={airplane} />
              <IonLabel>UAV's</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

const App: React.FC = () => {
  const [bussy, setBussy] = useState<Boolean>(true);

  useEffect(() => {
    firebase.getCurrentUser().then(user => {
      if(user){
        window.history.replaceState({}, '', '/pilotTab');
      } else {
        window.history.replaceState({}, '', '/login');
      }
      setBussy(false);
    })

  }, [])

  return(
    <IonApp>
      {bussy ? <IonSpinner /> : <RoutingSystem />}
    </IonApp>
  )
  
};

export default App;
