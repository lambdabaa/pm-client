
goog.provide('pm.ui.profile.Profile');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.profile.Profile = function() {
  goog.base(this);
};
goog.inherits(pm.ui.profile.Profile, goog.ui.Component);


/** @inheritDoc */
pm.ui.profile.Profile.prototype.enterDocument = function() {
  // this.element_.innerHTML = 'Profile';
};


/** @inheritDoc */
pm.ui.profile.Profile.prototype.exitDocument = function() {
  goog.dom.removeChildren(this.element_);
};
