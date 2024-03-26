import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMibaComponent } from './authMiba.component';

const routes: Routes = [
  {
    path: '',
    component: AuthMibaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthMibaRoutingComponent {}
