import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { VisibilidadComponenteFormlyService } from './visibilidad-componente-formly.service';


@Injectable({
  providedIn: 'root',
})
export class ValidarFormularioFormlyService {
  constructor(
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService
  ) { }

  validar(formGroup: FormGroup, fields: FormlyFieldConfig[]): boolean {
    
    
    //const rpaTiposTramites: string[] = TIPOS_TRAMITES_RPA;
    formGroup.markAsTouched();
    let valido = true;
    Object.keys(formGroup.controls).map((key) => {
      const control = formGroup.get(key);
      const field = fields.find((f) => f.key === key);
      if (field && field.templateOptions['esVisible']) {
        this.visibilidadComponenteFormlyService.touched$.next(key);

        if (control.invalid) {
          valido = false;
        }
        if (field.type === 'renovacion-nicho' && !this.validarComponenteNicho(formGroup, field)) {
          field.templateOptions['tieneError'] = true;
          valido = false;
        }
        if (field.type === 'renovacion-boveda' && !this.validarComponenteBoveda(formGroup, field)) {
          field.templateOptions['tieneError'] = true;
          valido = false;
        }

/*        if (rpaTiposTramites.includes(field.type)
        ) {
          valido = field.templateOptions.valido;
          field.templateOptions.tieneError = !valido;
        }*/

        if (
          field.type === 'direccion-caba' &&
          !this.validarDomicilioCABA(formGroup, field)
        ) {
          valido = false;
        }

        if (
          field.type === 'cuit-razonsocial' &&
          !this.validarCuitRazonSocial(formGroup, field)
        ) {
          valido = false;
        }

        if (field.type === 'scoring-externo') {
          valido = field.templateOptions['valido'];
        }
        if (field.type === 'detalle-infraccionesScoring') {
          valido = field.templateOptions['valido'];
        }

        if (field.type === 'gestion-turno-sigehos' && !this.validarTurnosSigheos(formGroup, field)) {
          valido = false;
        }

      }
      if (field && !field.templateOptions['esVisible']) {
        field.formControl.disable();
      }
    });
    return valido;
  }

  validarComponenteNicho(
    formGroup: FormGroup,
    field: FormlyFieldConfig
  ): boolean {
   // const nicho = formGroup.value[field.key as string] as ModeloComponenteNicho;
    field.templateOptions['noTieneBusqueda'] = false;
    field.templateOptions['tieneErrorBuscar'] = false;
    field.templateOptions['tieneErrorSeleccionar'] = false;
    field.templateOptions['tieneErrorDeuda'] = false;
    field.templateOptions['tieneErrorRenovar'] = false;
    field.templateOptions['tieneErrorArchivos'] = false;
    field.templateOptions['tieneErrorDeclaracion'] = false;
    field.templateOptions['tieneErrorRenovarYDeuda'] = false;
    /*
     if (nicho.tipoBusquedaSeleccionada == '') {
       field.templateOptions['noTieneBusqueda'] = true;
       return false;
     }
    if (!nicho.nichoSeleccionado) {
      field.templateOptions.tieneErrorSeleccionar = true;
      return false;
    }
    if (nicho.nichoSeleccionado.aniosDeuda && !nicho.aniosDeudaSeleccionado) {
      field.templateOptions.tieneErrorDeuda = true;
      return false;
    }
    if (
      nicho.nichoSeleccionado.aniosDeuda === 0 &&
      nicho.nichoSeleccionado.aniosMaximoRenovar === 0
    ) {
      field.templateOptions.tieneErrorRenovarYDeuda = true;
      return false;
    }
    if (
      nicho.nichoSeleccionado.aniosDeuda === 0 &&
      nicho.nichoSeleccionado.aniosMaximoRenovar > 0 &&
      !nicho.aniosRenovacionSeleccionado
    ) {
      field.templateOptions.tieneErrorRenovar = true;
      return false;
    }
    if (nicho.renueva && !nicho.aniosRenovacionSeleccionado) {
      field.templateOptions.tieneErrorRenovar = true;
      return false;
    }*/

    return true;
  }

  validarComponenteBoveda(
    formGroup: FormGroup,
    field: FormlyFieldConfig
  ): boolean {
    //const boveda = formGroup.value[field.key as string] as ModeloComponenteBoveda;
    //const boveda = formGroup.value[field.key as string] as ModeloComponenteBoveda;
    field.templateOptions['tieneErrorBuscar'] = false;
    field.templateOptions['tieneErrorSeleccionar'] = false;
    field.templateOptions['tieneErrorDeuda'] = false;
    field.templateOptions['tieneErrorArchivos'] = false;

/*    if (boveda.items.length == 0) {
      field.templateOptions.tieneErrorBuscar = true;
      return false;
    }
    if (!boveda.bovedaSeleccionada) {
      field.templateOptions.tieneErrorSeleccionar = true;
      return false;
    }
    if (
      boveda.bovedaSeleccionada.aniosDeuda &&
      !boveda.aniosDeudaSeleccionado
    ) {
      field.templateOptions.tieneErrorDeuda = true;
      return false;
    }*/

    if (!field.model[field.key + 'archivo1'] || !field.model[field.key + 'archivo2']) {
      field.templateOptions['tieneErrorArchivos'] = true;
      return false;
    }

    return true;
  }

  validarDomicilioCABA(
    formGroup: FormGroup,
    field: FormlyFieldConfig
  ): boolean {
    const controlLocalidad = formGroup.get('localidad');
    const controlCalleAltura = formGroup.get('calle-altura');
    const controlCodigoPostal = formGroup.get('cod-postal');

    return (
      controlLocalidad.valid &&
      controlCalleAltura.valid &&
      controlCodigoPostal.valid
    );
  }

  validarCuitRazonSocial(formGroup: FormGroup, field: FormlyFieldConfig): boolean {
    let cuitValido = true;
    if (!field.templateOptions['valido']) {
      cuitValido = false;
    }
    return cuitValido;
  }

  validarTurnosSigheos(formGroup: FormGroup, field: FormlyFieldConfig): boolean {
    return !!field.model[field.key as string];
  }

}
