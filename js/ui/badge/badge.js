
goog.provide('pm.ui.badge.Badge');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.badge.Badge = function() {
  goog.base(this);
};
goog.inherits(pm.ui.badge.Badge, goog.ui.Component);


/** @inheritDoc */
pm.ui.badge.Badge.prototype.enterDocument = function() {
  console.log('badge enter');
};


/** @inheritDoc */
pm.ui.badge.Badge.prototype.exitDocument = function() {
  console.log('badge exit');
};
