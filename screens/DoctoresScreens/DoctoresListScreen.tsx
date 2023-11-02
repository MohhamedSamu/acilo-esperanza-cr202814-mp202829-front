import React, { useEffect, useState } from "react";

import { StyleSheet, Dimensions, ScrollView, View, TouchableOpacity } from "react-native";
import {
   Block, Text, Card,
} from 'galio-framework';
import { theme } from "../../src/core/theme";
const { width } = Dimensions.get('screen');
import Button from '../../src/components/Button';

import DoctoresService  from "../../src/services/DoctoresService";
import { DoctoresInterface } from "../../src/interfaces/DoctoresInterface";
import { Navigation } from "react-native-navigation";

const BASE_SIZE = 16;

const DoctoresListScreen = (props: any) => {

  const [isLoading, setIsLoading] = useState(false);
  const [datos, setDatos] = useState<DoctoresInterface[]>([]);

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

  const navegarNuevo = (id?: string) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'NuevoDoctor',
        passProps: {
          id: id
        }
      }
    })
  }

  return (
    <Block safe flex style={{ backgroundColor: 'white' }}>

      <View style={styles.container}>

        <Button mode="contained" onPress={() => navegarNuevo() }>
          Nuevo Doctor
        </Button>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Lista de Doctores</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cards}>
        <Block flex space="between">
          {datos && datos.map((card, id) => (
            <TouchableOpacity onPress={() => navegarNuevo(card.id) } style={styles.cards}>
              <Card
                    key={'card-'+id}
                    flex
                    borderless
                    style={styles.card}
                    title={card.nombre}
                    caption={card.nombre}
                    location={card.nombre}
                    avatar="http://i.pravatar.cc/100?id=skater"
                    imageStyle={styles.rounded}
              />
            </TouchableOpacity>

          ))}
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles= StyleSheet.create({
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

export default DoctoresListScreen;
