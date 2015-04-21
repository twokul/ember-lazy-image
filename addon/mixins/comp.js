import Ember from 'ember';

const {
  get: get,
  set: set,
  Mixin,
  on
} = Ember;

export default Mixin.create({
  deprecations: on('didInsertElement', function() {
    const threshold = get(this, 'threshold');

    if (threshold) {
      set(this, 'viewportTolerance', {
        top    : threshold,
        bottom : threshold,
        left   : threshold,
        right  : threshold
      });

      Ember.deprecate('The use of `threshold` is deprecated in favor of `viewportTolerance`.');
    }
  })
});
