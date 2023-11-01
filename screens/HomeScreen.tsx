import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Navigation } from "react-native-navigation";
import { loginRoot } from "../src/core/roots";
import { Text, Button, Card } from 'react-native-paper';
import DoctoresService  from "../src/services/DoctoresService";
import React, { useState, useEffect } from "react";
import { DoctoresInterface } from "../src/interfaces/DoctoresInterface";

import Carousel, { Pagination } from 'react-native-snap-carousel';
import CardItem from "../src/components/CardItem";
import { theme } from "../src/core/theme";

const HomeScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [datos, setDatos] = useState<DoctoresInterface[]>([]);
  const isCarousel = React.useRef(null)
  const [index, setIndex] = React.useState(0)

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

  const navegarSettings = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Settings',
        passProps: {
          count: 5
        }
      }
    })
  }

  return (
    <View style={styles.root}>

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
        <Text style={styles.label}>Listados de Doctores</Text>

        <Text style={styles.label}> </Text>
        <TouchableOpacity onPress={() => navegarSettings() }>
          <Text style={styles.link}>Ver Todos</Text>
        </TouchableOpacity>
      </View>

      <Carousel
        loop={false}
        layout={'default'}
        data={datos}
        renderItem={CardItem}
        sliderWidth={500}
        itemWidth={200}
        useScrollView={true}
        layoutCardOffset={9}
        ref={isCarousel}
        onSnapToItem={(index) => setIndex(index)}
      />

      {/*<Pagination*/}
      {/*  dotsLength={datos.length}*/}
      {/*  activeDotIndex={index}*/}
      {/*  ref={isCarousel}*/}
      {/*  dotStyle={{*/}
      {/*    width: 10,*/}
      {/*    height: 10,*/}
      {/*    borderRadius: 5,*/}
      {/*    marginHorizontal: 0,*/}
      {/*    backgroundColor: 'rgba(0, 0, 0, 0.92)'*/}
      {/*  }}*/}
      {/*  inactiveDotOpacity={0.4}*/}
      {/*  inactiveDotScale={0.6}*/}
      {/*  tappableDots={true}*/}
      {/*/>*/}

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
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    alignContent: 'space-between',
  },
  label: {
    color: theme.colors.secondary,
    fontWeight: 'bold',

  },
  link: {
    color: theme.colors.secondary,
  },
});

export default HomeScreen;
