import { assert } from 'chai'
import { Slider } from 'chirashi-slider'

describe('chirashi#Slider', () => {
  it('should be defined as a function', () => {
    assert.isFunction(Slider)
  })

  it('should handle simple slider logic', () => {
    const slider = Slider({ count: 2 })

    slider.slideUp()
    assert.equal(slider.current, 1, 'slide up once')
    assert.equal(slider.slideUp(), 1, 'block slide up')

    assert.equal(slider.slideTo(-1), 0, 'slide to lower')
    assert.equal(slider.slideTo(200), 1, 'slide to upper')
    assert.equal(slider.slideTo(1), 1, 'slide to index')

    assert.equal(slider.slideDown(), 0, 'slide down once')
    assert.equal(slider.slideDown(), 0, 'slide down block')
  })

  it('should handle looping slider project', () => {
    const infiniteSlider = Slider({ count: 3, loop: true })

    assert.equal(infiniteSlider.slideUp(), 1, 'infinite slide up once')
    assert.equal(infiniteSlider.slideUp(), 2, 'infinite slide up twice')
    assert.equal(infiniteSlider.slideUp(), 0, 'infinite slide up loop')

    assert.equal(infiniteSlider.slideTo(-1), 2, 'infinite slide to lower')
    assert.equal(infiniteSlider.slideTo(3), 0, 'infinite slide to upper')
    assert.equal(infiniteSlider.slideTo(1), 1, 'infinite slide to first')

    assert.equal(infiniteSlider.slideDown(), 0, 'infinite slide down once')
    assert.equal(infiniteSlider.slideDown(), 2, 'infinite slide down loop')
  })

  it('should support index for first displayed slide', () => {
    const slider = Slider({ count: 2, begin: 1 })

    assert.equal(slider.current, 1)
  })

  it('should support event emission', () => {
    const slider = Slider({ count: 2 })

    const off = slider.on((to, from) => {
      assert.equal(from, 0)
      assert.equal(to, 1)
    })

    slider.slideTo(1)
    off()
    slider.slideTo(0)
  })
})
