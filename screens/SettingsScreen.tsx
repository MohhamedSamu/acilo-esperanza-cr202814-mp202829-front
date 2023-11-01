import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SettingsScreen = (props: any) => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen desde otra pantalla xd</Text>
      {props !== null && (
          <Text >El número mínimo es: {props.count}</Text>
      )}
      <Text ></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});

SettingsScreen.options = {
  topBar: {
    title: {
      text: 'Settings'
    }
  },
  bottomTab: {
    text: 'Settings'
  }
}

export default SettingsScreen;
