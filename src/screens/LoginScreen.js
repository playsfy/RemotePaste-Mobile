import React, { memo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

export class LoginScreen extends React.Component {

  constructor () {
    super ();
    this.state = {
      isLoading: false,
      email : '', 
      emailerror: '',
      password: '',
      passerror: '',
    };
  }
  handleEmail = (text) => {
    this.setState({ email: text, emailerror: '' })
  }
  handlePassword = (text) => {
    this.setState({ password: text, passerror: '' })
  }
  login = (email, pass) => {
      
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(pass);

    if (emailError || passwordError) {
      this.setState({
        emailerror: emailError,
        passerror: passwordError 
      })
      return;
    }
    const that = this;
    isLoading: true,
    fetch("http://180.150.100.50/getConfig.json")
      .then(response => response.json())
      .then((responseJson) => {

          if(responseJson.username == email &&  responseJson.password == pass)
          {
            isLoading: false
            that.props.navigation.push('Dashboard');
          }
          else
          {
            alert("Incorrect Username or password")
            this.setState({
                email: '',
                password: ''
            })
          }
      })
      .catch(error => console.log(error))
  }

  render() {
    const { navigate } = this.props.navigation;

    if(this.state.isLoading){
      return(
          <View style={{flex: 1, padding: 50, backgroundColor: theme.colors.primary}}>
              <ActivityIndicator/>
          </View>
      )
    }

    return (
      <Background>
        <BackButton goBack={() =>
            navigate('HomeScreen')} />

        <Logo />

        <Header>Welcome back.</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={this.state.email}
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

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => alert("Please Contact System Administrator")}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>we create your views! </Text>
        </View>
      </Background>
    );
  };
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
