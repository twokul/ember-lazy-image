import Ember from 'ember';

const { on, set, run, Mixin, computed, getWithDefault } = Ember;

export default Mixin.create({
  loaded:      false,
  errorThrown: false,

  classNameBindings: ['loaded', 'errorThrown'],

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  _resolveImage: on('didInsertElement', function() {
    const component = this;
    const image     = component.$('img');
    const isCached  = image[0].complete;

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
    const component = this;

    run(() => {
      set(component, 'loaded', true);
    });
  },

  _imageError: function() {
    const component = this;

    run(() => {
      set(component, 'errorThrown', true);
    });
  },

  willDestroyElement: function() {
    this.$('img').off('load');
    this.$('img').off('error');
  }
});
