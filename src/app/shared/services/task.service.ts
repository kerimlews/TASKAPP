import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EStatus } from '../enums/status.enum';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';
import { MultiSelectModel } from '../models/select-model';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private authService: AuthService
  ) { }

  private get tasks(): Task[] {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  private set tasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  update(task: Task) {
    if (task) {
      task.updatedAt = new Date();

      const updatedTasks = this.tasks.map((t: Task) =>
        t.id === task.id ? ({ ...task }) as Task : t
      );

      this.tasks = updatedTasks;
    }
  }

  add(task: Task) {
    task.id = uuidv4();

    if (!task.status) {
      task.status = EStatus.NotStarted;
    }

    task.createdAt = new Date();
    task.userId = this.authService.token;
    this.tasks = [...this.tasks, task];
  }

  getAll() {
    return this.tasks.filter((t: Task) => t.userId === this.authService.token);
  }

  get(id: string) {
    if (id) {
      return this.tasks.find((task: Task) => task.id === id);
    }
  }

  delete(id: string) {
    if (id) {
      this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    }
  }

  filterTasks(name: string = '', tags: string[]) {
    if (name.length === 0 && tags.length === 0) {
      return this.tasks;
    }

    return this.getAll().filter((task: Task) =>
      (name.length > 0 && task.name.toLowerCase().includes(name.trim().toLowerCase())) ||
      task.tags.some(t => tags.includes(t)));
  }
}
