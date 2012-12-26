
goog.provide('pm.ui.search.Search');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.search.Search = function() {
  goog.base(this);
};
goog.inherits(pm.ui.search.Search, goog.ui.Component);


/** @inheritDoc */
pm.ui.search.Search.prototype.enterDocument = function() {
  console.log('search enter');
};


/** @inheritDoc */
pm.ui.search.Search.prototype.exitDocument = function() {
  console.log('search exit');
};
