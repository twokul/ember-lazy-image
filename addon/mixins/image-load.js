import Ember from 'ember';

var on             = Ember.on;
var set            = Ember.set;
var run            = Ember.run;
var Mixin          = Ember.Mixin;
var computed       = Ember.computed;
var getWithDefault = Ember.getWithDefault;

export default Mixin.create({
  loaded:      false,
  errorThrown: false,

  classNameBindings: ['loaded:lz-image_loaded', 'errorThrown'],

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  _resolveImage: on('didInsertElement', function() {
    var component = this;
    var image     = component.$('.lz-image__img');
    var isCached  = image[0].complete;

    if (!isCached) {
      image.on('load', function() {
        if (image.attr('src') !== component.get('defaultLazyImage')) {
          component._imageLoaded();
          image.off('load error');
        }
      });

      image.on('error', function(error) {
        component._imageError(error);
        image.off('load error');
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

  willDestroyElement: function() {
    this.$('.lz-image__img').off('load error');
  }
});
