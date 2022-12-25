import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Container from '../components/Container';
import Settings from '../components/Settings';
import './Home.css';

import { BsGearWideConnected } from "react-icons/bs"


const Home: React.FC = () => {
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
        <Container />
    <Settings></Settings>

      </IonContent>
    </IonPage>
  );
};

export default Home;
