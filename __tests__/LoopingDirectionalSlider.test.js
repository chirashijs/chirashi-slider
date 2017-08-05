import { LoopingDirectionalSlider } from '../lib'

describe('chirashi#LoopingDirectionalSlider', () => {
  it('should be defined as a function', () => {
    expect(typeof LoopingDirectionalSlider).toBe('function')
  })

  it('should compute repeat needed', () => {
    const simpleSlider = LoopingDirectionalSlider({ count: 4, itemsPerSlide: 3 })

    expect(simpleSlider.getDisplayTimes()).toBe(3)

    const smallSlider = LoopingDirectionalSlider({ count: 2, itemsPerSlide: 6 })

    expect(smallSlider.getDisplayTimes()).toBe(9) // 3 * (itemsPerSlide / count)
  })

  it('should call animate with info to loop', done => {
    const f = jest.fn()
    const slider = LoopingDirectionalSlider({ count: 4, itemsPerSlide: 3, animHandler: f })

    const items = []

    expect(slider.getDisplayTimes()).toBe(3)

    for (let i = 0; i < slider.getDisplayTimes(); ++i) {
      for (let j = 0; j < 4; ++j) {
        items.push(j)
      }
    }

    expect(items).toEqual([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3])

    slider.slideTo(3)
    slider.slideTo(0)
    slider.slideTo(3)
    slider.slideUp()
    slider.slideDown()
    slider.slideDown()

    setTimeout(() => {
      expect(f.mock.calls).toEqual([
        [7, 3, 4],
        [4, 8, 7],
        [7, 3, 4],
        [4, 8, 7],
        [7, 3, 4],
        [6, 6, 7]
      ])

      done()
    }, 10)
  })
})
