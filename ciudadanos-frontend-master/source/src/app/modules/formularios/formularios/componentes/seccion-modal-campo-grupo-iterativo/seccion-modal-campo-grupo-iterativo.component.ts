import { GrupoIterativo } from './../../tipos/grupo-iterativo/grupo-iterativo';
import { ComunicacionBarraSeccionesService } from './../../services/comunicacion-barra-secciones.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ModeloCampoFormulario } from '../../modelos/modelo-campo-formulario';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => SeccionModalCampoGrupoIterativoComponent),
  multi: true
};

@Component({
  selector: 'app-seccion-modal-campo-grupo-iterativo',
  templateUrl: './seccion-modal-campo-grupo-iterativo.component.html',
  styleUrls: ['./seccion-modal-campo-grupo-iterativo.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SeccionModalCampoGrupoIterativoComponent implements OnInit, ControlValueAccessor {

  private onChangeCallback: (val: any) => {};

  @Input() modelo: ModeloCampoFormulario;

  esDatoImportante: boolean;
  grupoIterativoActual: GrupoIterativo;

  nombreGrupoIterativo: string;

  constructor(
    protected comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService
  ) {

  }

  ngOnInit() {
    this.grupoIterativoActual = this.comunicacionBarraSeccionesService.grupoIterativoActual;

    this.nombreGrupoIterativo = (this.grupoIterativoActual == null) ? 'Ninguno' : this.grupoIterativoActual.nombre;

    if (this.grupoIterativoActual != null) {
      if (this.modelo.grupoIterativo == null) {
        // si la grilla del grupo iterativo actual tiene menos de 3 elementos entonces se puede mostrar en grilla
        this.modelo.sePuedeMostrarEnGrilla = this.grupoIterativoActual.camposEnGrilla().length < 3;
      } else {
        // chequeamos si el campo se puede mostrar en grilla
        this.modelo.grupoIterativo.chequearGrilla();
      }
    }
  }

  cambioEnModelo() {
    this.onChangeCallback(this.esDatoImportante);
  }

  writeValue(obj: any): void {
    if (typeof (obj) === 'boolean') {
      this.esDatoImportante = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void { }
}
