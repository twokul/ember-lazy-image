import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lazy-image', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    window.sessionStorage.clear();
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('url', "https://via.placeholder.com/150");
    this.set('alt', "placeholder image");
    await render(hbs`{{lazy-image url=this.url alt=this.alt}}`);

    assert.dom(this.element).hasText('');

    assert.equal(this.element.querySelectorAll('img').length, 1);

    // Template block usage:
    await render(hbs`
      {{#lazy-image url=this.url alt=this.alt}}
        template block text
      {{/lazy-image}}
    `);

    assert.dom(this.element).hasText('template block text');
    assert.equal(this.element.querySelectorAll('img').length, 1);
  });

  test('it renders default placeholder', async function(assert) {
    const placeholderSelector    = '.lazy-image-placeholder';

    await render(hbs`{{lazy-image}}`);

    assert.equal(this.element.querySelectorAll(placeholderSelector).length, 1);
  });

  test('it renders default error message if image fails to load', async function(assert) {
    const errorMessageSelector   = '.lazy-image-error-message';
    const errorMessageText = 'Image failed to load';

    await render(hbs`{{lazy-image errorThrown=true}}`);

    assert.equal(this.element.querySelectorAll(errorMessageSelector).length, 1);
    assert.equal(this.element.querySelector(errorMessageSelector).textContent.trim(), errorMessageText);
  });

  test('it leverages cache', async function(assert) {
    this.set('url', "https://via.placeholder.com/150");

    await render(hbs`{{lazy-image url=this.url}}`);

    let lazyImages = window.sessionStorage['storage:cache'];
    let cache = lazyImages ? JSON.parse(lazyImages) : lazyImages;

    assert.deepEqual(cache, {
      viaplaceholdercom150: true
    });
  });

  test('`width` and `height` bindings work correctly', async function(assert) {
    this.set('url', "https://via.placeholder.com/150");

    await render(hbs`{{lazy-image url=this.url width=400 height=400}}`);

    assert.equal(this.element.querySelector('img').getAttribute('height'), 400);
    assert.equal(this.element.querySelector('img').getAttribute('width'), 400);
  });

  test('`width` and `height` are not used if set to 0 or unset', async function(assert) {
    this.set('url', "https://via.placeholder.com/150");

    await render(hbs`{{lazy-image url=this.url width=400}}`);

    assert.equal(this.element.querySelector('img').getAttribute('height'), undefined);
    assert.equal(this.element.querySelector('img').getAttribute('width'), undefined);
  });

  test('`data-*` attribute bindings work correctly', async function(assert) {
    this.set('url', "https://via.placeholder.com/150");

    await render(hbs`{{lazy-image url=this.url data-person-id=1234}}`);


    assert.equal(this.element.querySelector('img').getAttribute('data-person-id'), 1234);
  });

  test('passing class names for the <img> element', async function(assert) {
    this.set('url', "https://via.placeholder.com/150");

    await render(hbs`{{lazy-image url=this.url class='img-responsive image-thumbnail'}}`);

    const expected = 'lazy-image-container lazy-image img-responsive image-thumbnail';
    assert.equal(this.element.querySelector('img').getAttribute('class'), expected);
  });

  test('passing alt attribute for the <img> element', async function(assert) {
    this.set('url', "https://via.placeholder.com/150");

    await render(hbs`{{lazy-image url=this.url alt='alternate text'}}`);

    const expected = 'alternate text';
    assert.equal(this.element.querySelector('img').getAttribute('alt'), expected);
  });
});
