
goog.provide('pm.ui.calendar.Calendar');
goog.provide('pm.ui.calendar.Month');

goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.calendar.Calendar = function() {
  goog.base(this);
};
goog.inherits(pm.ui.calendar.Calendar, goog.ui.Component);


/** @inheritDoc */
pm.ui.calendar.Calendar.prototype.enterDocument = function() {
  var table = goog.dom.createDom('table');
  goog.dom.classes.add(table, 'calendar');

  for (var i = 0; i < 5; i++) {
    var row = goog.dom.createDom('tr');
    for (var j = 0; j < 7; j++) {
      var col = goog.dom.createDom('td');
      col.innerHTML = ((i * 7 + j) % 30) + 1;
      goog.dom.appendChild(row, col);
    }

    goog.dom.appendChild(table, row);
  }

  goog.dom.appendChild(this.element_, table);
};


/** @inheritDoc */
pm.ui.calendar.Calendar.prototype.exitDocument = function() {
  goog.dom.removeChildren(this.element_);
};
