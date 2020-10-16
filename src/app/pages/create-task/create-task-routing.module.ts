import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTaskComponent } from './create-task.component';

const routes: Routes = [{ path: '', component: CreateTaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTaskRoutingModule { }
