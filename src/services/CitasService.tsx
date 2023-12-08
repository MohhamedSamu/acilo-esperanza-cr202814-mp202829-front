import axios from 'axios';
import { CitaInterface } from "../interfaces/CitaInterface";

const baseUrl = 'http://10.0.2.2:8080/citas';

const newDoctorCita = async (cita: CitaInterface) => {
  const url = baseUrl + '/newDoctorCita'
  const response = await axios.post(url, cita);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al crear");
  }
}

const newPacienteCita = async (cita: CitaInterface) => {
  const url = baseUrl + '/newPacienteCita'
  const response = await axios.post(url, cita);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al crear");
  }
}

export default { newDoctorCita, newPacienteCita }
