import { NgModule } from '@angular/core';
import { DashboardComponent } from '@layouts/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuardService as AuthGuard } from '@modules/auth/auth-guard.service';

const routes: Routes = [
  // App Routing
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'inscripciones/:id',
        loadChildren: () =>
          import('./modules/instancias-mobile/instancias-mobile.module').then(
            (m) => m.InstanciasMobileModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'logout',
        loadChildren: () =>
          import('./modules/logout/logout.module').then((m) => m.LogoutModule),
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'formularios',
      //   loadChildren: () =>
      //     import('./modules/formularios/formularios.module').then(
      //       (m) => m.FormulariosModule),
      //       canActivate: [AuthGuard],
      // },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/authMiba/authMiba.module').then(
            (m) => m.AuthMibaModule
          ),
      },
      {
        path: '404',
        loadChildren: () =>
          import('./modules/404/404.module').then((m) => m.NotFoundModule),
        canActivate: [AuthGuard],
      },
      {
        path: ':codigo',
        loadChildren: () =>
          import('./modules/paramManager/paramM.module').then(
            (m) => m.ParamMModule
          ),
      },
      {
        path: 'inscripcion/:cursoId',
        loadChildren: () =>
          import('./modules/inscripcion/inscripcion.module').then(
            (m) => m.InscripcionModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'cancelar-inscripcion/:idInscripcion',
        loadChildren: () =>
          import(
            './modules/paramManagerCancelation/paramMCancelation.module'
          ).then((m) => m.ParamMCancelationModule),
      },
      {
        path: 'cancelar/:idInscripcion',
        loadChildren: () =>
          import('./modules/cancelar/cancelar.module').then(
            (m) => m.CancelarModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        loadChildren: () =>
          import('./modules/404/404.module').then((m) => m.NotFoundModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
