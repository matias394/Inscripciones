import {
  FIRST_NAME, LAST_NAME, DOCUMENT_NATIONALITY,
  DOCUMENT_NUMBER, GENDER, BIRTHDAY, PROVINCE,
  LOCATION, ADDRESS, FLOOR, DEPARTMENT, POSTAL_CODE,
  CUIL, ALTERNATIVE_EMAIL, DOCUMENT_TYPE,
  NATIONALITY, DOCUMENT_NATIONALITY_CODE
} from '../../services/mapeador_campos_miba';


export const CAMPOS_MIBA = [
  {
    valor: FIRST_NAME,
    descripcion: 'Nombre',
    editable: false
  },
  {
    valor: LAST_NAME,
    descripcion: 'Apellido',
    editable: false
  },
  {
    valor: GENDER,
    descripcion: 'Género',
    editable: false
  },
  {
    valor: CUIL,
    descripcion: 'Cuil',
    editable: true
  },
  {
    valor: ALTERNATIVE_EMAIL,
    descripcion: 'Email',
    editable: true
  },
  {
    valor: NATIONALITY,
    descripcion: 'Nacionalidad',
    editable: true
  },
  {
    valor: DOCUMENT_TYPE,
    descripcion: 'Tipo de documento',
    editable: false
  }
];

