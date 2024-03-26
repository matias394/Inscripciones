import { CampoFormulario } from './../../modelos/campo-formulario';
import { ComunicacionBarraSeccionesService } from './../../services/comunicacion-barra-secciones.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { TipoCampoFormularioVisibilidadComponent } from '../tipo-campo-formulario-visibilidad/tipo-campo-formulario-visibilidad.component';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';

@Component({
  selector: 'app-tipo-campo-formulario-visibilidad-de-los-valores',
  templateUrl: './tipo-campo-formulario-visibilidad-de-los-valores.component.html',
  styleUrls: ['./tipo-campo-formulario-visibilidad-de-los-valores.component.css']
})
export class TipoCampoFormularioVisibilidadDeLosValoresComponent implements OnInit {

  @Input() visibilidadComponente: TipoCampoFormularioVisibilidadComponent;
  @Input() modoEdicion: boolean;
  @Input() nombreComponente: string;
  @Input() opciones: string[];
  @Input() tieneConceptosDePagoAsociados: boolean;

  listaDependencias = [];

  mapaDependenciaValores: { [key: string]: string[] } = {};

  form = this.fb.group({
    dependencia: [null],
    valor: [],
    opciones: [],
  });

  tieneConceptoPagoYComponenteAsociadoSubsanable = false;

  constructor(
    private fb: FormBuilder,
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService,
  ) {

  }

  ngOnInit() {
    this.inicializarValidaciones();
    setTimeout(() => {
      // lo ponemos dentro de un timeout para que se actualice la clave actual en el servicio
      this.cargarListaDependencias();
    });
  }

  inicializarValidaciones(): void {
/*    this.validaciones = {
      nombre: { invalido: false, mensaje: '' },
      valor: { invalido: false, mensaje: '' },
      opciones: { invalido: false, mensaje: '' },
    };*/
  }

  actualizarValidaciones(): void {
    if (this.dependencias) {
      this.form.controls['valor'].setValidators(Validators.required);
      this.form.controls['valor'].updateValueAndValidity();
      //this.validar('valor', ['required']);
    } else {
      this.form.controls['valor'].setValidators(null);
      this.form.controls['valor'].updateValueAndValidity();
    }
  }

  cargarListaDependencias() {
    const camposCreados = this.comunicacionBarraSeccionesService.campos;
    const claveActual = this.comunicacionBarraSeccionesService.claveActual;
    const listaDependencias = [];
    for (const clave in camposCreados) {
      if (camposCreados.hasOwnProperty(clave) && (!this.modoEdicion || claveActual !== clave)) {
        if (this.seleccionableComoDependencia(camposCreados[clave])) {
          const modelo: ModeloCampoFormulario = camposCreados[clave].modelo;
          if (!camposCreados[claveActual] || this.noSeAgregaAListaDependencias(camposCreados[claveActual].modelo, modelo)) { continue; }

          listaDependencias.push({
            tipo: modelo.tipo,
            key: clave,
            nombre: modelo.nombre,
            valores: modelo.datosGenerales['valores'] || []
          });
        }
      }
    }

    this.listaDependencias = listaDependencias;
  }

  noSeAgregaAListaDependencias(componenteSeleccionadoActual: ModeloCampoFormulario, componenteIteracion: ModeloCampoFormulario): boolean {
    // La primer condicion es true si el componente actual no pertenece a un grupo iterativo y el componente de la iteracion si
    // La segunda condicion es true si el componente actual pertenece a un grupo iterativo pero el componente de la iteracion pertenece a otro
    return (!componenteSeleccionadoActual.grupoIterativo && componenteIteracion.grupoIterativo !== null)
    || (componenteSeleccionadoActual.grupoIterativo && (!componenteIteracion.grupoIterativo || componenteSeleccionadoActual.grupoIterativo.key !== componenteIteracion.grupoIterativo.key));
  }

  seleccionableComoDependencia(campo: CampoFormulario): boolean {
    const { modelo: { tipo } } = campo;
    return tipo === 'listaDesplegable' ||
      tipo === 'listaDesplegableFiltro' ||
      tipo === 'selectorExcluyente' ||
      tipo === 'selectorMultiple' ||
      tipo === 'acordeon';
  }

  changeDependencia() {
    this.form.controls['valor'].setValue(null);
    this.tieneConceptoPagoYComponenteAsociadoSubsanable = false;
  }

  cambioEnValorDependencia() {
    const valor = this.form.get('valor').value;

    if (!this.mapaDependenciaValores.hasOwnProperty(valor)) {
      this.form.get('opciones').setValue(null);
    } else {
      this.form.get('opciones').setValue(this.mapaDependenciaValores[valor]);
    }
  }

  cambioEnOpcionesDependencia() {
    const valor = this.form.get('valor').value;
    if (!valor) { return; }
    const opciones = this.form.get('opciones').value;
    if (opciones) {
      this.mapaDependenciaValores[valor] = opciones;
    }
  }

  patchFormValue(visibilidad: any) {
    if (visibilidad == null || visibilidad.dependenciaValores == null) { return; }

    setTimeout(() => {
      const nombreCampo = this.comunicacionBarraSeccionesService.campos[visibilidad.dependenciaValores].modelo.nombre;

      this.cargarListaDependencias();

      const dependencia = this.listaDependencias.filter(val => val.nombre === nombreCampo);

      const _visibilidad = {
        dependencia: dependencia[0],
      };
      this.mapaDependenciaValores = visibilidad.mapaDependenciaValores;
      const valor = Object.keys(this.mapaDependenciaValores || {})[0];
      this.form.get('valor').setValue(valor);
      this.cambioEnValorDependencia();
      this.form.patchValue(_visibilidad);
    });

  }

  validarDependenciaComponente(): boolean {
    const formValue = this.form.value;
    if (!formValue || !formValue.dependencia) {
      return true;
    }
    const claveDependencia = formValue.dependencia.key;
    const campoSubsanable = this.comunicacionBarraSeccionesService.esCampoSubsanable(claveDependencia);
    this.tieneConceptoPagoYComponenteAsociadoSubsanable = campoSubsanable && this.tieneConceptosDePagoAsociados;
    return !this.tieneConceptoPagoYComponenteAsociadoSubsanable;
  }

  get invalid() {
    this.actualizarValidaciones();
    return this.form.invalid || !this.validarDependenciaComponente();
  }

  get value() {
    const value = this.form.value;
    if (value.dependencia) {
      value.dependencia = value.dependencia.key;
    }
    return {
      dependenciaValores: value.dependencia,
      mapaDependenciaValores: this.mapaDependenciaValores
    };
  }

  get dependencias() {
    return this.form.get('dependencia').value;
  }

  get dependenciaTexto() {
    return `Si ${this.dependencias.nombre} tiene el valor`;
  }

  get opcionesTexto() {
    return `${this.nombreComponente} muestra el/los valor/es`;
  }

  get opcionesSeleccionables() {
    return this.form.get('valor').value ? this.opciones : [];
  }
}
