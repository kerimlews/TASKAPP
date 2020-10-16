import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTaskRoutingModule } from './create-task-routing.module';
import { CreateTaskComponent } from './create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateTaskComponent],
  imports: [
    CommonModule,
    CreateTaskRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CreateTaskModule { }
