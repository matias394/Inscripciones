import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalTipoCampoFormularioComponent } from '../../../componentes/modal-tipo-campo-formulario/modal-tipo-campo-formulario.component';
import { TipoCampoFormularioVisibilidadComponent } from '../../../componentes/tipo-campo-formulario-visibilidad/tipo-campo-formulario-visibilidad.component';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import { CuitRazonSocial } from '../cuit-razonsocial';

@Component({
  selector: 'app-modal-cuit-razonsocial',
  templateUrl: './modal-cuit-razonsocial.component.html',
  styleUrls: ['./modal-cuit-razonsocial.component.css']
})
export class ModalCuitRazonsocialComponent extends ModalComponenteFormulario implements OnInit {
  @ViewChild(ModalTipoCampoFormularioComponent, { static: true }) override modal: ModalTipoCampoFormularioComponent;
  @ViewChild(TipoCampoFormularioVisibilidadComponent, { static: true }) override tipoCampoVisibilidad: TipoCampoFormularioVisibilidadComponent;
  override submitted = false;

  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl({value:'',disabled:false},{validators:[Validators.required]}),
    seMuestraEnGrilla: new FormControl({value:'',disabled:false}),
    esSubsanable: new FormControl({value:'',disabled:false}),
    esEditableOperador: new FormControl({value:'',disabled:false}),
    etiqueta: new FormControl({value:'CUIT y Razón social',disabled:false})
  });

  formValidaciones = this.fb.group({
    campoObligatorio: []
  });

  constructor(private fb: FormBuilder, protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService) {
    super(comunicacionBarraSeccionesService);
  }

  ngOnInit() {
    this.formGeneral.get('esEditableOperador').setValue(this.modelo.datosGenerales['esEditableOperador'] ? this.modelo.datosGenerales['esEditableOperador'] : false);
    this.modal.show();
  }
  get nombre(){return this.formGeneral.get('nombre')}
  getInstancia(): CuitRazonSocial {
    return new CuitRazonSocial();
  }
}
