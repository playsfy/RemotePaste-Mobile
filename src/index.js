import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { HomeScreen } from './screens/HomeScreen';

import { LoginScreen } from './screens/LoginScreen';

import { AboutScreen } from './screens/AboutScreen';

import { Dashboard } from './screens/Dashboard';

import { TimeScreen } from './screens/TimeScreen';

import { SettingScreen } from './screens/SettingScreen';

import { ProfileScreen } from './screens/ProfileScreen';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    AboutScreen,
    Dashboard,
    TimeScreen,
    SettingScreen,
    ProfileScreen
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);

/*const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    FirstPage: { screen: FirstPage }, 
    //First entry by default be our first screen 
    //if we do not define initialRouteName
    SecondPage: { screen: SecondPage }, 
  },
  {
    initialRouteName: 'FirstPage',
  }
);
export default createAppContainer(App);*/
