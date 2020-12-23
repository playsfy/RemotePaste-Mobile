import React, { memo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { timeValidator } from '../core/utils';

export class TimeScreen extends React.Component {

  constructor () {
    super ();
    this.state = {
      t1:'', t2:'', t3:'', t4:'',t5:'',t6:'',t7:'',t8:'',
      t9:'', t10:'', t11:'', t12:'', t13:'', t14:'', t15:'', t16:'',
      r1:'', r2:'', r3:'', r4:'', r5:'',r6:'',
      e1:'', e2:'', e3:'', e4:'',e5:'',e6:'',e7:'',e8:'',
      e9:'', e10:'', e11:'', e12:'', e13:'',e14:'',e15:'',e16:'',
      isLoading: true,
    };
    fetch("http://180.150.100.50/getTimes.json")
      .then(response => response.json())
      .then((rJn) => {
        this.setState({
          t1:rJn.t01, t2: rJn.t02, t3: rJn.t03,t4: rJn.t04,t5: rJn.t05,t6: rJn.t06,
          t7: rJn.t07,t8: rJn.t08,t9:rJn.t09, t10: rJn.t10, t11: rJn.t11,t12: rJn.t12,
          t13: rJn.t13,t14: rJn.t14,t15: rJn.t15,t16: rJn.t16,
          isLoading: false
        })
      })
    .catch(error => console.log(error))
  }
  updateTimes = (t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16) => {

    this.setState({ isLoading: true })

    var t1Error = timeValidator(t1);
    var t2Error = timeValidator(t2);
    var t3Error = timeValidator(t3);
    var t4Error = timeValidator(t4);
    var t5Error = timeValidator(t5);
    var t6Error = timeValidator(t6);
    var t7Error = timeValidator(t7);
    var t8Error = timeValidator(t8);
    var t9Error = timeValidator(t9);
    var t10Error = timeValidator(t10);
    var t11Error = timeValidator(t11);
    var t12Error = timeValidator(t12);
    var t13Error = timeValidator(t13);
    var t14Error = timeValidator(t14);
    var t15Error = timeValidator(t15);
    var t16Error = timeValidator(t16);

    if (t1Error || t2Error || t3Error || t4Error || t5Error || t6Error || t7Error || t8Error || t9Error || t10Error || t11Error || t12Error || t13Error || t14Error || t15Error || t16Error) {
      this.setState({
        e1: t1Error,
        e2: t2Error,
        e3: t3Error,
        e4: t4Error,
        e5: t5Error,
        e6: t6Error,
        e7: t7Error,
        e8: t8Error,
        e9: t9Error,
        e10: t10Error,
        e11: t11Error,
        e12: t12Error,
        e13: t13Error,
        e14: t14Error,
        e15: t15Error,
        e16: t16Error,
        isLoading: false
      })
      alert("Oops! Time format wrong.check again entered time value as 24h")
      return;
    }

    fetch("http://180.150.100.50/setTimes?t01="+t1+"&t02="+t2+"&t03="+t3+"&t04="+t4+"&t05="+t5
          +"&t06="+t6+"&t07="+t7+"&t08="+t8+"&t09="+t9+"&t10="+t10+"&t11="+t11+"&t12="+t12 
          +"&t13="+t13 +"&t14="+t14+"&t15="+t15 +"&t16="+t16)
      .then(response => response.json())
      .then((rJn) => {
        this.setState({
          isLoading: false
        })
        alert("Bell Ringing times updated.")
      })
    .catch(error => alert("Updating failed. Reason : " + error))

  }
  handleTime01 = (text) => {
    this.setState({ t1: text })
  }
  handleTime02 = (text) => {
    this.setState({ t2: text })
  }
  handleTime03 = (text) => {
    this.setState({ t3: text })
  }
  handleTime04 = (text) => {
    this.setState({ t4: text })
  }
  handleTime05 = (text) => {
    this.setState({ t5: text })
  }
  handleTime06 = (text) => {
    this.setState({ t6: text })
  }
  handleTime07 = (text) => {
    this.setState({ t7: text })
  }
  handleTime08 = (text) => {
    this.setState({ t8: text })
  }
  handleTime09 = (text) => {
    this.setState({ t9: text })
  }
  handleTime10 = (text) => {
    this.setState({ t10: text })
  }
  handleTime11 = (text) => {
    this.setState({ t11: text })
  }
  handleTime12 = (text) => {
    this.setState({ t12: text })
  }
  handleTime13 = (text) => {
    this.setState({ t13: text })
  }
  handleTime14 = (text) => {
    this.setState({ t14: text })
  }
  handleTime15 = (text) => {
    this.setState({ t15: text })
  }
  handleTime16 = (text) => {
    this.setState({ t16: text })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, paddingTop: 280, backgroundColor: theme.colors.primary}}>
            <ActivityIndicator/>
        </View>
      )
    }
////
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollView}>
      <Background>
        <BackButton goBack={() =>
            navigate('Dashboard')} />

        <Header>Bell Ringing Times</Header>

        <TextInput
          key = "Time01"
          label="Time 01"
          returnKeyType="next"
          value={this.state.t1}
          onChangeText ={this.handleTime01}
          error= {!!this.state.e1}
          errorText={this.state.e1}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time02"
          label="Time 02"
          returnKeyType="next"
          value={this.state.t2}
          onChangeText ={this.handleTime02} 
          error={!!this.state.e2}
          errorText={this.state.e2}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time03"
          label="Time 03"
          returnKeyType="next"
          value={this.state.t3}
          onChangeText ={this.handleTime03}
          error={!!this.state.e3}
          errorText={this.state.e3}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time04"
          label="Time 04"
          returnKeyType="next"
          value={this.state.t4}
          onChangeText ={this.handleTime04}
          error={!!this.state.e4}
          errorText={this.state.e4}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time05"
          label="Time 05"
          returnKeyType="next"
          value={this.state.t5}
          onChangeText ={this.handleTime05}
          error={!!this.state.e5}
          errorText={this.state.e5}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time06"
          label="Time 06"
          returnKeyType="next"
          value={this.state.t6}
          onChangeText ={this.handleTime06}
          error={!!this.state.e6}
          errorText={this.state.e6}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time07"
          label="Time 07"
          returnKeyType="next"
          value={this.state.t7}
          onChangeText ={this.handleTime07}
          error={!!this.state.e7}
          errorText={this.state.e7}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time08"
          label="Time 08"
          returnKeyType="next"
          value={this.state.t8}
          onChangeText ={this.handleTime08}
          error={!!this.state.e8}
          errorText={this.state.e8}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time09"
          label="Time 09"
          returnKeyType="next"
          value={this.state.t9}
          onChangeText ={this.handleTime09}
          error={!!this.state.e9}
          errorText={this.state.e9}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time10"
          label="Time 10"
          returnKeyType="next"
          value={this.state.t10}
          onChangeText ={this.handleTime10}
          error={!!this.state.e10}
          errorText={this.state.e10}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time11"
          label="Time 11"
          returnKeyType="next"
          value={this.state.t11}
          onChangeText ={this.handleTime11}
          error={!!this.state.e11}
          errorText={this.state.e11}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time12"
          label="Time 12"
          returnKeyType="next"
          value={this.state.t12}
          onChangeText ={this.handleTime12}
          error={!!this.state.e12}
          errorText={this.state.e12}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time13"
          label="Time 13"
          returnKeyType="next"
          value={this.state.t13}
          onChangeText ={this.handleTime13}
          error={!!this.state.e13}
          errorText={this.state.e13}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time14"
          label="Time 14"
          returnKeyType="next"
          value={this.state.t14}
          onChangeText ={this.handleTime14}
          error={!!this.state.e14}
          errorText={this.state.e14}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time15"
          label="Time 15"
          returnKeyType="next"
          value={this.state.t15}
          onChangeText ={this.handleTime15}
          error={!!this.state.e15}
          errorText={this.state.e15}
          autoCapitalize="none"
          textContentType="none"
        />
        <TextInput
          key = "Time16"
          label="Time 16"
          returnKeyType="next"
          value={this.state.t16}
          onChangeText ={this.handleTime16}
          error={!!this.state.e16}
          errorText={this.state.e16}
          autoCapitalize="none"
          textContentType="none"
        />

        <Button mode="contained" onPress = {
          () => this.updateTimes(this.state.t1, this.state.t2, this.state.t3, this.state.t4, this.state.t5, this.state.t6, this.state.t7, this.state.t8, this.state.t9, this.state.t10, this.state.t11, this.state.t12, this.state.t13, this.state.t14, this.state.t15, this.state.t16)
        }> Update </Button>

        <View style={styles.row}>
          <Text style={styles.label}>we create your views! </Text>
        </View>
      </Background>
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
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
