
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
               console.log(res)
               setListOfWidget(res)
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
     function playCommand(){
          //EXECUTE
     }

     useEffect(()=>{
          getWidgets();
     },[])

     return(
          <IonContent className="ion-padding" mode="ios">
               <IonGrid>
               <IonRow>
               {ListOfWidget?.map((widget,index)=>(
                    <IonCol size="4">
                         <IonCard>
                              <IonCardTitle>
                                   {widget.title}
                              </IonCardTitle>
                              <IonCardSubtitle>{widget.type}</IonCardSubtitle>
                              <IonCardContent >
                                   <IonText>{widget.command}</IonText>

                                   <IonButton color="danger" slot="end">
                                        <IonIcon icon={trashBin}/>
                                   </IonButton>
                                   <IonButton color="warning" >
                                        <IonIcon icon={pencil}/>
                                   </IonButton>
                                   <IonButton color="secondary">
                                        <IonIcon icon={play}/>
                                   </IonButton>
                              </IonCardContent>
                         </IonCard>
                    </IonCol>
               ))}
               </IonRow>
               </IonGrid>
               <AddWidget reloadList={()=>getWidgets()}/>
          </IonContent>
     )
}


/* <IonCardSubtitle>{widget._id}</IonCardSubtitle> */