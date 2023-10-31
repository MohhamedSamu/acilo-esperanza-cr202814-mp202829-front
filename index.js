import React from 'react';
import { Navigation } from 'react-native-navigation';

import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SplashScreen from "./screens/SplashScreen";

Navigation.registerComponent('Splash', () => SplashScreen);
Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);


const initRoot = {
  root: {
    component: {
      name: 'Splash'
    }
  }
};

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a'
  },
  topBar: {
    title: {
      color: 'white'
    },
    backButton: {
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14
  }
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot(initRoot);
});

