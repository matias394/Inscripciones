import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamMComponent } from './paramM.component';

const routes: Routes = [
  {
    path: '',
    component: ParamMComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamMRoutingComponent {}
