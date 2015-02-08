# ember-lazy-image

[![Build Status](https://travis-ci.org/twokul/ember-lazy-image.svg)](https://travis-ci.org/twokul/ember-lazy-image)

`ember-lazy-image` is a component that allows you to gracefully handle image loading.

### Usage

```sh
npm install ember-lazy-image --save
```

There are severals ways you might use `ember-lazy-image`:

```html
{{lazy-image url='http://my-valid-url.com/foo.jpg'}}
```

Component will wait until the image is loaded and while waiting it will show `Loading...` text.

You can customize `loading` text by passing it as an parameter:

```html
{{lazy-image url='http://my-valid-url.com/foo.jpg' loadingText='At least you are not on hold...'}}
```

Let's say you want to show the spinner or svg element while the image is loading:

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

Or can even define a fallback image to show:

```html
{{lazy-image url='http://my-not-valid-url.com/foo.jpg' errorUrl='http://my-valid-error-url.com/error.jpg'}}
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
