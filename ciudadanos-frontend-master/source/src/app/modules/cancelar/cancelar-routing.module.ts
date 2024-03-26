import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelarComponent } from './cancelar.component';

const routes: Routes = [
  {
    path: '',
    component: CancelarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelarRoutingModule {}
