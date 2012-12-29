
goog.provide('pm.api.Config');



/**
 * @return {string}
 */
pm.api.Config.apiBaseUrl = function() {
  var baseUrl = 'http://holley.herokuapp.com';
  switch (window.location.host) {
    case 'holley.herokuapp.com':
      baseUrl = 'http://holley.herokuapp.com';
      break;
    case 'localhost:8080':
      baseUrl = 'http://localhost:8080'; 
      break;
    default:
      baseUrl = 'http://localhost:8080';
      break;
  }

  return baseUrl;
};
