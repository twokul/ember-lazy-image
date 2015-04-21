# ember-lazy-image

[![Build Status](https://travis-ci.org/twokul/ember-lazy-image.svg)](https://travis-ci.org/twokul/ember-lazy-image)

`ember-lazy-image` is a component that allows you to gracefully handle image loading.

Component will load images lazily, only if they appeared in the view port.
This optimization brings page load time down.

Default loading placeholder is stolen from [aurer](https://github.com/aurer) and his awesome [codepen](http://codepen.io/aurer/pen/jEGbA).

### Usage

```sh
npm install ember-lazy-image --save
```

### lazy-image

```hbs
{{lazy-image url='http://my-valid-url.com/foo.jpg'}}
```

Component will wait until the image is loaded and while waiting it will show default
loading placeholder (see above).

You can customize `loading` placeholder by passing it as an parameter:

```hbs
{{#lazy-image url='http://my-valid-url.com/foo.jpg'}}
  <!-- custom template goes here, spinner, svg, etc. -->
{{/lazy-image}}
```

You can also define the fallback if the image failed to load. By default, component will render
`Image failed to load` text.

You can customize `error` text by passing it as an parameter:

```hbs
{{lazy-image url='http://my-not-valid-url.com/foo.jpg' errorText='Something went wrong.'}}
```

### `width`, `height` and `data-*` attributes

Lazy Image supports `width`, `height` and `data-*` attribute bindings.

```hbs
{{lazy-image url='http://my-valid-url.com/foo.jpg' width=400 height=400 data-foo-bar="my-foo-bar"}}
{{lazy-image url='http://my-valid-url.com/foo.jpg' width=400 height=400 data-foo-bar=foo.bar.path}}
```

### `class` attribute

You can also pass class names for the image element.

```hbs
{{lazy-image url='http://my-valid-url.com/foo.jpg' class='foo-bar baz-bar'}}
```

### ember-in-viewport options

Lazy Image uses `ember-in-viewport` for viewport detaction. Due to the way listeners and `requestAnimationFrame` is setup, you'll have to override the `ember-in-viewport` options by creating `app/components/lazy-image.js`:

```js
// app/components/lazy-image.js

import Ember form 'ember';
import LazyImage from 'ember-lazy-image/components/lazy-image';

export default LazyImage.extend({
  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportUseRAF      : true,
      viewportSpy         : false,
      viewportRefreshRate : 150,
      viewportTolerance: {
        top    : 50,
        bottom : 50,
        left   : 20,
        right  : 20
      }
    });
  })
});
```

See [Advanced usage (options)](https://github.com/dockyard/ember-in-viewport/blob/develop/README.md#advanced-usage-options) for more in detail `ember-in-viewport` options.

The use of `threshold` is deprecated in favor of `viewportTolerance`.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
