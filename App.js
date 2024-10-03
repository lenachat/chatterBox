import StartScreen from './components/Start';
import ChatScreen from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

const App = () => {
  const connectionStatus = useNetInfo(); //hook to get the network connection status

  //initialize Firebase and Cloud Firestore
  const firebaseConfig = {
    apiKey: "AIzaSyB0WHgwZLpODPY8N_9iw7Pfcy8bGTxs33Q",
    authDomain: "chatterbox-8bac1.firebaseapp.com",
    projectId: "chatterbox-8bac1",
    storageBucket: "chatterbox-8bac1.appspot.com",
    messagingSenderId: "48626129731",
    appId: "1:48626129731:web:a71657bb6a1cd1b9042df6"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const storage = getStorage(app);

  //check for network connection status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("No internet connection.");
      disableNetwork(db); //disable attempt to reconnect to the Firestore database when there is no internet connection
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db); //enable the network connection to the Firestore database
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name='ChatterBox' component={StartScreen} />
        <Stack.Screen name='ChatScreen'>
          {props => <ChatScreen {...props} db={db} isConnected={connectionStatus.isConnected} storage={storage} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;