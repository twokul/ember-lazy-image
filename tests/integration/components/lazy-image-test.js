import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lazy-image', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('url', "https://via.placeholder.com/150");
    this.set('alt', "placeholder image");
    await render(hbs`{{lazy-image url=this.url alt=this.alt}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#lazy-image url=this.url alt=this.alt}}
        template block text
      {{/lazy-image}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
