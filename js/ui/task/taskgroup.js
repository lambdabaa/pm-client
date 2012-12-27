
goog.provide('pm.ui.task.TaskGroup');

goog.require('goog.fx.AbstractDragDrop');
goog.require('goog.fx.DragDrop');
goog.require('goog.ui.Component');
goog.require('pm.ui.task.Task');
goog.require('pm.ui.task.TaskState');



/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {pm.ui.task.TaskState} state
 */
pm.ui.task.TaskGroup = function(state) {
  goog.base(this);

  /**
   * @type {goog.fx.DragDrop}
   */
  this.dragdrop = null;

  /**
   * @type {pm.ui.task.TaskState}
   * @private
   */
  this.state_ = state;
};
goog.inherits(pm.ui.task.TaskGroup, goog.ui.Component);


/** @inheritDoc */
pm.ui.task.TaskGroup.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/** @inheritDoc */
pm.ui.task.TaskGroup.prototype.decorateInternal = function(element) {
  goog.dom.classes.add(element, 'task-group');
  this.dragdrop = new goog.fx.DragDrop(element);
  this.dragdrop.init();
  goog.events.listen(this.dragdrop, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));
  this.setElementInternal(element);
};


/** @inheritDoc */
pm.ui.task.TaskGroup.prototype.exitDocument = function() {
  goog.events.unlisten(this.dragdrop, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));
};


/**
 * @param {pm.ui.task.Task} task
 */
pm.ui.task.TaskGroup.prototype.addTask = function(task) {
  task.render(this.element_);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.task.TaskGroup.prototype.onDrop_ = function(e) {
  for (var k in e.target.items_) {
    var item = e.dragSource.items_[k];
    item.data.task.setState(this.state_);
    goog.dom.appendChild(this.element_, item.element);
  }
};
