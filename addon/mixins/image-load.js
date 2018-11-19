import { run } from '@ember/runloop';
import Mixin from '@ember/object/mixin';
import { set, computed, getWithDefault } from '@ember/object';

export default Mixin.create({
  loaded:      false,
  errorThrown: false,

  classNameBindings: ['loaded', 'errorThrown'],

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  didRender() {
    this._super(...arguments);

    const component = this;
    const image = this.element.querySelector('img');
    const isCached  = image.complete;

    if (!isCached) {
      image.addEventListener('load', () => {
        image.removeEventListener('error');
        run.schedule('afterRender', component, () => set(component, 'loaded', true));
      });

      image.addEventListener('error', () => {
        image.removeEventListener('load');
        run.schedule('afterRender', component, () => set(component, 'errorThrown', true));
      });
    } else {
      run.schedule('afterRender', component, () => set(component, 'loaded', true));
    }
  }
});
