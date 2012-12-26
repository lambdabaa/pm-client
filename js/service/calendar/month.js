
goog.provide('pm.service.calendar.Month');



/**
 * @constructor
 * @param {number} month
 * @param {number} start
 * @param {number} days
 * @param {number} year
 */
pm.service.calendar.Month = function(month, start, days, year) {
  /**
   * @type {number}
   */
  this.month = month;

  /**
   * @type {number}
   */
  this.start = start;

  /**
   * @type {number}
   */
  this.days = days;

  /**
   * @type {number}
   */
  this.year = year;
};


/**
 * @param {number} start
 * @param {number} days
 */
pm.service.calendar.Month.beforeStart = function(start, days) {
  return ((start - days) % 7) + 7;
};


/**
 * @param {number} start
 * @param {number} days
 */
pm.service.calendar.Month.beforeStart = function(start, days) {
  return (start + days) % 7;
};
