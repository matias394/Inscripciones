import { Pipe, PipeTransform } from '@angular/core';
//import { Dependencia } from '../../dependencias/modelo/dependencia';
import {Dependencia} from "../modelos/dependencia";

@Pipe({
  name: 'filtrarDependencias'
})
export class FiltrarDependenciasPipe implements PipeTransform {

  transform(items: Dependencia[], search: string): Dependencia[] {
    if (!items) { return []; }

    if (!search) { return items; }

    search = search.toLowerCase();

    return items.filter(item => item.nombre.toLowerCase().includes(search));
  }

}
