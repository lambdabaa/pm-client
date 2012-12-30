
goog.provide('pm.ui.task.Task');

goog.require('goog.events');
goog.require('goog.fx.AbstractDragDrop');
goog.require('goog.fx.DragDrop');
goog.require('goog.ui.Component');
goog.require('pm.api.Client');
goog.require('pm.ui.task.TaskDeleteButton');
goog.require('pm.ui.task.TaskEditButton');
goog.require('pm.ui.task.TaskState');
goog.require('pm.ui.task.taskmodal');
goog.require('soy');



/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {Object} response
 * @param {pm.ui.task.TaskState} state
 * @param {string} text
 * @param {Array.<goog.fx.DragDrop>} targets
 */
pm.ui.task.Task = function(response, state, text, targets) {
  goog.base(this);

  /**
   * @type {Object}
   */
  this.response = response;

  /**
   * @type {pm.ui.task.TaskState}
   */
  this.state = state;

  /**
   * @type {string}
   */
  this.text = text;

  /**
   * @type {Array.<goog.fx.DragDrop>}
   */
  this.targets = targets;

  /**
   * @type {pm.ui.task.TaskDeleteButton}
   * @private
   */
  this.deleteButton_ = new pm.ui.task.TaskDeleteButton();

  /**
   * @type {pm.ui.task.TaskEditButton}
   * @private
   */
  this.editButton_ = new pm.ui.task.TaskEditButton();

  /**
   * @type {Element}
   * @private
   */
  this.modal_;
};
goog.inherits(pm.ui.task.Task, goog.ui.Component);


/**
 * @param {Object} response
 * @return {pm.ui.task.Task}
 */
pm.ui.task.Task.responseToTask = function(response) {
  var text = response.body;
  var state = pm.ui.task.TaskState.deserialize(response.state);
  return new pm.ui.task.Task(response, state, text, []);
};


/** @inheritDoc */
pm.ui.task.Task.prototype.enterDocument = function() {
  var button;
  button = goog.dom.createDom('div');
  goog.dom.classes.add(button, 'task-delete-button');
  goog.dom.classes.add(button, 'task-delete-' + this.response.id);
  this.deleteButton_.render(button);
  goog.dom.appendChild(this.element_, button);

  button = goog.dom.createDom('div');
  goog.dom.classes.add(button, 'task-edit-button');
  goog.dom.classes.add(button, 'task-edit-' + this.response.id);
  this.editButton_.render(button);
  goog.dom.appendChild(this.element_, button);

  this.element_.innerHTML += this.text;

  goog.dom.classes.add(this.element_, 'task');
  $(this.element_).tooltip({
    title: 'Drag me to change my status!',
    delay: {
      show: 2500,
      hide: 0
    }
  });

  var source = new goog.fx.DragDrop(this.element_, { task: this });
  for (var k in this.targets) {
    var target = this.targets[k];
    source.addTarget(target);
  }
  source.init();

  this.setColor_();

  goog.events.listen(
      goog.dom.getElementByClass('task-delete-' + this.response.id),
      goog.events.EventType.CLICK,
      goog.bind(this.onDeleteButtonClick_, this));
  goog.events.listen(
      goog.dom.getElementByClass('task-edit-' + this.response.id),
      goog.events.EventType.CLICK,
      goog.bind(this.onEditButtonClick_, this));
};


/** @inheritDoc */
pm.ui.task.Task.prototype.exitDocument = function() {
  goog.events.unlisten(
      goog.dom.getElementByClass('task-delete-' + this.response.id),
      goog.events.EventType.CLICK,
      goog.bind(this.onDeleteButtonClick_, this));
  goog.events.unlisten(
      goog.dom.getElementByClass('task-edit-' + this.response.id),
      goog.events.EventType.CLICK,
      goog.bind(this.onEditButtonClick_, this));

  // unlisten to things that close this modal
  var closers =
      goog.dom.getElementsByClass('modal-close-' + this.response.id);
  for (var i = 0; i < closers.length; i++) {
    var closer = closers[i];
    goog.events.unlisten(closer, goog.events.EventType.CLICK,
        goog.bind(this.onModalClose_, this));
  }

  // unlisten to things that save the data
  var savers =
      goog.dom.getElementsByClass('modal-save-' + this.response.id);
  for (var i = 0; i < savers.length; i++) {
    var saver = savers[i];
    goog.events.unlisten(saver, goog.events.EventType.CLICK,
        goog.bind(this.onModalSave_, this));
  }
};


/**
 * @param {pm.ui.task.TaskState} state
 */
pm.ui.task.Task.prototype.setState = function(state) {
  if (state != this.state) {
    this.state = state;
    this.setColor_();

    // TODO(gareth): Add a callback here that informs the user if the
    // sync with the server failed.
    this.response.state = pm.ui.task.TaskState.serialize(state);
    pm.api.Client.updateTask(this.response.id, this.response, null, null);
  }
};


/**
 * @param {string} text
 */
pm.ui.task.Task.prototype.setText = function(text) {
  if (text != this.text) {
    // Stop listening to buttons
    goog.events.unlisten(
        goog.dom.getElementByClass('task-delete-' + this.response.id),
        goog.events.EventType.CLICK,
        goog.bind(this.onDeleteButtonClick_, this));
    goog.events.unlisten(
        goog.dom.getElementByClass('task-edit-' + this.response.id),
        goog.events.EventType.CLICK,
        goog.bind(this.onEditButtonClick_, this));

    this.element_.innerHTML =
        this.element_.innerHTML.replace(this.text, text);
    this.text = text;

    // Listen to buttons again
    goog.events.listen(
        goog.dom.getElementByClass('task-delete-' + this.response.id),
        goog.events.EventType.CLICK,
        goog.bind(this.onDeleteButtonClick_, this));
    goog.events.listen(
        goog.dom.getElementByClass('task-edit-' + this.response.id),
        goog.events.EventType.CLICK,
        goog.bind(this.onEditButtonClick_, this));

    // TODO(gareth): Sync with server
    this.response.body = text;
    pm.api.Client.updateTask(this.response.id, this.response, null, null);
  }
};


/**
 * @private
 */
pm.ui.task.Task.prototype.setColor_ = function() {
  goog.dom.classes.remove(this.element_, 'task-todo');
  goog.dom.classes.remove(this.element_, 'task-inprogress');
  goog.dom.classes.remove(this.element_, 'task-done');

  switch (this.state) {
    case pm.ui.task.TaskState.TODO:
      goog.dom.classes.add(this.element_, 'task-todo');
      break;
    case pm.ui.task.TaskState.IN_PROGRESS:
      goog.dom.classes.add(this.element_, 'task-inprogress');
      break;
    case pm.ui.task.TaskState.DONE:
      goog.dom.classes.add(this.element_, 'task-done');
      break;
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.task.Task.prototype.onDeleteButtonClick_ = function(e) {
  goog.style.showElement(this.element_, false);
  pm.api.Client.destroyTask(this.response.id, null, null);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.task.Task.prototype.onEditButtonClick_ = function(e) {
  if (this.modal_) {
    // Just show the modal
    goog.style.showElement(this.modal_, true);
  } else {
    // Build the modal
    this.modal_ =
        goog.dom.createDom('div', { id: 'task-modal-' + this.response.id });
    goog.dom.classes.add(this.modal_, 'modal');
    soy.renderElement(this.modal_, pm.ui.task.taskmodal.edit, {
        id: this.response.id,
        body: this.text
    });
    goog.dom.appendChild(document.body, this.modal_);

    // Listen to things that close this modal
    var closers =
        goog.dom.getElementsByClass('modal-close-' + this.response.id);
    for (var i = 0; i < closers.length; i++) {
      var closer = closers[i];
      goog.events.listen(closer, goog.events.EventType.CLICK,
          goog.bind(this.onModalClose_, this));
    }

    // Listen to things that save the data
    var savers =
        goog.dom.getElementsByClass('modal-save-' + this.response.id);
    for (var i = 0; i < savers.length; i++) {
      var saver = savers[i];
      goog.events.listen(saver, goog.events.EventType.CLICK,
          goog.bind(this.onModalSave_, this));
    }
  }

  var modalBackdrop = goog.dom.getElementByClass('modal-backdrop');
  if (modalBackdrop) {
    goog.style.showElement(modalBackdrop, true);
  } else {
    goog.dom.appendChild(
        document.body, soy.renderAsFragment(pm.ui.task.taskmodal.backdrop));
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.task.Task.prototype.onModalClose_ = function(e) {
  var textarea =
      goog.dom.getElementByClass('task-editor-textarea-' + this.response.id);
  textarea.value = textarea.innerHTML;
  goog.style.showElement(this.modal_, false);
  goog.style.showElement(goog.dom.getElementByClass('modal-backdrop'), false);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
pm.ui.task.Task.prototype.onModalSave_ = function(e) {
  var textarea =
      goog.dom.getElementByClass('task-editor-textarea-' + this.response.id);
  textarea.innerHTML = textarea.value;
  this.setText(textarea.value);
  goog.style.showElement(this.modal_, false);
  goog.style.showElement(goog.dom.getElementByClass('modal-backdrop'), false);
};
