import { Texto } from '../texto';
import { Component, ViewChild } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ModalTextoComponent } from '../modal-texto/modal-texto.component';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-texto-largo',
  templateUrl: './modal-texto-largo.component.html'
})
export class ModalTextoLargoComponent extends ModalComponenteFormulario {

  @ViewChild(ModalTextoComponent, { static: true }) modalTexto: ModalTextoComponent;

  formGeneral: FormGroup;
  formValidaciones: FormGroup;

  constructor(protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService) {
    super(comunicacionBarraSeccionesService);
  }

  getInstancia(): Texto {
    return new Texto();
  }

  override initModal(tab: 'general' | 'validaciones' | 'visibilidad', modelo?: ModeloCampoFormulario): void {
    this.modalTexto.initModal(tab, modelo);
  }
}
