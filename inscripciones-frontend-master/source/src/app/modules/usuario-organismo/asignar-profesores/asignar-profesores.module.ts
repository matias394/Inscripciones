import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignarProfesoresRoutingModule } from './asignar-profesores-routing.module';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ClaseComponent } from './clase/clase.component';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { AsignarProfesoresComponent } from './asignar-profesores.component';
import { InstanciasComponent } from './instancias/instancias.component';
import { ClasesComponent } from './clases/clases.component';
import { PipesModule } from '@pipes/pipes.module';
import { ClasesSedesComponent } from './clases-sedes/clases-sedes.component';
import { SearchModule } from '@components/search/search.module';
import { CardResponsiveAsignarModule } from '@components/card-responsive-asignar/card-responsive-asignar.module';

@NgModule({
  declarations: [
    AsignarProfesoresComponent,
    InstanciasComponent,
    ClasesComponent,
    ClaseComponent,
    ClasesSedesComponent,
  ],
  imports: [
    CommonModule,
    AsignarProfesoresRoutingModule,
    NgbModule,
    NgbTooltip,
    ModalsModule,
    FormsModule,
    AlertasModule,
    PaginationModule,
    PipesModule,
    SearchModule,
    CardResponsiveAsignarModule,
  ],
  exports: [
    AsignarProfesoresComponent,
    InstanciasComponent,
    ClasesComponent,
    ClaseComponent,
  ],
})
export class AsignarProfesoresModule {}
