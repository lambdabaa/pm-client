
goog.provide('pm.ui.task.Task');

goog.require('goog.fx.AbstractDragDrop');
goog.require('goog.fx.DragDrop');
goog.require('goog.ui.Component');
goog.require('pm.api.Client');
goog.require('pm.ui.task.TaskState');



/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {Object} response
 * @param {pm.ui.task.TaskState} state
 * @param {string} text
 * @param {Array.<goog.fx.DragDrop>} targets
 */
pm.ui.task.Task = function(response, state, text, targets) {
  goog.base(this);

  /**
   * @type {Object}
   */
  this.response = response;

  /**
   * @type {pm.ui.task.TaskState}
   */
  this.state = state;

  /**
   * @type {string}
   */
  this.text = text;

  /**
   * @type {Array.<goog.fx.DragDrop>}
   */
  this.targets = targets;
};
goog.inherits(pm.ui.task.Task, goog.ui.Component);


/**
 * @param {Object} response
 * @return {pm.ui.task.Task}
 */
pm.ui.task.Task.responseToTask = function(response) {
  var text = response.title;
  text += '<br />'
  text += response.description;
  var state = pm.ui.task.TaskState.deserialize(response.state);
  return new pm.ui.task.Task(response, state, text, []);
};


/** @inheritDoc */
pm.ui.task.Task.prototype.enterDocument = function() {
  this.element_.innerHTML = this.text;
  goog.dom.classes.add(this.element_, 'task');
  $(this.element_).tooltip({
    placement: 'bottom',
    title: 'Drag me to change my status!',
    delay: {
      show: 1500,
      hide: 0
    }
  });

  var source = new goog.fx.DragDrop(this.element_, { task: this });
  for (var k in this.targets) {
    var target = this.targets[k];
    source.addTarget(target);
  }
  source.init();

  this.setColor_();
};


/** @inheritDoc */
pm.ui.task.Task.prototype.exitDocument = function() {
};


/**
 * @param {pm.ui.task.TaskState} state
 */
pm.ui.task.Task.prototype.setState = function(state) {
  if (state != this.state) {
    this.state = state;
    this.setColor_();

    // TODO(gareth): Add a callback here that informs the user if the
    // sync with the server failed.
    this.response.state = pm.ui.task.TaskState.serialize(state);
    pm.api.Client.updateTask(this.response.id, this.response, null, null);
  }
};


/**
 * @private
 */
pm.ui.task.Task.prototype.setColor_ = function() {
  goog.dom.classes.remove(this.element_, 'task-todo');
  goog.dom.classes.remove(this.element_, 'task-inprogress');
  goog.dom.classes.remove(this.element_, 'task-done');

  switch (this.state) {
    case pm.ui.task.TaskState.TODO:
      goog.dom.classes.add(this.element_, 'task-todo');
      break;
    case pm.ui.task.TaskState.IN_PROGRESS:
      goog.dom.classes.add(this.element_, 'task-inprogress');
      break;
    case pm.ui.task.TaskState.DONE:
      goog.dom.classes.add(this.element_, 'task-done');
      break;
  }
};
