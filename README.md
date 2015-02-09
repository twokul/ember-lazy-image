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

```html
{{lazy-image url='http://my-valid-url.com/foo.jpg'}}
```

Component will wait until the image is loaded and while waiting it will show default
loading placeholder (seee above).

You can customize `loading` placeholder by passing it as an parameter:

```html
{{#lazy-image url='http://my-valid-url.com/foo.jpg'}}
  <!-- custom template goes here, spinner, svg, etc. -->
{{/lazy-image}}
```

You can also define the fallback if the image failed to load. By default, component will render
`Image failed to load` text.

You can customize `error` text by passing it as an parameter:

```html
{{lazy-image url='http://my-not-valid-url.com/foo.jpg' errorText='Something went wrong.'}}
```

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
