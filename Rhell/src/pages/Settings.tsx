import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Storage } from '@ionic/storage';

const Tab2: React.FC = () => {

  const [ServerName, setServerName] = useState();
  const store = new Storage();

  function saveServerConfig(){
    store.create();
    store.set("serverName",ServerName);
  }
  function enterPressed(ev : any){
    if (ev.key == "Enter") { //if pressend enter, process credentials
      saveServerConfig()
    } 
  }

  return (

    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rhell</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLabel>server name (or IP):</IonLabel>
      <IonInput type="text" fill="outline" mode="md" placeholder='albys-mac.local'  onIonChange={(ev)=>setServerName(ev.target.value)} onKeyDown = {(ev) => enterPressed(ev)}/>
      <IonButton onClick={()=>saveServerConfig()} expand="block" color="success" mode="ios">Save</IonButton>

    </IonContent>
  );
};

export default Tab2;
