import React, { useEffect, useState } from "react";

import { StyleSheet, Dimensions, ScrollView, View, TouchableOpacity } from "react-native";
import
{
  Block, Text, Card,
} from 'galio-framework';
import { theme } from "../../src/core/theme";
const { width } = Dimensions.get('screen');
import Button from '../../src/components/Button';

import PacientesService from "../../src/services/PacientesService";
import { PacientesInterface } from "../../src/interfaces/PacientesInterface";
import { Navigation } from "react-native-navigation";
import moment from 'moment';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const PacientesListScreen = (props: any) =>
{

  const [datos, setDatos] = useState<PacientesInterface[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() =>
  {
    listarPacientes();
    setLoadingData(true);
  }, []);

  const callback = () => {
    props.callBackHome();
    listarPacientes();
  }

  const listarPacientes = () =>
  {
    PacientesService.getPacientes().then((response: PacientesInterface[]) =>
    {
      const hoy = moment();
      response.forEach(d =>
      {
        var month = d.nacimiento.split("/")[0];
        var day = d.nacimiento.split("/")[1];
        var year = d.nacimiento.split("/")[2];

        const myDate = moment(`${year}-${month}-${day}`);

        d.edad = hoy.diff(myDate, 'years');
      })
      console.log("response", response)
      setLoadingData(false);

      setDatos(response);

    }).catch(error =>
    {
      console.log(error);
    });
  }

  const navegarNuevo = (id?: string) =>
  {
    Navigation.push(props.componentId, {
      component: {
        name: 'Paciente',
        passProps: {
          id: id,
          callBack: callback,
          from: 'list'
        }
      }
    })
  }

  return (
    <Block safe flex style={{ backgroundColor: 'white' }}>
      {!loadingData ?
        <View>
          <View style={styles.container}>
            <Button mode="contained" onPress={() => navegarNuevo()}>
              Nuevo Paciente
            </Button>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Lista de Pacientes</Text>
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
                    title={card.nombres + ' ' + card.apellidos}
                    caption={card.capacitado ? 'Capacitado' : 'Requiere atención'}
                    location={card.edad + ' años'}
                    avatar={'https://picsum.photos/id/' + id + '/800'}
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
});

PacientesListScreen.options = {
  topBar: {
    title: {
      text: 'Pacientes'
    }
  },
  bottomTab: {
    text: 'Pacientes'
  }
}

export default PacientesListScreen;
