import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { SelectSearchModule } from '@components/select-search/select-search.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    CategoriaComponent,
    CrearCategoriaComponent,
    EditarCategoriaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PaginationModule,
    ModalsModule,
    AlertasModule,
    CategoriaRoutingModule,
    SelectSearchModule,
    SearchModule,
  ],
})
export class CategoriaModule {}
