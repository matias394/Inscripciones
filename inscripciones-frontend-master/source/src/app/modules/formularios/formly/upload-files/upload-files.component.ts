import {Component, OnInit, OnDestroy, AfterContentChecked, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldType, FormlyFormOptions } from '@ngx-formly/core';
import { ModeloArchivo } from './modelo-archivo';
import { ActivatedRoute } from '@angular/router';
//import { ArchivoCiudadano } from '../../../../shared/modelo/archivo-ciudadano';
import { VisibilidadComponenteFormlyService } from '../../formularios/services/visibilidad-componente-formly.service';
import { Subscription } from 'rxjs';
//import * as $ from 'jquery';
//import { AssignableOnInit } from 'src/app/tramites-template/model/assignable-on-init';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent extends FieldType implements OnInit,
  AfterContentChecked, OnDestroy {
  //files: ArchivoCiudadano[];

  selected: string;
  selectedFile: ModeloArchivo;
  etiqueta: string;

  acceptTypes: string[];
  tamanioMaximoArchivoEnMB: number;
  errorMsgs: {
    [key: string]: string;
  };

  isErrorFilePresent: boolean;
  errorFileMsg: string;
  descripciones:any;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  archivoNuevo: any
  nuevaInscripcion:any;
  constructor(

    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService,
  ) {
    super();
  }

  ngOnInit() {
    this.nuevaInscripcion = JSON.parse(sessionStorage.getItem('inscribir'));
    this.field.templateOptions['hideLabel'] = true;
    this.archivoNuevo = this.field.templateOptions['archivoNuevo']
    this.subscribirMostrarElemento();
    this.acceptTypes = this.field.templateOptions['extensiones'];
    this.tamanioMaximoArchivoEnMB = this.field.templateOptions['tamañoMaximoEnMB'] ? this.field.templateOptions['tamañoMaximoEnMB'] : 10;
    this.errorMsgs = {
      invalidType: this.field.templateOptions['mensajeError'],
      size: `Tamaño máximo permitido: ${this.tamanioMaximoArchivoEnMB}MB`,
    };

 /*   if (this.route.snapshot.data['archivosCiudadano']) {
      this.files = this.route.snapshot.data['archivosCiudadano'];
    }*/
    this.etiqueta = (this.to['subsanacion'] && this.field.name ? this.field.name : this.to.label) + (this.to.required ? ' *' : '');
    this.assingSelf();
    this.descripciones = this.to['descripcion'];
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.nombre === c2.nombre : c1 === c2;
  }

  assingSelf(): void {
    const model = this.field.model[this.field.key as string];
    this.selectedFile = model ? (model.nombre ? model : null) : null;
    if (this.selectedFile) {
      this.selected = this.selectedFile.content ? 'upload' : 'fromserver';
      this.selectedFile.acceptTypes = this.acceptTypes;
    }
    this.formControl.setValue(this.selectedFile);
  }

  onUploadFile(file: ModeloArchivo) {
    this.selectedFile.acceptTypes = this.acceptTypes;
    this.formControl.setValue(this.selectedFile);
  }

  changeSelected(event): void {
    this.selectedFile = null;
    this.model[this.field.key as string] = null;
    if (event === 'upload') {
      this.field.formControl.reset();
      this.field.formControl.updateValueAndValidity();
    }
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  ngOnDestroy () {
    if(this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }

  }

  ngAfterContentChecked() {
    if (!this.field['editableOperador'] && (this.nuevaInscripcion == null || !this.nuevaInscripcion)) {
      const uploadElement = document.getElementById('upload' + this.field.key) as HTMLInputElement;
      const fromserverElement = document.getElementById('fromserver' + this.field.key) as HTMLInputElement;
      const selectElement = document.getElementById('select' + this.field.key) as HTMLSelectElement;

      if (uploadElement) {
        uploadElement.disabled = true;
      }

      if (fromserverElement) {
        fromserverElement.disabled = true;
      }

      if (selectElement) {
        selectElement.disabled = true;
      }

      /*$("#upload" + this.field.key).attr("disabled", "disabled");
      $("#fromserver" + this.field.key).attr("disabled", "disabled");
      $("#select" + this.field.key).attr("disabled", "disabled");*/
    }

  }

  validarArchivo() {
    if (!this.extensionValida(this.selectedFile.nombre)) {
      this.selectedFile = null;
      this.errorFileMsg = this.errorMsgs['invalidType'];
      this.isErrorFilePresent = true;
    } else {
      this.isErrorFilePresent = false;
    }
  }

  private extensionValida(nombreArchivo: string): boolean {
    let valido = false;
    if (!this.acceptTypes) { return true; }
    this.acceptTypes.forEach(extension => {
      if (nombreArchivo.toLowerCase().includes(extension.toLowerCase())) {
        valido = true;
      }
    });
    return valido;
  }

}
