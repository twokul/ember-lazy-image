'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included(app);

    app.import('vendor/lazy-image/lazy-image.css');
  }
};
