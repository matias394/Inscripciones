import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QRConfirmarComponent } from './qr-confirmacion.component';
import { QRConfirmacionRouting } from './qr-confirmacion-routing.module';

@NgModule({
declarations: [QRConfirmarComponent],
imports: [
    QRConfirmacionRouting,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ],
exports: [QRConfirmarComponent]
})
export class QRConfirmacionModule {}
