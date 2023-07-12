import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { closeCircle } from 'ionicons/icons';
import { doRequest } from "../HttpRequester";
import { MyContext } from "../pages/Dashboard";


export default function AddWidget(props){
     const refAddWidget = useRef()
     const [WidgetType,setWidgetType] = useState("");
     const [Title,setTitle] = useState("");
     const [Command,setCommand] = useState("");
     const ctx = useContext(MyContext);
     const [Message,setMessage] = useState();

     function saveNewWidget(){
          if(WidgetType!="" && Title!="" && Command!=""){
               doRequest("mngWidget",{
                    "action":"I",
                    "username": ctx.User.Username,
                    "title": Title,
                    "type": WidgetType,
                    "command" : Command
               }).then(res=>{
                    if(res.status==200){
                         props.reloadList();
                         refAddWidget?.current?.dismiss();
                    }else{
                         setMessage("Error saving new widget, try again...")
                         setTimeout(()=>setMessage(""),2500);
                    }
               })
          }
     }

     return(
          <>
          <IonCard onClick={() => refAddWidget?.current?.present()} mode="ios">
               <IonCardTitle >Add widget</IonCardTitle>
               <IonCardSubtitle>Add a new widget</IonCardSubtitle>
               <IonCardContent >
               </IonCardContent>
          </IonCard>

          <IonModal ref={refAddWidget} mode="ios">
               <IonHeader>
                    <IonToolbar>
                         <IonTitle>Add a widget</IonTitle>
                         <IonButton color="danger" slot="end" onClick={()=>refAddWidget?.current?.dismiss()}>
                              <IonIcon icon={closeCircle} />
                         </IonButton>
                    </IonToolbar>
               </IonHeader>

               <IonContent>
                    <IonSegment value={WidgetType} onIonChange={(ev)=>setWidgetType(ev.target.value)}>
                         <IonSegmentButton value="web">Web service</IonSegmentButton>
                         <IonSegmentButton value="shell">Shell</IonSegmentButton>
                    </IonSegment>

                    <div>
                         <IonLabel>Title of widget</IonLabel>
                         <IonInput type="text" placeholder="title..." mode="md" fill="outline" 
                              onIonChange={(ev)=>setTitle(ev.target.value)}
                         />
                         <IonLabel>Command</IonLabel>
                         <IonInput type="text" mode="md" fill="outline" placeholder="[http://mypc:port], [python3 ~/dev/nexter/nexter.py]"
                              onIonChange={(ev)=>setCommand(ev.target.value)}
                         />
                    </div>
                    <br/>
                    <br/>
                    <IonButton expand="block" color="success" onClick={()=>saveNewWidget()}>Save</IonButton>

                    <IonText>{Message}</IonText>

               </IonContent>
          </IonModal>
          </>
     )
}

