import { getWithDefault, set, computed } from '@ember/object';
import Component from '@ember/component';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  classNames: ['lazy-image-container'],

  concatenatedProperties: ['class'],

  init() {
    this._super(...arguments);

    const classArray = ['lazy-image'];
    const customClasses = getWithDefault(this, 'class', []);

    set(this, 'class', classArray.concat(customClasses).join(' '));
  },

  _setupAttributes() {
    const img       = this.element.querySelector('img');
    const component = this;
    const keys = Object.keys;

    keys(component).forEach((key) => {
      if (key.substr(0, 5) === 'data-' && !key.match(/Binding$/)) {
        img.setAttribute(key, component.get(key));
      }
    });
  },

  useDimensionsAttrs: computed('width', 'height', function() {
    return !this.get('width') || !this.get('height') ? false : true;
  })
});
