import { FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO } from '../texto-informativo';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { TextoInformativo } from '../texto-informativo';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { TipoCampoFormularioVisibilidadComponent } from '../../../componentes/tipo-campo-formulario-visibilidad/tipo-campo-formulario-visibilidad.component';


@Component({
  selector: 'app-modal-texto-informativo',
  templateUrl: './modal-texto-informativo.component.html',
  styleUrls: ['./modal-texto-informativo.component.css']
})
export class ModalTextoInformativoComponent extends ModalComponenteFormulario {

  @ViewChild(TipoCampoFormularioVisibilidadComponent, { static: true }) override tipoCampoVisibilidad: TipoCampoFormularioVisibilidadComponent;

  tiposFormatos = Object.values(FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO);

  formValidaciones: FormGroup;

  descripcionMaxLength: number;


  grupoIterativo: string;
  override submitted = false;

  formGeneral: FormGroup = this.fb.group({
    formato:new FormControl({value:'',disabled:false},{validators:[Validators.required]}),
    descripcion:new FormControl({value:'', disabled:false},{validators:[Validators.required, Validators.maxLength(800)]}),
  });

  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    super(comunicacionBarraSeccionesService);
    this.largoDescripcionPorFormato()
  }

  override initModal(tab: 'general' | 'validaciones' | 'visibilidad', modelo?: TextoInformativo) {
    const grupoIterativoActual = this.comunicacionBarraSeccionesService.grupoIterativoActual;
    this.grupoIterativo = (grupoIterativoActual == null) ? 'Ninguno' : grupoIterativoActual.nombre;
    super.initModal(tab, modelo);
  }

  getInstancia(): TextoInformativo {
    return new TextoInformativo();
  }
  get formato() { return this.formGeneral.get('formato'); }
  get descripcion() {return this.formGeneral.get('descripcion')}
  override guardar() {
    this.submitted = true;
    this.tipoCampoVisibilidad.actualizarValidaciones();
    if (!this.ejecutarValidaciones()) { return; }

    super.persistirCambiosEnModelo(this.formGeneral.value, false, this.tipoCampoVisibilidad.obtenerVisibilidad);
  }

  override validarNombreCampo(): boolean {
    // en el texto informativo, la clave formly es obtenida a partir de la descripcion
    const formlyKey = TextoInformativo.getFormlyKey(this.formGeneral.value.descripcion);
    return this.comunicacionBarraSeccionesService.validarNombreCampo(formlyKey);
  }

  override ejecutarValidaciones(): boolean {
    if (this.formGeneral.invalid) {
      this.modal.setCurrentTab('general');
      return false;
    }
    if (this.tipoCampoVisibilidad.form.invalid) {
      this.modal.setCurrentTab('visibilidad');
      return false;
    }
    return true;
  }

  override getCssClases(campo: string) {
    return {
      'has-error': this.submitted && this.formGeneral.get(campo).invalid,
      'has-feedback': this.submitted && this.formGeneral.get(campo).invalid
    };
  }

  override hasErrors(campo: string) {
    return this.submitted && this.formGeneral.get(campo).invalid;
  }

  get fields() {
    return this.formGeneral.controls;
  }

  largoDescripcionPorFormato() {
    this.formGeneral.get('descripcion').setValue('');
    this.descripcionMaxLength = (this.formGeneral.get('formato').value === FORMATOS_PERMITIDOS_TEXTO_INFORMATIVO.texto) ? 5600 : 800;
    this.formGeneral.get('descripcion').setValidators([Validators.required, Validators.maxLength(this.descripcionMaxLength)]);
  }

}
