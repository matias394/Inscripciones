import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { FieldType } from '@ngx-formly/core';
import {VisibilidadComponenteFormlyService} from "../../formularios/services/visibilidad-componente-formly.service";
import { Subscription } from 'rxjs';
import {ActivatedRoute} from "@angular/router";
//import { TipoTramiteConceptosPagoVariable } from 'src/app/tramites-frontend/formularios/model/tipo-tramite-concepto-pago-variable';
//import { ConceptosVariablesCostoTramiteService } from 'src/app/tramites-frontend/conceptos.variables.costo.tramite.pago.service';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent extends FieldType implements OnInit, OnDestroy {
  valores: any = {};
  valorPersistir: string[] = [];
  iniciandoEnSubsanacion: boolean;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  opciones:any;
  readonly: boolean = false;
  nuevaInscripcion:any;

  constructor(
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService,
    //private conceptosVariablesCostoTramiteService: ConceptosVariablesCostoTramiteService
  ) {
    super();
  }

  ngOnInit() {
    this.nuevaInscripcion = JSON.parse(sessionStorage.getItem('inscribir'));
    // @ts-ignore
    this.opciones = this.field.templateOptions['opciones'];
    this.field.templateOptions['hideLabel'] = true;
    this.subscribirMostrarElemento();
    this.assingSelf();
  }

  assingSelf(): void {
    // @ts-ignore
    if (!this.field['editableOperador'] && (this.nuevaInscripcion == null || !this.nuevaInscripcion)) {
      this.readonly = true;
    }
    //@ts-ignore
    const opciones = this.field.templateOptions.opciones;
    if (this.field.model[this.field.key as string]) {
      this.field.model[this.field.key as string].forEach(element => {
        const filtered = opciones.filter(val => val.descripcion === element);
        if (filtered.length) {
          const opcion = filtered[0].nombre;
          const descripcion = filtered[0].descripcion;
          this.clickCheckbox(opcion, descripcion);
        }
      });
    } else {
      this.valores = {};
      for (const opcion of opciones) {
        const nombreOpcion = opcion.nombre;
        this.valores[nombreOpcion] = opcion.valorPorDefecto;
        //this.handleConceptoPago(opcion.descripcion, opcion.valorPorDefecto);
      }
    }
    this.setValorPersistir();
  }

  isReadOnly() {
    return this.readonly;
  }

  clickCheckbox(nombreOpcion: string, descripcionOpcion: string): void {
    const estadoOpcion = !this.valores[nombreOpcion];
    //this.handleConceptoPago(descripcionOpcion, estadoOpcion);
    this.valores[nombreOpcion] = estadoOpcion;
    this.setValorPersistir();
    // Notifica a los componentes subscriptores que uno de los componentes de los
    // que se puede depender se ha actualizado y deben recalcular su condicion de mostrar
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  private handleConceptoPago(nombreOpcion: string, estadoOpcion: boolean): void {
    // @ts-ignore
    if (this.field.templateOptions.conceptos && this.field.templateOptions.conceptos.tieneConceptosPagoAsociados) {
      //const itemConceptoPago: TipoTramiteConceptosPagoVariable = this.field.templateOptions.conceptos.itemsConceptosPago.find((c) => c.valorDelComponente === nombreOpcion && c.conceptoPago !== null);
      //if (!itemConceptoPago) { return; }
      //itemConceptoPago.keyComponenteAsociado = this.field.key as string;
      //(estadoOpcion)
      //  ? this.conceptosVariablesCostoTramiteService.agregarConceptoVariable(itemConceptoPago)
       // : this.conceptosVariablesCostoTramiteService.eliminarConceptoVariable(itemConceptoPago);
    }
  }

  chequeado(nombreOpcion: string) {
    return this.valores[nombreOpcion];
  }

  setValorPersistir() {
    //@ts-ignore
    const opciones = this.field.templateOptions['opciones'];
    this.valorPersistir = [];
    // @ts-ignore
    for (const opcion of opciones) {
      if (this.valores[opcion.nombre] === true) {
        this.valorPersistir.push(opcion.descripcion);
      }
    }
    this.formControl.setValue(this.valorPersistir);
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
      if(!this.mostrarElemento){
        this.limpiarValor();
      }
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  ngOnDestroy() {
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

  private limpiarValor() {
    // @ts-ignore
    this.field.templateOptions.esVisible = false;
    this.field.formControl.setValue([]);
    // @ts-ignore
    this.field.templateOptions.opciones.map(o => {
      this.valores[o.nombre] = null;
      //this.handleConceptoPago(o.nombre, false);
    });
  }
}
