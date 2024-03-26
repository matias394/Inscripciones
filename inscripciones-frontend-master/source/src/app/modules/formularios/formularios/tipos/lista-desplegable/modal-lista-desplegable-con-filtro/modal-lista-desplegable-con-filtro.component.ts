import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';
import { ListaDesplegable } from '../lista-desplegable';
import { ModalListaDesplegableComponent } from '../modal-lista-desplegable/modal-lista-desplegable.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-lista-desplegable-con-filtro',
  templateUrl: './modal-lista-desplegable-con-filtro.component.html',
  styleUrls: ['./modal-lista-desplegable-con-filtro.component.css']
})
export class ModalListaDesplegableConFiltroComponent extends ModalComponenteFormulario implements OnInit {

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
