import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';

const { on, get, set, computed, Component } = Ember;

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  classNames: ['lazy-image-container'],

  concatenatedProperties: ['class'],

  class: ['lazy-image'],

  _classJoin: on('init', function() {
    const classArray = get(this, 'class');
    set(this, 'class', classArray.join(' '));
  }),

  _setupAttributes() {
    const img       = this.$('img');
    const component = this;
    const keys = Object.keys || Ember.keys;

    keys(component).forEach((key) => {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        img.attr(key, component.get(key));
      }
    });
  },

  useDimensionsAttrs: computed('width', 'height', function() {
    return !this.get('width') || !this.get('height') ? false : true;
  })
});
