import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormlyFieldConfig, FieldType } from '@ngx-formly/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
import { VisibilidadComponenteFormlyService} from "../../formularios/services/visibilidad-componente-formly.service";
import {ActivatedRoute} from "@angular/router";
//import { ConceptosVariablesCostoTramiteService } from 'src/app/tramites-frontend/conceptos.variables.costo.tramite.pago.service';
//import { TipoTramiteConceptosPagoVariable } from 'src/app/tramites-frontend/formularios/model/tipo-tramite-concepto-pago-variable';
//import { AssignableOnInit } from 'src/app/tramites-template/model/assignable-on-init';

@Component({
  selector: 'app-select-con-dependencia',
  templateUrl: './select-con-dependencia.component.html',
  styleUrls: ['./select-con-dependencia.component.css']
})
export class SelectConDependenciaComponent extends FieldType implements OnInit, OnDestroy {

  onDestroy$ = new Subject<void>();
  override field: FormlyFieldConfig;
  opcionesSelect: any[];
  opcionesFiltradas: any[] = [];
  valor: any;

  iniciandoEnSubsanacion: boolean;

  mostrarElementoSubscription: Subscription;
  mostrarElemento: boolean;

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
    this.field.templateOptions['hideLabel'] = true;
    this.subscribirMostrarElemento();
    this.iniciandoEnSubsanacion = this.field.templateOptions['subsanando'];
    this.assingSelf();
  }

  isReadOnly(){
    return this.readonly;
  }

  assingSelf(): void {
    if (!this.field['editableOperador'] && (this.nuevaInscripcion == null || !this.nuevaInscripcion)) {
      this.readonly = true;
    }
    this.valor = (this.field.model[this.field.key as string]) ? (this.field.model[this.field.key as string]) : null;
    this.model[this.field.key as string] = this.valor;
    this.formControl.setValue(this.valor);
    //this.handleConceptoPago(this.valor);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    if (this.mostrarElementoSubscription) {
      this.mostrarElementoSubscription.unsubscribe();
    }
  }

  onSelectChange(event) {
    const value = event ? event.descripcion : null;
    this.model[this.field.key as string] = value;
    this.formControl.setValue(value);
    this.visibilidadComponenteFormlyService.notifySubscribers();
    //this.handleConceptoPago(value);
  }

  calcularMostrarElemento() {
    const { condicionesOcultar } = this.field.templateOptions;
    let ocultarElemento: boolean;

    if(this.field.templateOptions && this.field.templateOptions['ocultarEnEdicion']) {
      return false;
    }

    if (condicionesOcultar && condicionesOcultar.length > 0) {
      const valorCondicionesOcultar = condicionesOcultar.map(c => c.valor);
      const valorEntidadAsociada = this.form.get(condicionesOcultar[0].entidad) ? this.form.get(condicionesOcultar[0].entidad).value : null;
      if (valorEntidadAsociada) {
        if (Array.isArray(valorEntidadAsociada)) {
          ocultarElemento = !valorCondicionesOcultar.some(vco => valorEntidadAsociada.includes(vco));
        } else {
          ocultarElemento = !valorCondicionesOcultar.some(vco => vco === valorEntidadAsociada);
        }
      } else {
        if (this.form.get(this.field.key as string)) {
          this.form.get(this.field.key as string).markAsUntouched();
        }
        this.iniciandoEnSubsanacion = false;
        this.field.templateOptions['esVisible'] = false;
        this.limpiarValor();
        return false;
      }
      if (ocultarElemento != null) {
        // tslint:disable-next-line:no-eval
        if (ocultarElemento) {
          if (this.form.get(this.field.key as string)) {
            this.form.get(this.field.key as string).markAsUntouched();
          }
          this.field.templateOptions['esVisible'] = false;
          this.limpiarValor();
          if (!this.iniciandoEnSubsanacion) {
            // @ts-ignore
            this.form.removeControl(this.field.key as string);
          }
        } else {
          if (!this.form.get(this.field.key as string)) {
            // @ts-ignore
            this.form.addControl(this.field.key as string, <FormControl>this.field.formControl);
          }
        }
        if (ocultarElemento) {
          this.field.formControl.disable();
        } else {
          if (this.field.templateOptions && !this.field.templateOptions['claveEntidadDependencia']) {
            // Si el select depende de valores de otros, se habilita o deshabilita en el evento change configurado en el oninit.
            this.field.formControl.enable();
          }
        }

        this.field.templateOptions['esVisible'] = !ocultarElemento;
        return !ocultarElemento;
      }
    }
    if (!this.form.get(this.field.key as string)) {
      // @ts-ignore
      this.form.addControl(this.field.key as string, <FormControl>this.field.formControl);
    }

    this.field.templateOptions['esVisible'] = true;
    this.field.formControl.enable();
    return this.field.templateOptions['esVisible'];
  }

  subscribirMostrarElemento() {
    this.mostrarElementoSubscription = this.visibilidadComponenteFormlyService.crearSubscripcion().subscribe(() => {
      this.mostrarElemento = this.calcularMostrarElemento();
      if (this.mostrarElemento) {
        this.inicializarComponenteConDependencia();
      }
    });
    this.visibilidadComponenteFormlyService.notifySubscribers();
  }

  inicializarComponenteConDependencia() {
    const { options, claveEntidadDependencia } = <any>this.field.templateOptions;
    this.opcionesSelect = options;

    if (this.form.get(claveEntidadDependencia)) {
      this.form.get(claveEntidadDependencia).valueChanges.pipe(
        takeUntil(this.onDestroy$),
        startWith(this.form.get(claveEntidadDependencia).value),
        tap(valorEntidadDependencia => {
          if (valorEntidadDependencia) {
            let opcionesFiltradas = this.opcionesSelect.filter(op => {
              if (Array.isArray(valorEntidadDependencia)) {
                return valorEntidadDependencia.indexOf(op.valorEntidadDependencia) !== -1;
              }
              return valorEntidadDependencia === op.valorEntidadDependencia;
            });
            // eliminamos duplicados
            opcionesFiltradas = opcionesFiltradas.map(e => e.descripcion)
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter(e => opcionesFiltradas[e])
              .map(e => opcionesFiltradas[e])
              .sort((a, b) => (a.descripcion < b.descripcion) ? -1 : 1);
            this.field.formControl.enable();
            if (this.valor && !opcionesFiltradas.some(opf => opf.descripcion === this.valor)) {
              // Si cambia el valor de quien depende se inicializa el select.
              this.valor = null;
              this.formControl.setValue(this.valor);
              this.formControl.markAsUntouched();
              this.limpiarValor();
            }
            this.opcionesFiltradas = opcionesFiltradas;
          } else {
            this.limpiarValor();
            this.opcionesFiltradas = [];
          }
        })
      ).subscribe();
    } else {
      if (this.field.templateOptions['subsanacion'] && claveEntidadDependencia) {
        const valorEntidadDependencia = this.model[claveEntidadDependencia];
        this.opcionesFiltradas = this.opcionesSelect.filter(op => op.valorEntidadDependencia === valorEntidadDependencia);
        this.field.formControl.enable();
      }
    }
  }

  private handleConceptoPago(opcionSeleccionada: string): void {
    if (this.field.templateOptions['conceptos'] && this.field.templateOptions['conceptos'].tieneConceptosPagoAsociados) {
      this.opcionesFiltradas.forEach(opt => {
       // const itemConceptoPago: TipoTramiteConceptosPagoVariable = this.field.templateOptions.conceptos.itemsConceptosPago.find((c) => c.valorDelComponente === opt.descripcion && c.conceptoPago !== null);
       // if (!itemConceptoPago) { return; }
       // itemConceptoPago.keyComponenteAsociado = this.field.key as string;
        if (opt.descripcion === opcionSeleccionada) {
       //   this.conceptosVariablesCostoTramiteService.agregarConceptoVariable(itemConceptoPago);
        } else {
        //  this.conceptosVariablesCostoTramiteService.eliminarConceptoVariable(itemConceptoPago);
        }
      });
    }
  }

  private limpiarValor() {
    this.field.formControl.setValue(null);
    this.field.formControl.disable();
    //this.handleConceptoPago(null);
  }
}
