import { GrupoIterativo } from './../../tipos/grupo-iterativo/grupo-iterativo';
import { InstanciadorComponentesService } from './../../services/instanciador-componentes.service';
import {Component, OnInit, ElementRef, HostListener, AfterViewInit, HostBinding, ViewChild, Renderer2, Input} from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ComponenteDinamicoDirective } from '../../directivas/componente-dinamico.directive';
import { CampoFormulario } from '../../modelos/campo-formulario';
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
import { SeccionesService } from '../../services/secciones.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-campo-formulario',
  templateUrl: './campo-formulario.component.html',
  styleUrls: ['./campo-formulario.component.css'],
})
export class CampoFormularioComponent implements OnInit, AfterViewInit {
  @Input('usuarioPuedeEditar') usuarioPuedeEditar: boolean;
  @HostBinding('style.display') dsiplay = 'block';
  @ViewChild(CdkDragHandle) handle: CdkDragHandle;
  @ViewChild(ComponenteDinamicoDirective, { static: true }) template: ComponenteDinamicoDirective;
  @ViewChild('container', { static: true }) container: ElementRef;

  campo: CampoFormulario;

  constructor(
    private element: ElementRef,
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService,
    private seccionesService: SeccionesService,
    private instanciadorComponentesService: InstanciadorComponentesService,
    private drag: CdkDrag<string>,
    private renderer: Renderer2
  ) {
  //  super();
  }

  ngOnInit() {
    this.drag.lockAxis = 'y';

    this.campo = this.comunicacionBarraSeccionesService.campos[this.drag.data];

    const campo = this.instanciadorComponentesService.instanciarCampo(this.template, this.campo.modelo.tipo);
    campo.setModelo(this.campo.modelo);
    if (this.campo.selected) {
      this.renderer.addClass(this.container.nativeElement, 'selected');
    }

    this.comunicacionBarraSeccionesService.campoSeleccionado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        this.campo.selected = (this.drag.data === this.comunicacionBarraSeccionesService.claveActual);
        if (this.campo.selected) {
          this.renderer.addClass(this.container.nativeElement, 'selected');
        } else {
          this.renderer.removeClass(this.container.nativeElement, 'selected');
        }
      }
    );
    this.comunicacionBarraSeccionesService.campoEliminado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        if (this.campo.selected && this.comunicacionBarraSeccionesService.claveActual !== null) {
          // el campo actual es seleccionado y no es el campo que se eliminó
          setTimeout(() => {
            this.seleccionarEsteCampo();
          });
        }
      }
    );
  }

  ngAfterViewInit() {
    this.drag._handles.reset([this.handle]);
    if (this.campo.selected) {
      // si el campo que se acaba de crear (o dragandropear) debe marcarse como seleccionado
      setTimeout(() => {
        if (!(this.campo.modelo instanceof GrupoIterativo)) {
          this.seleccionarEsteCampo();
        }
      });
    }
  }

  seleccionarEsteCampo() {
    this.comunicacionBarraSeccionesService.seleccionarCampo({
      elemento: this.element,
      clave: this.drag.data
    });
  }

  eliminarEsteCampo() {
    if (this.comunicacionBarraSeccionesService.esDependenciaDeOtrosCampos(this.drag.data)) {
      //this.seccionesService.emitirMensaje(MENSAJES_USUARIO.eliminarComponenteDependencia, false);
      return;
    }
    this.eliminarCampoEnSeccion();
  }

  eliminarCampoEnSeccion(): void {
    this.comunicacionBarraSeccionesService.intentarEliminarCampo(
      this.drag.data,
      (this.campo.modelo instanceof GrupoIterativo) && (this.campo.modelo as GrupoIterativo).contieneCamposHijos()
    );
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
    this.seleccionarEsteCampo();
  }

  @HostListener('mouseover', ['$event']) onMouseOver(event: Event) {
    event.stopPropagation();
    this.renderer.addClass(this.container.nativeElement, 'hover');
  }

  @HostListener('mouseout', ['$event']) onMouseOut(event: Event) {
    event.stopPropagation();
    this.renderer.removeClass(this.container.nativeElement, 'hover');
  }

  startDrag(): void { }
}
