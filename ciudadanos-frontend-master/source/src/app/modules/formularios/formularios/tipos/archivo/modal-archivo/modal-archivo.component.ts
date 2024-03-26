import { Archivo } from '../archivo';
import { ComunicacionBarraSeccionesService } from '../../../services/comunicacion-barra-secciones.service';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponenteFormulario } from '../../../modelos/modal-tipo-componente';
import { ModeloCampoFormulario } from '../../../modelos/modelo-campo-formulario';

export function fileValidator(control: AbstractControl): { [key: string]: any } {
  const value = control.value;
  if (value === null || value === '') { return null; }

  const regexpExtensions = /^\.[a-z]+$/;
  const extensions = value.map(val => val.value);
  for (let i = 0; i < extensions.length; i++) {
    if (!regexpExtensions.test(extensions[i])) {
      return {
        fileExtension: control.value
      };
    }
  }
  return null;
}

export function pilsLengthValidator(control: AbstractControl): { [key: string]: any } {
  const value = control.value;
  if (value === null || value === '') { return null; }

  if (Array.isArray(value) && value.map(val => val.value).join().length > 50) {
    return {
      pilsLength: control.value
    };
  }
  return null;
}

@Component({
  selector: 'app-modal-archivo',
  templateUrl: './modal-archivo.component.html',
  styleUrls: ['./modal-archivo.component.css']
})
export class ModalArchivoComponent extends ModalComponenteFormulario implements OnInit{

  formGeneral: FormGroup = this.fb.group({
    nombre:new FormControl({value:'',disabled:false},{validators:[Validators.required,Validators.maxLength(100)]}) ,
    etiqueta:new FormControl({value:'',disabled:false},{validators:[Validators.required,Validators.maxLength(200)]}),
    esArchivoNuevo: new FormControl({value:'',disabled:false}),
    descripcion:new FormControl({value:'',disabled:false},{validators:[Validators.maxLength(800)]}),
    esSubsanable: new FormControl({value:'',disabled:false}),
    esEditableOperador: new FormControl({value:'',disabled:false}),
    seMuestraEnGrilla: new FormControl({value:'',disabled:false}),
  });

  formValidaciones = this.fb.group({
    campoObligatorio: [],
    extensionesPermitidas: [null, [fileValidator, pilsLengthValidator]],
    tamanioMaximo: [null, [Validators.pattern('^[0-9]*$'), Validators.min(1)]],
  });


  constructor(
    private fb: FormBuilder,
    protected override comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    super(comunicacionBarraSeccionesService);
  }

  ngOnInit() {
    this.formGeneral.get('esEditableOperador').setValue(this.modelo.datosGenerales['esEditableOperador'] ? this.modelo.datosGenerales['esEditableOperador'] : false);
  }
  get nombre (){return this.formGeneral.get('nombre')}
  get etiqueta(){return this.formGeneral.get('etiqueta')}
  get descripcion(){return this.formGeneral.get('descripcion')}
  getInstancia(): Archivo {
    return new Archivo();
  }

  override completarFormularios(modelo: ModeloCampoFormulario) {
    this.formGeneral.get('nombre').disable();

    super.completarFormularios(modelo);
  }

  patchFormValidaciones(value: any) {
    const copia = JSON.parse(JSON.stringify(value));
    if (copia.extensionesPermitidas) {
      copia.extensionesPermitidas = value.extensionesPermitidas.map(valor => {
        return {
          display: valor,
          value: valor
        };
      });
    }
    this.formValidaciones.patchValue(copia);
  }

  get formValueValidaciones() {
    const value = this.formValidaciones.value;
    if (value.extensionesPermitidas) {
      // @ts-ignore
      value.extensionesPermitidas = value.extensionesPermitidas.map((valor) => valor.value);
    }
    return value;
  }
}
