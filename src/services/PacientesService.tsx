import axios from 'axios';
import { PacientesInterface } from "../interfaces/PacientesInterface";

const baseUrl = 'http://10.0.2.2:8080/pacientes';

const getPaciente = async (id: string) => {
  const urlPut = baseUrl + '/' + id

  const response = await axios.get(urlPut);
  if (response.status === 200) {
    return response.data.return[0];
  } else {
    throw new Error("Fallo al listar");
  }
}

const getPacienteByEmail = async (email: string) => {
  const urlPut = baseUrl + '/getByEmail/' + email

  return await axios.get(urlPut);
}

const getPacientes = async () => {
  const response = await axios.get(baseUrl);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al listar");
  }
}

const createPaciente = async (paciente: PacientesInterface) => {
  const response = await axios.post(baseUrl, paciente);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al crear");
  }
}

const updatePaciente = async (paciente: PacientesInterface) => {
  const urlPut = baseUrl + '/' + paciente.id
  const response = await axios.put(urlPut, paciente);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al actualizar");
  }
}

const deletePaciente = async (idPaciente: string) => {
  const urlDelete = baseUrl + '/' + idPaciente
  const response = await axios.delete(urlDelete);
  if (response.status === 200) {
    return response.data.return;
  } else {
    throw new Error("Fallo al eliminar");
  }
}

export default { getPaciente, getPacientes, createPaciente, updatePaciente, deletePaciente, getPacienteByEmail }
