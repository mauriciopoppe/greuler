import './polyfills'
import 'd3-transition'
import { select } from 'd3-selection'

import { Graph } from './Graph'
import { colors } from './const'
import { Generator } from './player/'
import { Draw } from './Draw'
import { createId } from './utils'

const instances = []

function greuler (options) {
  const el = select(options.target)
  let id = el.attr('greuler-id')
  if (!id) {
    id = createId()
    el.attr('greuler-id', id)
    instances[id] = new Draw(id, options)
  }
  return instances[id]
}

greuler.Graph = Graph
greuler.colors = colors
greuler.Generator = Generator

export default greuler
