
goog.provide('pm.ui.task.TaskEditButton');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.task.TaskEditButton = function() {
  goog.base(this);
};
goog.inherits(pm.ui.task.TaskEditButton, goog.ui.Component);


/** @inheritDoc */
pm.ui.task.TaskEditButton.prototype.createDom = function() {
  this.decorateInternal(goog.dom.createElement('i'));
};


/** @inheritDoc */
pm.ui.task.TaskEditButton.prototype.decorateInternal = function(element) {
  goog.dom.classes.add(element, 'icon-pencil');
  this.setElementInternal(element);
};
