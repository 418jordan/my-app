import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Goal }                from '../models/goal';
import { GoalService }         from '../services/goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goals: Goal[];
  selectedGoal: Goal;

  constructor(
    private goalService: GoalService,
    private router: Router) { }

  getGoals(): void {
    this.goalService
        .getGoals()
        .then(goals => this.goals = goals);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.goalService.create(name)
      .then(Goal => {
        this.goals.push(Goal);
        this.selectedGoal = null;
      });
  }

  delete(goal: Goal): void {
    this.goalService
        .delete(goal.id)
        .then(() => {
          this.goals = this.goals.filter(h => h !== goal);
          if (this.selectedGoal === goal) { this.selectedGoal = null; }
        });
  }

  ngOnInit(): void {
    this.getGoals();
  }

  onSelect(goal: Goal): void {
    this.selectedGoal = goal;
  }

  gotoDetail(): void {
    this.router.navigate(['goals', 'detail', this.selectedGoal.id]);
  }
}
