import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';

const { computed, Component } = Ember;

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  attributeBindings: ['width', 'height', 'style'],

  style: computed('lazyUrl', function() {
    return 'background-image: url(' + this.get('lazyUrl') + ')';
  }),

  classNames: ['lazy-background-image'],

  _setupAttributes() {
    const component = this;
    const keys = Object.keys || Ember.keys;

    keys(component).forEach((key) => {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        component.get('attributeBindings').pushObject(key);
      }
    });
  }
});
