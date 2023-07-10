import { IonButton, IonContent, IonLabel, IonTextarea, IonGrid, IonRow, IonCol } from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsPower, BsArrowClockwise, BsTerminal } from "react-icons/bs";
import { Storage } from '@ionic/storage';
import { executeCommand } from "./Rhell/src/components/serverTalker";
import "../theme/Container.css";


function Container(props){
    let [Command,setCommand] = useState();
    let [FontSize,setFontSize] = useState();
    let [Output,setOutput] = useState();

    ///////////////////////////////////
    function loadConfig(){
        const store = new Storage();
        store.create();
        store.get('FontSize').then(res=>{
            setFontSize(res);
        });
    }
    ///////////////////////////////////

    function shutdown(){
        executeCommand("sudo shutdown").then(res => {
            let x = res.res.replace("\\","\\n")
            setOutput(x)
        }).catch(err => {
            console.log(err);
        })
    }

    function restart(){
        executeCommand("sudo reboot").then(res => {
            let x = res.res.replace("\\", "\\n")
            setOutput(x)
        }).catch(err => {
            console.log(err);
        })
    }

    function sendCommand(){
        executeCommand(Command).then(res=>{
            res.res.split("\ ").forEach(s=>{
                console.log(s+"a");
            })
            console.log(res.res.replace("\\n","a"));
            let x = res.res.replace("\\n", "<br/>")
            setOutput(x)
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

            <IonTextarea id="myTextArea" placeholder="Insert a command" style={{fontSize: FontSize }} clearOnEdit={true} autofocus={true} className="TextBoxCMD" mode="ios" wrap="soft" autoGrow={true} onIonChange={(ev)=>setCommand(ev.target.value)} />

            <div id="CtnButtonSender">
                <IonButton expand="block" mode="ios" style={{ fontSize: FontSize }}  onClick={()=>sendCommand()}>
                    Send
                    <BsTerminal size={26}></BsTerminal>
                </IonButton>
            </div>
            <div id="myOutput" style={{ fontSize: FontSize }}>
                {Output}
            </div>
        </IonContent>
    );
}

export default Container;