
goog.provide('pm.ui.dashboard.Dashboard');

goog.require('goog.events.Event');
goog.require('goog.ui.Component');
goog.require('pm.ui.task.TaskGroup');
goog.require('pm.ui.task.taskmodal');
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
   * @type {Element}
   * @private
   */
  this.addTaskButton_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.modal_ = null;
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

  // Controls
  element = goog.dom.createDom('div');
  goog.dom.classes.add(element, 'span9');
  goog.dom.classes.add(element, 'dashboard-controls');
  goog.dom.classes.add(element, 'well');
  goog.dom.appendChild(this.element_, element);

  // Add task button
  this.addTaskButton_ = goog.dom.createDom('div');
  goog.dom.classes.add(this.addTaskButton_, 'btn');
  goog.dom.classes.add(this.addTaskButton_, 'btn-primary');
  this.addTaskButton_.innerHTML = '+ New task';
  goog.dom.appendChild(element, this.addTaskButton_);
  goog.events.listen(this.addTaskButton_, goog.events.EventType.CLICK,
      goog.bind(this.onAddTaskButtonClick_, this));

  goog.dom.classes.add(this.element_, 'dashboard');
};


/** @inheritDoc */
pm.ui.dashboard.Dashboard.prototype.exitDocument = function() {
  goog.events.unlisten(this.addTaskButton_, goog.events.EventType.CLICK,
      goog.bind(this.onAddTaskButtonClick_, this));

  // unlisten to things that close this modal
  var closers = goog.dom.getElementsByClass('modal-close');
  for (var i = 0; i < closers.length; i++) {
    var closer = closers[i];
    goog.events.unlisten(closer, goog.events.EventType.CLICK,
        goog.bind(this.onModalClose_, this));
  }

  // unlisten to things that save the data
  var savers = goog.dom.getElementsByClass('modal-save');
  for (var i = 0; i < savers.length; i++) {
    var saver = savers[i];
    goog.events.unlisten(saver, goog.events.EventType.CLICK,
        goog.bind(this.onModalSave_, this));
  }

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


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.dashboard.Dashboard.prototype.onAddTaskButtonClick_ = function(e) {
  if (this.modal_) {
    goog.style.showElement(goog.dom.getElementByClass('modal'), true);
  } else {
    this.modal_ = goog.dom.createDom('div');
    goog.dom.classes.add(this.modal_, 'modal');
    soy.renderElement(this.modal_, pm.ui.task.taskmodal.create);
    goog.dom.appendChild(document.body, this.modal_);

    // Listen to things that close this modal
    var closers = goog.dom.getElementsByClass('modal-close');
    for (var i = 0; i < closers.length; i++) {
      var closer = closers[i];
      goog.events.listen(closer, goog.events.EventType.CLICK,
          goog.bind(this.onModalClose_, this));
    }

    // Listen to things that save the data
    var savers = goog.dom.getElementsByClass('modal-save');
    for (var i = 0; i < savers.length; i++) {
      var saver = savers[i];
      goog.events.listen(saver, goog.events.EventType.CLICK,
          goog.bind(this.onModalSave_, this));
    }
  }

  var modalBackdrop = goog.dom.getElementByClass('modal-backdrop');
  if (modalBackdrop) {
    console.log('Showing backdrop');
    goog.style.showElement(modalBackdrop, true);
  } else {
    console.log('Creating backdrop');
    goog.dom.appendChild(
        document.body, soy.renderAsFragment(pm.ui.task.taskmodal.backdrop));
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.dashboard.Dashboard.prototype.onModalClose_ = function(e) {
  goog.style.showElement(goog.dom.getElementByClass('modal'), false);
  goog.style.showElement(goog.dom.getElementByClass('modal-backdrop'), false);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.dashboard.Dashboard.prototype.onModalSave_ = function(e) {
  var textarea = goog.dom.getElementByClass('task-editor-textarea');
  var task = pm.ui.task.Task.create(textarea.value,
      [this.left_.dragdrop, this.center_.dragdrop, this.right_.dragdrop]);
  goog.style.showElement(goog.dom.getElementByClass('modal'), false);
  goog.style.showElement(goog.dom.getElementByClass('modal-backdrop'), false);
};
