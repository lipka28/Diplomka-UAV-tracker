import React from 'react';
import { IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage, IonContent, IonTabs, IonFab, IonFabButton, IonFabList } from '@ionic/react';
import { newspaper, airplane, personCircleOutline, exitOutline, settingsOutline} from 'ionicons/icons'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import firebase from '../components/Firebase';
import PilotTab from './PilotTab';
import UavsTab from './UavsTab';

const Dashboard: React.FC = () => {

  async function logout(){
      await firebase.logout();
      window.location.reload();
  }

  function toSettings()
  {
    window.location.href = '/userSettings';
  }

  return (
    <IonPage>
      <IonContent>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/pilotTab" component={PilotTab} exact={true} />
              <Route path="/uavTab" component={UavsTab} exact={true} />
              <Route exact path="/dashboard" render={() => <Redirect to="/pilotTab"/>} />
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
        <IonFab horizontal="start" vertical="top" slot="fixed">
            <IonFabButton>
              <IonIcon style={{"fontSize": 500+"%"}} icon={personCircleOutline}></IonIcon>
            </IonFabButton>
            <IonFabList>
              <IonFabButton onClick={toSettings} color="light">
                <IonIcon icon={settingsOutline}/>
              </IonFabButton>
              <IonFabButton onClick={logout} color="danger">
                <IonIcon icon={exitOutline}/>
              </IonFabButton>
            </IonFabList>
          </IonFab>
    </IonContent>
    </IonPage>
  );
};

export default Dashboard;
