import { View, StyleSheet } from "react-native";
import { Button, Text, Divider, TextInput } from "react-native-paper";
import { Navigation } from "react-native-navigation";
import React from "react";

const LoginScreen = () =>
{
  return (
    <View style={styles.root}>
      <Text variant='headlineSmall'>
        Sign up to our newsletter!
      </Text>
      <Text variant='labelLarge'>
        Get a monthly dose of fresh React Native Paper news straight to your mailbox. Just sign up to our newsletter and enjoy!
      </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Divider />
      <TextInput
        style={{ marginTop: 15, width: '90%' }}
        label='flat input'
        mode='flat'
      />
      <TextInput
        style={{ marginTop: 15, width: '90%' }}
        label='Flat input'
        mode='flat'
      />
      <Button
        style={{ marginTop: 15, width: '90%' }}
        icon='send'
        mode='contained'
        onPress={() => Navigation.setRoot(mainRoot)}
      >
        Sign me up
      </Button>
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
  },
  input: {
    width: '100%'
  }
});

export default LoginScreen;
