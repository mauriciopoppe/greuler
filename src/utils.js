'use strict'

import lcg from 'compute-lcg'

var rand = lcg(1)

export default {
  id: function () {
    var n = rand()
    var letter = String.fromCharCode(Math.floor(n * 26) + 97)
    return letter + n.toString(16).substr(2)
  },

  transform: function (o) {
    var str = ``
    if ('translate' in o) {
      str += ` translate(${o.translate.x}, ${o.translate.y})`
    }
    if ('rotate' in o) {
      str += ` rotate(${o.rotate})`
    }
    if ('scale' in o) {
      str += ` scale(${o.scale})`
    }
    return str
  },

  transition: function (selection) {
    return selection
      .transition('layout')
      .duration(300)
      .ease('linear')
  },

  conditionalTransition: function (el, condition) {
    if (condition) {
      return this.transition(el)
    }
    return el
  },

  ns: function (str) {
    return 'greuler-' + str
  }
}
