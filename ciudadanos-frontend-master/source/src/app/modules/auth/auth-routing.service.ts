import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMibaComponent } from '../authMiba/authMiba.component';

const routes: Routes = [
  {
    path: '',
    component: AuthMibaComponent,
    children: [
      {
        path: '',
        component: AuthMibaComponent,
      },
      {
        path: 'auth',
        component: AuthMibaComponent,
      },
      {
        path: 'inicio',
        component: AuthMibaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
