import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';

import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VisibilidadComponenteFormlyService} from "../../formularios/services/visibilidad-componente-formly.service";
import {ActivatedRoute} from "@angular/router";
//import { ConceptosVariablesCostoTramiteService } from 'src/app/tramites-frontend/conceptos.variables.costo.tramite.pago.service';
//import { TipoTramiteConceptosPagoVariable } from 'src/app/tramites-frontend/formularios/model/tipo-tramite-concepto-pago-variable';
//import { AssignableOnInit } from 'src/app/tramites-template/model/assignable-on-init';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent extends FieldType implements OnInit, OnDestroy {

  override field: FormlyFieldConfig;
  opciones: any[] = [];
  valor: any;
  iniciandoEnSubsanacion: boolean;
  descripciones: any;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  readonly: boolean = false;
  nuevaInscripcion:any

  constructor(
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService,
    //private conceptosVariablesCostoTramiteService: ConceptosVariablesCostoTramiteService,
  ) {
    super();
  }
  ngOnInit() {
    this.nuevaInscripcion = JSON.parse(sessionStorage.getItem('inscribir'));
    this.field.templateOptions['hideLabel'] = true;
    this.subscribirMostrarElemento();
    this.opciones = <any[]>this.field.templateOptions['opciones'];
    this.iniciandoEnSubsanacion = this.field.templateOptions['subsanando'];
    this.assingSelf();
    this.descripciones = this.to['descripcion'];
  }

  isReadOnly(){
    return this.readonly;
  }

  assingSelf(): void {
    if (!this.field['editableOperador'] && (this.nuevaInscripcion == null || !this.nuevaInscripcion)) {
      this.readonly = true;
    }
    if (this.field.model[this.field.key as string]) {
      this.valor = this.field.model[this.field.key as string];
    } else if (this.field.templateOptions['defaultValue']) {
      this.valor = this.field.templateOptions['defaultValue'];
    } else {
      this.valor = null;
    }
    this.formControl.setValue(this.valor);
    this.model[this.field.key as string] = this.valor;
    //this.handleConceptoPago(this.valor);
  }

  onSelectChange(event) {
    const value = Boolean(event) ? event.descripcion : null;
    this.model[this.field.key as string] = value;
    this.formControl.setValue(value);
    this.visibilidadComponenteFormlyService.notifySubscribers();
    //this.handleConceptoPago(value);
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
    this.field.templateOptions['esVisible'] = false;
    this.field.formControl.setValue(null);
    this.field.formControl.disable();
    //this.handleConceptoPago(null);
  }

  private handleConceptoPago(opcionSeleccionada: string): void {
    if (this.field.templateOptions['conceptos'] && this.field.templateOptions['conceptos'].tieneConceptosPagoAsociados) {
      this.opciones.forEach(opt => {
        //const itemConceptoPago: TipoTramiteConceptosPagoVariable = this.field.templateOptions.conceptos.itemsConceptosPago.find((c) => c.valorDelComponente === opt.descripcion && c.conceptoPago !== null);
        //if (!itemConceptoPago) { return; }
        //itemConceptoPago.keyComponenteAsociado = this.field.key as string;
        if (opt.descripcion === opcionSeleccionada) {
          //this.conceptosVariablesCostoTramiteService.agregarConceptoVariable(itemConceptoPago);
        } else {
          //this.conceptosVariablesCostoTramiteService.eliminarConceptoVariable(itemConceptoPago);
        }
      });
    }
  }

}
