import Ember from 'ember';
import Cache from '../lib/cache';

const { on, get, set, Mixin, computed } = Ember;
const dasherize = Ember.String.dasherize;

export default Mixin.create({
  _cache: Cache.create(),

  lazyUrl: null,

  handleDidInsertElement: on('didInsertElement', function() {
    this._setupAttributes();
    this._setImageUrl();
  }),

  _setImageUrl: on('didEnterViewport', function() {
    const url             = get(this, 'url');
    const cache           = get(this, '_cache');
    const lazyUrl         = get(this, 'lazyUrl');
    const cacheKey        = get(this, '_cacheKey');
    const viewportEntered = get(this, 'viewportEntered');

    if (cacheKey && get(cache, cacheKey)) {
      set(this, 'lazyUrl', url);
    }

    if (viewportEntered && lazyUrl === null) {
      set(this, 'lazyUrl', url);

      if (cacheKey) {
        set(cache, cacheKey, true);
      }
    }
  }),

  _cacheKey: computed('url', function() {
    var url = this.get('url');
    var key;

    if (url) {
      key = dasherize(url.replace(/^http[s]?\:\/\/|\.|\//g, ''));
    }

    if (key) {
      return key;
    }
  })
});
