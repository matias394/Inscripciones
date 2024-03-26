import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class VisibilidadComponenteFormlyService {
  private _subject = new Subject<any>();
  private _observable = this._subject.asObservable();

  touched$ = new Subject<string>();

  constructor() {
  }

  mostrarElemento(componenteRef: any): boolean {
    const { condicionesOcultar } = componenteRef.field.templateOptions;
    // let stringEval: string;
    let ocultarElemento: boolean;

    if(componenteRef.templateOptions && componenteRef.templateOptions.ocultarEnEdicion) {
      return false;
    }

    if (condicionesOcultar && condicionesOcultar.length > 0) {
      const valorCondicionesOcultar = condicionesOcultar.map(c => c.valor);
      for (let i = 0; i < condicionesOcultar.length; i++) {
        const valorEntidadAsociada = componenteRef.model[condicionesOcultar[i].entidad] ? componenteRef.model[condicionesOcultar[i].entidad] : null;
        if (valorEntidadAsociada) {
          if (Array.isArray(valorEntidadAsociada)) {
            ocultarElemento = !valorCondicionesOcultar.some(vco => valorEntidadAsociada.includes(vco));
          } else {
            ocultarElemento = !valorCondicionesOcultar.some(vco => vco === valorEntidadAsociada);
          }
        } else {
          if (componenteRef.form.get(componenteRef.field.key)) {
            componenteRef.form.get(componenteRef.field.key).markAsUntouched();
          }
          componenteRef.form.removeControl(componenteRef.field.key);
          componenteRef.field.templateOptions.esVisible = false;
          return componenteRef.field.templateOptions.esVisible;
        }
        if (ocultarElemento) {
          if (componenteRef.form.get(componenteRef.field.key)) {
            componenteRef.form.get(componenteRef.field.key).markAsUntouched();
          }
          componenteRef.form.removeControl(componenteRef.field.key);
        } else {
          if (!componenteRef.form.get(componenteRef.field.key)) {
            componenteRef.form.addControl(componenteRef.field.key, <FormControl>componenteRef.field.formControl);
          }
        }
        componenteRef.field.templateOptions.esVisible = !ocultarElemento;
        if(componenteRef.field.templateOptions.esVisible) {
          componenteRef.field.formControl.enable();
        }
        return !ocultarElemento;
      }
    }
    if (!componenteRef.form.get(componenteRef.field.key)) {
      componenteRef.form.addControl(componenteRef.field.key, <FormControl>componenteRef.field.formControl);
    }
    componenteRef.field.templateOptions.esVisible = true;
    componenteRef.field.formControl.enable();
    return componenteRef.field.templateOptions.esVisible;
  }

  notifySubscribers(keyFieldChange?: any) {
    this._subject.next(keyFieldChange);
  }

  crearSubscripcion(): Observable<any> {
    return this._observable;
  }
}
