import { ContenedorSeccionesFormularioComponent } from './../contenedor-secciones-formulario/contenedor-secciones-formulario.component';
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-seccion-formulario',
  templateUrl: './seccion-formulario.component.html',
  styleUrls: ['./seccion-formulario.component.css']
})
export class SeccionFormularioComponent implements OnInit, OnDestroy {
  @ViewChild('contenedorSeccionSinComponentes') contenedorSeccionSinComponentes: ElementRef;

  // numero de la seccion
  @Input() numero: number;
  @Input() seccion: any;
  @Input('usuarioPuedeEditar') usuarioPuedeEditar: boolean;

  desplegado: boolean;
  contenedorSinComponentesActivo: boolean;

  constructor(
    private contenedorSecciones: ContenedorSeccionesFormularioComponent,
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService,
  ) {

  }

  ngOnDestroy(): void {

    }

  ngOnInit() {
    this.contenedorSinComponentesActivo = false;
    this.seccion = this.seccion || {
      fields: []
    };

    this.desplegado = true;
    this.comunicacionBarraSeccionesService.campoCreado.pipe(
     // takeUntil(this.destroyed$)
    ).subscribe(
      (data) => this.agregarCampoEnEstaSeccion(data)
    );
    this.comunicacionBarraSeccionesService.campoEliminado.pipe(
     // takeUntil(this.destroyed$)
    ).subscribe(
      (clave) => this.eliminarCampoDeEstaSeccion(clave)
    );

    this.comunicacionBarraSeccionesService.campoSeleccionado.pipe(
     // takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        const claveActual = this.comunicacionBarraSeccionesService.claveActual;
        this.contenedorSinComponentesActivo = `${this.numero}` === claveActual;
      }
    );
  }

  clickPanelAcordeon(): void {
    this.desplegado = !this.desplegado;
  }

  agregarSeccionDebajo(event: Event) {
    event.stopPropagation();
    this.contenedorSecciones.agregarSeccion(this.numero);
  }

  eliminarEstaSeccion(event: Event) {
    event.stopPropagation();
    this.contenedorSecciones.intentarEliminarSeccion(this.numero);
  }

  clickEnSeccionSinComponentes() {
    this.comunicacionBarraSeccionesService.seleccionarCampo({
      elemento: this.contenedorSeccionSinComponentes,
      clave: `${this.numero}`
    });
  }

  agregarCampoEnEstaSeccion(clave: string) {
    const claveActual = this.comunicacionBarraSeccionesService.claveActual;

    // si la clave comienza con 'grupo-iterativo-' entonces el campo pertenece a un grupo iterativo
    const perteneceAGrupoIterativo = clave.match(/^grupo-iterativo-.*/);
    // verificamos que sea la seccion correspondiente
    if (perteneceAGrupoIterativo || (`${this.numero}` !== claveActual && this.seccion.fields.indexOf(claveActual) === -1)) { return; }

    // insertamos el elemento en la seccion actual
    if (!this.seccion.fields.length) {
      // la seccion esta vacia, por lo que insertamos el componente primero
      this.seccion.fields.push(clave);
    } else {
      // buscamos la posicion del elemento seleccionado
      const indiceSeleccionado = this.seccion.fields.indexOf(claveActual);
      if (indiceSeleccionado !== -1) {
        this.seccion.fields.splice(indiceSeleccionado + 1, 0, clave);
      }
    }
  }

  eliminarCampoDeEstaSeccion(clave: string) {
    const indice = this.seccion.fields.indexOf(clave);

    // verificamos que el campo pertenezca a la sección
    if (indice === -1) { return; }

    this.seccion.fields.splice(indice, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    // si el elemento viene de la misma seccion
    if (event.previousContainer === event.container) {
      moveItemInArray(this.seccion.fields, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  get mostrarContenedorSeccionSinComponentes() {
    return !this.seccion.fields.length;
  }
}
