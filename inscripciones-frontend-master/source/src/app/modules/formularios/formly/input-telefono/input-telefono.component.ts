import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { VisibilidadComponenteFormlyService } from '../../formularios/services/visibilidad-componente-formly.service';
import { startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalAndSesionStorageService } from '../../formularios/services/local-storage.service';
import { Subscription } from 'rxjs';
import { CamposRequeridosMibaService } from '../../formularios/services/campos-requeridos-miba.service';
import { PERFIL_MIBA_PREVISUALIZACION } from '../../formularios/modelos/perfil-miba-previsualizacion';

const regExpCountryCode: RegExp = /^\+?[0-9]+$/
const regExpAreaCode: RegExp = /^[0-9]+$/
const regExpTelephone: RegExp = /^[0-9]+$/

@Component({
  selector: 'app-input-telefono',
  templateUrl: './input-telefono.component.html',
  styleUrls: ['./input-telefono.component.css'],
})
export class InputTelefonoComponent
  extends FieldType
  implements OnInit, OnDestroy
{
  public errorPhone:boolean = false;
  public errorPhoneMessage: string = '';
  etiqueta: string;
  editarEnMiba = false;
  previsualizacion = false;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  regex: any;
  descripciones: any;
  nuevaInscripcion: any;
  public mensajesError = {
    codigopais: 'El código país no puede tener menos de 2 dígitos',
    codigoarea: 'El código de área no puede tener menos de 2 dígitos',
    numerotelefono: 'El número no puede tener menos de 6 dígitos',
  };

  public formTelefono: FormGroup = this.fb.group({
    codigopais: ['',[Validators.minLength(2), Validators.pattern(regExpCountryCode)]],
    codigoarea: ['',[Validators.minLength(2), Validators.pattern(regExpAreaCode)]],
    numerotelefono: ['', [ Validators.minLength(6),Validators.pattern(regExpTelephone)]],
  });

  constructor(
    private fb: FormBuilder,
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService,
    private localAndSesionStorageService: LocalAndSesionStorageService,
    private camposRequeridosMibaService: CamposRequeridosMibaService
  ) {
    super();
  }

  ngOnInit() {
    this.nuevaInscripcion = JSON.parse(sessionStorage.getItem('inscribir'));
    this.subscribirMostrarElemento();
    this.field.templateOptions['hideLabel'] = true;
    this.etiqueta = `${this.field.templateOptions.label}${
      this.field.templateOptions.required ? '*' : ''
    }`;
    this.editarEnMiba = Boolean(this.field.templateOptions['valorMiba']);

    const perfilMiba = this.localAndSesionStorageService.getProfileMIBA();
    this.previsualizacion =
      JSON.stringify(perfilMiba) ===
      JSON.stringify(PERFIL_MIBA_PREVISUALIZACION);

    let valueTelefono = this.formControl.value;
    if (
      this.editarEnMiba ||
      (this.field.templateOptions['noEditableEnGrupo'] &&
        this.field.templateOptions['enEdicion'])
    ) {
      this.formTelefono.disable();
    }
    if (this.editarEnMiba) {
      const tipo = this.field.templateOptions['valorMiba'];
      valueTelefono = {
        codigopais: perfilMiba[`code_${tipo}`],
        codigoarea: perfilMiba[`area_code_${tipo}`],
        numerotelefono: perfilMiba[tipo],
      };

      if (this.field.templateOptions.required) {
        this.camposRequeridosMibaService.addCampoRequeridoMiba(`code_${tipo}`);
        this.camposRequeridosMibaService.addCampoRequeridoMiba(
          `area_code_${tipo}`
        );
        this.camposRequeridosMibaService.addCampoRequeridoMiba(tipo);
      }
    }
    if (valueTelefono) {
      this.formTelefono.patchValue(valueTelefono);
    }

    this.visibilidadComponenteFormlyService.touched$.subscribe((key) => {
      if (this.key === key) {
        this.formTelefono.markAsTouched();
      }
    });

    this.formTelefono.valueChanges
      .pipe(startWith(null))
      .subscribe(() => this.actualizarModelo());
    this.descripciones = this.to['descripcion'];
  }

  actualizarModelo() {
    const val = this.formTelefono.getRawValue();
    if (this.validarTelefono(val)) {
      this.formControl.patchValue(val);
    } else {
      this.formControl.patchValue(null);
    }
  }

  validarTelefono(val: {
    codigopais: string;
    codigoarea: string;
    numerotelefono: string;
  }): boolean {
    const datosValidos =
      Boolean(val.codigopais) &&
      Boolean(val.codigoarea) &&
      Boolean(val.numerotelefono);
    return (
      (this.formTelefono.disabled && datosValidos) ||
      (this.formTelefono.enabled && this.formTelefono.valid && datosValidos)
    );
  }

  isButtonDisabled(): boolean {
    return this.previsualizacion;
  }

  redirigirMiba() {
    if (this.isButtonDisabled()) {
      return;
    }
    //this.mibaService.redirigirMibaTriggered();
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService
      .crearSubscripcion()
      .subscribe(() => {
        this.mostrarElemento =
          this.visibilidadComponenteFormlyService.mostrarElemento(this);
      });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  hasErrors(field: string): boolean {
    return this.formTelefono.get(field).invalid;
  }

  getError(field: string): string {
    if (this.hasErrors(field)) {
      return this.mensajesError[field];
    }
    return null;
  }

  ngOnDestroy() {
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

  validateFormat(field):void {
    if (!this.formTelefono.controls[field].errors){
      this.errorPhone = false
      return
    } 
    const errors = this.formTelefono.controls[field].errors || {}
    for (const key of Object.keys(errors)) {
      this.errorPhone = true
      switch (key) {
        case 'minlength':
          this.errorPhoneMessage = this.mensajesError[field]
          return;
        case 'pattern':
          this.errorPhoneMessage = 'Debe introducir solo números'
          return;
        case 'required':
          this.errorPhoneMessage = 'Este campo es requerido'
          return;
        }
      }  


    /* let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }

    const regex = new RegExp(/^\d{0,8}$/, 'g');
    if (event.keyCode !== 8) {
      if (!regex.test(key)) {
        event.returnValue = false;
        if (event.preventDefault) {
          event.preventDefault();
        }
      }
    } */
  }
}
