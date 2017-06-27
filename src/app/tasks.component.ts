import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Task }                from './task';
import { TaskService }         from './task.service';

@Component({
  selector: 'my-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: [ './tasks.component.css' ]
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;

  constructor(
    private taskService: TaskService,
    private router: Router) { }

  getTasks(): void {
    this.taskService
        .getTasks()
        .then(tasks => this.tasks = tasks);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.taskService.create(name)
      .then(task => {
        this.tasks.push(task);
        this.selectedTask = null;
      });
  }

  delete(task: Task): void {
    this.taskService
        .delete(task.id)
        .then(() => {
          this.tasks = this.tasks.filter(h => h !== task);
          if (this.selectedTask === task) { this.selectedTask = null; }
        });
  }

  ngOnInit(): void {
    this.getTasks();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTask.id]);
  }
}
