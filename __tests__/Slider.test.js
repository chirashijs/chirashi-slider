import { Slider } from '../lib'

describe('chirashi#Slider', () => {
  it('should be defined as a function', () => {
    expect(typeof Slider).toBe('function')
  })

  it('should handle simple slider logic', () => {
    const slider = Slider({ count: 2 })

    slider.slideUp()
    expect(slider.getCurrent()).toBe(1)
    expect(slider.slideUp()).toBe(1)

    expect(slider.slideTo(-1)).toBe(0)
    expect(slider.slideTo(200)).toBe(1)
    expect(slider.slideTo(1)).toBe(1)

    expect(slider.slideDown()).toBe(0)
    expect(slider.slideDown()).toBe(0)
  })

  it('should handle looping slider project', () => {
    const infiniteSlider = Slider({ count: 3, loop: true })

    expect(infiniteSlider.slideUp()).toBe(1)
    expect(infiniteSlider.slideUp()).toBe(2)
    expect(infiniteSlider.slideUp()).toBe(0)

    expect(infiniteSlider.slideTo(-1)).toBe(2)
    expect(infiniteSlider.slideTo(3)).toBe(0)
    expect(infiniteSlider.slideTo(1)).toBe(1)

    expect(infiniteSlider.slideDown()).toBe(0)
    expect(infiniteSlider.slideDown()).toBe(2)
  })

  it('should support index for first displayed slide', () => {
    const slider = Slider({ count: 2, begin: 1 })

    expect(slider.getCurrent()).toBe(1)
  })

  it('should support automatic slide', done => {
    const slider = Slider({ count: 2, loop: true })

    const f = jest.fn()

    slider.on('update', f)
    slider.slideAuto(1, 20)
    slider.stopAuto()
    slider.slideAuto(1, 10)

    setTimeout(() => {
      expect(f).toHaveBeenCalledTimes(10)

      done()
    }, 100)
  })

  it('should support event emission', done => {
    const slider = Slider({ count: 2, auto: 100000 })

    const f = jest.fn()

    const off = slider.on('update', f)

    slider.slideTo(1, 'up')
    off()
    slider.slideTo(0, 'up')
    slider.slideTo(0, 'up')

    setTimeout(() => {
      expect(f).toHaveBeenLastCalledWith(1, 0, 'up')

      done()
    })
  })
})
