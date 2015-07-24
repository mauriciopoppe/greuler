(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.greuler = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
*
*	COMPUTE: lcg
*
*
*	DESCRIPTION:
*		- A linear congruential pseudorandom number generator (lcg).
*
*
*	NOTES:
*		[1] Based on W. Press, et al., Numerical Recipes in C (2d ed. 1992)
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. rgizz.
*
*
*	AUTHOR:
*		rgizz. gztown2216@yahoo.com. 2014.
*
*/

'use strict';

// VARIABLES //

var MASK = 123459876,
	M = 2147483647,
	A = 16807;


// LCG //

/**
* FUNCTION: lcg( [seed] )
*	Returns a linear congruential pseudorandom number generator. If not provided a seed, a seed is generated based on the current time.
*
* @param {Number} [seed] - random number generator seed
* @returns {Function} generator
*/
function lcg( val ) {
	var seed;
	if ( arguments.length ) {
		if ( typeof val !== 'number' || val !== val || val % 1 !== 0 || val < 1 ) {
			throw new TypeError( 'lcg()::invalid input argument. Seed must be a positive integer.' );
		}
		seed = val;
	} else {
		seed = Date.now() % 100000000;
	}
	/**
	* FUNCTION: lcg( [N] )
	*	Linear congruential pseudorandom number generator.
	*
	* @param {Number} [N] - number of pseudorandom numbers to return
	* @returns {Number|Array} pseudorandom floating-point number(s) between 0 and 1
	*/
	return function lcg( N ) {
		var arr,
			rand;
		if ( !arguments.length ) {
			seed = seed ^ MASK;
			seed = ( A * seed ) % M;
			rand = seed / M;
			seed = seed ^ MASK;
			return rand;
		}
		if ( typeof N !== 'number' || N !== N || N%1 !== 0 || N < 1 ) {
			throw new TypeError( 'lcg()::invalid input argument. Array length must be a positive integer.' );
		}
		arr = new Array( N );
		for ( var i = 0; i < N; i++ ) {
			seed = seed ^ MASK;
			seed = ( A * seed ) % M;
			arr[ i ] = seed / M;
			seed = seed ^ MASK;
		}
		return arr;
	};
} // end FUNCTION lcg()


// EXPORTS //

module.exports = lcg;



},{}],2:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _elementsNode = require('./elements/node');

var _elementsNode2 = _interopRequireDefault(_elementsNode);

var _elementsEdge = require('./elements/edge');

var _elementsEdge2 = _interopRequireDefault(_elementsEdge);

var _Graph = require('./Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _selectorGreulerDefaultTransition = require('./selector/GreulerDefaultTransition');

var _selectorGreulerDefaultTransition2 = _interopRequireDefault(_selectorGreulerDefaultTransition);

var d3 = window.d3;
var cola = window.cola;

var Draw = (function () {
  function Draw(id, options) {
    _classCallCheck(this, Draw);

    var self = this;
    this.events = d3.dispatch('layout', 'firstLayoutEnd');

    this.markerId = 'marker-' + id;

    this.defaultOptions(options);

    // graph handles the interactions with the drawer
    this.createGraph();

    // selector animates the nodes/edges
    this.selector = new _selectorGreulerDefaultTransition2['default'](this);

    // sub-elements that draw stuff
    this.nodeDrawer = (0, _elementsNode2['default'])().owner(this);
    this.edgeDrawer = (0, _elementsEdge2['default'])().owner(this);

    // cola
    this.layout = cola.d3adaptor();

    this.layout.on('tick', function () {
      self.tick();
    });

    var firstEnd = true;
    this.layout.on('end', function () {
      if (firstEnd) {
        self.events.firstLayoutEnd();
        firstEnd = false;
      }
    });
  }

  _createClass(Draw, [{
    key: 'createGraph',
    value: function createGraph() {
      var data = this.options.data;
      var nodes = data.nodes;
      var links = data.links;

      // empty and re-add
      data.nodes = [];
      data.links = [];

      this.graph = new _Graph2['default'](this, data);
      nodes.forEach(function (node) {
        this.graph.addNode(node);
      }, this);
      links.forEach(function (edge) {
        this.graph.addEdge(edge);
      }, this);
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
  }, {
    key: 'defaultOptions',
    value: function defaultOptions(options) {
      // graph defaults
      options = this.options = (0, _extend2['default'])({
        width: 700,
        height: 300,
        animationTime: 1000,
        labels: true,
        directed: false
      }, options);

      this.options.data = (0, _extend2['default'])({
        nodes: [],
        links: [],
        groups: [],
        constraints: [],
        avoidOverlaps: true,
        size: [options.width, options.height],
        linkDistance: function linkDistance(d) {
          return d.linkDistance || 80;
        }
      }, this.options.data);
    }
  }, {
    key: 'initLayout',
    value: function initLayout(updateOptions) {
      var self = this;

      if (updateOptions.skipLayout) {
        return;
      }

      Object.keys(self.options.data).forEach(function (k) {
        var v = self.options.data[k];
        self.layout[k](v);
      }, this);

      // this.layout.start(15, 15, 15)
      this.layout.start();
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.edgeGroup.call(this.edgeDrawer);
      this.nodeGroup.call(this.nodeDrawer);
    }
  }, {
    key: 'update',
    value: function update(updateOptions) {
      updateOptions = (0, _extend2['default'])({
        skipLayout: false
      }, updateOptions);

      this.initLayout(updateOptions);
      this.build(updateOptions);

      // update inner nodes/edges if layout.tick wasn't run
      if (updateOptions.skipLayout) {
        this.tick();
      }

      return this;
    }
  }, {
    key: 'build',
    value: function build() {
      this.root = d3.select(this.options.target).selectAll('svg.greuler').data([this.options]);

      // enter
      this.root.enter = this.root.enter().append('svg').attr('class', 'greuler');

      // marker def
      this.root.enter.append('svg:defs').append('svg:marker').attr('id', this.markerId).attr('viewBox', '0 -5 10 10').attr('refX', 9).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto').append('svg:path').attr('d', 'M0,-4L10,0L0,4L2,0').attr('stroke-width', '0px').attr('fill-opacity', 1).attr('fill', '#777');

      // update
      this.root.attr('width', this.options.width).attr('height', this.options.height);

      // wrapper for the edges
      this.edgeGroup = this.root.selectAll('g.edges').data(function (d) {
        return [d.data];
      });
      this.edgeGroup.enter().append('g').attr('class', 'edges');

      // wrapper for the nodes
      this.nodeGroup = this.root.selectAll('g.nodes').data(function (d) {
        return [d.data];
      });
      this.nodeGroup.enter().append('g').attr('class', 'nodes');
    }
  }]);

  return Draw;
})();

exports['default'] = Draw;
module.exports = exports['default'];

},{"./Graph":4,"./elements/edge":7,"./elements/node":8,"./selector/GreulerDefaultTransition":15,"extend":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _const = require('./const');

var NODE_DEFAULT_OPTIONS = {
  r: 10,
  fill: '#2980B9'
};

var EDGE_DEFAULT_OPTIONS = {
  stroke: _const.colors.LIGHT_GRAY
};

function includes(arr, id) {
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i].id === id) {
      return true;
    }
  }
}

var Graph = (function () {
  function Graph(owner, data) {
    _classCallCheck(this, Graph);

    this.owner = owner;
    this.nodes = data.nodes;
    this.edges = data.links;
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

  _createClass(Graph, [{
    key: 'addNode',
    value: function addNode() {
      for (var i = 0; i < arguments.length; i += 1) {
        var config = arguments[i];
        if (!config.hasOwnProperty('id')) {
          throw Error('the object must have the property `id`');
        }
        if (this.getNode(config)) {
          throw Error('node already in store');
        }
        this.nodes.push(Graph.appendNodeDefaults.call(this.owner, config));
      }
    }

    /**
     * Gets a node by id
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object|undefined}
     */
  }, {
    key: 'getNode',
    value: function getNode(node) {
      return this.getNodesByFn(function (v) {
        return v.id === node.id;
      })[0];
    }

    /**
     * Returns all the nodes that satisfy the parameter `fn`,
     * alias for `this.nodes.filter(fn)`
     *
     * @param {Function} fn
     * @returns {Object[]}
     */
  }, {
    key: 'getNodesByFn',
    value: function getNodesByFn(fn) {
      return this.nodes.filter(fn);
    }

    /**
     * Gets all the adjacent nodes of the node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
  }, {
    key: 'getAdjacentNodes',
    value: function getAdjacentNodes(node) {
      var adjacentNodes = [];
      var taken = {};
      var next;
      for (var i = 0; i < this.edges.length; i += 1) {
        var edge = this.edges[i];
        next = null;
        if (edge.source.id === node.id) {
          next = edge.target;
        } else if (edge.target.id === node.id) {
          next = edge.source;
        }

        if (next && !taken[next.id]) {
          taken[next.id] = true;
          adjacentNodes.push(next);
        }
      }

      return adjacentNodes;
    }

    /**
     * Gets all the successor nodes of the node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
  }, {
    key: 'getSuccessorNodes',
    value: function getSuccessorNodes(node) {
      var successor = [];
      var taken = {};
      var next;
      for (var i = 0; i < this.edges.length; i += 1) {
        var edge = this.edges[i];
        next = null;
        if (edge.source.id === node.id) {
          next = edge.target;
        }
        if (next && !taken[next.id]) {
          taken[next.id] = true;
          successor.push(next);
        }
      }

      return successor;
    }

    /**
     * Gets all the predecessor nodes of the node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
  }, {
    key: 'getPredecessorNodes',
    value: function getPredecessorNodes(node) {
      var predecessor = [];
      var taken = {};
      var next;
      for (var i = 0; i < this.edges.length; i += 1) {
        var edge = this.edges[i];
        next = null;
        if (edge.target.id === node.id) {
          next = edge.source;
        }
        if (next && !taken[next.id]) {
          taken[next.id] = true;
          predecessor.push(next);
        }
      }

      return predecessor;
    }

    /**
     * Removes a node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     */
  }, {
    key: 'removeNode',
    value: function removeNode(node) {
      this.removeNodesByFn(function (v) {
        return v.id === node.id;
      });
    }

    /**
     * Removes all the nodes stored in `nodes`,
     * each object must have the property `id`
     *
     * @param {Object[]} nodes
     */
  }, {
    key: 'removeNodes',
    value: function removeNodes(nodes) {
      // TODO: improve n^2 removal
      this.removeNodesByFn(function (v) {
        return includes(nodes, v.id);
      });
    }

    /**
     * Removes all the nodes that satisfy the predicate
     * `fn`
     *
     * @param {Function} fn
     */
  }, {
    key: 'removeNodesByFn',
    value: function removeNodesByFn(fn) {
      var i;
      for (i = 0; i < this.nodes.length; i += 1) {
        if (fn(this.nodes[i], i)) {
          // remove nodes
          var node = this.nodes.splice(i, 1);
          // remove incident edges
          this.removeEdges(this.getIncidentEdges(node[0]));
          i -= 1;
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
  }, {
    key: 'addEdge',
    value: function addEdge() {
      for (var i = 0; i < arguments.length; i += 1) {
        var config = arguments[i];

        if (!config.hasOwnProperty('source') || !config.hasOwnProperty('target')) {
          throw Error('the edge must have the properties `source` and `target`');
        }
        var source = config.source;
        var target = config.target;

        if (typeof source !== 'object') {
          source = this.getNode({ id: config.source });
        }

        if (typeof target !== 'object') {
          target = this.getNode({ id: config.target });
        }

        if (!source || !target) {
          throw Error('new edge does not join existing vertices');
        }
        config.source = source;
        config.target = target;
        this.edges.push(Graph.appendEdgeDefaults.call(this.owner, config));
      }
    }

    /**
     * Gets an edge by `id`
     *
     * @param {Object} edge
     * @param {number|string} edge.id The id of the edge
     * @returns {Object}
     */
  }, {
    key: 'getEdge',
    value: function getEdge(edge) {
      return this.getEdgesByFn(function (e) {
        return e.id === edge.id;
      })[0];
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
  }, {
    key: 'getEdgesBetween',
    value: function getEdgesBetween(options) {
      return this.getEdgesByFn(function (e) {
        return e.source.id === options.source && e.target.id === options.target;
      });
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
  }, {
    key: 'getAllEdgesBetween',
    value: function getAllEdgesBetween(options) {
      return this.getEdgesByFn(function (e) {
        return e.source.id === options.source && e.target.id === options.target || e.source.id === options.target && e.target.id === options.source;
      });
    }

    /**
     * Removes an edge identified by id
     *
     * @param {Object} edge
     * @param {number|string} edge.id The id of the edge
     */
  }, {
    key: 'removeEdge',
    value: function removeEdge(edge) {
      this.removeEdgesByFn(function (e) {
        return e.id === edge.id;
      });
    }

    /**
     * Removes all the edges stored in `edges`,
     * each object must have the property `id`
     *
     * @param {Object[]} edges
     */
  }, {
    key: 'removeEdges',
    value: function removeEdges(edges) {
      // TODO: improve n^2 removal
      this.removeEdgesByFn(function (e) {
        return includes(edges, e.id);
      });
    }

    /**
     * Removes all the edges that return true for the predicate
     * `fn`
     *
     * @param {function} fn
     */
  }, {
    key: 'removeEdgesByFn',
    value: function removeEdgesByFn(fn) {
      var i;
      for (i = 0; i < this.edges.length; i += 1) {
        if (fn(this.edges[i], i)) {
          this.edges.splice(i, 1);
          i -= 1;
        }
      }
    }

    /**
     * Gets all the edges that return true for the predicate `fn`
     *
     * @param {Function} fn
     * @returns {Object[]}
     */
  }, {
    key: 'getEdgesByFn',
    value: function getEdgesByFn(fn) {
      return this.edges.filter(fn);
    }

    /**
     * Gets all the outgoing edges of the node `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
  }, {
    key: 'getOutgoingEdges',
    value: function getOutgoingEdges(node) {
      return this.getEdgesByFn(function (e) {
        return e.source.id === node.id;
      });
    }

    /**
     * Gets all the incoming edges of the node `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
  }, {
    key: 'getIncomingEdges',
    value: function getIncomingEdges(node) {
      return this.getEdgesByFn(function (e) {
        return e.target.id === node.id;
      });
    }

    /**
     * Gets all the incident edges of the node `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
  }, {
    key: 'getIncidentEdges',
    value: function getIncidentEdges(node) {
      return this.getOutgoingEdges(node).concat(this.getIncomingEdges(node));
    }

    /**
     * Facade to add nodes/edges
     *
     * NOTE: the function receives any number of parameters
     */
  }, {
    key: 'add',
    value: function add() {
      for (var i = 0; i < arguments.length; i += 1) {
        var el = arguments[i];
        // assume that edges have a source/target parameter
        if (el.hasOwnProperty('source') && el.hasOwnProperty('target')) {
          this.addEdge(el);
        } else {
          this.addNode(el);
        }
      }
    }
  }], [{
    key: 'appendNodeDefaults',
    value: function appendNodeDefaults(v) {
      if (!v.hasOwnProperty('id')) {
        v.id = _utils2['default'].id();
      }

      v = (0, _extend2['default'])({},
      // predefined defaults
      NODE_DEFAULT_OPTIONS,
      // instance defaults
      this.options.nodeDefaults,
      // node
      v);

      if (!v.hasOwnProperty('width')) {
        v.width = 2 * v.r;
      }
      if (!v.hasOwnProperty('height')) {
        v.height = 2 * v.r;
      }
      return v;
    }
  }, {
    key: 'appendEdgeDefaults',
    value: function appendEdgeDefaults(e) {
      if (!e.hasOwnProperty('id')) {
        e.id = _utils2['default'].id();
      }
      e = (0, _extend2['default'])({},
      // predefined defaults
      EDGE_DEFAULT_OPTIONS,
      // instance defaults
      this.options.edgeDefaults,
      // edge
      e);
      return e;
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
  }, {
    key: 'random',
    value: function random(options) {
      options = (0, _extend2['default'])({
        order: 10,
        size: 15,
        connected: false,
        multiGraph: false,
        pseudoGraph: false
      }, options);

      var i, u, v;
      var nodes = [];
      var adjacencyList = [];
      for (i = 0; i < options.order; i += 1) {
        adjacencyList[i] = [];
        nodes.push({ id: i });
      }

      function add(u, v) {
        adjacencyList[u][v] = adjacencyList[v][u] = true;
      }

      var edges = [];
      i = 0;

      if (options.connected) {
        for (i = 1; i < options.order; i += 1) {
          v = Math.floor(Math.random() * i);
          add(i, v);
          edges.push({
            source: i,
            target: v
          });
        }
        i -= 1;
      }

      for (; i < options.size; i += 1) {
        u = Math.floor(Math.random() * options.order);
        v = Math.floor(Math.random() * options.order);

        if (u === v && !options.pseudoGraph) {
          i -= 1;
        } else if (adjacencyList[u][v] && !options.multiGraph) {
          i -= 1;
        } else {
          add(u, v);
          edges.push({
            source: u,
            target: v
          });
        }
      }

      return {
        nodes: nodes,
        links: edges
      };
    }
  }]);

  return Graph;
})();

exports['default'] = Graph;
module.exports = exports['default'];

},{"./const":6,"./utils":16,"extend":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Vector = (function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  // unary

  _createClass(Vector, null, [{
    key: 'neg',
    value: function neg(a) {
      return new Vector(-a.x, -a.y);
    }
  }, {
    key: 'len',
    value: function len(a) {
      return Math.sqrt(Vector.lenSq(a));
    }
  }, {
    key: 'lenSq',
    value: function lenSq(a) {
      return a.x * a.x + a.y * a.y;
    }
  }, {
    key: 'unit',
    value: function unit(a) {
      if (a.x === 0 && a.y === 0) {
        throw Error('the length of the vector is 0');
      }
      var length = this.len(a);
      return new Vector(a.x / length, a.y / length);
    }
  }, {
    key: 'orthogonal',
    value: function orthogonal(a) {
      return new Vector(-a.y, a.x);
    }
  }, {
    key: 'angleDeg',
    value: function angleDeg(a) {
      return Math.atan2(a.y, a.x) * 180 / Math.PI;
    }

    // binary

  }, {
    key: 'add',
    value: function add(a, b) {
      return new Vector(a.x + b.x, a.y + b.y);
    }
  }, {
    key: 'sub',
    value: function sub(a, b) {
      return new Vector(a.x - b.x, a.y - b.y);
    }
  }, {
    key: 'dot',
    value: function dot(a, b) {
      return a.x * b.x + a.y * b.y;
    }
  }, {
    key: 'scale',
    value: function scale(a, n) {
      return new Vector(a.x * n, a.y * n);
    }
  }, {
    key: 'mid',
    value: function mid(a, b) {
      return Vector.scale(Vector.add(a, b), 0.5);
    }
  }, {
    key: 'angleBetween',
    value: function angleBetween(a, b) {
      return Math.acos(Vector.dot(a, b) / Vector.len(a) - Vector.len(b));
    }
  }, {
    key: 'rotate',
    value: function rotate(a, angle) {
      var cosA = Math.cos(angle);
      var sinA = Math.sin(angle);
      var nx = a.x * cosA - a.y * sinA;
      var ny = a.x * sinA + a.y * cosA;
      return new Vector(nx, ny);
    }
  }]);

  return Vector;
})();

exports['default'] = Vector;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var d3 = window.d3;
var color = d3.scale.category20();
var colors = {};
var colorLiterals = ['BLUE', 'ORANGE', 'GREEN', 'RED', 'PURPLE', 'BROWN', 'PINK', 'GRAY', 'YELLOW', 'CYAN'];
colorLiterals.forEach(function (c, i) {
  colors[c] = color.range()[2 * i];
  colors['LIGHT_' + c] = color.range()[2 * i + 1];
});

colors.randomFromPalette = function () {
  return color.range()[Math.floor(Math.random() * 20)];
};

exports.colors = colors;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var d3 = window.d3;

exports['default'] = function () {
  var owner;

  function moveTowardsPoint(point, middle) {
    var margin = point.r;
    var unit = _Vector2['default'].unit(_Vector2['default'].sub(middle, point));
    return _Vector2['default'].add(point, _Vector2['default'].scale(unit, margin));
  }

  /**
   * Computes the inner points of a loop edge
   *
   * - analyzes each adjacent vertex
   *  - for each each edge u-v move the opposite way e.g. v->u
   *  - the sum of unit vectors will give roughly a good approximation
   *
   * @param {Object} u Vertex
   * @param {number} marginBetweenEdges Defined in `createPath`
   * @param {number} count The number of u-u edges found yet
   * @returns {{path: *[], dir: *}}
   */
  function selfLoop(u, marginBetweenEdges, count) {
    var adjacent = owner.graph.getAdjacentNodes(u);
    var dir = new _Vector2['default'](0, 0);
    for (var i = 0; i < adjacent.length; i += 1) {
      var v = adjacent[i];
      if (u.id !== v.id) {
        dir = _Vector2['default'].unit(_Vector2['default'].add(dir, _Vector2['default'].unit(_Vector2['default'].sub(u, v))));
      }
    }

    function toRad(a) {
      return a * Math.PI / 180;
    }

    // no adjacent vertices
    if (dir.x === 0 && dir.y === 0) {
      dir = _Vector2['default'].unit(new _Vector2['default'](0, -1));
    }

    var ort = _Vector2['default'].orthogonal(dir);

    // moving u towards `dir` `u.r` units
    var uBorderOrigin = _Vector2['default'].scale(dir, u.r + 4);
    // var uBorderOriginTwice = Vector.scale(dir, u.r * 2)
    // uD is now in the edge of the circle, making a little arc in the circle

    // endpoints of the edge will have a separation of 25 deg, 50 deg, 75 deg, ...
    var angle = toRad(25) + (count - 1) * toRad(25);

    // the point to the left of u + uBorder
    var uBorderLeft = _Vector2['default'].add(u, _Vector2['default'].rotate(uBorderOrigin, angle));
    // the point to the right of u + uBorder
    var uBorderRight = _Vector2['default'].add(u, _Vector2['default'].rotate(uBorderOrigin, -angle));

    // some length away from the node computed by doing random samples
    var length = marginBetweenEdges * 0.6 * (count + 1);

    /*
     * Form the shape of a weird rhombus
     *
     *
     *            up
     *           /  \
     *          /    \
     *         /      \
     *        /        \
     *     left       right
     *       \         /
     *     border   border
     *
     */
    var up = _Vector2['default'].add(u, _Vector2['default'].scale(dir, u.r + length));

    var midLeft = _Vector2['default'].add(uBorderLeft, _Vector2['default'].scale(dir, length * 0.5));
    var midRight = _Vector2['default'].add(uBorderRight, _Vector2['default'].scale(dir, length * 0.5));

    var left = _Vector2['default'].add(midLeft, _Vector2['default'].scale(ort, length / 4));
    var right = _Vector2['default'].add(midRight, _Vector2['default'].scale(ort, -length / 4));

    return {
      path: [uBorderLeft, left, up, right, uBorderRight],
      dir: ort
    };
  }

  /**
   * Creates the points of the <path> that represent an edge
   *
   * @param {Object} d Edge
   * @param {Object} meta Holds the edge count between vertices,
   * unit vectors and other metadata
   * @param {number} marginBetweenEdges Used in both normal and
   * loop edges sets the separation between edges from the mid
   * point of the vertices they join
   */
  function createPath(d, meta, marginBetweenEdges) {
    var u, v;
    var current;

    u = d.source;
    v = d.target;
    if (u.id > v.id) {
      var _ref = [v, u];
      u = _ref[0];
      v = _ref[1];
    }
    meta[u.id] = meta[u.id] || {};

    current = meta[u.id][v.id] = meta[u.id][v.id] || {
      count: 1,
      mid: _Vector2['default'].mid(u, v),
      direction: -1
    };

    var innerJoints = [];

    if (u.id === v.id) {
      // apply the following for self-loop edges
      var loop = selfLoop(u, marginBetweenEdges, current.count);
      innerJoints = loop.path;
      d.unit = loop.dir;
    } else {
      var unit;
      if (_Vector2['default'].len(_Vector2['default'].sub(v, u))) {
        unit = _Vector2['default'].unit(_Vector2['default'].sub(v, u));
      } else {
        unit = new _Vector2['default'](1, 0);
      }

      (0, _extend2['default'])(current, {
        unit: unit,
        unitOrthogonal: _Vector2['default'].orthogonal(unit)
      });
      innerJoints.push(_Vector2['default'].add(current.mid, _Vector2['default'].scale(current.unitOrthogonal, Math.floor(current.count / 2) * marginBetweenEdges * current.direction)));
      d.unit = current.unit;
    }

    current.count += 1;
    current.direction *= -1;

    // problem: the edge starts/ends in the center of some node
    //
    // real solution: render the path normally then compute the position of a point
    // with `path.getPointAtLength(t * l)` where `l` is the length of the path and
    // `t` an interpolated place = radius of each node
    //
    // simple trick: shorten the length of the edge by moving the start/end points
    // of the edges toward each other
    var source = d.source;
    var target = d.target;
    source = moveTowardsPoint(d.source, innerJoints[0]);
    target = moveTowardsPoint(d.target, innerJoints[innerJoints.length - 1]);

    d.path = [source].concat(innerJoints).concat([target]);
  }

  var line = d3.svg.line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).tension(1.5).interpolate('bundle');
  // .interpolate('linear')

  function inner(selection) {
    // edges
    var links = selection.selectAll('g.edge').data(function (d) {
      return d.links;
    }, function (d) {
      return d.id;
    });
    links.enter().append('g').attr('class', 'edge').attr('opacity', 0).attr('id', function (d) {
      return _utils2['default'].ns(d.id);
    }).transition('enter').attr('opacity', 1);

    // update
    links.each(function (d) {
      var self = d3.select(this);
      var cls = {
        directed: d.directed || owner.options.directed
      };
      cls['source-' + d.source.id] = true;
      cls['target-' + d.target.id] = true;
      self.classed(cls);
    });

    var meta = {};
    links.each(function (d) {
      createPath(d, meta, 17);
    });

    // path enter
    var paths = links.selectAll('path').data(function (d) {
      // 1. real path
      // 2. stroke-dasharray helper
      return [d, d];
    });
    paths.enter().append('path').attr('stroke', function (d) {
      return d.stroke;
    }).attr('fill', 'transparent').attr('stroke-width', 2).each(function (d, i) {
      var el = d3.select(this);
      el.attr('opacity', !i ? 1 : 0);
      if (i === 0) {
        el.classed('base', true);
      }
      if (i === 1) {
        el.attr('stroke-width', 5);
        el.classed('traversal', true);
      }
    });
    // .attr('d', function () {
    //  var parent = d3.select(this.parentNode).datum()
    //  return line([parent.source])
    // })

    // path update
    _utils2['default'].conditionalTransition(paths, !owner.nodeDragging).attr('d', function (d) {
      return line(d.path);
    });

    paths.each(function (d, i) {
      var path = d3.select(this);
      var parent = d3.select(this.parentNode);
      if (i === 0) {
        path.attr('marker-end', parent.classed('directed') ? 'url(#' + owner.markerId + ')' : null);
      }
    });

    function weightPosition(selection) {
      selection.attr('transform', function (d) {
        var angle = _Vector2['default'].angleDeg(d.unit);
        var v = d.path[Math.floor(d.path.length / 2)];
        return _utils2['default'].transform({
          translate: v,
          rotate: angle
        });
      });
    }

    var weights = links.selectAll('text').data(function (d) {
      return [d];
    });

    // weight enter
    weights.enter().append('text').attr('font-size', '9px').attr('dominant-baseline', 'text-after-edge').attr('text-anchor', 'middle').call(weightPosition);

    // weight update
    _utils2['default'].conditionalTransition(weights, !owner.nodeDragging).text(function (d) {
      return d.weight;
    }).call(weightPosition);

    // weight exit
    weights.exit().remove();

    // exit
    links.exit().remove();
  }

  inner.owner = function (value) {
    if (!arguments.length) {
      return owner;
    }
    owner = value;
    return inner;
  };

  return inner;
};

module.exports = exports['default'];

},{"../Vector":5,"../utils":16,"extend":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _const = require('../const');

var d3 = window.d3;

exports['default'] = function () {
  var owner;

  function inner(selection) {
    var nodes = selection.selectAll('g.node').data(function (d) {
      return d.nodes;
    }, function (d) {
      return d.id;
    });

    var layout = owner.layout;

    var g = nodes.enter().append('g').attr('class', function (d) {
      return 'node ' + (d['class'] || '');
    }).attr('id', function (d) {
      return _utils2['default'].ns(d.id);
    }).attr('transform', function (d) {
      return _utils2['default'].transform({ translate: d });
    }).on('mouseover', function () {
      var el = d3.select(this);
      if (!el.over) {
        el.style('cursor', 'pointer');
      }
      el.over = true;
    }).on('mouseout', function () {
      var el = d3.select(this);
      el.over = false;
      el.style('cursor', null);
    }).attr('opacity', 0);
    g.transition('enter').attr('opacity', 1);
    g.call(layout.drag);

    var dragStart = layout.drag().on('dragstart.d3adaptor');
    var dragEnd = layout.drag().on('dragend.d3adaptor');
    layout.drag().on('dragstart.d3adaptor', function () {
      owner.nodeDragging = true;
      dragStart.apply(undefined, arguments);
    }).on('dragend.d3adaptor', function () {
      owner.nodeDragging = false;
      dragEnd.apply(undefined, arguments);
    });

    g.append('circle').attr('fill', function (d) {
      return d.fill;
    }).attr('r', function (d) {
      return d.r;
    });

    // inner label
    g.append('text').classed('label', true).attr('fill', 'white').attr('font-size', '12px').attr('text-anchor', 'middle').attr('y', function (d) {
      return d.height / 4;
    });
    nodes.selectAll('text.label').text(function (d) {
      if ('label' in d) {
        return d.label;
      }
      return d.id;
    });

    // top-right label
    g.append('text').classed('outer-top-right', true).attr('fill', _const.colors.BLUE).attr('font-size', '9px').attr('text-anchor', 'start').attr('x', function (d) {
      return d.width / 2 - 2;
    }).attr('y', function (d) {
      return -d.height / 2 + 3;
    });
    nodes.selectAll('text.outer-top-right').text(function (d) {
      if ('topRightLabel' in d) {
        return d.topRightLabel;
      }
    });

    // top-left label
    g.append('text').classed('outer-top-left', true).attr('fill', _const.colors.BLUE).attr('font-size', '9px').attr('text-anchor', 'end').attr('x', function (d) {
      return -d.width / 2 - 2;
    }).attr('y', function (d) {
      return -d.height / 2 + 3;
    });
    nodes.selectAll('text.outer-top-left').text(function (d) {
      if ('topRightLabel' in d) {
        return d.topLeftLabel;
      }
    });

    // update
    _utils2['default'].conditionalTransition(nodes, !owner.nodeDragging).attr('transform', function (d) {
      return _utils2['default'].transform({
        translate: d
      });
    });

    // exit
    nodes.exit().remove();
  }

  inner.owner = function (value) {
    if (!arguments.length) {
      return owner;
    }
    owner = value;
    return inner;
  };

  return inner;
};

module.exports = exports['default'];

},{"../const":6,"../utils":16}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polyfills = require('./polyfills');

var _polyfills2 = _interopRequireDefault(_polyfills);

// node

var _Draw = require('./Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Graph = require('./Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _const = require('./const');

var _playerIndex = require('./player/index');

var _playerIndex2 = _interopRequireDefault(_playerIndex);

(0, _polyfills2['default'])();

var d3 = window.d3;

var instances = [];

function run(options) {
  function factory(options) {
    var el = d3.select(options.target);
    var id = el.attr('greuler-id');
    if (!id) {
      id = _utils2['default'].id();
      el.attr('greuler-id', id);
      instances[id] = new _Draw2['default'](id, options);
    }
    return instances[id];
  }

  return factory(options);
}

run.Graph = _Graph2['default'];

run.colors = _const.colors;

run.player = _playerIndex2['default'];

exports['default'] = run;
module.exports = exports['default'];

},{"./Draw":3,"./Graph":4,"./const":6,"./player/index":12,"./polyfills":13,"./utils":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Player = (function () {
  function Player(actions, speed) {
    _classCallCheck(this, Player);

    this.index = 0;
    this.speed = speed;
    this.actions = actions;

    // states
    this.timer = null;
  }

  _createClass(Player, [{
    key: 'play',
    value: function play() {
      if (this.index < this.actions.length) {
        this.actions[this.index++]();
        this.timer = setTimeout(this.play.bind(this), this.speed);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearTimeout(this.timer);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.pause();
      this.index = 0;
    }
  }]);

  return Player;
})();

exports['default'] = Player;
module.exports = exports['default'];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Generator = (function () {
  function Generator(instance, speed) {
    _classCallCheck(this, Generator);

    this.instance = instance;
    this.speed = speed || instance.options.animationTime;
    this.fn = null;
    this.timer = null;
  }

  _createClass(Generator, [{
    key: 'run',
    value: function run(fn) {
      this.fn = fn(this.instance);
      this.play();
    }
  }, {
    key: 'runAnimation',
    value: function runAnimation(animation) {
      if (Array.isArray(animation)) {
        return animation.forEach(this.runAnimation, this);
      }

      if (typeof animation === 'function') {
        return animation(this.instance);
      }

      var type = this.instance[animation.type];
      return type[animation.op].apply(type, animation.args || []);
    }
  }, {
    key: 'play',
    value: function play(value) {
      var self = this;
      var next = this.fn.next(value);
      if (!next.done) {
        var delay = this.speed;
        var runAnimationValue = this.runAnimation(next.value);
        if (runAnimationValue && typeof runAnimationValue === 'object') {
          if (typeof runAnimationValue.delay === 'number') {
            delay = runAnimationValue.delay;
          }
        }

        this.timer = window.requestTimeout(function () {
          self.play(next.value);
        }, delay);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      window.clearRequestTimeout(this.timer);
    }
  }]);

  return Generator;
})();

exports['default'] = Generator;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Fixed = require('./Fixed');

var _Fixed2 = _interopRequireDefault(_Fixed);

var _Generator = require('./Generator');

var _Generator2 = _interopRequireDefault(_Generator);

exports['default'] = {
  FixedInterval: _Fixed2['default'],
  Generator: _Generator2['default']
};
module.exports = exports['default'];

},{"./Fixed":10,"./Generator":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  (function (doc, proto) {
    try {
      // check if browser supports :scope natively
      doc.querySelector(':scope body');
    } catch (err) {
      // polyfill native methods if it doesn't
      ['querySelector', 'querySelectorAll'].forEach(function (method) {
        var native = proto[method];
        proto[method] = function (selectors) {
          if (/(^|,)\s*:scope/.test(selectors)) {
            // only if selectors contains :scope
            var id = this.id; // remember current element id
            this.id = 'ID_' + Date.now(); // assign new unique id
            selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id); // replace :scope with #ID
            var result = doc[method](selectors);
            this.id = id; // restore previous id
            return result;
          } else {
            return native.call(this, selectors); // use native code for other selectors
          }
        };
      });
    }
  })(window.document, Element.prototype);

  // from https://gist.github.com/joelambert/1002116
  //
  // requestAnimationFrame() shim by Paul Irish
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  /**
   * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
   * @param {function} fn The callback function
   * @param {int} delay The delay in milliseconds
   */
  window.requestTimeout = function (fn, delay) {
    if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return window.setTimeout(fn, delay);

    var start = new Date().getTime();
    var handle = {};

    function loop() {
      var current = new Date().getTime(),
          delta = current - start;

      delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
    }

    handle.value = requestAnimFrame(loop);
    return handle;
  };

  /**
   * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
   * @param {int|object} handle The callback function
   */
  window.clearRequestTimeout = function (handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) : clearTimeout(handle);
  };
  /*eslint-enable */
};

module.exports = exports['default'];

/*eslint-disable */ /* function */ /* DOMElement */

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var ElementSelector = (function () {
  function ElementSelector(owner) {
    _classCallCheck(this, ElementSelector);

    this.owner = owner;
    this.graph = owner.graph;
    this.defaultStyleOptions = {};
  }

  _createClass(ElementSelector, [{
    key: 'getDefaultStyleOptions',
    value: function getDefaultStyleOptions() {
      return (0, _extend2['default'])({
        duration: this.getAnimationTime(),
        stroke: '#E74C3C'
      }, this.defaultStyleOptions);
    }
  }, {
    key: 'getStyleOptions',
    value: function getStyleOptions(options) {
      return (0, _extend2['default'])({}, this.getDefaultStyleOptions(), options);
    }
  }, {
    key: 'getAnimationTime',
    value: function getAnimationTime() {
      return this.owner.options.animationTime;
    }

    /**
     * Given a collection of elements returned by the Graph class this methods returns
     * the d3 selection that for all those objects
     *
     * @param {Object[]|Object} els An array of edges/nodes or a single edge/node
     * @return {d3_selection}
     */
  }, {
    key: 'select',
    value: function select(els) {
      if (!Array.isArray(els)) {
        els = [els];
      }
      if (!els.length) {
        els.push({ id: -1 });
      }
      els = els.filter(Boolean);
      return this.owner.root.selectAll(els.map(function (e) {
        return '#' + _utils2['default'].ns(e.id);
      }).join(', '));
    }

    /**
     * Selects the path inside the tag <g> that represents an edge
     *
     * @param {d3_selection} selection
     */
  }, {
    key: 'innerEdgeSelector',
    value: function innerEdgeSelector(selection) {
      return selection.selectAll('path.base');
    }

    /**
     * Selects the circle inside the tag <g> that represents a node
     *
     * @param {d3_selection} selection
     */
  }, {
    key: 'innerNodeSelector',
    value: function innerNodeSelector(selection) {
      return selection.selectAll('circle');
    }
  }]);

  return ElementSelector;
})();

exports['default'] = ElementSelector;
module.exports = exports['default'];

},{"../utils":16,"extend":2}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _Graph2 = require('./Graph');

var _Graph3 = _interopRequireDefault(_Graph2);

var d3 = window.d3;

var HIGHLIGHT = 'highlight';

var GreulerDefaultTransition = (function (_Graph) {
  _inherits(GreulerDefaultTransition, _Graph);

  function GreulerDefaultTransition() {
    _classCallCheck(this, GreulerDefaultTransition);

    _get(Object.getPrototypeOf(GreulerDefaultTransition.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(GreulerDefaultTransition, [{
    key: 'getEdges',

    /**
     * Gets all the edges of the graph
     *
     * @returns {d3_selection}
     */
    value: function getEdges() {
      return this.innerEdgeSelector(this.select(this.graph.edges));
    }

    /**
     * Gets all the nodes of the graph
     *
     * @returns {d3_selection}
     */
  }, {
    key: 'getNodes',
    value: function getNodes() {
      return this.innerNodeSelector(this.select(this.graph.nodes));
    }

    /**
     * Highlights a node temporarily, it consists of two
     * chained transitions
     *
     * - increase the radius to 1.5x the original `r` value
     * - decrease the radius to the original `r` value
     *
     * @param {d3_selection} selection
     * @param {Object} options
     * @returns {d3_transition}
     */
  }, {
    key: 'doTemporalHighlightNode',
    value: function doTemporalHighlightNode(selection, options) {
      return this.innerNodeSelector(selection).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('r', function (d) {
        return options.r || d.r * 1.5;
      }).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('r', function (d) {
        return d.r;
      });
    }

    /**
     * Highlights an edge temporarily, it consists of two
     * chained transitions
     *
     * - change the stroke of the `path` that represents the edge to
     * `options.stroke`
     * - change the stroke to the original value
     *
     * @param {d3_selection} selection
     * @param {Object} options
     * @returns {d3_transition}
     */
  }, {
    key: 'doTemporalHighlightEdges',
    value: function doTemporalHighlightEdges(selection, options) {
      return this.innerEdgeSelector(selection).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('stroke', options.stroke).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('stroke', function (d) {
        return d.stroke;
      });
    }

    /**
     * Edge traversal animation, it animates a hidden path giving the impression
     * of movement, if source is given then it will always start the animation
     * from the node `source` even if the edge is an incoming edge
     *
     * @param {d3_selection} selection
     * @param {config} options
     * @param {number} [source=-1]
     * @returns {d3_transition}
     */
  }, {
    key: 'traverseEdgeWithDirection',
    value: function traverseEdgeWithDirection(selection, options) {
      var source = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];

      return selection.selectAll('path.traversal').each(function () {
        var el = d3.select(this);
        var l = this.getTotalLength();
        el.attr('stroke', options.stroke).attr('stroke-dasharray', l + ' ' + l).attr('stroke-dashoffset', l).attr('opacity', 1);
      }).transition('dasharray').duration(options.duration).attr('stroke-dashoffset', function (d) {
        var length = this.getTotalLength();
        var twiceLength = length * 2;
        var lengthToMove = 0;
        if (source !== -1) {
          if (d.target.id === source) {
            lengthToMove = twiceLength;
          }
        }

        if (options.reverse) {
          lengthToMove = twiceLength - lengthToMove;
        }

        return lengthToMove;
      }).attr('opacity', 0).each('end', function () {
        var el = d3.select(this);
        el.attr('stroke-dasharray', null).attr('stroke-dashoffset', null).attr('opacity', 0);
      });
    }
  }, {
    key: 'traverseEdges',
    value: function traverseEdges(selection, options, source) {
      options = (0, _extend2['default'])({
        keepStroke: true,
        reverse: false
      }, this.getStyleOptions(), options);

      selection.call(this.traverseEdgeWithDirection, options, source);
      if (options.keepStroke) {
        this.innerEdgeSelector(selection).transition('update').duration(options.duration).attr('stroke', options.stroke);
      }
      return this.innerEdgeSelector(selection);
    }
  }, {
    key: 'getNode',
    value: function getNode(node) {
      return this.innerNodeSelector(this.select(this.graph.getNode(node)));
    }
  }, {
    key: 'getEdge',
    value: function getEdge(edge) {
      return this.innerEdgeSelector(this.select(this.graph.getEdge(edge)));
    }

    // temporal highlight

  }, {
    key: 'highlightNode',
    value: function highlightNode(node, options) {
      return this.doTemporalHighlightNode(this.select(this.graph.getNode(node)), this.getStyleOptions(options));
    }
  }, {
    key: 'highlightEdge',
    value: function highlightEdge(edge, options) {
      return this.doTemporalHighlightEdges(this.select(this.graph.getEdge(edge)), this.getStyleOptions(options));
    }
  }, {
    key: 'highlightIncidentEdges',
    value: function highlightIncidentEdges(node, options) {
      return this.doTemporalHighlightEdges(this.select(this.graph.getIncidentEdges(node)), this.getStyleOptions(options));
    }
  }, {
    key: 'highlightOutgoingEdges',
    value: function highlightOutgoingEdges(node, options) {
      return this.doTemporalHighlightEdges(this.select(this.graph.getOutgoingEdges(node)), this.getStyleOptions(options));
    }
  }, {
    key: 'highlightIncomingEdges',
    value: function highlightIncomingEdges(node, options) {
      return this.doTemporalHighlightEdges(this.select(this.graph.getIncomingEdges(node)), this.getStyleOptions(options));
    }

    // traversal of an edge given a node

  }, {
    key: 'traverseOutgoingEdges',
    value: function traverseOutgoingEdges(node, options) {
      return this.traverseEdges(this.select(this.graph.getOutgoingEdges(node)), this.getStyleOptions(options));
    }
  }, {
    key: 'traverseIncomingEdges',
    value: function traverseIncomingEdges(node, options) {
      return this.traverseEdges(this.select(this.graph.getIncomingEdges(node)), this.getStyleOptions(options));
    }
  }, {
    key: 'traverseIncidentEdges',
    value: function traverseIncidentEdges(node, options) {
      return this.traverseEdges(this.select(this.graph.getIncidentEdges(node)), this.getStyleOptions(options));
    }

    // traversal of an edge between two nodes

  }, {
    key: 'traverseEdgesBetween',
    value: function traverseEdgesBetween(edge, options) {
      return this.traverseEdges(this.select(this.graph.getEdgesBetween(edge)), this.getStyleOptions(options), edge.source);
    }
  }, {
    key: 'traverseAllEdgesBetween',
    value: function traverseAllEdgesBetween(edge, options) {
      return this.traverseEdges(this.select(this.graph.getAllEdgesBetween(edge)), this.getStyleOptions(options), edge.source);
    }
  }]);

  return GreulerDefaultTransition;
})(_Graph3['default']);

exports['default'] = GreulerDefaultTransition;
module.exports = exports['default'];

},{"./Graph":14,"extend":2}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _computeLcg = require('compute-lcg');

var _computeLcg2 = _interopRequireDefault(_computeLcg);

var rand = (0, _computeLcg2['default'])(1);

exports['default'] = {
  id: function id() {
    var n = rand();
    var letter = String.fromCharCode(Math.floor(n * 26) + 97);
    return letter + n.toString(16).substr(2);
  },

  transform: function transform(o) {
    var str = '';
    if ('translate' in o) {
      str += ' translate(' + o.translate.x + ', ' + o.translate.y + ')';
    }
    if ('rotate' in o) {
      str += ' rotate(' + o.rotate + ')';
    }
    if ('scale' in o) {
      str += ' scale(' + o.scale + ')';
    }
    return str;
  },

  transition: function transition(selection) {
    return selection.transition('layout').duration(300).ease('linear');
  },

  conditionalTransition: function conditionalTransition(el, condition) {
    if (condition) {
      return this.transition(el);
    }
    return el;
  },

  ns: function ns(str) {
    return 'greuler-' + str;
  }
};
module.exports = exports['default'];

},{"compute-lcg":1}]},{},[9])(9)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL0RyYXcuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2NvbnN0LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvZWxlbWVudHMvZWRnZS5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9GaXhlZC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wb2x5ZmlsbHMuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbi5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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R0FDVjs7QUFFRCxJQUFFLEVBQUUsWUFBVSxHQUFHLEVBQUU7QUFDakIsV0FBTyxVQUFVLEdBQUcsR0FBRyxDQUFBO0dBQ3hCO0NBQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4qXG4qXHRDT01QVVRFOiBsY2dcbipcbipcbipcdERFU0NSSVBUSU9OOlxuKlx0XHQtIEEgbGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvciAobGNnKS5cbipcbipcbipcdE5PVEVTOlxuKlx0XHRbMV0gQmFzZWQgb24gVy4gUHJlc3MsIGV0IGFsLiwgTnVtZXJpY2FsIFJlY2lwZXMgaW4gQyAoMmQgZWQuIDE5OTIpXG4qXG4qXG4qXHRUT0RPOlxuKlx0XHRbMV1cbipcbipcbipcdExJQ0VOU0U6XG4qXHRcdE1JVFxuKlxuKlx0Q29weXJpZ2h0IChjKSAyMDE0LiByZ2l6ei5cbipcbipcbipcdEFVVEhPUjpcbipcdFx0cmdpenouIGd6dG93bjIyMTZAeWFob28uY29tLiAyMDE0LlxuKlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBWQVJJQUJMRVMgLy9cblxudmFyIE1BU0sgPSAxMjM0NTk4NzYsXG5cdE0gPSAyMTQ3NDgzNjQ3LFxuXHRBID0gMTY4MDc7XG5cblxuLy8gTENHIC8vXG5cbi8qKlxuKiBGVU5DVElPTjogbGNnKCBbc2VlZF0gKVxuKlx0UmV0dXJucyBhIGxpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuIElmIG5vdCBwcm92aWRlZCBhIHNlZWQsIGEgc2VlZCBpcyBnZW5lcmF0ZWQgYmFzZWQgb24gdGhlIGN1cnJlbnQgdGltZS5cbipcbiogQHBhcmFtIHtOdW1iZXJ9IFtzZWVkXSAtIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIHNlZWRcbiogQHJldHVybnMge0Z1bmN0aW9ufSBnZW5lcmF0b3JcbiovXG5mdW5jdGlvbiBsY2coIHZhbCApIHtcblx0dmFyIHNlZWQ7XG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRpZiAoIHR5cGVvZiB2YWwgIT09ICdudW1iZXInIHx8IHZhbCAhPT0gdmFsIHx8IHZhbCAlIDEgIT09IDAgfHwgdmFsIDwgMSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdsY2coKTo6aW52YWxpZCBpbnB1dCBhcmd1bWVudC4gU2VlZCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4nICk7XG5cdFx0fVxuXHRcdHNlZWQgPSB2YWw7XG5cdH0gZWxzZSB7XG5cdFx0c2VlZCA9IERhdGUubm93KCkgJSAxMDAwMDAwMDA7XG5cdH1cblx0LyoqXG5cdCogRlVOQ1RJT046IGxjZyggW05dIClcblx0Klx0TGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cblx0KlxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbTl0gLSBudW1iZXIgb2YgcHNldWRvcmFuZG9tIG51bWJlcnMgdG8gcmV0dXJuXG5cdCogQHJldHVybnMge051bWJlcnxBcnJheX0gcHNldWRvcmFuZG9tIGZsb2F0aW5nLXBvaW50IG51bWJlcihzKSBiZXR3ZWVuIDAgYW5kIDFcblx0Ki9cblx0cmV0dXJuIGZ1bmN0aW9uIGxjZyggTiApIHtcblx0XHR2YXIgYXJyLFxuXHRcdFx0cmFuZDtcblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0c2VlZCA9ICggQSAqIHNlZWQgKSAlIE07XG5cdFx0XHRyYW5kID0gc2VlZCAvIE07XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRyZXR1cm4gcmFuZDtcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgTiAhPT0gJ251bWJlcicgfHwgTiAhPT0gTiB8fCBOJTEgIT09IDAgfHwgTiA8IDEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnbGNnKCk6OmludmFsaWQgaW5wdXQgYXJndW1lbnQuIEFycmF5IGxlbmd0aCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4nICk7XG5cdFx0fVxuXHRcdGFyciA9IG5ldyBBcnJheSggTiApO1xuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IE47IGkrKyApIHtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHNlZWQgPSAoIEEgKiBzZWVkICkgJSBNO1xuXHRcdFx0YXJyWyBpIF0gPSBzZWVkIC8gTTtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHR9XG5cdFx0cmV0dXJuIGFycjtcblx0fTtcbn0gLy8gZW5kIEZVTkNUSU9OIGxjZygpXG5cblxuLy8gRVhQT1JUUyAvL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxjZztcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZDMgPSB3aW5kb3cuZDNcbnZhciBjb2xhID0gd2luZG93LmNvbGFcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5pbXBvcnQgbm9kZSBmcm9tICcuL2VsZW1lbnRzL25vZGUnXG5pbXBvcnQgZWRnZSBmcm9tICcuL2VsZW1lbnRzL2VkZ2UnXG5pbXBvcnQgR3JhcGhNYW5hZ2VyIGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGZyb20gJy4vc2VsZWN0b3IvR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3IHtcbiAgY29uc3RydWN0b3IgKGlkLCBvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdGhpcy5ldmVudHMgPSBkMy5kaXNwYXRjaCgnbGF5b3V0JywgJ2ZpcnN0TGF5b3V0RW5kJylcblxuICAgIHRoaXMubWFya2VySWQgPSAnbWFya2VyLScgKyBpZFxuXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyhvcHRpb25zKVxuXG4gICAgLy8gZ3JhcGggaGFuZGxlcyB0aGUgaW50ZXJhY3Rpb25zIHdpdGggdGhlIGRyYXdlclxuICAgIHRoaXMuY3JlYXRlR3JhcGgoKVxuXG4gICAgLy8gc2VsZWN0b3IgYW5pbWF0ZXMgdGhlIG5vZGVzL2VkZ2VzXG4gICAgdGhpcy5zZWxlY3RvciA9IG5ldyBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24odGhpcylcblxuICAgIC8vIHN1Yi1lbGVtZW50cyB0aGF0IGRyYXcgc3R1ZmZcbiAgICB0aGlzLm5vZGVEcmF3ZXIgPSBub2RlKCkub3duZXIodGhpcylcbiAgICB0aGlzLmVkZ2VEcmF3ZXIgPSBlZGdlKCkub3duZXIodGhpcylcblxuICAgIC8vIGNvbGFcbiAgICB0aGlzLmxheW91dCA9IGNvbGEuZDNhZGFwdG9yKClcblxuICAgIHRoaXMubGF5b3V0Lm9uKCd0aWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50aWNrKClcbiAgICB9KVxuXG4gICAgdmFyIGZpcnN0RW5kID0gdHJ1ZVxuICAgIHRoaXMubGF5b3V0Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZmlyc3RFbmQpIHtcbiAgICAgICAgc2VsZi5ldmVudHMuZmlyc3RMYXlvdXRFbmQoKVxuICAgICAgICBmaXJzdEVuZCA9IGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZUdyYXBoICgpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMub3B0aW9ucy5kYXRhXG4gICAgdmFyIG5vZGVzID0gZGF0YS5ub2Rlc1xuICAgIHZhciBsaW5rcyA9IGRhdGEubGlua3NcblxuICAgIC8vIGVtcHR5IGFuZCByZS1hZGRcbiAgICBkYXRhLm5vZGVzID0gW11cbiAgICBkYXRhLmxpbmtzID0gW11cblxuICAgIHRoaXMuZ3JhcGggPSBuZXcgR3JhcGhNYW5hZ2VyKHRoaXMsIGRhdGEpXG4gICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdGhpcy5ncmFwaC5hZGROb2RlKG5vZGUpXG4gICAgfSwgdGhpcylcbiAgICBsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICB0aGlzLmdyYXBoLmFkZEVkZ2UoZWRnZSlcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqXG4gICAqIG9wdGlvbnNcbiAgICogICAtIHRhcmdldCB7c3RyaW5nfSBzZWxlY3RvciB0byB0aGUgZWxlbWVudCB0byBob2xkIHRoZSBncmFwaFxuICAgKiAgIC0gd2lkdGgge251bWJlcn1cbiAgICogICAtIGhlaWdodCB7bnVtYmVyfVxuICAgKiAgIC0gbGFiZWxzPXRydWUge2Jvb2xlYW59IEZhbHNlIHRvIGhpZGUgdGhlIHZlcnRleCBsYWJlbHNcbiAgICogICAtIGRpcmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGdpdmUgYW4gb3JpZW50YXRpb24gdG8gdGhlIGVkZ2VzXG4gICAqICAgaGF2ZSBhbiBlZGdlXG4gICAqICAgLSBkYXRhIHtPYmplY3R9XG4gICAqICAgICAtIGxpbmtEaXN0YW5jZT05MCB7bnVtYmVyfSBGb3JjZWQgbWluIGRpc3RhbmNlIGJldHdlZW4gdmVydGljZXMgdGhhdFxuICAgKiAgICAgLSBjb25zdHJhaW50cyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIGdyb3VwcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIG5vZGVzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSByPTEwIHtudW1iZXJ9IG5vZGUgcmFkaXVzXG4gICAqICAgICAtIGxpbmtzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSBkaXJlY3RlZD1mYWxzZSB7Ym9vbGVhbn0gdHJ1ZSB0byBnaXZlIGFuIG9yaWVudGF0aW9uIHRvIHRoaXMgZWRnZVxuICAgKiAgICAgICAtIHdlaWdodD1cIlwiIHtzdHJpbmd9IExhYmVsIG9mIHRoZSBlZGdlIChjYW4gYmUgdGhlIHdlaWdodClcbiAgICpcbiAgICovXG4gIGRlZmF1bHRPcHRpb25zIChvcHRpb25zKSB7XG4gICAgLy8gZ3JhcGggZGVmYXVsdHNcbiAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIHdpZHRoOiA3MDAsXG4gICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgIGFuaW1hdGlvblRpbWU6IDEwMDAsXG4gICAgICBsYWJlbHM6IHRydWUsXG4gICAgICBkaXJlY3RlZDogZmFsc2VcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5vcHRpb25zLmRhdGEgPSBleHRlbmQoe1xuICAgICAgbm9kZXM6IFtdLFxuICAgICAgbGlua3M6IFtdLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIGNvbnN0cmFpbnRzOiBbXSxcbiAgICAgIGF2b2lkT3ZlcmxhcHM6IHRydWUsXG4gICAgICBzaXplOiBbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdLFxuICAgICAgbGlua0Rpc3RhbmNlOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rRGlzdGFuY2UgfHwgODBcbiAgICAgIH1cbiAgICB9LCB0aGlzLm9wdGlvbnMuZGF0YSlcbiAgfVxuXG4gIGluaXRMYXlvdXQgKHVwZGF0ZU9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcblxuICAgIGlmICh1cGRhdGVPcHRpb25zLnNraXBMYXlvdXQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHNlbGYub3B0aW9ucy5kYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICB2YXIgdiA9IHNlbGYub3B0aW9ucy5kYXRhW2tdXG4gICAgICBzZWxmLmxheW91dFtrXSh2KVxuICAgIH0sIHRoaXMpXG5cbiAgICAvLyB0aGlzLmxheW91dC5zdGFydCgxNSwgMTUsIDE1KVxuICAgIHRoaXMubGF5b3V0LnN0YXJ0KClcbiAgfVxuXG4gIHRpY2sgKCkge1xuICAgIHRoaXMuZWRnZUdyb3VwLmNhbGwodGhpcy5lZGdlRHJhd2VyKVxuICAgIHRoaXMubm9kZUdyb3VwLmNhbGwodGhpcy5ub2RlRHJhd2VyKVxuICB9XG5cbiAgdXBkYXRlICh1cGRhdGVPcHRpb25zKSB7XG4gICAgdXBkYXRlT3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBza2lwTGF5b3V0OiBmYWxzZVxuICAgIH0sIHVwZGF0ZU9wdGlvbnMpXG5cbiAgICB0aGlzLmluaXRMYXlvdXQodXBkYXRlT3B0aW9ucylcbiAgICB0aGlzLmJ1aWxkKHVwZGF0ZU9wdGlvbnMpXG5cbiAgICAvLyB1cGRhdGUgaW5uZXIgbm9kZXMvZWRnZXMgaWYgbGF5b3V0LnRpY2sgd2Fzbid0IHJ1blxuICAgIGlmICh1cGRhdGVPcHRpb25zLnNraXBMYXlvdXQpIHtcbiAgICAgIHRoaXMudGljaygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGJ1aWxkICgpIHtcbiAgICB0aGlzLnJvb3QgPSBkMy5zZWxlY3QodGhpcy5vcHRpb25zLnRhcmdldClcbiAgICAgIC5zZWxlY3RBbGwoJ3N2Zy5ncmV1bGVyJylcbiAgICAgIC5kYXRhKFt0aGlzLm9wdGlvbnNdKVxuXG4gICAgLy8gZW50ZXJcbiAgICB0aGlzLnJvb3QuZW50ZXIgPSB0aGlzLnJvb3QuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdncmV1bGVyJylcblxuICAgIC8vIG1hcmtlciBkZWZcbiAgICB0aGlzLnJvb3QuZW50ZXJcbiAgICAgIC5hcHBlbmQoJ3N2ZzpkZWZzJylcbiAgICAgIC5hcHBlbmQoJ3N2ZzptYXJrZXInKVxuICAgICAgLmF0dHIoJ2lkJywgdGhpcy5tYXJrZXJJZClcbiAgICAgIC5hdHRyKCd2aWV3Qm94JywgJzAgLTUgMTAgMTAnKVxuICAgICAgLmF0dHIoJ3JlZlgnLCA5KVxuICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgNSlcbiAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCA1KVxuICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcbiAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgIC5hdHRyKCdkJywgJ00wLC00TDEwLDBMMCw0TDIsMCcpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgJzBweCcpXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM3NzcnKVxuXG4gICAgLy8gdXBkYXRlXG4gICAgdGhpcy5yb290XG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5vcHRpb25zLmhlaWdodClcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBlZGdlc1xuICAgIHRoaXMuZWRnZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLmVkZ2VzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXSB9KVxuICAgIHRoaXMuZWRnZUdyb3VwXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2VzJylcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBub2Rlc1xuICAgIHRoaXMubm9kZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGVzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXSB9KVxuICAgIHRoaXMubm9kZUdyb3VwXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGVzJylcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi9jb25zdCdcblxuY29uc3QgTk9ERV9ERUZBVUxUX09QVElPTlMgPSB7XG4gIHI6IDEwLFxuICBmaWxsOiAnIzI5ODBCOSdcbn1cblxuY29uc3QgRURHRV9ERUZBVUxUX09QVElPTlMgPSB7XG4gIHN0cm9rZTogY29sb3JzLkxJR0hUX0dSQVlcbn1cblxuZnVuY3Rpb24gaW5jbHVkZXMgKGFyciwgaWQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoYXJyW2ldLmlkID09PSBpZCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGgge1xuICBjb25zdHJ1Y3RvciAob3duZXIsIGRhdGEpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICB0aGlzLm5vZGVzID0gZGF0YS5ub2Rlc1xuICAgIHRoaXMuZWRnZXMgPSBkYXRhLmxpbmtzXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5vZGUgdG8gdGhlIGdyYXBoLCBlYWNoIG9mIHRoZSBhcmd1bWVudHMgbXVzdFxuICAgKiBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7TnVtYmVyfHN0cmluZ31cbiAgICpcbiAgICogT3B0aW9uYWwgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIHgge251bWJlcn0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIG5vZGUgaW4gdGhlIGdyYXBoIChvbmx5IGlmIGZpeGVkID0gdHJ1ZSlcbiAgICogLSB5IHtudW1iZXJ9IFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhpcyBub2RlIGluIHRoZSBncmFwaCAob25seSBpZiBmaXhlZCA9IHRydWUpXG4gICAqIC0gZml4ZWQge2Jvb2xlYW59IGB0cnVlYCB0byBtYWtlIHRoaXMgbm9kZSBub3QgdG8gcGFydGljaXBhdGUgaW4gdGhlIGxheW91dCBwcm9jZXNzXG4gICAqIC0gZmlsbCB7c3RyaW5nfSBUaGUgZmlsbCBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIHIge251bWJlcn0gVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIGxhYmVsIHtzdHJpbmd9IFRoZSB0ZXh0IGluc2lkZSB0aGUgbm9kZSAoaWYgaXQncyBub3QgcHJlc2VudCBpdCdzIGVxdWFsIHRvIHRoZSBgaWRgKVxuICAgKiAtIHRvcFJpZ2h0TGFiZWwge3N0cmluZ10gdGhlIHRleHQgc2hvd24gb24gdGhlIHRvcCByaWdodCBzaWRlIG9mIHRoZSBub2RlLCB1c2VmdWxcbiAgICogdG8gcmVwcmVzZW50IGFkZGl0aW9uYWwgYW5ub3RhdGlvbnNcbiAgICpcbiAgICogTk9URTogdGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgKi9cbiAgYWRkTm9kZSAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHNbaV1cbiAgICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0aGUgb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYCcpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXROb2RlKGNvbmZpZykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25vZGUgYWxyZWFkeSBpbiBzdG9yZScpXG4gICAgICB9XG4gICAgICB0aGlzLm5vZGVzLnB1c2goXG4gICAgICAgIEdyYXBoLmFwcGVuZE5vZGVEZWZhdWx0cy5jYWxsKHRoaXMub3duZXIsIGNvbmZpZylcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIG5vZGUgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIGdldE5vZGUgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0J5Rm4odiA9PiB2LmlkID09PSBub2RlLmlkKVswXVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHBhcmFtZXRlciBgZm5gLFxuICAgKiBhbGlhcyBmb3IgYHRoaXMubm9kZXMuZmlsdGVyKGZuKWBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0Tm9kZXNCeUZuIChmbikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLmZpbHRlcihmbilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgYWRqYWNlbnQgbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnROb2RlcyAobm9kZSkge1xuICAgIHZhciBhZGphY2VudE5vZGVzID0gW11cbiAgICB2YXIgdGFrZW4gPSB7fVxuICAgIHZhciBuZXh0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV1cbiAgICAgIG5leHQgPSBudWxsXG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0XG4gICAgICB9IGVsc2UgaWYgKGVkZ2UudGFyZ2V0LmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnNvdXJjZVxuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlXG4gICAgICAgIGFkamFjZW50Tm9kZXMucHVzaChuZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZGphY2VudE5vZGVzXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHN1Y2Nlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRTdWNjZXNzb3JOb2RlcyAobm9kZSkge1xuICAgIHZhciBzdWNjZXNzb3IgPSBbXVxuICAgIHZhciB0YWtlbiA9IHt9XG4gICAgdmFyIG5leHRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXVxuICAgICAgbmV4dCA9IG51bGxcbiAgICAgIGlmIChlZGdlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS50YXJnZXRcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWVcbiAgICAgICAgc3VjY2Vzc29yLnB1c2gobmV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHByZWRlY2Vzc29yIG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldFByZWRlY2Vzc29yTm9kZXMgKG5vZGUpIHtcbiAgICB2YXIgcHJlZGVjZXNzb3IgPSBbXVxuICAgIHZhciB0YWtlbiA9IHt9XG4gICAgdmFyIG5leHRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXVxuICAgICAgbmV4dCA9IG51bGxcbiAgICAgIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2VcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWVcbiAgICAgICAgcHJlZGVjZXNzb3IucHVzaChuZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcmVkZWNlc3NvclxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqL1xuICByZW1vdmVOb2RlIChub2RlKSB7XG4gICAgdGhpcy5yZW1vdmVOb2Rlc0J5Rm4oZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2LmlkID09PSBub2RlLmlkXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgbm9kZXMgc3RvcmVkIGluIGBub2Rlc2AsXG4gICAqIGVhY2ggb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBub2Rlc1xuICAgKi9cbiAgcmVtb3ZlTm9kZXMgKG5vZGVzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlTm9kZXNCeUZuKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMobm9kZXMsIHYuaWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgbm9kZXMgdGhhdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlTm9kZXNCeUZuIChmbikge1xuICAgIHZhciBpXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLm5vZGVzW2ldLCBpKSkge1xuICAgICAgICAvLyByZW1vdmUgbm9kZXNcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVzLnNwbGljZShpLCAxKVxuICAgICAgICAvLyByZW1vdmUgaW5jaWRlbnQgZWRnZXNcbiAgICAgICAgdGhpcy5yZW1vdmVFZGdlcyhcbiAgICAgICAgICB0aGlzLmdldEluY2lkZW50RWRnZXMobm9kZVswXSlcbiAgICAgICAgKVxuICAgICAgICBpIC09IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlZGdlIHRvIHRoZSBncmFwaCwgZWFjaCBvZiB0aGUgYXJndW1lbnRzIG11c3RcbiAgICogYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIFJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBzb3VyY2Uge251bWJlcnxPYmplY3R9IFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGUgb3IgdGhlIHNvdXJjZSBub2RlIGl0c2VsZlxuICAgKiAtIHRhcmdldCB7bnVtYmVyfE9iamVjdH0gVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZSBvciB0aGUgdGFyZ2V0IG5vZGUgaXRzZWxmXG4gICAqXG4gICAqIE9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7c3RyaW5nfE9iamVjdH0gSWYgYW4gaWQgaXMgbm90IHByb3ZpZGVkIGFuIGF1dG8gZ2VuZXJhdGVkIHN0cmluZyB3aWxsIGJlIGFzc2lnbmVkXG4gICAqIHRvIHRoaXMgZWRnZVxuICAgKiAtIHN0cm9rZSB7c3RyaW5nfSBUaGUgc3Ryb2tlIG9mIHRoZSBwYXRoIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZVxuICAgKiAtIHdlaWdodCB7c3RyaW5nfSBUaGUgd2VpZ2h0IG9mIHRoZSBlZGdlXG4gICAqIC0gZGlyZWN0ZWQge2Jvb2xlYW59IElmIHNldCB0byB0cnVlIGFuIGFkZGl0aW9uYWwgYXJyb3cgaXMgYWRkZWQgYXQgdGhlIGVuZCBvZiB0aGUgZWRnZVxuICAgKlxuICAgKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqL1xuICBhZGRFZGdlICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgfHwgIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0JykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBlZGdlIG11c3QgaGF2ZSB0aGUgcHJvcGVydGllcyBgc291cmNlYCBhbmQgYHRhcmdldGAnKVxuICAgICAgfVxuICAgICAgdmFyIHNvdXJjZSA9IGNvbmZpZy5zb3VyY2VcbiAgICAgIHZhciB0YXJnZXQgPSBjb25maWcudGFyZ2V0XG5cbiAgICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBzb3VyY2UgPSB0aGlzLmdldE5vZGUoeyBpZDogY29uZmlnLnNvdXJjZSB9KVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXROb2RlKHsgaWQ6IGNvbmZpZy50YXJnZXQgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKCFzb3VyY2UgfHwgIXRhcmdldCkge1xuICAgICAgICB0aHJvdyBFcnJvcignbmV3IGVkZ2UgZG9lcyBub3Qgam9pbiBleGlzdGluZyB2ZXJ0aWNlcycpXG4gICAgICB9XG4gICAgICBjb25maWcuc291cmNlID0gc291cmNlXG4gICAgICBjb25maWcudGFyZ2V0ID0gdGFyZ2V0XG4gICAgICB0aGlzLmVkZ2VzLnB1c2goXG4gICAgICAgIEdyYXBoLmFwcGVuZEVkZ2VEZWZhdWx0cy5jYWxsKHRoaXMub3duZXIsIGNvbmZpZylcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBlZGdlIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0RWRnZSAoZWRnZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihlID0+IGUuaWQgPT09IGVkZ2UuaWQpWzBdXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGRpcmVjdGVkIGVkZ2VzIGZyb20gdGhlIG5vZGUgd2hvc2UgaWQgaXNcbiAgICogYG9wdGlvbnMuc291cmNlYCBhbmQgdG8gdGhlIG5vZGUgd2hvc2UgaWQgaXMgYG9wdGlvbnMudGFyZ2V0YFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMuc291cmNlIFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnRhcmdldCBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQmV0d2VlbiAob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUuc291cmNlLmlkID09PSBvcHRpb25zLnNvdXJjZSAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy50YXJnZXRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyBmcm9tIGBvcHRpb25zLnNvdXJjZWAgdG8gYG9wdGlvbnMudGFyZ2V0YFxuICAgKiBvciBgb3B0aW9ucy50YXJnZXRgIHRvIGBvcHRpb25zLnNvdXJjZWBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnNvdXJjZSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy50YXJnZXQgVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRBbGxFZGdlc0JldHdlZW4gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMuc291cmNlICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnRhcmdldCkgfHxcbiAgICAgIChlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy50YXJnZXQgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMuc291cmNlKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBlZGdlIGlkZW50aWZpZWQgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKi9cbiAgcmVtb3ZlRWRnZSAoZWRnZSkge1xuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGUgPT4gZS5pZCA9PT0gZWRnZS5pZClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgZWRnZXMgc3RvcmVkIGluIGBlZGdlc2AsXG4gICAqIGVhY2ggb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBlZGdlc1xuICAgKi9cbiAgcmVtb3ZlRWRnZXMgKGVkZ2VzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMoZWRnZXMsIGUuaWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgZWRnZXMgdGhhdCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHByZWRpY2F0ZVxuICAgKiBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gICAqL1xuICByZW1vdmVFZGdlc0J5Rm4gKGZuKSB7XG4gICAgdmFyIGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGZuKHRoaXMuZWRnZXNbaV0sIGkpKSB7XG4gICAgICAgIHRoaXMuZWRnZXMuc3BsaWNlKGksIDEpXG4gICAgICAgIGkgLT0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgdGhhdCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHByZWRpY2F0ZSBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQnlGbiAoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlcy5maWx0ZXIoZm4pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIG91dGdvaW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRPdXRnb2luZ0VkZ2VzIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKChlKSA9PiBlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jb21pbmcgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY29taW5nRWRnZXMgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oKGUpID0+IGUudGFyZ2V0LmlkID09PSBub2RlLmlkKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBpbmNpZGVudCBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0SW5jaWRlbnRFZGdlcyAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldE91dGdvaW5nRWRnZXMobm9kZSlcbiAgICAgIC5jb25jYXQodGhpcy5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKVxuICB9XG5cbiAgLyoqXG4gICAqIEZhY2FkZSB0byBhZGQgbm9kZXMvZWRnZXNcbiAgICpcbiAgICogTk9URTogdGhlIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgcGFyYW1ldGVyc1xuICAgKi9cbiAgYWRkICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVsID0gYXJndW1lbnRzW2ldXG4gICAgICAvLyBhc3N1bWUgdGhhdCBlZGdlcyBoYXZlIGEgc291cmNlL3RhcmdldCBwYXJhbWV0ZXJcbiAgICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgJiYgZWwuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XG4gICAgICAgIHRoaXMuYWRkRWRnZShlbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkTm9kZShlbClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTm9kZURlZmF1bHRzICh2KSB7XG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICB2LmlkID0gdXRpbC5pZCgpXG4gICAgfVxuXG4gICAgdiA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgTk9ERV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLm5vZGVEZWZhdWx0cyxcbiAgICAgIC8vIG5vZGVcbiAgICAgIHZcbiAgICApXG5cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykpIHtcbiAgICAgIHYud2lkdGggPSAyICogdi5yXG4gICAgfVxuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnaGVpZ2h0JykpIHtcbiAgICAgIHYuaGVpZ2h0ID0gMiAqIHYuclxuICAgIH1cbiAgICByZXR1cm4gdlxuICB9XG5cbiAgc3RhdGljIGFwcGVuZEVkZ2VEZWZhdWx0cyAoZSkge1xuICAgIGlmICghZS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgZS5pZCA9IHV0aWwuaWQoKVxuICAgIH1cbiAgICBlID0gZXh0ZW5kKFxuICAgICAge30sXG4gICAgICAvLyBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICBFREdFX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIC8vIGluc3RhbmNlIGRlZmF1bHRzXG4gICAgICB0aGlzLm9wdGlvbnMuZWRnZURlZmF1bHRzLFxuICAgICAgLy8gZWRnZVxuICAgICAgZVxuICAgIClcbiAgICByZXR1cm4gZVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSByYW5kb20gZ3JhcGggd2l0aCB0aGUgZm9sbG93aW5nIGRlZmF1bHRzIG9wdGlvbnMgb3ZlcnJpZGRlbiBieSBgb3B0aW9uc2A6XG4gICAqXG4gICAqIC0gb3B0aW9ucy5vcmRlcj0xMCB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuc2l6ZT0xNSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGVkZ2VzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuY29ubmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIG1ha2UgdGhlIGdyYXBoIGNvbm5lY3RlZCxcbiAgICogaXQncyBndWFyYW50ZWVkIHRvIGhhdmUgYXQgbGVhc3QgYG9wdGlvbnMub3JkZXIgLSAxYCBlZGdlc1xuICAgKiAtIG9wdGlvbnMubXVsdGlHcmFwaD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgcGFyYWxsZWwgZWRnZXNcbiAgICogLSBvcHRpb25zLnBzZXVkb0dyYXBoPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBsb29wIGVkZ2VzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHt7bm9kZXM6IEFycmF5LCBsaW5rczogQXJyYXl9fVxuICAgKi9cbiAgc3RhdGljIHJhbmRvbSAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgb3JkZXI6IDEwLFxuICAgICAgc2l6ZTogMTUsXG4gICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgbXVsdGlHcmFwaDogZmFsc2UsXG4gICAgICBwc2V1ZG9HcmFwaDogZmFsc2VcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdmFyIGksIHUsIHZcbiAgICB2YXIgbm9kZXMgPSBbXVxuICAgIHZhciBhZGphY2VuY3lMaXN0ID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICBhZGphY2VuY3lMaXN0W2ldID0gW11cbiAgICAgIG5vZGVzLnB1c2goeyBpZDogaSB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCAodSwgdikge1xuICAgICAgYWRqYWNlbmN5TGlzdFt1XVt2XSA9IGFkamFjZW5jeUxpc3Rbdl1bdV0gPSB0cnVlXG4gICAgfVxuXG4gICAgdmFyIGVkZ2VzID0gW11cbiAgICBpID0gMFxuXG4gICAgaWYgKG9wdGlvbnMuY29ubmVjdGVkKSB7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICAgIHYgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKVxuICAgICAgICBhZGQoaSwgdilcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBpLFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaSAtPSAxXG4gICAgfVxuXG4gICAgZm9yICg7IGkgPCBvcHRpb25zLnNpemU7IGkgKz0gMSkge1xuICAgICAgdSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMub3JkZXIpXG4gICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5vcmRlcilcblxuICAgICAgaWYgKHUgPT09IHYgJiYgIW9wdGlvbnMucHNldWRvR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxXG4gICAgICB9IGVsc2UgaWYgKGFkamFjZW5jeUxpc3RbdV1bdl0gJiYgIW9wdGlvbnMubXVsdGlHcmFwaCkge1xuICAgICAgICBpIC09IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZCh1LCB2KVxuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IHUsXG4gICAgICAgICAgdGFyZ2V0OiB2XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGVzOiBub2RlcyxcbiAgICAgIGxpbmtzOiBlZGdlc1xuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIFZlY3RvciB7XG4gIGNvbnN0cnVjdG9yICh4LCB5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgfVxuXG4gIC8vIHVuYXJ5XG5cbiAgc3RhdGljIG5lZyAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLngsIC1hLnkpXG4gIH1cblxuICBzdGF0aWMgbGVuIChhKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChWZWN0b3IubGVuU3EoYSkpXG4gIH1cblxuICBzdGF0aWMgbGVuU3EgKGEpIHtcbiAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55XG4gIH1cblxuICBzdGF0aWMgdW5pdCAoYSkge1xuICAgIGlmIChhLnggPT09IDAgJiYgYS55ID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIGlzIDAnKVxuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW4oYSlcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggLyBsZW5ndGgsIGEueSAvIGxlbmd0aClcbiAgfVxuXG4gIHN0YXRpYyBvcnRob2dvbmFsIChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoLWEueSwgYS54KVxuICB9XG5cbiAgc3RhdGljIGFuZ2xlRGVnIChhKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoYS55LCBhLngpICogMTgwIC8gTWF0aC5QSVxuICB9XG5cbiAgLy8gYmluYXJ5XG5cbiAgc3RhdGljIGFkZCAoYSwgYikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCArIGIueCwgYS55ICsgYi55KVxuICB9XG5cbiAgc3RhdGljIHN1YiAoYSwgYikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAtIGIueCwgYS55IC0gYi55KVxuICB9XG5cbiAgc3RhdGljIGRvdCAoYSwgYikge1xuICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnlcbiAgfVxuXG4gIHN0YXRpYyBzY2FsZSAoYSwgbikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAqIG4sIGEueSAqIG4pXG4gIH1cblxuICBzdGF0aWMgbWlkIChhLCBiKSB7XG4gICAgcmV0dXJuIFZlY3Rvci5zY2FsZShWZWN0b3IuYWRkKGEsIGIpLCAwLjUpXG4gIH1cblxuICBzdGF0aWMgYW5nbGVCZXR3ZWVuIChhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWNvcyhWZWN0b3IuZG90KGEsIGIpIC8gVmVjdG9yLmxlbihhKSAtIFZlY3Rvci5sZW4oYikpXG4gIH1cblxuICBzdGF0aWMgcm90YXRlIChhLCBhbmdsZSkge1xuICAgIHZhciBjb3NBID0gTWF0aC5jb3MoYW5nbGUpXG4gICAgdmFyIHNpbkEgPSBNYXRoLnNpbihhbmdsZSlcbiAgICB2YXIgbnggPSBhLnggKiBjb3NBIC0gYS55ICogc2luQVxuICAgIHZhciBueSA9IGEueCAqIHNpbkEgKyBhLnkgKiBjb3NBXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IobngsIG55KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvclxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xudmFyIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpXG52YXIgY29sb3JzID0ge31cbnZhciBjb2xvckxpdGVyYWxzID0gWydCTFVFJywgJ09SQU5HRScsICdHUkVFTicsICdSRUQnLCAnUFVSUExFJywgJ0JST1dOJywgJ1BJTksnLCAnR1JBWScsICdZRUxMT1cnLCAnQ1lBTiddXG5jb2xvckxpdGVyYWxzLmZvckVhY2goZnVuY3Rpb24gKGMsIGkpIHtcbiAgY29sb3JzW2NdID0gY29sb3IucmFuZ2UoKVsyICogaV1cbiAgY29sb3JzWydMSUdIVF8nICsgY10gPSBjb2xvci5yYW5nZSgpWzIgKiBpICsgMV1cbn0pXG5cbmNvbG9ycy5yYW5kb21Gcm9tUGFsZXR0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNvbG9yLnJhbmdlKClbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApXVxufVxuXG5leHBvcnQgeyBjb2xvcnMgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vVmVjdG9yJ1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIHZhciBvd25lclxuXG4gIGZ1bmN0aW9uIG1vdmVUb3dhcmRzUG9pbnQgKHBvaW50LCBtaWRkbGUpIHtcbiAgICB2YXIgbWFyZ2luID0gcG9pbnQuclxuICAgIHZhciB1bml0ID0gVmVjdG9yLnVuaXQoVmVjdG9yLnN1YihtaWRkbGUsIHBvaW50KSlcbiAgICByZXR1cm4gVmVjdG9yLmFkZChwb2ludCwgVmVjdG9yLnNjYWxlKHVuaXQsIG1hcmdpbikpXG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGlubmVyIHBvaW50cyBvZiBhIGxvb3AgZWRnZVxuICAgKlxuICAgKiAtIGFuYWx5emVzIGVhY2ggYWRqYWNlbnQgdmVydGV4XG4gICAqICAtIGZvciBlYWNoIGVhY2ggZWRnZSB1LXYgbW92ZSB0aGUgb3Bwb3NpdGUgd2F5IGUuZy4gdi0+dVxuICAgKiAgLSB0aGUgc3VtIG9mIHVuaXQgdmVjdG9ycyB3aWxsIGdpdmUgcm91Z2hseSBhIGdvb2QgYXBwcm94aW1hdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdSBWZXJ0ZXhcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1hcmdpbkJldHdlZW5FZGdlcyBEZWZpbmVkIGluIGBjcmVhdGVQYXRoYFxuICAgKiBAcGFyYW0ge251bWJlcn0gY291bnQgVGhlIG51bWJlciBvZiB1LXUgZWRnZXMgZm91bmQgeWV0XG4gICAqIEByZXR1cm5zIHt7cGF0aDogKltdLCBkaXI6ICp9fVxuICAgKi9cbiAgZnVuY3Rpb24gc2VsZkxvb3AgKHUsIG1hcmdpbkJldHdlZW5FZGdlcywgY291bnQpIHtcbiAgICB2YXIgYWRqYWNlbnQgPSBvd25lci5ncmFwaC5nZXRBZGphY2VudE5vZGVzKHUpXG4gICAgdmFyIGRpciA9IG5ldyBWZWN0b3IoMCwgMClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgdiA9IGFkamFjZW50W2ldXG4gICAgICBpZiAodS5pZCAhPT0gdi5pZCkge1xuICAgICAgICBkaXIgPSBWZWN0b3IudW5pdChWZWN0b3IuYWRkKFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHUsIHYpKVxuICAgICAgICApKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvUmFkIChhKSB7XG4gICAgICByZXR1cm4gYSAqIE1hdGguUEkgLyAxODBcbiAgICB9XG5cbiAgICAvLyBubyBhZGphY2VudCB2ZXJ0aWNlc1xuICAgIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA9PT0gMCkge1xuICAgICAgZGlyID0gVmVjdG9yLnVuaXQobmV3IFZlY3RvcigwLCAtMSkpXG4gICAgfVxuXG4gICAgdmFyIG9ydCA9IFZlY3Rvci5vcnRob2dvbmFsKGRpcilcblxuICAgIC8vIG1vdmluZyB1IHRvd2FyZHMgYGRpcmAgYHUucmAgdW5pdHNcbiAgICB2YXIgdUJvcmRlck9yaWdpbiA9IFZlY3Rvci5zY2FsZShkaXIsIHUuciArIDQpXG4gICAgLy8gdmFyIHVCb3JkZXJPcmlnaW5Ud2ljZSA9IFZlY3Rvci5zY2FsZShkaXIsIHUuciAqIDIpXG4gICAgLy8gdUQgaXMgbm93IGluIHRoZSBlZGdlIG9mIHRoZSBjaXJjbGUsIG1ha2luZyBhIGxpdHRsZSBhcmMgaW4gdGhlIGNpcmNsZVxuXG4gICAgLy8gZW5kcG9pbnRzIG9mIHRoZSBlZGdlIHdpbGwgaGF2ZSBhIHNlcGFyYXRpb24gb2YgMjUgZGVnLCA1MCBkZWcsIDc1IGRlZywgLi4uXG4gICAgdmFyIGFuZ2xlID0gdG9SYWQoMjUpICsgKGNvdW50IC0gMSkgKiB0b1JhZCgyNSlcblxuICAgIC8vIHRoZSBwb2ludCB0byB0aGUgbGVmdCBvZiB1ICsgdUJvcmRlclxuICAgIHZhciB1Qm9yZGVyTGVmdCA9IFZlY3Rvci5hZGQodSwgVmVjdG9yLnJvdGF0ZSh1Qm9yZGVyT3JpZ2luLCBhbmdsZSkpXG4gICAgLy8gdGhlIHBvaW50IHRvIHRoZSByaWdodCBvZiB1ICsgdUJvcmRlclxuICAgIHZhciB1Qm9yZGVyUmlnaHQgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5yb3RhdGUodUJvcmRlck9yaWdpbiwgLWFuZ2xlKSlcblxuICAgIC8vIHNvbWUgbGVuZ3RoIGF3YXkgZnJvbSB0aGUgbm9kZSBjb21wdXRlZCBieSBkb2luZyByYW5kb20gc2FtcGxlc1xuICAgIHZhciBsZW5ndGggPSAobWFyZ2luQmV0d2VlbkVkZ2VzICogMC42KSAqIChjb3VudCArIDEpXG5cbiAgICAvKlxuICAgICAqIEZvcm0gdGhlIHNoYXBlIG9mIGEgd2VpcmQgcmhvbWJ1c1xuICAgICAqXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgIHVwXG4gICAgICogICAgICAgICAgIC8gIFxcXG4gICAgICogICAgICAgICAgLyAgICBcXFxuICAgICAqICAgICAgICAgLyAgICAgIFxcXG4gICAgICogICAgICAgIC8gICAgICAgIFxcXG4gICAgICogICAgIGxlZnQgICAgICAgcmlnaHRcbiAgICAgKiAgICAgICBcXCAgICAgICAgIC9cbiAgICAgKiAgICAgYm9yZGVyICAgYm9yZGVyXG4gICAgICpcbiAgICAgKi9cbiAgICB2YXIgdXAgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5zY2FsZShkaXIsIHUuciArIGxlbmd0aCkpXG5cbiAgICB2YXIgbWlkTGVmdCA9IFZlY3Rvci5hZGQodUJvcmRlckxlZnQsIFZlY3Rvci5zY2FsZShkaXIsIGxlbmd0aCAqIDAuNSkpXG4gICAgdmFyIG1pZFJpZ2h0ID0gVmVjdG9yLmFkZCh1Qm9yZGVyUmlnaHQsIFZlY3Rvci5zY2FsZShkaXIsIGxlbmd0aCAqIDAuNSkpXG5cbiAgICB2YXIgbGVmdCA9IFZlY3Rvci5hZGQobWlkTGVmdCwgVmVjdG9yLnNjYWxlKG9ydCwgbGVuZ3RoIC8gNCkpXG4gICAgdmFyIHJpZ2h0ID0gVmVjdG9yLmFkZChtaWRSaWdodCwgVmVjdG9yLnNjYWxlKG9ydCwgLWxlbmd0aCAvIDQpKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFt1Qm9yZGVyTGVmdCwgbGVmdCwgdXAsIHJpZ2h0LCB1Qm9yZGVyUmlnaHRdLFxuICAgICAgZGlyOiBvcnRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgcG9pbnRzIG9mIHRoZSA8cGF0aD4gdGhhdCByZXByZXNlbnQgYW4gZWRnZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZCBFZGdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhIEhvbGRzIHRoZSBlZGdlIGNvdW50IGJldHdlZW4gdmVydGljZXMsXG4gICAqIHVuaXQgdmVjdG9ycyBhbmQgb3RoZXIgbWV0YWRhdGFcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1hcmdpbkJldHdlZW5FZGdlcyBVc2VkIGluIGJvdGggbm9ybWFsIGFuZFxuICAgKiBsb29wIGVkZ2VzIHNldHMgdGhlIHNlcGFyYXRpb24gYmV0d2VlbiBlZGdlcyBmcm9tIHRoZSBtaWRcbiAgICogcG9pbnQgb2YgdGhlIHZlcnRpY2VzIHRoZXkgam9pblxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlUGF0aCAoZCwgbWV0YSwgbWFyZ2luQmV0d2VlbkVkZ2VzKSB7XG4gICAgdmFyIHUsIHZcbiAgICB2YXIgY3VycmVudFxuXG4gICAgdSA9IGQuc291cmNlXG4gICAgdiA9IGQudGFyZ2V0XG4gICAgaWYgKHUuaWQgPiB2LmlkKSB7XG4gICAgICBbdSwgdl0gPSBbdiwgdV1cbiAgICB9XG4gICAgbWV0YVt1LmlkXSA9IG1ldGFbdS5pZF0gfHwge31cblxuICAgIGN1cnJlbnQgPSAobWV0YVt1LmlkXVt2LmlkXSA9IG1ldGFbdS5pZF1bdi5pZF0gfHwge1xuICAgICAgICBjb3VudDogMSxcbiAgICAgICAgbWlkOiBWZWN0b3IubWlkKHUsIHYpLFxuICAgICAgICBkaXJlY3Rpb246IC0xXG4gICAgfSlcblxuICAgIHZhciBpbm5lckpvaW50cyA9IFtdXG5cbiAgICBpZiAodS5pZCA9PT0gdi5pZCkge1xuICAgICAgLy8gYXBwbHkgdGhlIGZvbGxvd2luZyBmb3Igc2VsZi1sb29wIGVkZ2VzXG4gICAgICB2YXIgbG9vcCA9IHNlbGZMb29wKHUsIG1hcmdpbkJldHdlZW5FZGdlcywgY3VycmVudC5jb3VudClcbiAgICAgIGlubmVySm9pbnRzID0gbG9vcC5wYXRoXG4gICAgICBkLnVuaXQgPSBsb29wLmRpclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdW5pdFxuICAgICAgaWYgKFZlY3Rvci5sZW4oVmVjdG9yLnN1Yih2LCB1KSkpIHtcbiAgICAgICAgdW5pdCA9IFZlY3Rvci51bml0KFZlY3Rvci5zdWIodiwgdSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bml0ID0gbmV3IFZlY3RvcigxLCAwKVxuICAgICAgfVxuXG4gICAgICBleHRlbmQoY3VycmVudCwge1xuICAgICAgICB1bml0OiB1bml0LFxuICAgICAgICB1bml0T3J0aG9nb25hbDogVmVjdG9yLm9ydGhvZ29uYWwodW5pdClcbiAgICAgIH0pXG4gICAgICBpbm5lckpvaW50cy5wdXNoKFZlY3Rvci5hZGQoXG4gICAgICAgIGN1cnJlbnQubWlkLFxuICAgICAgICBWZWN0b3Iuc2NhbGUoXG4gICAgICAgICAgY3VycmVudC51bml0T3J0aG9nb25hbCxcbiAgICAgICAgICBNYXRoLmZsb29yKGN1cnJlbnQuY291bnQgLyAyKSAqIG1hcmdpbkJldHdlZW5FZGdlcyAqIGN1cnJlbnQuZGlyZWN0aW9uXG4gICAgICAgIClcbiAgICAgICkpXG4gICAgICBkLnVuaXQgPSBjdXJyZW50LnVuaXRcbiAgICB9XG5cbiAgICBjdXJyZW50LmNvdW50ICs9IDFcbiAgICBjdXJyZW50LmRpcmVjdGlvbiAqPSAtMVxuXG4gICAgLy8gcHJvYmxlbTogdGhlIGVkZ2Ugc3RhcnRzL2VuZHMgaW4gdGhlIGNlbnRlciBvZiBzb21lIG5vZGVcbiAgICAvL1xuICAgIC8vIHJlYWwgc29sdXRpb246IHJlbmRlciB0aGUgcGF0aCBub3JtYWxseSB0aGVuIGNvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIGEgcG9pbnRcbiAgICAvLyB3aXRoIGBwYXRoLmdldFBvaW50QXRMZW5ndGgodCAqIGwpYCB3aGVyZSBgbGAgaXMgdGhlIGxlbmd0aCBvZiB0aGUgcGF0aCBhbmRcbiAgICAvLyBgdGAgYW4gaW50ZXJwb2xhdGVkIHBsYWNlID0gcmFkaXVzIG9mIGVhY2ggbm9kZVxuICAgIC8vXG4gICAgLy8gc2ltcGxlIHRyaWNrOiBzaG9ydGVuIHRoZSBsZW5ndGggb2YgdGhlIGVkZ2UgYnkgbW92aW5nIHRoZSBzdGFydC9lbmQgcG9pbnRzXG4gICAgLy8gb2YgdGhlIGVkZ2VzIHRvd2FyZCBlYWNoIG90aGVyXG4gICAgdmFyIHNvdXJjZSA9IGQuc291cmNlXG4gICAgdmFyIHRhcmdldCA9IGQudGFyZ2V0XG4gICAgc291cmNlID0gbW92ZVRvd2FyZHNQb2ludChkLnNvdXJjZSwgaW5uZXJKb2ludHNbMF0pXG4gICAgdGFyZ2V0ID0gbW92ZVRvd2FyZHNQb2ludChkLnRhcmdldCwgaW5uZXJKb2ludHNbaW5uZXJKb2ludHMubGVuZ3RoIC0gMV0pXG5cbiAgICBkLnBhdGggPSBbc291cmNlXVxuICAgICAgLmNvbmNhdChpbm5lckpvaW50cylcbiAgICAgIC5jb25jYXQoW3RhcmdldF0pXG4gIH1cblxuICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAueChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54IH0pXG4gICAgLnkoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueSB9KVxuICAgIC50ZW5zaW9uKDEuNSlcbiAgICAuaW50ZXJwb2xhdGUoJ2J1bmRsZScpXG4gICAgLy8gLmludGVycG9sYXRlKCdsaW5lYXInKVxuXG4gIGZ1bmN0aW9uIGlubmVyIChzZWxlY3Rpb24pIHtcbiAgICAvLyBlZGdlc1xuICAgIHZhciBsaW5rcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cuZWRnZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rc1xuICAgICAgfSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWRcbiAgICAgIH0pXG4gICAgbGlua3MuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpIH0pXG4gICAgICAudHJhbnNpdGlvbignZW50ZXInKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuXG4gICAgLy8gdXBkYXRlXG4gICAgbGlua3NcbiAgICAgIC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZhciBzZWxmID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIHZhciBjbHMgPSB7XG4gICAgICAgICAgZGlyZWN0ZWQ6IGQuZGlyZWN0ZWQgfHwgb3duZXIub3B0aW9ucy5kaXJlY3RlZFxuICAgICAgICB9XG4gICAgICAgIGNsc1snc291cmNlLScgKyBkLnNvdXJjZS5pZF0gPSB0cnVlXG4gICAgICAgIGNsc1sndGFyZ2V0LScgKyBkLnRhcmdldC5pZF0gPSB0cnVlXG4gICAgICAgIHNlbGYuY2xhc3NlZChjbHMpXG4gICAgICB9KVxuXG4gICAgdmFyIG1ldGEgPSB7fVxuICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgIGNyZWF0ZVBhdGgoZCwgbWV0YSwgMTcpXG4gICAgfSlcblxuICAgIC8vIHBhdGggZW50ZXJcbiAgICB2YXIgcGF0aHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gMS4gcmVhbCBwYXRoXG4gICAgICAgIC8vIDIuIHN0cm9rZS1kYXNoYXJyYXkgaGVscGVyXG4gICAgICAgIHJldHVybiBbZCwgZF1cbiAgICAgIH0pXG4gICAgcGF0aHMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignc3Ryb2tlJywgZCA9PiBkLnN0cm9rZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIGVsLmF0dHIoJ29wYWNpdHknLCAhaSA/IDEgOiAwKVxuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIGVsLmNsYXNzZWQoJ2Jhc2UnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgZWwuYXR0cignc3Ryb2tlLXdpZHRoJywgNSlcbiAgICAgICAgICBlbC5jbGFzc2VkKCd0cmF2ZXJzYWwnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gLmF0dHIoJ2QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgdmFyIHBhcmVudCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmRhdHVtKClcbiAgICAgIC8vICByZXR1cm4gbGluZShbcGFyZW50LnNvdXJjZV0pXG4gICAgICAvLyB9KVxuXG4gICAgLy8gcGF0aCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24ocGF0aHMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAuYXR0cignZCcsIGQgPT4gbGluZShkLnBhdGgpKVxuXG4gICAgcGF0aHMuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcylcbiAgICAgIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKVxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgcGF0aC5hdHRyKCdtYXJrZXItZW5kJyxcbiAgICAgICAgICBwYXJlbnQuY2xhc3NlZCgnZGlyZWN0ZWQnKVxuICAgICAgICAgICAgPyAndXJsKCMnICsgb3duZXIubWFya2VySWQgKyAnKSdcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHdlaWdodFBvc2l0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvblxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICB2YXIgYW5nbGUgPSBWZWN0b3IuYW5nbGVEZWcoZC51bml0KVxuICAgICAgICAgIHZhciB2ID0gZC5wYXRoW01hdGguZmxvb3IoZC5wYXRoLmxlbmd0aCAvIDIpXVxuICAgICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB2LFxuICAgICAgICAgICAgcm90YXRlOiBhbmdsZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdmFyIHdlaWdodHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgLmRhdGEoZCA9PiBbZF0pXG5cbiAgICAvLyB3ZWlnaHQgZW50ZXJcbiAgICB3ZWlnaHRzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ3RleHQtYWZ0ZXItZWRnZScpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5jYWxsKHdlaWdodFBvc2l0aW9uKVxuXG4gICAgLy8gd2VpZ2h0IHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbih3ZWlnaHRzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLnRleHQoZCA9PiBkLndlaWdodClcbiAgICAgIC5jYWxsKHdlaWdodFBvc2l0aW9uKVxuXG4gICAgLy8gd2VpZ2h0IGV4aXRcbiAgICB3ZWlnaHRzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpXG5cbiAgICAvLyBleGl0XG4gICAgbGlua3MuZXhpdCgpXG4gICAgICAucmVtb3ZlKClcbiAgfVxuXG4gIGlubmVyLm93bmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb3duZXJcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZVxuICAgIHJldHVybiBpbm5lclxuICB9XG5cbiAgcmV0dXJuIGlubmVyXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gd2luZG93LmQzXG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4uL2NvbnN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIHZhciBvd25lclxuXG4gIGZ1bmN0aW9uIGlubmVyIChzZWxlY3Rpb24pIHtcbiAgICB2YXIgbm9kZXMgPSBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ2cubm9kZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5ub2Rlc1xuICAgICAgfSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWRcbiAgICAgIH0pXG5cbiAgICB2YXIgbGF5b3V0ID0gb3duZXIubGF5b3V0XG5cbiAgICB2YXIgZyA9IG5vZGVzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiAnbm9kZSAnICsgKGQuY2xhc3MgfHwgJycpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpIH0pXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7IHRyYW5zbGF0ZTogZCB9KVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgaWYgKCFlbC5vdmVyKSB7XG4gICAgICAgICAgZWwuc3R5bGUoJ2N1cnNvcicsICdwb2ludGVyJylcbiAgICAgICAgfVxuICAgICAgICBlbC5vdmVyID0gdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICBlbC5vdmVyID0gZmFsc2VcbiAgICAgICAgZWwuc3R5bGUoJ2N1cnNvcicsIG51bGwpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgIGcudHJhbnNpdGlvbignZW50ZXInKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgIGcuY2FsbChsYXlvdXQuZHJhZylcblxuICAgIHZhciBkcmFnU3RhcnQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJylcbiAgICB2YXIgZHJhZ0VuZCA9IGxheW91dC5kcmFnKCkub24oJ2RyYWdlbmQuZDNhZGFwdG9yJylcbiAgICBsYXlvdXQuZHJhZygpXG4gICAgICAub24oJ2RyYWdzdGFydC5kM2FkYXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG93bmVyLm5vZGVEcmFnZ2luZyA9IHRydWVcbiAgICAgICAgZHJhZ1N0YXJ0LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICAgIC5vbignZHJhZ2VuZC5kM2FkYXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG93bmVyLm5vZGVEcmFnZ2luZyA9IGZhbHNlXG4gICAgICAgIGRyYWdFbmQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpXG4gICAgICB9KVxuXG4gICAgZy5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAuYXR0cignZmlsbCcsIGQgPT4gZC5maWxsKVxuICAgICAgLmF0dHIoJ3InLCBkID0+IGQucilcblxuICAgIC8vIGlubmVyIGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ2xhYmVsJywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3doaXRlJylcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMTJweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5hdHRyKCd5JywgKGQpID0+IGQuaGVpZ2h0IC8gNClcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQubGFiZWwnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCdsYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLmxhYmVsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQuaWRcbiAgICAgIH0pXG5cbiAgICAvLyB0b3AtcmlnaHQgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnb3V0ZXItdG9wLXJpZ2h0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgLmF0dHIoJ3gnLCBkID0+IGQud2lkdGggLyAyIC0gMilcbiAgICAgIC5hdHRyKCd5JywgZCA9PiAtZC5oZWlnaHQgLyAyICsgMylcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLXJpZ2h0JylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgndG9wUmlnaHRMYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLnRvcFJpZ2h0TGFiZWxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIC8vIHRvcC1sZWZ0IGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ291dGVyLXRvcC1sZWZ0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgIC5hdHRyKCd4JywgZCA9PiAtZC53aWR0aCAvIDIgLSAyKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IC1kLmhlaWdodCAvIDIgKyAzKVxuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5vdXRlci10b3AtbGVmdCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BMZWZ0TGFiZWxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIC8vIHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbihub2RlcywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IGRcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAvLyBleGl0XG4gICAgbm9kZXMuZXhpdCgpXG4gICAgICAucmVtb3ZlKClcbiAgfVxuXG4gIGlubmVyLm93bmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb3duZXJcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZVxuICAgIHJldHVybiBpbm5lclxuICB9XG5cbiAgcmV0dXJuIGlubmVyXG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHBvbHlmaWxscyBmcm9tICcuL3BvbHlmaWxscydcbnBvbHlmaWxscygpXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xuXG4vLyBub2RlXG5pbXBvcnQgRHJhdyBmcm9tICcuL0RyYXcnXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscydcblxudmFyIGluc3RhbmNlcyA9IFtdXG5cbmZ1bmN0aW9uIHJ1biAob3B0aW9ucykge1xuICBmdW5jdGlvbiBmYWN0b3J5IChvcHRpb25zKSB7XG4gICAgdmFyIGVsID0gZDMuc2VsZWN0KG9wdGlvbnMudGFyZ2V0KVxuICAgIHZhciBpZCA9IGVsLmF0dHIoJ2dyZXVsZXItaWQnKVxuICAgIGlmICghaWQpIHtcbiAgICAgIGlkID0gdXRpbHMuaWQoKVxuICAgICAgZWwuYXR0cignZ3JldWxlci1pZCcsIGlkKVxuICAgICAgaW5zdGFuY2VzW2lkXSA9IG5ldyBEcmF3KGlkLCBvcHRpb25zKVxuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2VzW2lkXVxuICB9XG5cbiAgcmV0dXJuIGZhY3Rvcnkob3B0aW9ucylcbn1cblxuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnXG5ydW4uR3JhcGggPSBHcmFwaFxuXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuL2NvbnN0J1xucnVuLmNvbG9ycyA9IGNvbG9yc1xuXG5pbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyL2luZGV4J1xucnVuLnBsYXllciA9IHBsYXllclxuXG5leHBvcnQgZGVmYXVsdCBydW5cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoYWN0aW9ucywgc3BlZWQpIHtcbiAgICB0aGlzLmluZGV4ID0gMFxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZFxuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnNcblxuICAgIC8vIHN0YXRlc1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYWN0aW9uc1t0aGlzLmluZGV4KytdKClcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMucGxheS5iaW5kKHRoaXMpLCB0aGlzLnNwZWVkKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIHRoaXMucGF1c2UoKVxuICAgIHRoaXMuaW5kZXggPSAwXG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yIChpbnN0YW5jZSwgc3BlZWQpIHtcbiAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2VcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQgfHwgaW5zdGFuY2Uub3B0aW9ucy5hbmltYXRpb25UaW1lXG4gICAgdGhpcy5mbiA9IG51bGxcbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICB9XG5cbiAgcnVuIChmbikge1xuICAgIHRoaXMuZm4gPSBmbih0aGlzLmluc3RhbmNlKVxuICAgIHRoaXMucGxheSgpXG4gIH1cblxuICBydW5BbmltYXRpb24gKGFuaW1hdGlvbikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFuaW1hdGlvbikpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb24uZm9yRWFjaCh0aGlzLnJ1bkFuaW1hdGlvbiwgdGhpcylcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbih0aGlzLmluc3RhbmNlKVxuICAgIH1cblxuICAgIHZhciB0eXBlID0gdGhpcy5pbnN0YW5jZVthbmltYXRpb24udHlwZV1cbiAgICByZXR1cm4gdHlwZVthbmltYXRpb24ub3BdLmFwcGx5KHR5cGUsIGFuaW1hdGlvbi5hcmdzIHx8IFtdKVxuICB9XG5cbiAgcGxheSAodmFsdWUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB2YXIgbmV4dCA9IHRoaXMuZm4ubmV4dCh2YWx1ZSlcbiAgICBpZiAoIW5leHQuZG9uZSkge1xuICAgICAgdmFyIGRlbGF5ID0gdGhpcy5zcGVlZFxuICAgICAgdmFyIHJ1bkFuaW1hdGlvblZhbHVlID0gdGhpcy5ydW5BbmltYXRpb24obmV4dC52YWx1ZSlcbiAgICAgIGlmIChydW5BbmltYXRpb25WYWx1ZSAmJiB0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZGVsYXkgPSBydW5BbmltYXRpb25WYWx1ZS5kZWxheVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGltZXIgPSB3aW5kb3cucmVxdWVzdFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnBsYXkobmV4dC52YWx1ZSlcbiAgICAgIH0sIGRlbGF5KVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICB3aW5kb3cuY2xlYXJSZXF1ZXN0VGltZW91dCh0aGlzLnRpbWVyKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IEZpeGVkIGZyb20gJy4vRml4ZWQnXG5pbXBvcnQgR2VuZXJhdG9yIGZyb20gJy4vR2VuZXJhdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEZpeGVkSW50ZXJ2YWw6IEZpeGVkLFxuICBHZW5lcmF0b3I6IEdlbmVyYXRvclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLyplc2xpbnQtZGlzYWJsZSAqL1xuICAoZnVuY3Rpb24gKGRvYywgcHJvdG8pIHtcbiAgICB0cnkgeyAvLyBjaGVjayBpZiBicm93c2VyIHN1cHBvcnRzIDpzY29wZSBuYXRpdmVseVxuICAgICAgZG9jLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSBib2R5JylcbiAgICB9IGNhdGNoIChlcnIpIHsgLy8gcG9seWZpbGwgbmF0aXZlIG1ldGhvZHMgaWYgaXQgZG9lc24ndFxuICAgICAgWydxdWVyeVNlbGVjdG9yJywgJ3F1ZXJ5U2VsZWN0b3JBbGwnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgdmFyIG5hdGl2ZSA9IHByb3RvW21ldGhvZF1cbiAgICAgICAgcHJvdG9bbWV0aG9kXSA9IGZ1bmN0aW9uIChzZWxlY3RvcnMpIHtcbiAgICAgICAgICBpZiAoLyhefCwpXFxzKjpzY29wZS8udGVzdChzZWxlY3RvcnMpKSB7IC8vIG9ubHkgaWYgc2VsZWN0b3JzIGNvbnRhaW5zIDpzY29wZVxuICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5pZCAvLyByZW1lbWJlciBjdXJyZW50IGVsZW1lbnQgaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSAnSURfJyArIERhdGUubm93KCkgLy8gYXNzaWduIG5ldyB1bmlxdWUgaWRcbiAgICAgICAgICAgIHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5yZXBsYWNlKC8oKF58LClcXHMqKTpzY29wZS9nLCAnJDEjJyArIHRoaXMuaWQpOyAvLyByZXBsYWNlIDpzY29wZSB3aXRoICNJRFxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGRvY1ttZXRob2RdKHNlbGVjdG9ycylcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZCAvLyByZXN0b3JlIHByZXZpb3VzIGlkXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmUuY2FsbCh0aGlzLCBzZWxlY3RvcnMpIC8vIHVzZSBuYXRpdmUgY29kZSBmb3Igb3RoZXIgc2VsZWN0b3JzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSkod2luZG93LmRvY3VtZW50LCBFbGVtZW50LnByb3RvdHlwZSlcblxuICAvLyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2pvZWxhbWJlcnQvMTAwMjExNlxuICAvL1xuICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSBzaGltIGJ5IFBhdWwgSXJpc2hcbiAgLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIGZ1bmN0aW9uICggLyogZnVuY3Rpb24gKi8gY2FsbGJhY2ssIC8qIERPTUVsZW1lbnQgKi8gZWxlbWVudCkge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MClcbiAgICB9XG4gIH0pKClcblxuICAvKipcbiAgICogQmVoYXZlcyB0aGUgc2FtZSBhcyBzZXRUaW1lb3V0IGV4Y2VwdCB1c2VzIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHdoZXJlIHBvc3NpYmxlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7aW50fSBkZWxheSBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICB3aW5kb3cucmVxdWVzdFRpbWVvdXQgPSBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XG4gICAgaWYgKCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgIXdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICEod2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSAmJiAvLyBGaXJlZm94IDUgc2hpcHMgd2l0aG91dCBjYW5jZWwgc3VwcG9ydFxuICAgICAgIXdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZuLCBkZWxheSlcblxuICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgdmFyIGhhbmRsZSA9IHt9XG5cbiAgICBmdW5jdGlvbiBsb29wICgpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIGRlbHRhID0gY3VycmVudCAtIHN0YXJ0XG5cbiAgICAgIGRlbHRhID49IGRlbGF5ID8gZm4uY2FsbCgpIDogaGFuZGxlLnZhbHVlID0gcmVxdWVzdEFuaW1GcmFtZShsb29wKVxuICAgIH1cblxuICAgIGhhbmRsZS52YWx1ZSA9IHJlcXVlc3RBbmltRnJhbWUobG9vcClcbiAgICByZXR1cm4gaGFuZGxlXG4gIH1cblxuICAvKipcbiAgICogQmVoYXZlcyB0aGUgc2FtZSBhcyBjbGVhclRpbWVvdXQgZXhjZXB0IHVzZXMgY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgd2hlcmUgcG9zc2libGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgKiBAcGFyYW0ge2ludHxvYmplY3R9IGhhbmRsZSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHdpbmRvdy5jbGVhclJlcXVlc3RUaW1lb3V0ID0gZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6IC8qIFN1cHBvcnQgZm9yIGxlZ2FjeSBBUEkgKi9cbiAgICAgICAgICB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHQ/IHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSlcbiAgfVxuLyplc2xpbnQtZW5hYmxlICovXG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yIChvd25lcikge1xuICAgIHRoaXMub3duZXIgPSBvd25lclxuICAgIHRoaXMuZ3JhcGggPSBvd25lci5ncmFwaFxuICAgIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucyA9IHt9XG4gIH1cblxuICBnZXREZWZhdWx0U3R5bGVPcHRpb25zICgpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmdldEFuaW1hdGlvblRpbWUoKSxcbiAgICAgIHN0cm9rZTogJyNFNzRDM0MnXG4gICAgfSwgdGhpcy5kZWZhdWx0U3R5bGVPcHRpb25zKVxuICB9XG5cbiAgZ2V0U3R5bGVPcHRpb25zIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpXG4gIH1cblxuICBnZXRBbmltYXRpb25UaW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lci5vcHRpb25zLmFuaW1hdGlvblRpbWVcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGNvbGxlY3Rpb24gb2YgZWxlbWVudHMgcmV0dXJuZWQgYnkgdGhlIEdyYXBoIGNsYXNzIHRoaXMgbWV0aG9kcyByZXR1cm5zXG4gICAqIHRoZSBkMyBzZWxlY3Rpb24gdGhhdCBmb3IgYWxsIHRob3NlIG9iamVjdHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXXxPYmplY3R9IGVscyBBbiBhcnJheSBvZiBlZGdlcy9ub2RlcyBvciBhIHNpbmdsZSBlZGdlL25vZGVcbiAgICogQHJldHVybiB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgc2VsZWN0IChlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkge1xuICAgICAgZWxzID0gW2Vsc11cbiAgICB9XG4gICAgaWYgKCFlbHMubGVuZ3RoKSB7XG4gICAgICBlbHMucHVzaCh7IGlkOiAtMSB9KVxuICAgIH1cbiAgICBlbHMgPSBlbHMuZmlsdGVyKEJvb2xlYW4pXG4gICAgcmV0dXJuIHRoaXMub3duZXIucm9vdC5zZWxlY3RBbGwoXG4gICAgICBlbHMubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiAnIycgKyB1dGlscy5ucyhlLmlkKVxuICAgICAgfSkuam9pbignLCAnKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSBwYXRoIGluc2lkZSB0aGUgdGFnIDxnPiB0aGF0IHJlcHJlc2VudHMgYW4gZWRnZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqL1xuICBpbm5lckVkZ2VTZWxlY3RvciAoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgncGF0aC5iYXNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSBjaXJjbGUgaW5zaWRlIHRoZSB0YWcgPGc+IHRoYXQgcmVwcmVzZW50cyBhIG5vZGVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKi9cbiAgaW5uZXJOb2RlU2VsZWN0b3IgKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGQzID0gd2luZG93LmQzXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnXG5cbnZhciBISUdITElHSFQgPSAnaGlnaGxpZ2h0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24gZXh0ZW5kcyBHcmFwaCB7XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyBvZiB0aGUgZ3JhcGhcbiAgICpcbiAgICogQHJldHVybnMge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIGdldEVkZ2VzICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZWRnZXMpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBub2RlcyBvZiB0aGUgZ3JhcGhcbiAgICpcbiAgICogQHJldHVybnMge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIGdldE5vZGVzICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGgubm9kZXMpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYSBub2RlIHRlbXBvcmFyaWx5LCBpdCBjb25zaXN0cyBvZiB0d29cbiAgICogY2hhaW5lZCB0cmFuc2l0aW9uc1xuICAgKlxuICAgKiAtIGluY3JlYXNlIHRoZSByYWRpdXMgdG8gMS41eCB0aGUgb3JpZ2luYWwgYHJgIHZhbHVlXG4gICAqIC0gZGVjcmVhc2UgdGhlIHJhZGl1cyB0byB0aGUgb3JpZ2luYWwgYHJgIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICBkb1RlbXBvcmFsSGlnaGxpZ2h0Tm9kZSAoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IG9wdGlvbnMuciB8fCAoZC5yICogMS41KSlcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBkLnIpXG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyBhbiBlZGdlIHRlbXBvcmFyaWx5LCBpdCBjb25zaXN0cyBvZiB0d29cbiAgICogY2hhaW5lZCB0cmFuc2l0aW9uc1xuICAgKlxuICAgKiAtIGNoYW5nZSB0aGUgc3Ryb2tlIG9mIHRoZSBgcGF0aGAgdGhhdCByZXByZXNlbnRzIHRoZSBlZGdlIHRvXG4gICAqIGBvcHRpb25zLnN0cm9rZWBcbiAgICogLSBjaGFuZ2UgdGhlIHN0cm9rZSB0byB0aGUgb3JpZ2luYWwgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIGRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyAoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgKGQpID0+IGQuc3Ryb2tlKVxuICB9XG5cbiAgLyoqXG4gICAqIEVkZ2UgdHJhdmVyc2FsIGFuaW1hdGlvbiwgaXQgYW5pbWF0ZXMgYSBoaWRkZW4gcGF0aCBnaXZpbmcgdGhlIGltcHJlc3Npb25cbiAgICogb2YgbW92ZW1lbnQsIGlmIHNvdXJjZSBpcyBnaXZlbiB0aGVuIGl0IHdpbGwgYWx3YXlzIHN0YXJ0IHRoZSBhbmltYXRpb25cbiAgICogZnJvbSB0aGUgbm9kZSBgc291cmNlYCBldmVuIGlmIHRoZSBlZGdlIGlzIGFuIGluY29taW5nIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge2NvbmZpZ30gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW3NvdXJjZT0tMV1cbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICB0cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uIChzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSA9IC0xKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgncGF0aC50cmF2ZXJzYWwnKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKClcbiAgICAgICAgZWxcbiAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBgJHtsfSAke2x9YClcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBsKVxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgIH0pXG4gICAgICAudHJhbnNpdGlvbignZGFzaGFycmF5JylcbiAgICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uKVxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKVxuICAgICAgICB2YXIgdHdpY2VMZW5ndGggPSBsZW5ndGggKiAyXG4gICAgICAgIHZhciBsZW5ndGhUb01vdmUgPSAwXG4gICAgICAgIGlmIChzb3VyY2UgIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGQudGFyZ2V0LmlkID09PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoIC0gbGVuZ3RoVG9Nb3ZlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGVuZ3RoVG9Nb3ZlXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIGVsLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIG51bGwpXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgfSlcbiAgfVxuXG4gIHRyYXZlcnNlRWRnZXMgKHNlbGVjdGlvbiwgb3B0aW9ucywgc291cmNlKSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBrZWVwU3Ryb2tlOiB0cnVlLFxuICAgICAgcmV2ZXJzZTogZmFsc2VcbiAgICB9LCB0aGlzLmdldFN0eWxlT3B0aW9ucygpLCBvcHRpb25zKVxuXG4gICAgc2VsZWN0aW9uLmNhbGwodGhpcy50cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UpXG4gICAgaWYgKG9wdGlvbnMua2VlcFN0cm9rZSkge1xuICAgICAgdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgICAgIC50cmFuc2l0aW9uKCd1cGRhdGUnKVxuICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gIH1cblxuICBnZXROb2RlIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE5vZGUobm9kZSkpXG4gICAgKVxuICB9XG5cbiAgZ2V0RWRnZSAoZWRnZSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRFZGdlKGVkZ2UpKVxuICAgIClcbiAgfVxuXG4gIC8vIHRlbXBvcmFsIGhpZ2hsaWdodFxuXG4gIGhpZ2hsaWdodE5vZGUgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0Tm9kZShcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0Tm9kZShub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGhpZ2hsaWdodEVkZ2UgKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEVkZ2UoZWRnZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICBoaWdobGlnaHRJbmNpZGVudEVkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNpZGVudEVkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaGlnaGxpZ2h0T3V0Z29pbmdFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGhpZ2hsaWdodEluY29taW5nRWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY29taW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBnaXZlbiBhIG5vZGVcblxuICB0cmF2ZXJzZU91dGdvaW5nRWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgdHJhdmVyc2VJbmNvbWluZ0VkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jb21pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIHRyYXZlcnNlSW5jaWRlbnRFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY2lkZW50RWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBiZXR3ZWVuIHR3byBub2Rlc1xuXG4gIHRyYXZlcnNlRWRnZXNCZXR3ZWVuIChlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KFxuICAgICAgICB0aGlzLmdyYXBoLmdldEVkZ2VzQmV0d2VlbihlZGdlKVxuICAgICAgKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpLFxuICAgICAgZWRnZS5zb3VyY2VcbiAgICApXG4gIH1cblxuICB0cmF2ZXJzZUFsbEVkZ2VzQmV0d2VlbiAoZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdChcbiAgICAgICAgdGhpcy5ncmFwaC5nZXRBbGxFZGdlc0JldHdlZW4oZWRnZSlcbiAgICAgICksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGVkZ2Uuc291cmNlXG4gICAgKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IGxjZyBmcm9tICdjb21wdXRlLWxjZydcblxudmFyIHJhbmQgPSBsY2coMSlcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBuID0gcmFuZCgpXG4gICAgdmFyIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcihuICogMjYpICsgOTcpXG4gICAgcmV0dXJuIGxldHRlciArIG4udG9TdHJpbmcoMTYpLnN1YnN0cigyKVxuICB9LFxuXG4gIHRyYW5zZm9ybTogZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgc3RyID0gYGBcbiAgICBpZiAoJ3RyYW5zbGF0ZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgdHJhbnNsYXRlKCR7by50cmFuc2xhdGUueH0sICR7by50cmFuc2xhdGUueX0pYFxuICAgIH1cbiAgICBpZiAoJ3JvdGF0ZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgcm90YXRlKCR7by5yb3RhdGV9KWBcbiAgICB9XG4gICAgaWYgKCdzY2FsZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgc2NhbGUoJHtvLnNjYWxlfSlgXG4gICAgfVxuICAgIHJldHVybiBzdHJcbiAgfSxcblxuICB0cmFuc2l0aW9uOiBmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnRyYW5zaXRpb24oJ2xheW91dCcpXG4gICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgLmVhc2UoJ2xpbmVhcicpXG4gIH0sXG5cbiAgY29uZGl0aW9uYWxUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZWwsIGNvbmRpdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb24oZWwpXG4gICAgfVxuICAgIHJldHVybiBlbFxuICB9LFxuXG4gIG5zOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuICdncmV1bGVyLScgKyBzdHJcbiAgfVxufVxuIl19
