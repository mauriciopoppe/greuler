'use strict'

var d3 = window.d3
var cola = window.cola

import arrify from 'arrify'
import extend from 'extend'
import node from './elements/node'
import edge from './elements/edge'
import GraphManager from './Graph'
import GreulerDefaultTransition from './selector/GreulerDefaultTransition'

export default class Draw {
  constructor (id, options) {
    var self = this
    this.events = d3.dispatch('layout', 'firstLayoutEnd')

    this.markerId = 'marker-' + id

    this.defaultOptions(options)

    // graph handles the interactions with the drawer
    this.createGraph()

    // selector animates the nodes/edges
    this.selector = new GreulerDefaultTransition(this)

    // sub-elements that draw stuff
    this.nodeDrawer = node().owner(this)
    this.edgeDrawer = edge().owner(this)

    // cola
    this.layout = cola.d3adaptor()

    this.layout.on('tick', function () {
      self.tick()
    })

    var firstEnd = true
    this.layout.on('end', function () {
      if (firstEnd) {
        self.events.firstLayoutEnd()
        firstEnd = false
      }
    })
  }

  createGraph () {
    var data = this.options.data
    var nodes = data.nodes
    var links = data.links

    // empty and re-add
    data.nodes = []
    data.links = []

    this.graph = new GraphManager(this, data)
    nodes.forEach(function (node) {
      this.graph.addNode(node)
    }, this)
    links.forEach(function (edge) {
      this.graph.addEdge(edge)
    }, this)
  }

  /**
   *
   * @param {Object} options
   *
   * options
   *   - target {string} selector to the element to hold the graph
   *   - width {number}
   *   - height {number}
   *   - labels=true {boolean} False to hide the vertex labels
   *   - directed=false {boolean} True to give an orientation to the edges
   *   have an edge
   *   - data {Object}
   *     - linkDistance=90 {number} Forced min distance between vertices that
   *     - constraints {Array[Objects]}
   *     - groups {Array[Objects]}
   *     - nodes {Array[Objects]}
   *       - r=10 {number} node radius
   *     - links {Array[Objects]}
   *       - directed=false {boolean} true to give an orientation to this edge
   *       - weight="" {string} Label of the edge (can be the weight)
   *
   */
  defaultOptions (options) {
    // graph defaults
    options = this.options = extend({
      width: 700,
      height: 300,
      animationTime: 1000,
      labels: true,
      directed: false
    }, options)

    this.options.data = extend({
      nodes: [],
      links: [],
      groups: [],
      constraints: [],
      avoidOverlaps: true,
      size: [options.width, options.height],
      linkDistance: function (d) {
        return d.linkDistance || 80
      }
    }, this.options.data)
  }

  initLayout (updateOptions) {
    var self = this

    if (updateOptions.skipLayout) {
      return
    }

    var receivesArray = {
      nodes: true,
      links: true,
      groups: true,
      constraints: true,
      distanceMatrix: true,
      size: true
    }

    Object.keys(self.options.data).forEach(function (k) {
      var v = self.options.data[k]
      if (receivesArray[k]) {
        self.layout[k](arrify(v))
      } else {
        self.layout[k].apply(self.layout, arrify(v))
      }
    }, this)

    this.layout.start.apply(this.layout, updateOptions.iterations)
  }

  tick () {
    this.edgeGroup.call(this.edgeDrawer)
    this.nodeGroup.call(this.nodeDrawer)
  }

  update (updateOptions) {
    updateOptions = extend(true, {
      skipLayout: false,
      iterations: []
    }, updateOptions)

    this.initLayout(updateOptions)
    this.build(updateOptions)

    // update nodes/edges if layout.tick wasn't run
    if (updateOptions.skipLayout) {
      this.tick()
    }

    return this
  }

  build () {
    this.root = d3.select(this.options.target)
      .selectAll('svg.greuler')
      .data([this.options])

    // enter
    this.root.enter = this.root.enter()
      .append('svg')
      .attr('class', 'greuler')

    // marker def
    this.root.enter
      .append('svg:defs')
      .append('svg:marker')
      .attr('id', this.markerId)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 9)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-4L10,0L0,4L2,0')
      .attr('stroke-width', '0px')
      .attr('fill-opacity', 1)
      .attr('fill', '#777')

    // update
    this.root
      .attr('width', this.options.width)
      .attr('height', this.options.height)

    // wrapper for the edges
    this.edgeGroup = this.root
      .selectAll('g.edges')
      .data(function (d) { return [d.data] })
    this.edgeGroup
      .enter().append('g')
      .attr('class', 'edges')

    // wrapper for the nodes
    this.nodeGroup = this.root
      .selectAll('g.nodes')
      .data(function (d) { return [d.data] })
    this.nodeGroup
      .enter().append('g')
      .attr('class', 'nodes')
  }

}
