'use strict'

import extend from 'extend'
import util from './utils'
import { colors } from './const'

const NODE_DEFAULT_OPTIONS = {
  r: 10,
  fill: '#2980B9'
}

const EDGE_DEFAULT_OPTIONS = {
  stroke: colors.LIGHT_GRAY
}

function includes (arr, id) {
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i].id === id) {
      return true
    }
  }
}

export default class Graph {
  constructor (owner, data) {
    this.owner = owner
    this.nodes = data.nodes
    this.edges = data.links
  }

  /**
   * Adds a node to the graph, each of the arguments must
   * be an object with the following required properties
   *
   * - id {Number|string}
   *
   * Optional properties
   *
   * - x {number} The x coordinate of this node in the graph (only if fixed = true)
   * - y {number} The y coordinate of this node in the graph (only if fixed = true)
   * - fixed {boolean} `true` to make this node not to participate in the layout process
   * - fill {string} The fill of the circle that represents the node
   * - r {number} The radius of the circle that represents the node
   * - label {string} The text inside the node (if it's not present it's equal to the `id`)
   * - topRightLabel {string] the text shown on the top right side of the node, useful
   * to represent additional annotations
   *
   * NOTE: this function receives any number of arguments
   */
  addNode () {
    for (var i = 0; i < arguments.length; i += 1) {
      var config = arguments[i]
      if (!config.hasOwnProperty('id')) {
        throw Error('the object must have the property `id`')
      }
      if (this.getNode(config)) {
        throw Error('node already in store')
      }
      this.nodes.push(
        Graph.appendNodeDefaults.call(this.owner, config)
      )
    }
  }

  /**
   * Gets a node by id
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   * @returns {Object|undefined}
   */
  getNode (node) {
    return this.getNodesByFn(v => v.id === node.id)[0]
  }

  /**
   * Returns all the nodes that satisfy the parameter `fn`,
   * alias for `this.nodes.filter(fn)`
   *
   * @param {Function} fn
   * @returns {Object[]}
   */
  getNodesByFn (fn) {
    return this.nodes.filter(fn)
  }

  /**
   * Gets all the adjacent nodes of the node identified by `id`
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   * @returns {Object[]}
   */
  getAdjacentNodes (node) {
    var adjacentNodes = []
    var taken = {}
    var next
    for (var i = 0; i < this.edges.length; i += 1) {
      var edge = this.edges[i]
      next = null
      if (edge.source.id === node.id) {
        next = edge.target
      } else if (edge.target.id === node.id) {
        next = edge.source
      }

      if (next && !taken[next.id]) {
        taken[next.id] = true
        adjacentNodes.push(next)
      }
    }

    return adjacentNodes
  }

  /**
   * Gets all the successor nodes of the node identified by `id`
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   * @returns {Object[]}
   */
  getSuccessorNodes (node) {
    var successor = []
    var taken = {}
    var next
    for (var i = 0; i < this.edges.length; i += 1) {
      var edge = this.edges[i]
      next = null
      if (edge.source.id === node.id) {
        next = edge.target
      }
      if (next && !taken[next.id]) {
        taken[next.id] = true
        successor.push(next)
      }
    }

    return successor
  }

  /**
   * Gets all the predecessor nodes of the node identified by `id`
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   * @returns {Object[]}
   */
  getPredecessorNodes (node) {
    var predecessor = []
    var taken = {}
    var next
    for (var i = 0; i < this.edges.length; i += 1) {
      var edge = this.edges[i]
      next = null
      if (edge.target.id === node.id) {
        next = edge.source
      }
      if (next && !taken[next.id]) {
        taken[next.id] = true
        predecessor.push(next)
      }
    }

    return predecessor
  }

  /**
   * Removes a node identified by `id`
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   */
  removeNode (node) {
    this.removeNodesByFn(function (v) {
      return v.id === node.id
    })
  }

  /**
   * Removes all the nodes stored in `nodes`,
   * each object must have the property `id`
   *
   * @param {Object[]} nodes
   */
  removeNodes (nodes) {
    // TODO: improve n^2 removal
    this.removeNodesByFn(function (v) {
      return includes(nodes, v.id)
    })
  }

  /**
   * Removes all the nodes that satisfy the predicate
   * `fn`
   *
   * @param {Function} fn
   */
  removeNodesByFn (fn) {
    var i
    for (i = 0; i < this.nodes.length; i += 1) {
      if (fn(this.nodes[i], i)) {
        // remove nodes
        var node = this.nodes.splice(i, 1)
        // remove incident edges
        this.removeEdges(
          this.getIncidentEdges(node[0])
        )
        i -= 1
      }
    }
  }

  /**
   * Adds an edge to the graph, each of the arguments must
   * be an object with the following properties
   *
   * Required properties
   *
   * - source {number|Object} The id of the source node or the source node itself
   * - target {number|Object} The id of the target node or the target node itself
   *
   * Optional properties
   *
   * - id {string|Object} If an id is not provided an auto generated string will be assigned
   * to this edge
   * - stroke {string} The stroke of the path that represents the edge
   * - weight {string} The weight of the edge
   * - directed {boolean} If set to true an additional arrow is added at the end of the edge
   *
   * NOTE: this function receives any number of arguments
   */
  addEdge () {
    for (var i = 0; i < arguments.length; i += 1) {
      var config = arguments[i]

      if (!config.hasOwnProperty('source') || !config.hasOwnProperty('target')) {
        throw Error('the edge must have the properties `source` and `target`')
      }
      var source = config.source
      var target = config.target

      if (typeof source !== 'object') {
        source = this.getNode({ id: config.source })
      }

      if (typeof target !== 'object') {
        target = this.getNode({ id: config.target })
      }

      if (!source || !target) {
        throw Error('new edge does not join existing vertices')
      }
      config.source = source
      config.target = target
      this.edges.push(
        Graph.appendEdgeDefaults.call(this.owner, config)
      )
    }
  }

  /**
   * Gets an edge by `id`
   *
   * @param {Object} edge
   * @param {number|string} edge.id The id of the edge
   * @returns {Object}
   */
  getEdge (edge) {
    return this.getEdgesByFn(e => e.id === edge.id)[0]
  }

  /**
   * Gets all the directed edges from the node whose id is
   * `options.source` and to the node whose id is `options.target`
   *
   * @param {Object} options
   * @param {number|string} options.source The id of the source node
   * @param {number|string} options.target The id of the target node
   * @returns {Object[]}
   */
  getEdgesBetween (options) {
    return this.getEdgesByFn(function (e) {
      return e.source.id === options.source && e.target.id === options.target
    })
  }

  /**
   * Gets all the edges from `options.source` to `options.target`
   * or `options.target` to `options.source`
   *
   * @param {Object} options
   * @param {number|string} options.source The id of the source node
   * @param {number|string} options.target The id of the target node
   * @returns {Object[]}
   */
  getAllEdgesBetween (options) {
    return this.getEdgesByFn(function (e) {
      return (e.source.id === options.source && e.target.id === options.target) ||
      (e.source.id === options.target && e.target.id === options.source)
    })
  }

  /**
   * Removes an edge identified by id
   *
   * @param {Object} edge
   * @param {number|string} edge.id The id of the edge
   */
  removeEdge (edge) {
    this.removeEdgesByFn(e => e.id === edge.id)
  }

  /**
   * Removes all the edges stored in `edges`,
   * each object must have the property `id`
   *
   * @param {Object[]} edges
   */
  removeEdges (edges) {
    // TODO: improve n^2 removal
    this.removeEdgesByFn(function (e) {
      return includes(edges, e.id)
    })
  }

  /**
   * Removes all the edges that return true for the predicate
   * `fn`
   *
   * @param {function} fn
   */
  removeEdgesByFn (fn) {
    var i
    for (i = 0; i < this.edges.length; i += 1) {
      if (fn(this.edges[i], i)) {
        this.edges.splice(i, 1)
        i -= 1
      }
    }
  }

  /**
   * Gets all the edges that return true for the predicate `fn`
   *
   * @param {Function} fn
   * @returns {Object[]}
   */
  getEdgesByFn (fn) {
    return this.edges.filter(fn)
  }

  /**
   * Gets all the outgoing edges of the node `id`
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   * @returns {Object[]}
   */
  getOutgoingEdges (node) {
    return this.getEdgesByFn((e) => e.source.id === node.id)
  }

  /**
   * Gets all the incoming edges of the node `id`
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   * @returns {Object[]}
   */
  getIncomingEdges (node) {
    return this.getEdgesByFn((e) => e.target.id === node.id)
  }

  /**
   * Gets all the incident edges of the node `id`
   *
   * @param {Object} node
   * @param {number|string} node.id The id of the node
   * @returns {Object[]}
   */
  getIncidentEdges (node) {
    return this.getOutgoingEdges(node)
      .concat(this.getIncomingEdges(node))
  }

  /**
   * Facade to add nodes/edges
   *
   * NOTE: the function receives any number of parameters
   */
  add () {
    for (var i = 0; i < arguments.length; i += 1) {
      var el = arguments[i]
      // assume that edges have a source/target parameter
      if (el.hasOwnProperty('source') && el.hasOwnProperty('target')) {
        this.addEdge(el)
      } else {
        this.addNode(el)
      }
    }
  }

  static appendNodeDefaults (v) {
    if (!v.hasOwnProperty('id')) {
      v.id = util.id()
    }

    v = extend(
      {},
      // predefined defaults
      NODE_DEFAULT_OPTIONS,
      // instance defaults
      this.options.nodeDefaults,
      // node
      v
    )

    if (!v.hasOwnProperty('width')) {
      v.width = 2 * v.r
    }
    if (!v.hasOwnProperty('height')) {
      v.height = 2 * v.r
    }
    return v
  }

  static appendEdgeDefaults (e) {
    if (!e.hasOwnProperty('id')) {
      e.id = util.id()
    }
    e = extend(
      {},
      // predefined defaults
      EDGE_DEFAULT_OPTIONS,
      // instance defaults
      this.options.edgeDefaults,
      // edge
      e
    )
    return e
  }

  /**
   * Creates a random graph with the following defaults options overridden by `options`:
   *
   * - options.order=10 {number} The number of nodes in the graph
   * - options.size=15 {number} The number of edges in the graph
   * - options.connected=false {boolean} True to make the graph connected,
   * it's guaranteed to have at least `options.order - 1` edges
   * - options.multiGraph=false {boolean} True to allow the creation of parallel edges
   * - options.pseudoGraph=false {boolean} True to allow the creation of loop edges
   *
   * @param {Object} options
   * @returns {{nodes: Array, links: Array}}
   */
  static random (options) {
    options = extend({
      order: 10,
      size: 15,
      connected: false,
      multiGraph: false,
      pseudoGraph: false
    }, options)

    var i, u, v
    var nodes = []
    var adjacencyList = []
    for (i = 0; i < options.order; i += 1) {
      adjacencyList[i] = []
      nodes.push({ id: i })
    }

    function add (u, v) {
      adjacencyList[u][v] = adjacencyList[v][u] = true
    }

    var edges = []
    i = 0

    if (options.connected) {
      for (i = 1; i < options.order; i += 1) {
        v = Math.floor(Math.random() * i)
        add(i, v)
        edges.push({
          source: i,
          target: v
        })
      }
      i -= 1
    }

    for (; i < options.size; i += 1) {
      u = Math.floor(Math.random() * options.order)
      v = Math.floor(Math.random() * options.order)

      if (u === v && !options.pseudoGraph) {
        i -= 1
      } else if (adjacencyList[u][v] && !options.multiGraph) {
        i -= 1
      } else {
        add(u, v)
        edges.push({
          source: u,
          target: v
        })
      }
    }

    return {
      nodes: nodes,
      links: edges
    }
  }
}
