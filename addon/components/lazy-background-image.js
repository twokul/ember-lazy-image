import Ember           from 'ember';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';

const { keys, computed, Component, EnumerableUtils } = Ember;
const forEach = EnumerableUtils.forEach;

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  attributeBindings: ['width', 'height', 'style'],

  style: computed('loaded', function() {
    if (!this.get('lazyUrl')) {
      return '';
    }
    return 'background-image: url(' + this.get('lazyUrl') + ')';
  }),

  classNames: ['lazy-background-image'],

  _setupAttributes: function() {
    const component = this;

    forEach(keys(component), (key) => {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        component.get('attributeBindings').pushObject(key);
      }
    });
  }
});
