import { StyleSheet, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { GiftedChat, Bubble, SystemMessage, InputToolbar, Send, Day } from 'react-native-gifted-chat';
import { collection, addDoc, getDocs, onSnapshot, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

const ChatScreen = ({ route, navigation, db }) => {
  const { userID } = route.params;
  const { name, bgColor } = route.params;
  const [messages, setMessages] = useState([]);

  //save sent messages on Firestore database
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Hello ${name}!`
    });
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let newMessages = [];
      querySnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date() });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubscribe)
        unsubscribe();
    };
  }, []);

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
      <InputToolbar
        {...props}
        containerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }} // Add padding to input
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </View>
      </Send>
    );
  };

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

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderDay={renderDay}
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