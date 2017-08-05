[![chirashi](./logo.png)](https://chirashi.js.org)

[![npm version](https://badge.fury.io/js/chirashi-slider.svg)](https://badge.fury.io/js/chirashi-slider)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Code Climate](https://codeclimate.com/github/chirashijs/chirashi-slider/badges/gpa.svg)](https://codeclimate.com/github/chirashijs/chirashi-slider)
[![Issue Count](https://codeclimate.com/github/chirashijs/chirashi-slider/badges/issue_count.svg)](https://codeclimate.com/github/chirashijs/chirashi-slider)
[![Test Coverage](https://codeclimate.com/github/chirashijs/chirashi-slider/badges/coverage.svg)](https://codeclimate.com/github/chirashijs/chirashi-slider/coverage)
[![Build Status](https://travis-ci.org/chirashijs/chirashi-slider.svg?branch=master)](https://travis-ci.org/chirashijs/chirashi-slider)

## Intro

This library doesn't work like most slider/carousel libraries. Don't look for DOM structure, list of existings animations or features like miniatures, touch handling, you name it.
It brings only needed logic allowing you to create your own slider no matter the UX, the framework or even the platform you need.
It's not even DOM dependent so you can use it with React Native or WebGL.

Some implementation examples will come.

## How it works

This library exposes two factory functions Slider and LoopingDirectionalSlider.

Slider function create an object keeping track of what the current item should be. You can use slideUp, slideDown or slideTo and it will return the new current item considering some options. It also can slideUp automatically.
You can listen the 'update' on your Slider instance to keep track of current item changes.

LoopingDirectionalSlider returns a looping Slider with a getDisplayTimes() method to know how many time your items should be repeated. Then animHandler will be called to animate your slides with ease.

## Get started

API documentation, guide and more will come on [chirashi.js.org](http://chirashi.js.org).
Meanwhile you can find it here [docs](docs/index.md).

## Quick view

### Installation

#### Using npm / yarn (recommended)

```
yarn add chirashi-slider
```
or
```
npm i --save chirashi-slider
```

Now you can import methods in your project:

```js
import { LoopingDirectionalSlider } from 'chirashi-slider'
const slider = LoopingDirectionalSlider({
  count: 4,
  itemsPerSlide: 3,
  animHandler: (final, from, to) => console.log(`animate from ${from}, to ${to}, then display ${final}`)
})

const items = []
for (let i = 0; i < slider.getDisplayTimes(); ++i) {
  for (let j = 0; j < 4; ++j) {
    items.push(j)
  }
}

items // [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]

slider.slideTo(3)
slider.slideTo(0)
slider.slideTo(3)
slider.slideUp()
slider.slideDown()
slider.slideDown()

// logs: animate from 4, to 3, then display 7
// logs: animate from 7, to 8, then display 4
// logs: animate from 4, to 3, then display 7
// logs: animate from 7, to 8, then display 4
// logs: animate from 4, to 3, then display 7
// logs: animate from 7, to 6, then display 6
```

#### Standalone

You can download [chirashi-slider.js](https://github.com/chirashijs/chirashi-slider/releases/download/3.0.0/chirashi-slider.js) or [chirashi-slider.min.js](https://github.com/chirashijs/chirashi-slider/releases/download/3.0.0/chirashi-slider.min.js) and load it using a script tag. You can also use CDN version of those files from unpkg using the link [https://unpkg.com/chirashi-slider@latest/dist/chirashi-slider.min.js](https://unpkg.com/chirashi-slider@latest/dist/chirashi-slider.min.js). It'll create an instance of Chirashi on your window. Then use as following example

```js
const slider = ChirashiSlider({ count: 2 })

slider.slideUp()
slider.getCurrent() // 1
```
