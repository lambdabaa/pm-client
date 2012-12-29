
goog.provide('pm.ui.task.TaskDeleteButton');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.task.TaskDeleteButton = function() {
  goog.base(this);
};
goog.inherits(pm.ui.task.TaskDeleteButton, goog.ui.Component);


/** @inheritDoc */
pm.ui.task.TaskDeleteButton.prototype.createDom = function() {
  this.decorateInternal(goog.dom.createElement('i'));
};


/** @inheritDoc */
pm.ui.task.TaskDeleteButton.prototype.decorateInternal = function(element) {
  goog.dom.classes.add(element, 'icon-remove');
  this.setElementInternal(element);
};
