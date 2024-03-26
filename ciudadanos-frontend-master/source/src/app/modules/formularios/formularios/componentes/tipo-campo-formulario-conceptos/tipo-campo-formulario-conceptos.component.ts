import { debounceTime, takeUntil } from 'rxjs/operators';
import { ItemConceptoPago } from './../../modelos/item-concepto-pago';
import { FormBuilder, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, Optional } from '@angular/core';
import { ConceptosPagoCampoFormulario } from '../../modelos/modelo-campo-formulario';
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
import { ModalTipoCampoFormularioComponent } from '../modal-tipo-campo-formulario/modal-tipo-campo-formulario.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


const validadorItemConceptoPago = (control: FormControl): ValidationErrors => {
  if (!control.value) {
    return null;
  }
  if (!control.value.conceptoPago && !control.value.cantidad) {
    return null;
  }
  if (control.value.conceptoPago && (control.value.cantidad || control.value.cantidad === 0)) {
    return null;
  }
  return {
    conceptoPagoInvalido: true
  };
};

@Component({
  selector: 'app-tipo-campo-formulario-conceptos',
  templateUrl: './tipo-campo-formulario-conceptos.component.html',
  styleUrls: ['./tipo-campo-formulario-conceptos.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TipoCampoFormularioConceptosComponent,
      multi: true
    }
  ]
})
export class TipoCampoFormularioConceptosComponent implements OnInit, ControlValueAccessor {

  itemsDisponibles: ItemConceptoPago[] = [];

  form = this.fb.group({
    tieneConceptosPagoAsociados: [],
    itemsConceptosPago: this.fb.array([])
  });

  //conceptosPago: ConceptoDePago[];
  configuracionItemsValida = true;
  perteneceAGrupoIterativo: boolean;
  esCampoSubsanable: boolean;
  esEditableOperador: boolean;

  onChange: (val: ConceptosPagoCampoFormulario) => {};
  onTouched: () => {};

  //maxSize = CONSTANTES.PAGINADOR_MAX_SIZE;
  page: number;
  //itemsPerPage = CONSTANTES.CANTIDAD_FILAS_GRILLA_DEFAULT;
  mostrarPaginacion = false;
  cantidadTotalResultados: number;

  constructor(
    private fb: FormBuilder,
    protected comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService,
    @Optional() private modalTipoCampoFormularioComponent: ModalTipoCampoFormularioComponent,
  ) {

  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => this.configuracionItemsValida = true);
    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      () => {
        if (this.onChange) {
          this.onChange(this.obtenerValorFormulario());
        }
      }
    );
    //this.conceptosPago = this.comunicacionBarraSeccionesService.conceptosPagoVariablesDelTramite || [];

    this.perteneceAGrupoIterativo = this.comunicacionBarraSeccionesService.grupoIterativoActual !== null;
    this.verificarHabilitacionConceptosPago();
  }

  isEnabled(controlName: string) {
    return this.form.get(controlName).enabled;
  }

  componenteTieneConceptosPagoAsociados() {
    return this.form.get('tieneConceptosPagoAsociados').value;
  }

  actualizarOpcionesDisponibles(opciones: string[]) {
    if (!opciones || !opciones.length || this.perteneceAGrupoIterativo) {
      return;
    }

    const itemsActuales: ItemConceptoPago[] = this.itemsDisponibles ? [].concat(this.itemsDisponibles) : [];
    //const conceptosPagoDisponibles = this.conceptosPago;
    this.itemsDisponibles = opciones.map(opcion => {
      const filtro = itemsActuales.find(item => item && item.valorDelComponente === opcion);
      if (filtro) {
        //if (filtro.conceptoPago != null && !conceptosPagoDisponibles.find(c => c.codigo === filtro.conceptoPago as string)) {
      //    filtro.conceptoPago = null;
       // }
        return filtro;
      }
      return {
        valorDelComponente: opcion,
        conceptoPago: null,
        cantidad: null
      };
    });

    this.cantidadTotalResultados = opciones.length;
    //this.mostrarPaginacion = this.cantidadTotalResultados > CONSTANTES.CANTIDAD_FILAS_GRILLA_DEFAULT;

/*    if (this.itemsDisponibles.length) {
      this.cambiarPagina({
        itemsPerPage: this.itemsPerPage,
        page: CONSTANTES.PAGINA_INICIAL_GRILLA_DEFAULT
      });
    }*/
    this.verificarHabilitacionConceptosPago();
  }

  addItem(): FormControl {
    const control = this.fb.control({
      valorDelComponente: [],
      conceptoPago: [],
      cantidad: []
    });
    // control.setValidators(validadorItemConceptoPago);
    return control;
  }

  controlItemsConceptosPago() {
    return this.form.get('itemsConceptosPago') as FormArray;
  }

  obtenerValorFormulario(): ConceptosPagoCampoFormulario {
    const formValue = this.form.value;
    if (formValue.tieneConceptosPagoAsociados) {
      this.persisitrItemsActualesEnColeccion();
      return {
        tieneConceptosPagoAsociados: formValue.tieneConceptosPagoAsociados,
        itemsConceptosPago: this.itemsDisponibles
      };
    }
    return {
      tieneConceptosPagoAsociados: false,
      itemsConceptosPago: []
    };
  }

  writeValue(obj: ConceptosPagoCampoFormulario): void {
    if (obj) {
      this.form.patchValue({
        tieneConceptosPagoAsociados: obj.tieneConceptosPagoAsociados
      });
      if (obj.itemsConceptosPago && obj.itemsConceptosPago.length) {
        this.itemsDisponibles = obj.itemsConceptosPago.map(item => {
         /* if (this.conceptosPago.map(c => c.codigo).indexOf(item.conceptoPago) === -1) {
            item.conceptoPago = null;
          }*/
          return item;
        });
       // this.actualizarItemsPagina(this.page || CONSTANTES.PAGINA_INICIAL_GRILLA_DEFAULT);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  itemInvalido(index: number) {
    return this.controlItemsConceptosPago().at(index).invalid;
  }

  esValido(): boolean {
    const value = this.form.value;
    if (value.tieneConceptosPagoAsociados) {
      if (this.form.invalid) {
        return false;
      }
      let valido = false;
      this.itemsDisponibles.forEach(item => {
        if (item.cantidad && item.conceptoPago) {
          valido = true;
        }
      });
      this.configuracionItemsValida = valido;
      return valido;
    }
    return true;
  }

  setDisabledState?(isDisabled: boolean): void { }

  cambiarPagina(config: PageChangedEvent): void {
   // this.itemsPerPage = config.itemsPerPage ? config.itemsPerPage : this.itemsPerPage;
    if (config.page) {
      if (this.page != null) {
        this.persisitrItemsActualesEnColeccion();
      }
      this.actualizarItemsPagina(config.page);
      setTimeout(() => {
        this.page = Number(config.page);
      });
    }
  }

  actualizarItemsPagina(pagina: number) {
/*    const inicio = (pagina - 1) * this.itemsPerPage;
    const fin = (inicio + this.itemsPerPage) > this.cantidadTotalResultados ? this.cantidadTotalResultados : (inicio + this.itemsPerPage);
    const itemsDeLaPagina = this.itemsDisponibles.slice(inicio, fin);

    const cantidadItemsActuales = this.controlItemsConceptosPago().length;
    const cantidadItemsAActualizar = itemsDeLaPagina.length;
    if (cantidadItemsAActualizar > cantidadItemsActuales) {
      for (let i = cantidadItemsActuales; i < cantidadItemsAActualizar; i++) {
        this.controlItemsConceptosPago().push(this.addItem());
      }
    } else {
      while (this.controlItemsConceptosPago().length !== cantidadItemsAActualizar) {
        this.controlItemsConceptosPago().removeAt(0);
      }
    }
    this.controlItemsConceptosPago().setValue(itemsDeLaPagina);*/
  }

  persisitrItemsActualesEnColeccion() {
    const itemsActuales: ItemConceptoPago[] = this.controlItemsConceptosPago().value;
    itemsActuales.forEach(item => {
      const index = this.itemsDisponibles.findIndex(i => i.valorDelComponente === item.valorDelComponente);
      if (index !== -1) {
        this.itemsDisponibles[index] = item;
      }
    });
  }

  deshabilitarOHabilitarConceptosBasadoEnEdicionOperador(esCampoEditableOperador: boolean) {
    if (this.componenteTieneConceptosPagoAsociados()) {
      return;
    }

    // se deshabilita o habilita solamente si la opcion de tieneConceptosPagoAsociados no fue seleccionada previamente
    this.esEditableOperador = esCampoEditableOperador;
    this.verificarHabilitacionConceptosPago();
  }

  deshabilitarOHabilitarConceptosBasadoEnSubsanacion(esCampoSubsanable: boolean) {
    if (this.componenteTieneConceptosPagoAsociados()) {
      return;
    }

    // se deshabilita o habilita solamente si la opcion de tieneConceptosPagoAsociados no fue seleccionada previamente
    this.esCampoSubsanable = esCampoSubsanable;
    this.verificarHabilitacionConceptosPago();
  }

  verificarHabilitacionConceptosPago() {
  /*  if (this.perteneceAGrupoIterativo || !Array.isArray(this.conceptosPago) || !this.conceptosPago.length) {
      this.form.get('tieneConceptosPagoAsociados').disable();
      return;
    }*/

    if (!this.esCampoSubsanable && !this.esEditableOperador && Array.isArray(this.itemsDisponibles) && this.itemsDisponibles.length) {
      this.form.get('tieneConceptosPagoAsociados').enable();
    } else {
      this.form.get('tieneConceptosPagoAsociados').disable();
    }
  }
}
