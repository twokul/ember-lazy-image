/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-lazy-image',

  included: function emberLazyImageIncluded(app) {
    this._super.included(app);

    app.import('vendor/lazy-image/lazy-image.css');
  }
};
