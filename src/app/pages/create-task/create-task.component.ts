import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { firstLetterUppercase, forbiddenUppercase, leadingOrTrailingWhitespace } from 'src/app/shared/utils/custom-validations';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  createTaskForm = this.fb.group({
    name: ['',
      [Validators.required,
      firstLetterUppercase(),
      leadingOrTrailingWhitespace()]
    ],
    tags: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get tagValidators(): ValidatorFn[] {
    return [Validators.minLength(3), forbiddenUppercase()];
  }
  get tagCtrls(): FormArray {
    return this.createTaskForm.get('tags') as FormArray;
  }
  getErrors(ctrl: number) {
    return this.tagCtrls.get(`${ctrl}`)?.errors;
  }
  addNewTag() {
    this.tagCtrls.push(this.fb.control('', this.tagValidators));
  }

  onSubmit() {
    const { name, tags } = this.createTaskForm.value;
    const task = new Task();

    task.name = name;
    task.tags = tags.filter((t: string) => t && t.length > 0);

    this.taskService.add(task);

    this.router.navigateByUrl('/task');
  }

}
