import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../src/components/Background';
import Logo from '../src/components/Logo';
import Header from '../src/components/Header';
import Button from '../src/components/Button';
import TextInput from '../src/components/TextInput';
import Toaster from '../src/components/Toaster';
import { mainRoot, User } from '../src/core/roots';

import { theme } from '../src/core/theme';
import { emailValidator, passwordValidator } from '../src/core/utils';
import { NavigationP } from '../src/types';
import { Navigation } from "react-native-navigation";
import { PaperProvider } from 'react-native-paper';

import '../config/firebase';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

type Props = {
  navigation: NavigationP;
};

const LoginScreen = ({ navigation }: Props) =>
{
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
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

  const _onLoginPressed = async () =>
  {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError)
    {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setIsLoading(true);

    try
    {
      let userCreds = await signInWithEmailAndPassword(auth, email.value, password.value);

      setIsLoading(false);

      const user: User = {
        name: 'Walter',
        email: email.value
      }
      console.log("user", userCreds)
      Navigation.setRoot(mainRoot(user));
    } catch (error: any)
    {
      setIsLoading(false);
      if (error.message == "Firebase: Error (auth/invalid-login-credentials)."){
        showModal('danger', 'Credenciales incorrectas')
      }else{
        showModal('danger', 'Algo malo ocurrio ...')
        console.log("error", error.message)
      }
    }
  };

  return (
    <PaperProvider>
      <Background>
        {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}

        <Logo />

        <Header>Bienvenido</Header>

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

        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.label}>Olvidaste tú contraseña?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" loading={isLoading} onPress={_onLoginPressed}>
          Iniciar sesión
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>¿Deseas loguearte con </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Google ?</Text>
          </TouchableOpacity>
        </View>

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


export default LoginScreen;
