/**
 * ChirashiSlider.js v3.0.0
 * (c) 2017 Alex Toudic
 * Released under MIT License.
 **/

import EventEmitter from 'chirashi-event-emitter';

var Slider = function Slider(_ref) {
  var emitter = _ref.emitter,
      count = _ref.count,
      _ref$begin = _ref.begin,
      begin = _ref$begin === undefined ? 0 : _ref$begin,
      _ref$loop = _ref.loop,
      loop = _ref$loop === undefined ? false : _ref$loop;

  if (!emitter) {
    emitter = EventEmitter();
  }

  var current = begin;

  var slideTo = function slideTo(target) {
    var previous = current;

    current = loop ? (count + target % count) % count : Math.max(Math.min(target, count - 1), 0);

    if (current !== previous) {
      emitter.emit('update', current, previous);
    }

    return current;
  };

  var slideUp = function slideUp() {
    return slideTo(current + 1);
  };

  var slideDown = function slideDown() {
    return slideTo(current - 1);
  };

  return {
    get current() {
      return current;
    },

    on: emitter.on,
    off: emitter.off,

    slideTo: slideTo,
    slideUp: slideUp,
    slideDown: slideDown
  };
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var defaults$$1 = {
  begin: 0
};

var DirectionalSlider = function DirectionalSlider(options) {
  var emitter = EventEmitter();

  var base = Slider(_extends({}, options, { emitter: emitter, loop: true }));
  var _slideUp = base.slideUp,
      _slideDown = base.slideDown,
      _slideTo = base.slideTo;

  var _defaults$options = _extends({}, defaults$$1, options),
      begin = _defaults$options.begin,
      count = _defaults$options.count,
      itemsPerSlide = _defaults$options.itemsPerSlide;

  var blockSize = 1 + (count < itemsPerSlide ? Math.ceil((itemsPerSlide - count) / count) : 0);

  var displayCurrent = count * blockSize + begin;

  var handleChange = function handleChange(index, forcedDirection) {
    var previous = displayCurrent;
    displayCurrent = count * blockSize + index;

    var upOffset = (count + (displayCurrent - previous) % count) % count;
    var downOffset = upOffset - count;

    var delta = void 0;
    if (forcedDirection === 'down') {
      delta = downOffset;
    }if (forcedDirection === 'up') {
      delta = upOffset;
    } else {
      delta = -downOffset < upOffset ? downOffset : upOffset;
    }

    emitter.emit('animate', displayCurrent, previous + delta, previous);
  };

  return Object.assign(base, {
    get displayTimes() {
      return blockSize * 3;
    },

    slideUp: function slideUp() {
      handleChange(_slideUp(), 'up');
    },
    slideDown: function slideDown() {
      handleChange(_slideDown(), 'down');
    },
    slideTo: function slideTo(index) {
      handleChange(_slideTo(index));
    }
  });
};

export { DirectionalSlider, Slider };
