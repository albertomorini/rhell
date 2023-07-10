import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";
import React, { useRef, useState } from "react";
import { closeCircle } from 'ionicons/icons';
import { doRequest } from "../HttpRequester";


export default function AddWidget(props){
     const refAddWidget = useRef()
     const [WidgetType,setWidgetType] = useState("");
     const [Title,setTitle] = useState("");
     const [Command,setCommand] = useState("");

     function saveNewWidget(){
          if(WidgetType!="" && Title!="" && Command!=""){
               doRequest("saveNewWidget",{
                    "type": WidgetType,
                    "title": Title,
                    "commad" : Command
               }).then(res=>{
                    if(res.status==200){

                    }else{
                         //TODO: error saving new widget
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
               
               </IonContent>


               

          </IonModal>
          </>
     )
}

