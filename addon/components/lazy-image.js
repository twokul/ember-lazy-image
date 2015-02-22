import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import InViewportMixin from '../mixins/in-viewport';
import Cache           from '../lib/cache';

var get         = Ember.get;
var set         = Ember.set;
var dasherize   = Ember.String.dasherize;
var observer    = Ember.observer;
var computed    = Ember.computed;
var Component   = Ember.Component;

export default Component.extend(InViewportMixin, ImageLoadMixin, {
  cache: Cache.create(),
  lazyUrl: "//:0",

  classNames: ['lazy-image-container'],

  setImageUrl: observer('enteredViewport', function() {
    var lazyUrl         = get(this, 'lazyUrl');
    var enteredViewport = get(this, 'enteredViewport');
    var url             = get(this, 'url');
    var cache           = get(this, 'cache');
    var cacheKey        = get(this, '_cacheKey');

    if (cacheKey && get(cache, cacheKey)) {
      set(this, 'lazyUrl', url);
    }

    if (enteredViewport && lazyUrl === "//:0") {
      set(this, 'lazyUrl', url);

      if (cacheKey) {
        set(cache, cacheKey, true);
      }
    }
  }).on('didInsertElement'),

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
