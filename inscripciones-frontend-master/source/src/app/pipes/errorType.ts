import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'errorType' })
export class ErrorType implements PipeTransform {
  transform(value: string, message: string): string {
    //console.log('Valor: ', value, ' Mensaje: ',message);
    switch (value) {
      case 'required':
        return message ? message : 'Este Campo es requerido';
      case 'min':
        return message ? message : 'Valor no permitido';
      case 'pattern':
        return message ? message : 'Valor del campo no es valido';
      case 'notUnique':
        return 'Nombre ya existe'
      default:
        return 'Este Campo es requerido';
    }
  }
}
