import React, {useState, useRef, useEffect} from 'react';
import {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonLabel,
        IonInput,
    IonIcon
} from '@ionic/react';
import { Storage } from '@ionic/storage';

import md5 from 'js-md5';


function Settings(){
    let [IPServer,setIPServer] = useState();
    let [Username, setUsername] = useState();
    let [Password, setPassword] = useState();
    let [FontSize, setFontSize] = useState(16);

    function storeSettings(){
        console.log(Password);

        console.log("OK");
        const store = new Storage();
        store.create();
        store.set('Username', Username);
        store.set('Password', Password);
        store.set('FontSize', FontSize);
        store.set('IPServer', IPServer);
    }
    function changeFontSize(value){
        setFontSize(10+(2*value)); //12,14,16,18,20
    }


    const modal = useRef(null);
    return(
        <IonModal ref={modal} trigger="open-modal" mode="ios">
            <IonHeader>
                <IonToolbar>
                    <IonButton color="danger" slot="start" onClick={() => modal.current?.dismiss()}>Cancel</IonButton>

                    <IonTitle style={{fontSize: FontSize}}>Setting</IonTitle>

                        <IonButton color="success" slot="end" strong={true} onClick={() => {modal.current?.dismiss(); storeSettings()}}>
                            Confirm
                        </IonButton>

                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                    <IonItem>
                        <IonLabel style={{fontSize: FontSize}} position="stacked">IP server</IonLabel>
                        <IonInput style={{fontSize: FontSize}} clearInput={true} placeholder="10.0.0.3" onIonChange={(ev)=>setIPServer(ev.target.value)} value={IPServer}></IonInput>
                    </IonItem>
                    <br></br>
                    <br></br>
                    <IonItem>
                        <IonLabel style={{fontSize: FontSize}} position="stacked">Username</IonLabel>
                        <IonInput style={{fontSize: FontSize}} clearInput={true} placeholder="alby" onIonChange={(ev)=>setUsername(ev.target.value)} value={Username}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel style={{fontSize: FontSize}} position="stacked">Password</IonLabel>
                    <IonInput style={{ fontSize: FontSize }} type='password' clearInput={true} placeholder="Password" onIonChange={(ev) => setPassword(md5(ev.target.value))}></IonInput>
                    </IonItem>
                    <br></br>
                    <br></br>
                    <IonItem>
                    <IonLabel style={{ fontSize: FontSize }}  position="stacked">Font size</IonLabel>
                        <IonInput type='range' default={3} min={1} max={5} onIonChange={(ev) => changeFontSize(ev.target.value)}></IonInput>
                    </IonItem>


            </IonContent>
        </IonModal>
    );
}

export default Settings;