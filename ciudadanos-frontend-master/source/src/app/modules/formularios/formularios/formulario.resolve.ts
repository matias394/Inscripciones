import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
// import { Formulario } from '../../tramites-frontend/formularios/model/formulario';
// import { FormularioService } from '../../tramites-frontend/formularios/formulario.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FormularioResolve {

    constructor(
      //private formularioService: FormularioService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return null
        //return this.formularioService.getFormulario(route.params.id);
    }
}
