import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Task }           from './task';

@Injectable()
export class TaskSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Task[]> {
    return this.http
               .get(`app/tasks/?name=${term}`)
               .map(response => response.json().data as Task[]);
  }
}
