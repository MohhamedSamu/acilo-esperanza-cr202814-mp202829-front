import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { List, MD3Colors, Divider } from 'react-native-paper';
import { Navigation } from "react-native-navigation";
import { loginRoot } from "../src/core/roots";
const { width } = Dimensions.get('screen');
import { Card } from 'galio-framework';
import Toaster from '../src/components/Toaster';
import { PaperProvider } from 'react-native-paper';

import '../config/firebase';

import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

const SettingsScreen = (props: any) =>
{
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalType, setModalType] = useState('');
  const hideModal = () => setVisible(false);
  const showModal = (type:string, text:string) => {
    setModalType(type);
    setModalText(text);
    setVisible(true);
  }


  const [email, setEmail] = React.useState('');
  const [nombres, setNombres] = React.useState('');

  useEffect(() =>
  {
    console.log("props", props)
    setEmail(props.user.email);
    setNombres(props.user.name);
  }, []);

  const _onLogout = () =>
  {
    signOut(auth).then(() =>
    {
      Navigation.setRoot(loginRoot())
    }).catch((error) =>
    {
      showModal('danger', 'Algo inesperado ocurrio...')
      console.log("logout error", error)
    });
  }

  const navegarList = (screen: string) =>
  {
    Navigation.push(props.componentId, {
      component: {
        name: screen,
        passProps: { }
      }
    })
  }

  return (
    <PaperProvider>
      <View>
        <View style={styles.header}>
          <Card
            key={'card-account-info'}
            flex
            borderless
            style={styles.card}
            title={nombres}
            caption={email}
            avatar={'https://picsum.photos/id/1/800'}
            imageStyle={styles.rounded}
          />

        </View>

        <View style={styles.root}>
          <Divider />
          <List.Section>
            <List.Subheader>Configuracion</List.Subheader>
            <List.Item style={styles.listItem} title="Cambiar contraseña" onPress={() => navegarList('ChangePwd')} left={() => <List.Icon icon="nut" />} />
            <List.Item style={styles.listItem}
              title="Cerrar Sesion" onPress={_onLogout}
              left={() => <List.Icon color={MD3Colors.error40} icon="power-standby" />}
            />
          </List.Section>
        </View>
      </View>
      <Toaster
        visible={visible}
        type={modalType}
        text={modalText}
        hideModal={hideModal}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'whitesmoke',
    height: '10%',
    width: '100%'
  },
  root: {
    backgroundColor: 'whitesmoke',
    height: '100%',
    width: '100%'
  },
  listItem: {
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'white'
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    height: 30,
    marginVertical: 8,
    elevation: 4,
  },
  rounded: {
    borderRadius: 5,
  },
  cards: {
    width,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

SettingsScreen.options = {
  topBar: {
    title: {
      text: 'Settings'
    }
  },
  bottomTab: {
    text: 'Settings',
    icon: require('../src/assets/icono_config.png')
  }
}

export default SettingsScreen;
