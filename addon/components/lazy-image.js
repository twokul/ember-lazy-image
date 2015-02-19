import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import InViewportMixin from '../mixins/in-viewport';
import cache           from '../models/cache';

var get         = Ember.get;
var set         = Ember.set;
var dasherize   = Ember.String.dasherize;
var observer    = Ember.observer;
var computed    = Ember.computed;
var Component   = Ember.Component;

export default Component.extend(InViewportMixin, ImageLoadMixin, {
  lazyUrl: "//:0",

  classNames: ['lazy-image-container'],

  setImageUrl: observer('enteredViewport', function() {
    var lazyUrl         = get(this, 'lazyUrl');
    var enteredViewport = get(this, 'enteredViewport');
    var url             = get(this, 'url');
    var cacheKey        = get(this, '_cacheKey');

    if (get(cache, cacheKey)) {
      set(this, 'lazyUrl', url);
    }

    if (enteredViewport && lazyUrl === "//:0") {
      set(this, 'lazyUrl', url);
      set(cache, cacheKey, true);
    }
  }).on('didInsertElement'),

  _cacheKey: computed('url', function() {
    var url = this.get('url');

    return dasherize(url.replace(/^http[s]?\:\/\/|\.|\//g, ''));
  })
});
