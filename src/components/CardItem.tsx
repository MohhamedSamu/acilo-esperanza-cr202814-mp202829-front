import { Button, Card, Text } from "react-native-paper";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Navigation } from "react-native-navigation";

import '../../config/firebase';
import { getAuth } from 'firebase/auth';
const auth = getAuth();

const CardItem = ({ item, index }: any, props: any, screenName: string, callBack: any) =>
{
  const navegarSettings = (item?: any) =>
  {
    if (screenName == "Cita"){
      return
    }
    if (auth.currentUser?.displayName != 'paciente'){
      Navigation.push(props.componentId, {
        component: {
          name: screenName,
          passProps: {
            id: item.id,
            callBackItem: callBackItem,
            from: 'item'
          }
        }
      })
    } else {
      if (screenName != 'Doctor'){
        Navigation.push(props.componentId, {
          component: {
            name: screenName,
            passProps: {
              id: item.id,
              callBackItem: callBackItem,
              from: 'item'
            }
          }
        })
      } else {
        console.log('desde paciente a doctor??');
        Navigation.push(props.componentId, {
          component: {
            name: 'PacientesAgendarCita',
            passProps: {
              doctor: item,
              id: item?.id
            }
          }
        })
      }
    }
  }

  const callBackItem = () =>
  {
    callBack();
  }

  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity onPress={() => navegarSettings(item)}>
        { screenName == "Cita" ? 
          <View>
            <Image
              source={{ uri: auth.currentUser?.displayName == 'paciente' ? item.doctor.picture : item.paciente.picture }}
              style={styles.image}
            />
            <Text style={styles.header}>
              {auth.currentUser?.displayName == 'paciente' ? `Cita con Dr. ${item.doctor.nombres}  ${item.doctor.nombres}` : `Cita con ${item.paciente.nombres}  ${item.paciente.nombres}` }
            </Text>
            <Text style={styles.body}> {item.estado} </Text>
          </View>
        :
          <View>
            <Image
              source={{ uri: item.picture !== '' ? item.picture : 'https://picsum.photos/id/'+ index +'/800' }}
              style={styles.image}
            />
            <Text style={styles.header}>{screenName == "Doctor" ? 'Dr. ' : ''}{item.nombres} {item.apellidos}</Text>
            <Text style={styles.body}>{screenName == "Paciente" ? (item.capacitado ? 'Capacitado' : 'Requiere atención') : item.titulo}</Text>
          </View>
        }

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 180,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginBottom: 10,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 180,
    height: 100,
  },
  header: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CardItem;
