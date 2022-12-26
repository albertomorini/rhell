import { IonButton, IonButtons, IonContent, IonItem, IonLabel, IonInput, IonTextarea } from "@ionic/react";
import moment from "moment"
import { useState } from "react";
import { BsPower, BsArrowClockwise, BsTerminal } from "react-icons/bs"


import { Storage } from '@ionic/storage';

function Container(){
    let [Command,setCommand] = useState();


    function loadConfig(){
        const store = new Storage();
        store.create();
        store.get('username').then(res=>{
            console.log(res);
        })
    }




    function shutdown(){
        //TODO ask confirm
    }

    function restart(){
        //TODO: ask confirm
        
    }

    function sendCommand(){

    }

    return(
        <IonContent>
            <h2>{moment().format("DD/MM/YYYY")}</h2>
                <IonButton color="warning" onClick={()=>restart()}>
                    <BsArrowClockwise size={26}></BsArrowClockwise>
                </IonButton>

                <IonButton color="danger" onClick={()=>shutdown()}>
                    <BsPower size={26}></BsPower>
                </IonButton>

            <br></br>
                    <IonLabel >Command</IonLabel>

                    <IonTextarea clearOnEdit={true} autofocus={true} mode="ios" wrap="soft" autoGrow={true} onIonChange={(ev)=>setCommand(ev.target.value)}>


                    </IonTextarea>

                    <IonButton size="large" onClick={()=>sendCommand()}>
                        Send

                        <BsTerminal size={26}></BsTerminal>
                    </IonButton>


<button onClick={()=>loadConfig()}>aaa</button>
        </IonContent>
    );
}

export default Container;