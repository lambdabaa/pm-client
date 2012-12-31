
goog.provide('pm.api.Client');

goog.require('pm.api.Config');



/**
 * Get a list of all tasks.
 * @param {Function} callback
 * @param {Object} context
 */
pm.api.Client.getTasks = function(callback, context) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(e) {
    if (callback) {
      var response = JSON.parse(e.target.response);
      if (context) {
        callback.call(context, response);
      } else {
        callback(response);
      }
    }
  }, false);
  request.addEventListener('error', function(e) {
    // TODO(gareth)
    console.log('error');
    console.log(e);
  }, false);
  request.addEventListener('abort', function(e) {
    // TODO(gareth)
    console.log('abort');
    console.log(e);
  }, false);
  request.open('GET', '/tasks', false);
  request.send();
};


/**
 * @param {Object} task
 * @param {Function} callback
 * @param {Object} context
 */
pm.api.Client.createTask = function(task, callback, context) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(e) {
    if (callback) {
      var response = JSON.parse(e.target.response);
      if (context) {
        callback.call(context, response);
      } else {
        callback(response);
      }
    }
  }, false);
  request.addEventListener('error', function(e) {
    // TODO(gareth)
    console.log('error');
    console.log(e);
  }, false);
  request.addEventListener('abort', function(e) {
    // TODO(gareth)
    console.log('abort');
    console.log(e);
  }, false);
  request.open('POST', '/tasks', false);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(task));
};


/**
 * Update a single task
 * @param {number} taskId
 * @param {Object} task
 * @param {Function} callback
 * @param {Object} context
 */
pm.api.Client.updateTask = function(taskId, task, callback, context) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(e) {
    if (callback) {
      var response = JSON.parse(e.target.response);
      if (context) {
        callback.call(context, response);
      } else {
        callback(response);
      }
    }
  }, false);
  request.addEventListener('error', function(e) {
    // TODO(gareth)
    console.log('error');
    console.log(e);
  }, false);
  request.addEventListener('abort', function(e) {
    // TODO(gareth)
    console.log('abort');
    console.log(e);
  }, false);
  request.open('PUT', '/tasks/' + taskId, false);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(task));
};


/**
 * Delete a single task
 * @param {number} taskId
 * @param {Function} callback
 * @param {Object} context
 */
pm.api.Client.destroyTask = function(taskId, callback, context) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(e) {
    if (callback) {
      var response = JSON.parse(e.target.response);
      if (context) {
        callback.call(context, response);
      } else {
        callback(response);
      }
    }
  }, false);
  request.addEventListener('error', function(e) {
    // TODO(gareth)
    console.log('error');
    console.log(e);
  }, false);
  request.addEventListener('abort', function(e) {
    // TODO(gareth)
    console.log('abort');
    console.log(e);
  }, false);
  request.open('DELETE', '/tasks/' + taskId, false);
  request.send();
};


/** 
 * whoami
 * @param {Function} callback
 * @param {Object} context
 */
pm.api.Client.me = function(callback, context) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(e) {
    if (callback) {
      var response = JSON.parse(e.target.response);
      if (context) {
        callback.call(context, response);
      } else {
        callback(response);
      }
    }
  }, false);
  request.addEventListener('error', function(e) {
    // TODO(gareth)
    console.log('error');
    console.log(e);
  }, false);
  request.addEventListener('abort', function(e) {
    // TODO(gareth)
    console.log('abort');
    console.log(e);
  }, false);
  request.open('GET', '/me', false);
  request.send();
};
