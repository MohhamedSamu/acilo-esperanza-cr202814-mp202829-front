import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../src/components/Background';
import Logo from '../src/components/Logo';
import Header from '../src/components/Header';
import Button from '../src/components/Button';
import TextInput from '../src/components/TextInput';
import Toaster from '../src/components/Toaster';
import { pacienteRoot, adminRoot, doctorRoot, User, resetPwdRoot } from '../src/core/roots';

import { theme } from '../src/core/theme';
import { emailValidator, passwordValidator } from '../src/core/utils';
import { Navigation } from "react-native-navigation";
import { PaperProvider } from 'react-native-paper';

import DoctoresService from "../src/services/DoctoresService";
import PacientesService from "../src/services/PacientesService";

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

  useEffect(() =>
  {
    if (auth.currentUser != null)
    {
      const currentUserEmail: string = auth.currentUser.email == null ? '' : auth.currentUser.email
      if (auth.currentUser.displayName == undefined)
      {
        //es admin
        const user: User = {
          name: 'Admin',
          email: currentUserEmail,
          typeUser: 'admin'
        }
        Navigation.setRoot(adminRoot(user));
      } else if (auth.currentUser.displayName == "doctor")
      {
        DoctoresService.getDoctorByEmail(currentUserEmail).then((data) =>
        {
          const doctor: any = data.data.return[0]

          const user: User = {
            name: `${doctor?.nombres} ${doctor?.apellidos}`,
            email: currentUserEmail,
            typeUser: 'doctor'
          }
          Navigation.setRoot(doctorRoot(user));
        }).catch(error =>
        {
          console.log(error);
          return "error"
        });
      } else if (auth.currentUser.displayName == "paciente")
      {
        PacientesService.getPacienteByEmail(currentUserEmail).then((data) =>
        {
          console.log("data.datadatadata", data.data)
          const paciente: any = data.data.return[0]

          const user: User = {
            name: `${paciente?.nombres} ${paciente?.apellidos}`,
            email: currentUserEmail,
            typeUser: 'paciente'
          }
          Navigation.setRoot(pacienteRoot(user));
        }).catch(error =>
        {
          console.log(error);
          return "error"
        });
      }
    }
  }, []);


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
          email: email.value,
          typeUser: 'admin'
        }
        Navigation.setRoot(adminRoot(user));
      } else if (userCreds.user.displayName == "doctor")
      {
        DoctoresService.getDoctorByEmail(email.value).then((returnData) =>
        {
          const doctor: any = returnData

          const user: User = {
            name: `${doctor?.nombres} ${doctor?.apellidos}`,
            email: email.value,
            typeUser: 'doctor'
          }
          Navigation.setRoot(doctorRoot(user));
        }).catch(error =>
        {
          console.log(error);
          return "error"
        });
      } else if (userCreds.user.displayName == "paciente")
      {
        PacientesService.getPacienteByEmail(email.value).then((data) =>
        {
          const paciente: any = data.data.return[0]

          const user: User = {
            name: `${paciente?.nombres} ${paciente?.apellidos}`,
            email: email.value,
            typeUser: 'paciente'
          }
          Navigation.setRoot(pacienteRoot(user));
        }).catch(error =>
        {
          console.log(error);
          return "error"
        });
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
