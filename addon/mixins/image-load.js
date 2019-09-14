import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import Mixin from '@ember/object/mixin';
import { getWithDefault, computed, set } from '@ember/object';

export default Mixin.create({
  loaded:      false,
  errorThrown: false,

  classNameBindings: ['loaded', 'errorThrown'],

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  // _resolveImage: on('didRender', function() {
  //   const component = this;
  //   const image     = component.element.getElementsByTagName('img')[0];
  //   const isCached  = image.complete;
  //
  //   if (!isCached) {
  //     image.onload = () => {
  //       image.onerror = null;
  //       run.schedule('afterRender', component, () => set(component, 'loaded', true));
  //     };
  //
  //     image.onerror = () => {
  //       image.onload = null;
  //       run.schedule('afterRender', component, () => set(component, 'errorThrown', true));
  //     };
  //   } else {
  //     run.schedule('afterRender', component, () => set(component, 'loaded', true));
  //   }
  // })
});
