import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarProfesoresGestionComponent } from './asignar-profesores-gestion.component';
import { CrearInscripcionComponent } from './crear-inscripcion/crear-inscripcion.component';
import { NuevaInscripcionComponent } from './nueva-inscripcion/nueva-inscripcion.component';
import { FormularioComponent } from './formulario/formulario.component';
import { VerInscripcionComponent } from './ver-inscripcion/ver-inscripcion.component';
import { FormularioConfirmarComponent } from './formulario-confirmar/formulario-confirmar.component';
import { VerInscripcionDetallesComponent } from './ver-inscripcion-detalles/ver-inscripcion-detalles.component';
const routes: Routes = [
  {
    path: '',
    component: AsignarProfesoresGestionComponent,
  },
  {
    path: 'ver/:id',
    component: VerInscripcionComponent,
  },
  {
    path: 'ver/:id/detalles/:id',
    component: VerInscripcionDetallesComponent,
  },
  {
    path: 'crear/:id',
    component: CrearInscripcionComponent,
  },
  {
    path: 'crear/:id/nueva',
    component: NuevaInscripcionComponent,
  },
  {
    path: 'crear/:id/nueva/:id',
    component: FormularioComponent,
  },
  {
    path: 'crear/:id/nueva/:id/confirmar',
    component: FormularioConfirmarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarProfesoresGestionRoutingModule {}
