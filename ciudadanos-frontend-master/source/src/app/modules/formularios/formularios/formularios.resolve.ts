import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FormularioBusqueda } from './modelos/formulario-busqueda';
//import { FormularioService } from 'src/app/tramites-frontend/formularios/formulario.service';

@Injectable()
export class FormulariosResolve implements Resolve<Observable<FormularioBusqueda[]>> {

    constructor() { }

    resolve(): Observable<FormularioBusqueda[]> {
      return null
       // return this.formularioService.getFormularios();
    }
}
