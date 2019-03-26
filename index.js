'use strict';

module.exports = {
  name: require('./package').name,

  included: function emberLazyImageIncluded(app) {
    this._super.included(app);

    app.import('vendor/lazy-image/lazy-image.css');
  }
};
