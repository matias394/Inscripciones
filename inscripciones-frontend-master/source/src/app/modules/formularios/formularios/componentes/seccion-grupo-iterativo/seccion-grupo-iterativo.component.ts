import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GrupoIterativo } from './../../tipos/grupo-iterativo/grupo-iterativo';
import { ComunicacionBarraSeccionesService } from './../../services/comunicacion-barra-secciones.service';
import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-seccion-grupo-iterativo',
  templateUrl: './seccion-grupo-iterativo.component.html',
  styleUrls: ['./seccion-grupo-iterativo.component.css']
})
export class SeccionGrupoIterativoComponent implements OnInit, AfterViewInit {
  @Input('usuarioPuedeEditar') usuarioPuedeEditar: boolean;
  @ViewChild('contenedorSeccionSinComponentes') contenedorSeccionSinComponentes: ElementRef;

  @Input() grupo: GrupoIterativo;

  etiquetaGrupoIterativo: string;

  campos: string[];
  contenedorSinComponentesActivo: boolean;

  constructor(
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService,
  ) {
  }

  ngOnInit() {
    // comportamiento del grupo iterativo sin componentes
    this.contenedorSinComponentesActivo = false;
    this.comunicacionBarraSeccionesService.campoSeleccionado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        const claveActual = this.comunicacionBarraSeccionesService.claveActual;
        this.contenedorSinComponentesActivo = `grupo-iterativo-${this.grupo.key}` === claveActual;
      }
    );

    this.comunicacionBarraSeccionesService.campoCreado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      (clave) => this.agregarCampoEnEsteGrupoIterativo(clave)
    );

    this.campos = this.grupo.campos.map((campo) => campo.key);

    this.comunicacionBarraSeccionesService.campoEliminado.pipe(
     // takeUntil(this.destroyed$)
    ).subscribe(
      (clave) => this.eliminarCampoDeEsteGrupoIterativo(clave)
    );

    this.grupo.cambiosEnVista().pipe(
      startWith(this.grupo),
      //takeUntil(this.destroyed$)
    ).subscribe(
      (modelo: GrupoIterativo) => {
        this.etiquetaGrupoIterativo = modelo.etiqueta;
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.campos.length === 0) {
        this.comunicacionBarraSeccionesService.seleccionarCampo({
          elemento: this.contenedorSeccionSinComponentes,
          clave: `grupo-iterativo-${this.grupo.key}`
        });
      }
    });
  }

  get grupoIterativoVacio() {
    return !this.campos.length;
  }

  clickEnGrupoIterativoSinComponentes(event: Event) {
    event.stopPropagation();
    this.comunicacionBarraSeccionesService.seleccionarCampo({
      elemento: this.contenedorSeccionSinComponentes,
      clave: `grupo-iterativo-${this.grupo.key}`
    });
  }

  agregarCampoEnEsteGrupoIterativo(clave: string) {
    const grupoIterativo = this.comunicacionBarraSeccionesService.campos[clave].modelo.grupoIterativo;
    if (this.grupo !== grupoIterativo) {
      // el componente nuevo no pertenece a este grupo iterativo
      return;
    }

    const claveActual = this.comunicacionBarraSeccionesService.claveActual;

    // insertamos el elemento en el grupo iterativo
    if (this.grupoIterativoVacio) {
      // el grupo iterativo esta vacio, por lo que insertamos el componente
      this.campos.push(clave);
    } else {
      // buscamos la posicion del elemento seleccionado
      const indiceSeleccionado = this.campos.indexOf(claveActual);
      if (indiceSeleccionado !== -1) {
        this.campos.splice(indiceSeleccionado + 1, 0, clave);
      }
    }
  }

  eliminarCampoDeEsteGrupoIterativo(clave: string) {
    const index = this.campos.indexOf(clave);
    if (index === -1) { return; }

    this.grupo.campos.splice(index, 1);
    this.campos = this.grupo.campos.map((campo) => campo.key);
  }

  drop(event: CdkDragDrop<string[]>) {
    // manejamos solamente el evento de cuando se hace drag and drop sobre la seccion
    if (event.previousContainer === event.container) {
      moveItemInArray(this.campos, event.previousIndex, event.currentIndex);

      // movemos los elementos en el arreglo de campos
      moveItemInArray(this.grupo.campos, event.previousIndex, event.currentIndex);
    }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('mouseover', ['$event']) onMouseOver(event: Event) {
    event.stopPropagation();
  }

  @HostListener('mouseout', ['$event']) onMouseOut(event: Event) {
    event.stopPropagation();
  }

}
