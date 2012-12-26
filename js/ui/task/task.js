
goog.provide('pm.ui.task.Task');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.task.Task = function() {
  goog.base(this);
};
goog.inherits(pm.ui.task.Task, goog.ui.Component);


/** @inheritDoc */
pm.ui.task.Task.prototype.enterDocument = function() {
  console.log('task enter');
};


/** @inheritDoc */
pm.ui.task.Task.prototype.exitDocument = function() {
  console.log('task exit');
};
