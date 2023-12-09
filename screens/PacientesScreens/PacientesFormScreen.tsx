import { StyleSheet, View, Pressable, ScrollView, TouchableOpacity, Image } from "react-native";
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
import { launchImageLibrary } from "react-native-image-picker";

import { ImageLibraryOptions } from "react-native-image-picker/src/types";
import { getAuth } from "firebase/auth";
import { Block } from "galio-framework";
import { Text } from "galio-framework";
import { materialTheme } from "../../src/core/ThemeM";

const auth = getAuth();

const options: ImageLibraryOptions = {
  mediaType: "photo",
  includeBase64: true,

};

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
  const [paciente, setPaciente] = useState<PacientesInterface | null>(null);

  const [image, setImage] = useState<string | undefined>('');

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [modalType, setModalType] = React.useState('');

  const [loadingData, setLoadingData] = useState(true);
  const [userType, setUserType] = useState('');

  const showModal = (type: string, text: string) =>
  {
    setModalType(type);
    setModalText(text);
    setVisible(true);
  }
  const hideModal = () => {
    setVisible(false);
    if(modalType === 'success'){
      navegarAtras();
    }
  };

  useEffect(() =>
  {
    if (auth.currentUser?.displayName == undefined)
    {
      setUserType('admin')
    } else
    {
      setUserType(auth.currentUser?.displayName)
    }

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
      setPaciente(response);
      setEmail({ value: response.email, error: '' });
      setNombres({ value: response.nombres, error: '' });
      setApellidos({ value: response.apellidos, error: '' });
      setNacimiento({ value: response.nacimiento, error: '' });
      setCapacitado(response.capacitado == undefined ? true : response.capacitado);
      setImage(response.picture);
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
      picture: image,
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
        showModal('success', 'Paciente creado!')
      })
      .catch(error =>
      {
        console.log('desde catch', error);
        //Mostrar modal
        showModal('danger', error.message)
      });
  }

  const navegarList = () =>
  {
    console.log(paciente);
    Navigation.push(props.componentId, {
      component: {
        name: 'DoctoresAgendarCita',
        passProps: {
          paciente: paciente,
          id: paciente?.id
        }
      }
    })
  }

  const actualizarPaciente = (paciente: PacientesInterface) =>
  {
    PacientesService.updatePaciente(paciente)
      .then(response =>
      {
        console.log(response);
        showModal('success', 'Paciente actualizado!')
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

  const launchImagePicker = () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        // @ts-ignore
        setImage(`data:image/jpeg;base64,${response.assets[0].base64}`);
      }
    });
  }

  const navegarAtras = () =>
  {
    if(props.from == 'list'){
      props.callBack();
    }else{
      props.callBackItem();
    }

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

              <TouchableOpacity onPress={() => navegarList()}>
                <Block middle style={styles.pro}>
                  <Text size={14} color="white">Nueva Cita</Text>
                </Block>
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

            <View>
              {image && <Image source={{uri: image}} style={styles.image} />}
              {!editarDatos && (
                <Button mode="contained" onPress={() => launchImagePicker()}>
                  Seleccionar imagen
                </Button>
              )}
            </View>

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
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginBottom: 10,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 25 / 2,
    marginLeft: 30 / 2,
    borderRadius: 4,
    height: 28,
    width: 100,
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
