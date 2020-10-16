import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { firstLetterUppercase, forbiddenUppercase, leadingOrTrailingWhitespace } from 'src/app/shared/utils/custom-validations';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: Task;
  isOpenDeleteModal = false;
  editTaskForm = this.fb.group({
    name: ['', [
      Validators.required,
      firstLetterUppercase(),
      leadingOrTrailingWhitespace()]
    ],
    tags: this.fb.array([])
  });

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.task = this.taskService.get(id);
    this.buildForm();
  }

  get tagValidators(): ValidatorFn[] {
    return [Validators.minLength(3), forbiddenUppercase()];
  }
  get tagCtrls(): FormArray {
    return this.editTaskForm.get('tags') as FormArray;
  }
  getErrors(ctrl: number) {
    return this.tagCtrls.get(`${ctrl}`)?.errors;
  }
  addNewTag(value = '') {
    this.tagCtrls.push(this.fb.control(value, this.tagValidators));
  }
  deleteTask() {
    this.taskService.delete(this.task.id);
    this.router.navigateByUrl('/task');
  }
  toggleDeleteModal() {
    this.isOpenDeleteModal = !this.isOpenDeleteModal;
  }

  buildForm() {
    this.editTaskForm.get('name').setValue(this.task.name);
    this.task.tags.forEach(tag => this.addNewTag(tag));
  }

  onSubmit() {
    const { name, tags } = this.editTaskForm.value;

    this.task.name = name;
    this.task.tags = tags.filter((t: string) => t && t.length > 0);

    this.taskService.update(this.task);
    this.router.navigateByUrl('/task');
  }
}
