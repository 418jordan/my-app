"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var task_service_1 = require("./task.service");
var TasksComponent = (function () {
    function TasksComponent(taskService, router) {
        this.taskService = taskService;
        this.router = router;
    }
    TasksComponent.prototype.getTasks = function () {
        var _this = this;
        this.taskService
            .getTasks()
            .then(function (tasks) { return _this.tasks = tasks; });
    };
    TasksComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.taskService.create(name)
            .then(function (task) {
            _this.tasks.push(task);
            _this.selectedTask = null;
        });
    };
    TasksComponent.prototype.delete = function (task) {
        var _this = this;
        this.taskService
            .delete(task.id)
            .then(function () {
            _this.tasks = _this.tasks.filter(function (h) { return h !== task; });
            if (_this.selectedTask === task) {
                _this.selectedTask = null;
            }
        });
    };
    TasksComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    TasksComponent.prototype.onSelect = function (task) {
        this.selectedTask = task;
    };
    TasksComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedTask.id]);
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    core_1.Component({
        selector: 'my-tasks',
        templateUrl: './tasks.component.html',
        styleUrls: ['./tasks.component.css']
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        router_1.Router])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map