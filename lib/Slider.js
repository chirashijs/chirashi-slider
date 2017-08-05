// @flow

import EventEmitter from 'chirashi-event-emitter'

/**
 * Options accepted by the Slider factory function
 */
type SliderOptions = {
  count: number, // number of slides
  begin?: number, // index of initial slide
  loop?: boolean, // should the slider loop
  auto?: number // delay between two automatic slide up
}

/**
 * Slider type definition
 */
type TSlider = {
  getCurrent(): number,
  on: typeof TEventEmitter.on,
  off: typeof TEventEmitter.off,
  slideUp(): number,
  slideDown(): number,
  slideTo(target: number, direction: 'up' | 'down'): number,
  slideAuto(delay: number, times: ?number): void,
  stopAuto(): void
}

/**
 * Slider factory function
 */
export default ({ count, begin = 0, loop = false, auto = 0 }: SliderOptions): TSlider => {
  const _emitter: TEventEmitter = EventEmitter()
  let _refreshId: number, _refreshTimes: number
  let _current: number = begin

  const _applyAuto = (delay: number): void => {
    if (_refreshTimes-- !== 0) {
      _refreshId = setTimeout(() => {
        self.slideUp(true)
        _applyAuto(delay)
      }, delay)
    }
  }

  const self: TSlider = {
    getCurrent (): number {
      return _current
    },

    on: _emitter.on,
    off: _emitter.off,

    slideUp: (): number => self.slideTo(_current + 1, 'up'),
    slideDown: (): number => self.slideTo(_current - 1, 'down'),

    slideTo (target: number, direction: 'up' | 'down'): number {
      const previous: typeof _current = _current

      _current = loop
        ? (count + (target % count)) % count
        : Math.max(Math.min(target, count - 1), 0)

      if (_current !== previous) {
        _emitter.emit('update', _current, previous, direction)
      }

      return _current
    },

    slideAuto (delay: number, times: ?number) {
      _refreshTimes = times && times >= 0 ? times : -1
      _applyAuto(delay)
    },

    stopAuto () {
      clearTimeout(_refreshId)
    }
  }

  if (auto) self.slideAuto(auto)

  return self
}
