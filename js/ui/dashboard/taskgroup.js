
goog.provide('pm.ui.dashboard.TaskGroup');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.dashboard.TaskGroup = function() {
  goog.base(this);
};
goog.inherits(pm.ui.dashboard.TaskGroup, goog.ui.Component);


/** @inheritDoc */
pm.ui.dashboard.TaskGroup.prototype.enterDocument = function() {
  console.log('taskgroup enter');
};


/** @inheritDoc */
pm.ui.dashboard.TaskGroup.prototype.exitDocument = function() {
  console.log('taskgroup exit');
};
