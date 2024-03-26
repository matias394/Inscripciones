import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { VisibilidadComponenteFormlyService} from "../../formularios/services/visibilidad-componente-formly.service";
import { Subscription } from 'rxjs';
//import { ConceptosVariablesCostoTramiteService } from 'src/app/tramites-frontend/conceptos.variables.costo.tramite.pago.service';
//import { TipoTramiteConceptosPagoVariable } from 'src/app/tramites-frontend/formularios/model/tipo-tramite-concepto-pago-variable';
import * as $ from 'jquery';
//import { AssignableOnInit } from 'src/app/tramites-template/model/assignable-on-init';

@Component({
  selector: 'app-selector-excluyente',
  templateUrl: './selector-excluyente.component.html',
  styleUrls: ['./selector-excluyente.component.css']
})
export class SelectorExcluyenteComponent extends FieldType implements OnInit,
 OnDestroy, AfterContentChecked {
  opcionSeleccionada: string;
  iniciandoEnSubsanacion: boolean;
  descripciones: any;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  opciones: any;

  constructor(
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService,
    //private conceptosVariablesCostoTramiteService: ConceptosVariablesCostoTramiteService
  ) {
    super();
  }

  ngOnInit() {
    this.opciones = this.field.templateOptions['opciones']
    this.field.templateOptions['hideLabel'] = true;
    this.subscribirMostrarElemento();
    this.assingSelf();
    this.descripciones = this.to['descripcion'];

  }

  assingSelf(): void {
    this.opcionSeleccionada = null;
    if (this.field.model[this.field.key as string]) {
      this.opcionSeleccionada = this.field.model[this.field.key as string];
    } else if (this.field.templateOptions['defaultValue']) {
      this.opcionSeleccionada = this.field.templateOptions['defaultValue'];
    }
    this.formControl.setValue(this.opcionSeleccionada);
    //this.handleConceptoPago({ label: this.opcionSeleccionada, value: this.opcionSeleccionada });

  }

  ngAfterContentChecked() {
    if (this.field.templateOptions['noEditableEnGrupo'] && this.field.templateOptions['enEdicion']) {
      $('input[name ="' + this.field.name + '"]').attr("disabled", "disabled");
    }

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

  cambiarOpcion(opcion: {
    label: string;
    value: string;
  }) {
    //this.handleConceptoPago(opcion);
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  private handleConceptoPago(opcion: {
    label: string;
    value: string;
  }): void {
    if (this.field.templateOptions['conceptos'] && this.field.templateOptions['conceptos'].tieneConceptosPagoAsociados) {
      (this.opciones as { label: string; value: string; }[]).forEach(opt => {
       // const itemConceptoPago: TipoTramiteConceptosPagoVariable = this.field.templateOptions.conceptos.itemsConceptosPago.find((c) => c.valorDelComponente === opt.label && c.conceptoPago !== null);
       // if (!itemConceptoPago) { return; }
        //itemConceptoPago.keyComponenteAsociado = this.field.key as string;
        if (opt.label === opcion.label) {
        //  this.conceptosVariablesCostoTramiteService.agregarConceptoVariable(itemConceptoPago);
        } else {
        //  this.conceptosVariablesCostoTramiteService.eliminarConceptoVariable(itemConceptoPago);
        }
      });
    }
  }

  private limpiarValor() {
    this.field.templateOptions['esVisible'] = false;
    //this.handleConceptoPago({ label: this.opcionSeleccionada, value: this.opcionSeleccionada });
    this.field.formControl.setValue(null);
  }
}
