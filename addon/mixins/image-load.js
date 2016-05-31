
import Ember from 'ember';

const {
  computed,
  getWithDefault,
  Mixin,
  run,
  set
} = Ember;

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.loaded = false;
    this.errorThrown = false;
    this.listenersNotSet = true;
  },

  classNameBindings: ['loaded', 'errorThrown'],

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  didRender() {
    this._super(...arguments);

    const image = this.$('img');
    const isCached = image[0].complete;

    if (isCached) {
      return run.scheduleOnce('afterRender', this, this._safeSet, 'loaded', true);
    }

    if (this.listenersNotSet) {
      image.one('load', () => {
        image.off('error');
        run(null, run.scheduleOnce, 'afterRender', this, this._safeSet, 'loaded', true);
      });

      image.one('error', () => {
        image.off('load');
        run(null, run.scheduleOnce, 'afterRender', this, this._safeSet, 'errorThrown', true);
      });

      this.listenersNotSet = false;
    }
  },

  _safeSet(key, val) {
    if (!(this.isDestroying || this.isDestroyed)) {
      set(this, key, val);
    }
  }
});
