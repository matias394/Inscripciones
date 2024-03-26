import { Subject, Observable } from 'rxjs';
import { LocalAndSesionStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { PrevisualizarFormulario } from '../modelos/previsualizar-formulario';



@Injectable({
  providedIn: 'root'
})
export class PrevisualizandoFormularioService {

  private formularioSubject = new Subject<PrevisualizarFormulario>();

  formulario$: Observable<PrevisualizarFormulario> = this.formularioSubject.asObservable();

  FORMULARIO_KEY = '_formulario';
  VENTANA_ABIERTA_KEY = 'previsualizando_ventana_abierta';

  constructor(
    private localAndSesionStorageService: LocalAndSesionStorageService
  ) {
    const service = this;
    window.addEventListener('storage', function (event) {
      if (event.key === service.FORMULARIO_KEY && event.oldValue !== event.newValue) {
        const jsonCampos = event.newValue;
        service.formularioSubject.next(JSON.parse(jsonCampos));
      }
    }, false);
  }

  setFormulario(secciones: PrevisualizarFormulario) {
    const jsonFormulario = JSON.stringify(secciones);
    this.localAndSesionStorageService.setElement(this.FORMULARIO_KEY, jsonFormulario);
  }

  getFormulario(): PrevisualizarFormulario {
    const jsonFormulario = this.localAndSesionStorageService.getElement(this.FORMULARIO_KEY);
    return JSON.parse(jsonFormulario);
  }

  setVentanaAbierta(estaAbierta: boolean) {
    this.localAndSesionStorageService.setElement(this.VENTANA_ABIERTA_KEY, estaAbierta + '');
  }

  isVentanaAbierta() {
    const estaAbierta = this.localAndSesionStorageService.getElement(this.VENTANA_ABIERTA_KEY);
    return estaAbierta === 'true';
  }
}
