
goog.provide('pm.ui.wishlist.Wishlist');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.wishlist.Wishlist = function() {
  goog.base(this);
};
goog.inherits(pm.ui.wishlist.Wishlist, goog.ui.Component);


/** @inheritDoc */
pm.ui.wishlist.Wishlist.prototype.enterDocument = function() {
  console.log('wishlist enter');
};


/** @inheritDoc */
pm.ui.wishlist.Wishlist.prototype.exitDocument = function() {
  console.log('wishlist exit');
};
