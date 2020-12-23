import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

export class ProfileScreen extends React.Component {
  constructor(props) {
    //constructor to set default state
    super(props);
    this.state = {
      ssid:'',
      pswd:'',
      username:'',
      password:'',

      isLoading: true,
      saturday : false,
      alldayoff: false,
      seconds : 1,

      emailerror: '',
      passerror: ''

    };

    fetch("http://180.150.100.50/getConfig.json")
      .then(response => response.json())
      .then((responseJson) => {

          isLoading: false

          if(responseJson.saturday == "true")
            var sats  = true;
          else
            var sats = false

          if(responseJson.bellStatus == "1")
            var stss = true 
          else
            var stss = false

          this.setState({
              isLoading: false,
              saturday: sats,
              alldayoff: stss,
              ssid: responseJson.ssid,
              pswd: responseJson.pswd,
              username: responseJson.username,
              password: responseJson.password
          })
      })
      .catch(error => console.log(error))
  }
  savesetting = (ssid, pswd, username, password, seconds, saturday, alldayoff) => {

    const emailError = emailValidator(username);
    const passwordError = passwordValidator(password);

    if (emailError || passwordError) {
      this.setState({
        emailerror: emailError,
        passerror: passwordError 
      })
      return;
    }

    fetch("http://180.150.100.50/setConfig?ssid="+ssid+"&pswd="+pswd+"&username="+username+"&password="+password+"&duration="+seconds+"&saturday="+saturday+"&bellStatus="+alldayoff)
      .then(response => response.json())
      .then((rJn) => {
        this.setState({
          isLoading: false
        })
        alert("Configuration settings updated.")
      })
    .catch(error => alert("Updating failed. Reason : " + error))
  }
  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handlePassword = (text) => {
    this.setState({ password: text })
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: 'ProfileScreen',
  };
  render() {

    const { navigate } = this.props.navigation;

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, paddingTop: 280, backgroundColor: theme.colors.primary}}>
            <ActivityIndicator/>
        </View>
      )
    }

    return (
      <Background>

        <BackButton goBack={() =>
            navigate('Dashboard')} />

        <Header>Profile</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={this.state.username}
          onChangeText = {this.handleEmail}
          error={!!this.state.emailerror}
          errorText={this.state.emailerror}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={this.state.password}
          onChangeText = {this.handlePassword}
          error={!!this.state.passerror}
          errorText={this.state.passerror}
          secureTextEntry
        />

        <Button mode="contained" onPress = {
                  () => this.savesetting(this.state.ssid, this.state.pswd, this.state.username, this.state.password, this.state.seconds, this.state.saturday, this.state.alldayoff)
               }>
          UPDATE
        </Button>
      </Background>
    );
  }
}
