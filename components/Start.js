import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";

const StartScreen = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#FFF');

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        if (result.user) {
          navigation.navigate('ChatScreen', { userID: result.user.uid, name: name, bgColor: bgColor});
          Alert.alert('Signed in Successfully');
        }
      })
      .catch((error) => {
        Alert.alert('Unable to sign in. Try again later.', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={styles.backgroundImage}>
        <Text style={styles.appTitle}>Welcome!</Text>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder='Type your name here'
          />
          <Text style={styles.chooseColorText}>Choose Background Color:</Text>
          <View style={styles.backgroundColorButtonsContainer}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Black background"
              accessibilityHint="Let's you choose a black background color for the chat interface"
              style={[styles.backgroundColorButton, { backgroundColor: '#090C08' }, bgColor === "#090C08" && styles.selectedColor]}
              onPress={() => setBgColor('#090C08')} />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Dark purple background"
              accessibilityHint="Let's you choose a dark purple background color for the chat interface"
              style={[styles.backgroundColorButton, { backgroundColor: '#474056' }, bgColor === "#474056" && styles.selectedColor]}
              onPress={() => setBgColor('#474056')} />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Grey background"
              accessibilityHint="Let's you choose a grey background color for the chat interface"
              style={[styles.backgroundColorButton, { backgroundColor: '#8A95A5' }, bgColor === "#8A95A5" && styles.selectedColor]}
              onPress={() => setBgColor('#8A95A5')} />
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Green background"
              accessibilityHint="Let's you choose a green background color for the chat interface"
              style={[styles.backgroundColorButton, { backgroundColor: '#B9C6AE' }, bgColor === "#B9C6AE" && styles.selectedColor]}
              onPress={() => setBgColor('#B9C6AE')} />
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Enter Chatroom"
            accessibilityHint="Let's you enter the chatroom"
            style={styles.button}
            onPress={signInUser}>
            <Text style={styles.enterChatroomText}>
              Enter Chatroom
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: '45',
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: "15%",
  },
  loginContainer: {
    width: "88%",
    height: "44%",
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: "35%",
  },
  textInput: {
    fontSize: "16",
    fontWeight: "300",
    color: "#757083",
    opacity: "50%",
    width: "88%",
    padding: 10,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginBottom: 10,
    marginTop: "7%",
  },
  chooseColorText: {
    fontSize: "16",
    fontWeight: "300",
    color: "#757083",
    marginBottom: 15,
    marginTop: 15,
    flex: 1,
  },
  backgroundColorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
  },
  backgroundColorButton: {
    borderRadius: 25,
    width: 50,
    height: 50,
    margin: 10,
  },
  selectedColor: {
    borderColor: "lightgray",
    borderWidth: 3,
  },
  button: {
    width: "88%",
    padding: 15,
    marginBottom: "7%",
    marginTop: 15,
    backgroundColor: '#757083',
  },
  enterChatroomText: {
    fontSize: "16",
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: 'center',
  },

});

export default StartScreen;