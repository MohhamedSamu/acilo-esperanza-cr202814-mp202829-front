import React, { useEffect, useState } from "react";

import { StyleSheet, Dimensions, ScrollView, View, TouchableOpacity } from "react-native";
import
{
  Block, Text, Card,
} from 'galio-framework';
import { theme } from "../../src/core/theme";
const { width } = Dimensions.get('screen');
import Button from '../../src/components/Button';

import CitasService from "../../src/services/CitasService";
import { CitaInterface } from "../../src/interfaces/CitaInterface";
import { Navigation } from "react-native-navigation";

import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import { ScrollView as HorizontalScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

const CitasListScreen = (props: any) =>
{

  const [datos, setDatos] = useState<CitaInterface[]>([]);
  const [datosJson, setDatosJson] = useState<string>();
  const [loadingData, setLoadingData] = useState(true);
  const [selected, setSelected] = useState('Todas');

  useEffect(() =>
  {
    listarPacientes();
    setLoadingData(true);
  }, []);

  const callback = () =>
  {
    props.callBackHome();
    listarPacientes();
  }

  const listarPacientes = () =>
  {
    CitasService.getCitasDoctores().then((response: CitaInterface[]) =>
    {
      setLoadingData(false);

      setDatos(response);
      setDatosJson(JSON.stringify(response));

    }).catch(error =>
    {
      console.log(error);
    });
  }

  const handleFilter = (value:string) => {
    setSelected(value)

    const filteredData:CitaInterface[] = JSON.parse( datosJson == undefined ? '' : datosJson)

    if (value == "Todas"){
      setDatos(filteredData);
    }else{
      setDatos(filteredData.filter((cita) => cita.estado == value));
    }
  }

  const navegarNuevo = (id?: string) =>
  {
    Navigation.push(props.componentId, {
      component: {
        name: 'ReAgendarCita',
        passProps: {
          id: id,
          callBack: callback,
          from: 'list'
        }
      }
    })
  }

  const RadioButton = ({ label, checked, onPress }: any) => (
    <View style={{ alignItems: 'center', marginTop: 5, marginHorizontal: 3 }}>
      <Button onPress={onPress} mode={checked ? 'contained' : 'outlined'}>
        {label}
      </Button>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Block safe flex style={{ backgroundColor: 'white' }}>
        {!loadingData ?
          <View>
            <HorizontalScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

              <RadioButton
                label="Todas"
                checked={selected === 'Todas'}
                onPress={() => handleFilter('Todas')}
              />

              <RadioButton
                label="Proximas"
                checked={selected === 'confirmada'}
                onPress={() => handleFilter('confirmada')}
              />
              
              <RadioButton
                label="Pendientes"
                checked={selected === 'pendiente'}
                onPress={() => handleFilter('pendiente')}
              />

              <RadioButton
                label="Rechazadas"
                checked={selected === 'rechazada'}
                onPress={() => handleFilter('rechazada')}
              />

              <RadioButton
                label="Completadas"
                checked={selected === 'completar'}
                onPress={() => handleFilter('completar')}
              />

            </HorizontalScrollView>

            <Text></Text>

            <View style={styles.row}>
              <Text style={styles.label}>Lista de Citas</Text>
            </View>

            <ScrollView contentContainerStyle={styles.cards}>
              <Block flex space="between">
                {datos && datos.map((card, id) => (
                  <TouchableOpacity onPress={() => navegarNuevo(card.id)} style={styles.cards} key={'touch-' + id}>
                    <Card
                      key={'card-' + id}
                      flex
                      borderless
                      style={styles.card}
                      title={ 'Cita con ' + card.paciente?.nombres + ' ' + card.paciente?.apellidos}
                      caption={card.fecha + ' ' + card.hora}
                      location={card.estado}
                      avatar={card.paciente?.picture}
                      imageStyle={styles.rounded}
                    />
                  </TouchableOpacity>
                ))}
              </Block>
            </ScrollView>
          </View>
          :
          <View>
            <Text> </Text>
            <Text> </Text>
            <ActivityIndicator animating={loadingData} color={MD2Colors.black} />
          </View>
        }
      </Block>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: 'white',
    width: 350,
    marginVertical: 8,
    elevation: 4,
  },
  rounded: {
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
  },
  label: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnsContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOptions: {
    borderColor: 'black',
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 15
  }
});

CitasListScreen.options = {
  topBar: {
    title: {
      text: 'Citas'
    }
  },
  bottomTab: {
    text: 'Citas',
    icon: require('../../src/assets/icono_citas.png'),
  }
}

export default CitasListScreen;
