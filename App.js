import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Clipboard from '@react-native-community/clipboard';

const client = new W3CWebSocket('ws://clipup.herokuapp.com');

class App extends Component {

  constructor () {
    super ();
    this.state = {
      isLoading: false,
      msg : '', 
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      this.setState({ msg: 'WebSocket Client Connected' })
    };
    client.onmessage = (message) => {
      console.log(message);
      this.setState({ msg: message.data });
      Clipboard.setString(message.data);
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
      <Text>{this.state.msg}</Text>
      <StatusBar style="auto" />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;