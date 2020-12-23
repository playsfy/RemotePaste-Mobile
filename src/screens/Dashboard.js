import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

export class Dashboard extends React.Component {
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
        <Header>Welcome to Dashboard</Header>

        <Button mode="contained" onPress={() =>
            navigate('TimeScreen', {
              JSON_ListView_Clicked_Item: this.state.username,
            })
          }
        >Bell Ringing Times
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigate('SettingScreen', {
              JSON_ListView_Clicked_Item: this.state.username,
            })
          }
        >Bell Setting
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigate('ProfileScreen', {
              JSON_ListView_Clicked_Item: this.state.username,
            })
          }
        >User Profile
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigate('AboutScreen', {
              JSON_ListView_Clicked_Item: this.state.username,
            })
          }
        >LogOut
        </Button>
      </Background>
    );
  }
}
