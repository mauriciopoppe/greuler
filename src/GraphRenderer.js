import arrify from 'arrify'
import extend from 'extend'
import { d3adaptor } from 'webcola'
import { select, event } from 'd3-selection'
import { dispatch } from 'd3-dispatch'
import { timer } from 'd3-timer'
import { drag } from 'd3-drag'

import { Node } from './elements/Node'
import { Edge } from './elements/Edge'
import { GraphManager } from './GraphManager'
import { GreulerDefaultTransition } from './selector/GreulerDefaultTransition'

export class GraphRenderer {
  constructor(id, options) {
    const self = this
    this.events = dispatch('layoutStart', 'layoutEnd')

    this.markerId = 'marker-' + id

    // sets this.options
    this.options = this.defaultOptions(options)

    // graph handles the interactions with the drawer
    this.createGraph()

    // selector animates the nodes/edges
    this.selector = new GreulerDefaultTransition(this)

    // sub-elements that draw stuff
    this.nodeDrawer = Node({ owner: this })
    this.edgeDrawer = Edge({ owner: this })

    // layout engine
    this.layout = d3adaptor({
      version: '4',
      dispatch,
      timer,
      drag,
      get event() {
        return event
      }
    })

    // https://github.com/tgdwyer/WebCola/blob/78a24fc0dbf0b4eb4a12386db9c09b087633267d/src/layout.ts#L8
    this.layout.on('start', () => {
      self.events.call('layoutStart')
    })
    this.layout.on('tick', function () {
      self.tick()
    })
    this.layout.on('end', function () {
      self.events.call('layoutEnd')
    })
  }

  createGraph() {
    const data = this.options.data
    const nodes = data.nodes
    const edges = data.edges

    data.nodes = []
    data.edges = []

    this.graph = new GraphManager(this, data)
    nodes.forEach((node) => this.graph.addNode(node))
    edges.forEach((edge) => this.graph.addEdge(edge))
  }

  /**
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
  defaultOptions(options) {
    // graph defaults
    const target = select(options.target).node()
    const dimensions = target.getBoundingClientRect()

    options = extend(
      {
        width: dimensions.width,
        height: Math.max(dimensions.height, 400),
        animationTime: 1000,
        labels: true,
        directed: false
      },
      options
    )

    options.data = extend(
      {
        nodes: [],
        edges: [],
        groups: [],
        constraints: [],
        avoidOverlaps: true,
        size: [options.width, options.height],
        linkDistance: function (d) {
          return d.linkDistance || 80
        }
      },
      options.data
    )

    return options
  }

  initLayout(updateOptions) {
    const self = this

    if (updateOptions.skipLayout) {
      return
    }

    const receivesArray = {
      nodes: true,
      links: true,
      groups: true,
      constraints: true,
      distanceMatrix: true,
      size: true
    }

    // mapping of properties from this library to webcola
    const remaps = {
      edges: 'links'
    }

    Object.keys(self.options.data).forEach((key) => {
      const v = self.options.data[key]

      if (remaps.hasOwnProperty(key)) {
        key = remaps[key]
      }

      if (receivesArray[key]) {
        // call layout library method as fn([a, b, ...])
        self.layout[key](arrify(v))
      } else {
        // call layout library method as fn(a, b, ...)
        self.layout[key].apply(self.layout, arrify(v))
      }
    })

    this.layout.start.apply(this.layout, updateOptions.layoutStartOptions)
  }

  tick() {
    this.edgeGroup.call(this.edgeDrawer)
    this.nodeGroup.call(this.nodeDrawer)
  }

  update(updateOptions) {
    updateOptions = extend(
      true,
      {
        skipLayout: false,
        // all the args in https://github.com/tgdwyer/WebCola/blob/78a24fc0dbf0b4eb4a12386db9c09b087633267d/src/layout.ts#L488-L496
        layoutStartOptions: []
      },
      updateOptions
    )

    this.initLayout(updateOptions)
    this.build()

    // update nodes/edges if layout.tick wasn't run
    if (updateOptions.skipLayout) {
      this.tick()
    }

    return this
  }

  build() {
    const mount = select(this.options.target).selectAll('svg.greuler').data([this.options])

    // enter
    const svgEnter = mount
      .enter()
      .append('svg')
      .attr('class', 'greuler')
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)

    // marker def
    const svgDefs = svgEnter.append('svg:defs')

    // directed edge arrow
    svgDefs
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

    const svg = (this.root = svgEnter.merge(mount))

    // wrapper for the edges
    const edges = svg.selectAll('g.edges').data((d) => [d.data])
    this.edgeGroup = edges.enter().append('g').attr('class', 'edges').merge(edges)

    // wrapper for the nodes
    const nodes = svg.selectAll('g.nodes').data((d) => [d.data])
    this.nodeGroup = nodes.enter().append('g').attr('class', 'nodes').merge(nodes)
  }
}
