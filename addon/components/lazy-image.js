import Ember from 'ember';

var on             = Ember.on;
var run            = Ember.run;
var set            = Ember.set;
var computed       = Ember.computed;
var Component      = Ember.Component;
var getWithDefault = Ember.getWithDefault;

export default Component.extend({
  loaded:      false,
  errorThrown: false,

  classNames: ['lazy-image-container'],

  classNameBindings: ['loaded', 'errorThrown'],

  defaultErrorUrl: computed('errorUrl', function() {
    return getWithDefault(this, 'errorUrl', null);
  }),

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  defaultLoadingText: computed('loadingText', function() {
    return getWithDefault(this, 'loadingText', 'Loading');
  }),

  _resolveImage: on('didInsertElement', function() {
    var component = this;
    var image     = component.$('img');
    var isCached  = image[0].complete;

    if (!isCached) {
      image.on('load', function() {
        component._imageLoaded();
      });

      image.on('error', function(error) {
        component._imageError(error);
      });
    } else {
      this._imageLoaded();
    }
  }),

  _imageLoaded: function() {
    var component = this;

    run(function() {
      set(component, 'loaded', true);
    });
  },

  _imageError: function() {
    var component = this;

    run(function() {
      set(component, 'errorThrown', true);
    });
  },

  willDestroy: function() {
    this.$('img').off('load');
    this.$('img').off('error');
  }
});
