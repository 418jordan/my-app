import { Component }          from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/overview" routerLinkActive="active">Overview</a>
      <a routerLink="/tasks" routerLinkActive="active">Tasks</a>
      <a routerLink="/appointment" routerLinkActive="active">Appointments</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COMMITTER';
}
