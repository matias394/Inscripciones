import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';




const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
// tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => OpcionesCamposListaValoresComponent),
  multi: true
};

@Component({
  selector: 'app-opciones-campos-lista-valores',
  templateUrl: './opciones-campos-lista-valores.component.html',
  styleUrls: ['./opciones-campos-lista-valores.component.css'],
  providers: [
    DEFAULT_VALUE_ACCESSOR
  ]
})
export class OpcionesCamposListaValoresComponent implements OnInit, ControlValueAccessor {
  @Input() invalid: boolean;
  @Input() seleccionMultiple = false;
  @Input() textoAyuda: string;
  @Output() registrarValoresPorDefectoEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  modoEdicion = true;

  maxlengthError = false;

  valorPorDefecto: string | string[];
  valores = [];
  _valoresPorDefecto: boolean[] = [];
  _valorPorDefecto: string;

  _uid: number;
  constructor() { }

  ngOnInit() {
    this._uid = Date.now();
    this.textoAyuda = this.textoAyuda || 'Lista de valores a cargar en el campo';
  }

  onChange = (_) => { };
  onTouched = () => { };

  writeValue(valores: any): void {
    if (valores) {
      this.valores = valores;

      if (!this.valorPorDefecto) { return; }

      if (this.seleccionMultiple) {
        this.armarValoresPorDefecto();
      } else {
        this._valorPorDefecto = this.valorPorDefecto[0];
      }
    }
  }

  armarValoresPorDefecto() {
    this._valoresPorDefecto = [];
    this.valores.forEach((valor) => {
      this._valoresPorDefecto.push(this.valorPorDefecto.includes(valor));
    });
  }

  valoresChange(valor) {
    if(valor){
    const valoresReplace = valor.replace('\n',',')
      this.valores = valoresReplace.split(',')
    }
    else {
      this.valores = []
    }
  }

  onBlur() {
    //this.valores = _.uniq(this.valores.filter(v => v && v.trim().length !== 0));

    // chequeamos que los valores por defecto sigan existiendo
    if (this.seleccionMultiple && this._valoresPorDefecto && this._valoresPorDefecto.length) {
      this.armarValoresPorDefecto();
      this.registrarValoresPorDefecto();
    } else if (!this.seleccionMultiple && this._valorPorDefecto) {
      this.registrarValoresPorDefecto();
    }
    this.onChange(this.valores);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  cambiarModoEdicion() {
    this.modoEdicion = !this.modoEdicion;
  }

  seleccionarValorPorDefecto() {
    if (this.valores && this.valores.length) {
      this.modoEdicion = false;
    }
  }

  registrarValoresPorDefecto() {
    this.modoEdicion = true;
    let valorPorDefecto = null;
    if (!this.seleccionMultiple) {
      if (this.valores.indexOf(this._valorPorDefecto) === -1) {
        this._valorPorDefecto = null;
      }
      valorPorDefecto = [this._valorPorDefecto];
    } else {
      valorPorDefecto = this._valoresPorDefecto.reduce((arr, esValorPorDefecto, i) => {
        if (esValorPorDefecto) {
          arr.push(this.valores[i]);
        }
        return arr;
      }, []);
    }
    this.valorPorDefecto = valorPorDefecto;
    this.registrarValoresPorDefectoEvent.emit(valorPorDefecto);
  }

  incializarValoresPorDefecto(valoresPorDefecto: string[]) {
    if (!valoresPorDefecto) {
      this.valorPorDefecto = [];
      return;
    }
    if (Array.isArray(valoresPorDefecto)) {
      this.valorPorDefecto = valoresPorDefecto;
    } else {
      this.valorPorDefecto = [valoresPorDefecto];
    }
  }

  getCssClases() {
    return {
      'has-error': this.invalid,
      'has-feedback': this.invalid
    };
  }

  get hayValoresSeleccionables(): boolean {
    return !!(this.valores && this.valores.filter(v => !!v.trim()).length);
  }
}
