import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
 import { Formulario } from '../formularios/modelos/formulario';
 import { FormularioService } from '../formularios/services/formulario.service';
import { Injectable } from '@angular/core';
import {async, Observable} from 'rxjs';
import {FormulariosService} from "../formularios.service";

@Injectable()
export class FormularioResolve implements Resolve<Observable<Formulario>> {
    edicion:true
    usuarioPuedeEditar:false
    constructor(
      private formularioService: FormulariosService,
      private serviceForm: FormularioService
    ) {
    }

    resolve (route: ActivatedRouteSnapshot): Observable<any> {
       return this.formularioService.fetchFormulario(route.params['id'])
    }
}
