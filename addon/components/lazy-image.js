import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import InViewportMixin from '../mixins/in-viewport';

var get       = Ember.get;
var set       = Ember.set;
var observer  = Ember.observer;
var Component = Ember.Component;
var defaultLazyImage = "assets/lz-image/lazy_1x1.gif";

export default Component.extend(InViewportMixin, ImageLoadMixin, {
  threshold: 100,
  defaultLazyImage: defaultLazyImage,
  lazyUrl: defaultLazyImage,

  classNames: ['lz-image'],

  setImageUrl: observer('enteredViewport', function() {
    var lazyUrl         = get(this, 'lazyUrl');
    var enteredViewport = get(this, 'enteredViewport');

    if (enteredViewport && lazyUrl === get(this, 'defaultLazyImage')) {
      set(this, 'lazyUrl', get(this, 'url'));
    }
  }).on('didInsertElement')
});
