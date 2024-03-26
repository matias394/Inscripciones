import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamMCancelationComponent } from './paramMCancelation.component';

const routes: Routes = [
  {
    path: '',
    component: ParamMCancelationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamMCancelationRoutingComponent {}
