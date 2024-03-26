import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard/dashboard-layout.component';
import { AuthGuardService as AuthGuard } from './modules/auth/auth-guard.service';
import { GuestGuardService as GuestGuard } from './modules/auth/guest-guard.service';
import { SyncMongoModule } from './modules/syncMongo/syncMongo.module';

const routes: Routes = [
  // App Routing
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },

      {
        path: 'inicio', // TODO: ruta solo mientras se crea el componente inicial

        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
        // data: {
        // expectedRole: 'Super Admin'
        // }
      },

      //ROL SUPERADMIN
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./modules/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
        canActivate: [AuthGuard],
        data: {
          // expectedRole: 'Super Admin' // Colocar aca el rol correspondiente a la ruta
        },
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'organismos',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/organismos/organismos.module').then(
            (m) => m.OrganismosModule
          ),
      },
      {
        path: 'sedes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/sedes/sedes.module').then((m) => m.SedesModule),
      },
      {
        path: 'categorias',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/categorias/categoria.module').then(
            (m) => m.CategoriaModule
          ),
      },
      {
        path: 'inscripciones',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/inscripciones/inscripciones.module').then(
            (m) => m.InscripcionesModule
          ),
      },
      {
        path: 'formularios',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/formularios/formularios.module').then(
            (m) => m.FormulariosModule
          ),
      },
      {
        path: 'gestion',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/gestion/asignar-profesores-gestion.module').then(
            (m) => m.AsignarProfesoresGestionModule
          ),
      },
      {
        path: 'reportes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/reportes/reportes.module').then(
            (m) => m.ReportesModule
          ),
      },
      {
        path: 'cursos',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/cursos/cursos.module').then((m) => m.CursosModule),
      },

      //ROL PROFESOR
      {
        path: 'asistencias',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-profesor/asistencias/asistencias.module'
          ).then((m) => m.AsistenciasModule),
      },
      {
        path: 'notas',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/usuario-profesor/notas/notas.module').then(
            (m) => m.NotasModule
          ),
      },
      {
        path: 'confirmacion',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/confirmacion-mobile/qr-confirmacion.module').then(
            (m) => m.QRConfirmacionModule
          ),
      },

      //ROL USUARIO ORGANISMO
      {
        path: 'usuario-organismo-asignar',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-organismo/asignar-profesores/asignar-profesores.module'
          ).then((m) => m.AsignarProfesoresModule),
      },
      {
        path: 'usuario-organismo-consulta',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-organismo/consulta/asignar-profesores-consulta.module'
          ).then((m) => m.AsignarProfesoresConsultaModule),
      },
      {
        path: 'usuario-organismo-asistencia',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-organismo/asistencia/asignar-profesores-asistencias.module'
          ).then((m) => m.AsignarProfesoresAsistenciasModule),
      },
      {
        path: 'usuario-organismo-reportes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-organismo/reportes/asignar-profesores-reportes.module'
          ).then((m) => m.AsignarProfesoresReportesModule),
      },
      //ROL USUARIO ORGANISMO EVENTOS
      {
        path: 'usuario-eventos-eventos',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-organismo-eventos/eventos/eventos.module'
          ).then((m) => m.EventosModule),
      },
      {
        path: 'usuario-eventos-asistencia',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-organismo-eventos/asistencia/asistencia.module'
          ).then((m) => m.AsistenciaModule),
      },
      {
        path: 'usuario-eventos-reportes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './modules/usuario-organismo-eventos/reportes/reportes.module'
          ).then((m) => m.ReportesModule),
      },
      {
        path: 'sync/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/sync/sync.module').then((m) => m.SyncModule),
      },
      {
        path: 'syncMongo/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/syncMongo/syncMongo.module').then((m) => m.SyncMongoModule),
      },
    ],
  },
  // Auth Routing
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
        canActivate: [GuestGuard], // Si esta logueado redirecciona a /inicio
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
