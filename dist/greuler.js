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
    var separation = toRad(25);
    var angle = separation + (count - 1) * separation;

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
    var uBorder, vBorder;
    var current;

    u = d.source;
    v = d.target;
    if (u.id > v.id) {
      var _ref = [v, u];
      u = _ref[0];
      v = _ref[1];
    }
    meta[u.id] = meta[u.id] || {};

    // the mid point is computed from the borders of both nodes
    // the mid point is used to determine the position of the label
    uBorder = u;
    vBorder = v;
    if (u.id !== v.id) {
      uBorder = moveTowardsPoint(u, v);
      vBorder = moveTowardsPoint(v, u);
    }

    current = meta[u.id][v.id] = meta[u.id][v.id] || {
      count: 1,
      mid: _Vector2['default'].mid(uBorder, vBorder),
      direction: -1
    };

    var innerJoints = [];
    if (u.id === v.id) {
      // apply the following for self-loop edges
      var loop = selfLoop(u, marginBetweenEdges, current.count);
      innerJoints = loop.path;
      d.unit = loop.dir;
    } else {
      var unit = _Vector2['default'].unit(_Vector2['default'].sub(v, u));
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
    var source = moveTowardsPoint(d.source, innerJoints[0]);
    var target = moveTowardsPoint(d.target, innerJoints[innerJoints.length - 1]);

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
    g.append('text').classed('label', true).attr('fill', 'white').attr('font-size', '12px').attr('text-anchor', 'middle').attr('dominant-baseline', 'central');
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL0RyYXcuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2NvbnN0LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvZWxlbWVudHMvZWRnZS5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9GaXhlZC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wb2x5ZmlsbHMuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbi5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNWOztBQUVELElBQUUsRUFBRSxZQUFVLEdBQUcsRUFBRTtBQUNqQixXQUFPLFVBQVUsR0FBRyxHQUFHLENBQUE7R0FDeEI7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbipcbipcdENPTVBVVEU6IGxjZ1xuKlxuKlxuKlx0REVTQ1JJUFRJT046XG4qXHRcdC0gQSBsaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIChsY2cpLlxuKlxuKlxuKlx0Tk9URVM6XG4qXHRcdFsxXSBCYXNlZCBvbiBXLiBQcmVzcywgZXQgYWwuLCBOdW1lcmljYWwgUmVjaXBlcyBpbiBDICgyZCBlZC4gMTk5MilcbipcbipcbipcdFRPRE86XG4qXHRcdFsxXVxuKlxuKlxuKlx0TElDRU5TRTpcbipcdFx0TUlUXG4qXG4qXHRDb3B5cmlnaHQgKGMpIDIwMTQuIHJnaXp6LlxuKlxuKlxuKlx0QVVUSE9SOlxuKlx0XHRyZ2l6ei4gZ3p0b3duMjIxNkB5YWhvby5jb20uIDIwMTQuXG4qXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFZBUklBQkxFUyAvL1xuXG52YXIgTUFTSyA9IDEyMzQ1OTg3Nixcblx0TSA9IDIxNDc0ODM2NDcsXG5cdEEgPSAxNjgwNztcblxuXG4vLyBMQ0cgLy9cblxuLyoqXG4qIEZVTkNUSU9OOiBsY2coIFtzZWVkXSApXG4qXHRSZXR1cm5zIGEgbGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci4gSWYgbm90IHByb3ZpZGVkIGEgc2VlZCwgYSBzZWVkIGlzIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgY3VycmVudCB0aW1lLlxuKlxuKiBAcGFyYW0ge051bWJlcn0gW3NlZWRdIC0gcmFuZG9tIG51bWJlciBnZW5lcmF0b3Igc2VlZFxuKiBAcmV0dXJucyB7RnVuY3Rpb259IGdlbmVyYXRvclxuKi9cbmZ1bmN0aW9uIGxjZyggdmFsICkge1xuXHR2YXIgc2VlZDtcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdGlmICggdHlwZW9mIHZhbCAhPT0gJ251bWJlcicgfHwgdmFsICE9PSB2YWwgfHwgdmFsICUgMSAhPT0gMCB8fCB2YWwgPCAxICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ2xjZygpOjppbnZhbGlkIGlucHV0IGFyZ3VtZW50LiBTZWVkIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0c2VlZCA9IHZhbDtcblx0fSBlbHNlIHtcblx0XHRzZWVkID0gRGF0ZS5ub3coKSAlIDEwMDAwMDAwMDtcblx0fVxuXHQvKipcblx0KiBGVU5DVElPTjogbGNnKCBbTl0gKVxuXHQqXHRMaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuXHQqXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFtOXSAtIG51bWJlciBvZiBwc2V1ZG9yYW5kb20gbnVtYmVycyB0byByZXR1cm5cblx0KiBAcmV0dXJucyB7TnVtYmVyfEFycmF5fSBwc2V1ZG9yYW5kb20gZmxvYXRpbmctcG9pbnQgbnVtYmVyKHMpIGJldHdlZW4gMCBhbmQgMVxuXHQqL1xuXHRyZXR1cm4gZnVuY3Rpb24gbGNnKCBOICkge1xuXHRcdHZhciBhcnIsXG5cdFx0XHRyYW5kO1xuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRzZWVkID0gKCBBICogc2VlZCApICUgTTtcblx0XHRcdHJhbmQgPSBzZWVkIC8gTTtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHJldHVybiByYW5kO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiBOICE9PSAnbnVtYmVyJyB8fCBOICE9PSBOIHx8IE4lMSAhPT0gMCB8fCBOIDwgMSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdsY2coKTo6aW52YWxpZCBpbnB1dCBhcmd1bWVudC4gQXJyYXkgbGVuZ3RoIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0YXJyID0gbmV3IEFycmF5KCBOICk7XG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgTjsgaSsrICkge1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0c2VlZCA9ICggQSAqIHNlZWQgKSAlIE07XG5cdFx0XHRhcnJbIGkgXSA9IHNlZWQgLyBNO1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJyO1xuXHR9O1xufSAvLyBlbmQgRlVOQ1RJT04gbGNnKClcblxuXG4vLyBFWFBPUlRTIC8vXG5cbm1vZHVsZS5leHBvcnRzID0gbGNnO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG5cdGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG5cdH1cblxuXHRyZXR1cm4gdG9TdHIuY2FsbChhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaiB8fCB0b1N0ci5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGhhc093bkNvbnN0cnVjdG9yID0gaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKTtcblx0dmFyIGhhc0lzUHJvdG90eXBlT2YgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpO1xuXHQvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XG5cdGlmIChvYmouY29uc3RydWN0b3IgJiYgIWhhc093bkNvbnN0cnVjdG9yICYmICFoYXNJc1Byb3RvdHlwZU9mKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBvYmopIHsvKiovfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1swXSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicpIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH0gZWxzZSBpZiAoKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpIHx8IHRhcmdldCA9PSBudWxsKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xudmFyIGNvbGEgPSB3aW5kb3cuY29sYVxuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcbmltcG9ydCBub2RlIGZyb20gJy4vZWxlbWVudHMvbm9kZSdcbmltcG9ydCBlZGdlIGZyb20gJy4vZWxlbWVudHMvZWRnZSdcbmltcG9ydCBHcmFwaE1hbmFnZXIgZnJvbSAnLi9HcmFwaCdcbmltcG9ydCBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24gZnJvbSAnLi9zZWxlY3Rvci9HcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICBjb25zdHJ1Y3RvciAoaWQsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB0aGlzLmV2ZW50cyA9IGQzLmRpc3BhdGNoKCdsYXlvdXQnLCAnZmlyc3RMYXlvdXRFbmQnKVxuXG4gICAgdGhpcy5tYXJrZXJJZCA9ICdtYXJrZXItJyArIGlkXG5cbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zKG9wdGlvbnMpXG5cbiAgICAvLyBncmFwaCBoYW5kbGVzIHRoZSBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgZHJhd2VyXG4gICAgdGhpcy5jcmVhdGVHcmFwaCgpXG5cbiAgICAvLyBzZWxlY3RvciBhbmltYXRlcyB0aGUgbm9kZXMvZWRnZXNcbiAgICB0aGlzLnNlbGVjdG9yID0gbmV3IEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbih0aGlzKVxuXG4gICAgLy8gc3ViLWVsZW1lbnRzIHRoYXQgZHJhdyBzdHVmZlxuICAgIHRoaXMubm9kZURyYXdlciA9IG5vZGUoKS5vd25lcih0aGlzKVxuICAgIHRoaXMuZWRnZURyYXdlciA9IGVkZ2UoKS5vd25lcih0aGlzKVxuXG4gICAgLy8gY29sYVxuICAgIHRoaXMubGF5b3V0ID0gY29sYS5kM2FkYXB0b3IoKVxuXG4gICAgdGhpcy5sYXlvdXQub24oJ3RpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnRpY2soKVxuICAgIH0pXG5cbiAgICB2YXIgZmlyc3RFbmQgPSB0cnVlXG4gICAgdGhpcy5sYXlvdXQub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChmaXJzdEVuZCkge1xuICAgICAgICBzZWxmLmV2ZW50cy5maXJzdExheW91dEVuZCgpXG4gICAgICAgIGZpcnN0RW5kID0gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlR3JhcGggKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5vcHRpb25zLmRhdGFcbiAgICB2YXIgbm9kZXMgPSBkYXRhLm5vZGVzXG4gICAgdmFyIGxpbmtzID0gZGF0YS5saW5rc1xuXG4gICAgLy8gZW1wdHkgYW5kIHJlLWFkZFxuICAgIGRhdGEubm9kZXMgPSBbXVxuICAgIGRhdGEubGlua3MgPSBbXVxuXG4gICAgdGhpcy5ncmFwaCA9IG5ldyBHcmFwaE1hbmFnZXIodGhpcywgZGF0YSlcbiAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB0aGlzLmdyYXBoLmFkZE5vZGUobm9kZSlcbiAgICB9LCB0aGlzKVxuICAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIHRoaXMuZ3JhcGguYWRkRWRnZShlZGdlKVxuICAgIH0sIHRoaXMpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICpcbiAgICogb3B0aW9uc1xuICAgKiAgIC0gdGFyZ2V0IHtzdHJpbmd9IHNlbGVjdG9yIHRvIHRoZSBlbGVtZW50IHRvIGhvbGQgdGhlIGdyYXBoXG4gICAqICAgLSB3aWR0aCB7bnVtYmVyfVxuICAgKiAgIC0gaGVpZ2h0IHtudW1iZXJ9XG4gICAqICAgLSBsYWJlbHM9dHJ1ZSB7Ym9vbGVhbn0gRmFsc2UgdG8gaGlkZSB0aGUgdmVydGV4IGxhYmVsc1xuICAgKiAgIC0gZGlyZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gZ2l2ZSBhbiBvcmllbnRhdGlvbiB0byB0aGUgZWRnZXNcbiAgICogICBoYXZlIGFuIGVkZ2VcbiAgICogICAtIGRhdGEge09iamVjdH1cbiAgICogICAgIC0gbGlua0Rpc3RhbmNlPTkwIHtudW1iZXJ9IEZvcmNlZCBtaW4gZGlzdGFuY2UgYmV0d2VlbiB2ZXJ0aWNlcyB0aGF0XG4gICAqICAgICAtIGNvbnN0cmFpbnRzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgIC0gZ3JvdXBzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgIC0gbm9kZXMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgICAtIHI9MTAge251bWJlcn0gbm9kZSByYWRpdXNcbiAgICogICAgIC0gbGlua3Mge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgICAtIGRpcmVjdGVkPWZhbHNlIHtib29sZWFufSB0cnVlIHRvIGdpdmUgYW4gb3JpZW50YXRpb24gdG8gdGhpcyBlZGdlXG4gICAqICAgICAgIC0gd2VpZ2h0PVwiXCIge3N0cmluZ30gTGFiZWwgb2YgdGhlIGVkZ2UgKGNhbiBiZSB0aGUgd2VpZ2h0KVxuICAgKlxuICAgKi9cbiAgZGVmYXVsdE9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgICAvLyBncmFwaCBkZWZhdWx0c1xuICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgd2lkdGg6IDcwMCxcbiAgICAgIGhlaWdodDogMzAwLFxuICAgICAgYW5pbWF0aW9uVGltZTogMTAwMCxcbiAgICAgIGxhYmVsczogdHJ1ZSxcbiAgICAgIGRpcmVjdGVkOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICB0aGlzLm9wdGlvbnMuZGF0YSA9IGV4dGVuZCh7XG4gICAgICBub2RlczogW10sXG4gICAgICBsaW5rczogW10sXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgY29uc3RyYWludHM6IFtdLFxuICAgICAgYXZvaWRPdmVybGFwczogdHJ1ZSxcbiAgICAgIHNpemU6IFtvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodF0sXG4gICAgICBsaW5rRGlzdGFuY2U6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmxpbmtEaXN0YW5jZSB8fCA4MFxuICAgICAgfVxuICAgIH0sIHRoaXMub3B0aW9ucy5kYXRhKVxuICB9XG5cbiAgaW5pdExheW91dCAodXBkYXRlT3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpc1xuXG4gICAgaWYgKHVwZGF0ZU9wdGlvbnMuc2tpcExheW91dCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoc2VsZi5vcHRpb25zLmRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgIHZhciB2ID0gc2VsZi5vcHRpb25zLmRhdGFba11cbiAgICAgIHNlbGYubGF5b3V0W2tdKHYpXG4gICAgfSwgdGhpcylcblxuICAgIC8vIHRoaXMubGF5b3V0LnN0YXJ0KDE1LCAxNSwgMTUpXG4gICAgdGhpcy5sYXlvdXQuc3RhcnQoKVxuICB9XG5cbiAgdGljayAoKSB7XG4gICAgdGhpcy5lZGdlR3JvdXAuY2FsbCh0aGlzLmVkZ2VEcmF3ZXIpXG4gICAgdGhpcy5ub2RlR3JvdXAuY2FsbCh0aGlzLm5vZGVEcmF3ZXIpXG4gIH1cblxuICB1cGRhdGUgKHVwZGF0ZU9wdGlvbnMpIHtcbiAgICB1cGRhdGVPcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIHNraXBMYXlvdXQ6IGZhbHNlXG4gICAgfSwgdXBkYXRlT3B0aW9ucylcblxuICAgIHRoaXMuaW5pdExheW91dCh1cGRhdGVPcHRpb25zKVxuICAgIHRoaXMuYnVpbGQodXBkYXRlT3B0aW9ucylcblxuICAgIC8vIHVwZGF0ZSBpbm5lciBub2Rlcy9lZGdlcyBpZiBsYXlvdXQudGljayB3YXNuJ3QgcnVuXG4gICAgaWYgKHVwZGF0ZU9wdGlvbnMuc2tpcExheW91dCkge1xuICAgICAgdGhpcy50aWNrKClcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYnVpbGQgKCkge1xuICAgIHRoaXMucm9vdCA9IGQzLnNlbGVjdCh0aGlzLm9wdGlvbnMudGFyZ2V0KVxuICAgICAgLnNlbGVjdEFsbCgnc3ZnLmdyZXVsZXInKVxuICAgICAgLmRhdGEoW3RoaXMub3B0aW9uc10pXG5cbiAgICAvLyBlbnRlclxuICAgIHRoaXMucm9vdC5lbnRlciA9IHRoaXMucm9vdC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyZXVsZXInKVxuXG4gICAgLy8gbWFya2VyIGRlZlxuICAgIHRoaXMucm9vdC5lbnRlclxuICAgICAgLmFwcGVuZCgnc3ZnOmRlZnMnKVxuICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXG4gICAgICAuYXR0cignaWQnLCB0aGlzLm1hcmtlcklkKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAtNSAxMCAxMCcpXG4gICAgICAuYXR0cigncmVmWCcsIDkpXG4gICAgICAuYXR0cignbWFya2VyV2lkdGgnLCA1KVxuICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDUpXG4gICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxuICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgLmF0dHIoJ2QnLCAnTTAsLTRMMTAsMEwwLDRMMiwwJylcbiAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAnMHB4JylcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAxKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzc3NycpXG5cbiAgICAvLyB1cGRhdGVcbiAgICB0aGlzLnJvb3RcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMub3B0aW9ucy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KVxuXG4gICAgLy8gd3JhcHBlciBmb3IgdGhlIGVkZ2VzXG4gICAgdGhpcy5lZGdlR3JvdXAgPSB0aGlzLnJvb3RcbiAgICAgIC5zZWxlY3RBbGwoJ2cuZWRnZXMnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkLmRhdGFdIH0pXG4gICAgdGhpcy5lZGdlR3JvdXBcbiAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZWRnZXMnKVxuXG4gICAgLy8gd3JhcHBlciBmb3IgdGhlIG5vZGVzXG4gICAgdGhpcy5ub2RlR3JvdXAgPSB0aGlzLnJvb3RcbiAgICAgIC5zZWxlY3RBbGwoJ2cubm9kZXMnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkLmRhdGFdIH0pXG4gICAgdGhpcy5ub2RlR3JvdXBcbiAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbm9kZXMnKVxuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuL2NvbnN0J1xuXG5jb25zdCBOT0RFX0RFRkFVTFRfT1BUSU9OUyA9IHtcbiAgcjogMTAsXG4gIGZpbGw6ICcjMjk4MEI5J1xufVxuXG5jb25zdCBFREdFX0RFRkFVTFRfT1BUSU9OUyA9IHtcbiAgc3Ryb2tlOiBjb2xvcnMuTElHSFRfR1JBWVxufVxuXG5mdW5jdGlvbiBpbmNsdWRlcyAoYXJyLCBpZCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChhcnJbaV0uaWQgPT09IGlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaCB7XG4gIGNvbnN0cnVjdG9yIChvd25lciwgZGF0YSkge1xuICAgIHRoaXMub3duZXIgPSBvd25lclxuICAgIHRoaXMubm9kZXMgPSBkYXRhLm5vZGVzXG4gICAgdGhpcy5lZGdlcyA9IGRhdGEubGlua3NcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZ3JhcGgsIGVhY2ggb2YgdGhlIGFyZ3VtZW50cyBtdXN0XG4gICAqIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIGlkIHtOdW1iZXJ8c3RyaW5nfVxuICAgKlxuICAgKiBPcHRpb25hbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0geCB7bnVtYmVyfSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgbm9kZSBpbiB0aGUgZ3JhcGggKG9ubHkgaWYgZml4ZWQgPSB0cnVlKVxuICAgKiAtIHkge251bWJlcn0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIG5vZGUgaW4gdGhlIGdyYXBoIChvbmx5IGlmIGZpeGVkID0gdHJ1ZSlcbiAgICogLSBmaXhlZCB7Ym9vbGVhbn0gYHRydWVgIHRvIG1ha2UgdGhpcyBub2RlIG5vdCB0byBwYXJ0aWNpcGF0ZSBpbiB0aGUgbGF5b3V0IHByb2Nlc3NcbiAgICogLSBmaWxsIHtzdHJpbmd9IFRoZSBmaWxsIG9mIHRoZSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIHRoZSBub2RlXG4gICAqIC0gciB7bnVtYmVyfSBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIHRoZSBub2RlXG4gICAqIC0gbGFiZWwge3N0cmluZ30gVGhlIHRleHQgaW5zaWRlIHRoZSBub2RlIChpZiBpdCdzIG5vdCBwcmVzZW50IGl0J3MgZXF1YWwgdG8gdGhlIGBpZGApXG4gICAqIC0gdG9wUmlnaHRMYWJlbCB7c3RyaW5nXSB0aGUgdGV4dCBzaG93biBvbiB0aGUgdG9wIHJpZ2h0IHNpZGUgb2YgdGhlIG5vZGUsIHVzZWZ1bFxuICAgKiB0byByZXByZXNlbnQgYWRkaXRpb25hbCBhbm5vdGF0aW9uc1xuICAgKlxuICAgKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqL1xuICBhZGROb2RlICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50c1tpXVxuICAgICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgJylcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdldE5vZGUoY29uZmlnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignbm9kZSBhbHJlYWR5IGluIHN0b3JlJylcbiAgICAgIH1cbiAgICAgIHRoaXMubm9kZXMucHVzaChcbiAgICAgICAgR3JhcGguYXBwZW5kTm9kZURlZmF1bHRzLmNhbGwodGhpcy5vd25lciwgY29uZmlnKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbm9kZSBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgZ2V0Tm9kZSAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzQnlGbih2ID0+IHYuaWQgPT09IG5vZGUuaWQpWzBdXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIG5vZGVzIHRoYXQgc2F0aXNmeSB0aGUgcGFyYW1ldGVyIGBmbmAsXG4gICAqIGFsaWFzIGZvciBgdGhpcy5ub2Rlcy5maWx0ZXIoZm4pYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXROb2Rlc0J5Rm4gKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXMuZmlsdGVyKGZuKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBhZGphY2VudCBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRBZGphY2VudE5vZGVzIChub2RlKSB7XG4gICAgdmFyIGFkamFjZW50Tm9kZXMgPSBbXVxuICAgIHZhciB0YWtlbiA9IHt9XG4gICAgdmFyIG5leHRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXVxuICAgICAgbmV4dCA9IG51bGxcbiAgICAgIGlmIChlZGdlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS50YXJnZXRcbiAgICAgIH0gZWxzZSBpZiAoZWRnZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2Uuc291cmNlXG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWVcbiAgICAgICAgYWRqYWNlbnROb2Rlcy5wdXNoKG5leHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkamFjZW50Tm9kZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgc3VjY2Vzc29yIG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldFN1Y2Nlc3Nvck5vZGVzIChub2RlKSB7XG4gICAgdmFyIHN1Y2Nlc3NvciA9IFtdXG4gICAgdmFyIHRha2VuID0ge31cbiAgICB2YXIgbmV4dFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldXG4gICAgICBuZXh0ID0gbnVsbFxuICAgICAgaWYgKGVkZ2Uuc291cmNlLmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnRhcmdldFxuICAgICAgfVxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZVxuICAgICAgICBzdWNjZXNzb3IucHVzaChuZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzb3JcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgcHJlZGVjZXNzb3Igbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0UHJlZGVjZXNzb3JOb2RlcyAobm9kZSkge1xuICAgIHZhciBwcmVkZWNlc3NvciA9IFtdXG4gICAgdmFyIHRha2VuID0ge31cbiAgICB2YXIgbmV4dFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldXG4gICAgICBuZXh0ID0gbnVsbFxuICAgICAgaWYgKGVkZ2UudGFyZ2V0LmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnNvdXJjZVxuICAgICAgfVxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZVxuICAgICAgICBwcmVkZWNlc3Nvci5wdXNoKG5leHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICovXG4gIHJlbW92ZU5vZGUgKG5vZGUpIHtcbiAgICB0aGlzLnJlbW92ZU5vZGVzQnlGbihmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYuaWQgPT09IG5vZGUuaWRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBub2RlcyBzdG9yZWQgaW4gYG5vZGVzYCxcbiAgICogZWFjaCBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IG5vZGVzXG4gICAqL1xuICByZW1vdmVOb2RlcyAobm9kZXMpIHtcbiAgICAvLyBUT0RPOiBpbXByb3ZlIG5eMiByZW1vdmFsXG4gICAgdGhpcy5yZW1vdmVOb2Rlc0J5Rm4oZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiBpbmNsdWRlcyhub2Rlcywgdi5pZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHByZWRpY2F0ZVxuICAgKiBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuICByZW1vdmVOb2Rlc0J5Rm4gKGZuKSB7XG4gICAgdmFyIGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGZuKHRoaXMubm9kZXNbaV0sIGkpKSB7XG4gICAgICAgIC8vIHJlbW92ZSBub2Rlc1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZXMuc3BsaWNlKGksIDEpXG4gICAgICAgIC8vIHJlbW92ZSBpbmNpZGVudCBlZGdlc1xuICAgICAgICB0aGlzLnJlbW92ZUVkZ2VzKFxuICAgICAgICAgIHRoaXMuZ2V0SW5jaWRlbnRFZGdlcyhub2RlWzBdKVxuICAgICAgICApXG4gICAgICAgIGkgLT0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGVkZ2UgdG8gdGhlIGdyYXBoLCBlYWNoIG9mIHRoZSBhcmd1bWVudHMgbXVzdFxuICAgKiBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXNcbiAgICpcbiAgICogUmVxdWlyZWQgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIHNvdXJjZSB7bnVtYmVyfE9iamVjdH0gVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZSBvciB0aGUgc291cmNlIG5vZGUgaXRzZWxmXG4gICAqIC0gdGFyZ2V0IHtudW1iZXJ8T2JqZWN0fSBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlIG9yIHRoZSB0YXJnZXQgbm9kZSBpdHNlbGZcbiAgICpcbiAgICogT3B0aW9uYWwgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIGlkIHtzdHJpbmd8T2JqZWN0fSBJZiBhbiBpZCBpcyBub3QgcHJvdmlkZWQgYW4gYXV0byBnZW5lcmF0ZWQgc3RyaW5nIHdpbGwgYmUgYXNzaWduZWRcbiAgICogdG8gdGhpcyBlZGdlXG4gICAqIC0gc3Ryb2tlIHtzdHJpbmd9IFRoZSBzdHJva2Ugb2YgdGhlIHBhdGggdGhhdCByZXByZXNlbnRzIHRoZSBlZGdlXG4gICAqIC0gd2VpZ2h0IHtzdHJpbmd9IFRoZSB3ZWlnaHQgb2YgdGhlIGVkZ2VcbiAgICogLSBkaXJlY3RlZCB7Ym9vbGVhbn0gSWYgc2V0IHRvIHRydWUgYW4gYWRkaXRpb25hbCBhcnJvdyBpcyBhZGRlZCBhdCB0aGUgZW5kIG9mIHRoZSBlZGdlXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBhcmd1bWVudHNcbiAgICovXG4gIGFkZEVkZ2UgKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzW2ldXG5cbiAgICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KCdzb3VyY2UnKSB8fCAhY29uZmlnLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcigndGhlIGVkZ2UgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIGBzb3VyY2VgIGFuZCBgdGFyZ2V0YCcpXG4gICAgICB9XG4gICAgICB2YXIgc291cmNlID0gY29uZmlnLnNvdXJjZVxuICAgICAgdmFyIHRhcmdldCA9IGNvbmZpZy50YXJnZXRcblxuICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHNvdXJjZSA9IHRoaXMuZ2V0Tm9kZSh7IGlkOiBjb25maWcuc291cmNlIH0pXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmdldE5vZGUoeyBpZDogY29uZmlnLnRhcmdldCB9KVxuICAgICAgfVxuXG4gICAgICBpZiAoIXNvdXJjZSB8fCAhdGFyZ2V0KSB7XG4gICAgICAgIHRocm93IEVycm9yKCduZXcgZWRnZSBkb2VzIG5vdCBqb2luIGV4aXN0aW5nIHZlcnRpY2VzJylcbiAgICAgIH1cbiAgICAgIGNvbmZpZy5zb3VyY2UgPSBzb3VyY2VcbiAgICAgIGNvbmZpZy50YXJnZXQgPSB0YXJnZXRcbiAgICAgIHRoaXMuZWRnZXMucHVzaChcbiAgICAgICAgR3JhcGguYXBwZW5kRWRnZURlZmF1bHRzLmNhbGwodGhpcy5vd25lciwgY29uZmlnKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIGVkZ2UgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWRnZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVkZ2UuaWQgVGhlIGlkIG9mIHRoZSBlZGdlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBnZXRFZGdlIChlZGdlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGUgPT4gZS5pZCA9PT0gZWRnZS5pZClbMF1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZGlyZWN0ZWQgZWRnZXMgZnJvbSB0aGUgbm9kZSB3aG9zZSBpZCBpc1xuICAgKiBgb3B0aW9ucy5zb3VyY2VgIGFuZCB0byB0aGUgbm9kZSB3aG9zZSBpZCBpcyBgb3B0aW9ucy50YXJnZXRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy5zb3VyY2UgVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMudGFyZ2V0IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0RWRnZXNCZXR3ZWVuIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMuc291cmNlICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnRhcmdldFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIGZyb20gYG9wdGlvbnMuc291cmNlYCB0byBgb3B0aW9ucy50YXJnZXRgXG4gICAqIG9yIGBvcHRpb25zLnRhcmdldGAgdG8gYG9wdGlvbnMuc291cmNlYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMuc291cmNlIFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnRhcmdldCBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEFsbEVkZ2VzQmV0d2VlbiAob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIChlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy5zb3VyY2UgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMudGFyZ2V0KSB8fFxuICAgICAgKGUuc291cmNlLmlkID09PSBvcHRpb25zLnRhcmdldCAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy5zb3VyY2UpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGVkZ2UgaWRlbnRpZmllZCBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWRnZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVkZ2UuaWQgVGhlIGlkIG9mIHRoZSBlZGdlXG4gICAqL1xuICByZW1vdmVFZGdlIChlZGdlKSB7XG4gICAgdGhpcy5yZW1vdmVFZGdlc0J5Rm4oZSA9PiBlLmlkID09PSBlZGdlLmlkKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBlZGdlcyBzdG9yZWQgaW4gYGVkZ2VzYCxcbiAgICogZWFjaCBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGVkZ2VzXG4gICAqL1xuICByZW1vdmVFZGdlcyAoZWRnZXMpIHtcbiAgICAvLyBUT0RPOiBpbXByb3ZlIG5eMiByZW1vdmFsXG4gICAgdGhpcy5yZW1vdmVFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBpbmNsdWRlcyhlZGdlcywgZS5pZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBlZGdlcyB0aGF0IHJldHVybiB0cnVlIGZvciB0aGUgcHJlZGljYXRlXG4gICAqIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAgICovXG4gIHJlbW92ZUVkZ2VzQnlGbiAoZm4pIHtcbiAgICB2YXIgaVxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZm4odGhpcy5lZGdlc1tpXSwgaSkpIHtcbiAgICAgICAgdGhpcy5lZGdlcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgaSAtPSAxXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyB0aGF0IHJldHVybiB0cnVlIGZvciB0aGUgcHJlZGljYXRlIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0RWRnZXNCeUZuIChmbikge1xuICAgIHJldHVybiB0aGlzLmVkZ2VzLmZpbHRlcihmbilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgb3V0Z29pbmcgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldE91dGdvaW5nRWRnZXMgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oKGUpID0+IGUuc291cmNlLmlkID09PSBub2RlLmlkKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBpbmNvbWluZyBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0SW5jb21pbmdFZGdlcyAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbigoZSkgPT4gZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGluY2lkZW50IGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRJbmNpZGVudEVkZ2VzIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3V0Z29pbmdFZGdlcyhub2RlKVxuICAgICAgLmNvbmNhdCh0aGlzLmdldEluY29taW5nRWRnZXMobm9kZSkpXG4gIH1cblxuICAvKipcbiAgICogRmFjYWRlIHRvIGFkZCBub2Rlcy9lZGdlc1xuICAgKlxuICAgKiBOT1RFOiB0aGUgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBwYXJhbWV0ZXJzXG4gICAqL1xuICBhZGQgKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWwgPSBhcmd1bWVudHNbaV1cbiAgICAgIC8vIGFzc3VtZSB0aGF0IGVkZ2VzIGhhdmUgYSBzb3VyY2UvdGFyZ2V0IHBhcmFtZXRlclxuICAgICAgaWYgKGVsLmhhc093blByb3BlcnR5KCdzb3VyY2UnKSAmJiBlbC5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0JykpIHtcbiAgICAgICAgdGhpcy5hZGRFZGdlKGVsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGROb2RlKGVsKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmROb2RlRGVmYXVsdHMgKHYpIHtcbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIHYuaWQgPSB1dGlsLmlkKClcbiAgICB9XG5cbiAgICB2ID0gZXh0ZW5kKFxuICAgICAge30sXG4gICAgICAvLyBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICBOT0RFX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIC8vIGluc3RhbmNlIGRlZmF1bHRzXG4gICAgICB0aGlzLm9wdGlvbnMubm9kZURlZmF1bHRzLFxuICAgICAgLy8gbm9kZVxuICAgICAgdlxuICAgIClcblxuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSkge1xuICAgICAgdi53aWR0aCA9IDIgKiB2LnJcbiAgICB9XG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCdoZWlnaHQnKSkge1xuICAgICAgdi5oZWlnaHQgPSAyICogdi5yXG4gICAgfVxuICAgIHJldHVybiB2XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kRWRnZURlZmF1bHRzIChlKSB7XG4gICAgaWYgKCFlLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICBlLmlkID0gdXRpbC5pZCgpXG4gICAgfVxuICAgIGUgPSBleHRlbmQoXG4gICAgICB7fSxcbiAgICAgIC8vIHByZWRlZmluZWQgZGVmYXVsdHNcbiAgICAgIEVER0VfREVGQVVMVF9PUFRJT05TLFxuICAgICAgLy8gaW5zdGFuY2UgZGVmYXVsdHNcbiAgICAgIHRoaXMub3B0aW9ucy5lZGdlRGVmYXVsdHMsXG4gICAgICAvLyBlZGdlXG4gICAgICBlXG4gICAgKVxuICAgIHJldHVybiBlXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHJhbmRvbSBncmFwaCB3aXRoIHRoZSBmb2xsb3dpbmcgZGVmYXVsdHMgb3B0aW9ucyBvdmVycmlkZGVuIGJ5IGBvcHRpb25zYDpcbiAgICpcbiAgICogLSBvcHRpb25zLm9yZGVyPTEwIHtudW1iZXJ9IFRoZSBudW1iZXIgb2Ygbm9kZXMgaW4gdGhlIGdyYXBoXG4gICAqIC0gb3B0aW9ucy5zaXplPTE1IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZWRnZXMgaW4gdGhlIGdyYXBoXG4gICAqIC0gb3B0aW9ucy5jb25uZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gbWFrZSB0aGUgZ3JhcGggY29ubmVjdGVkLFxuICAgKiBpdCdzIGd1YXJhbnRlZWQgdG8gaGF2ZSBhdCBsZWFzdCBgb3B0aW9ucy5vcmRlciAtIDFgIGVkZ2VzXG4gICAqIC0gb3B0aW9ucy5tdWx0aUdyYXBoPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBwYXJhbGxlbCBlZGdlc1xuICAgKiAtIG9wdGlvbnMucHNldWRvR3JhcGg9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIGxvb3AgZWRnZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge3tub2RlczogQXJyYXksIGxpbmtzOiBBcnJheX19XG4gICAqL1xuICBzdGF0aWMgcmFuZG9tIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBvcmRlcjogMTAsXG4gICAgICBzaXplOiAxNSxcbiAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICBtdWx0aUdyYXBoOiBmYWxzZSxcbiAgICAgIHBzZXVkb0dyYXBoOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICB2YXIgaSwgdSwgdlxuICAgIHZhciBub2RlcyA9IFtdXG4gICAgdmFyIGFkamFjZW5jeUxpc3QgPSBbXVxuICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLm9yZGVyOyBpICs9IDEpIHtcbiAgICAgIGFkamFjZW5jeUxpc3RbaV0gPSBbXVxuICAgICAgbm9kZXMucHVzaCh7IGlkOiBpIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkICh1LCB2KSB7XG4gICAgICBhZGphY2VuY3lMaXN0W3VdW3ZdID0gYWRqYWNlbmN5TGlzdFt2XVt1XSA9IHRydWVcbiAgICB9XG5cbiAgICB2YXIgZWRnZXMgPSBbXVxuICAgIGkgPSAwXG5cbiAgICBpZiAob3B0aW9ucy5jb25uZWN0ZWQpIHtcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBvcHRpb25zLm9yZGVyOyBpICs9IDEpIHtcbiAgICAgICAgdiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpXG4gICAgICAgIGFkZChpLCB2KVxuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IGksXG4gICAgICAgICAgdGFyZ2V0OiB2XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpIC09IDFcbiAgICB9XG5cbiAgICBmb3IgKDsgaSA8IG9wdGlvbnMuc2l6ZTsgaSArPSAxKSB7XG4gICAgICB1ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5vcmRlcilcbiAgICAgIHYgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm9yZGVyKVxuXG4gICAgICBpZiAodSA9PT0gdiAmJiAhb3B0aW9ucy5wc2V1ZG9HcmFwaCkge1xuICAgICAgICBpIC09IDFcbiAgICAgIH0gZWxzZSBpZiAoYWRqYWNlbmN5TGlzdFt1XVt2XSAmJiAhb3B0aW9ucy5tdWx0aUdyYXBoKSB7XG4gICAgICAgIGkgLT0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKHUsIHYpXG4gICAgICAgIGVkZ2VzLnB1c2goe1xuICAgICAgICAgIHNvdXJjZTogdSxcbiAgICAgICAgICB0YXJnZXQ6IHZcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbm9kZXM6IG5vZGVzLFxuICAgICAgbGlua3M6IGVkZ2VzXG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgVmVjdG9yIHtcbiAgY29uc3RydWN0b3IgKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICB9XG5cbiAgLy8gdW5hcnlcblxuICBzdGF0aWMgbmVnIChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoLWEueCwgLWEueSlcbiAgfVxuXG4gIHN0YXRpYyBsZW4gKGEpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFZlY3Rvci5sZW5TcShhKSlcbiAgfVxuXG4gIHN0YXRpYyBsZW5TcSAoYSkge1xuICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnlcbiAgfVxuXG4gIHN0YXRpYyB1bml0IChhKSB7XG4gICAgaWYgKGEueCA9PT0gMCAmJiBhLnkgPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCd0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgaXMgMCcpXG4gICAgfVxuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbihhKVxuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAvIGxlbmd0aCwgYS55IC8gbGVuZ3RoKVxuICB9XG5cbiAgc3RhdGljIG9ydGhvZ29uYWwgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcigtYS55LCBhLngpXG4gIH1cblxuICBzdGF0aWMgYW5nbGVEZWcgKGEpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihhLnksIGEueCkgKiAxODAgLyBNYXRoLlBJXG4gIH1cblxuICAvLyBiaW5hcnlcblxuICBzdGF0aWMgYWRkIChhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54ICsgYi54LCBhLnkgKyBiLnkpXG4gIH1cblxuICBzdGF0aWMgc3ViIChhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54IC0gYi54LCBhLnkgLSBiLnkpXG4gIH1cblxuICBzdGF0aWMgZG90IChhLCBiKSB7XG4gICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueVxuICB9XG5cbiAgc3RhdGljIHNjYWxlIChhLCBuKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54ICogbiwgYS55ICogbilcbiAgfVxuXG4gIHN0YXRpYyBtaWQgKGEsIGIpIHtcbiAgICByZXR1cm4gVmVjdG9yLnNjYWxlKFZlY3Rvci5hZGQoYSwgYiksIDAuNSlcbiAgfVxuXG4gIHN0YXRpYyBhbmdsZUJldHdlZW4gKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hY29zKFZlY3Rvci5kb3QoYSwgYikgLyBWZWN0b3IubGVuKGEpIC0gVmVjdG9yLmxlbihiKSlcbiAgfVxuXG4gIHN0YXRpYyByb3RhdGUgKGEsIGFuZ2xlKSB7XG4gICAgdmFyIGNvc0EgPSBNYXRoLmNvcyhhbmdsZSlcbiAgICB2YXIgc2luQSA9IE1hdGguc2luKGFuZ2xlKVxuICAgIHZhciBueCA9IGEueCAqIGNvc0EgLSBhLnkgKiBzaW5BXG4gICAgdmFyIG55ID0gYS54ICogc2luQSArIGEueSAqIGNvc0FcbiAgICByZXR1cm4gbmV3IFZlY3RvcihueCwgbnkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yXG4iLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gd2luZG93LmQzXG52YXIgY29sb3IgPSBkMy5zY2FsZS5jYXRlZ29yeTIwKClcbnZhciBjb2xvcnMgPSB7fVxudmFyIGNvbG9yTGl0ZXJhbHMgPSBbJ0JMVUUnLCAnT1JBTkdFJywgJ0dSRUVOJywgJ1JFRCcsICdQVVJQTEUnLCAnQlJPV04nLCAnUElOSycsICdHUkFZJywgJ1lFTExPVycsICdDWUFOJ11cbmNvbG9yTGl0ZXJhbHMuZm9yRWFjaChmdW5jdGlvbiAoYywgaSkge1xuICBjb2xvcnNbY10gPSBjb2xvci5yYW5nZSgpWzIgKiBpXVxuICBjb2xvcnNbJ0xJR0hUXycgKyBjXSA9IGNvbG9yLnJhbmdlKClbMiAqIGkgKyAxXVxufSlcblxuY29sb3JzLnJhbmRvbUZyb21QYWxldHRlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY29sb3IucmFuZ2UoKVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCldXG59XG5cbmV4cG9ydCB7IGNvbG9ycyB9XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gd2luZG93LmQzXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9WZWN0b3InXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG93bmVyXG5cbiAgZnVuY3Rpb24gbW92ZVRvd2FyZHNQb2ludCAocG9pbnQsIG1pZGRsZSkge1xuICAgIHZhciBtYXJnaW4gPSBwb2ludC5yXG4gICAgdmFyIHVuaXQgPSBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKG1pZGRsZSwgcG9pbnQpKVxuICAgIHJldHVybiBWZWN0b3IuYWRkKHBvaW50LCBWZWN0b3Iuc2NhbGUodW5pdCwgbWFyZ2luKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgaW5uZXIgcG9pbnRzIG9mIGEgbG9vcCBlZGdlXG4gICAqXG4gICAqIC0gYW5hbHl6ZXMgZWFjaCBhZGphY2VudCB2ZXJ0ZXhcbiAgICogIC0gZm9yIGVhY2ggZWFjaCBlZGdlIHUtdiBtb3ZlIHRoZSBvcHBvc2l0ZSB3YXkgZS5nLiB2LT51XG4gICAqICAtIHRoZSBzdW0gb2YgdW5pdCB2ZWN0b3JzIHdpbGwgZ2l2ZSByb3VnaGx5IGEgZ29vZCBhcHByb3hpbWF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB1IFZlcnRleFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWFyZ2luQmV0d2VlbkVkZ2VzIERlZmluZWQgaW4gYGNyZWF0ZVBhdGhgXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudCBUaGUgbnVtYmVyIG9mIHUtdSBlZGdlcyBmb3VuZCB5ZXRcbiAgICogQHJldHVybnMge3twYXRoOiAqW10sIGRpcjogKn19XG4gICAqL1xuICBmdW5jdGlvbiBzZWxmTG9vcCAodSwgbWFyZ2luQmV0d2VlbkVkZ2VzLCBjb3VudCkge1xuICAgIHZhciBhZGphY2VudCA9IG93bmVyLmdyYXBoLmdldEFkamFjZW50Tm9kZXModSlcbiAgICB2YXIgZGlyID0gbmV3IFZlY3RvcigwLCAwKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciB2ID0gYWRqYWNlbnRbaV1cbiAgICAgIGlmICh1LmlkICE9PSB2LmlkKSB7XG4gICAgICAgIGRpciA9IFZlY3Rvci51bml0KFZlY3Rvci5hZGQoXG4gICAgICAgICAgZGlyLFxuICAgICAgICAgIFZlY3Rvci51bml0KFZlY3Rvci5zdWIodSwgdikpXG4gICAgICAgICkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9SYWQgKGEpIHtcbiAgICAgIHJldHVybiBhICogTWF0aC5QSSAvIDE4MFxuICAgIH1cblxuICAgIC8vIG5vIGFkamFjZW50IHZlcnRpY2VzXG4gICAgaWYgKGRpci54ID09PSAwICYmIGRpci55ID09PSAwKSB7XG4gICAgICBkaXIgPSBWZWN0b3IudW5pdChuZXcgVmVjdG9yKDAsIC0xKSlcbiAgICB9XG5cbiAgICB2YXIgb3J0ID0gVmVjdG9yLm9ydGhvZ29uYWwoZGlyKVxuXG4gICAgLy8gbW92aW5nIHUgdG93YXJkcyBgZGlyYCBgdS5yYCB1bml0c1xuICAgIHZhciB1Qm9yZGVyT3JpZ2luID0gVmVjdG9yLnNjYWxlKGRpciwgdS5yICsgNClcbiAgICAvLyB2YXIgdUJvcmRlck9yaWdpblR3aWNlID0gVmVjdG9yLnNjYWxlKGRpciwgdS5yICogMilcbiAgICAvLyB1RCBpcyBub3cgaW4gdGhlIGVkZ2Ugb2YgdGhlIGNpcmNsZSwgbWFraW5nIGEgbGl0dGxlIGFyYyBpbiB0aGUgY2lyY2xlXG5cbiAgICAvLyBlbmRwb2ludHMgb2YgdGhlIGVkZ2Ugd2lsbCBoYXZlIGEgc2VwYXJhdGlvbiBvZiAyNSBkZWcsIDUwIGRlZywgNzUgZGVnLCAuLi5cbiAgICB2YXIgc2VwYXJhdGlvbiA9IHRvUmFkKDI1KVxuICAgIHZhciBhbmdsZSA9IHNlcGFyYXRpb24gKyAoY291bnQgLSAxKSAqIHNlcGFyYXRpb25cblxuICAgIC8vIHRoZSBwb2ludCB0byB0aGUgbGVmdCBvZiB1ICsgdUJvcmRlclxuICAgIHZhciB1Qm9yZGVyTGVmdCA9IFZlY3Rvci5hZGQodSwgVmVjdG9yLnJvdGF0ZSh1Qm9yZGVyT3JpZ2luLCBhbmdsZSkpXG4gICAgLy8gdGhlIHBvaW50IHRvIHRoZSByaWdodCBvZiB1ICsgdUJvcmRlclxuICAgIHZhciB1Qm9yZGVyUmlnaHQgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5yb3RhdGUodUJvcmRlck9yaWdpbiwgLWFuZ2xlKSlcblxuICAgIC8vIHNvbWUgbGVuZ3RoIGF3YXkgZnJvbSB0aGUgbm9kZSBjb21wdXRlZCBieSBkb2luZyByYW5kb20gc2FtcGxlc1xuICAgIHZhciBsZW5ndGggPSAobWFyZ2luQmV0d2VlbkVkZ2VzICogMC42KSAqIChjb3VudCArIDEpXG5cbiAgICAvKlxuICAgICAqIEZvcm0gdGhlIHNoYXBlIG9mIGEgd2VpcmQgcmhvbWJ1c1xuICAgICAqXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgIHVwXG4gICAgICogICAgICAgICAgIC8gIFxcXG4gICAgICogICAgICAgICAgLyAgICBcXFxuICAgICAqICAgICAgICAgLyAgICAgIFxcXG4gICAgICogICAgICAgIC8gICAgICAgIFxcXG4gICAgICogICAgIGxlZnQgICAgICAgcmlnaHRcbiAgICAgKiAgICAgICBcXCAgICAgICAgIC9cbiAgICAgKiAgICAgYm9yZGVyICAgYm9yZGVyXG4gICAgICpcbiAgICAgKi9cbiAgICB2YXIgdXAgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5zY2FsZShkaXIsIHUuciArIGxlbmd0aCkpXG5cbiAgICB2YXIgbWlkTGVmdCA9IFZlY3Rvci5hZGQodUJvcmRlckxlZnQsIFZlY3Rvci5zY2FsZShkaXIsIGxlbmd0aCAqIDAuNSkpXG4gICAgdmFyIG1pZFJpZ2h0ID0gVmVjdG9yLmFkZCh1Qm9yZGVyUmlnaHQsIFZlY3Rvci5zY2FsZShkaXIsIGxlbmd0aCAqIDAuNSkpXG5cbiAgICB2YXIgbGVmdCA9IFZlY3Rvci5hZGQobWlkTGVmdCwgVmVjdG9yLnNjYWxlKG9ydCwgbGVuZ3RoIC8gNCkpXG4gICAgdmFyIHJpZ2h0ID0gVmVjdG9yLmFkZChtaWRSaWdodCwgVmVjdG9yLnNjYWxlKG9ydCwgLWxlbmd0aCAvIDQpKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFt1Qm9yZGVyTGVmdCwgbGVmdCwgdXAsIHJpZ2h0LCB1Qm9yZGVyUmlnaHRdLFxuICAgICAgZGlyOiBvcnRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgcG9pbnRzIG9mIHRoZSA8cGF0aD4gdGhhdCByZXByZXNlbnQgYW4gZWRnZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZCBFZGdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhIEhvbGRzIHRoZSBlZGdlIGNvdW50IGJldHdlZW4gdmVydGljZXMsXG4gICAqIHVuaXQgdmVjdG9ycyBhbmQgb3RoZXIgbWV0YWRhdGFcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1hcmdpbkJldHdlZW5FZGdlcyBVc2VkIGluIGJvdGggbm9ybWFsIGFuZFxuICAgKiBsb29wIGVkZ2VzIHNldHMgdGhlIHNlcGFyYXRpb24gYmV0d2VlbiBlZGdlcyBmcm9tIHRoZSBtaWRcbiAgICogcG9pbnQgb2YgdGhlIHZlcnRpY2VzIHRoZXkgam9pblxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlUGF0aCAoZCwgbWV0YSwgbWFyZ2luQmV0d2VlbkVkZ2VzKSB7XG4gICAgdmFyIHUsIHZcbiAgICB2YXIgdUJvcmRlciwgdkJvcmRlclxuICAgIHZhciBjdXJyZW50XG5cbiAgICB1ID0gZC5zb3VyY2VcbiAgICB2ID0gZC50YXJnZXRcbiAgICBpZiAodS5pZCA+IHYuaWQpIHtcbiAgICAgIFt1LCB2XSA9IFt2LCB1XVxuICAgIH1cbiAgICBtZXRhW3UuaWRdID0gbWV0YVt1LmlkXSB8fCB7fVxuXG4gICAgLy8gdGhlIG1pZCBwb2ludCBpcyBjb21wdXRlZCBmcm9tIHRoZSBib3JkZXJzIG9mIGJvdGggbm9kZXNcbiAgICAvLyB0aGUgbWlkIHBvaW50IGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFiZWxcbiAgICB1Qm9yZGVyID0gdVxuICAgIHZCb3JkZXIgPSB2XG4gICAgaWYgKHUuaWQgIT09IHYuaWQpIHtcbiAgICAgIHVCb3JkZXIgPSBtb3ZlVG93YXJkc1BvaW50KHUsIHYpXG4gICAgICB2Qm9yZGVyID0gbW92ZVRvd2FyZHNQb2ludCh2LCB1KVxuICAgIH1cblxuICAgIGN1cnJlbnQgPSAobWV0YVt1LmlkXVt2LmlkXSA9IG1ldGFbdS5pZF1bdi5pZF0gfHwge1xuICAgICAgY291bnQ6IDEsXG4gICAgICBtaWQ6IFZlY3Rvci5taWQodUJvcmRlciwgdkJvcmRlciksXG4gICAgICBkaXJlY3Rpb246IC0xXG4gICAgfSlcblxuICAgIHZhciBpbm5lckpvaW50cyA9IFtdXG4gICAgaWYgKHUuaWQgPT09IHYuaWQpIHtcbiAgICAgIC8vIGFwcGx5IHRoZSBmb2xsb3dpbmcgZm9yIHNlbGYtbG9vcCBlZGdlc1xuICAgICAgdmFyIGxvb3AgPSBzZWxmTG9vcCh1LCBtYXJnaW5CZXR3ZWVuRWRnZXMsIGN1cnJlbnQuY291bnQpXG4gICAgICBpbm5lckpvaW50cyA9IGxvb3AucGF0aFxuICAgICAgZC51bml0ID0gbG9vcC5kaXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVuaXQgPSBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHYsIHUpKVxuICAgICAgZXh0ZW5kKGN1cnJlbnQsIHtcbiAgICAgICAgdW5pdDogdW5pdCxcbiAgICAgICAgdW5pdE9ydGhvZ29uYWw6IFZlY3Rvci5vcnRob2dvbmFsKHVuaXQpXG4gICAgICB9KVxuICAgICAgaW5uZXJKb2ludHMucHVzaChWZWN0b3IuYWRkKFxuICAgICAgICBjdXJyZW50Lm1pZCxcbiAgICAgICAgVmVjdG9yLnNjYWxlKFxuICAgICAgICAgIGN1cnJlbnQudW5pdE9ydGhvZ29uYWwsXG4gICAgICAgICAgTWF0aC5mbG9vcihjdXJyZW50LmNvdW50IC8gMikgKiBtYXJnaW5CZXR3ZWVuRWRnZXMgKiBjdXJyZW50LmRpcmVjdGlvblxuICAgICAgICApXG4gICAgICApKVxuICAgICAgZC51bml0ID0gY3VycmVudC51bml0XG4gICAgfVxuXG4gICAgY3VycmVudC5jb3VudCArPSAxXG4gICAgY3VycmVudC5kaXJlY3Rpb24gKj0gLTFcblxuICAgIC8vIHByb2JsZW06IHRoZSBlZGdlIHN0YXJ0cy9lbmRzIGluIHRoZSBjZW50ZXIgb2Ygc29tZSBub2RlXG4gICAgLy9cbiAgICAvLyByZWFsIHNvbHV0aW9uOiByZW5kZXIgdGhlIHBhdGggbm9ybWFsbHkgdGhlbiBjb21wdXRlIHRoZSBwb3NpdGlvbiBvZiBhIHBvaW50XG4gICAgLy8gd2l0aCBgcGF0aC5nZXRQb2ludEF0TGVuZ3RoKHQgKiBsKWAgd2hlcmUgYGxgIGlzIHRoZSBsZW5ndGggb2YgdGhlIHBhdGggYW5kXG4gICAgLy8gYHRgIGFuIGludGVycG9sYXRlZCBwbGFjZSA9IHJhZGl1cyBvZiBlYWNoIG5vZGVcbiAgICAvL1xuICAgIC8vIHNpbXBsZSB0cmljazogc2hvcnRlbiB0aGUgbGVuZ3RoIG9mIHRoZSBlZGdlIGJ5IG1vdmluZyB0aGUgc3RhcnQvZW5kIHBvaW50c1xuICAgIC8vIG9mIHRoZSBlZGdlcyB0b3dhcmQgZWFjaCBvdGhlclxuICAgIHZhciBzb3VyY2UgPSBtb3ZlVG93YXJkc1BvaW50KGQuc291cmNlLCBpbm5lckpvaW50c1swXSlcbiAgICB2YXIgdGFyZ2V0ID0gbW92ZVRvd2FyZHNQb2ludChkLnRhcmdldCwgaW5uZXJKb2ludHNbaW5uZXJKb2ludHMubGVuZ3RoIC0gMV0pXG5cbiAgICBkLnBhdGggPSBbc291cmNlXVxuICAgICAgLmNvbmNhdChpbm5lckpvaW50cylcbiAgICAgIC5jb25jYXQoW3RhcmdldF0pXG4gIH1cblxuICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAueChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54IH0pXG4gICAgLnkoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueSB9KVxuICAgIC50ZW5zaW9uKDEuNSlcbiAgICAuaW50ZXJwb2xhdGUoJ2J1bmRsZScpXG4gICAgLy8gLmludGVycG9sYXRlKCdsaW5lYXInKVxuXG4gIGZ1bmN0aW9uIGlubmVyIChzZWxlY3Rpb24pIHtcbiAgICAvLyBlZGdlc1xuICAgIHZhciBsaW5rcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cuZWRnZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rc1xuICAgICAgfSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWRcbiAgICAgIH0pXG4gICAgbGlua3MuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpIH0pXG4gICAgICAudHJhbnNpdGlvbignZW50ZXInKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuXG4gICAgLy8gdXBkYXRlXG4gICAgbGlua3NcbiAgICAgIC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZhciBzZWxmID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIHZhciBjbHMgPSB7XG4gICAgICAgICAgZGlyZWN0ZWQ6IGQuZGlyZWN0ZWQgfHwgb3duZXIub3B0aW9ucy5kaXJlY3RlZFxuICAgICAgICB9XG4gICAgICAgIGNsc1snc291cmNlLScgKyBkLnNvdXJjZS5pZF0gPSB0cnVlXG4gICAgICAgIGNsc1sndGFyZ2V0LScgKyBkLnRhcmdldC5pZF0gPSB0cnVlXG4gICAgICAgIHNlbGYuY2xhc3NlZChjbHMpXG4gICAgICB9KVxuXG4gICAgdmFyIG1ldGEgPSB7fVxuICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgIGNyZWF0ZVBhdGgoZCwgbWV0YSwgMTcpXG4gICAgfSlcblxuICAgIC8vIHBhdGggZW50ZXJcbiAgICB2YXIgcGF0aHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gMS4gcmVhbCBwYXRoXG4gICAgICAgIC8vIDIuIHN0cm9rZS1kYXNoYXJyYXkgaGVscGVyXG4gICAgICAgIHJldHVybiBbZCwgZF1cbiAgICAgIH0pXG4gICAgcGF0aHMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignc3Ryb2tlJywgZCA9PiBkLnN0cm9rZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIGVsLmF0dHIoJ29wYWNpdHknLCAhaSA/IDEgOiAwKVxuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIGVsLmNsYXNzZWQoJ2Jhc2UnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgZWwuYXR0cignc3Ryb2tlLXdpZHRoJywgNSlcbiAgICAgICAgICBlbC5jbGFzc2VkKCd0cmF2ZXJzYWwnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gLmF0dHIoJ2QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgdmFyIHBhcmVudCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmRhdHVtKClcbiAgICAgIC8vICByZXR1cm4gbGluZShbcGFyZW50LnNvdXJjZV0pXG4gICAgICAvLyB9KVxuXG4gICAgLy8gcGF0aCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24ocGF0aHMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAuYXR0cignZCcsIGQgPT4gbGluZShkLnBhdGgpKVxuXG4gICAgcGF0aHMuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcylcbiAgICAgIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKVxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgcGF0aC5hdHRyKCdtYXJrZXItZW5kJyxcbiAgICAgICAgICBwYXJlbnQuY2xhc3NlZCgnZGlyZWN0ZWQnKVxuICAgICAgICAgICAgPyAndXJsKCMnICsgb3duZXIubWFya2VySWQgKyAnKSdcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHdlaWdodFBvc2l0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvblxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICB2YXIgYW5nbGUgPSBWZWN0b3IuYW5nbGVEZWcoZC51bml0KVxuICAgICAgICAgIHZhciB2ID0gZC5wYXRoW01hdGguZmxvb3IoZC5wYXRoLmxlbmd0aCAvIDIpXVxuICAgICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB2LFxuICAgICAgICAgICAgcm90YXRlOiBhbmdsZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdmFyIHdlaWdodHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgLmRhdGEoZCA9PiBbZF0pXG5cbiAgICAvLyB3ZWlnaHQgZW50ZXJcbiAgICB3ZWlnaHRzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ3RleHQtYWZ0ZXItZWRnZScpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5jYWxsKHdlaWdodFBvc2l0aW9uKVxuXG4gICAgLy8gd2VpZ2h0IHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbih3ZWlnaHRzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLnRleHQoZCA9PiBkLndlaWdodClcbiAgICAgIC5jYWxsKHdlaWdodFBvc2l0aW9uKVxuXG4gICAgLy8gd2VpZ2h0IGV4aXRcbiAgICB3ZWlnaHRzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpXG5cbiAgICAvLyBleGl0XG4gICAgbGlua3MuZXhpdCgpXG4gICAgICAucmVtb3ZlKClcbiAgfVxuXG4gIGlubmVyLm93bmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb3duZXJcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZVxuICAgIHJldHVybiBpbm5lclxuICB9XG5cbiAgcmV0dXJuIGlubmVyXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gd2luZG93LmQzXG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4uL2NvbnN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIHZhciBvd25lclxuXG4gIGZ1bmN0aW9uIGlubmVyIChzZWxlY3Rpb24pIHtcbiAgICB2YXIgbm9kZXMgPSBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ2cubm9kZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5ub2Rlc1xuICAgICAgfSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWRcbiAgICAgIH0pXG5cbiAgICB2YXIgbGF5b3V0ID0gb3duZXIubGF5b3V0XG5cbiAgICB2YXIgZyA9IG5vZGVzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiAnbm9kZSAnICsgKGQuY2xhc3MgfHwgJycpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpIH0pXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7IHRyYW5zbGF0ZTogZCB9KVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgaWYgKCFlbC5vdmVyKSB7XG4gICAgICAgICAgZWwuc3R5bGUoJ2N1cnNvcicsICdwb2ludGVyJylcbiAgICAgICAgfVxuICAgICAgICBlbC5vdmVyID0gdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICBlbC5vdmVyID0gZmFsc2VcbiAgICAgICAgZWwuc3R5bGUoJ2N1cnNvcicsIG51bGwpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgIGcudHJhbnNpdGlvbignZW50ZXInKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgIGcuY2FsbChsYXlvdXQuZHJhZylcblxuICAgIHZhciBkcmFnU3RhcnQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJylcbiAgICB2YXIgZHJhZ0VuZCA9IGxheW91dC5kcmFnKCkub24oJ2RyYWdlbmQuZDNhZGFwdG9yJylcbiAgICBsYXlvdXQuZHJhZygpXG4gICAgICAub24oJ2RyYWdzdGFydC5kM2FkYXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG93bmVyLm5vZGVEcmFnZ2luZyA9IHRydWVcbiAgICAgICAgZHJhZ1N0YXJ0LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICAgIC5vbignZHJhZ2VuZC5kM2FkYXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG93bmVyLm5vZGVEcmFnZ2luZyA9IGZhbHNlXG4gICAgICAgIGRyYWdFbmQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpXG4gICAgICB9KVxuXG4gICAgZy5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAuYXR0cignZmlsbCcsIGQgPT4gZC5maWxsKVxuICAgICAgLmF0dHIoJ3InLCBkID0+IGQucilcblxuICAgIC8vIGlubmVyIGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ2xhYmVsJywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3doaXRlJylcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMTJweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJylcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQubGFiZWwnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCdsYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLmxhYmVsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQuaWRcbiAgICAgIH0pXG5cbiAgICAvLyB0b3AtcmlnaHQgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnb3V0ZXItdG9wLXJpZ2h0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgLmF0dHIoJ3gnLCBkID0+IGQud2lkdGggLyAyIC0gMilcbiAgICAgIC5hdHRyKCd5JywgZCA9PiAtZC5oZWlnaHQgLyAyICsgMylcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLXJpZ2h0JylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgndG9wUmlnaHRMYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLnRvcFJpZ2h0TGFiZWxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIC8vIHRvcC1sZWZ0IGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ291dGVyLXRvcC1sZWZ0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgIC5hdHRyKCd4JywgZCA9PiAtZC53aWR0aCAvIDIgLSAyKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IC1kLmhlaWdodCAvIDIgKyAzKVxuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5vdXRlci10b3AtbGVmdCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BMZWZ0TGFiZWxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIC8vIHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbihub2RlcywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IGRcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAvLyBleGl0XG4gICAgbm9kZXMuZXhpdCgpXG4gICAgICAucmVtb3ZlKClcbiAgfVxuXG4gIGlubmVyLm93bmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb3duZXJcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZVxuICAgIHJldHVybiBpbm5lclxuICB9XG5cbiAgcmV0dXJuIGlubmVyXG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHBvbHlmaWxscyBmcm9tICcuL3BvbHlmaWxscydcbnBvbHlmaWxscygpXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xuXG4vLyBub2RlXG5pbXBvcnQgRHJhdyBmcm9tICcuL0RyYXcnXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscydcblxudmFyIGluc3RhbmNlcyA9IFtdXG5cbmZ1bmN0aW9uIHJ1biAob3B0aW9ucykge1xuICBmdW5jdGlvbiBmYWN0b3J5IChvcHRpb25zKSB7XG4gICAgdmFyIGVsID0gZDMuc2VsZWN0KG9wdGlvbnMudGFyZ2V0KVxuICAgIHZhciBpZCA9IGVsLmF0dHIoJ2dyZXVsZXItaWQnKVxuICAgIGlmICghaWQpIHtcbiAgICAgIGlkID0gdXRpbHMuaWQoKVxuICAgICAgZWwuYXR0cignZ3JldWxlci1pZCcsIGlkKVxuICAgICAgaW5zdGFuY2VzW2lkXSA9IG5ldyBEcmF3KGlkLCBvcHRpb25zKVxuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2VzW2lkXVxuICB9XG5cbiAgcmV0dXJuIGZhY3Rvcnkob3B0aW9ucylcbn1cblxuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnXG5ydW4uR3JhcGggPSBHcmFwaFxuXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuL2NvbnN0J1xucnVuLmNvbG9ycyA9IGNvbG9yc1xuXG5pbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyL2luZGV4J1xucnVuLnBsYXllciA9IHBsYXllclxuXG5leHBvcnQgZGVmYXVsdCBydW5cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoYWN0aW9ucywgc3BlZWQpIHtcbiAgICB0aGlzLmluZGV4ID0gMFxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZFxuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnNcblxuICAgIC8vIHN0YXRlc1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYWN0aW9uc1t0aGlzLmluZGV4KytdKClcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMucGxheS5iaW5kKHRoaXMpLCB0aGlzLnNwZWVkKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIHRoaXMucGF1c2UoKVxuICAgIHRoaXMuaW5kZXggPSAwXG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yIChpbnN0YW5jZSwgc3BlZWQpIHtcbiAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2VcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQgfHwgaW5zdGFuY2Uub3B0aW9ucy5hbmltYXRpb25UaW1lXG4gICAgdGhpcy5mbiA9IG51bGxcbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICB9XG5cbiAgcnVuIChmbikge1xuICAgIHRoaXMuZm4gPSBmbih0aGlzLmluc3RhbmNlKVxuICAgIHRoaXMucGxheSgpXG4gIH1cblxuICBydW5BbmltYXRpb24gKGFuaW1hdGlvbikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFuaW1hdGlvbikpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb24uZm9yRWFjaCh0aGlzLnJ1bkFuaW1hdGlvbiwgdGhpcylcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbih0aGlzLmluc3RhbmNlKVxuICAgIH1cblxuICAgIHZhciB0eXBlID0gdGhpcy5pbnN0YW5jZVthbmltYXRpb24udHlwZV1cbiAgICByZXR1cm4gdHlwZVthbmltYXRpb24ub3BdLmFwcGx5KHR5cGUsIGFuaW1hdGlvbi5hcmdzIHx8IFtdKVxuICB9XG5cbiAgcGxheSAodmFsdWUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB2YXIgbmV4dCA9IHRoaXMuZm4ubmV4dCh2YWx1ZSlcbiAgICBpZiAoIW5leHQuZG9uZSkge1xuICAgICAgdmFyIGRlbGF5ID0gdGhpcy5zcGVlZFxuICAgICAgdmFyIHJ1bkFuaW1hdGlvblZhbHVlID0gdGhpcy5ydW5BbmltYXRpb24obmV4dC52YWx1ZSlcbiAgICAgIGlmIChydW5BbmltYXRpb25WYWx1ZSAmJiB0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZGVsYXkgPSBydW5BbmltYXRpb25WYWx1ZS5kZWxheVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGltZXIgPSB3aW5kb3cucmVxdWVzdFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnBsYXkobmV4dC52YWx1ZSlcbiAgICAgIH0sIGRlbGF5KVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICB3aW5kb3cuY2xlYXJSZXF1ZXN0VGltZW91dCh0aGlzLnRpbWVyKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IEZpeGVkIGZyb20gJy4vRml4ZWQnXG5pbXBvcnQgR2VuZXJhdG9yIGZyb20gJy4vR2VuZXJhdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEZpeGVkSW50ZXJ2YWw6IEZpeGVkLFxuICBHZW5lcmF0b3I6IEdlbmVyYXRvclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLyplc2xpbnQtZGlzYWJsZSAqL1xuICAoZnVuY3Rpb24gKGRvYywgcHJvdG8pIHtcbiAgICB0cnkgeyAvLyBjaGVjayBpZiBicm93c2VyIHN1cHBvcnRzIDpzY29wZSBuYXRpdmVseVxuICAgICAgZG9jLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSBib2R5JylcbiAgICB9IGNhdGNoIChlcnIpIHsgLy8gcG9seWZpbGwgbmF0aXZlIG1ldGhvZHMgaWYgaXQgZG9lc24ndFxuICAgICAgWydxdWVyeVNlbGVjdG9yJywgJ3F1ZXJ5U2VsZWN0b3JBbGwnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgdmFyIG5hdGl2ZSA9IHByb3RvW21ldGhvZF1cbiAgICAgICAgcHJvdG9bbWV0aG9kXSA9IGZ1bmN0aW9uIChzZWxlY3RvcnMpIHtcbiAgICAgICAgICBpZiAoLyhefCwpXFxzKjpzY29wZS8udGVzdChzZWxlY3RvcnMpKSB7IC8vIG9ubHkgaWYgc2VsZWN0b3JzIGNvbnRhaW5zIDpzY29wZVxuICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5pZCAvLyByZW1lbWJlciBjdXJyZW50IGVsZW1lbnQgaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSAnSURfJyArIERhdGUubm93KCkgLy8gYXNzaWduIG5ldyB1bmlxdWUgaWRcbiAgICAgICAgICAgIHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5yZXBsYWNlKC8oKF58LClcXHMqKTpzY29wZS9nLCAnJDEjJyArIHRoaXMuaWQpOyAvLyByZXBsYWNlIDpzY29wZSB3aXRoICNJRFxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGRvY1ttZXRob2RdKHNlbGVjdG9ycylcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZCAvLyByZXN0b3JlIHByZXZpb3VzIGlkXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmUuY2FsbCh0aGlzLCBzZWxlY3RvcnMpIC8vIHVzZSBuYXRpdmUgY29kZSBmb3Igb3RoZXIgc2VsZWN0b3JzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSkod2luZG93LmRvY3VtZW50LCBFbGVtZW50LnByb3RvdHlwZSlcblxuICAvLyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2pvZWxhbWJlcnQvMTAwMjExNlxuICAvL1xuICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSBzaGltIGJ5IFBhdWwgSXJpc2hcbiAgLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIGZ1bmN0aW9uICggLyogZnVuY3Rpb24gKi8gY2FsbGJhY2ssIC8qIERPTUVsZW1lbnQgKi8gZWxlbWVudCkge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MClcbiAgICB9XG4gIH0pKClcblxuICAvKipcbiAgICogQmVoYXZlcyB0aGUgc2FtZSBhcyBzZXRUaW1lb3V0IGV4Y2VwdCB1c2VzIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHdoZXJlIHBvc3NpYmxlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7aW50fSBkZWxheSBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICB3aW5kb3cucmVxdWVzdFRpbWVvdXQgPSBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XG4gICAgaWYgKCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgIXdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICEod2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSAmJiAvLyBGaXJlZm94IDUgc2hpcHMgd2l0aG91dCBjYW5jZWwgc3VwcG9ydFxuICAgICAgIXdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZuLCBkZWxheSlcblxuICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgdmFyIGhhbmRsZSA9IHt9XG5cbiAgICBmdW5jdGlvbiBsb29wICgpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIGRlbHRhID0gY3VycmVudCAtIHN0YXJ0XG5cbiAgICAgIGRlbHRhID49IGRlbGF5ID8gZm4uY2FsbCgpIDogaGFuZGxlLnZhbHVlID0gcmVxdWVzdEFuaW1GcmFtZShsb29wKVxuICAgIH1cblxuICAgIGhhbmRsZS52YWx1ZSA9IHJlcXVlc3RBbmltRnJhbWUobG9vcClcbiAgICByZXR1cm4gaGFuZGxlXG4gIH1cblxuICAvKipcbiAgICogQmVoYXZlcyB0aGUgc2FtZSBhcyBjbGVhclRpbWVvdXQgZXhjZXB0IHVzZXMgY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgd2hlcmUgcG9zc2libGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgKiBAcGFyYW0ge2ludHxvYmplY3R9IGhhbmRsZSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHdpbmRvdy5jbGVhclJlcXVlc3RUaW1lb3V0ID0gZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6IC8qIFN1cHBvcnQgZm9yIGxlZ2FjeSBBUEkgKi9cbiAgICAgICAgICB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHQ/IHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSlcbiAgfVxuLyplc2xpbnQtZW5hYmxlICovXG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yIChvd25lcikge1xuICAgIHRoaXMub3duZXIgPSBvd25lclxuICAgIHRoaXMuZ3JhcGggPSBvd25lci5ncmFwaFxuICAgIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucyA9IHt9XG4gIH1cblxuICBnZXREZWZhdWx0U3R5bGVPcHRpb25zICgpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmdldEFuaW1hdGlvblRpbWUoKSxcbiAgICAgIHN0cm9rZTogJyNFNzRDM0MnXG4gICAgfSwgdGhpcy5kZWZhdWx0U3R5bGVPcHRpb25zKVxuICB9XG5cbiAgZ2V0U3R5bGVPcHRpb25zIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpXG4gIH1cblxuICBnZXRBbmltYXRpb25UaW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lci5vcHRpb25zLmFuaW1hdGlvblRpbWVcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGNvbGxlY3Rpb24gb2YgZWxlbWVudHMgcmV0dXJuZWQgYnkgdGhlIEdyYXBoIGNsYXNzIHRoaXMgbWV0aG9kcyByZXR1cm5zXG4gICAqIHRoZSBkMyBzZWxlY3Rpb24gdGhhdCBmb3IgYWxsIHRob3NlIG9iamVjdHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXXxPYmplY3R9IGVscyBBbiBhcnJheSBvZiBlZGdlcy9ub2RlcyBvciBhIHNpbmdsZSBlZGdlL25vZGVcbiAgICogQHJldHVybiB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgc2VsZWN0IChlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkge1xuICAgICAgZWxzID0gW2Vsc11cbiAgICB9XG4gICAgaWYgKCFlbHMubGVuZ3RoKSB7XG4gICAgICBlbHMucHVzaCh7IGlkOiAtMSB9KVxuICAgIH1cbiAgICBlbHMgPSBlbHMuZmlsdGVyKEJvb2xlYW4pXG4gICAgcmV0dXJuIHRoaXMub3duZXIucm9vdC5zZWxlY3RBbGwoXG4gICAgICBlbHMubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiAnIycgKyB1dGlscy5ucyhlLmlkKVxuICAgICAgfSkuam9pbignLCAnKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSBwYXRoIGluc2lkZSB0aGUgdGFnIDxnPiB0aGF0IHJlcHJlc2VudHMgYW4gZWRnZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqL1xuICBpbm5lckVkZ2VTZWxlY3RvciAoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgncGF0aC5iYXNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSBjaXJjbGUgaW5zaWRlIHRoZSB0YWcgPGc+IHRoYXQgcmVwcmVzZW50cyBhIG5vZGVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKi9cbiAgaW5uZXJOb2RlU2VsZWN0b3IgKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGQzID0gd2luZG93LmQzXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnXG5cbnZhciBISUdITElHSFQgPSAnaGlnaGxpZ2h0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24gZXh0ZW5kcyBHcmFwaCB7XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyBvZiB0aGUgZ3JhcGhcbiAgICpcbiAgICogQHJldHVybnMge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIGdldEVkZ2VzICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZWRnZXMpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBub2RlcyBvZiB0aGUgZ3JhcGhcbiAgICpcbiAgICogQHJldHVybnMge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIGdldE5vZGVzICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGgubm9kZXMpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYSBub2RlIHRlbXBvcmFyaWx5LCBpdCBjb25zaXN0cyBvZiB0d29cbiAgICogY2hhaW5lZCB0cmFuc2l0aW9uc1xuICAgKlxuICAgKiAtIGluY3JlYXNlIHRoZSByYWRpdXMgdG8gMS41eCB0aGUgb3JpZ2luYWwgYHJgIHZhbHVlXG4gICAqIC0gZGVjcmVhc2UgdGhlIHJhZGl1cyB0byB0aGUgb3JpZ2luYWwgYHJgIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICBkb1RlbXBvcmFsSGlnaGxpZ2h0Tm9kZSAoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IG9wdGlvbnMuciB8fCAoZC5yICogMS41KSlcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBkLnIpXG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyBhbiBlZGdlIHRlbXBvcmFyaWx5LCBpdCBjb25zaXN0cyBvZiB0d29cbiAgICogY2hhaW5lZCB0cmFuc2l0aW9uc1xuICAgKlxuICAgKiAtIGNoYW5nZSB0aGUgc3Ryb2tlIG9mIHRoZSBgcGF0aGAgdGhhdCByZXByZXNlbnRzIHRoZSBlZGdlIHRvXG4gICAqIGBvcHRpb25zLnN0cm9rZWBcbiAgICogLSBjaGFuZ2UgdGhlIHN0cm9rZSB0byB0aGUgb3JpZ2luYWwgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIGRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyAoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgKGQpID0+IGQuc3Ryb2tlKVxuICB9XG5cbiAgLyoqXG4gICAqIEVkZ2UgdHJhdmVyc2FsIGFuaW1hdGlvbiwgaXQgYW5pbWF0ZXMgYSBoaWRkZW4gcGF0aCBnaXZpbmcgdGhlIGltcHJlc3Npb25cbiAgICogb2YgbW92ZW1lbnQsIGlmIHNvdXJjZSBpcyBnaXZlbiB0aGVuIGl0IHdpbGwgYWx3YXlzIHN0YXJ0IHRoZSBhbmltYXRpb25cbiAgICogZnJvbSB0aGUgbm9kZSBgc291cmNlYCBldmVuIGlmIHRoZSBlZGdlIGlzIGFuIGluY29taW5nIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge2NvbmZpZ30gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW3NvdXJjZT0tMV1cbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICB0cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uIChzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSA9IC0xKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgncGF0aC50cmF2ZXJzYWwnKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKClcbiAgICAgICAgZWxcbiAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBgJHtsfSAke2x9YClcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBsKVxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICAgIH0pXG4gICAgICAudHJhbnNpdGlvbignZGFzaGFycmF5JylcbiAgICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uKVxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKVxuICAgICAgICB2YXIgdHdpY2VMZW5ndGggPSBsZW5ndGggKiAyXG4gICAgICAgIHZhciBsZW5ndGhUb01vdmUgPSAwXG4gICAgICAgIGlmIChzb3VyY2UgIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGQudGFyZ2V0LmlkID09PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoIC0gbGVuZ3RoVG9Nb3ZlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGVuZ3RoVG9Nb3ZlXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIGVsLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIG51bGwpXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgfSlcbiAgfVxuXG4gIHRyYXZlcnNlRWRnZXMgKHNlbGVjdGlvbiwgb3B0aW9ucywgc291cmNlKSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBrZWVwU3Ryb2tlOiB0cnVlLFxuICAgICAgcmV2ZXJzZTogZmFsc2VcbiAgICB9LCB0aGlzLmdldFN0eWxlT3B0aW9ucygpLCBvcHRpb25zKVxuXG4gICAgc2VsZWN0aW9uLmNhbGwodGhpcy50cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UpXG4gICAgaWYgKG9wdGlvbnMua2VlcFN0cm9rZSkge1xuICAgICAgdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgICAgIC50cmFuc2l0aW9uKCd1cGRhdGUnKVxuICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gIH1cblxuICBnZXROb2RlIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE5vZGUobm9kZSkpXG4gICAgKVxuICB9XG5cbiAgZ2V0RWRnZSAoZWRnZSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRFZGdlKGVkZ2UpKVxuICAgIClcbiAgfVxuXG4gIC8vIHRlbXBvcmFsIGhpZ2hsaWdodFxuXG4gIGhpZ2hsaWdodE5vZGUgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0Tm9kZShcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0Tm9kZShub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGhpZ2hsaWdodEVkZ2UgKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEVkZ2UoZWRnZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICBoaWdobGlnaHRJbmNpZGVudEVkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNpZGVudEVkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaGlnaGxpZ2h0T3V0Z29pbmdFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGhpZ2hsaWdodEluY29taW5nRWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY29taW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBnaXZlbiBhIG5vZGVcblxuICB0cmF2ZXJzZU91dGdvaW5nRWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgdHJhdmVyc2VJbmNvbWluZ0VkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jb21pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIHRyYXZlcnNlSW5jaWRlbnRFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY2lkZW50RWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBiZXR3ZWVuIHR3byBub2Rlc1xuXG4gIHRyYXZlcnNlRWRnZXNCZXR3ZWVuIChlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KFxuICAgICAgICB0aGlzLmdyYXBoLmdldEVkZ2VzQmV0d2VlbihlZGdlKVxuICAgICAgKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpLFxuICAgICAgZWRnZS5zb3VyY2VcbiAgICApXG4gIH1cblxuICB0cmF2ZXJzZUFsbEVkZ2VzQmV0d2VlbiAoZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdChcbiAgICAgICAgdGhpcy5ncmFwaC5nZXRBbGxFZGdlc0JldHdlZW4oZWRnZSlcbiAgICAgICksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGVkZ2Uuc291cmNlXG4gICAgKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IGxjZyBmcm9tICdjb21wdXRlLWxjZydcblxudmFyIHJhbmQgPSBsY2coMSlcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBuID0gcmFuZCgpXG4gICAgdmFyIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcihuICogMjYpICsgOTcpXG4gICAgcmV0dXJuIGxldHRlciArIG4udG9TdHJpbmcoMTYpLnN1YnN0cigyKVxuICB9LFxuXG4gIHRyYW5zZm9ybTogZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgc3RyID0gYGBcbiAgICBpZiAoJ3RyYW5zbGF0ZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgdHJhbnNsYXRlKCR7by50cmFuc2xhdGUueH0sICR7by50cmFuc2xhdGUueX0pYFxuICAgIH1cbiAgICBpZiAoJ3JvdGF0ZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgcm90YXRlKCR7by5yb3RhdGV9KWBcbiAgICB9XG4gICAgaWYgKCdzY2FsZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgc2NhbGUoJHtvLnNjYWxlfSlgXG4gICAgfVxuICAgIHJldHVybiBzdHJcbiAgfSxcblxuICB0cmFuc2l0aW9uOiBmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnRyYW5zaXRpb24oJ2xheW91dCcpXG4gICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgLmVhc2UoJ2xpbmVhcicpXG4gIH0sXG5cbiAgY29uZGl0aW9uYWxUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZWwsIGNvbmRpdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb24oZWwpXG4gICAgfVxuICAgIHJldHVybiBlbFxuICB9LFxuXG4gIG5zOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuICdncmV1bGVyLScgKyBzdHJcbiAgfVxufVxuIl19
