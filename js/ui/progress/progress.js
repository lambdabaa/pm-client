
goog.provide('pm.ui.progress.Progress');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.progress.Progress = function() {
  goog.base(this);
};
goog.inherits(pm.ui.progress.Progress, goog.ui.Component);


/** @inheritDoc */
pm.ui.progress.Progress.prototype.enterDocument = function() {
  // this.element_.innerHTML = 'Progress';
};


/** @inheritDoc */
pm.ui.progress.Progress.prototype.exitDocument = function() {
  goog.dom.removeChildren(this.element_);
};
