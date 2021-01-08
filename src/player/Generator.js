export class Generator {
  constructor (instance, speed) {
    this.instance = instance
    this.speed = speed || instance.options.animationTime
    this.fn = null
    this.timer = null
  }

  run (fn) {
    this.fn = fn(this.instance)
    this.play()
  }

  runAnimation (animation) {
    if (Array.isArray(animation)) {
      return animation.forEach(this.runAnimation, this)
    }

    if (typeof animation === 'function') {
      return animation(this.instance)
    }

    const type = this.instance[animation.type]
    return type[animation.op].apply(type, animation.args || [])
  }

  play (value) {
    const self = this
    const next = this.fn.next(value)
    if (!next.done) {
      let delay = this.speed
      const runAnimationValue = this.runAnimation(next.value)
      if (runAnimationValue && typeof runAnimationValue === 'object') {
        if (typeof runAnimationValue.delay === 'number') {
          delay = runAnimationValue.delay
        }
      }

      this.timer = window.requestTimeout(function () {
        self.play(next.value)
      }, delay)
    }
  }

  pause () {
    window.clearRequestTimeout(this.timer)
  }
}
