import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Cache from 'ember-lazy-image/lib/cache';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lazy-image', 'LazyImageComponent', {
  unit: true,

  beforeEach() {
    window.sessionStorage.clear();
  }
});

const { run } = Ember;
const get = Ember.get;

const placeholderSelector    = '.lazy-image-placeholder';
const errorMessageSelector   = '.lazy-image-error-message';

test('it has correct defaults', function(assert) {
  assert.expect(5);

  const component = this.subject();

  assert.equal(get(component, 'loaded'),           false);
  assert.equal(get(component, 'errorThrown'),      false);
  assert.equal(get(component, 'lazyUrl'),          null);
  assert.equal(get(component, 'defaultErrorText'), 'Image failed to load');
  assert.equal(get(component, 'class'),            'lazy-image');
});

test('it renders default placeholder', function(assert) {
  assert.expect(1);

  this.render(hbs`{{lazy-image}}`);

  assert.ok(this.$(placeholderSelector).length > 0, 'placeholder is correctly rendered');
});

test('it renders default error message if image fails to load', function(assert) {
  assert.expect(2);

  const component = this.subject();
  component.set('errorThrown', true);

  this.render();

  assert.ok(component.$(errorMessageSelector).length > 0, 'error message is correctly rendered');
  assert.ok(component.$(errorMessageSelector + ':contains("' + 'Image failed to load' + '")'), 'default error message is rendered correctly');
});

test('it leverages cache', function(assert) {
  run(() => {
    Cache.create();
  });

  assert.expect(1);

  const component = this.subject({
    url: 'http://emberjs.com/images/team/tdale.jpg'
  });

  this.render();

  run(() => {
    component.set('viewportEntered', true);
    component.trigger('didEnterViewport');
  });

  let lazyImages = window.sessionStorage['ember-lazy-images'];
  let cache = lazyImages ? JSON.parse(lazyImages) : lazyImages;

  assert.deepEqual(cache, {
    emberjscomimagesteamtdalejpg: true
  });
});

test('`width` and `height` bindings work correctly', function(assert) {
  assert.expect(2);

  const component = this.subject({
    width: 400,
    height: 400
  });

  this.render();

  assert.equal(component.$('img').attr('width'), 400, 'width is correct');
  assert.equal(component.$('img').attr('height'), 400, 'height is correct');
});

test('`width` and `height` are not used if set to 0 or unset', function(assert) {
  assert.expect(2);

  const component = this.subject({
    width: 400
  });

  this.render();

  assert.equal(component.$('img').attr('width'), undefined, 'width is not used');
  assert.equal(component.$('img').attr('height'), undefined, 'height is not used');
});

test('`data-*` attribute bindings work correctly', function(assert) {
  assert.expect(1);

  const component = this.subject({
    'data-person-id': 1234
  });

  this.render();

  assert.equal(component.$('img').attr('data-person-id'), 1234, 'data attribute is correct');
});

test('passing class names for the <img> element', function(assert) {
  assert.expect(1);

  const component = this.subject({
    class: 'img-responsive image-thumbnail'
  });

  this.render();

  const expected = 'lazy-image img-responsive image-thumbnail';
  assert.equal(component.$('img').attr('class'), expected);
});

test('passing alt attribute for the <img> element', function(assert) {
  assert.expect(1);

  const component = this.subject({
    alt: 'alternate text'
  });

  this.render();

  const expected = 'alternate text';
  assert.equal(component.$('img').attr('alt'), expected);
});
