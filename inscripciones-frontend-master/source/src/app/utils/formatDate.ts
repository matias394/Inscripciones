import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

export const formatDateEN = (date: any) => {
  let year = date.year;
  let month = date.month <= 9 ? '0' + date.month : date.month;
  let day = date.day <= 9 ? '0' + date.day : date.day;
  let finalDate = year + '-' + month + '-' + day;
  return finalDate;
};

//CONVIERTE UNA FECHA DE FORMATO NGB A YYYY-MM-DD
export const formatDateNgb = (date: NgbDateStruct): string => {
  const month = date.month < 10 ? `0${date.month}` : date.month;
  const day = date.day < 10 ? `0${date.day}` : date.day;
  return `${date.year}-${month}-${day}`;
};

//CONVIERTE UNA FECHA DE FORMATO YYYY-MM-DD A NGB
export const convertirFecha = (fecha: any) => {
  const fechaString = fecha;
  const fechaFormateada = fechaString.replace(/\//g, '-');
  const partesFecha = fechaFormateada.split('-');
  const anio = parseInt(partesFecha[0], 10);
  const mes = parseInt(partesFecha[1], 10);
  const dia = parseInt(partesFecha[2], 10);
  return new NgbDate(anio, mes, dia);
};

//OBTENER SI LA FECHA DE HOY ES MAYOR A LA FECHA DE LA CLASE
export const createDateFromUTCDateString = (dateString: any) => {
  var parts = dateString.split('-');
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;
  var day = parseInt(parts[2], 10);
  return new Date(Date.UTC(year, month, day, 12, 0, 0, 0));
};

export const formatDateDesdeHasta = (dateString: string): string => {
  const datePipe = new DatePipe('en-US');
  // Extrae las partes de la fecha y hora del string
  const parts = dateString.split(' ');
  const fromDate = parts[1].substring(0, 10); // Extrae la fecha desde el índice 1 hasta el 10
  const toDate = parts[3].substring(0, 10); // Extrae la fecha desde el índice 3 hasta el 10

  // Formatea las fechas usando DatePipe
  const formattedFromDate = datePipe.transform(fromDate, 'dd-MM-yyyy');
  const formattedToDate = datePipe.transform(toDate, 'dd-MM-yyyy');

  // Construye la cadena formateada
  const formattedString = `Desde:${formattedFromDate} Hasta: ${formattedToDate}`;

  return formattedString;
};

export const formatDateES = (dateString: string): string => {
  const parts = dateString.split('-');
  const newFortmat = parts[2] + '-' + parts[1] + '-' + parts[0];

  return newFortmat;
};

export const timeShort = (time: string): string => {
  const parts = time.split(':');
  const newFortmat = parts[0] + ':' + parts[1];

  return newFortmat;
};

export const ordenarClasesPorFecha = (clases: any[]): any => {
  clases.forEach((clase) => {
    if (clase.fecha) {
      const fechaParts = clase.fecha.split('/');
      const fechaFormatted = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`;
      const fechaDate = new Date(fechaFormatted);
      clase.fechaDate = fechaDate;
    }
  });
  clases.sort((a, b) =>
    a.fechaDate < b.fechaDate ? -1 : a.fechaDate > b.fechaDate ? 1 : 0
  );
};
