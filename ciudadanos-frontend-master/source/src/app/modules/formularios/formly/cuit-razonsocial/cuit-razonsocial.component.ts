import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType, FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {VisibilidadComponenteFormlyService} from "../../formularios/services/visibilidad-componente-formly.service";
import { Subscription } from 'rxjs';

export const REGEX_RAZON_SOCIAL: RegExp = /^[0-9a-zA-Z\sáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ<>|°¬!"#$%&/()=?'\\¡¿¨´+*~\[{^\]}`;,:._\-@]*$/i;

@Component({
  selector: 'app-cuit-razonsocial',
  templateUrl: './cuit-razonsocial.component.html',
  styleUrls: ['./cuit-razonsocial.component.css']
})
export class CuitRazonsocialComponent extends FieldType implements OnInit, OnDestroy {
  formCuitRazonSocial: FormGroup = this.fb.group({});
  fieldsCuitRazonSocial: FormlyFieldConfig[] = [];
  modelCuitRazonSocial = {};

  fields: any[] = [];

  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;

  constructor(
    private fb: FormBuilder,
   // private razonesSocialesService: RazonesSocialesService,
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService
  ) {
    super();
  }

  ngOnInit() {
    this.field.templateOptions['hideLabel'] = true;
    this.subscribirMostrarElemento();

    this.fields = [
      {
        fieldGroup: [
          {
            type: 'input-simple',
            key: 'cuit',
            name: 'CUIT',
            templateOptions: {
              label: 'CUIT',
              required: this.field.templateOptions.required,
              minLength: 11,
              maxLength: 11,
              pattern: '^\\d{11,11}$',
              blur: () => {
                this.buscarRazonSocial();
              }
            },
            validation: {
              messages: {
                pattern: 'El CUIT ingresado debe ser un valor numérico de 11 dígitos.',
                minLength: 'El CUIT ingresado debe ser un valor numérico de 11 dígitos.',
                maxLength: 'El CUIT ingresado debe ser un valor numérico de 11 dígitos.'
              }
            }
          },
          {
            type: 'input-simple',
            key: 'razon-social',
            name: 'Razón social',
            templateOptions: {
              label: 'Razón social',
              required: this.field.templateOptions.required,
              disabled: false,
              readonly: false,
              pattern: '^[0-9a-zA-Z\\sáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ|°¬!"#%&/()=?\'\\\\¡¿¨´+*~\\[{^\\]}`;,:._\\-@]*$',
              blur: () => {
                this.actualizarModelo();
              }
            },
            validation: {
              messages: {
                pattern: 'El valor ingresado no debe contener caracteres especiales.'
              }
            }
          }
        ],
      }
    ];

    this.visibilidadComponenteFormlyService.touched$.subscribe(
      key => {
        if (this.key === key) {
          this.formCuitRazonSocial.get('cuit').markAsTouched();
          this.formCuitRazonSocial.get('razon-social').markAsTouched();
        }
      }
    );
    this.assingSelf();
  }

  actualizarModelo(value?: any): void {
    value = value || this.formCuitRazonSocial.getRawValue();
    if (!value && !this.formCuitRazonSocial.get('cuit').value && !this.field.templateOptions.required) {
      this.field.templateOptions['valido'] = true;
    }
    if (!this.cuitValido() || !Boolean(value['razon-social']) || this.contieneHTML(value['razon-social'])) {
      this.formControl.setValue(null);
      this.field.templateOptions['valido'] = false;
    } else {
      this.formControl.setValue(value);
      this.field.templateOptions['valido'] = true;
    }
  }

  contieneHTML(valor: string): boolean {
    let contieneHTML = false;
    if (valor && (valor.indexOf('<') > -1 || valor.indexOf('>') > -1 || valor.indexOf('$') > -1)) {
      contieneHTML = true;
    }
    return contieneHTML;
  }

  assingSelf(): void {
    if (this.field.model[this.field.key as string]) {
      const value = {
        cuit: this.field.model[this.field.key as string].cuit || null,
        'razon-social': this.field.model[this.field.key as string]['razon-social'] || null,
      };
      setTimeout(() => {
        this.formCuitRazonSocial.setValue(value);
        this.actualizarModelo(value);
      });
    } else {
      this.formControl.setValue(null);
      if (!this.field.templateOptions.required) {
        this.field.templateOptions['valido'] = true;
      }
    }
    if (this.field.templateOptions['noEditableEnGrupo'] && this.field.templateOptions['enEdicion']) {
      this.fields[0].fieldGroup[0].templateOptions.noEditableEnGrupo = true;
      this.fields[0].fieldGroup[0].templateOptions.enEdicion = true;
      this.fields[0].fieldGroup[1].templateOptions.noEditableEnGrupo = true;
      this.fields[0].fieldGroup[1].templateOptions.enEdicion = true;
    }
  }

  buscarRazonSocial() {
    const cuit: string = this.formCuitRazonSocial.get('cuit').value;
    if (!cuit) {
      this.fields[0].fieldGroup[1].templateOptions.required = this.field.templateOptions.required;
      if (!this.field.templateOptions.required) {
        this.field.templateOptions['valido'] = true;
      }
    }
    if (this.cuitValido()) {
/*      this.razonesSocialesService.buscarPorCuit(cuit).subscribe(
        razonSocial => {
          if (razonSocial) {
            this.formCuitRazonSocial.setValue({
              cuit: razonSocial.cuit,
              'razon-social': razonSocial.nombre,
            });
            this.fields[0].fieldGroup[1].templateOptions.readonly = true;
            this.fields[0].fieldGroup[1].templateOptions.required = false;
            this.formCuitRazonSocial.get('razon-social').disable();
          } else {
            this.formCuitRazonSocial.setValue({
              cuit,
              'razon-social': '',
            });
            this.fields[0].fieldGroup[1].templateOptions.required = true;
            this.fields[0].fieldGroup[1].templateOptions.readonly = false;
            this.formCuitRazonSocial.get('razon-social').enable();
          }
          this.actualizarModelo();
        }
      );*/
    } else {
      this.fields[0].fieldGroup[1].templateOptions.readonly = false;
      if (!cuit && !this.field.templateOptions.required) {
        this.field.templateOptions['valido'] = true;
      } else {
        this.field.templateOptions['valido'] = false;
      }
      if (!cuit) {
        this.fields[0].fieldGroup[1].templateOptions.required = this.field.templateOptions.required;
      }
    }
    var fieldRazonSocial: FormlyFieldConfig = this.fields[0].fieldGroup[1];
    fieldRazonSocial.formControl.updateValueAndValidity();
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  ngOnDestroy() {
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

  private cuitValido(): boolean {
    const cuitControl = this.formCuitRazonSocial.get('cuit');
    const cuit = cuitControl.value;
    return cuitControl.valid && cuit && cuit.length === 11;
  }
}
