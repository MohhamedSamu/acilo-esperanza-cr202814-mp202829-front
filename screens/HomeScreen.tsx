import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Navigation } from "react-native-navigation";
import { Text } from 'react-native-paper';
import DoctoresService from "../src/services/DoctoresService";
import PacientesService from "../src/services/PacientesService";
import React, { useState, useEffect } from "react";
import { DoctoresInterface } from "../src/interfaces/DoctoresInterface";
import { PacientesInterface } from "../src/interfaces/PacientesInterface";

import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import Carousel from 'react-native-snap-carousel';
import CardItem from "../src/components/CardItem";
import { theme } from "../src/core/theme";

import '../config/firebase';
import { getAuth } from 'firebase/auth';
const auth = getAuth();

const HomeScreen = (props: any) =>
{
  const [datos, setDatos] = useState<DoctoresInterface[]>([]);
  const [datosPaciente, setDatosPaciente] = useState<PacientesInterface[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingPacientesData, setLoadingPacientesData] = useState(true);

  const [userType, setUserType] = useState('');

  useEffect(() =>
  {
    if (auth.currentUser?.displayName == undefined)
    {
      setUserType('admin')
    } else
    {
      setUserType(auth.currentUser?.displayName)
    }

    listarDoctores();
    listarPacientes();
    setLoadingData(true);
    setLoadingPacientesData(true);
  }, []);

  const callBackHome = () =>
  {
    listarDoctores();
    listarPacientes();
    setLoadingData(true);
    setLoadingPacientesData(true);
  }

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

  const listarPacientes = () =>
  {
    PacientesService.getPacientes().then((response: PacientesInterface[]) =>
    {
      setDatosPaciente(response);
      setLoadingPacientesData(false);
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
          count: 5,
          callBackHome: callBackHome
        }
      }
    })
  }

  return (
    <ScrollView style={styles.root}>

      {(userType == 'admin' || userType == 'paciente') ?
        <View>
          {/* Lista de Doctores */}
          {!loadingData ?
            <View>

              <View style={styles.row}>
                <Text style={styles.label}> Lista de Doctores </Text>

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
                renderItem={(item) => CardItem(item, props, 'Doctor', () => { callBackHome() })}
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
          <Text> </Text>
        </View>
        : ''}

      {(userType == 'admin' || userType == 'doctor') ?
        <View>
          {/* Lista de Pacientes */}
          {!loadingPacientesData ?
            <View>
              <View style={styles.row}>
                <Text style={styles.label}> Lista de Pacientes</Text>

                <Text style={styles.label}> </Text>
                <TouchableOpacity onPress={() => navegarList('PacientesList')}>
                  <Text style={styles.link}>Ver Todos</Text>
                </TouchableOpacity>
              </View>

              <Carousel
                style={{ flex: 1 }}
                loop={true}
                layout={'default'}
                data={datosPaciente}
                renderItem={(item) => CardItem(item, props, 'Paciente', () => { callBackHome() })}
                sliderWidth={440}
                itemWidth={180}
                useScrollView={true}
              />
            </View>
            :
            <View>
              <Text> </Text>
              <Text> </Text>
              <ActivityIndicator animating={loadingPacientesData} color={MD2Colors.black} />
            </View>
          }
          <Text> </Text>
        </View>
        : ''}

      {(userType == 'doctor' || userType == 'paciente') ?
        <View>
          {/* Lista de Citas */}
          <View>
            <View style={styles.row}>
              <Text style={styles.label}>Lista de Citas</Text>

              <Text style={styles.label}> </Text>
              <TouchableOpacity>
                <Text style={styles.link}>Ver Todos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        : ''}

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
    text: 'Home',
    icon: require('../src/assets/icono_home.png')
  },
};


const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
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
