import { ModeloCampoFormulario } from './modelo-campo-formulario';
import {OnInit, OnDestroy, Directive} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';
//import { SuscripcionCancelable } from 'src/app/shared/modelo/suscripcion-cancelable';
@Directive()
export abstract class CampoTipoFormulario implements OnDestroy {
  ngOnDestroy(): void {
  }
  OnInit(){

  }
  modelo: ModeloCampoFormulario;

  abstract vista: any;

  abstract actualizarVista(modelo: ModeloCampoFormulario): void;

  setModelo(modelo: ModeloCampoFormulario) {
    this.modelo = modelo;
    this.modelo.cambiosEnVista().pipe(
      startWith(this.modelo),
      //takeUntil(this.destroyed$)
    ).subscribe(
      (estadoModelo: ModeloCampoFormulario) => this.actualizarVista(estadoModelo)
    );
  }
}
