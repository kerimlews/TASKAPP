import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { stringify } from 'querystring';
import { EStatus } from 'src/app/shared/enums/status.enum';
import { MultiSelectModel } from 'src/app/shared/models/select-model';
import { Task } from 'src/app/shared/models/task';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { timeSpent } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  tags: MultiSelectModel[] = [];
  fTags: MultiSelectModel[] = [];
  tasks: Task[] = [];
  name: '';
  tag: '';
  interval: any;
  liveTimeSpent: any[];
  completedTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  notStartedTasks: Task[] = [];

  constructor(
    private authService: AuthService,
    public taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
    this.setTasks();
    this.setTags();
    this.setTaskInterval();
  }

  setTags() {
    const tags = this.tasks
      .reduce((tgs: string[], task: Task) => [...tgs, ...task.tags], [])
      .filter(t => t !== '');
    this.tags = [...new Set(tags)]
      .map((tag: string) => new MultiSelectModel(tag, false));
    this.fTags = this.tags;
  }

  setTasks() {
    this.completedTasks = this.tasks.filter((task: Task) => task.status === EStatus.Completed);
    this.inProgressTasks = this.tasks.filter((task: Task) => task.status === EStatus.InProgress);
    this.notStartedTasks = this.tasks.filter((task: Task) => task.status === EStatus.NotStarted);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  startTask(task: Task) {
    task.status = EStatus.InProgress;
    task.startedAt = new Date();
    this.taskService.update(task);
    this.setTasks();
  }

  completeTask(task: Task) {
    task.status = EStatus.Completed;
    task.timeCompleted = this.getTimeSpent(task.id);
    this.taskService.update(task);
    this.setTasks();
  }

  setTaskInterval() {
    this.interval = setInterval(() => {
      this.liveTimeSpent = this.inProgressTasks.map((task: Task) => ({ id: task.id, timeSpent: timeSpent(new Date(task.startedAt)) }));
    }, 1000);
  }

  filterTasks() {
    const tags = this.tags.filter(t => t.checked).map(t => t.value);
    this.tasks = this.taskService.filterTasks(this.name, tags);
    this.setTasks();
  }
  filterTags() {
    if (this.tag == null || this.tag.length === 0) {
      this.tags = this.fTags; return;
    }
    this.tags = this.tags.filter(t => t.value.includes(this.tag));
  }

  getTimeSpent(id: string) {
    return this.liveTimeSpent?.find((lt) => lt.id === id)?.timeSpent;
  }

  clearFilterTag() {
    this.tags = this.tags.map(t => new MultiSelectModel(t.value, false));
    this.tag = '';
    this.filterTags();
    this.filterTasks();
  }

  trackByFn(index, item) {
    return index;
  }

  toggleTag(tag: string) {
    this.tags = this.tags.map((t: MultiSelectModel) =>
      t.value === tag ? new MultiSelectModel(t.value, !t.checked) : t
    );
    this.filterTasks();
  }

}
