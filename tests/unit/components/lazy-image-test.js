import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('lazy-image', 'LazyImageComponent');

var get = Ember.get;

var imageSelector          = '.lz-image__img';
var placeholderSelector    = '.lz-image__placeholder';
var errorMessageSelector   = '.lz-image__error-message';
var imageContainerSelector = '.lz-image';

test('it has correct defaults', function() {
  expect(4);

  var component = this.subject();

  equal(get(component, 'loaded'),           false);
  equal(get(component, 'errorThrown'),      false);
  equal(get(component, 'lazyUrl'),          "assets/lz-image/lazy_1x1.gif");
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
