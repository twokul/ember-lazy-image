import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Cache from 'ember-lazy-image/lib/cache.js';

moduleForComponent('lazy-image', 'LazyImageComponent');

var get = Ember.get;

var imageSelector          = '.lazy-image';
var placeholderSelector    = '.lazy-image-placeholder';
var errorMessageSelector   = '.lazy-image-error-message';
var imageContainerSelector = '.lazy-image-container';

test('it has correct defaults', function() {
  expect(4);

  var component = this.subject();

  equal(get(component, 'loaded'),           false);
  equal(get(component, 'errorThrown'),      false);
  equal(get(component, 'lazyUrl'),          "//:0");
  equal(get(component, 'defaultErrorText'), 'Image failed to load');
});

test('it renders default placeholder', function() {
  expect(1);

  var component = this.subject();

  this.append();

  ok(component.$(placeholderSelector).length > 0, 'placeholder is correctly rendered');
});

test('it renders default error message if image fails to load', function() {
  expect(2);

  var component = this.subject();

  component._imageError();

  this.append();

  ok(component.$(errorMessageSelector).length > 0, 'error message is correctly rendered');
  ok(component.$(errorMessageSelector + ':contains("' + 'Image failed to load' + '")'), 'default error message is rendered correctly');
});

test('it leverages cache', function() {
  // Setup sessionStorage and init cache
  window.sessionStorage.clear();
  Cache.create();

  expect(1);

  var component = this.subject({
    url: 'http://emberjs.com/images/team/tdale.jpg'
  });

  this.append();

  var lazyImages = window.sessionStorage['ember-lazy-images'];
  var cache = lazyImages ? JSON.parse(lazyImages) : lazyImages;
  
  deepEqual(cache, {
    emberjscomimagesteamtdalejpg: true
  });
});
