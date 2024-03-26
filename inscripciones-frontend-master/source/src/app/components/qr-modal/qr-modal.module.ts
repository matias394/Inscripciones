import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrModalComponent } from './qr-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    QrModalComponent
  ],
  imports: [
    CommonModule,
    ZXingScannerModule,
    RouterModule
  ],
  exports: [QrModalComponent],
})
export class QrModule {}
