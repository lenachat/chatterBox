import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#FFF');

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/background-image.png')}>
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
              style={[styles.backgroundColorButton, { backgroundColor: '#090C08' }, bgColor === "#090C08" && styles.selectedColor]}
              onPress={() => setBgColor('#090C08')} />
            <TouchableOpacity
              style={[styles.backgroundColorButton, { backgroundColor: '#474056' }, bgColor === "#474056" && styles.selectedColor]}
              onPress={() => setBgColor('#474056')} />
            <TouchableOpacity
              style={[styles.backgroundColorButton, { backgroundColor: '#8A95A5' }, bgColor === "#8A95A5" && styles.selectedColor]}
              onPress={() => setBgColor('#8A95A5')} />
            <TouchableOpacity
              style={[styles.backgroundColorButton, { backgroundColor: '#B9C6AE' }, bgColor === "#B9C6AE" && styles.selectedColor]}
              onPress={() => setBgColor('#B9C6AE')} />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChatScreen', { name: name, bgColor: bgColor })}>
            <Text style={styles.enterChatroomText}>
              Enter Chatroom
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground >
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
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginBottom: 15,
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