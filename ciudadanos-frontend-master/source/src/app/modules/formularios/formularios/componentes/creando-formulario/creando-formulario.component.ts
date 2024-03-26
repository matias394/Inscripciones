import { LocalAndSesionStorageService } from '../../services/local-storage.service';
import { SeccionesService } from './../../services/secciones.service';
import { AbrirModalEvent } from './../../modelos/events/abrir-modal-event';
import { InstanciadorComponentesService } from './../../services/instanciador-componentes.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Formulario } from '../../modelos/formulario';
//import { ComponenteValidableComponent } from 'src/app/shared/componentes/componente-validable/componente-validable.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//import { requeridoValidator } from 'src/app/shared/directivas/requerido-validator';
import { ActivatedRoute, Router } from '@angular/router';
//import { FeedbackPanelComponent } from 'src/app/shared/componentes/feedback-panel/feedback-panel.component';
import { Subscription } from 'rxjs';
import { ComponenteDinamicoDirective } from '../../directivas/componente-dinamico.directive';
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
//import { MENSAJES_USUARIO } from 'src/app/shared/constantes/mensajes_usuario';
import { FormularioService } from '../../services/formulario.service';
import * as urlsFormulario from '../../urls-formulario';
//import { ModalSimpleComponent } from 'src/app/shared/componentes/modal-simple/modal-simple.component';
import { saveAs } from 'file-saver';
//import { irAlInicioDePantalla } from 'src/app/shared/funciones/navegabilidad';
//import { ErroresHandler } from '../../../../shared/handlers/errores.handler';
import { PrevisualizandoFormularioService } from '../../services/previsualizando-formulario.service';
//import { inputCharacterValidator } from 'src/app/shared/directivas/input-validator.directive';
//import { ConceptoDePago } from '../../../tipos-de-tramite/modelo/concepto-pago';

@Component({
  selector: 'app-creando-formulario',
  templateUrl: './creando-formulario.component.html',
  styleUrls: ['./creando-formulario.component.css'],
})
export class CreandoFormularioComponent
  implements OnInit, AfterViewInit, OnDestroy {
  //@ViewChild(FeedbackPanelComponent, { static: true }) feedbackPanel: FeedbackPanelComponent;
  //@ViewChild('modalConfirmacionGuardar', { static: true }) modalConfirmacionGuardar: ModalSimpleComponent;
  //@ViewChild('modalPerdidaDatos', { static: true }) modalPerdidaDatos: ModalSimpleComponent;
  @ViewChild(ComponenteDinamicoDirective, { static: true }) modalTemplate: ComponenteDinamicoDirective;
  formulario: Formulario;
  titulo = 'Crear formulario';
  usuarioPuedeEditar: boolean;
  puedeEditarseNombre: boolean;
  subscription: Subscription;
  colaDeMensajesSubscription: Subscription;
  edicion: boolean;
  type: any;
  message: any;
  respuesta: boolean = false;
  esEventoVolver: boolean;
  form: FormGroup = this.formBuilder.group({
    nombre:new FormControl({value:'',disabled:false},{validators:[Validators.required,]})
  });
  stringFormInicial: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService,
    private seccionesService: SeccionesService,
    private instanciadorComponentesService: InstanciadorComponentesService,
    private formularioService: FormularioService,
    private previsualizandoFormularioService: PrevisualizandoFormularioService,
   // public errorHandler: ErroresHandler,
  ) {
    //super();
  }

  ngOnInit() {
    this.formulario = new Formulario(null, null, true, null);
    this.subscription = this.comunicacionBarraSeccionesService
      .getModal()
      .subscribe((event: AbrirModalEvent) => {
        const modal = this.instanciadorComponentesService.instanciarModal(
          this.modalTemplate,
          event.tipo
        );
        modal.initModal(event.tab, event.modelo);
      });
    this.colaDeMensajesSubscription = this.seccionesService.colaDeMensajes.subscribe(mensaje => {
      if (mensaje) {
        //(mensaje.esMensajeExito) ? this.feedbackPanel.registrarExito(mensaje.mensaje) : this.feedbackPanel.registrarError(mensaje.mensaje);
      } else {
        this.limpiarAlertas();
      }
    });
    this.usuarioPuedeEditar = this.route.snapshot.data['usuarioPuedeEditar'];
    this.edicion = this.route.snapshot.data['edicion'];
    this.route.queryParams.subscribe(params => {
      if (params['alertaNueva'] === 'true') {
        //this.feedbackPanel.registrarExito(MENSAJES_USUARIO.formularioCreadoExistosamente);
      }
    });

    this.verificarTipoPantalla();
  }

  get nombre(){return this.form.get('nombre')}

  ngAfterViewInit() {
    // usado en la verificacion de los datos para ver si hubo cambios
    this.stringFormInicial = JSON.stringify({
      nombre: this.formulario.nombre,
      campos: this.seccionesService.getFormly()
    });
  }

  ngOnDestroy(): void {
    this.comunicacionBarraSeccionesService.inicializarServicio();
    this.seccionesService.inicializarServicio();
    this.subscription.unsubscribe();
    this.colaDeMensajesSubscription.unsubscribe();
  }

  disable(){
    this.nombre.disabled ? this.nombre.enable() : this.nombre.disable()
  }

  verificarTipoPantalla(): void {
    if (this.edicion) {
      this.formulario = <Formulario>this.route.snapshot.data['formulario'];
      this.titulo = 'Formulario: ' + this.formulario.nombre;
      this.form.setValue({
        nombre: this.formulario.nombre
      });
      this.seccionesService.importarSecciones(this.formulario.campos);
      //this.comunicacionBarraSeccionesService.conceptosPagoVariablesDelTramite = this.formulario.conceptosPagoVariables.map(c => new ConceptoDePago(c.codigo, c.descripcion));
    }
    this.puedeEditarseNombre = this.usuarioPuedeEditar && this.formulario.puedeEditarseNombre;
    if (!this.puedeEditarseNombre) {
      this.disable();
    }
  }

/*  inicializarValidaciones(): void {
    this.validaciones = {
      nombre: { invalido: false, mensaje: '' },
      descripcion: { invalido: false, mensaje: '' }
    };
  }*/

  irInicioPagina(): void {
    window.scroll(0, 0);
  }

  limpiarAlertas(): void {
    //this.feedbackPanel.limpiar();
  }

  volver(): void {
    // this.router.navigate([urlsFormulario.formularioBusqueda]);

    window.location.href = urlsFormulario.formularioBusqueda
  }

  abrirModalConfirmacionVolver(): void {
    this.esEventoVolver = true;
    if (this.chequearSiHuboCambios()) {
      //this.modalPerdidaDatos.mostrar();
    } else {
      this.volver();
    }
  }

  reiniciarFormulario() {
    const jsonForm = JSON.parse(this.stringFormInicial);
    this.formulario.nombre = jsonForm.nombre;
    this.seccionesService.importarSecciones(jsonForm.campos);
  }

  cancelar(): void {
    this.esEventoVolver = true;
    if (this.chequearSiHuboCambios()) {
      //this.modalPerdidaDatos.mostrar();
    } else if (this.edicion) {
      this.reiniciarFormulario();
    } else {
      this.volver();
    }
  }

  chequearSiHuboCambios(): boolean {
    const nuevoForm = JSON.stringify({
      nombre: this.form.value.nombre,
      campos: this.seccionesService.getFormly()
    });
    return this.stringFormInicial !== nuevoForm;
  }

  aceptarPerdidaDatos(): void {
    if (this.edicion && !this.esEventoVolver) {
      this.reiniciarFormulario();
    } else {
      this.volver();
    }
  }

  guardar(): void {
    const { nombreTipoTramite, estadoTipoTramite } = this.formulario;
    this.limpiarAlertas();
    if (this.form.invalid) { return; }
    if (this.seccionesService.existenSeccionesVacias()) {
      //this.feedbackPanel.registrarError(MENSAJES_USUARIO.formularioSeccionesVacias);
      return;
    }
    if (!this.seccionesService.validarOrdenComponentes()) {
      //this.feedbackPanel.registrarError(MENSAJES_USUARIO.formularioOrdenDeComponenteEnSecciones);
      return;
    }
    if (!this.seccionesService.verificarGruposIterativosNoVacios()) {
      //this.feedbackPanel.registrarError(MENSAJES_USUARIO.alMenosUncomponenteEnCadaGrupoIterativo);
      return;
    }
    if (!this.seccionesService.verificarGruposIteratiovsAlMenosUnoImportante()) {
      //this.feedbackPanel.registrarError(MENSAJES_USUARIO.alMenosUnHijoImportanteGrupoIterativos);
      return;
    }
    if (this.form.invalid) { return; }

    if (nombreTipoTramite && estadoTipoTramite === 'Activo') {
      //this.modalConfirmacionGuardar.mostrar();
    } else {
      this.confirmarGuardar();
    }
  }

  confirmarGuardar(): void {
    this.formulario.nombre = this.form.value.nombre;
    this.formulario.campos = this.seccionesService.getFormly();
    //this.formulario.conceptosPagoVariables = this.comunicacionBarraSeccionesService.obtenerConceptosVariablesDeLosCampos();
    this.formulario.validadores = this.comunicacionBarraSeccionesService.obtenerValidadoresDeLosCampos();
    this.formularioService.guardarFormulario(this.formulario).subscribe(
      (id) => {
        this.respuesta = true
       this.type = 'alert alert-success';
       this.message = 'Se ha registrado exitosamente el nuevo formulario';
        if (this.edicion) {
          //this.feedbackPanel.registrarExito(MENSAJES_USUARIO.alertaEditar);
          this.titulo = 'Formulario: ' + this.formulario.nombre;
        } else {
          // this.router.navigate([urlsFormulario.getFormularioEdicion(id)], {
          //   queryParams: { alertaNueva: true }
          // });

          setTimeout(() => {
            window.location.href = urlsFormulario.formularioBusqueda
          }, 1000);
        }
      }, (error => {
        this.respuesta = true
        this.type = 'alert alert-danger';
        this.message = 'Error al registrar el nuevo formulario';
        console.log(error)
      })
    );
  }

  importar(evt: any): void {
    this.limpiarAlertas();
    const target: DataTransfer = <DataTransfer>evt.target;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const formularioLeido = JSON.parse(e.target.result);
        if (formularioLeido) {
          this.popularFormularioImportado(formularioLeido);
          this.seccionesService.importarSecciones(this.formulario.campos);
          //this.feedbackPanel.registrarExito(MENSAJES_USUARIO.importacionExitosa);
        }
      } catch (error) {
        //this.feedbackPanel.registrarError(MENSAJES_USUARIO.archivoFormatoIncorrecto);
      }
      evt.target.value = null;
      //irAlInicioDePantalla();
    };
    reader.readAsText(target.files[0]);
  }

  popularFormularioImportado(formulario: Formulario): void {
    this.formulario.nombre = formulario.nombre;
    this.formulario.campos = formulario.campos;
  }

  exportar(): void {
    this.formularioService.getFormulario(this.formulario.id).subscribe(formulario => {
      saveAs(new Blob([JSON.stringify(formulario)],
          { type: 'application/json' }),
        'Formulario_' + formulario.nombre);
    });
  }

  previsualizar() {
    this.limpiarAlertas();
    if (this.form.invalid) { return; }
    if (this.seccionesService.existenSeccionesVacias()) {
      //this.feedbackPanel.registrarError(MENSAJES_USUARIO.formularioSeccionesVacias);
      return;
    }
    if (!this.seccionesService.validarOrdenComponentes()) {
      //this.feedbackPanel.registrarError(MENSAJES_USUARIO.formularioOrdenDeComponenteEnSecciones);
      return;
    }
    if (!this.seccionesService.verificarGruposIterativosNoVacios()) {
      //this.feedbackPanel.registrarError(MENSAJES_USUARIO.alMenosUncomponenteEnCadaGrupoIterativo);
      return;
    }

    const secciones = this.seccionesService.getFormly();
    const nombre = this.form.get('nombre').value;

    this.previsualizandoFormularioService.setFormulario({
      nombre: nombre,
      secciones: secciones
    });

    if (!this.previsualizandoFormularioService.isVentanaAbierta()) {
      window.open('formularios/previsualizacion', '_blank');
    }
  }
}
