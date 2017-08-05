/**
 * chirashi-slider.js v3.0.0
 * (c) 2017 Alex Toudic
 * Released under MIT License.
 **/

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var EventEmitter = _interopDefault(require('chirashi-event-emitter'));

/**
 * Options accepted by the Slider factory function
 */


/**
 * Slider type definition
 */


/**
 * Slider factory function
 */
var Slider$1 = (function (_ref) {
  var count = _ref.count,
      _ref$begin = _ref.begin,
      begin = _ref$begin === undefined ? 0 : _ref$begin,
      _ref$loop = _ref.loop,
      loop = _ref$loop === undefined ? false : _ref$loop,
      _ref$auto = _ref.auto,
      auto = _ref$auto === undefined ? 0 : _ref$auto;

  var _emitter = EventEmitter();
  var _refreshId = void 0,
      _refreshTimes = void 0;
  var _current = begin;

  var _applyAuto = function _applyAuto(delay) {
    if (_refreshTimes-- !== 0) {
      _refreshId = setTimeout(function () {
        self.slideUp(true);
        _applyAuto(delay);
      }, delay);
    }
  };

  var self = {
    getCurrent: function getCurrent() {
      return _current;
    },


    on: _emitter.on,
    off: _emitter.off,

    slideUp: function slideUp() {
      return self.slideTo(_current + 1, 'up');
    },
    slideDown: function slideDown() {
      return self.slideTo(_current - 1, 'down');
    },

    slideTo: function slideTo(target, direction) {
      var previous = _current;

      _current = loop ? (count + target % count) % count : Math.max(Math.min(target, count - 1), 0);

      if (_current !== previous) {
        _emitter.emit('update', _current, previous, direction);
      }

      return _current;
    },
    slideAuto: function slideAuto(delay, times) {
      _refreshTimes = times && times >= 0 ? times : -1;
      _applyAuto(delay);
    },
    stopAuto: function stopAuto() {
      clearTimeout(_refreshId);
    }
  };

  if (auto) self.slideAuto(auto);

  return self;
});

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

/**
 * Options accepted by LoopingDirectionalSlider factory function
 */


/**
 * LoopingDirectionalSlider type definition
 */


/**
 * LoopingDirectionalSlider factory function
 */
var LoopingDirectionalSlider = (function (options) {
  var slider = Slider$1(_extends({}, options, { loop: true }));

  slider.on('update', function (current, previous, direction) {
    return handleChange(current, direction);
  });

  var count = options.count,
      itemsPerSlide = options.itemsPerSlide,
      animHandler = options.animHandler;


  var blockSize = 1 + (count < itemsPerSlide ? Math.ceil((itemsPerSlide - count) / count) : 0);

  var displayCurrent = count * blockSize + slider.getCurrent();

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

    animHandler(displayCurrent, previous + delta, previous);

    return index;
  };

  return _extends({}, slider, {
    getDisplayTimes: function getDisplayTimes() {
      return blockSize * 3;
    }
  });
});

exports.Slider = Slider$1;
exports['default'] = Slider$1;
exports.LoopingDirectionalSlider = LoopingDirectionalSlider;
