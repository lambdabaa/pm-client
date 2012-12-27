
goog.provide('pm.ui.task.TaskEditor');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.task.TaskEditor = function() {
};
goog.inherits(pm.ui.task.TaskEditor, goog.ui.Component);


/** @inheritDoc */
pm.ui.task.TaskEditor.prototype.enterDocument = function() {
  console.log('task editor enter');
};


/** @inheritDoc */
pm.ui.task.TaskEditor.prototype.exitDocument = function() {
  console.log('task editor exit');
};
