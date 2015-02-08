import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('lazy-image', 'LazyImageComponent');

var get = Ember.get;

var imageSelector          = '.lazy-image';
var placeholderSelector    = '.lazy-image-placeholder';
var imageContainerSelector = '.lazy-image-container';

test('it has correct defaults', function() {
  expect(2);

  var component = this.subject();

  equal(get(component, 'lazyUrl'),     null);
  equal(get(component, 'errorThrown'), false);
});

test('it renders default placeholder', function() {
  expect(1);

  var component = this.subject();

  this.append();

  ok(component.$(placeholderSelector).length > 0, 'placeholder is correctly rendered');
});

test('it replaces placeholder with an actual image on click event', function() {
  expect(4);

  var component = this.subject({
    url: 'foo.jpg'
  });

  this.append();

  ok(component.$(placeholderSelector).length > 0, 'placeholder is correctly rendered');

  component.$().click();

  ok(component.$().hasClass('lazy-loaded'), 'placeholder is hidden');
  ok(component.$(imageSelector).length > 0, 'image is correctly rendered');
  equal(component.$(imageSelector).attr('src'), 'foo.jpg', 'src attribute is correct');
});
