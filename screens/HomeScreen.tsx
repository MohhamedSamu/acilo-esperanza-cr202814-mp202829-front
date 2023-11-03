import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Navigation } from "react-native-navigation";
import { loginRoot } from "../src/core/roots";
import { Text, Button } from 'react-native-paper';
import DoctoresService from "../src/services/DoctoresService";
import React, { useState, useEffect } from "react";
import { DoctoresInterface } from "../src/interfaces/DoctoresInterface";

import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import Carousel from 'react-native-snap-carousel';
import CardItem from "../src/components/CardItem";
import { theme } from "../src/core/theme";

const HomeScreen = (props: any) =>
{
  const [datos, setDatos] = useState<DoctoresInterface[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() =>
  {
    listarDoctores();
    setLoadingData(true);
  }, []);

  const listarDoctores = () =>
  {
    DoctoresService.getDoctores().then((response: DoctoresInterface[]) =>
    {
      setDatos(response);
      setLoadingData(false);
    }).catch(error =>
    {
      console.log(error);
    });
  }

  const navegarList = (screen: string) =>
  {
    Navigation.push(props.componentId, {
      component: {
        name: screen,
        passProps: {
          count: 5
        }
      }
    })
  }

  return (
    <ScrollView>



      {!loadingData ?
        <View style={styles.root} >

          {/*<Text variant="displayLarge">Display Large</Text>*/}
          {/*<Text> </Text>*/}
          {/*<Text>Hellou React Native Navigation 👋 </Text>*/}

          {/*{props.user !== null && props.user !== undefined && (*/}
          {/*  <Text >El correo es: {props.user.email}</Text>*/}
          {/*)}*/}

          {/*<Button icon="camera" mode="contained" onPress={() => navegarSettings()}>*/}
          {/*Push Settings Screen*/}
          {/*</Button>*/}

          {/*{!isLoading && datos.map((prop: DoctoresInterface, index) => (*/}
          {/*    <Text key={prop.id}> {prop.id} - {prop.email} </Text>*/}
          {/*  )*/}
          {/*)}*/}

          <View style={styles.row}>
            <Text style={styles.label}>Lista de Doctores</Text>

            <Text style={styles.label}> </Text>
            <TouchableOpacity onPress={() => navegarList('DoctoresList')}>
              <Text style={styles.link}>Ver Todos</Text>
            </TouchableOpacity>
          </View>

          <Carousel
            style={{ flex: 1 }}
            loop={true}
            layout={'default'}
            data={datos}
            renderItem={(item) => CardItem(item, props, 'Doctor')}
            sliderWidth={440}
            itemWidth={180}
            useScrollView={true}
          />

          <Text> </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Pacientes recientes</Text>

            <Text style={styles.label}> </Text>
            <TouchableOpacity onPress={() => navegarList('DoctoresList')}>
              <Text style={styles.link}>Ver Todos</Text>
            </TouchableOpacity>
          </View>

          <Carousel
            style={{ flex: 1 }}
            loop={true}
            layout={'default'}
            data={datos}
            renderItem={(item) => CardItem(item, props, 'Doctor')}
            sliderWidth={440}
            itemWidth={180}
            useScrollView={true}
          />
        </View>
        :
        <View>
          <Text> </Text>
          <Text> </Text>
          <ActivityIndicator animating={loadingData} color={MD2Colors.black} />
        </View>
      }
    </ScrollView>
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
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'whitesmoke',
    padding: 10
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  label: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: theme.colors.secondary,
  },
});

export default HomeScreen;
