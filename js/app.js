
goog.provide('pm.App');

goog.require('pm.api.Client');
goog.require('pm.api.Config');
goog.require('pm.ui.index');
goog.require('pm.Routes');
goog.require('soy');



/** @export */
pm.App.init = function() {
  pm.api.Client.me(pm.App.onMe, null);
};


/**
 * @param {Object} user
 */
pm.App.onMe = function(user) {
  if (user) {
    pm.App.onLogin(user);
  } else {
    soy.renderElement(
        goog.dom.getElementByClass('row-fluid'), pm.ui.index.login, {
          baseUrl: pm.api.Config.apiBaseUrl()
        });
  }
};


/**
 * @param {Object} user
 */
pm.App.onLogin = function(user) {
  soy.renderElement(
      goog.dom.getElementByClass('row-fluid'), pm.ui.index.main);

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
