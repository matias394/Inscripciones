
import { NgModule } from '@angular/core';
import { SyncMongoComponent } from './syncMongo.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SyncMongoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncMongoRoutingModule {}
