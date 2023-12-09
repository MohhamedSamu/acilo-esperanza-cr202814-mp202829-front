import { DoctoresInterface } from "./DoctoresInterface";
import { PacientesInterface } from "./PacientesInterface";

export interface CitaInterface {
  id?: string,
  doctor?: DoctoresInterface,
  paciente?: PacientesInterface,
  fecha: string,
  hora: string,
  estado?: string,
}
