import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import firebase from './components/Firebase'
import Login from './pages/Login'
import Register from './pages/Register'

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
import Dashboard from './pages/Dashboard';

const RoutingSystem: React.FC = () => {
  return(
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/dashboard" component={Dashboard} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [bussy, setBussy] = useState<Boolean>(true);

  useEffect(() => {
    firebase.getCurrentUser().then(user => {
      if(user){
        window.history.replaceState({}, '', '/dashboard');
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
