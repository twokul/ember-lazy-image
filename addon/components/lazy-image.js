import { computed, set } from '@ember/object';
import Component from '@ember/component';
import ImageLoadMixin  from '../mixins/image-load';
import LazyImageMixin  from '../mixins/lazy-image';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, ImageLoadMixin, LazyImageMixin, {
  classNames: ['lazy-image-container', 'lazy-image'],

  concatenatedProperties: ['class'],

  init() {
    this._super(...arguments);
    // const classArray = get(this, 'class');
    // set(this, 'class', classArray.join(' '));
    set(this, 'viewportSpy', true);
  },

  _setupAttributes() {
    const component = this;
    const img = component.element.getElementsByTagName('img')[0];
    const keys = Object.keys;

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
