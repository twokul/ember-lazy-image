import Ember from 'ember';

var get       = Ember.get;
var set       = Ember.set;
var computed  = Ember.computed;
var Component = Ember.Component;

export default Component.extend({
  lazyUrl: null,

  classNames: ['lazy-image-container'],

  classNameBindings: ['lazyLoaded'],

  lazyLoaded: computed('lazyUrl', function() {
    var lazyUrl = get(this, 'lazyUrl');

    return !!lazyUrl;
  }),

  click: function() {
    set(this, 'lazyUrl', get(this, 'url'));
  }
});
