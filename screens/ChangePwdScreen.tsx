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
import { passwordValidator } from '../src/core/utils';
import { NavigationP } from '../src/types';
import { Navigation } from "react-native-navigation";
import { PaperProvider } from 'react-native-paper';

import '../config/firebase';

import { getAuth, updatePassword } from 'firebase/auth';

const auth = getAuth();

const ChangePwdScreen = () =>
{
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [modalType, setModalType] = React.useState('');

  const showModal = (type: string, text: string) =>
  {
    setModalType(type);
    setModalText(text);
    setVisible(true);
  }
  const hideModal = () => setVisible(false);

  const _onChangePressed = async () =>
  {
    const passwordError = passwordValidator(password.value);

    if (passwordError)
    {
      setPassword({ ...password, error: passwordError });
      return;
    }

    setIsLoading(true);

    // @ts-ignore
    updatePassword(auth.currentUser, password.value).then(() => {
      setIsLoading(false);
      showModal('success', 'Contraseña cambiada!')
    }).catch((error) => {
      showModal('danger', error.message)
        console.log("error", error)
        setIsLoading(false);
    });
  };

  const goToLogin = () =>
  {
    Navigation.setRoot(loginRoot());
  }

  return (
    <PaperProvider>
      <Background>

        <View style={styles.row}>
          <Text style={styles.label}>
            Cambiar contraseña
          </Text>
        </View>

        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <View style={styles.container}>
          <Button mode="contained" loading={isLoading} onPress={_onChangePressed}>
            Cambiar contraseña
          </Button>
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
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ChangePwdScreen;
