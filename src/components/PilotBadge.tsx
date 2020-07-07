import React, { useState } from 'react';
import { IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel, IonInput, 
         IonGrid, IonCol, IonRow } from '@ionic/react';
import '../theme/cust.css';
import { presentToast } from '../components/Toast'
import Firebase from '../components/Firebase';
import { menuOutline, closeOutline, documentTextOutline, addOutline, createOutline, removeOutline, trashOutline } from 'ionicons/icons'
import AddLog from './AddLogMain';

const PilotBadge = (props:any) => {
    const [id, setId] = useState(props.pilotID);
    const [name, setName] = useState(props.pilotName);
    const [newName, setNewName] = useState(props.pilotName)
    const [showPopover, setShowPopover] = useState(false);
    const [showPopRename, setShowPopRename] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showPopDelete, setShowPopDelete] = useState(false);

    function rename(){
        Firebase.renamePilotLogs(newName, id)
        .then(() => {
            setName(newName);
            setShowPopRename(false);
        })
        .catch(err => {
            presentToast(err);
        })
    }

    function goToLog(){
        window.history.pushState(['pilot', id, name], '','/logTable');
        window.location.reload();
    }

    function delPilotLogs(){
        Firebase.deletePilotLogs(id)
        .then(() => {
            setShowPopDelete(false);
            setId(null);
            // TODO: processing spinner.
        })
        .catch(err => {
            presentToast(err);
        })
    }

    if(id === null){ return(null);}
    else {
        return(
            <div className="UAVBadge-base">
                <AddLog isOpen={showAddDialog} onDidDismiss={() => setShowAddDialog(false)} pilotID={id}/>
                <IonPopover
                    isOpen={showPopRename}
                    onDidDismiss={e => setShowPopRename(false)}
                    cssClass="WideDialog">
                        <IonList>
                            <IonItem><h2>Delete</h2></IonItem>
                                <IonItem>
                                    <IonInput value={newName} onIonChange={(e: any) => setNewName(e.target.value)}/>
                                </IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonButton color="light" onClick={e => setShowPopRename(false)}>Cancel</IonButton>
                                    </IonCol>
                                    <IonCol class="ion-text-right">
                                        <IonButton color="primary" onClick={rename}>Save</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonList>
                    </IonPopover>
                    <IonPopover
                    isOpen={showPopDelete}
                    onDidDismiss={e => setShowPopDelete(false)}
                    cssClass="WideDialog">
                        <IonGrid>
                            <IonRow>
                              <IonCol class="ion-text-center">
                                Are you shure you wnat to delete <strong>{name} </strong>?
                              </IonCol>
                            </IonRow>
                            <IonRow>
                              <IonCol><IonButton color="light" onClick={() => setShowPopDelete(false)}>Cancel</IonButton></IonCol>
                              <IonCol class="ion-text-right"><IonButton color="danger" onClick={delPilotLogs}>Delete</IonButton></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonPopover>
                <div className="imbed-image">
                    <IonButton className="btn-fill" color="success" onClick={() => setShowAddDialog(true)}>
                        <IonIcon style={{"fontSize": 200+"%"}} icon={addOutline}/>
                    </IonButton>
                </div>
                <div className="mid-section">
                    <div>
                        <h3>{name}</h3>
                    </div>
                </div> 
                <div className="ham-menu">
                    <IonPopover
                    isOpen={showPopover}
                    onDidDismiss={e => setShowPopover(false)}>
                        <IonList>
                            <IonItem><h2>{name}</h2></IonItem>
                            <IonItem onClick={() => {
                                setNewName(name);
                                setShowPopover(false);
                                setShowPopRename(true);
                            }}>
                                <IonIcon icon={createOutline} />
                                <IonLabel>Rename</IonLabel>
                            </IonItem>
                            <IonItem onClick={goToLog}>
                                <IonIcon icon={documentTextOutline} />
                                <IonLabel>Logs</IonLabel>
                            </IonItem>
                            <IonItem onClick={e => {
                                setShowPopover(false);
                                setShowPopDelete(true);
                                }}>
                                <IonIcon icon={trashOutline} color="danger"/>
                                <IonLabel color="danger">Delete</IonLabel>
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
    
}
export default PilotBadge;