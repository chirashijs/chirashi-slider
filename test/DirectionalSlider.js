import { assert } from 'chai'
import { DirectionalSlider } from 'chirashi-slider'

describe('chirashi#DirectionalSlider', () => {
  it('should be defined as a function', () => {
    assert.isFunction(DirectionalSlider)
  })

  it('should handle simple slider logic', () => {
    const slider = DirectionalSlider({ count: 4, itemsPerSlide: 3, auto: 1000 })
    console.log('slider', slider)
    const items = []

    for (let i = 0; i < slider.displayTimes; ++i) {
      for (let j = 0; j < 4; ++j) {
        items.push(j)
      }
    }

    slider.on('animate', (current, to, from) => {
      console.log('animate', items, current, from, to, slider.current)
    })

    // slider.slideTo(3)
    // slider.slideTo(0)
    // slider.slideTo(3)
    // slider.slideUp()
    // slider.slideDown()
    // slider.slideDown()
  })
})
