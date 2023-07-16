import React, { useRef, useState } from "react";
import { IonButton, IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import "../theme/CardWidget.css"

export default function ImmediateShell(props){
     
     const refImmShell = useRef();
     const [ShellCMD, setShellCMD] = useState(null);

     return(
          <>
               <IonCol size="3">
                    <IonCard className="CardWidget" button="true" onClick={() => refImmShell?.current?.present()} color="dark" mode="ios">
                         <IonCardTitle color="danger">Immediate shell</IonCardTitle>
                         <IonCardSubtitle>SHELL</IonCardSubtitle>
                    </IonCard>
               </IonCol>
               <IonModal ref={refImmShell}>
                    <IonHeader>
                         <IonToolbar>
                              <IonTitle>Immediate shell</IonTitle>
                              <IonButton color="danger" slot="end" onClick={() => {
                                   refImmShell?.current?.dismiss()
                              }}>
                                   <IonIcon icon={closeCircle} />
                              </IonButton>
                         </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                         <IonLabel>Input</IonLabel>
                         <IonTextarea style={{heigth:"500px" }} placeholder="insert custom shell commands" fill="outline" mode="md"
                              onIonChange={(ev)=>setShellCMD(ev.target.value)}
                         />
                         <IonButton expand="block" mode="ios" color="success" onClick={() => props.execShell(ShellCMD)}> EXECUTE</IonButton>
                    </IonContent>
               </IonModal>
          </>
     );
}