
import { NgModule } from '@angular/core';
import { SyncComponent } from './sync.component';
import { CommonModule } from '@angular/common';
import { SyncRoutingModule } from './sync-routing.module';

@NgModule({
  declarations: [SyncComponent],
  imports: [
    CommonModule,
    SyncRoutingModule
  ],
})
export class SyncModule {}
