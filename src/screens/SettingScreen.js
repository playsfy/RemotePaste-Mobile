import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Switch, RadioButton} from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';

export class SettingScreen extends React.Component {
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
      sec1: 'unchecked',
      sec2: 'unchecked',
      sec3: 'unchecked',
      sec4: 'unchecked',
      sec5: 'unchecked'
    };

       ///https://bellapi.netlify.app
    fetch("http://180.150.100.50/getConfig.json")
      .then(response => response.json())
      .then((responseJson) => {

          if(responseJson.saturday == "true")
            var sats  = true;
          else
            var sats = false

          if(responseJson.bellStatus == "1")
            var stss = true 
          else
            var stss = false

          if(responseJson.duration == "1")
            this.setState({sec1: 'checked'})

          if(responseJson.duration == "2")
            this.setState({sec2: 'checked'})

          if(responseJson.duration == "3")
            this.setState({sec3: 'checked'})

          if(responseJson.duration == "4")
            this.setState({sec4: 'checked'})

          if(responseJson.duration == "5")
            this.setState({sec5: 'checked'})

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
  onToggleSwitch1 = (boole) => {
    this.setState({ saturday: boole })
  }
  onToggleSwitch2 = (boole) => {
    this.setState({ alldayoff: boole })
  }
  getSeconds = (val) => {
    //alert(val)
    if (val == 1) {
      this.setState({seconds:1 , sec1: 'checked', sec2: 'unchecked',sec3: 'unchecked',sec4: 'unchecked',sec5: 'unchecked' })
    }
    if (val == 2) {
      this.setState({seconds:2 , sec1: 'unchecked', sec2: 'checked',sec3: 'unchecked',sec4: 'unchecked',sec5: 'unchecked' })
    }
    if (val == 3) {
      this.setState({seconds:3 , sec1: 'unchecked', sec2: 'unchecked',sec3: 'checked',sec4: 'unchecked',sec5: 'unchecked' })
    }
    if (val == 4) {
      this.setState({seconds:4 , sec1: 'unchecked', sec2: 'unchecked',sec3: 'unchecked',sec4: 'checked',sec5: 'unchecked' })
    }
    if (val == 5) {
      this.setState({seconds:5 , sec1: 'unchecked', sec2: 'unchecked',sec3: 'unchecked',sec4: 'unchecked',sec5: 'checked' })
    }
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: 'HomeScreen',
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

        <Header>Setting</Header>

        <Text style={styles.SaturdayLabel}>Saturday Enable</Text>

        <Switch color={theme.colors.primary} style={styles.SaturdaySwitch} value={this.state.saturday} onValueChange={this.onToggleSwitch1} />

        <Text style={styles.TurnOffLabel}>Turn Off All bells</Text>

        <Switch color="red" style={styles.OffSwitch} value={this.state.alldayoff} onValueChange={this.onToggleSwitch2} />

         <Text style={styles.TurnOffLabel}>Bell Ringing Times</Text>

        <RadioButton.Group onValueChange={this.getSeconds} value="">
          <RadioButton.Item status={this.state.sec1} label="01 Second" value="1" />
          <RadioButton.Item status={this.state.sec2} label="02 Seconds" value="2" />
          <RadioButton.Item status={this.state.sec3} label="03 Seconds" value="3" />
          <RadioButton.Item status={this.state.sec4} label="04 Seconds" value="4" />
          <RadioButton.Item status={this.state.sec5} label="05 Seconds" value="5" />
        </RadioButton.Group>

        <Button mode="contained" onPress = {
                  () => this.savesetting(this.state.ssid, this.state.pswd, this.state.username, this.state.password, this.state.seconds, this.state.saturday, this.state.alldayoff)
               }>
          UPDATE
        </Button>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  SaturdayLabel: {
    color: theme.colors.primary,
    fontSize: 20,
    textAlign: 'left', 
    alignSelf: 'stretch',
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  TurnOffLabel: {
    color: theme.colors.primary,
    fontSize: 20,
    textAlign: 'left', 
    alignSelf: 'stretch',
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  SaturdaySwitch: {
    position: 'absolute',
    top: 80 + getStatusBarHeight(),
    right: 20
  },
  OffSwitch: {
    position: 'absolute',
    top: 120 + getStatusBarHeight(),
    right: 20
  }
});

