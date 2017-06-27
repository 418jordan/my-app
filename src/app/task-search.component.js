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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
// Observable class extensions
require("rxjs/add/observable/of");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var task_search_service_1 = require("./task-search.service");
var TaskSearchComponent = (function () {
    function TaskSearchComponent(taskSearchService, router) {
        this.taskSearchService = taskSearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    // Push a search term into the observable stream.
    TaskSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    TaskSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tasks = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.taskSearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    TaskSearchComponent.prototype.gotoDetail = function (task) {
        var link = ['/detail', task.id];
        this.router.navigate(link);
    };
    return TaskSearchComponent;
}());
TaskSearchComponent = __decorate([
    core_1.Component({
        selector: 'task-search',
        templateUrl: './task-search.component.html',
        styleUrls: ['./task-search.component.css'],
        providers: [task_search_service_1.TaskSearchService]
    }),
    __metadata("design:paramtypes", [task_search_service_1.TaskSearchService,
        router_1.Router])
], TaskSearchComponent);
exports.TaskSearchComponent = TaskSearchComponent;
//# sourceMappingURL=task-search.component.js.map