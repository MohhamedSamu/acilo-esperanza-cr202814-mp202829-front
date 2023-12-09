import axios from 'axios';
import { CitaInterface } from "../interfaces/CitaInterface";

import '../../config/firebase';

import { getAuth } from 'firebase/auth';

const auth = getAuth();

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

const getCitasPacientes = async () => {
  const currentUserEmail: string = auth?.currentUser?.email == null ? '' : auth.currentUser.email
  const response = await axios.get(baseUrl + '/getByPacienteEmail/' + currentUserEmail);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al listar");
  }
}

const getCitasDoctores = async () => {
  const currentUserEmail: string = auth?.currentUser?.email == null ? '' : auth.currentUser.email
  const response = await axios.get(baseUrl + '/getByDoctorEmail/' + currentUserEmail);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al listar");
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

export default { newDoctorCita, newPacienteCita, getCitasPacientes, getCitasDoctores }
