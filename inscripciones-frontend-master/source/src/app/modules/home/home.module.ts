import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AsignarProfesoresModule } from '../usuario-organismo/asignar-profesores/asignar-profesores.module';
import { ProfesoresModule } from '../usuario-profesor/profesores/profesores.module';
import { CursosInicioModule } from '../usuario-organismo/cursos-inicio/cursos-inicio.module';
import { EventosInicioModule } from '../usuario-organismo-eventos/eventos-inicio/eventos-inicio.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProfesoresModule,
    AsignarProfesoresModule,
    CursosInicioModule,
    EventosInicioModule,
  ],
})
export class HomeModule {}
