import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { add, closeCircle } from 'ionicons/icons';
import { doRequest } from "../HttpRequester";
import { MyContext } from "../pages/Dashboard";


export default function AddWidget(props){
     const ctx = useContext(MyContext);
     const refAddWidget = useRef()
     const [WidgetType,setWidgetType] = useState("web");
     const [Title,setTitle] = useState(null);
     const [Command, setCommand] = useState(null);
     const [Message,setMessage] = useState();

     function cleanInterface(){ //bring state to default
          setWidgetType("web");
          setTitle(null);
          setCommand(null);
     }

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
                         cleanInterface();
                    }else{
                         setMessage("Error saving new widget, try again...")
                         setTimeout(()=>setMessage(""),2500);
                    }
               })
          }
     }

     return(
          <>
          <IonFab horizontal="end" mode="ios" className="ion-padding" vertical="vertical" style={{marginBottom: "50px"}}>
               <IonFabButton mode="ios"  onClick={()=>{
                    refAddWidget?.current?.present()
               }}>
                         <IonIcon mode="ios" icon={add}/>
               </IonFabButton>
          </IonFab>
          
          <IonModal ref={refAddWidget} mode="ios">
               <IonHeader>
                    <IonToolbar>
                         <IonTitle>Add a widget</IonTitle>
                         <IonButton color="danger" slot="end" onClick={()=>{
                              refAddWidget?.current?.dismiss()
                              cleanInterface();
                         }}>
                              <IonIcon icon={closeCircle} />
                         </IonButton>
                    </IonToolbar>
               </IonHeader>

               <IonContent className="ion-padding">

                    <IonSegment value={WidgetType} onIonChange={(ev)=>setWidgetType(ev.target.value)} mode="ios">
                         <IonSegmentButton value="web">Web service</IonSegmentButton>
                         <IonSegmentButton value="shell">Shell</IonSegmentButton>
                    </IonSegment>

                    <div className="ion-padding-top">
                         <IonLabel><b>TITLE</b></IonLabel>
                         <IonInput type="text" placeholder="title of widget..." mode="md" fill="outline" 
                              onIonChange={(ev)=>setTitle(ev.target.value)}
                         />
                         <br/>
                         <IonLabel><b>COMMAND</b></IonLabel>
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

