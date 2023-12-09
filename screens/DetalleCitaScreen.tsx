import React, { useEffect, useState } from "react";
import { ActivityIndicator, MD2Colors, PaperProvider } from "react-native-paper";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import Background from "../src/components/Background";
import { theme } from "../src/core/theme";
import { Block, Text } from 'galio-framework';
import CitasService from "../src/services/CitasService";
import { CitaInterface } from "../src/interfaces/CitaInterface";
import moment from "moment";
import { PacientesInterface } from "../src/interfaces/PacientesInterface";
import { materialTheme } from "../src/core/ThemeM";
import { DoctoresInterface } from "../src/interfaces/DoctoresInterface";
const BASE = 60;
const { width, height } = Dimensions.get('screen');

const DetalleCitaScreen = (props: any) => {

  const [loadingData, setLoadingData] = useState(true);
  const imageStyles = [styles.image, styles.horizontalImage];

  const [paciente, setPaciente] = useState<PacientesInterface | undefined>();
  const [doctor, setDoctor] = useState<DoctoresInterface | undefined>();
  const [cita, setCita] = useState<CitaInterface | null>(null);

  useEffect(() =>
  {
    findCita(props.id);
  }, []);

  const findCita = (id: string) =>
  {
    CitasService.getCita(id).then((response: CitaInterface) =>
    {
      console.log(response);
      setCita(response);
      setPaciente(response.paciente);
      setDoctor(response.doctor);

      if(paciente){
        const hoy = moment();
        var month = paciente.nacimiento.split("/")[0];
        var day = paciente.nacimiento.split("/")[1];
        var year = paciente.nacimiento.split("/")[2];

        const myDate = moment(`${year}-${month}-${day}`);

        paciente.edad = hoy.diff(myDate, 'years');
        console.log(paciente.edad);
      }

      console.log(cita);
      setLoadingData(false);
    }).catch(error =>
    {
      console.log(error);
    });
  }

  return (
    <PaperProvider>
      <ScrollView>
        {!loadingData ?
          <Background>

            <View style={styles.row}>
              <TouchableOpacity >
                <Text style={styles.label}>
                  Detalles de la cita
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.products}>
              <Block flex>

                <Block row={true} card flex style={[styles.product, styles.shadow]}>
                  <TouchableWithoutFeedback >
                    <Block flex style={[styles.imageContainer, styles.shadow]}>
                      <Image source={{ uri: paciente?.picture }} style={imageStyles} />
                    </Block>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback >
                    <Block flex space="between" style={styles.productDescription}>
                      <Block middle style={styles.pro}>
                        <Text size={16} color="white">Paciente</Text>
                      </Block>
                      <Text  style={styles.productTitle}>{paciente?.nombres} {paciente?.apellidos}</Text>
                      <Text>{paciente?.edad} años</Text>
                    </Block>
                  </TouchableWithoutFeedback>
                </Block>

                <Block row={true} card flex style={[styles.product, styles.shadow]}>
                  <TouchableWithoutFeedback >
                    <Block flex style={[styles.imageContainer, styles.shadow]}>
                      <Image source={{ uri: doctor?.picture }} style={imageStyles} />
                    </Block>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback >
                    <Block flex space="between" style={styles.productDescription}>
                      <Block middle style={styles.pro}>
                        <Text size={16} color="white">Doctor</Text>
                      </Block>
                      <Text  style={styles.productTitle}>{doctor?.nombres} {doctor?.apellidos}</Text>
                      <Text>{doctor?.titulo}</Text>
                    </Block>
                  </TouchableWithoutFeedback>
                </Block>


              </Block>
            </ScrollView>


            <View style={styles.row}>
              <TouchableOpacity >
                <Text style={styles.label}>
                  Fecha: {cita?.fecha}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity >
                <Text style={styles.label}>
                  Hora: {cita?.hora}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity >
                <Text style={styles.label}>
                  Estado: {cita?.estado}
                </Text>
              </TouchableOpacity>
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
    </PaperProvider>


  );



};

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
    marginBottom: 10,
    justifyContent: 'center',
  },
  label: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
    marginBottom: 10,
  },
  product: {
    backgroundColor: '#fff',
    marginVertical: BASE - 40,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - BASE * 3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  products: {
    width: width - BASE * 2,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: BASE / 2,
    borderRadius: 4,
    height: 22,
    width: 100,
  },
});


DetalleCitaScreen.options = {
  topBar: {
    title: {
      text: 'Detalle Cita'
    }
  }
}

export default DetalleCitaScreen;
