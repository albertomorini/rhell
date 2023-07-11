import React, { useContext, useEffect, useState } from "react";
import { IonButton, IonContent, IonInput, IonLabel } from '@ionic/react';
import { doRequest, loadConfig } from "../HttpRequester";
import md5 from "md5";
import { MyContext } from "../pages/Dashboard";


export default function Login(){
     const [Username,setUsername] = useState();
     const [Password,setPassword] = useState();
     const ctx = useContext(MyContext)

     useEffect(()=>{
          loadConfig().then(config=>{
               if(!config){
                    //TODO: Alert, empty config
               }
          })
     })

     function doLogin(){
          doRequest("authenticate",{
               "username":Username,
               "password": md5(Password)
          }).then(res=>{
               if(res.status==200){
                    res.json().then(r=>{
                         ctx.User.setUser(r)
                    })
               }
          });
     }
     function enterPressed(ev) {
          if (ev.key == "Enter") { //if pressend enter, process credentials
               doLogin()
          }
     }

     return(
          <IonContent className="ion-padding" style={{width:"50%", margin:"0"}}>
               <IonLabel>Username</IonLabel>
               <IonInput mode="md" fill="outline" type="text" onIonChange={(ev) => setUsername(ev.target.value)} placeholder="your username.." onKeyDown={(ev) => enterPressed(ev)} />
               <IonLabel>Password</IonLabel>
               <IonInput mode="md" fill="outline" type="password" onIonChange={(ev) => setPassword(ev.target.value)} placeholder="anybody's watching?" onKeyDown={(ev) => enterPressed(ev)} />
               <IonButton color="success" mode="ios" onClick={()=>doLogin()} expand="block">Login</IonButton>
          </IonContent>

     )
}