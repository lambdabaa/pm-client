
goog.provide('pm.App');

goog.require('goog.dom');
goog.require('pm.Routes');



/**
 * @export
 */
pm.App.init = function() {
  // TODO(gareth): Hack pathjs to pass context to Path.route.core functions
  var routes = new pm.Routes();
  Path.map('#!/calendar')
      .to(function() { routes.enterCalendar() })
      .exit(function() { routes.exitCalendar() });
  Path.map('#!/dashboard')
      .to(function() { routes.enterDashboard() })
      .exit(function() { routes.exitDashboard() });
  Path.map('#!/profile')
      .to(function() { routes.enterProfile() })
      .exit(function() { routes.exitProfile() });
  Path.map('#!/progress')
      .to(function() { routes.enterProgress() })
      .exit(function() { routes.exitProgress() });
  Path.listen();
};
