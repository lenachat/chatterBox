import { StyleSheet, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { GiftedChat, Bubble, SystemMessage, InputToolbar, Send, Day } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const ChatScreen = ({ route, navigation, db, isConnected, storage }) => {
  const { userID } = route.params;
  const { name, bgColor } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubscribe;
  useEffect(() => {
    navigation.setOptions({
      title: `Hello ${name}!`
    });

    if (isConnected === true) {

      // unsubscribe from the snapshot listener if it is already active preventing multiple listeners 
      // when the component is re-rendered due to changes in the connection status
      if (unsubscribe) {
        unsubscribe = null;
      }

      // query the Firestore database for messages
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date() });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else { loadCachedMessages(); }

    // unsubscribe from the snapshot listener when the component is unmounted
    return () => {
      if (unsubscribe)
        unsubscribe();
    };
  }, [isConnected]);

  // cache messages to AsyncStorage
  const cacheMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // load cached messages from AsyncStorage (is called when there is no internet connection)
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || [];
    setMessages(JSON.parse(cachedMessages));
  };

  //save sent messages on Firestore database
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // Custom SystemMessage component to style the system messages
  const renderSystemMessage = (props) => {
    let textColor = '#000'; // default system message color
    if (bgColor === '#090C08') {
      textColor = '#FFF'; // white text for dark background
    } else if (bgColor === '#474056') {
      textColor = '#FFF'; // white text for dark purple background
    } else if (bgColor === '#8A95A5') {
      textColor = '#2b2b2b'; // darker text for grey background
    } else if (bgColor === '#B9C6AE') {
      textColor = '#2b2b2b'; // darker text for light green background
    } else if (bgColor === '#FFF') {
      textColor = '#000'; // black text for white default background
    }

    return (
      <SystemMessage
        {...props}
        textStyle={{ color: textColor }}
      />
    );
  };

  // Custom Bubble component to style the chat bubbles
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000',
          borderColor: '#ccc',
          borderWidth: 2,
        },
        left: {
          backgroundColor: '#fff',
          borderColor: '#5c5c5c',
          borderWidth: 2,
        }
      }}
    />
  };

  // Custom InputToolbar to add padding to the message input
  const renderInputToolbar = (props) => {
    return (
      (isConnected === true) ?
        <InputToolbar
          {...props}
          containerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }} // Add padding to input
        />
        : null
    );
  };

  // custom Send button
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </View>
      </Send>
    );
  };

  // custom colors on Day component
  const renderDay = (props) => {
    let textColor = '#000'; // default system message color
    if (bgColor === '#FFF') {
      textColor = '#2b2b2b'; // dark text for white background
    } else if (bgColor === '#090C08') {
      textColor = '#FFF'; // white text for dark background
    } else if (bgColor === '#474056') {
      textColor = '#FFF'; // white text for dark purple background
    } else if (bgColor === '#8A95A5') {
      textColor = '#2b2b2b'; // darker text for grey background
    } else if (bgColor === '#B9C6AE') {
      textColor = '#2b2b2b'; // darker text for light green background
    }
    return (
      <Day
        {...props}
        textStyle={{ color: textColor }}
      />
    );
  };

  const renderCustomActions = (props) => {
    return <CustomActions {...props} userID={userID} name={name} onSend={onSend} storage={storage} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderDay={renderDay}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: 'white',
    zIndex: 10,
  },
  sendButtonText: {
    color: '#004d00',
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 8,
  },
});

export default ChatScreen;