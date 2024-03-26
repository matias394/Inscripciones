import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';

interface OpcionDeSelectorMultiple {
  uid: string;
  nombre: string;
  seleccionado: boolean;
}

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => SelectorMultiplesComponent),
  multi: true
};

@Component({
  selector: 'app-selector-multiples',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectorMultiplesComponent implements OnInit, OnChanges, ControlValueAccessor {

  private onChangeCallback: (val: any) => {};
  private opcionesSeleccionadas: string[];

  @Input() opciones: string[];

  _opciones: OpcionDeSelectorMultiple[] = [];

  verSoloSeleccionados = false;

  constructor() { }

  ngOnInit() {
    this.generarOpciones(this.opciones, this.opcionesSeleccionadas);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['opciones']) {
      this.generarOpciones(changes['opciones'].currentValue, this.opcionesSeleccionadas);
    }
  }

  generarOpciones(opciones: string[], seleccionadas?: string[]) {
    if (!opciones) { return; }

    const opt: OpcionDeSelectorMultiple[] = [];
    for (let i = 0; i < opciones.length; i++) {
      const uid = `${opciones[i]}_${Date.now()}_${i}`;
      opt.push({
        uid: uid,
        nombre: opciones[i],
        seleccionado: (seleccionadas) ? seleccionadas.indexOf(opciones[i]) !== -1 : false
      });
    }

    this._opciones = opt;
  }

  cambiarSeleccion(opcionesSeleccionadas: string[]) {
    if (!this._opciones) { return; }

    for (let i = 0; i < this._opciones.length; i++) {
      const opcion = this._opciones[i];
      opcion.seleccionado = opcionesSeleccionadas.indexOf(opcion.nombre) !== -1;
    }
  }

  persistirSeleccion() {
    this.opcionesSeleccionadas = this._opciones.filter(opt => opt.seleccionado).map(opt => opt.nombre);
    this.onChangeCallback(this.opcionesSeleccionadas);
  }

  toggleOptions() {
    this.verSoloSeleccionados = !this.verSoloSeleccionados;
  }

  get opcionesAMostrar() {
    if (!this.verSoloSeleccionados) { return this._opciones; }

    return this._opciones.filter(opt => opt.seleccionado);
  }

  get buttonText() {
    return (this.verSoloSeleccionados) ? 'Ver todos' : 'Ver solo seleccionados';
  }

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this.opcionesSeleccionadas = obj;
    } else {
      this.opcionesSeleccionadas = [];
    }
    this.cambiarSeleccion(this.opcionesSeleccionadas);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void { }
}
