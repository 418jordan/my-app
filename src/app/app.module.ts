import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent }         from './app.component';
import { OverviewComponent }   from './overview.component';
import { TasksComponent }      from './tasks.component';
import { TaskDetailComponent }  from './task-detail.component';
import { TaskService }          from './task.service';
import { TaskSearchComponent }  from './task-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    OverviewComponent,
    TaskDetailComponent,
    TasksComponent,
    TaskSearchComponent,
    
  ],
  providers: [ TaskService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
