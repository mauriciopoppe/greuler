'use strict'

import './polyfills'
import 'd3-transition'
import { select } from 'd3-selection'

// node
import { Draw } from './Draw'
import { createId } from './utils'

var instances = []

export default function run (options) {
  var el = select(options.target)
  var id = el.attr('greuler-id')
  if (!id) {
    id = createId()
    el.attr('greuler-id', id)
    instances[id] = new Draw(id, options)
  }
  return instances[id]
}

export * from './Graph'
export * from './const'
export * from './player'

