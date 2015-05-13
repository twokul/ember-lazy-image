import Ember from 'ember';
import Cache from '../lib/cache';

var on        = Ember.on;
var get       = Ember.get;
var set       = Ember.set;
var Mixin     = Ember.Mixin;
var dasherize = Ember.String.dasherize;
var computed  = Ember.computed;

export default Mixin.create({
  _cache: Cache.create(),

  lazyUrl: "//:0",

  handleDidInsertElement: on('didInsertElement', function() {
    this._setupAttributes();
    this._setImageUrl();
  }),

  _setImageUrl: on('didEnterViewport', function() {
    var url             = get(this, 'url');
    var cache           = get(this, '_cache');
    var lazyUrl         = get(this, 'lazyUrl');
    var cacheKey        = get(this, '_cacheKey');
    var viewportEntered = get(this, 'viewportEntered');

    if (cacheKey && get(cache, cacheKey)) {
      set(this, 'lazyUrl', url);
    }

    if (viewportEntered && lazyUrl === "//:0") {
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
