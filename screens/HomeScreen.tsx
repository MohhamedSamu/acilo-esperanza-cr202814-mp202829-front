import { StyleSheet, View } from "react-native";
import { Navigation } from "react-native-navigation";

import { Text, Button, Card } from 'react-native-paper';


import React from "react";

const HomeScreen = (props: any) => {
  return (
    <View style={styles.root}>

      <Text variant="displayLarge">Display Large</Text>
      <Text> </Text>
      <Text>Hello React Native Navigation 👋 </Text>

      <Text> </Text>
      <Button icon="camera" mode="contained" onPress={() => Navigation.push(props.componentId, {
          component: {
            name: 'Settings'
          }
        })}>
      Push Settings Screen
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

