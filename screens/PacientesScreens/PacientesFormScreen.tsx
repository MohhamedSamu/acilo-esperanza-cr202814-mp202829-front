import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../../src/components/Background";
import TextInput from "../../src/components/TextInput";
import Button from "../../src/components/Button";
import { theme } from "../../src/core/theme";
import { emailValidator, nameValidator, passwordValidator } from "../../src/core/utils";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';
import PacientesService from "../../src/services/PacientesService";
import { PacientesInterface } from "../../src/interfaces/PacientesInterface";
import { Navigation } from "react-native-navigation";
import Toaster from "../../src/components/Toaster";
import { PaperProvider } from "react-native-paper";

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Switch } from 'react-native-paper';

const PacientesFormScreen = (props: any) =>
{
  const editarDatos = props.id != null && props.id != undefined;

  const [email, setEmail] = useState({ value: '', error: '' });
  const [nombres, setNombres] = useState({ value: '', error: '' });
  const [apellidos, setApellidos] = useState({ value: '', error: '' });
  const [nacimiento, setNacimiento] = useState({ value: '', error: '' });
  const [capacitado, setCapacitado] = useState(true);
  const [picture, setPicture] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [modalType, setModalType] = React.useState('');

  const [loadingData, setLoadingData] = useState(true);

  const showModal = (type: string, text: string) =>
  {
    setModalType(type);
    setModalText(text);
    setVisible(true);
  }
  const hideModal = () => setVisible(false);

  useEffect(() =>
  {
    if (editarDatos)
    {
      findPaciente(props.id);
      setLoadingData(true);
    } else
    {
      setLoadingData(false);
    }
  }, []);

  const findPaciente = (id: string) =>
  {
    PacientesService.getPaciente(id).then((response: PacientesInterface) =>
    {
      console.log(response);
      setEmail({ value: response.email, error: '' });
      setNombres({ value: response.nombres, error: '' });
      setApellidos({ value: response.apellidos, error: '' });
      setNacimiento({ value: response.nacimiento, error: '' });
      setCapacitado(response.capacitado == undefined ? true : response.capacitado);
      setLoadingData(false);
    }).catch(error =>
    {
      console.log(error);
    });
  }

  const onSubmitPaciente = () =>
  {
    const emailError = emailValidator(email.value);
    const nombresError = nameValidator(nombres.value);
    const apellidosError = nameValidator(apellidos.value);
    const nacimientoError = nameValidator(nacimiento.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || nombresError || apellidosError || nacimientoError)
    {
      setEmail({ ...email, error: emailError });
      setNombres({ ...nombres, error: nombresError });
      setApellidos({ ...apellidos, error: apellidosError });
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

    const paciente: PacientesInterface = {
      email: email.value,
      apellidos: apellidos.value,
      nombres: nombres.value,
      nacimiento: nacimiento.value,
      capacitado: capacitado,
      picture: '',
    };

    console.log(paciente);
    if (editarDatos)
    {
      paciente.id = props.id;
      actualizarPaciente(paciente);
    } else
    {
      //Metodo para guardar Paciente
      paciente.password = password.value;
      guardarPaciente(paciente);
    }
  };

  const guardarPaciente = (paciente: PacientesInterface) =>
  {
    PacientesService.createPaciente(paciente)
      .then(response =>
      {
        console.log(response);
        navegarAtras();
      })
      .catch(error =>
      {
        console.log('desde catch', error);
        //Mostrar modal
        showModal('danger', error.message)
      });
  }

  const actualizarPaciente = (paciente: PacientesInterface) =>
  {
    PacientesService.updatePaciente(paciente)
      .then(response =>
      {
        console.log(response);
        navegarAtras();
      })
      .catch(error =>
      {
        console.log(error);
        //Mostrar modal
        showModal('danger', 'Error')
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

  const navegarAtras = () =>
  {
    console.log('atras ', props.componentId);
    Navigation.pop(props.componentId);
  }

  const onToggleSwitch = () => setCapacitado(!capacitado);


  return (
    <PaperProvider>
      <ScrollView>
        {!loadingData ?
          <Background>

            <View style={styles.row}>
              <TouchableOpacity onPress={() => navegarAtras()}>
                <Text style={styles.label}>
                  {editarDatos ? 'Editar Paciente' : 'Nuevo Paciente'}
                </Text>
              </TouchableOpacity>
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

            <Text style={styles.label}>Es capacitado? { capacitado ? 'Si': 'No' }</Text>
            <Switch value={capacitado} onValueChange={onToggleSwitch} />

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
              <Button mode="contained" onPress={() => onSubmitPaciente()}>
                {editarDatos ? 'Editar Paciente' : 'Guardar Paciente'}
              </Button>
            </View>

            <Toaster
              visible={visible}
              type={modalType}
              text={modalText}
              hideModal={hideModal}
            />

          </Background>
          :
          <View>
            <Text> </Text>
            <Text> </Text>
            <ActivityIndicator animating={loadingData} color={MD2Colors.black} />
          </View>
        }
      </ScrollView>
    </PaperProvider>


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

PacientesFormScreen.options = {
  topBar: {
    title: {
      text: 'Paciente'
    }
  },
  bottomTab: {
    text: 'Paciente'
  }
}

export default PacientesFormScreen;
