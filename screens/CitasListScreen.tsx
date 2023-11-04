import React, { useEffect } from 'react';
import Background from '../src/components/Background';
import Logo from '../src/components/Logo';
import Header from '../src/components/Header';
import { loginRoot } from "../src/core/roots";
import { Navigation } from "react-native-navigation";

const CitasListScreen = () => {

  return (
    <Background>
      <Logo />
    </Background>
  );
};

CitasListScreen.options = {
  topBar: {
    title: {
      text: 'Citas'
    }
  },
  bottomTab: {
    text: 'Citas',
    icon: require('../src/assets/icono_citas.png')
  }
}

export default CitasListScreen;
