
import { NgModule } from '@angular/core';
import { SyncMongoComponent } from './syncMongo.component';
import { CommonModule } from '@angular/common';
import { SyncMongoRoutingModule } from './syncMongo-routing.module';

@NgModule({
  declarations: [SyncMongoComponent],
  imports: [
    CommonModule,
    SyncMongoRoutingModule
  ],
})
export class SyncMongoModule {}
