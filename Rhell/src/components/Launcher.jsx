
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonText } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import AddWidget from "./AddWidget";
import { doRequest } from "../HttpRequester";
import { MyContext } from "../pages/Dashboard";
import { pencil, play, trashBin } from "ionicons/icons";



export default function Launcher(){
     const [ListOfWidget,setListOfWidget]= useState([])
     const ctx = useContext(MyContext)

     function getWidgets(){
          doRequest("mngWidget",{
               "action":"R",
               "username":ctx.User.Username
          }).then(res=>res.json()).then(res=>{
               setListOfWidget(res.data)
          }).catch(err=>{
               console.log("Error: "+err);
          })
     }
     function deleteWidget(WidgetID){
          doRequest("mngWidget",{
               "action":"D",
               "username": ctx.User.Username,
               "WidgetID": WidgetID
          }).then(res=>{
               if(res.status==200){
                    getWidgets();
               }else{
                    //TODO: log error
               }
          })
     }

     function editWidget(){
          //IDEA: reopen popup?
     }
     function execShell(WidgetID){
          doRequest("execShell",{
               "WidgetID": WidgetID,
               "username": ctx.User.Username
          }).then(res=>{
               //TODO: SHOW RESPONSE
          }).catch(err=>{

          })
     }

     function playCommand(widget){
          if(widget.type=="shell"){
               execShell(widget._id);
          }else if(widget.type=="web"){
               
               console.log(widget.command);
               window.open(widget.command);
          }
          //EXECUTE
     }

     useEffect(()=>{
          getWidgets();
     },[])

     return(
          <IonContent className="ion-padding" mode="ios">
               <AddWidget reloadList={() => getWidgets()} />

               <IonGrid>
                    <IonRow>
                    {ListOfWidget?.map((widget,index)=>(
                         <IonCol size="4">
                              <IonCard button="true" onClick={()=>playCommand(widget)} color="dark" mode="ios">
                                   <IonCardTitle>
                                        {widget.title}
                                   </IonCardTitle>
                                   <IonCardSubtitle>{widget.type}</IonCardSubtitle>
                                   <IonCardContent >
                                        <IonText>{widget.command}</IonText>

                                        <IonButton color="danger" slot="end" onClick={()=>deleteWidget(widget._id)}>
                                             <IonIcon icon={trashBin}/>
                                        </IonButton>
                                        <IonButton color="warning" >
                                             <IonIcon icon={pencil}/>
                                        </IonButton>
                                       
                                   </IonCardContent>
                              </IonCard>
                         </IonCol>
                    ))}
                    </IonRow>
               </IonGrid>
          </IonContent>
     )
}


/* <IonCardSubtitle>{widget._id}</IonCardSubtitle> */