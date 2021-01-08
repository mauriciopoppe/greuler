'use strict'

import lcg from 'compute-lcg'
const rand = lcg(1)

export function createId() {
  const n = rand()
  const letter = String.fromCharCode(Math.floor(n * 26) + 97)
  return letter + n.toString(16).substr(2)
}

export function transform(o) {
  let str = ``
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

export const ns = str => 'greuler-' + str
