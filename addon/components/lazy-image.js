import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import InViewportMixin from '../mixins/in-viewport';

var get       = Ember.get;
var set       = Ember.set;
var observer  = Ember.observer;
var Component = Ember.Component;

export default Component.extend(InViewportMixin, ImageLoadMixin, {
  lazyUrl: "//:0",

  classNames: ['lazy-image-container'],

  setImageUrl: observer('enteredViewport', function() {
    var lazyUrl         = get(this, 'lazyUrl');
    var enteredViewport = get(this, 'enteredViewport');

    if (enteredViewport && lazyUrl === "//:0") {
      set(this, 'lazyUrl', get(this, 'url'));
    }
  }).on('didInsertElement')
});
