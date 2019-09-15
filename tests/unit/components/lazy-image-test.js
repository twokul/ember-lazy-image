import { get } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('LazyImageComponent', function(hooks) {
  setupTest(hooks);

  test('it has correct defaults', function(assert) {
    assert.expect(5);

    const component = this.owner.factoryFor('component:lazy-image').create();

    assert.equal(get(component, 'loaded'),           false);
    assert.equal(get(component, 'errorThrown'),      false);
    assert.equal(get(component, 'lazyUrl'),          null);
    assert.equal(get(component, 'defaultErrorText'), 'Image failed to load');
    assert.equal(get(component, 'classNames').length, 2);
  });
});
