'use strict'

import polyfills from './polyfills'
polyfills()

var d3 = window.d3

// node
import Draw from './Draw'
import utils from './utils'

var instances = []

function run (options) {
  function factory (options) {
    var el = d3.select(options.target)
    var id = el.attr('greuler-id')
    if (!id) {
      id = utils.id()
      el.attr('greuler-id', id)
      instances[id] = new Draw(id, options)
    }
    return instances[id]
  }

  return factory(options)
}

import Graph from './Graph'
run.Graph = Graph

import { colors } from './const'
run.colors = colors

import player from './player/index'
run.player = player

export default run
