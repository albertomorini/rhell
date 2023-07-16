import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { createContext, useState } from 'react';
import Login from "../components/Login.jsx"
import Launcher from "../components/Launcher.jsx"

export const MyContext = createContext();


const Dashboard = () => {

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

        
      <MyContext.Provider value={
        {
          "User": {User,setUser},
        }
      }>

        {(User==null)?
          <Login/>
            :
          <Launcher />
      }
      </MyContext.Provider>
    </IonContent>
  );
};

export default Dashboard;
