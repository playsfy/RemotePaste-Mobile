import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import GlLogo from '../components/GlLogo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { Navigation } from '../types';

//const navigation = props => Navigation;

export class AboutScreen extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      msg : 12,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Background>
        <BackButton goBack={() =>
            navigate('HomeScreen')} />

        <GlLogo />

        <Text style={styles.header}>GITLEAF INC</Text>
        <Text>Website</Text>
        <Text style={styles.header}>www.gitleaf.com</Text>
        <Text>E-mail</Text>
        <Text style={styles.header}>hi@gitleaf.com</Text>

      </Background>
    );
  };
};

const styles = StyleSheet.create({
  header: {
    color: theme.colors.glbrand,
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});
