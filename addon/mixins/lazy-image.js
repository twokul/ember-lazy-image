import { storageFor } from 'ember-local-storage';
import Mixin from '@ember/object/mixin';
import { dasherize } from '@ember/string';
import { get, set, computed, setProperties } from '@ember/object';

export default Mixin.create({
  didInsertElement() {
    setProperties(this, {
      viewportScrollSensitivity: 20,
      viewportListeners: [
        { context: window, event: 'scroll.scrollable' },
        { context: window, event: 'resize.resizable' },
        { context: document, event: 'touchmove.scrollable' }
      ]
    });

    this._super(...arguments);
  },

  _cache: storageFor('lazy-image'),

  lazyUrl: null,

  didRender() {
    this._super(...arguments);
    this._setupAttributes();
  },

  didInitAttrs() {
    this._super(...arguments);
    this._setImageUrl();
  },

  didEnterViewport() {
    this._super(...arguments);

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
  },

  _cacheKey: computed('url', function() {
    var url = this.get('url');
    var key;

    if (url) {
      // eslint-disable-next-line
      key = dasherize(url.replace(/^http[s]?\:\/\/|\.|\//g, ''));
    }

    if (key) {
      return key;
    }
  })
});
