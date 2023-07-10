
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonGrid } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AddWidget from "./AddWidget";



export default function Launcher(){
     const [ListOfWidget,setListOfWidget]= useState([])
     useEffect(()=>{
          //TODO: load list of services of user
     },[])
     return(
          <IonContent className="ion-padding" mode="ios">
               <IonGrid>

               {ListOfWidget?.map((widget,index)=>{
                    return(
                         <IonRow>
                              <IonCol>
                                   <IonCard>
                                        <IonCardTitle>{widget.Title}</IonCardTitle>
                                        <IonCardSubtitle>{widget.Command}</IonCardSubtitle>
                                   </IonCard>
                              </IonCol>
                         </IonRow>
                    );
               })}
               </IonGrid>

               <AddWidget />
          </IonContent>
     )
}

