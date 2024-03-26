import { ModeloCampoFormulario } from '../../formularios/modelos/modelo-campo-formulario';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldType, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

//import { GrillaPaginableComponent } from '../../../../shared/componentes/grilla-paginable/grilla-paginable.component';
//import { ModalFormularioComponent } from '../modal-formulario/modal-formulario.component';
//import { ClickEnTablaGrupoIterativoDirective } from 'src/app/tramites-template/directivas/click-en-tabla-grupo-iterativo.directive';
//import { ItemGrillaGrupoIterativo } from 'src/app/tramites-template/model/item-grilla-grupo-iterativo';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { VisibilidadComponenteFormlyService } from '../../formularios/services/visibilidad-componente-formly.service';

declare var $: any;

interface ColumnaGrillaPaginable {
  title: string;
  name: string;
  sort: boolean;
}

@Component({
  selector: 'app-grupo-iterativo',
  templateUrl: './grupo-iterativo.component.html',
  styleUrls: ['./grupo-iterativo.component.css']
})
export class GrupoIterativoComponent extends FieldType implements OnInit, OnDestroy {

 // @ViewChild(GrillaPaginableComponent) grillaPaginable: GrillaPaginableComponent;
 // @ViewChild('modalFormularioComponent') modalFormularioComponent: ModalFormularioComponent;
  @ViewChild('boton') boton: ElementRef;
  @ViewChild('template') template: ElementRef;
/*  @ViewChild(ClickEnTablaGrupoIterativoDirective) set clickEnTablaHandler(handler: ClickEnTablaGrupoIterativoDirective)
  {

    setTimeout(() => {
      // handlers para los clicks en los botones de la grilla
      if (handler) {
        handler.editarFila$.pipe(
          takeUntil(handler.destroyed$)
        ).subscribe(
          index => this.editarItem(index)
        );
        handler.eliminarFila$.pipe(
          takeUntil(handler.destroyed$)
        ).subscribe(
          index => this.eliminarItem(index)
        );
      }
    });
  }*/

  itemsDeLaGrilla = [];

  columasDeLaGrilla: ColumnaGrillaPaginable[] = [];
  //items: ItemGrillaGrupoIterativo[] = [];
  itemsPorPagina = 5;
  indexEdicion = -1;

  formModal = new FormGroup({});
  modelModal: any = {};
  fieldsModal: FormlyFieldConfig[] = [];
  optionsModal: FormlyFormOptions = {};

  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  habilidatoAgregar: boolean;
  cantPages: number[] = [5];

  constructor(private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService) {
    super();
  }

  ngOnInit() {
    this.field.templateOptions['hideLabel'] = true;
    this.setearValidadoresHTML();
    this.subscribirMostrarElemento();
    this.habilidatoAgregar = true;
    this.fieldsModal = this.field.templateOptions['camposFormulario'];
    //this.items = [];
    this.setearVisibilidadAgregarItems();
    this.generarColumnas();
    this.assingSelf();
  }

  assingSelf(): void {
    const camposFormulario: FormlyFieldConfig[] = this.fieldsModal;
    if (this.field.model[this.field.key as string]) {
 /*     this.items = (this.field.model[this.field.key as string] as Array<any>).map(
        (fila, indice) => new ItemGrillaGrupoIterativo(fila, camposFormulario, indice)
      );*/
      this.actualizarGrillaYModelo();
    } else {
      this.formControl.setValue([]);
    }
  }

  setearValidadoresHTML() {
    this.field.templateOptions['camposFormulario'].forEach(campo => {
      if (campo.templateOptions.seMuestraEnGrilla && (campo.type === 'input-simple' ||
        campo.type === 'textbox-simple')) {
        if (campo.validators && campo.validators.validation) {
          campo.validators.validation.push('input-html-novalido')
        } else {
          campo.validators = { validation: ['input-html-novalido']};
        }

      }
    });
  }

  setearVisibilidadAgregarItems() {
    if (this.field.templateOptions['grupoEditable'] === false) {
      this.habilidatoAgregar = false;
    }
  }

  hayResultados() {
    //return this.items && this.items.length > 0;
    return false;
  }

  agregarItem() {
    //this.modalFormularioComponent.mostrar();
  }

  editarItem(index: number) {
    this.indexEdicion = index;

    //this.modalFormularioComponent.setItem(this.items[this.indexEdicion]);
    //this.modalFormularioComponent.mostrar();
  }

  eliminarItem(index: number) {
    this.indexEdicion = index;

    /*this.items.splice(this.indexEdicion, 1);
    for (let i = this.indexEdicion; i < this.items.length; i++) {
      this.items[i].rearmarBotones(i);
    }*/

    this.actualizarGrillaYModelo();
  }

  setNuevoItem(datos: any): void {
/*    const indexNuevoItem = this.items.length;
    const nuevoItem = new ItemGrillaGrupoIterativo(datos, this.fieldsModal, indexNuevoItem);
    if (nuevoItem.tieneDatos()) {
      this.items.push(nuevoItem);
      this.actualizarGrillaYModelo();
    }*/
  }

  setItemExistente(datos: any): void {
    const index: number = this.indexEdicion;

    //this.items[index] = new ItemGrillaGrupoIterativo(datos, this.fieldsModal, index);

    this.actualizarGrillaYModelo();
  }

  private generarColumnas() {
    const camposFormulario: FormlyFieldConfig[] = this.fieldsModal;
    const columnas: ColumnaGrillaPaginable[] = [];
    if (camposFormulario && camposFormulario.length) {
      for (const campo of camposFormulario) {
        if (campo.templateOptions) {
          const { label, seMuestraEnGrilla } = campo.templateOptions;
          if (label && seMuestraEnGrilla && columnas.length < 3) {
            const clave = (campo['tipo'] === 'telefono') ? ModeloCampoFormulario.getFormlyKey(campo.name) : campo.key;
            columnas.push({ title: label, name: clave as string, sort: false });
          }
        }
      }
    }

    columnas.push({ title: '', name: 'htmlAcciones', sort: false });
    this.columasDeLaGrilla = columnas;
  }

  private obtenerOffsetIndiceActualEnPaginacion() {
/*    const paginaActual: number = this.grillaPaginable && this.grillaPaginable.page;
    return (this.itemsPorPagina * (paginaActual - 1));*/
  }

  private actualizarGrillaYModelo() {
/*    this.formControl.setValue(this.items.map(item => item.valor));
    if (this.grillaPaginable) {
      this.grillaPaginable.actualizarPaginables(this.items.map(item => item.valorParaGrilla));
    } else {
      this.itemsDeLaGrilla = this.items.map(item => item.valorParaGrilla);
    }*/
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
      if (!this.mostrarElemento) {
       // this.items = [];
      }
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  ngOnDestroy () {
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }
}
