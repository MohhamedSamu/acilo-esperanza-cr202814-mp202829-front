import axios from 'axios';
import { CitaInterface } from "../interfaces/CitaInterface";
import { DoctoresInterface } from "../interfaces/DoctoresInterface";

const baseUrl = 'http://10.0.2.2:8080/citas';

const getCita = async (id: string) => {
  const urlPut = baseUrl + '/' + id;

  const response = await axios.get(urlPut);
  if (response.status === 200) {
    return response.data.return[0];
  } else {
    throw new Error("Fallo al listar");
  }
}

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


const updateCita = async (cita: CitaInterface) => {
  const urlPut = baseUrl + '/' + cita.id
  const response = await axios.put(urlPut, cita);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al actualizar");
  }
}


export default { newDoctorCita, newPacienteCita, getCita, updateCita }
