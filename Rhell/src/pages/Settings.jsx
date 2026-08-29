import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Storage } from '@ionic/storage';

const Tab2 = () => {

  const [ServerName, setServerName] = useState();
  const store = new Storage();

  function saveServerConfig(){
    store.create();
    store.set("serverName",ServerName); //save the server name into the cache
  }

  function enterPressed(ev ){
    if (ev.key == "Enter") { //if pressend enter, process credentials
      saveServerConfig()
    } 
  }

  // function changeFontSize(value) {
  //   console.log(10 + (2 * value)); //12,14,16,18,20
  // }

  return (

    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rhell</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className='ion-padding'>
        <IonLabel>server name (or IP):</IonLabel>
        <IonInput type="text" fill="outline" mode="md" placeholder='albys-mac.local'  onIonChange={(ev)=>setServerName(ev.target.value)} onKeyDown = {(ev) => enterPressed(ev)}/>
        <IonButton onClick={()=>saveServerConfig()} expand="block" color="success" mode="ios">Save</IonButton>
        
      </div>

    </IonContent>
  );
};

export default Tab2;

{/* <IonLabel style={{ fontSize: 23 }} position="stacked">Font size</IonLabel> */}
{/* <IonInput mode='ios' type='range' min={1} max={5} onIonChange={(ev) => changeFontSize(ev.target.value)}></IonInput> */}