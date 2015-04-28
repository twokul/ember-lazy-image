import Cache           from '../lib/cache';
import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import InViewportMixin from 'ember-in-viewport';

var on        = Ember.on;
var get       = Ember.get;
var set       = Ember.set;
var keys      = Ember.keys;
var computed  = Ember.computed;
var dasherize = Ember.String.dasherize;
var Component = Ember.Component;
var forEach   = Ember.EnumerableUtils.forEach;

export default Component.extend(InViewportMixin, ImageLoadMixin, {
  _cache: Cache.create(),

  lazyUrl: "//:0",

  classNames: ['lazy-image-container'],

  concatenatedProperties: ['class'],

  class: ['lazy-image'],

  _classJoin: on('init', function() {
    var classArray = get(this, 'class');
    set(this, 'class', classArray.join(' '));
  }),

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

  _setupAttributes: function() {
    var img       = this.$('img');
    var component = this;

    forEach(keys(component), function(key) {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        img.attr(key, component.get(key));
      }
    });
  },

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
