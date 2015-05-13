import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';

var keys      = Ember.keys;
var computed  = Ember.computed;
var Component = Ember.Component;
var forEach   = Ember.EnumerableUtils.forEach;

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  attributeBindings: ['width', 'height', 'style'],

  style: computed('lazyUrl', function() {
    return 'background-image: url(' + this.get('lazyUrl') + ')';
  }),

  classNames: ['lazy-background-image'],

  _setupAttributes: function() {
    var div       = this.$();
    var component = this;

    forEach(keys(component), function(key) {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        div.attr(key, component.get(key));
      }
    });
  }
});
