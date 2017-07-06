'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1 = 'COMMITTER';
const expectedTitle = `wELCOME TO ${expectedH1}`;
const targetTask = { id: 1, name: 'Take out trash' };
const targetTaskOverviewIndex = 5;
const nameSuffix = 'X';
const newTaskName = targetTask.name + nameSuffix;

class Task {
  id: number;
  name: string;

  // Factory methods

  // Task from string formatted as '<id> <name>'.
  static fromString(s: string): Task {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Task from task list <li> element.
  static async fromLi(li: ElementFinder): Promise<Task> {
      let strings = await li.all(by.xpath('span')).getText();
      return { id: +strings[0], name: strings[1] };
  }

  // Task id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Task> {
    // Get task id from the first <div>
    let _id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    let _name = await detail.element(by.css('h2')).getText();
    return {
        id: +_id.substr(_id.indexOf(' ') + 1),
        name: _name.substr(0, _name.lastIndexOf(' '))
    };
  }
}

describe('Committer', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    let navElts = element.all(by.css('my-app nav a'));

    return {
      navElts: navElts,

      myOverviewHref: navElts.get(0),
      myOverview: element(by.css('my-app my-overview')),
      topTasks: element.all(by.css('my-app my-overview > div h4')),

      myTasksHref: navElts.get(1),
      myTasks: element(by.css('my-app my-tasks')),
      allTasks: element.all(by.css('my-app my-tasks li')),
      selectedTask: element(by.css('my-app li.selected')),
      selectedTaskSubview: element(by.css('my-app my-tasks > div:last-child')),

      taskDetail: element(by.css('my-app task-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result'))
    };
  }

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, () => {
        expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, () => {
        expectHeading(1, expectedH1);
    });

    const expectedViewNames = ['Overview', 'Tasks'];
    it(`has views ${expectedViewNames}`, () => {
      let viewNames = getPageElts().navElts.map((el: ElementFinder) => el.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has overview as the active view', () => {
      let page = getPageElts();
      expect(page.myOverview.isPresent()).toBeTruthy();
    });

  });

  describe('Overview tests', () => {

    beforeAll(() => browser.get(''));

    it('has top tasks', () => {
      let page = getPageElts();
      expect(page.topTasks.count()).toEqual(4);
    });

    it(`selects and routes to ${targetTask.name} details`, overviewSelectTargetTask);

    it(`updates task name (${newTaskName}) in details view`, updateTaskNameInDetailView);

    it(`cancels and shows ${targetTask.name} in Overview`, () => {
      element(by.buttonText('Back')).click();
      browser.waitForAngular(); // seems necessary to gets tests to past for toh-pt6

      let targetTaskElt = getPageElts().topTasks.get(targetTaskOverviewIndex);
      expect(targetTaskElt.getText()).toEqual(targetTask.name);
    });

    it(`selects and routes to ${targetTask.name} details`, overviewSelectTargetTask);

    it(`updates task name (${newTaskName}) in details view`, updateTaskNameInDetailView);

    it(`saves and shows ${newTaskName} in Overview`, () => {
      element(by.buttonText('Save')).click();
      browser.waitForAngular(); // seems necessary to gets tests to past for toh-pt6

      let targetTaskElt = getPageElts().topTasks.get(targetTaskOverviewIndex);
      expect(targetTaskElt.getText()).toEqual(newTaskName);
    });

  });

  describe('Tasks tests', () => {

    beforeAll(() => browser.get(''));

    it('can switch to Tasks view', () => {
      getPageElts().myTasksHref.click();
      let page = getPageElts();
      expect(page.myTasks.isPresent()).toBeTruthy();
      expect(page.allTasks.count()).toEqual(11, 'number of tasks');
    });

    it(`selects and shows ${targetTask.name} as selected in list`, () => {
      getTaskLiEltById(targetTask.id).click();
      expect(Task.fromLi(getPageElts().selectedTask)).toEqual(targetTask);
    });

    it('shows selected task subview', () => {
      let page = getPageElts();
      let title = page.selectedTaskSubview.element(by.css('h2')).getText();
      let expectedTitle = `${targetTask.name.toUpperCase()} is my task`;
      expect(title).toEqual(expectedTitle);
    });

    it('can route to task details', () => {
      element(by.buttonText('View Details')).click();

      let page = getPageElts();
      expect(page.taskDetail.isPresent()).toBeTruthy('shows task detail');
      let task = Task.fromDetail(page.taskDetail);
      expect(task).toEqual(targetTask);
    });

    it(`updates task name (${newTaskName}) in details view`, updateTaskNameInDetailView);

    it(`shows ${newTaskName} in Tasks list`, () => {
      element(by.buttonText('Save')).click();
      browser.waitForAngular(); // seems necessary
      let expectedTask = {id: targetTask.id, name: newTaskName};
      expect(Task.fromLi(getTaskLiEltById(targetTask.id))).toEqual(expectedTask);
    });

    it(`deletes ${newTaskName} from Tasks list`, async () => {
      const tasksBefore = await toTaskArray(getPageElts().allTasks);
      const li = getTaskLiEltById(targetTask.id);
      li.element(by.buttonText('x')).click();

      const page = getPageElts();
      expect(page.myTasks.isPresent()).toBeTruthy();
      expect(page.allTasks.count()).toEqual(10, 'number of tasks');
      const tasksAfter = await toTaskArray(page.allTasks);
      const expectedTasks =  tasksBefore.filter(h => h.name !== newTaskName);
      expect(tasksAfter).toEqual(expectedTasks);
      expect(page.selectedTaskSubview.isPresent()).toBeFalsy();
    });

    it(`adds back ${targetTask.name}`, async () => {
      const newTaskName = 'Alice';
      const tasksBefore = await toTaskArray(getPageElts().allTasks);
      const numTasks = tasksBefore.length;

      element(by.css('input')).sendKeys(newTaskName);
      element(by.buttonText('Add')).click();

      let page = getPageElts();
      let tasksAfter = await toTaskArray(page.allTasks);
      expect(tasksAfter.length).toEqual(numTasks + 1, 'number of tasks');

      expect(tasksAfter.slice(0, numTasks)).toEqual(tasksBefore, 'Old tasks are still there');

      const maxId = tasksBefore[tasksBefore.length - 1].id;
      expect(tasksAfter[numTasks]).toEqual({id: maxId + 1, name: newTaskName});
    });
  });

  describe('Progressive task search', () => {

    beforeAll(() => browser.get(''));

    it(`searches for 'Ce'`, async () => {
      getPageElts().searchBox.sendKeys('Ce');
      browser.sleep(1000);
      expect(getPageElts().searchResults.count()).toBe(2);
    });

    it(`continues search with 'l'`, async () => {
      getPageElts().searchBox.sendKeys('l');
      browser.sleep(1000);
      expect(getPageElts().searchResults.count()).toBe(1);
    });

    it(`continues search with 'e' and gets ${targetTask.name}`, async () => {
      getPageElts().searchBox.sendKeys('e');
      browser.sleep(1000);
      let page = getPageElts();
      expect(page.searchResults.count()).toBe(1);
      let task = page.searchResults.get(0);
      expect(task.getText()).toEqual(targetTask.name);
    });

    it(`navigates to ${targetTask.name} details view`, async () => {
      let task = getPageElts().searchResults.get(0);
      expect(task.getText()).toEqual(targetTask.name);
      task.click();

      let page = getPageElts();
      expect(page.taskDetail.isPresent()).toBeTruthy('shows task detail');
      expect(Task.fromDetail(page.taskDetail)).toEqual(targetTask);
    });
  });

  function overviewSelectTargetTask() {
    let targetTaskElt = getPageElts().topTasks.get(targetTaskOverviewIndex);
    expect(targetTaskElt.getText()).toEqual(targetTask.name);
    targetTaskElt.click();
    browser.waitForAngular(); // seems necessary 

    let page = getPageElts();
    expect(page.taskDetail.isPresent()).toBeTruthy('shows task detail');
    let task = Task.fromDetail(page.taskDetail);
    expect(task).toEqual(targetTask);
  }

  async function updateTaskNameInDetailView() {
    // Assumes that the current view is the task details view.
    addToTaskName(nameSuffix);

    let task = await Task.fromDetail(getPageElts().taskDetail);
    expect(task).toEqual({id: targetTask.id, name: newTaskName});
  }

});

function addToTaskName(text: string): promise.Promise<void> {
  let input = element(by.css('input'));
  return input.sendKeys(text);
}

function expectHeading(hLevel: number, expectedText: string): void {
    let hTag = `h${hLevel}`;
    let hText = element(by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
};

function getTaskLiEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('..'));
}

async function toTaskArray(allTasks: ElementArrayFinder): Promise<Task[]> {
  let promisedTasks = await allTasks.map(Task.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()
  return <Promise<any>> Promise.all(promisedTasks);
}
