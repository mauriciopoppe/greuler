'use strict'

import lcg from 'compute-lcg'
const rand = lcg(1)

export function createId() {
  var n = rand()
  var letter = String.fromCharCode(Math.floor(n * 26) + 97)
  return letter + n.toString(16).substr(2)
}

export function transform(o) {
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
}

export function transition(selection) {
  return selection
    .transition('layout')
    // .duration(300)
}

export function conditionalTransition(el, condition) {
  if (condition) {
    return this.transition(el)
  }
  return el
}

export const ns = str => 'greuler-' + str
