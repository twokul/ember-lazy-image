import Cache           from '../lib/cache';
import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import InViewportMixin from '../mixins/in-viewport';

var on        = Ember.on;
var get       = Ember.get;
var set       = Ember.set;
var keys      = Ember.keys;
var observer  = Ember.observer;
var computed  = Ember.computed;
var dasherize = Ember.String.dasherize;
var Component = Ember.Component;

export default Component.extend(InViewportMixin, ImageLoadMixin, {
  _cache: Cache.create(),

  lazyUrl: "//:0",

  classNames: ['lazy-image-container'],

  setupAttributes: on('didInsertElement', function() {
    var img       = this.$('img');
    var component = this;

    keys(component).forEach(function(key) {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        img.attr(key, component.get(key));
      }
    });
  }),

  setImageUrl: observer('enteredViewport', function() {
    var url             = get(this, 'url');
    var cache           = get(this, '_cache');
    var lazyUrl         = get(this, 'lazyUrl');
    var cacheKey        = get(this, '_cacheKey');
    var enteredViewport = get(this, 'enteredViewport');

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
  }),

  useDimensionsAttrs: computed('width', 'height', function() {
    return ! this.get('width') || ! this.get('height') ? false : true;
  })

});
