
goog.provide('pm.api.Client');



/**
 * Get a list of all tasks
 * @param {Function} callback
 * @param {Object} context
 */
pm.api.Client.getTasks = function(callback, context) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function(e) {
    // TODO(gareth)
    if (callback) {
      callback.call(context, JSON.parse(e.target.response));
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
  request.open('GET', 'http://holley.herokuapp.com/tasks', true);
  request.send();
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
    // TODO(gareth)
    if (callback) {
      callback.call(context, JSON.parse(e.target.response));
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
  request.open('PUT', 'http://holley.herokuapp.com/tasks/' + taskId, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(task));
};
