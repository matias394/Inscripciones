import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { SelectSearchModule } from '@components/select-search/select-search.module';
import { ErrorInputModule } from '@components/error-input/error-input.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    CrearUsuariosComponent,
    EditarUsuariosComponent,
    UsuariosComponent,
  ],
  imports: [
    UsuariosRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PaginationModule,
    FormsModule,
    ModalsModule,
    AlertasModule,
    SelectSearchModule,
    ErrorInputModule,
    SearchModule,
  ],
  // providers: [UsuarioService, authInterceptorProviders],
})
export class UsuariosModule {}
