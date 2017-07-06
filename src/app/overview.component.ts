import { Component, OnInit } from '@angular/core';

import { Task }        from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'my-overview',
  templateUrl: './overview.component.html',
  styleUrls: [ './overview.component.css' ]
})
export class OverviewComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks.slice(1, 11));
  }
}
