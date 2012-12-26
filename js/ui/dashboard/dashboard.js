
goog.provide('pm.ui.dashboard.Dashboard');
goog.provide('pm.ui.dashboard.TaskState');
goog.provide('pm.ui.dashboard.TaskColor');

goog.require('goog.events.Event');
goog.require('goog.fx.AbstractDragDrop');
goog.require('goog.fx.DragDrop');
goog.require('goog.ui.Component');



/**
 * @constructor
 * @extends {goog.ui.Component}
 */
pm.ui.dashboard.Dashboard = function() {
  goog.base(this);

  /**
   * @type {Element}
   * @private
   */
  this.left_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.center_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.right_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.todo_ = null;

  /**
   * @type {goog.fx.DragDrop}
   * @private
   */
  this.todoDragDrop_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.inprogress_ = null;

  /**
   * @type {goog.fx.DragDrop}
   * @private
   */
  this.inprogressDragDrop_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.done_ = null;

  /**
   * @type {goog.fx.DragDrop}
   * @private
   */
  this.doneDragDrop_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.addButton_ = null;
};
goog.inherits(pm.ui.dashboard.Dashboard, goog.ui.Component);


/** @inheritDoc */
pm.ui.dashboard.Dashboard.prototype.enterDocument = function() {
  // Left
  this.left_ = goog.dom.createDom('div');
  goog.dom.classes.add(this.left_, 'span3');
  goog.dom.appendChild(this.element_, this.left_);
  this.todo_ = goog.dom.createDom('div');
  goog.dom.classes.add(this.todo_, 'col');
  this.todo_.innerHTML = '<h3>To Do</h3>';
  this.todoDragDrop_ = new goog.fx.DragDrop(this.todo_);
  this.todoDragDrop_.init();
  goog.events.listen(
      this.todoDragDrop_, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));
  goog.dom.appendChild(this.left_, this.todo_);

  // Center
  this.center_ = goog.dom.createDom('div');
  goog.dom.classes.add(this.center_, 'span3');
  goog.dom.appendChild(this.element_, this.center_);
  this.inprogress_ = goog.dom.createDom('div');
  goog.dom.classes.add(this.inprogress_, 'col');
  this.inprogress_.innerHTML = '<h3>In Progress</h3>';
  this.inprogressDragDrop_ = new goog.fx.DragDrop(this.inprogress_);
  this.inprogressDragDrop_.init();
  goog.events.listen(
      this.inprogressDragDrop_, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));
  goog.dom.appendChild(this.center_, this.inprogress_);

  // Right
  this.right_ = goog.dom.createDom('div');
  goog.dom.classes.add(this.right_, 'span3');
  goog.dom.appendChild(this.element_, this.right_);
  this.done_ = goog.dom.createDom('div');
  goog.dom.classes.add(this.done_, 'col');
  this.done_.innerHTML = '<h3>Done</h3>';
  this.doneDragDrop_ = new goog.fx.DragDrop(this.done_);
  this.doneDragDrop_.init();
  goog.events.listen(
      this.doneDragDrop_, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));
  goog.dom.appendChild(this.right_, this.done_);

  /** TODO(gareth): Delete demo code */
  this.addTask_(
      pm.ui.dashboard.TaskState.TODO, 'Do laundry',
      pm.ui.dashboard.TaskColor.GREEN);
  this.addTask_(
      pm.ui.dashboard.TaskState.TODO, 'Walk Linus',
      pm.ui.dashboard.TaskColor.BLUE);
  this.addTask_(
      pm.ui.dashboard.TaskState.TODO, 'Feed Harvey',
      pm.ui.dashboard.TaskColor.RED);
  this.addTask_(
      pm.ui.dashboard.TaskState.IN_PROGRESS, 'Run the Roomba',
      pm.ui.dashboard.TaskColor.ORANGE);
  this.addTask_(
      pm.ui.dashboard.TaskState.DONE, 'Make coffee',
      pm.ui.dashboard.TaskColor.BLACK);
  this.addTask_(
      pm.ui.dashboard.TaskState.DONE, 'Call the doctor',
      pm.ui.dashboard.TaskColor.GRAY);

  this.addButton_ = this.addTask_(
      pm.ui.dashboard.TaskState.TODO, '+ Add a card',
      pm.ui.dashboard.TaskColor.GREEN);
};


/** @inheritDoc */
pm.ui.dashboard.Dashboard.prototype.exitDocument = function() {
  goog.events.unlisten(
      this.todoDragDrop_, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));
  goog.events.unlisten(
      this.inprogressDragDrop_, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));
  goog.events.unlisten(
      this.doneDragDrop_, goog.fx.AbstractDragDrop.EventType.DROP,
      goog.bind(this.onDrop_, this));

  goog.dom.removeChildren(this.element_);
};


/**
 * @param {pm.ui.dashboard.TaskState} state
 * @param {string} text
 * @param {pm.ui.dashboard.TaskColor} color
 * @return {Element}
 * @private
 */
pm.ui.dashboard.Dashboard.prototype.addTask_ = function(state, text, color) {
  var task = goog.dom.createDom('div');
  task.innerHTML = text;
  goog.dom.classes.add(task, 'task');

  if (text == '+ Add a card') {
    // TODO(gareth): Use a different signal than card text
    // Add some functionality to make a new task
  } else {
    $(task).tooltip({
      placement: 'bottom',
      title: 'Drag me to change my status.',
      delay: {
        show: 1500,
        hide: 0
      }
    });

    var source = new goog.fx.DragDrop(task, {});
    source.addTarget(this.todoDragDrop_);
    source.addTarget(this.inprogressDragDrop_);
    source.addTarget(this.doneDragDrop_);
    source.init();
  }

  switch (color) {
    case pm.ui.dashboard.TaskColor.BLACK:
      goog.dom.classes.add(task, 'task-inverse');
      break;
    case pm.ui.dashboard.TaskColor.BLUE:
      goog.dom.classes.add(task, 'task-primary');
      break;
    case pm.ui.dashboard.TaskColor.GRAY:
      goog.dom.classes.add(task, 'task-normal');
      break;
    case pm.ui.dashboard.TaskColor.GREEN:
      goog.dom.classes.add(task, 'task-success');
      break;
    case pm.ui.dashboard.TaskColor.LIGHT_BLUE:
      goog.dom.classes.add(task, 'task-info');
      break;
    case pm.ui.dashboard.TaskColor.ORANGE:
      goog.dom.classes.add(task, 'task-warning');
      break;
    case pm.ui.dashboard.TaskColor.RED:
      goog.dom.classes.add(task, 'task-important');
      break;
    default:
      break;
  }

  switch (state) {
    case pm.ui.dashboard.TaskState.TODO:
      goog.dom.appendChild(this.todo_, task);
      break;
    case pm.ui.dashboard.TaskState.IN_PROGRESS:
      goog.dom.appendChild(this.inprogress_, task);
      break;
    case pm.ui.dashboard.TaskState.DONE:
      goog.dom.appendChild(this.done_, task);
      break;
  }

  return task;
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.dashboard.Dashboard.prototype.onDrop_ = function(e) {
  for (var k in e.target.items_) {
    var targetElement = e.target.items_[k].element;
    var sourceElement = e.dragSource.items_[k].currentDragElement_;
    if (this.todo_ == targetElement) {
      goog.dom.insertSiblingBefore(sourceElement, this.addButton_);
    } else {
      goog.dom.appendChild(targetElement, sourceElement);
    }
  }
};


/** @enum {string} */
pm.ui.dashboard.TaskState = {
  TODO: 'todo',
  IN_PROGRESS: 'inprogress',
  DONE: 'done'
};


/** @enum {string} */
pm.ui.dashboard.TaskColor = {
  BLACK: 'black',
  BLUE: 'blue',
  GRAY: 'gray',
  GREEN: 'green',
  LIGHT_BLUE: 'light-blue',
  ORANGE: 'orange',
  RED: 'red'
};
