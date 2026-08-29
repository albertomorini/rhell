
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddWidget from "./AddWidget";
import { doRequest } from "../HttpRequester";
import { MyContext } from "../pages/Dashboard";
import { closeCircle, pencil, trashBin } from "ionicons/icons";
import ImmediateShell from "./ImmediateShell";
import "../theme/Cardwidget.css";



export default function Launcher(){
     const [ListOfWidget,setListOfWidget]= useState([])
     const [OutputShell,setOutputShell] = useState(null);
     const refOutputShell = useRef();
     const ctx = useContext(MyContext)
     
     // get all widgets of user
     function getWidgets(){
          doRequest("mngWidget",{
               "action":"R",
               "username": ctx.User.User.Username,
               "password": ctx.User.User.Password
          }).then(res=>res.json()).then(res=>{
               setListOfWidget(res.data)
          }).catch(err=>{
               console.log("Error: "+err);
          })
     }
     //delete a widget clicked
     function deleteWidget(WidgetID){
          doRequest("mngWidget",{
               "action":"D",
               "username": ctx.User.User.Username,
               "password": ctx.User.User.Password,
               "WidgetID": WidgetID
          }).then(res=>{
               if(res.status==200){
                    getWidgets();
               }else{
                    console.log("Error, status request: " + res.status);
               }
          }).catch(err=>{
               console.log("Error: " + err);
          })
     }

     function editWidget(){
          //IDEA: reopen popup?
     }
     //EXEC A SHELL COMMAND
     function execShell(command){
          doRequest("execShell",{
               "command": command,
               "username": ctx.User.User.Username,
               "password": ctx.User.User.Password
          }).then(res=>res.json()).then(res=>{
               setOutputShell(res.data);
               console.log(res.data);
               refOutputShell?.current?.present();
          }).catch(err=>{
               setOutputShell(err);
               refOutputShell?.current?.present();
          })
     }

     /**
      * EXECUTE the command associated to the widget
      * @param {Object} widget the widget clicked
      */
     function playCommand(widget){
          if(widget.type=="shell"){
               execShell(widget.command);
          }else if(widget.type=="web"){
               window.open(widget.command);
          }
     }

     useEffect(()=>{
          getWidgets();
     },[])

     return(
          <IonContent className="ion-padding" mode="ios">
               {
                    //output modal shell command
               }

               <IonModal ref={refOutputShell}>
                    <IonHeader>
                         <IonToolbar>
                              <IonTitle>Output shell</IonTitle>
                              <IonButton color="danger" slot="end" onClick={() => {
                                   refOutputShell?.current?.dismiss()
                                   setOutputShell(null)
                              }}>
                                   <IonIcon icon={closeCircle} />
                              </IonButton>
                         </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                         <div style={{height:"100%",borderRadius: "9px",border: "2px solid black"}} className="ion-padding">
                              {OutputShell}
                         </div>
                    </IonContent>
               </IonModal>
       
       
               <IonGrid>
                    <IonRow>
                    {ListOfWidget?.map((widget,index)=>(
                         <IonCol size="4">
                              <IonCard button="true" onClick={()=>playCommand(widget)} color="dark" mode="ios" className="CardWidget">
                                   <IonCardTitle className="CardTitle">
                                        {widget.title}
                                   </IonCardTitle>
                                   <IonCardSubtitle>{widget.type} - {widget._id}</IonCardSubtitle>
                                   <IonCardContent >
                                        <IonText>{widget.command}</IonText>
                                        <IonButton className="CardButtons" color="danger" slot="end" onClick={()=>deleteWidget(widget._id)}>
                                             <IonIcon icon={trashBin}/>
                                        </IonButton>
                                        <IonButton color="warning"  className="CardButtons">
                                             <IonIcon icon={pencil}/>
                                        </IonButton>
                                       

                                   </IonCardContent>
                              </IonCard>
                         </IonCol>
                    ))}
                    {
                         //IMMEDIATE CMD WIDGET
                    }
                    <ImmediateShell execShell={(cmd)=>execShell(cmd)}/>
                    </IonRow>
               </IonGrid>

               <AddWidget reloadList={() => getWidgets()} />

          </IonContent>
     )
}