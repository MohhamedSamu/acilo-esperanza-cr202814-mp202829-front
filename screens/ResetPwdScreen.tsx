import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../src/components/Background';
import Logo from '../src/components/Logo';
import Header from '../src/components/Header';
import Button from '../src/components/Button';
import TextInput from '../src/components/TextInput';
import Toaster from '../src/components/Toaster';
import { loginRoot, User } from '../src/core/roots';

import { theme } from '../src/core/theme';
import { emailValidator, passwordValidator } from '../src/core/utils';
import { NavigationP } from '../src/types';
import { Navigation } from "react-native-navigation";
import { PaperProvider } from 'react-native-paper';

import AuthService  from "../src/services/AuthService";

import '../config/firebase';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

const ResetPwdScreen = () =>
{
  const [email, setEmail] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [modalType, setModalType] = React.useState('');

  const showModal = (type:string, text:string) => {
    setModalType(type);
    setModalText(text);
    setVisible(true);
  }
  const hideModal = () => setVisible(false);

  const _onResetPressed = async () =>
  {
    const emailError = emailValidator(email.value);

    if (emailError)
    {
      setEmail({ ...email, error: emailError });
      return;
    }

    setIsLoading(true);

    try
    {
      AuthService.getUserProfile(email.value).then((response:any) => {
        sendPasswordResetEmail(auth, email.value).then((data) => {
          setIsLoading(false);
          showModal('success', 'Email enviado!')
        }).catch(error => {
          showModal('danger', error.message)
          console.log("error", error) 
          setIsLoading(false);
        });
      }).catch(error => {
        if (error.message == "Request failed with status code 400"){
          showModal('danger', "Email no encontrado")
          console.log("error", error)
        }else{
          showModal('danger', error.message)
          console.log("error", error)
        }
        setIsLoading(false);
      });
    } catch (error: any)
    {
      setIsLoading(false);
      showModal('danger', 'El email no se pudo enviar ...')
      console.log("error", error.message)
    }
  };

  const goToLogin = () => {
    Navigation.setRoot(loginRoot());
  }

  return (
    <PaperProvider>
      <Background>
        {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}

        <Logo />

        <Header>Recupera tu contraseña</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={ goToLogin }
          >
            <Text style={styles.label}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" loading={isLoading} onPress={_onResetPressed}>
          Reiniciar contraseña
        </Button>

        <Toaster
          visible={visible}
          type={modalType}
          text={modalText}
          hideModal={hideModal}
        />

      </Background>
    </PaperProvider>
  );
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


export default ResetPwdScreen;
