import { StyleSheet, View } from "react-native";
import { Navigation } from "react-native-navigation";
import { loginRoot } from "../src/core/roots";
import { Text, Button, Card } from 'react-native-paper';
import DoctoresService  from "../src/services/DoctoresService";
import React, { useState, useEffect } from "react";
import { DoctoresInterface } from "../src/interfaces/DoctoresInterface";

const HomeScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [datos, setDatos] = useState<DoctoresInterface[]>();

  useEffect(() => {
    setIsLoading(true);
    listarDoctores();
  }, []);

  const listarDoctores = () => {
    DoctoresService.getDoctores().then((response: DoctoresInterface[]) => {
      setDatos(response);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <View style={styles.root}>

      <Text variant="displayLarge">Display Large</Text>
      <Text> </Text>
      <Text>Hellou React Native Navigation 👋 </Text>

      {props.user !== null && props.user !== undefined && (
        <Text >El correo es: {props.user.email}</Text>
      )}
      <Button icon="camera" mode="contained" onPress={() => Navigation.push(props.componentId, {
          component: {
            name: 'Settings',
            passProps: {
              count: 5
            }
          }
        })}>
      Push Settings Screen
      </Button>

      {datos && datos.map((prop: DoctoresInterface) => (
          <Text> {prop.id} - {prop.email}</Text>
        )
      )}


      <Button icon="camera" mode="contained" onPress={() => Navigation.setRoot(loginRoot())}>
        Logout
      </Button>

    </View>
  );
};

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home'
    }
  },
  bottomTab: {
    text: 'Home'
  }
};


const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});

export default HomeScreen;
