import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Container from './Container';
import Settings from './Settings';
import './Home.css';

import { BsGearWideConnected } from "react-icons/bs";
import { useState } from 'react';


const Home: React.FC = () => {
  let [settingsChanged,setSettingChanged] = useState();
  return (
    <IonPage>
      <IonHeader translucent={true} mode="ios">
        <IonToolbar>
          <IonTitle>Rhell</IonTitle>
          <IonButton slot='end' color="warning" id="open-modal">
            <BsGearWideConnected mode='ios' size={26}/>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container settingsChanged={settingsChanged}/>
        <Settings settingChanged={(a:any)=>setSettingChanged(a)}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
