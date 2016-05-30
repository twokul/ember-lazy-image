/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-lazy-image',

  included: function emberLazyImageIncluded(app) {
    this._super.included(app);
    
    if(app.options.imageLazyLoad && app.options.imageLazyLoad.excludeCss){ return; }
    
    app.import('vendor/lazy-image/lazy-image.css');
  }
};
