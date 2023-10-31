import React, { useEffect } from 'react';
import Background from '../src/components/Background';
import Logo from '../src/components/Logo';
import Header from '../src/components/Header';
import { loginRoot } from "../src/core/roots";
import { Navigation } from "react-native-navigation";

const SplashScreen = () => {

  useEffect(() => {
      onScreenLoading();
  }, [])

  const onScreenLoading = () => {
    setTimeout(() => {
      Navigation.setRoot(loginRoot());
    }, 1500)

  }

  return (
    <Background>
      <Header>Cargando...</Header>
      <Logo />
    </Background>
  );
};

export default SplashScreen;
