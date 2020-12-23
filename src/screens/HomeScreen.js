import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';


/*
import ClipboardListener from 'react-native-clipboard-listener';

Clipboard.setListener(callback);
*/

export class HomeScreen extends React.Component {
  constructor(props) {
    //constructor to set default state
    super(props);
    this.state = {
      username: '',
    };
  }
  static navigationOptions = {
    //Setting the header of the screen
    title: 'HomeScreen',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Background>
        <Logo />
        <Header>CLIPUP</Header>

        <Paragraph>
          Copy once paste anywhere!
        </Paragraph>
        <Button mode="contained" onPress={() =>
            navigate('LoginScreen', {
              JSON_ListView_Clicked_Item: this.state.username,
            })
          }
        >
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigate('AboutScreen', {
              JSON_ListView_Clicked_Item: this.state.username,
            })
          }
        >
          About Us
        </Button>
      </Background>
    );
  }
}
