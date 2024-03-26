import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstanciasMobileComponent } from './instancias-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: InstanciasMobileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstanciasMobileRoutingModule {}
