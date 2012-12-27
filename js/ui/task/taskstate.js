
goog.provide('pm.ui.task.TaskState');



/** @enum {string} */
pm.ui.task.TaskState = {
  TODO: 'todo',
  IN_PROGRESS: 'inprogress',
  DONE: 'done'
};


/**
 * @param {pm.ui.task.TaskState} state
 * @return {number}
 */
pm.ui.task.TaskState.serialize = function(state) {
  var result = pm.ui.task.TaskState.TODO;
  switch (state) {
    case pm.ui.task.TaskState.TODO:
      result = 0;
      break;
    case pm.ui.task.TaskState.IN_PROGRESS:
      result = 1;
      break;
    case pm.ui.task.TaskState.DONE:
      result = 2;
      break;
  }

  return result;
};


/**
 * @param {number} state
 * @return {pm.ui.task.TaskState}
 */
pm.ui.task.TaskState.deserialize = function(state) {
  var result = pm.ui.task.TaskState.TODO;
  switch (state) {
    case 0:
      result = pm.ui.task.TaskState.TODO;
      break;
    case 1:
      result = pm.ui.task.TaskState.IN_PROGRESS;
      break;
    case 2:
      result = pm.ui.task.TaskState.DONE;
      break;
  }

  return result;
};
