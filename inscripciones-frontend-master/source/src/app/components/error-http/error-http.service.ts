import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface AlertData {
  message: string;
  time: number;
  status: number;
  show: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHTTPService {
  alert$ = new Subject<AlertData>();

  constructor() {}

  showAlert(status: number, time: number = 7000) {
    let message;
    // TODO: Quitar el if() para capturar todos los errores HTTP
    // TODO: Se deja el switch para ser utilizado con otros tipos de error HTTP
    if (status === 401 || status === 500) {
      switch (status) {
        case 401:
          message =
            '401 - La sesión ha caducado, por favor haga login en el sistema.';
          break;
        default:
          message = '500 - Error al procesar la solicitud. Intente mas tarde.';
      }

      this.alert$.next({
        message: message,
        time: time,
        status: status,
        show: true,
      });
    }
  }

  closeAlert(): void {
    this.alert$.next({
      message: '',
      time: 0,
      status: 200,
      show: false,
    });
  }
}
