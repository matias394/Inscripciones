import { Component, OnInit, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Dependencia } from '../../modelos/dependencia';

const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => ValoresDependenciaCampoFormularioComponent),
  multi: true
};

@Component({
  selector: 'app-valores-dependencia-campo-formulario',
  templateUrl: './valores-dependencia-campo-formulario.component.html',
  styleUrls: ['./valores-dependencia-campo-formulario.component.css'],
  providers: [
    DEFAULT_VALUE_ACCESSOR
  ]
})
export class ValoresDependenciaCampoFormularioComponent implements OnChanges, ControlValueAccessor {

  @Input() items: any[];
  @Input() bindlabel: string;

  dependencias: Dependencia[] = [];

  busqueda: string;

  persistirCambios = (val: string[]) => { };

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.inicializarDependencias();
    }
  }

  inicializarDependencias() {
    this.dependencias = this.items.map(valor => {
      const nombre = typeof(valor) === 'string' ? valor : valor[this.bindlabel];
      return {
        nombre: nombre,
        seleccionado: false
      };
    });
  }

  actualizarDependencias() {
    const seleccionados = this.dependencias.filter(dep => dep.seleccionado).map(dep => dep.nombre);
    this.persistirCambios(seleccionados);
  }

  seleccionarTodosLosValores() {
    for (let i = 0; i < this.dependencias.length; i++) {
      this.dependencias[i].seleccionado = true;
    }
    this.actualizarDependencias();
  }

  writeValue(obj: string[]): void {
    if (Array.isArray(obj)) {
      this.dependencias = this.items.map(valor => {
        const nombre = typeof(valor) === 'string' ? valor : valor[this.bindlabel];
        return {
          nombre: nombre,
          seleccionado: obj.indexOf(valor) !== -1
        };
      });
    } else {
      this.inicializarDependencias();
    }
  }

  registerOnChange(fn: any): void {
    this.persistirCambios = fn;
  }

  registerOnTouched(fn: any): void { }
}
