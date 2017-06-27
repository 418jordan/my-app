import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent }   from './overview.component';
import { TasksComponent }      from './tasks.component';
import { TaskDetailComponent }  from './task-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview',  component: OverviewComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
  { path: 'tasks',     component: TasksComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
