import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../../src/components/Background";
import TextInput from "../../src/components/TextInput";
import Button from "../../src/components/Button";
import { theme } from "../../src/core/theme";
import { emailValidator, nameValidator, passwordValidator } from "../../src/core/utils";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';
import DoctoresService from "../../src/services/DoctoresService";
import { DoctoresInterface } from "../../src/interfaces/DoctoresInterface";

import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const DoctoresFormScreen = (props: any) =>
{
  const editarDatos = props.id != null && props.id != undefined;

  const [email, setEmail] = useState({ value: '', error: '' });
  const [nombres, setNombres] = useState({ value: '', error: '' });
  const [apellidos, setApellidos] = useState({ value: '', error: '' });
  const [nacimiento, setNacimiento] = useState({ value: '', error: '' });
  const [titulo, setTitulo] = useState({ value: '', error: '' });
  const [picture, setPicture] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() =>
  {
    if (editarDatos)
    {
      findDoctor(props.id);
      setLoadingData(true);
    }else{
      setLoadingData(false);
    }
  }, []);

  const findDoctor = (id: string) =>
  {
    DoctoresService.getDoctor(id).then((response: DoctoresInterface) =>
    {
      console.log(response);
      setEmail({ value: response.email, error: '' });
      setNombres({ value: response.nombres, error: '' });
      setApellidos({ value: response.apellidos, error: '' });
      setNacimiento({ value: response.nacimiento, error: '' });
      setTitulo({ value: response.titulo, error: '' });
      setLoadingData(false);
    }).catch(error =>
    {
      console.log(error);
    });
  }

  const onSubmitDoctor = () =>
  {
    const emailError = emailValidator(email.value);
    const nombresError = nameValidator(nombres.value);
    const apellidosError = nameValidator(apellidos.value);
    const tituloError = nameValidator(titulo.value);
    const nacimientoError = nameValidator(nacimiento.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || nombresError || apellidosError || tituloError || nacimientoError)
    {
      setEmail({ ...email, error: emailError });
      setNombres({ ...nombres, error: nombresError });
      setApellidos({ ...apellidos, error: apellidosError });
      setTitulo({ ...titulo, error: tituloError });
      setNacimiento({ ...nacimiento, error: nacimientoError });
      return;
    }

    if (!editarDatos)
    {
      console.log('entra a error?');
      if (passwordError)
      {
        setPassword({ ...password, error: passwordError });
        return;
      }
    }

    const doctor: DoctoresInterface = {
      email: email.value,
      apellidos: apellidos.value,
      nombres: nombres.value,
      nacimiento: nacimiento.value,
      titulo: titulo.value,
      picture: '',
    };

    console.log(doctor);
    if (editarDatos)
    {
      doctor.id = props.id;
      actualizarDoctor(doctor);
    } else
    {
      //Metodo para guardar Doctor
      doctor.password = password.value;
      guardarDoctor(doctor);
    }
  };

  const guardarDoctor = (doctor: DoctoresInterface) =>
  {
    DoctoresService.createDoctor(doctor)
      .then(response =>
      {
        console.log(response);
      })
      .catch(error =>
      {
        console.log(error);
      });
  }

  const actualizarDoctor = (doctor: DoctoresInterface) =>
  {
    DoctoresService.updateDoctor(doctor)
      .then(response =>
      {
        console.log(response);
      })
      .catch(error =>
      {
        console.log(error);
      });
  }

  const toggleDatePicker = () =>
  {
    setShowPicker(!showPicker);
  }

  const onChange = (event: any, selectedDate: any) =>
  {
    console.log(event);
    if (event.type == "set")
    {
      const currentDate = selectedDate;
      setDate(currentDate);
      toggleDatePicker();
      setNacimiento({ value: moment(currentDate).format('L'), error: '' });
    } else
    {
      toggleDatePicker();
    }
  }

  return (
    <ScrollView>
      {!loadingData ?
        <Background>

          <View style={styles.row}>
            <Text style={styles.label}>
              {editarDatos ? 'Editar Doctor' : 'Nuevo Doctor'}
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

          {showPicker && (
            <RNDateTimePicker mode="date" value={date}
              display="spinner" onChange={onChange}
              maximumDate={new Date('2023-12-31')}
            />
          )}

          <Pressable onPress={toggleDatePicker} style={{ width: '100%' }}>
            <TextInput editable={false}
              label="Nacimiento"
              returnKeyType="next"
              value={nacimiento.value}
              onChangeText={text => setNacimiento({ value: text, error: '' })}
              error={!!nacimiento.error}
              errorText={nacimiento.error}
              autoCapitalize="none"
            />
          </Pressable>

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
            disabled={editarDatos}
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          {!editarDatos && (
            <TextInput
              label="Contraseña"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
          )}

          <View style={styles.container}>
            <Button mode="contained" onPress={() => onSubmitDoctor()}>
              {editarDatos ? 'Editar Doctor' : 'Guardar Doctor'}
            </Button>
          </View>

        </Background>
        :
        <View>
          <Text> </Text>
          <Text> </Text>
          <ActivityIndicator animating={loadingData} color={MD2Colors.black} />
        </View>
      }
    </ScrollView>
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
