import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditTaskRoutingModule } from './edit-task-routing.module';
import { EditTaskComponent } from './edit-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditTaskComponent],
  imports: [
    CommonModule,
    EditTaskRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditTaskModule { }
