import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { ListaDesplegable } from '../lista-desplegable';
import { ModalListaDesplegableComponent } from '../modal-lista-desplegable/modal-lista-desplegable.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-lista-desplegable-simple',
  templateUrl: './modal-lista-desplegable-simple.component.html',
  styleUrls: ['./modal-lista-desplegable-simple.component.css']
})
export class ModalListaDesplegableSimpleComponent extends ModalComponenteFormulario implements OnInit {

  @ViewChild(ModalListaDesplegableComponent, { static: true }) modalLista: ModalListaDesplegableComponent;

  formGeneral: FormGroup;
  formValidaciones: FormGroup;

  constructor(protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService) {
    super(comunicacionBarraSeccionesService);
  }

  ngOnInit() {
  }

  getInstancia(): ListaDesplegable {
    return new ListaDesplegable();
  }

  override initModal(tab: 'general' | 'validaciones' | 'visibilidad', modelo?: ModeloCampoFormulario): void {
    this.modalLista.initModal(tab, modelo);
  }

}
