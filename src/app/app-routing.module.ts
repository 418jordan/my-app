import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent }   from './overview.component';
import { TasksComponent }      from './tasks.component';
import { TaskDetailComponent }  from './task-detail.component';
import { GoalsComponent } from "./goals/goals.component";
import { GoalDetailComponent } from "./goal-detail/goal-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview',  component: OverviewComponent },
  { path: 'tasks/detail/:id', component: TaskDetailComponent },
  { path: 'tasks',     component: TasksComponent },
  { path: 'goals/detail/:id',     component: GoalDetailComponent },
  { path: 'goals',     component: GoalsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
