import { FormlyComponent } from './formly-component';
import { ValidadorFormulario } from '../modelos/validador-formulario';
import { FormlyFieldConfig } from '@ngx-formly/core';
//import { ConceptoDePago } from '../../../tramites-backend/tipos-de-tramite/modelo/concepto-pago';

export class Formulario {
  id: number | null;
  nombre: string;
  puedeEditarseNombre: boolean;
  campos: FormlyComponent[] | FormlyFieldConfig[];
  estadoTipoTramite?: string;
  nombreTipoTramite?: string;
  //conceptosPagoVariables?: ConceptoDePago[];
  validadores: ValidadorFormulario[];

  constructor(id: number, nombre: string, puedeEditarseNombre: boolean, campos: FormlyComponent[], nombreTipoTramite?: string, estadoTipoTramite?: string) {
    this.id = id;
    this.nombre = nombre;
    this.puedeEditarseNombre = puedeEditarseNombre;
    this.campos = campos;
    this.estadoTipoTramite = estadoTipoTramite;
    this.nombreTipoTramite = nombreTipoTramite;
  }
}
