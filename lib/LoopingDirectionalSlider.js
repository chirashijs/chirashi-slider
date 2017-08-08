// @flow

import Slider, { type TSlider, type SliderOptions } from './Slider'

/**
 * Options accepted by LoopingDirectionalSlider factory function
 */
type LoopingDirectionalSliderOptions = SliderOptions & {
  count: number,
  begin: number,
  itemsPerSlide: number,
  animHandler: (final: number, to: number, from: number) => void
}

/**
 * LoopingDirectionalSlider type definition
 */
type TLoopingDirectionalSlider = TSlider & {
  getDisplayed: void => number,
  getDisplayTimes: void => number
}

/**
 * LoopingDirectionalSlider factory function
 */
export default (options: LoopingDirectionalSliderOptions): TLoopingDirectionalSlider => {
  const slider: TSlider = Slider({ ...options, loop: true })

  slider.on('update', (current: number, previous: number, direction: number) => handleChange(current, direction))

  const {
    count,
    itemsPerSlide,
    animHandler
    }: {
    count: number,
    itemsPerSlide: number,
    animHandler: (final: number, to: number, from: number) => void
  } = options

  const blockSize = 1 + (count < itemsPerSlide ? Math.ceil((itemsPerSlide - count) / count) : 0)

  let displayCurrent: number = (count * blockSize) + slider.getCurrent()

  const handleChange = (index, forcedDirection) => {
    const previous = displayCurrent
    displayCurrent = (count * blockSize) + index

    const upOffset: number = (count + ((displayCurrent - previous) % count)) % count
    const downOffset: number = upOffset - count

    let delta: number
    if (forcedDirection === 'down') {
      delta = downOffset
    } if (forcedDirection === 'up') {
      delta = upOffset
    } else {
      delta = -downOffset < upOffset ? downOffset : upOffset
    }

    animHandler(displayCurrent, previous + delta, previous)

    return index
  }

  return {
    ...slider,

    getDisplayed (): number {
      return displayCurrent
    },

    getDisplayTimes (): number {
      return blockSize * 3
    }
  }
}
