import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Cache from 'ember-lazy-image/lib/cache';

moduleForComponent('lazy-image', 'LazyImageComponent');

var run = Ember.run;
var get = Ember.get;

var imageSelector          = '.lazy-image';
var placeholderSelector    = '.lazy-image-placeholder';
var errorMessageSelector   = '.lazy-image-error-message';
var imageContainerSelector = '.lazy-image-container';

test('it has correct defaults', function(assert) {
  assert.expect(5);

  var component = this.subject();

  assert.equal(get(component, 'loaded'),           false);
  assert.equal(get(component, 'errorThrown'),      false);
  assert.equal(get(component, 'lazyUrl'),          "//:0");
  assert.equal(get(component, 'defaultErrorText'), 'Image failed to load');
  assert.equal(get(component, 'class'),            'lazy-image');
});

test('it renders default placeholder', function(assert) {
  assert.expect(1);

  var component = this.subject();

  this.render();

  assert.ok(component.$(placeholderSelector).length > 0, 'placeholder is correctly rendered');
});

test('it renders default error message if image fails to load', function(assert) {
  assert.expect(2);

  var component = this.subject();

  component._imageError();

  this.render();

  assert.ok(component.$(errorMessageSelector).length > 0, 'error message is correctly rendered');
  assert.ok(component.$(errorMessageSelector + ':contains("' + 'Image failed to load' + '")'), 'default error message is rendered correctly');
});

test('it leverages cache', function(assert) {
  // Setup sessionStorage
  window.sessionStorage.clear();

  run(function() {
    Cache.create();
  });

  assert.expect(1);

  var component = this.subject({
    url: 'http://emberjs.com/images/team/tdale.jpg'
  });

  this.render();

  run(function() {
    component.set('viewportEntered', true);
  });

  var lazyImages = window.sessionStorage['ember-lazy-images'];
  var cache = lazyImages ? JSON.parse(lazyImages) : lazyImages;

  assert.deepEqual(cache, {
    emberjscomimagesteamtdalejpg: true
  });
});

test('`width` and `height` bindings work correctly', function(assert) {
  assert.expect(2);

  var component = this.subject({
    width: 400,
    height: 400
  });

  this.render();

  assert.equal(component.$('img').attr('width'), 400, 'width is correct');
  assert.equal(component.$('img').attr('height'), 400, 'height is correct');
});

test('`width` and `height` are not used if set to 0 or unset', function(assert) {
  assert.expect(2);

  var component = this.subject({
    width: 400
  });

  this.render();

  assert.equal(component.$('img').attr('width'), undefined, 'width is not used');
  assert.equal(component.$('img').attr('height'), undefined, 'height is not used');
});

test('`data-*` attribute bindings work correctly', function(assert) {
  assert.expect(1);

  var component = this.subject({
    'data-person-id': 1234
  });

  this.render();

  assert.equal(component.$('img').attr('data-person-id'), 1234, 'data attribute is correct');
});

test('passing class names for the <img> element', function(assert) {
  assert.expect(1);

  var component = this.subject({
    class: 'img-responsive image-thumbnail'
  });

  this.render();

  var expected = 'lazy-image img-responsive image-thumbnail';
  assert.equal(component.$('img').attr('class'), expected);
});

test('deprecates threshold', function(assert) {
  assert.expect(2);

  const component = this.subject({
    threshold: 100
  });

  assert.throws(() => {
    this.render();
  }, new Error('The use of `threshold` is deprecated in favor of `viewportTolerance`.'));

  const expected = {
    top: 100,
    left: 100,
    bottom: 100,
    right: 100
  };

  assert.deepEqual(component.get('viewportTolerance'), expected);
});