import { IonButton, IonButtons, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonGrid, IonRow, IonCol } from "@ionic/react";
import moment from "moment"
import { useEffect, useState } from "react";
import { BsPower, BsArrowClockwise, BsTerminal } from "react-icons/bs"
import { Storage } from '@ionic/storage';
import { executeCommand } from "./serverTalker";
import "../theme/Container.css"


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
        executeCommand("sudo shutdown").then(res => {
            let output = res.res.replace("\\","\\n")
            alert(output)
        }).catch(err => {
            console.log(err);
        })
    }

    function restart(){
        executeCommand("sudo reboot").then(res => {
            let output = res.res.replace("\\", "\\n")
            alert(output)
        }).catch(err => {
            console.log(err);
        })
    }

    function sendCommand(){
        executeCommand(Command).then(res=>{
            let output = res.res.replace("\\", "\\n")
            alert(output)
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        loadConfig()
    }, [props.settingsChanged]);

    return(
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <h2 style={{ fontSize: FontSize }}>{moment().format("DD/MM/YYYY")}</h2>
                    </IonCol>
                    <IonCol style={{textAlign: "right"}}>
                        <IonButton color="warning" onClick={() => restart()}>
                            <BsArrowClockwise size={26}></BsArrowClockwise>
                        </IonButton>

                        <IonButton color="danger" onClick={() => shutdown()}>
                            <BsPower size={26}></BsPower>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <br></br>
                <IonLabel style={{fontSize: FontSize}}>Command</IonLabel>

                    <IonTextarea placeholder="Insert a command" style={{fontSize: FontSize }} clearOnEdit={true} autofocus={true} className="TextBoxCMD" mode="ios" wrap="soft" autoGrow={true} onIonChange={(ev)=>setCommand(ev.target.value)}>

                    </IonTextarea>

                      <IonButton expand="block" style={{ fontSize: FontSize }}  onClick={()=>sendCommand()}>
                        Send

                        <BsTerminal size={26}></BsTerminal>
                    </IonButton>
        </IonContent>
    );
}

export default Container;