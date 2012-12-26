
goog.provide('pm.ui.dashboard.Task');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.dashboard.Task = function() {
  goog.base(this);
};
goog.inherits(pm.ui.dashboard.Task, goog.ui.Component);


/** @inheritDoc */
pm.ui.dashboard.Task.prototype.enterDocument = function() {
  console.log('task enter');
};


/** @inheritDoc */
pm.ui.dashboard.Task.prototype.exitDocument = function() {
  console.log('task exit');
};
