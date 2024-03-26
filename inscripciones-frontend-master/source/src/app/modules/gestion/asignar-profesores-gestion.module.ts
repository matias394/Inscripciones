import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ModalsModule } from '@components/modals/modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { AsignarProfesoresGestionComponent } from './asignar-profesores-gestion.component';
import { AsignarProfesoresGestionRoutingModule } from './asignar-profesores-gestion-routing.module';
import { CrearInscripcionComponent } from './crear-inscripcion/crear-inscripcion.component';
import { NuevaInscripcionComponent } from './nueva-inscripcion/nueva-inscripcion.component';
import { FormularioComponent } from './formulario/formulario.component';
import { VerInscripcionComponent } from './ver-inscripcion/ver-inscripcion.component';
import { VerInscripcionDetallesComponent } from './ver-inscripcion-detalles/ver-inscripcion-detalles.component';
import { FormularioConfirmarComponent } from './formulario-confirmar/formulario-confirmar.component';
import { FormulariosModule } from '../formularios/formularios.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    AsignarProfesoresGestionComponent,
    CrearInscripcionComponent,
    NuevaInscripcionComponent,
    FormularioComponent,
    FormularioConfirmarComponent,
    VerInscripcionComponent,
    VerInscripcionDetallesComponent,
  ],
  imports: [
    CommonModule,
    AsignarProfesoresGestionRoutingModule,
    NgbModule,
    NgbTooltip,
    ModalsModule,
    FormsModule,
    ReactiveFormsModule,
    AlertasModule,
    PaginationModule,
    RouterModule,
    FormulariosModule,
    SearchModule,
  ],
  exports: [AsignarProfesoresGestionComponent],
})
export class AsignarProfesoresGestionModule {}
