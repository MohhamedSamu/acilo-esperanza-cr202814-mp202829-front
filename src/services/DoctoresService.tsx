import axios from 'axios';
import { DoctoresInterface } from "../interfaces/DoctoresInterface";

const baseUrl = 'http://10.0.2.2:8080/doctores';

const getDoctor = async (id: string) => {
  const urlPut = baseUrl + '/' + id

  const response = await axios.get(urlPut);
  if (response.status === 200) {
    return response.data.return[0];
  } else {
    throw new Error("Fallo al listar");
  }
}

const getDoctores = async () => {
  const response = await axios.get(baseUrl);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al listar");
  }
}

const createDoctor = async (doctor: DoctoresInterface) => {
  const response = await axios.post(baseUrl, doctor);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al crear");
  }
}

const updateDoctor = async (doctor: DoctoresInterface) => {
  const urlPut = baseUrl + '/' + doctor.id
  const response = await axios.put(urlPut, doctor);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al actualizar");
  }
}

const deleteDoctor = async (idDoctor: string) => {
  const urlDelete = baseUrl + '/' + idDoctor
  const response = await axios.delete(urlDelete);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al eliminar");
  }
}

export default { getDoctor, getDoctores, createDoctor, updateDoctor, deleteDoctor }
