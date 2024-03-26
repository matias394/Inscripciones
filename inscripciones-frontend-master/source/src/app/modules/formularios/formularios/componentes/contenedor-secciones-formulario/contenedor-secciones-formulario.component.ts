import { CreandoFormularioComponent } from './../creando-formulario/creando-formulario.component';
import {Component, OnInit, ViewChild, OnDestroy, Input} from '@angular/core';
import { SeccionesService } from '../../services/secciones.service';
import { Seccion } from '../../modelos/seccion';
import { takeUntil } from 'rxjs/operators';
import {CdkDropListGroup} from "@angular/cdk/drag-drop";
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
//import { SuscripcionCancelable } from 'src/app/shared/modelo/suscripcion-cancelable';

@Component({
  selector: 'app-contenedor-secciones-formulario',
  templateUrl: './contenedor-secciones-formulario.component.html',
  styleUrls: ['./contenedor-secciones-formulario.component.css'],
})
export class ContenedorSeccionesFormularioComponent  implements OnInit {
  @Input('usuarioPuedeEditar') usuarioPuedeEditar: boolean;

  secciones: Seccion[];
  seccionAEliminar: number;

  claveGrupoIterativoAEliminar: string;

  constructor(
    private rootComponent: CreandoFormularioComponent,
    private seccionesService: SeccionesService,
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {
    //super();
  }

  ngOnInit() {
    this.secciones = this.seccionesService.secciones;
    this.seccionesService.seccionesImportadas.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      (secciones: Seccion[]) => {
        this.secciones = secciones;
      }
    );
    this.comunicacionBarraSeccionesService.intentoEliminarGrupoIterativo.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      (clave) => {
        this.claveGrupoIterativoAEliminar = clave;
        //this.confirmModalEliminarGrupoIterativo.mostrar();
      }
    );
    this.comunicacionBarraSeccionesService.campoEliminado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      clave => {
        if (clave === this.claveGrupoIterativoAEliminar) {
          this.claveGrupoIterativoAEliminar = null;
        }
      }
    );
  }

  /**
   * @param numeroSeccion el numero de la seccion (1 es el numero de partida)
   */
  agregarSeccion(numeroSeccion: number): void {
    this.rootComponent.limpiarAlertas();
    this.secciones.splice(numeroSeccion, 0, { fields: [] });
  }

  /**
   * @param numeroSeccion el numero de la seccion (1 es el numero de partida)
   */
  intentarEliminarSeccion(numeroSeccion: number): void {
    if (!this.esPosibleEliminarSecciones) {
     // this.rootComponent.feedbackPanel.registrarError(MENSAJES_USUARIO.formularioCantidadMinimaDeSecciones);
      return;
    }
    if (!this.seccionesService.validarSiSePuedeEliminarSeccion(numeroSeccion)) {
      //this.rootComponent.feedbackPanel.registrarError(MENSAJES_USUARIO.formularioSeccionRelacionada);
      return;
    }
    this.seccionAEliminar = numeroSeccion;
    if (this.secciones[numeroSeccion - 1].fields.length > 0) {
      // la seccion no está vacía, mostramos confirmacion
      //this.confirmModalEliminarSeccion.mostrar();
    } else {
      this.eliminarSeccion();
    }
  }

  eliminarSeccion(): void {
    this.rootComponent.limpiarAlertas();
    this.seccionesService.eliminarSeccion(this.seccionAEliminar);
  }

  eliminarGrupoIterativo() {
    this.comunicacionBarraSeccionesService.eliminarCampo(this.claveGrupoIterativoAEliminar);
  }

  get esPosibleEliminarSecciones(): boolean {
    // si la cantidad de secciones es mayor a uno se pueden eliminar las secciones
    return this.secciones.length > 1;
  }
}
