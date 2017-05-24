import EventEmitter from 'chirashi-event-emitter'

import Slider from './Slider'

const DirectionalSlider = options => {
  const emitter = EventEmitter()

  const self = Slider({ ...options, emitter, loop: true })

  const { count, itemsPerSlide } = options

  const blockSize = 1 + (count < itemsPerSlide ? Math.ceil((itemsPerSlide - count) / count) : 0)

  const {
    current,
    slideTo: superSlideTo
  } = self

  let displayCurrent = (count * blockSize) + current

  const handleChange = (index, forcedDirection) => {
    const previous = displayCurrent
    displayCurrent = (count * blockSize) + index

    const upOffset = (count + ((displayCurrent - previous) % count)) % count
    const downOffset = upOffset - count

    let delta
    if (forcedDirection === 'down') {
      delta = downOffset
    } if (forcedDirection === 'up') {
      delta = upOffset
    } else {
      delta = -downOffset < upOffset ? downOffset : upOffset
    }

    emitter.emit('animate', displayCurrent, previous + delta, previous)

    return index
  }

  return Object.assign(self, {
    get displayTimes () {
      return blockSize * 3
    },

    slideTo (index, direction) {
      return handleChange(superSlideTo(index, direction), direction)
    }
  })
}

export default DirectionalSlider
