// import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const placeholderSelector    = '.lazy-image-placeholder';
const errorMessageSelector   = '.lazy-image-error-message';

module('LazyImageComponent', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    window.sessionStorage.clear();
  });

  test('it renders default placeholder', async function(assert) {
    assert.expect(1);

    await render(hbs`{{lazy-image}}`);

    assert.ok(this.element.querySelector(placeholderSelector), 'placeholder is correctly rendered');
  });

  test('it renders default error message if image fails to load', async function (assert) {
    assert.expect(2);

    await render(hbs`{{lazy-image errorThrown=true}}`);

    assert.ok(this.element.querySelector(errorMessageSelector), 'error message is correctly rendered');
    assert.ok(this.element.querySelector(errorMessageSelector).textContent === 'Image failed to load', 'default message is rendered correctly');
  });

  test('`width` and `height` bindings work correctly', async function(assert) {
    assert.expect(2);

    await render(hbs`{{lazy-image width=400 height=400}}`);

    assert.equal(this.element.querySelector('img').width, 400, 'width is correct');
    assert.equal(this.element.querySelector('img').height, 400, 'height is correct');
  });

  test('`width` and `height` are not used if set to 0 or unset', async function(assert) {
    assert.expect(2);

    await render(hbs`{{lazy-image width=400}}`);

    assert.equal(this.element.querySelector('img').width, 0, 'width is not used');
    assert.equal(this.element.querySelector('img').height, 0, 'height is not used');
  });

  test('`data-*` attribute bindings work correctly', async function(assert) {
    assert.expect(1);

    await render(hbs`{{lazy-image data-person-id=1234}}`);

    assert.equal(this.element.querySelector('img').getAttribute('data-person-id'), 1234, 'data attribute is correct');
  });

  test('passing class names for the <img> element', async function(assert) {
    assert.expect(1);

    await render(hbs`{{lazy-image class="img-responsive image-thumbnail"}}`);

    const expected = 'lazy-image img-responsive image-thumbnail';

    assert.equal(this.element.querySelector('img').getAttribute('class'), expected);
  });

  test('passing alt attribute for the <img> element', async function(assert) {
    assert.expect(1);

    await render(hbs`{{lazy-image alt="alternate text"}}`);

    const expected = 'alternate text';
    assert.equal(this.element.querySelector('img').getAttribute('alt'), expected);
  });

  // test('it leverages cache', async function(assert) {
  //   assert.expect(1);

  //   await render(hbs`{{lazy-image url="http://emberjs.com/images/team/tdale.jpg"}}`);

  //   run(() => {
  //     window.scrollBy({
  //       top: 100,
  //       left: 100,
  //       behavior: 'smooth'
  //     });
  //   });

  //   let lazyImages = window.sessionStorage['ember-lazy-images'];
  //   let cache = lazyImages ? JSON.parse(lazyImages) : lazyImages;

  //   assert.deepEqual(cache, {
  //     emberjscomimagesteamtdalejpg: true
  //   });
  // });
});
