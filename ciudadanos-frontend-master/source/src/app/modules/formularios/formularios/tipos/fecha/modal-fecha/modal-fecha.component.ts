import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { Fecha } from '../fecha';

const regexNumeros = /^[-]?[\d]+$/;

@Component({
  selector: 'app-modal-fecha',
  templateUrl: './modal-fecha.component.html',
  styleUrls: ['./modal-fecha.component.css']
})
export class ModalFechaComponent extends ModalComponenteFormulario implements OnInit {

  unidadesDeTiempo = [
    '',
    'Días',
    'Meses',
    'Años',
  ];

  fechasInvalidas = false;

  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl({value:'',disabled:false},{validators:[Validators.required,Validators.maxLength(100)]}),
    etiqueta: new FormControl({value:'', disabled:false},{validators:[Validators.required, Validators.maxLength(200)]}),
    descripcion: new FormControl({value:'', disabled:false},{validators:[Validators.maxLength(800)]}),
    valorPorDefecto: new FormControl({value:'', disabled:false}),
    esSubsanable: new FormControl({value:'', disabled:false}),
    esEditableOperador: new FormControl({value:'', disabled:false}),
    seMuestraEnGrilla: new FormControl({value:'', disabled:false}),
  });

  mapaValidators = {
    hasta: [Validators.maxLength(4), Validators.pattern(regexNumeros)],
    unidadTiempoMaxima: [],
    desde: [Validators.maxLength(4), Validators.pattern(regexNumeros)],
    unidadTiempoMinima: [],
  };

  formValidaciones: FormGroup = this.fb.group({
    campoObligatorio: [],
    hasta: [null, this.mapaValidators.hasta],
    unidadTiempoMaxima: [],
    desde: [null, this.mapaValidators.desde],
    unidadTiempoMinima: [],
  });

  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    super(comunicacionBarraSeccionesService);
  }
  get nombre (){return this.formGeneral.get('nombre')}
  get etiqueta(){return this.formGeneral.get('etiqueta')}
  get descripcion(){return this.formGeneral.get('descripcion')}
  ngOnInit() {
    this.formGeneral.get('esEditableOperador').setValue(this.modelo.datosGenerales['esEditableOperador'] ? this.modelo.datosGenerales['esEditableOperador'] : false);
  }

  getInstancia(): Fecha {
    return new Fecha();
  }

  override guardar() {
    this.fechasInvalidas = false;
    super.guardar();
  }

  override ejecutarValidaciones(): boolean {
    if (!super.ejecutarValidaciones()) { return false; }
    if (!this.validarFechas()) {
      this.modal.setCurrentTab('validaciones');
      return false;
    }
    return true;
  }

  toggleValidation(campoRequerido: string, campoAValidar: string) {
    const validator = Validators.required;

    // agregamos la validacion en el campo a validar si el campo tiene algun valor presente
    const value = this.formValidaciones.get(campoRequerido).value;
    const campoVacio = value == null || value === '';

    const index = this.mapaValidators[campoAValidar].indexOf(validator);
    if (!campoVacio && index === -1) {
      this.mapaValidators[campoAValidar].push(validator);
    } else if (campoVacio && index !== -1) {
      this.mapaValidators[campoAValidar].splice(index, 1);
    }

    this.formValidaciones.controls[campoAValidar].setValidators(this.mapaValidators[campoAValidar]);
    this.formValidaciones.controls[campoAValidar].updateValueAndValidity();
  }

  getFechaCssClases(campo: string) {
    return {
      'has-error': this.hasErrors(campo) || this.fechasInvalidas,
      'has-feedback': this.hasErrors(campo) || this.fechasInvalidas
    };
  }

  hasFieldError(field: string, error: string[]) {
    const fieldErrors = this.formValidaciones.get(field).errors;
    if (!fieldErrors || !this.submitted) { return false; }
    for (let i = 0; i < error.length; i++) {
      if (fieldErrors.hasOwnProperty(error[i])) {
        return true;
      }
    }
    return false;
  }

  validarFechas() {
    const desde = +this.formValidaciones.get('desde').value;
    const unidadTiempoMinima = this.formValidaciones.get('unidadTiempoMinima').value;
    const hasta = +this.formValidaciones.get('hasta').value;
    const unidadTiempoMaxima = this.formValidaciones.get('unidadTiempoMaxima').value;

    const fechaDesde = this.construirFecha(desde, unidadTiempoMinima);

    const fechaHasta = this.construirFecha(hasta, unidadTiempoMaxima);

    this.fechasInvalidas = fechaDesde > fechaHasta;
    return !this.fechasInvalidas;
  }

  private construirFecha(cantidad: number, unidadDeTiempo: string): Date {
    const date = new Date();
    let timestamp, number;
    switch (unidadDeTiempo) {
      case 'Días':
        number = date.getDate() + cantidad;
        timestamp = date.setDate(number);
        break;
      case 'Meses':
        number = date.getMonth() + cantidad;
        timestamp = date.setMonth(number);
        break;
      case 'Años':
        number = date.getFullYear() + cantidad;
        timestamp = date.setFullYear(number);
        break;
    }
    return date;
  }
}
