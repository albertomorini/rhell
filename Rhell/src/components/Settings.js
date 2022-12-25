import React, {useState, useRef, useEffect} from 'react';
import {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonPage,
        IonItem,
        IonLabel,
        IonInput,
    IonIcon
} from '@ionic/react';


function Settings(){
    let [IPServer,setIPServer] = useState();
    let [Username, setUsername] = useState();
    let [Password, setPassword] = useState();
    let [FontSize, setFontSize] = useState(16);

    function storeSettings(){
        console.log("OK");
    }
    function changeFontSize(value){
        if(value==1){
            setFontSize(12)
        }else if(value==2){
            setFontSize(14)
        }else if(value==3){
            setFontSize(16)
        }else if(value==4){
            setFontSize(18)
        }else{
            setFontSize(20)
        }
        //TODO: recheck
    }


    const modal = useRef(null);
    return(
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => console.log(ev)} mode="ios">
            <IonHeader>
                <IonToolbar>
                    <IonButton color="danger" slot="start" onClick={() => modal.current?.dismiss()}>Cancel</IonButton>

                    <IonTitle>Setting</IonTitle>

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
                        <IonInput style={{fontSize: FontSize}} type='password' clearInput={true} placeholder="Password" onIonChange={(ev)=>setPassword(ev.target.value)}></IonInput>
                    </IonItem>
                    <br></br>
                    <br></br>
                    <IonItem>
                        <IonLabel position="stacked">Font size</IonLabel>
                        <IonInput type='range' default={3} min={1} max={5} onIonChange={(ev) => changeFontSize(ev.target.value)}></IonInput>
                    </IonItem>


            </IonContent>
        </IonModal>
    );
}

export default Settings;