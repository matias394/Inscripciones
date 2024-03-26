import { ViewChild, Directive } from '@angular/core';
import { ModalTipoCampoFormularioComponent } from './../componentes/modal-tipo-campo-formulario/modal-tipo-campo-formulario.component';
import { ModeloCampoFormulario, ConceptosPagoCampoFormulario } from './modelo-campo-formulario';
import { ComunicacionBarraSeccionesService } from '../services/comunicacion-barra-secciones.service';
import { TipoCampoFormularioVisibilidadComponent } from '../componentes/tipo-campo-formulario-visibilidad/tipo-campo-formulario-visibilidad.component';
import { FormGroup } from '@angular/forms';
import { TipoCampoFormularioConceptosComponent } from '../componentes/tipo-campo-formulario-conceptos/tipo-campo-formulario-conceptos.component';


@Directive()
export abstract class ModalComponenteFormulario {
  //controlar viewchild's
  @ViewChild(ModalTipoCampoFormularioComponent, {static: true}) modal: ModalTipoCampoFormularioComponent;
  @ViewChild(TipoCampoFormularioVisibilidadComponent, {static: true}) tipoCampoVisibilidad: TipoCampoFormularioVisibilidadComponent;
  @ViewChild(TipoCampoFormularioConceptosComponent, {static: true}) conceptosPagoComponent: TipoCampoFormularioConceptosComponent;

  abstract formGeneral: FormGroup;
  abstract formValidaciones: FormGroup;

  modelo: ModeloCampoFormulario;
  modoEdicion: boolean;
  nombreCampoExistente: boolean;

  copiaConceptos: ConceptosPagoCampoFormulario;

  submitted = false;

  tieneConceptosYEsSubsanable = false;
  mensajeErrorTieneConceptosYEsSubsanable = 'El componente no puede ser subsanable si tiene activa la opción de asociar conceptos de pago a sus valores';
  tieneDependenciasConConceptosYEsSubsanable = false;
  mensajeErrorTieneDependenciasConConceptosYEsSubsanable = 'El componente no puede ser subsanable si algún componente que depende de él, tiene activa la opción de asociar conceptos de pago a sus valores';
  mensajeErrorValidacion = '';

  constructor(
    protected comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    this.nombreCampoExistente = false;
  }

  /**
   * Retorna la instancia correspondiente al tipo de campo formulario
   */
  abstract getInstancia(): ModeloCampoFormulario;

  /**
   * Completa los formularios del modal con un modelo ya existente
   *
   * @param modelo
   */
  completarFormularios(modelo: ModeloCampoFormulario) {
    if (modelo.datosGenerales) {
      if (this.formGeneral.get('nombre')) {
        this.formGeneral.get('nombre').disable();
      }
      this.formGeneral.patchValue(<object>modelo.datosGenerales);
    }
    if (modelo.validaciones) {
      this.formValidaciones.patchValue(<object>modelo.validaciones);
    }
    if (modelo.visibilidad) {
      this.tipoCampoVisibilidad.patchFormValue(<object>modelo.visibilidad);
    }
    if (modelo.conceptos) {
      this.conceptosPagoComponent.deshabilitarOHabilitarConceptosBasadoEnSubsanacion(modelo.esSubsanable);
      this.conceptosPagoComponent.deshabilitarOHabilitarConceptosBasadoEnEdicionOperador(modelo.esEditableOperador);
    }
  }

  validarNombreCampo(): boolean {
    const formlyKey = ModeloCampoFormulario.getFormlyKey(this.formGeneral.value.nombre);
    return this.comunicacionBarraSeccionesService.validarNombreCampo(formlyKey);
  }

  initModal(tab: 'general' | 'validaciones' | 'visibilidad' | 'conceptos', modelo?: ModeloCampoFormulario) {
    this.modoEdicion = (typeof (modelo) !== 'undefined');

    if (!this.modoEdicion) {
      // el modal no se abre en modo edicion, por ende se crea un nuevo modelo
      this.modelo = this.getInstancia();
    } else {
      this.modelo = modelo;
      this.completarFormularios(modelo);

      // chequeamos si tiene dependencias y mostramos el texto de advertencia
      this.modal.mostrarAdvertenciaDependencia = this.comunicacionBarraSeccionesService.esDependenciaDeOtrosCampos(modelo.key);
    }
    if (this.modelo.conceptos) {
      this.copiaConceptos = this.modelo.conceptos;
    }

    this.modal.setCurrentTab(tab);
    this.abrir();
  }

  abrir() {
    this.modal.show();
  }

  cerrar() {
    if (this.copiaConceptos) {
      this.modelo.conceptos = this.copiaConceptos;
    }
    this.cerrarVentana();
  }

  cerrarVentana() {
    this.modal.hide();
  }

  ejecutarValidaciones(): boolean {
    const formGeneralInvalido = this.formGeneral && this.formGeneral.invalid;
    const formValidacionesInvalido = this.formValidaciones && this.formValidaciones.invalid;
    const formVisibilidadInvalido = this.tipoCampoVisibilidad && !this.tipoCampoVisibilidad.isValid();
    const formConceptosInvalido = this.conceptosPagoComponent && !this.conceptosPagoComponent.esValido();
    const configuracionSubsanacionComponenteInvalida = !this.validarComponenteConConceptosNoSubsanable() || !this.validarDependenciasConConceptosYComponenteNoSubsanable();
    const configuracionEdicionOperadorHijosInvalida = this.validarComponentesDependientesEdicionOperador();
    const configuracionEdicionOperadorPadreInvalida = this.validarComponentesQueDependenEdicionOperador();
    const configuracionEdicionOperadorConceptos = this.validarComponenConConceptosEditableOperador();
    const valoresHTMLEnGIMostrarGrilla = this.validarValoresHTMLListasGIMostrarenGrilla();
    if (!valoresHTMLEnGIMostrarGrilla.valido) {
      this.modal.setCurrentTab('general');
      //this.modal.mensajeAdvertencia = valoresHTMLEnGIMostrarGrilla.mensaje;
      this.modal.mostrarAdvertenciaDependencia = true;
      return false;
    }
    if (!configuracionEdicionOperadorHijosInvalida.valido) {
      this.modal.setCurrentTab('general');
      //this.modal.mensajeAdvertencia = configuracionEdicionOperadorHijosInvalida.mensaje;
      this.modal.mostrarAdvertenciaDependencia = true;
      return false;
    }
    if (!configuracionEdicionOperadorPadreInvalida.valido) {
      this.modal.setCurrentTab('validaciones');
      //this.modal.mensajeAdvertencia = configuracionEdicionOperadorPadreInvalida.mensaje;
      this.modal.mostrarAdvertenciaDependencia = true;
      return false;
    }

    if (!configuracionEdicionOperadorConceptos.valido) {
      this.modal.setCurrentTab('conceptos');
      //this.modal.mensajeAdvertencia = configuracionEdicionOperadorConceptos.mensaje;
      this.modal.mostrarAdvertenciaDependencia = true;
      return false;
    }

    if (formGeneralInvalido || configuracionSubsanacionComponenteInvalida) {
      this.modal.setCurrentTab('general');
      return false;
    }
    if (formValidacionesInvalido) {
      this.modal.setCurrentTab('validaciones');
      return false;
    }
    if (formVisibilidadInvalido) {
      this.modal.setCurrentTab('visibilidad');
      return false;
    }
    if (formConceptosInvalido) {
      this.modal.setCurrentTab('conceptos');
      return false;
    }
    this.modal.mostrarAdvertenciaDependencia = false;
    return true;
  }

  getCssClases(campo: string) {
    const hasErrors = this.hasErrors(campo);
    return {
      'has-error': hasErrors,
      'has-feedback': hasErrors,
    };
  }

  hasErrors(campo: string) {
    return this.submitted && this.fieldValid(campo);
  }

  fieldValid(campo: string): boolean {
    return this.formGeneral.get(campo) ? this.formGeneral.get(campo).invalid : this.formValidaciones.get(campo).invalid;
  }

  fieldErrors(campo: string): any {
    const errors = this.formGeneral.get(campo) ? this.formGeneral.get(campo).errors : this.formValidaciones.get(campo).errors;
    return (errors == null) ? {} : errors;
  }

  guardar() {
    this.submitted = true;
    if (this.tipoCampoVisibilidad) {
      this.tipoCampoVisibilidad.actualizarValidaciones();
    }
    if (!this.ejecutarValidaciones()) { return; }

    if (this.formGeneral.get('nombre')) {
      this.formGeneral.get('nombre').enable();
    }
    const valueFormValidaciones = this.formValidaciones ? this.formValidaciones.value : false;
    const valueFormVisibilidad = this.tipoCampoVisibilidad ? this.tipoCampoVisibilidad.obtenerVisibilidad : false;
    this.persistirCambiosEnModelo(this.formGeneral.value, valueFormValidaciones, valueFormVisibilidad);
  }

  persistirCambiosEnModelo(datosGenerales, validaciones, visibilidad) {
    this.nombreCampoExistente = false;
    if (!this.modoEdicion && !this.validarNombreCampo()) {
      this.modal.setCurrentTab('general');
      this.nombreCampoExistente = true;
      return;
    }
    if (this.modoEdicion && (<object>this.modelo.configuracionFormly).hasOwnProperty('name')) {
      const name = this.modelo.configuracionFormly.name;
      datosGenerales.nombre = name;
    }
    const valoresAntiguos = this.modelo.datosGenerales['valores'];

    this.modelo.datosGenerales = datosGenerales;
    this.modelo.visibilidad = visibilidad;
    this.modelo.validaciones = validaciones;

    if (this.seActualizaronValores(valoresAntiguos)) {
      // se actualizaron los valores del componente, chequeamos las dependencias
      this.comunicacionBarraSeccionesService.actualizarDependencias(this.modelo.key);
    }

    if (!this.modoEdicion) {
      // si el modal no se abrio en modo edicion, se crea un nuevo campo
      this.comunicacionBarraSeccionesService.crearCampo(this.modelo);
    }

    this.modelo.actualizarVista();
    this.cerrarVentana();
  }

  /**
   * Chequea si se actualizaron los valores del campo
   */
  seActualizaronValores(valoresAntiguos: string[]): boolean {
    if (!valoresAntiguos) { return false; }

    const valoresNuevos: string[] = this.modelo.datosGenerales['valores'];
    if (!valoresNuevos) { return true; }

    if (valoresAntiguos.length !== valoresNuevos.length) { return true; }

    // Genera una copia para que no se modifique el orden de los valores ingresados por el usuario.
    const valoresAntiguosCopia = [].concat(valoresAntiguos).sort();
    const valoresNuevosCopia = [].concat(valoresNuevos).sort();

    for (let i = 0; i < valoresNuevosCopia.length; i++) {
      if (valoresAntiguosCopia[i] !== valoresNuevosCopia[i]) { return true; }
    }
    return false;
  }


  setValoresPorDefecto(valores: string[]): void {
    this.formGeneral.patchValue({ valoresPorDefecto: valores });
  }

  get listaValoresInvalid(): boolean {
    return this.submitted && this.formGeneral.controls['valores'].invalid;
  }

  validarComponenteEnGrupoEditableOperador() {
    //esto sirve solo para cuando esta dentro de grupo iterativo, hay que revisar
    const general = this.formGeneral.value;
    let resultado = {valido:true, mensaje:''};

    //Si el grupo iterativo al que pertence es editable yo debo serlo
    if (this.comunicacionBarraSeccionesService.grupoIterativoActual && this.comunicacionBarraSeccionesService.grupoIterativoActual.esEditableOperador && !general.esEditableOperador) {
      resultado.valido = false;
      resultado.mensaje = 'El componente debe tener activa la opción “Es editable por el operador”, si el grupo iterativo al que pertenece tiene activa dicha opción.”';
    }

    if (this.comunicacionBarraSeccionesService.grupoIterativoActual && !this.comunicacionBarraSeccionesService.grupoIterativoActual.esEditableOperador && general.esEditableOperador) {
      resultado.valido = false;
      resultado.mensaje = 'El componente no debe tener activa la opción “Es editable por el operador”, si el grupo iterativo al que pertenece no tiene activa dicha opción.';
    }
    return resultado;
  }

  validarValoresHTMLListasGIMostrarenGrilla() {
    let resultado = {valido:true, mensaje:'No se permite el ingreso de caracteres especiales'};
    if (this.comunicacionBarraSeccionesService.grupoIterativoActual &&
      this.formGeneral.controls['seMuestraEnGrilla'].value &&
      this.formGeneral.controls['valores']) {
        (this.formGeneral.controls['valores'].value as string[]).forEach(valor => {
          if (valor.indexOf('<') > -1 || valor.indexOf('>') > -1 || valor.indexOf('$') > -1) {
            resultado.valido = false;
          }
        });
      }
    return resultado;
  }

  validarComponenConConceptosEditableOperador() {
    let resultado = {valido:true, mensaje:'El componente no puede tener conceptos de pago asociados, si tiene activa la opción “Es editable por el operador”'};
    if (!this.modelo.conceptos) {
      return resultado;
    }
    const general = this.formGeneral.value;
    if (this.modelo.conceptos.tieneConceptosPagoAsociados && general.esEditableOperador) {
      resultado.valido = false;
    }
    return resultado;
  }

  validarComponenteConConceptosNoSubsanable(): boolean {
    if (!this.modelo.conceptos) {
      return true;
    }
    const general = this.formGeneral.value;
    this.tieneConceptosYEsSubsanable = this.modelo.conceptos.tieneConceptosPagoAsociados && general.esSubsanable;
    return !this.tieneConceptosYEsSubsanable;
  }

  validarDependenciasConConceptosYComponenteNoSubsanable(): boolean {
    const camposQueDependenDeEsteComponente = this.comunicacionBarraSeccionesService.obtenerCamposQueDependenDelCampo(this.modelo.key);

    // recorrer el arreglo de depndencias para verificar que ninguna tenga conceptos asociados
    let dependenciaConConceptos = false;
    camposQueDependenDeEsteComponente.forEach(claveCampo => {
      if (this.comunicacionBarraSeccionesService.tieneConceptosAsociados(claveCampo)) {
        dependenciaConConceptos = true;
      }
    });
    const general = this.formGeneral.value;

    this.tieneDependenciasConConceptosYEsSubsanable = general.esSubsanable && dependenciaConConceptos;
    return !this.tieneDependenciasConConceptosYEsSubsanable;
  }

  validarComponentesDependientesEdicionOperador() {
    const camposQueDependenDeEsteComponente = this.comunicacionBarraSeccionesService.obtenerCamposQueDependenDelCampoEdicionTramite(this.modelo.key);
    let resultado = {valido:true, mensaje:'El componente no puede tener activa la opción “Es editable por el operador”, si hay campos que dependen de él que no tienen activa dicha opción.'};
    camposQueDependenDeEsteComponente.forEach(claveCampo => {
      if (this.formGeneral.get('esEditableOperador').value && !this.comunicacionBarraSeccionesService.esCampoEditableOperador(claveCampo)) {
        resultado.valido = false;
      }
    });
    return resultado;
  }

  validarComponentesQueDependenEdicionOperador() {
    let resultado = {valido:true, mensaje:'El componente no puede depender de otro que tenga activa la opción “Es editable por el operador”, si él mismo no tiene activa dicha opción.'};
    if (this.tipoCampoVisibilidad) {
      if (!this.tipoCampoVisibilidad.dependencias) {
        resultado.valido = true;
        return resultado;
      }
      if (this.comunicacionBarraSeccionesService.esCampoEditableOperador(this.tipoCampoVisibilidad.dependencias.key)) {
        resultado.valido = this.formGeneral.get('esEditableOperador') ? this.formGeneral.get('esEditableOperador').value : false;
      }
    }
    return resultado;
  }
}
