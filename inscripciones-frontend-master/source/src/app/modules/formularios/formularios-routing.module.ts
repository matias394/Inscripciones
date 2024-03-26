import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariosComponent } from './formularios.component';
import {CreandoFormularioComponent} from "./formularios/componentes/creando-formulario/creando-formulario.component";
import {
  PrevisualizandoFormularioComponent
} from "./formularios/componentes/previsualizando-formulario/previsualizando-formulario.component";
import {FormularioResolve} from "./formularios/formulario.resolve";

const routes: Routes = [
  { path: '', component: FormulariosComponent, pathMatch:'full'},
  {
    path: 'crear',
    component: CreandoFormularioComponent,
    pathMatch: 'full',
    data:{
      edicion:true,
      usuarioPuedeEditar:true
    },
  },
  {
    path: 'previsualizacion',
    component: PrevisualizandoFormularioComponent,
    pathMatch: 'full',
  },
  {
    path:'editar/:id',
    component:CreandoFormularioComponent,
    pathMatch:'full',
    resolve:{
      formulario: FormularioResolve,
    },
    data:{
      edicion:true,
      usuarioPuedeEditar:true
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioRoutingModule {}
