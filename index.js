import React from 'react';
import { Navigation } from 'react-native-navigation';

import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ResetPwdScreen from "./screens/ResetPwdScreen";
import ChangePwdScreen from "./screens/ChangePwdScreen";
import SplashScreen from "./screens/SplashScreen";
import DoctoresListScreen from "./screens/DoctoresScreens/DoctoresListScreen";
import DoctoresFormScreen from "./screens/DoctoresScreens/DoctoresFormScreen";
import PacientesListScreen from "./screens/PacientesScreens/PacientesListScreen";
import PacientesFormScreen from "./screens/PacientesScreens/PacientesFormScreen";

Navigation.registerComponent('Settings', () => SettingsScreen);
Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Login', () => LoginScreen);
Navigation.registerComponent('Splash', () => SplashScreen);
Navigation.registerComponent('ResetPwd', () => ResetPwdScreen);
Navigation.registerComponent('ChangePwd', () => ChangePwdScreen);
Navigation.registerComponent('DoctoresList', () => DoctoresListScreen);
Navigation.registerComponent('Doctor', () => DoctoresFormScreen);
Navigation.registerComponent('PacientesList', () => PacientesListScreen);
Navigation.registerComponent('Paciente', () => PacientesFormScreen);


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

