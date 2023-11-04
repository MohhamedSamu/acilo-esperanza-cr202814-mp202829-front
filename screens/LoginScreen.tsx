import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../src/components/Background';
import Logo from '../src/components/Logo';
import Header from '../src/components/Header';
import Button from '../src/components/Button';
import TextInput from '../src/components/TextInput';
import Toaster from '../src/components/Toaster';
import { mainRoot, User, resetPwdRoot } from '../src/core/roots';

import { theme } from '../src/core/theme';
import { emailValidator, passwordValidator } from '../src/core/utils';
import { Navigation } from "react-native-navigation";
import { PaperProvider } from 'react-native-paper';

import DoctoresService from "../src/services/DoctoresService";
import { DoctoresInterface } from "../src/interfaces/DoctoresInterface";

import '../config/firebase';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const LoginScreen = (props: any) =>
{
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalType, setModalType] = useState('');

  const showModal = (type: string, text: string) =>
  {
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

      if (userCreds.user.displayName == undefined)
      {
        //es admin
        const user: User = {
          name: 'Admin',
          email: email.value
        }
        Navigation.setRoot(mainRoot(user));
        console.log("userCreds", JSON.stringify(userCreds))
      } else if (userCreds.user.displayName == "doctor")
      {
        console.log("doctor", email.value)

        // const doctor:any = await findDoctor(email.value);

        DoctoresService.getDoctorByEmail(email.value).then((data) =>
        {
          const doctor: any = data.data.return[0]

          const user: User = {
            name: `${doctor?.nombres} ${doctor?.apellidos}`,
            email: email.value
          }

          console.log("user", JSON.stringify(userCreds))
          Navigation.setRoot(mainRoot(user));
        }).catch(error =>
        {
          console.log(error);
          return "error"
        });

      } else if (userCreds.user.displayName == "paciente")
      {
        const user: User = {
          name: 'Admin',
          email: email.value
        }
        console.log("user", JSON.stringify(userCreds))
        Navigation.setRoot(mainRoot(user));
      }
      setIsLoading(false);
    } catch (error: any)
    {
      setIsLoading(false);
      if (error.message == "Firebase: Error (auth/invalid-login-credentials).")
      {
        showModal('danger', 'Credenciales incorrectas')
      } else
      {
        showModal('danger', 'Algo malo ocurrio ...')
        console.log("error", error.message)
      }
    }
  };

  const goToPwd = () =>
  {
    Navigation.setRoot(resetPwdRoot());
  }

  return (
    <PaperProvider>
      <Background>

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
            onPress={goToPwd}
          >
            <Text style={styles.label}>Olvidaste tú contraseña?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" loading={isLoading} onPress={_onLoginPressed}>
          Iniciar sesión
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>¿Deseas loguearte con </Text>
          <TouchableOpacity>
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
