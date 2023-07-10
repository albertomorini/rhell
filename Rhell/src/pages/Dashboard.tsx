import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import '../theme/Dashboard.css';
import { useState } from 'react';
import Login from "../components/Login.jsx"
import Launcher from "../components/Launcher.jsx"


const Tab1: React.FC = () => {
  const [User,setUser]=useState(null);

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rhell</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Rhell</IonTitle>
          </IonToolbar>
        </IonHeader>
        {(User==null)?
          <Login setUser={(obj:Object)=>setUser(Object)}/>
            :
          <Launcher/>
      }
    </IonContent>
  );
};

export default Tab1;
