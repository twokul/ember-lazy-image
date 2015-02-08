import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var get = Ember.get;

var errorMessageSelector   = '.await-image-error-message';
var loadingMessageSelector = '.await-image-loading';
var errorImageSelector     = '.await-image-error';

moduleForComponent('await-image', 'AwaitImageComponent');

test('it has correct defaults', function() {
  expect(5);

  var component = this.subject();

  equal(get(component, 'defaultLoadingText'), 'Loading');
  equal(get(component, 'defaultErrorText'),   'Image failed to load');
  equal(get(component, 'defaultErrorUrl'),    null);
  equal(get(component, 'loaded'), false);
  equal(get(component, 'errorThrown'), false);
});

test('it renders default loading message', function() {
  expect(2);

  var component = this.subject();

  this.append();

  ok(component.$(loadingMessageSelector).length > 0, 'loading message is correctly rendered');
  ok(component.$(loadingMessageSelector + ':contains("' + 'Loading' + '")'), 'default loading message is rendered correctly');
});

test('it renders custom loading message', function() {
  expect(2);

  var message = 'BOOOOZ';

  var component = this.subject({
    loadingText: message
  });

  this.append();

  ok(component.$(loadingMessageSelector).length > 0, 'loading message is correctly rendered');
  ok(component.$(loadingMessageSelector + ':contains("' + 'Loading' + '")'), 'default loading message is rendered correctly');
});

test('it renders default error message if image fails to load', function() {
  expect(2);

  var component = this.subject();

  component._imageError();

  this.append();

  ok(component.$(errorMessageSelector).length > 0, 'error message is correctly rendered');
  ok(component.$(errorMessageSelector + ':contains("' + 'Image failed to load' + '")'), 'default error message is rendered correctly');
});

test('it renders custom error message if image fails to load', function() {
  expect(2);

  var message = 'FOO BAAAAZ';

  var component = this.subject({
    errorText: message
  });

  component._imageError();

  this.append();

  ok(component.$(errorMessageSelector).length > 0, 'error message is correctly rendered');
  ok(component.$(errorMessageSelector + ':contains("' + message  + '")'), 'default error message is rendered correctly');
});

test('it renders custom error image if image fails to load', function() {
  expect(2);

  var component = this.subject({
    errorUrl: 'error.jpg'
  });

  component._imageError();

  this.append();

  ok(component.$(errorImageSelector).length > 0, 'error image exists');
  equal(component.$(errorImageSelector).attr('src'), 'error.jpg', 'error image url is correct');
});
