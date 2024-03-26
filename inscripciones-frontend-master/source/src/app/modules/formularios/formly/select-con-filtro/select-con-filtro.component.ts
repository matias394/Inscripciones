import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import { VisibilidadComponenteFormlyService} from "../../formularios/services/visibilidad-componente-formly.service";
import {ActivatedRoute} from "@angular/router";
//import { ConceptosVariablesCostoTramiteService } from 'src/app/tramites-frontend/conceptos.variables.costo.tramite.pago.service';
//import { TipoTramiteConceptosPagoVariable } from 'src/app/tramites-frontend/formularios/model/tipo-tramite-concepto-pago-variable';
//import { AssignableOnInit } from 'src/app/tramites-template/model/assignable-on-init';

@Component({
  selector: 'app-select-con-filtro',
  templateUrl: './select-con-filtro.component.html',
  styleUrls: ['./select-con-filtro.component.css']
})
export class SelectConFiltroComponent extends FieldType implements OnInit, OnDestroy {

  override field: FormlyFieldConfig;
  opciones: any[];
  opcionSeleccionada: any;

  onDestroy$ = new Subject<void>();
  opcionesFiltradas: {
    descripcion: string;
  }[] = [];
  iniciandoEnSubsanacion: boolean;
  descripciones:any;
  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;
  nuevaInscripcion:any;

  readonly:boolean = false;

  constructor(
    private visibilidadComponenteFormlyService: VisibilidadComponenteFormlyService,
    //private conceptosVariablesCostoTramiteService: ConceptosVariablesCostoTramiteService,
  ) {
    super();
  }

  ngOnInit() {
    this.nuevaInscripcion = JSON.parse(sessionStorage.getItem('inscribir'));
    this.field.templateOptions['hideLabel'] = true;
    // Provisorio para evitar que los estilos de material oculten elementos de la lista de opciones del ng-select
    this.subscribirMostrarElemento();
    const element = <any>document.querySelectorAll('.mat-horizontal-content-container');
    if (element[0]) {
      element[0].style.overflow = 'visible';
    }
    this.opcionesFiltradas = <any[]>this.field.templateOptions['opciones'];
    this.iniciandoEnSubsanacion = this.field.templateOptions['subsanando'];
    this.assingSelf();
    this.descripciones = this.to['descripcion'];
  }

  isReadOnly(){
    return this.readonly;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

  assingSelf(): void {
    if (!this.field['editableOperador'] && (this.nuevaInscripcion == null || !this.nuevaInscripcion)) {
      this.readonly = true;
    }
    if (this.field.model[this.field.key as string]) {
      this.opcionSeleccionada = this.field.model[this.field.key as string];
    } else if (this.field.templateOptions['defaultValue']) {
      this.opcionSeleccionada = this.field.templateOptions['defaultValue'];
    } else {
      this.opcionSeleccionada = null;
    }
    this.model[this.field.key as string] = this.opcionSeleccionada;
    this.formControl.setValue(this.opcionSeleccionada);
    //this.handleConceptoPago(this.opcionSeleccionada);
  }

  onSelectChange(event) {
    const value = event ? event.descripcion : null;
    this.model[this.field.key as string] = value;
    this.formControl.setValue(value);
    this.visibilidadComponenteFormlyService.notifySubscribers();
    //this.handleConceptoPago(value);
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.visibilidadComponenteFormlyService.mostrarElemento(this);
      if (this.mostrarElemento) {
        this.inicializarComponenteConDependencia();
      } else {
        this.limpiarValor();
      }
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  inicializarComponenteConDependencia() {
    const { options, claveEntidadDependencia } = <any>this.field.templateOptions;
    this.opciones = options;

    if (this.form.get(claveEntidadDependencia)) {
      this.form.get(claveEntidadDependencia).valueChanges.pipe(
        takeUntil(this.onDestroy$),
        startWith(this.form.get(claveEntidadDependencia).value),
        tap(valorEntidadDependencia => {
          if (valorEntidadDependencia) {
            const opcionesFiltradas = this.opciones.filter(op => {
              if (Array.isArray(valorEntidadDependencia)) {
                return valorEntidadDependencia.indexOf(op.valorEntidadDependencia) !== -1;
              }
              return valorEntidadDependencia === op.valorEntidadDependencia;
            });

            // eliminamos duplicados
            this.opcionesFiltradas = opcionesFiltradas.map(e => e.descripcion)
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter(e => opcionesFiltradas[e])
              .map(e => opcionesFiltradas[e])
              .sort((a, b) => (a.descripcion < b.descripcion) ? -1 : 1);
            this.field.formControl.enable();
            if (this.opcionSeleccionada && !this.opcionesFiltradas.some(opf => opf.descripcion === this.opcionSeleccionada)) {
              // Si cambia el valor de quien depende se inicializa el select.
              this.opcionSeleccionada = null;
              this.formControl.setValue(this.opcionSeleccionada);
              this.formControl.markAsUntouched();
            }
          } else {
            this.opcionesFiltradas = [];
            this.field.formControl.disable();
          }
        })
      ).subscribe();
    }
  }

  private handleConceptoPago(opcionSeleccionada: string): void {
    if (this.field.templateOptions['conceptos'] && this.field.templateOptions['conceptos'].tieneConceptosPagoAsociados) {
      this.opcionesFiltradas.forEach(opt => {
        //const itemConceptoPago: TipoTramiteConceptosPagoVariable = this.field.templateOptions.conceptos.itemsConceptosPago.find((c) => c.valorDelComponente === opt.descripcion && c.conceptoPago !== null);
        //if (!itemConceptoPago) { return; }
        //itemConceptoPago.keyComponenteAsociado = this.field.key as string;
        if (opt.descripcion === opcionSeleccionada) {
         // this.conceptosVariablesCostoTramiteService.agregarConceptoVariable(itemConceptoPago);
        } else {
          //this.conceptosVariablesCostoTramiteService.eliminarConceptoVariable(itemConceptoPago);
        }
      });
    }
  }

  private limpiarValor() {
    this.field.templateOptions['esVisible'] = false;
    this.field.formControl.setValue(null);
    this.field.formControl.disable();
    //this.handleConceptoPago(null);
  }
}
