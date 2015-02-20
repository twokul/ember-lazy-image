// Inspired by Lauren Tan
// https://medium.com/delightful-ui-for-ember-apps/ember-js-detecting-if-a-dom-element-is-in-the-viewport-eafcc77a6f86

import Ember from 'ember';

var on           = Ember.on;
var get          = Ember.get;
var Mixin        = Ember.Mixin;
var debounce     = Ember.run.debounce;
var scheduleOnce = Ember.run.scheduleOnce;

export default Mixin.create({
  scrollTimeout:   100,
  enteredViewport: null,
  threshold:       0,

  _setViewport: function() {
    var rect      = this.$()[0].getBoundingClientRect();
    var threshold = get(this, 'threshold');

    this.set('enteredViewport',
      rect.top >= 0 &&
      rect.left >= 0 &&
      (rect.bottom - threshold) <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  _setInitialViewport: on('didInsertElement', function() {
    scheduleOnce('afterRender', this, function() {
      this._setViewport();
    });
  }),

  _scrollHandler: function() {
    debounce(this, function() {
      this._setViewport();
    }, get(this, 'scrollTimeout'));
  },

  _bindScroll: on('didInsertElement', function() {
    var component = this;

    Ember.$(document).on('touchmove.scrollable', function() {
      component._scrollHandler();
    });

    Ember.$(window).on('scroll.scrollable', function() {
      component._scrollHandler();
    });
  }),

  _unbindScroll: on('willDestroyElement', function() {
    Ember.$(window).off('.scrollable');
    Ember.$(document).off('.scrollable');
  }),
});
