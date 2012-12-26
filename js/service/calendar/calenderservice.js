
goog.provide('pm.service.calendar.CalendarService');

goog.require('pm.service.calendar.Month');
goog.require('pm.service.calendar.MonthType');


pm.service.calendar.CalendarService.getCurrentMonth = function() {
  // TODO(gareth)
  // var date = new Date();
  // var start = date.getDay() - 1;
  // for (current = date.getDate(); current > 0; current--) {
  //   start = (start + 6) % 7;
  // }
  // 
  // return new pm.service.calendar.Month();
};


/**
 * @param {pm.service.calendar.Month} month
 * @return {pm.service.calendar.Month}
 */
pm.service.calendar.CalendarService.getMonthBefore = function(month) {
  // TODO(gareth)
  // switch (month.name) {
  //     case pm.service.calendar.MonthName.JANUARY:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year - 1);
  //     case pm.service.calendar.MonthName.FEBRUARY:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.MARCH:
  //       var days = month.year % 4 == 0 ? 29 : 28;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.APRIL:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.MAY:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.JUNE:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.JULY:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.AUGUST:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.SEPTEMBER:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.OCTOBER:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.NOVEMBER:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //     case pm.service.calendar.MonthName.DECEMBER:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           (month.month - 1) % 12,
  //           pm.service.calendar.Month.beforeStart(month.start, days), days,
  //           month.year);
  //   }
};


/**
 * @param {pm.service.calendar.Month} month
 */
pm.service.calendar.CalendarService.getMonthAfter = function(month) {
  // TODO(gareth)
  // switch (month.name) {
  //     case pm.service.calendar.MonthName.JANUARY:
  //       var days = month.year % 4 == 0 ? 29 : 28;
  //       return new pm.service.calendar.Month(
  //           month.month + 1 % 12,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.FEBRUARY:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.MARCH,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.MARCH:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.APRIL,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.APRIL:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.MAY,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.MAY:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.JUNE,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.JUNE:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.JULY,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.JULY:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.AUGUST,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.AUGUST:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.SEPTEMBER,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.SEPTEMBER:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.OCTOBER,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.OCTOBER:
  //       var days = 30;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.NOVEMBER,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.NOVEMBER:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.DECEMBER,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year);
  //     case pm.service.calendar.MonthName.DECEMBER:
  //       var days = 31;
  //       return new pm.service.calendar.Month(
  //           pm.service.calendar.MonthName.JANUARY,
  //           pm.service.calendar.Month.afterStart(month.start, month.days),
  //           days, month.year + 1);
  //   }
};
