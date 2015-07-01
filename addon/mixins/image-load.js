import Ember from 'ember';

const { on, set, run, Mixin, computed, getWithDefault } = Ember;

export default Mixin.create({
  loaded:      false,
  errorThrown: false,

  classNameBindings: ['loaded', 'errorThrown'],

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  _resolveImage: on('didRender', function() {
    const component = this;
    const image     = component.$('img');
    const isCached  = image[0].complete;

    if (!isCached) {
      image.one('load', () => {
        image.off('error');
        run.schedule('afterRender', component, () => set(component, 'loaded', true));
      });

      image.one('error', () => {
        image.off('load');
        run.schedule('afterRender', component, () => set(component, 'errorThrown', true));
      });
    } else {
      run.schedule('afterRender', component, () => set(component, 'loaded', true));
    }
  })
});
