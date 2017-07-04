'use strict'

import './polyfills'
import 'd3-transition'
import { select } from 'd3-selection'

// node
import Draw from './Draw'
import utils from './utils'

var instances = []

function run (options) {
  var el = select(options.target)
  var id = el.attr('greuler-id')
  if (!id) {
    id = utils.id()
    el.attr('greuler-id', id)
    instances[id] = new Draw(id, options)
  }
  return instances[id]
}

import Graph from './Graph'
run.Graph = Graph

import { colors } from './const'
run.colors = colors

import player from './player/index'
run.player = player

export default run
