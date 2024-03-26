import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QRConfirmarComponent } from './qr-confirmacion.component';

const routes: Routes = [
  { path: '', component: QRConfirmarComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRConfirmacionRouting {}
