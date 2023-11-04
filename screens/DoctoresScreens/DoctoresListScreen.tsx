import React, { useEffect, useState } from "react";

import { StyleSheet, Dimensions, ScrollView, View, TouchableOpacity } from "react-native";
import
{
  Block, Text, Card,
} from 'galio-framework';
import { theme } from "../../src/core/theme";
const { width } = Dimensions.get('screen');
import Button from '../../src/components/Button';

import DoctoresService from "../../src/services/DoctoresService";
import { DoctoresInterface } from "../../src/interfaces/DoctoresInterface";
import { Navigation } from "react-native-navigation";
import moment from 'moment';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const DoctoresListScreen = (props: any) =>
{

  const [datos, setDatos] = useState<DoctoresInterface[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() =>
  {
    listarDoctores();
    setLoadingData(true);
  }, []);

  const callback = () => {
    props.callBackHome();
    listarDoctores();
  }

  const listarDoctores = () =>
  {
    DoctoresService.getDoctores().then((response: DoctoresInterface[]) =>
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
        name: 'Doctor',
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
              Nuevo Doctor
            </Button>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Lista de Doctores</Text>
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
                    caption={card.titulo}
                    location={card.edad + ' años'}
                    avatar={card.picture}
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

DoctoresListScreen.options = {
  topBar: {
    title: {
      text: 'Doctores'
    }
  },
  bottomTab: {
    text: 'Doctores'
  }
}

export default DoctoresListScreen;
