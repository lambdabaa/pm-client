
goog.provide('pm.Routes');

goog.require('pm.api.Client');
goog.require('pm.ui.calendar.Calendar');
goog.require('pm.ui.dashboard.Dashboard');
goog.require('pm.ui.profile.Profile');
goog.require('pm.ui.progress.Progress');



/**
 * @constructor
 */
pm.Routes = function() {
  /**
   * @type {Element}
   * @private
   */
  this.container_ = goog.dom.getElementByClass('content');

  /**
   * @type {pm.ui.calendar.Calendar}
   * @private
   */
  this.calendar_ = null;


  /**
   * @type {pm.ui.dashboard.Dashboard}
   * @private
   */
  this.dashboard_ = null;

  /**
   * @type {pm.ui.profile.Profile}
   * @private
   */
  this.profile_ = null;

  /**
   * @type {pm.ui.progress.Progress}
   * @private
   */
  this.progress_ = null;
};


/** #!/calendar */
pm.Routes.prototype.enterCalendar = function() {
  if (this.calendar_) {
    goog.style.showElement(this.calendar_.element_, true);
  } else {
    this.calendar_ = new pm.ui.calendar.Calendar();
    this.calendar_.render(this.container_);
  }
};


/** #!/calendar */
pm.Routes.prototype.exitCalendar = function() {
  goog.style.showElement(this.calendar_.element_, false);
};


/** #!/dashboard */
pm.Routes.prototype.enterDashboard = function() {
  if (this.dashboard_) {
    goog.style.showElement(this.dashboard_.element_, true);
  } else {
    this.dashboard_ = new pm.ui.dashboard.Dashboard();
    this.dashboard_.render(this.container_);
    pm.api.Client.getTasks(this.dashboard_.onTasks, this.dashboard_);
  }
};


/** #!/dashboard */
pm.Routes.prototype.exitDashboard = function() {
  goog.style.showElement(this.dashboard_.element_, false);
};


/** #!/profile */
pm.Routes.prototype.enterProfile = function() {
  if (this.profile_) {
    goog.style.showElement(this.profile_.element_, true);
  } else {
    this.profile_ = new pm.ui.profile.Profile();
    this.profile_.render(this.container_);
  }
};


/** #!/profile */
pm.Routes.prototype.exitProfile = function() {
  goog.style.showElement(this.profile_.element_, false);
};


/** #!/progress */
pm.Routes.prototype.enterProgress = function() {
  if (this.progress_) {
    goog.style.showElement(this.progress_.element_, true);
  } else {
    this.progress_ = new pm.ui.progress.Progress();
    this.progress_.render(this.container_);
  }
};


/** #!/progress */
pm.Routes.prototype.exitProgress = function() {
  goog.style.showElement(this.progress_.element_, false);
};
