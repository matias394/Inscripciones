import {Component, OnInit, HostBinding, Input} from '@angular/core';
import { CampoFormularioComponent } from '../campo-formulario/campo-formulario.component';
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';

@Component({
  selector: 'app-controles-campo-formulario',
  templateUrl: './controles-campo-formulario.component.html',
  styleUrls: ['./controles-campo-formulario.component.css']
})
export class ControlesCampoFormularioComponent implements OnInit {
  @HostBinding('class') elementClass = 'cover-controles-campo-formulario';

  modelo: ModeloCampoFormulario;
  mostrar = true;
  deshabilitarVisibilidad: boolean;
  deshabilitarValidaciones: boolean;
  deshabilitarConceptos: boolean;

  constructor(
    private campoFormularioComponent: CampoFormularioComponent,
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) { }

  ngOnInit() {
    this.modelo = this.campoFormularioComponent.campo.modelo;
    this.deshabilitarValidaciones = !Boolean(this.modelo.validaciones);
    this.deshabilitarVisibilidad = !Boolean(this.modelo.visibilidad);
  }

  mostrarModal(tab: 'general' | 'validaciones' | 'visibilidad') {
    // abrimos el modal del tipo especificado en modo edicion en la tab especificada
    this.comunicacionBarraSeccionesService.crearModal(this.modelo.tipo, tab, this.modelo);
  }

  mostrarControles() {
    this.mostrar = true;
  }

  ocultarControles() {
    this.mostrar = false;
  }

  eliminar(event: Event) {
    this.campoFormularioComponent.eliminarEsteCampo();
    event.stopPropagation();
  }
}
