import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Background from "../../src/components/Background";
import TextInput from "../../src/components/TextInput";
import Button from "../../src/components/Button";
import { theme } from "../../src/core/theme";
import { emailValidator, nameValidator, passwordValidator } from "../../src/core/utils";

const DoctoresFormScreen = (props: any) => {
  const editarDatos = props.id != null && props.id != undefined;

  const [email, setEmail] = useState({ value: '', error: '' });
  const [nombres, setNombres] = useState({ value: '', error: '' });
  const [apellidos, setApellidos] = useState({ value: '', error: '' });
  const [nacimiento, setNacimiento] = useState({ value: '', error: '' });
  const [titulo, setTitulo] = useState({ value: '', error: '' });
  const [picture, setPicture] = useState({ value: '', error: '' });

  const onSaveDoctor = () => {
    const emailError = emailValidator(email.value);
    const nombresError = nameValidator(nombres.value);
    const apellidosError = nameValidator(apellidos.value);
    const tituloError = nameValidator(titulo.value);

    if (emailError || nombresError || apellidosError || tituloError) {
      setEmail({ ...email, error: emailError });
      setNombres({ ...nombres, error: nombresError });
      setApellidos({ ...apellidos, error: apellidosError });
      setTitulo({ ...titulo, error: tituloError });
      return;
    }

    if(editarDatos){

    } else {
      //Metodo para guardar Doctor

    }
  };

  return (
    <Background>

      <View style={styles.row}>
        <Text style={styles.label}>
          { editarDatos ? 'Editar Doctor' : 'Nuevo Doctor' }
        </Text>
      </View>

      <TextInput
        label="Nombres"
        returnKeyType="next"
        value={nombres.value}
        onChangeText={text => setNombres({ value: text, error: '' })}
        error={!!nombres.error}
        errorText={nombres.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Apellidos"
        returnKeyType="next"
        value={apellidos.value}
        onChangeText={text => setApellidos({ value: text, error: '' })}
        error={!!apellidos.error}
        errorText={apellidos.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Nacimiento"
        returnKeyType="next"
        value={nacimiento.value}
        onChangeText={text => setNacimiento({ value: text, error: '' })}
        error={!!nacimiento.error}
        errorText={nacimiento.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Titulo"
        returnKeyType="next"
        value={titulo.value}
        onChangeText={text => setTitulo({ value: text, error: '' })}
        error={!!titulo.error}
        errorText={titulo.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <View style={styles.container}>
        <Button mode="contained" onPress={() => onSaveDoctor() }>
          { editarDatos ? 'Editar Doctor' : 'Guardar Doctor' }
        </Button>
      </View>

    </Background>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  },
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
});

DoctoresFormScreen.options = {
  topBar: {
    title: {
      text: 'Doctor'
    }
  },
  bottomTab: {
    text: 'Doctor'
  }
}

export default DoctoresFormScreen;
