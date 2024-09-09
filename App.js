import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const App = () => {

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name='ChatterBox' component={StartScreen} />
        <Stack.Screen name='ChatScreen'>
          {props => <ChatScreen {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;