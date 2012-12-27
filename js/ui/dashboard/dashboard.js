
goog.provide('pm.ui.dashboard.Dashboard');

goog.require('goog.events.Event');
goog.require('goog.ui.Component');
goog.require('pm.ui.task.TaskEditor');
goog.require('pm.ui.task.TaskGroup');
goog.require('pm.ui.task.TaskState');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.dashboard.Dashboard = function() {
  goog.base(this);

  /**
   * @type {pm.ui.task.TaskGroup}
   * @private
   */
  this.left_ = null;

  /**
   * @type {pm.ui.task.TaskGroup}
   * @private
   */
  this.center_ = null;

  /**
   * @type {pm.ui.task.TaskGroup}
   * @private
   */
  this.right_ = null;

  /**
   * @type {pm.ui.task.TaskEditor}
   * @private
   */
  this.taskEditor_ = null;
};
goog.inherits(pm.ui.dashboard.Dashboard, goog.ui.Component);


/** @inheritDoc */
pm.ui.dashboard.Dashboard.prototype.enterDocument = function() {
  var element, h3;

  // Left
  this.left_ = new pm.ui.task.TaskGroup(
      pm.ui.task.TaskState.TODO);
  element = goog.dom.createDom('div');
  goog.dom.classes.add(element, 'span3');
  goog.dom.appendChild(this.element_, element);
  h3 = goog.dom.createDom('h3');
  h3.innerHTML = 'To Do';
  goog.dom.appendChild(element, h3);
  this.left_.render(element);

  // Center
  this.center_ = new pm.ui.task.TaskGroup(
      pm.ui.task.TaskState.IN_PROGRESS);
  element = goog.dom.createDom('div');
  goog.dom.classes.add(element, 'span3');
  goog.dom.appendChild(this.element_, element);
  h3 = goog.dom.createDom('h3');
  h3.innerHTML = 'In Progress';
  goog.dom.appendChild(element, h3);
  this.center_.render(element);

  // Right
  this.right_ = new pm.ui.task.TaskGroup(
      pm.ui.task.TaskState.DONE);
  element = goog.dom.createDom('div');
  goog.dom.classes.add(element, 'span3');
  goog.dom.appendChild(this.element_, element);
  h3 = goog.dom.createDom('h3');
  h3.innerHTML = 'Done';
  goog.dom.appendChild(element, h3);
  this.right_.render(element);

  // Task editor
  // this.taskEditor_ = new pm.ui.task.TaskEditor();
  // element = goog.dom.createDom('div');
  // this.taskEditor_.render(element);

  goog.dom.classes.add(this.element_, 'task-group-container');
};


/** @inheritDoc */
pm.ui.dashboard.Dashboard.prototype.exitDocument = function() {
  goog.dom.removeChildren(this.element_);
};


/**
 * @param {Array} objects
 */
pm.ui.dashboard.Dashboard.prototype.onTasks = function(objects) {
  for (var k in objects) {
    var object = objects[k];
    var task = pm.ui.task.Task.responseToTask(object);
    this.addTask(task);
  }
};


/**
 * @param {pm.ui.task.Task} task
 */
pm.ui.dashboard.Dashboard.prototype.addTask = function(task) {
  task.targets =
      [this.left_.dragdrop, this.center_.dragdrop, this.right_.dragdrop];

  switch (task.state) {
    case pm.ui.task.TaskState.TODO:
      this.left_.addTask(task);
      break;
    case pm.ui.task.TaskState.IN_PROGRESS:
      this.center_.addTask(task);
      break;
    case pm.ui.task.TaskState.DONE:
      this.right_.addTask(task);
      break;
  }
};
