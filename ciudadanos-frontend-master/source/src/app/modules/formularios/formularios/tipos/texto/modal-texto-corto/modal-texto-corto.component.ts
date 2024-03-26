import { Component, ViewChild } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { ModalTextoComponent } from '../modal-texto/modal-texto.component';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { Texto } from '../texto';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-texto-corto',
  templateUrl: './modal-texto-corto.component.html'
})
export class ModalTextoCortoComponent extends ModalComponenteFormulario {

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
