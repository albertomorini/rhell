import { IonButton, IonButtons, IonContent, IonItem, IonLabel, IonInput, IonTextarea } from "@ionic/react";
import moment from "moment"
import { useEffect, useState } from "react";
import { BsPower, BsArrowClockwise, BsTerminal } from "react-icons/bs"
import { Storage } from '@ionic/storage';
import { executeCommand } from "./serverTalker";



function Container(props){
    let [Command,setCommand] = useState();
    let [FontSize,setFontSize] = useState();


    function loadConfig(){
        const store = new Storage();
        store.create();
        store.get('FontSize').then(res=>{
            setFontSize(res);
        })
    }
    function shutdown(){
        //TODO ask confirm
    }

    function restart(){
        //TODO: ask confirm
        
    }

    function sendCommand(){
        executeCommand().then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        loadConfig()
    }, [props.settingsChanged]);

    return(
        <IonContent>
            <h2 style={{ fontSize: FontSize }}>{moment().format("DD/MM/YYYY")}</h2>
                <IonButton color="warning" onClick={()=>restart()}>
                    <BsArrowClockwise size={26}></BsArrowClockwise>
                </IonButton>

                <IonButton color="danger" onClick={()=>shutdown()}>
                    <BsPower size={26}></BsPower>
                </IonButton>

            <br></br>
                <IonLabel style={{fontSize: FontSize}}>Command</IonLabel>

                    <IonTextarea style={{ fontSize: FontSize }} clearOnEdit={true} autofocus={true} mode="ios" wrap="soft" autoGrow={true} onIonChange={(ev)=>setCommand(ev.target.value)}>


                    </IonTextarea>

                      <IonButton style={{ fontSize: FontSize }} size="large" onClick={()=>sendCommand()}>
                        Send

                        <BsTerminal size={26}></BsTerminal>
                    </IonButton>
        </IonContent>
    );
}

export default Container;