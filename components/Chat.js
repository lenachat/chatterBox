import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const ChatScreen = ({ route, navigation }) => {
  const { name, bgColor } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: `Hello ${name}!`
    });
  }, []);


  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>Start Chatting!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff'
  }
});

export default ChatScreen;