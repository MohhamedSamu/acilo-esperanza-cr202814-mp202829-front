import { Button, StyleSheet, View } from "react-native";
import { Navigation } from "react-native-navigation";
import React from "react";

const LoginScreen = () => {
  return (
    <View style={styles.root}>
      <Button
        title='Login'
        color='#710ce3'
        onPress={() => Navigation.setRoot(mainRoot)}
      />
    </View>
  );
};


const mainRoot = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Home'
                }
              },
            ]
          }
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Settings'
                }
              }
            ]
          }
        }
      ]
    }
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

export default LoginScreen;
