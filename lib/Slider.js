// @flow

import type TEventEmitter from 'chirashi-event-emitter'
import EventEmitter from 'chirashi-event-emitter'

/**
 * Options supported by Slider
 */
type SliderOptions = {
  emitter?: TEventEmitter,
  count: number,
  begin?: number,
  loop?: boolean,
  auto?: number | boolean
}

/**
 * TSlider type definition
 */
type TSlider = {
  get current(): number,
  on: typeof TEventEmitter.on,
  off: typeof TEventEmitter.off,
  slideUp(): number,
  slideDown(): number,
  slideTo(target: number, direction: 'down' | 'up'): number,
  slideAuto(next: number, times: ?number): void,
  stopAuto(): void
}

/**
 * TSlider factory function
 */
const Slider = ({ emitter, count, begin = 0, loop = false, auto = false }: SliderOptions): TSlider => {
  if (!emitter) {
    emitter = EventEmitter()
  }

  let _refreshId: number, _refreshTimes: number
  let current: number = begin

  const _applyAuto = next => {
    if (_refreshTimes === -1 || --_refreshTimes > 0) {
      _refreshId = setTimeout(() => {
        self.slideUp()
        _applyAuto(next)
      }, next)
    }
  }

  const self: TSlider = {
    get current () {
      return current
    },

    on: emitter.on,
    off: emitter.off,

    slideUp () {
      return self.slideTo(current + 1, 'up')
    },

    slideDown () {
      return self.slideTo(current - 1, 'down')
    },

    slideTo (target, direction) {
      const previous: typeof current = current

      current = loop
        ? (count + (target % count)) % count
        : Math.max(Math.min(target, count - 1), 0)

      if (current !== previous) {
        emitter.emit('update', current, previous, direction)
      }

      return current
    },

    slideAuto (next, times = -1) {
      _refreshTimes = times
      _applyAuto(next)
    },

    stopAuto () {
      clearTimeout(_refreshId)
    }
  }

  if (auto) self.slideAuto(auto)

  return self
}

export default Slider
