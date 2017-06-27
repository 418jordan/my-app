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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var task_service_1 = require("./task.service");
var TaskDetailComponent = (function () {
    function TaskDetailComponent(taskService, route, location) {
        this.taskService = taskService;
        this.route = route;
        this.location = location;
    }
    TaskDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.taskService.getTask(+params['id']); })
            .subscribe(function (task) { return _this.task = task; });
    };
    TaskDetailComponent.prototype.save = function () {
        var _this = this;
        this.taskService.update(this.task)
            .then(function () { return _this.goBack(); });
    };
    TaskDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return TaskDetailComponent;
}());
TaskDetailComponent = __decorate([
    core_1.Component({
        selector: 'task-detail',
        templateUrl: './task-detail.component.html',
        styleUrls: ['./task-detail.component.css']
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        router_1.ActivatedRoute,
        common_1.Location])
], TaskDetailComponent);
exports.TaskDetailComponent = TaskDetailComponent;
//# sourceMappingURL=task-detail.component.js.map