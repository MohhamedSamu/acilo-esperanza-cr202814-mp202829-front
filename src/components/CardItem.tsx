import { Button, Card, Text } from "react-native-paper";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Navigation } from "react-native-navigation";

const CardItem = ({item, index}: any, props: any, screenName: string) => {

  const navegarSettings = () => {
    Navigation.push(props.componentId, {
      component: {
        name: screenName,
        passProps: {
          count: item.nombre
        }
      }
    })
  }

  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: 'https://picsum.photos/800' }}
        style={styles.image}
      />
      <TouchableOpacity onPress={() => navegarSettings() }>
        <Text style={styles.header}>Dr. {item.nombre}</Text>

        <Text style={styles.body}>{item.nombre}</Text>
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
