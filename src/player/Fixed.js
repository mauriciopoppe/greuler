'use strict'

export default class Player {
  constructor (actions, speed) {
    this.index = 0
    this.speed = speed
    this.actions = actions

    // states
    this.timer = null
  }

  play () {
    if (this.index < this.actions.length) {
      this.actions[this.index++]()
      this.timer = setTimeout(this.play.bind(this), this.speed)
    }
  }

  pause () {
    clearTimeout(this.timer)
  }

  stop () {
    this.pause()
    this.index = 0
  }

}
