import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as urlsFormulario from '../../urls-formulario';
import { FormularioBusqueda } from '../../modelos/formulario-busqueda';
import { takeUntil } from 'rxjs/operators';
import {PrevisualizandoFormularioService} from '../../services/previsualizando-formulario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormularioService} from "../../services/formulario.service";
import { saveAs } from 'file-saver';

interface Grilla {
  id?: number;
  nombre?: string;
  nombreTipoTramite?: string;
  estadoTipoTramite?: string;
}
@Component({
  selector: 'app-buscando-formularios',
  templateUrl: './buscando-formularios.component.html',
  styleUrls: ['./buscando-formularios.component.css'],
  providers: [PrevisualizandoFormularioService]
})
export class BuscandoFormulariosComponent implements OnInit {
  formularios: FormularioBusqueda[];
  todosLosFormularios: FormularioBusqueda[];
  busquedaRealizada = false;
  filaSeleccionada: FormularioBusqueda = null;
  tituloBotonEditarOVer: string;
 // permisos = PERMISOS;
  valorBuscado: string;
  usuarioPuedeEditar: boolean;
  resultadosParaGrilla: Grilla[];


  constructor(
    private formularioService: FormularioService,
    private previsualizandoFormularioService: PrevisualizandoFormularioService,
    private route: ActivatedRoute,
    private router: Router,
    //public errorHandler: ErroresHandler,
    private snackbar: MatSnackBar
    ) {

  }

  ngOnInit() {
    this.usuarioPuedeEditar = this.route.snapshot.data['usuarioPuedeEditar'];
    this.tituloBotonEditarOVer = this.usuarioPuedeEditar ? 'Editar' : 'Ver';
    this.todosLosFormularios = this.route.snapshot.data['formularios'];
    this.formularios = this.todosLosFormularios;
    this.crearItemsGrilla(this.formularios);
  }

  private crearItemsGrilla(items: FormularioBusqueda[]) {
    this.resultadosParaGrilla = items.map(item => {
      const formularios: Grilla = {
        id: item.id,
        nombre: item.nombre,
        nombreTipoTramite: item.nombreTipoTramite,
        estadoTipoTramite: item.estadoTipoTramite,
      };
      return formularios;
    });
  }

  filterItem(value: string): void { console.log(value)
    //this.feedbackPanel.limpiar();
    this.valorBuscado = value;
    if (!value) {
      this.formularios = this.todosLosFormularios;
    } else {
      this.formularios = Object.assign([], this.todosLosFormularios).filter(
        item =>
          item.nombre.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
          item.nombreTipoTramite.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
          item.estadoTipoTramite.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    }
    this.busquedaRealizada = true;
   /* if (this.grillaPaginable) {
      this.grillaPaginable.filterItem(this.formularios);
    }*/
  }

  mostrarResultados() {
    return !(this.busquedaRealizada && this.formularios.length === 0);
  }

  desactivarAcciones(): boolean {
    return this.filaSeleccionada === null;
  }

  actualizarFilaSeleccionada({nuevaFilaSeleccionada}: { nuevaFilaSeleccionada: any } ) {
    if (nuevaFilaSeleccionada === null) {
      this.filaSeleccionada = null;
    } else {
      this.filaSeleccionada = nuevaFilaSeleccionada as FormularioBusqueda;
    }
  }

  crearFormulario(): void {
    this.router.navigate([urlsFormulario.formularioCreacion]);
  }

  editarFormulario(): void {
    this.router.navigate([urlsFormulario.getFormularioEdicion(this.filaSeleccionada.id)]);
  }

  verFormulario(): void {
    this.router.navigate([urlsFormulario.getFormularioEdicion(this.filaSeleccionada.id)]);
  }

  previsualizarFormulario() {
    this.previsualizar(this.filaSeleccionada.id);
  }

  eliminarFormulario(): void {
   /* this.feedbackPanel.limpiar();
    this.modalEliminarFormulario.mostrar();*/
  }

  confirmarEliminarFormulario(): void {
     this.formularioService.eliminarFormulario(this.filaSeleccionada.id).pipe(
       //takeUntil(this.destroyed$)
     ).subscribe(formularios => {
       this.todosLosFormularios = formularios;
       this.filterItem(this.valorBuscado);
       //this.grillaPaginable.actualizarPaginables(this.formularios);
     });
  }

  exportarCsv(): void {
     const formulariosId: number[] = this.formularios.map(p => p.id);
/*     this.formularioService.exportarFormularios(formulariosId)
       .subscribe(response => generarYDescargarArchivoExportacion(response, 'Formularios'));*/
  }

  previsualizar(id: number) {
    this.formularioService.getFormulario(id).subscribe(
      formulario => {
        this.previsualizandoFormularioService.setFormulario({
          nombre: formulario.nombre,
          secciones: formulario.campos as any
        });
      }
    );
    if (!this.previsualizandoFormularioService.isVentanaAbierta()) {
      window.open('formularios/previsualizacion', '_blank');
    }
  }
  mostrarSnackbar(mensaje: string) {
    this.snackbar.open(mensaje, '', {
      duration: 3000,
      panelClass: 'snackbar-default'
    });
  }
  copiarPortapapeles() {
    let url = window.location.href;
    url = url.replace(this.router.url, '');
    navigator.clipboard.writeText(`${url}/${urlsFormulario.getFormularioEdicion(this.filaSeleccionada.id)}`).then(function () {
    });
    this.mostrarSnackbar('Copiado al portapapeles!');
  }
  exportar(): void {
    if (!!this.filaSeleccionada) {
      this.formularioService.getFormulario(this.filaSeleccionada.id).subscribe(formulario => {
        saveAs(new Blob([JSON.stringify(formulario)],
          { type: 'application/json' }),
          'Formulario_' + formulario.nombre);
      });
    }
  }
}
