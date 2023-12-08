import React, { useEffect, useState } from "react";
import { Block, Text, theme } from 'galio-framework';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar,
  View,
  Pressable
} from "react-native";
import { Button } from 'react-native-paper';
import { PaperProvider } from "react-native-paper";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
import { materialTheme } from '../../src/core/ThemeM';
import { PacientesInterface } from "../../src/interfaces/PacientesInterface";
import moment from "moment/moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import TextInput from "../../src/components/TextInput";
import { nameValidator } from "../../src/core/utils";
import { CitaInterface } from "../../src/interfaces/CitaInterface";
import DoctoresService from "../../src/services/DoctoresService";
import { DoctoresInterface } from "../../src/interfaces/DoctoresInterface";
import { getAuth } from "firebase/auth";
import CitasService from "../../src/services/CitasService";
import Toaster from "../../src/components/Toaster";
import { Navigation } from "react-native-navigation";
import DoctoresAgendarCitaScreen from "../DoctoresScreens/DoctoresAgendarCitaScreen";
import PacientesService from "../../src/services/PacientesService";
const auth = getAuth();

const BASE = 25;

const HeaderHeight = (BASE * 3.5 + (StatusBar.currentHeight || 0));
const PacientesAgendarCitaScreen = (props: any) => {

  const [doctor, setDoctor] = useState<DoctoresInterface>(props.doctor);

  const [selected, setSelected] = useState('');
  const [date, setDate] = useState(new Date());
  const [fechaCita, setFechaCita] = useState({ value: '', error: '' });
  const [showPicker, setShowPicker] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [modalType, setModalType] = React.useState('');

  useEffect(() =>
  {
    const hoy = moment();
    var month = doctor.nacimiento.split("/")[0];
    var day = doctor.nacimiento.split("/")[1];
    var year = doctor.nacimiento.split("/")[2];

    const myDate = moment(`${year}-${month}-${day}`);

    doctor.edad = hoy.diff(myDate, 'years');
    console.log(doctor.edad);
  }, []);

  const handlePress = (value: any) => {
    setSelected(value);
  };

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
      setFechaCita( { value: moment(currentDate).format('L'), error: '' } );
    } else
    {
      toggleDatePicker();
    }
  }

  const showModal = (type: string, text: string) =>
  {
    setModalType(type);
    setModalText(text);
    setVisible(true);
  }

  const hideModal = () => {
    setVisible(false);
    if(modalType === 'success'){
      Navigation.pop(props.componentId);
    }
  };

  const onSaveCitaDoctor = () =>
  {
    const fechaError = nameValidator(fechaCita.value);
    if (fechaError || selected === '')
    {
      setFechaCita({ ...fechaCita, error: fechaError });
      return;
    }

    // @ts-ignore
    PacientesService.getPacienteByEmail(auth.currentUser?.email).then((response: PacientesInterface) =>
    {
      const cita: CitaInterface = {
        paciente: response,
        fecha: fechaCita.value,
        hora: selected,
        doctor: doctor
      };

      console.log(cita);

      CitasService.newPacienteCita(cita)
        .then(response =>
        {
          console.log(response);
          showModal('success', 'Cita solicitada exitosamente!')
        })
        .catch(error =>
        {
          console.log('desde catch', error);
          //Mostrar modal
          showModal('danger', error.message)
        });


    }).catch(error =>
    {
      console.log(error);
    });
  }

  const RadioButton = ({ label, checked, onPress }: any) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:5 }}>
      <Button onPress={onPress} mode={checked ? 'contained' : 'outlined'}>
        {label}
      </Button>
    </View>
  );

  return (
    <PaperProvider>

      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: doctor && doctor.picture !== '' ? doctor.picture : 'https://picsum.photos/id/1/800'}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>{doctor.nombres} {doctor.apellidos}</Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">{(doctor.titulo)}</Text>
                    </Block>
                    <Text color="white" size={16} muted style={styles.seller}>{doctor.edad} años</Text>
                    {/*<Text size={16} color={materialTheme.COLORS.WARNING}>*/}
                    {/*  4.8*/}
                    {/*</Text>*/}
                  </Block>
                  <Block>
                    {/*<Text color={theme.COLORS?.MUTED} size={16}>*/}
                    {/*  {` `} Los Angeles, CA*/}
                    {/*</Text>*/}
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>

        <Block flex style={styles.options}>
          <ScrollView>
            {/*<Block row space="between" style={{ padding: theme.SIZES?.BASE, }}>*/}
            {/*  <Block middle>*/}
            {/*    <Text bold size={12} style={{marginBottom: 8}}>36</Text>*/}
            {/*    <Text muted size={12}>Orders</Text>*/}
            {/*  </Block>*/}
            {/*  <Block middle>*/}
            {/*    <Text bold size={12} style={{marginBottom: 8}}>5</Text>*/}
            {/*    <Text muted size={12}>Bids & Offers</Text>*/}
            {/*  </Block>*/}
            {/*  <Block middle>*/}
            {/*    <Text bold size={12} style={{marginBottom: 8}}>2</Text>*/}
            {/*    <Text muted size={12}>Messages</Text>*/}
            {/*  </Block>*/}
            {/*</Block>*/}

            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Agendar Cita</Text>
              {/*<Text size={12} color={theme.COLORS?.PRIMARY} >View All</Text>*/}
            </Block>

            <Block style={{ paddingBottom: -HeaderHeight * 2, marginTop: 5 }}>

              {showPicker && (
                <RNDateTimePicker mode="date" value={date}
                                  display="spinner" onChange={onChange}
                                  maximumDate={new Date('2023-12-31')}
                />
              )}

              <Pressable onPress={toggleDatePicker} style={{ width: '100%' }}>
                <TextInput editable={false}
                           label="Escoge la fecha"
                           returnKeyType="next"
                           value={fechaCita.value}
                           onChangeText={text => setFechaCita({ value: text, error: '' })}
                           error={!!fechaCita.error}
                           errorText={fechaCita.error}
                           autoCapitalize="none"
                />
              </Pressable>
            </Block>

            <Block row space="between" style={{ padding: theme.SIZES?.BASE, }}>
              <Block middle>
                <RadioButton
                  label="08:00"
                  checked={selected === '08:00'}
                  onPress={() => handlePress('08:00')}
                />
                <RadioButton
                  label="14:30"
                  checked={selected === '14:30'}
                  onPress={() => handlePress('14:30')}
                />
              </Block>
              <Block middle>
                <RadioButton
                  label="10:30"
                  checked={selected === '10:30'}
                  onPress={() => handlePress('10:30')}
                />
                <RadioButton
                  label="15:00"
                  checked={selected === '15:00'}
                  onPress={() => handlePress('15:00')}
                />
              </Block>
              <Block middle>
                <RadioButton
                  label="13:00"
                  checked={selected === '13:00'}
                  onPress={() => handlePress('13:00')}
                />
                <RadioButton
                  label="16:30"
                  checked={selected === '16:30'}
                  onPress={() => handlePress('16:30')}
                />
              </Block>
            </Block>

            <View style={styles.container}>
              <Button mode="contained" onPress={() => onSaveCitaDoctor()}>
                Agendar Cita
              </Button>
            </View>

            <Toaster
              visible={visible}
              type={modalType}
              text={modalText}
              hideModal={hideModal}
            />

          </ScrollView>
        </Block>
      </Block>
    </PaperProvider>

  );

};

PacientesAgendarCitaScreen.options = {
  topBar: {
    title: {
      text: 'Agendar Cita'
    }
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTexts: {
    paddingHorizontal: BASE * 2,
    paddingVertical: BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: BASE / 2,
    borderRadius: 4,
    height: 22,
    width: 100,
  },
  seller: {
    marginRight: BASE / 2,
  },
  options: {
    position: 'relative',
    padding: BASE,
    marginHorizontal: BASE,
    marginTop: -BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS?.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});

export default PacientesAgendarCitaScreen;
