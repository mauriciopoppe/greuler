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

var _const = require('./const');

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
  }, {
    key: 'defaultOptions',

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

      //this.layout.start(15, 15, 15);
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
      this.root.enter.append('svg:defs').append('svg:marker').attr('id', this.markerId).attr('viewBox', '0 -5 10 10').attr('refX', 20).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto').append('svg:path').attr('d', 'M0,-4L10,0L0,4L2,0').attr('stroke-width', '0px').attr('fill-opacity', 1).attr('fill', '#777');

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

},{"./Graph":4,"./const":6,"./elements/edge":7,"./elements/node":8,"./selector/GreulerDefaultTransition":15,"extend":2}],4:[function(require,module,exports){
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

/**
 *
 * 
 * @class Graph
 */

var Graph = (function () {
  function Graph(owner, data) {
    _classCallCheck(this, Graph);

    this.owner = owner;
    this.nodes = data.nodes;
    this.edges = data.links;
  }

  _createClass(Graph, [{
    key: 'addNode',

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
  }, {
    key: 'getNode',

    /**
     * Gets a node by id
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object|undefined}
     */
    value: function getNode(node) {
      return this.getNodesByFn(function (v) {
        return v.id === node.id;
      })[0];
    }
  }, {
    key: 'getNodesByFn',

    /**
     * Returns all the nodes that satisfy the parameter `fn`,
     * alias for `this.nodes.filter(fn)`
     *
     * @param {Function} fn
     * @returns {Object[]}
     */
    value: function getNodesByFn(fn) {
      return this.nodes.filter(fn);
    }
  }, {
    key: 'getAdjacentNodes',

    /**
     * Gets all the adjacent nodes of the node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
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
  }, {
    key: 'getSuccessorNodes',

    /**
     * Gets all the successor nodes of the node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
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
  }, {
    key: 'getPredecessorNodes',

    /**
     * Gets all the predecessor nodes of the node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
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
  }, {
    key: 'removeNode',

    /**
     * Removes a node identified by `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     */
    value: function removeNode(node) {
      this.removeNodesByFn(function (v) {
        return v.id === node.id;
      });
    }
  }, {
    key: 'removeNodes',

    /**
     * Removes all the nodes stored in `nodes`,
     * each object must have the property `id`
     *
     * @param {Object[]} nodes
     */
    value: function removeNodes(nodes) {
      // TODO: improve n^2 removal
      this.removeNodesByFn(function (v) {
        return includes(nodes, v.id);
      });
    }
  }, {
    key: 'removeNodesByFn',

    /**
     * Removes all the nodes that satisfy the predicate
     * `fn`
     *
     * @param {Function} fn
     */
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
  }, {
    key: 'addEdge',

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
  }, {
    key: 'getEdge',

    /**
     * Gets an edge by `id`
     *
     * @param {Object} edge
     * @param {number|string} edge.id The id of the edge
     * @returns {Object}
     */
    value: function getEdge(edge) {
      return this.getEdgesByFn(function (e) {
        return e.id === edge.id;
      })[0];
    }
  }, {
    key: 'getEdgesBetween',

    /**
     * Gets all the directed edges from the node whose id is
     * `options.source` and to the node whose id is `options.target`
     *
     * @param {Object} options
     * @param {number|string} options.source The id of the source node
     * @param {number|string} options.target The id of the target node
     * @returns {Object[]}
     */
    value: function getEdgesBetween(options) {
      return this.getEdgesByFn(function (e) {
        return e.source.id === options.source && e.target.id === options.target;
      });
    }
  }, {
    key: 'getAllEdgesBetween',

    /**
     * Gets all the edges from `options.source` to `options.target`
     * or `options.target` to `options.source`
     *
     * @param {Object} options
     * @param {number|string} options.source The id of the source node
     * @param {number|string} options.target The id of the target node
     * @returns {Object[]}
     */
    value: function getAllEdgesBetween(options) {
      return this.getEdgesByFn(function (e) {
        return e.source.id === options.source && e.target.id === options.target || e.source.id === options.target && e.target.id === options.source;
      });
    }
  }, {
    key: 'removeEdge',

    /**
     * Removes an edge identified by id
     *
     * @param {Object} edge
     * @param {number|string} edge.id The id of the edge
     */
    value: function removeEdge(edge) {
      this.removeEdgesByFn(function (e) {
        return e.id === edge.id;
      });
    }
  }, {
    key: 'removeEdges',

    /**
     * Removes all the edges stored in `edges`,
     * each object must have the property `id`
     *
     * @param {Object[]} edges
     */
    value: function removeEdges(edges) {
      // TODO: improve n^2 removal
      this.removeEdgesByFn(function (e) {
        return includes(edges, e.id);
      });
    }
  }, {
    key: 'removeEdgesByFn',

    /**
     * Removes all the edges that return true for the predicate
     * `fn`
     *
     * @param {function} fn
     */
    value: function removeEdgesByFn(fn) {
      var i;
      for (i = 0; i < this.edges.length; i += 1) {
        if (fn(this.edges[i], i)) {
          this.edges.splice(i, 1);
          i -= 1;
        }
      }
    }
  }, {
    key: 'getEdgesByFn',

    /**
     * Gets all the edges that return true for the predicate `fn`
     *
     * @param {Function} fn
     * @returns {Object[]}
     */
    value: function getEdgesByFn(fn) {
      return this.edges.filter(fn);
    }
  }, {
    key: 'getOutgoingEdges',

    /**
     * Gets all the outgoing edges of the node `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
    value: function getOutgoingEdges(node) {
      return this.getEdgesByFn(function (e) {
        return e.source.id === node.id;
      });
    }
  }, {
    key: 'getIncomingEdges',

    /**
     * Gets all the incoming edges of the node `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
    value: function getIncomingEdges(node) {
      return this.getEdgesByFn(function (e) {
        return e.target.id === node.id;
      });
    }
  }, {
    key: 'getIncidentEdges',

    /**
     * Gets all the incident edges of the node `id`
     *
     * @param {Object} node
     * @param {number|string} node.id The id of the node
     * @returns {Object[]}
     */
    value: function getIncidentEdges(node) {
      return this.getOutgoingEdges(node).concat(this.getIncomingEdges(node));
    }
  }, {
    key: 'add',

    /**
     * Facade to add nodes/edges
     *
     * NOTE: the function receives any number of parameters
     */
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
  }, {
    key: 'random',

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

  _createClass(Vector, null, [{
    key: 'neg',

    // unary

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
  }, {
    key: 'add',

    // binary

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

var _const = require('../const');

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _Vector = require('../Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var d3 = window.d3;

exports['default'] = function () {

  var owner;

  function selfLoop(u, margin) {
    var adjacent = owner.graph.getAdjacentNodes(u);
    var dir = new _Vector2['default'](0, 0);
    for (var i = 0; i < adjacent.length; i += 1) {
      var v = adjacent[i];
      if (u.id !== v.id) {
        dir = _Vector2['default'].unit(_Vector2['default'].add(dir, _Vector2['default'].unit(_Vector2['default'].sub(u, v))));
      }
    }

    // no adjacent vertices
    if (dir.x === 0 && dir.y === 0) {
      dir = _Vector2['default'].unit(new _Vector2['default'](0, -1));
    }

    var k = 0.8;
    var up = _Vector2['default'].add(u, _Vector2['default'].scale(dir, margin * k));
    var mid = _Vector2['default'].mid(u, up);
    var ort = _Vector2['default'].orthogonal(dir);

    var right = _Vector2['default'].add(mid, _Vector2['default'].scale(ort, margin / 2 * k));
    var left = _Vector2['default'].add(mid, _Vector2['default'].scale(ort, -margin / 2 * k));

    return {
      path: [left, up, right],
      dir: ort
    };
  }

  function createPath(d, meta, margin) {
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
      var loop = selfLoop(u, margin * (current.count + 1));
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
        unitInverse: _Vector2['default'].orthogonal(unit)
      });
      innerJoints.push(_Vector2['default'].add(current.mid, _Vector2['default'].scale(current.unitInverse, Math.floor(current.count / 2) * margin * current.direction)));
      d.unit = current.unit;
    }

    current.count += 1;
    current.direction *= -1;
    d.path = [d.source].concat(innerJoints).concat([d.target]);
  }

  var line = d3.svg.line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).tension(1.5).interpolate('bundle');

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
    //.attr('d', function () {
    //  var parent = d3.select(this.parentNode).datum();
    //  return line([parent.source]);
    //});

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

},{"../Vector":5,"../const":6,"../utils":16,"extend":2}],8:[function(require,module,exports){
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

        this.timer = setTimeout(function () {
          self.play(next.value);
        }, delay);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      clearTimeout(this.timer);
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
  /*eslint-disable */
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
  /*eslint-enable */
};

module.exports = exports['default'];

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

var _const = require('../const');

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
  }, {
    key: 'select',

    /**
     * Given a collection of elements returned by the Graph class this methods returns
     * the d3 selection that for all those objects
     *
     * @param {Object[]|Object} els An array of edges/nodes or a single edge/node
     * @return {d3_selection}
     */
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
  }, {
    key: 'innerEdgeSelector',

    /**
     * Selects the path inside the tag <g> that represents an edge
     *
     * @param {d3_selection} selection
     */
    value: function innerEdgeSelector(selection) {
      return selection.selectAll('path.base');
    }
  }, {
    key: 'innerNodeSelector',

    /**
     * Selects the circle inside the tag <g> that represents a node
     *
     * @param {d3_selection} selection
     */
    value: function innerNodeSelector(selection) {
      return selection.selectAll('circle');
    }
  }]);

  return ElementSelector;
})();

exports['default'] = ElementSelector;
module.exports = exports['default'];

},{"../const":6,"../utils":16,"extend":2}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _const = require('../const');

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _Graph2 = require('./Graph');

var _Graph3 = _interopRequireDefault(_Graph2);

var d3 = window.d3;

var HIGHLIGHT = 'highlight';

var GreulerDefaultTransition = (function (_Graph) {
  function GreulerDefaultTransition() {
    _classCallCheck(this, GreulerDefaultTransition);

    _get(Object.getPrototypeOf(GreulerDefaultTransition.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(GreulerDefaultTransition, _Graph);

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
  }, {
    key: 'getNodes',

    /**
     * Gets all the nodes of the graph
     *
     * @returns {d3_selection}
     */
    value: function getNodes() {
      return this.innerNodeSelector(this.select(this.graph.nodes));
    }
  }, {
    key: 'doTemporalHighlightNode',

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
    value: function doTemporalHighlightNode(selection, options) {
      return this.innerNodeSelector(selection).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('r', function (d) {
        return options.r || d.r * 1.5;
      }).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('r', function (d) {
        return d.r;
      });
    }
  }, {
    key: 'doTemporalHighlightEdges',

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
    value: function doTemporalHighlightEdges(selection, options) {
      return this.innerEdgeSelector(selection).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('stroke', options.stroke).transition(HIGHLIGHT).duration(this.getAnimationTime() / 2).attr('stroke', function (d) {
        return d.stroke;
      });
    }
  }, {
    key: 'traverseEdgeWithDirection',

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
    value: function traverseEdgeWithDirection(selection, options) {
      var source = arguments[2] === undefined ? -1 : arguments[2];

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
  }, {
    key: 'highlightNode',

    // temporal highlight

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
  }, {
    key: 'traverseOutgoingEdges',

    // traversal of an edge given a node

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
  }, {
    key: 'traverseEdgesBetween',

    // traversal of an edge between two nodes

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

},{"../const":6,"./Graph":14,"extend":2}],16:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL0RyYXcuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2NvbnN0LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvZWxlbWVudHMvZWRnZS5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9GaXhlZC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wb2x5ZmlsbHMuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbi5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LFFBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtBQUNwQixTQUFHLG9CQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBRyxDQUFDO0tBQ3pEO0FBQ0QsUUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLFNBQUcsaUJBQWUsQ0FBQyxDQUFDLE1BQU0sTUFBRyxDQUFDO0tBQy9CO0FBQ0QsUUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO0FBQ2hCLFNBQUcsZ0JBQWMsQ0FBQyxDQUFDLEtBQUssTUFBRyxDQUFDO0tBQzdCO0FBQ0QsV0FBTyxHQUFHLENBQUM7R0FDWjs7QUFFRCxZQUFVLEVBQUUsb0JBQVUsU0FBUyxFQUFFO0FBQy9CLFdBQU8sU0FBUyxDQUNiLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDcEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUNuQjs7QUFFRCx1QkFBcUIsRUFBRSwrQkFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFO0FBQzlDLFFBQUksU0FBUyxFQUFFO0FBQ2IsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzVCO0FBQ0QsV0FBTyxFQUFFLENBQUM7R0FDWDs7QUFFRCxJQUFFLEVBQUUsWUFBVSxHQUFHLEVBQUU7QUFDakIsV0FBTyxVQUFVLEdBQUcsR0FBRyxDQUFDO0dBQ3pCO0NBQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4qXG4qXHRDT01QVVRFOiBsY2dcbipcbipcbipcdERFU0NSSVBUSU9OOlxuKlx0XHQtIEEgbGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvciAobGNnKS5cbipcbipcbipcdE5PVEVTOlxuKlx0XHRbMV0gQmFzZWQgb24gVy4gUHJlc3MsIGV0IGFsLiwgTnVtZXJpY2FsIFJlY2lwZXMgaW4gQyAoMmQgZWQuIDE5OTIpXG4qXG4qXG4qXHRUT0RPOlxuKlx0XHRbMV1cbipcbipcbipcdExJQ0VOU0U6XG4qXHRcdE1JVFxuKlxuKlx0Q29weXJpZ2h0IChjKSAyMDE0LiByZ2l6ei5cbipcbipcbipcdEFVVEhPUjpcbipcdFx0cmdpenouIGd6dG93bjIyMTZAeWFob28uY29tLiAyMDE0LlxuKlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBWQVJJQUJMRVMgLy9cblxudmFyIE1BU0sgPSAxMjM0NTk4NzYsXG5cdE0gPSAyMTQ3NDgzNjQ3LFxuXHRBID0gMTY4MDc7XG5cblxuLy8gTENHIC8vXG5cbi8qKlxuKiBGVU5DVElPTjogbGNnKCBbc2VlZF0gKVxuKlx0UmV0dXJucyBhIGxpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuIElmIG5vdCBwcm92aWRlZCBhIHNlZWQsIGEgc2VlZCBpcyBnZW5lcmF0ZWQgYmFzZWQgb24gdGhlIGN1cnJlbnQgdGltZS5cbipcbiogQHBhcmFtIHtOdW1iZXJ9IFtzZWVkXSAtIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIHNlZWRcbiogQHJldHVybnMge0Z1bmN0aW9ufSBnZW5lcmF0b3JcbiovXG5mdW5jdGlvbiBsY2coIHZhbCApIHtcblx0dmFyIHNlZWQ7XG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRpZiAoIHR5cGVvZiB2YWwgIT09ICdudW1iZXInIHx8IHZhbCAhPT0gdmFsIHx8IHZhbCAlIDEgIT09IDAgfHwgdmFsIDwgMSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdsY2coKTo6aW52YWxpZCBpbnB1dCBhcmd1bWVudC4gU2VlZCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4nICk7XG5cdFx0fVxuXHRcdHNlZWQgPSB2YWw7XG5cdH0gZWxzZSB7XG5cdFx0c2VlZCA9IERhdGUubm93KCkgJSAxMDAwMDAwMDA7XG5cdH1cblx0LyoqXG5cdCogRlVOQ1RJT046IGxjZyggW05dIClcblx0Klx0TGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cblx0KlxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbTl0gLSBudW1iZXIgb2YgcHNldWRvcmFuZG9tIG51bWJlcnMgdG8gcmV0dXJuXG5cdCogQHJldHVybnMge051bWJlcnxBcnJheX0gcHNldWRvcmFuZG9tIGZsb2F0aW5nLXBvaW50IG51bWJlcihzKSBiZXR3ZWVuIDAgYW5kIDFcblx0Ki9cblx0cmV0dXJuIGZ1bmN0aW9uIGxjZyggTiApIHtcblx0XHR2YXIgYXJyLFxuXHRcdFx0cmFuZDtcblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0c2VlZCA9ICggQSAqIHNlZWQgKSAlIE07XG5cdFx0XHRyYW5kID0gc2VlZCAvIE07XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRyZXR1cm4gcmFuZDtcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgTiAhPT0gJ251bWJlcicgfHwgTiAhPT0gTiB8fCBOJTEgIT09IDAgfHwgTiA8IDEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnbGNnKCk6OmludmFsaWQgaW5wdXQgYXJndW1lbnQuIEFycmF5IGxlbmd0aCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4nICk7XG5cdFx0fVxuXHRcdGFyciA9IG5ldyBBcnJheSggTiApO1xuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IE47IGkrKyApIHtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHNlZWQgPSAoIEEgKiBzZWVkICkgJSBNO1xuXHRcdFx0YXJyWyBpIF0gPSBzZWVkIC8gTTtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHR9XG5cdFx0cmV0dXJuIGFycjtcblx0fTtcbn0gLy8gZW5kIEZVTkNUSU9OIGxjZygpXG5cblxuLy8gRVhQT1JUUyAvL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxjZztcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gd2luZG93LmQzO1xudmFyIGNvbGEgPSB3aW5kb3cuY29sYTtcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IG5vZGUgZnJvbSAnLi9lbGVtZW50cy9ub2RlJztcbmltcG9ydCBlZGdlIGZyb20gJy4vZWxlbWVudHMvZWRnZSc7XG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi9jb25zdCc7XG5pbXBvcnQgR3JhcGhNYW5hZ2VyIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbiBmcm9tICcuL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICBjb25zdHJ1Y3RvcihpZCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmV2ZW50cyA9IGQzLmRpc3BhdGNoKCdsYXlvdXQnLCAnZmlyc3RMYXlvdXRFbmQnKTtcblxuICAgIHRoaXMubWFya2VySWQgPSAnbWFya2VyLScgKyBpZDtcblxuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAvLyBncmFwaCBoYW5kbGVzIHRoZSBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgZHJhd2VyXG4gICAgdGhpcy5jcmVhdGVHcmFwaCgpO1xuXG4gICAgLy8gc2VsZWN0b3IgYW5pbWF0ZXMgdGhlIG5vZGVzL2VkZ2VzXG4gICAgdGhpcy5zZWxlY3RvciA9IG5ldyBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24odGhpcyk7XG5cbiAgICAvLyBzdWItZWxlbWVudHMgdGhhdCBkcmF3IHN0dWZmXG4gICAgdGhpcy5ub2RlRHJhd2VyID0gbm9kZSgpLm93bmVyKHRoaXMpO1xuICAgIHRoaXMuZWRnZURyYXdlciA9IGVkZ2UoKS5vd25lcih0aGlzKTtcblxuICAgIC8vIGNvbGFcbiAgICB0aGlzLmxheW91dCA9IGNvbGEuZDNhZGFwdG9yKCk7XG5cbiAgICB0aGlzLmxheW91dC5vbigndGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYudGljaygpO1xuICAgIH0pO1xuXG4gICAgdmFyIGZpcnN0RW5kID0gdHJ1ZTtcbiAgICB0aGlzLmxheW91dC5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGZpcnN0RW5kKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzLmZpcnN0TGF5b3V0RW5kKCk7XG4gICAgICAgIGZpcnN0RW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVHcmFwaCgpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMub3B0aW9ucy5kYXRhO1xuICAgIHZhciBub2RlcyA9IGRhdGEubm9kZXM7XG4gICAgdmFyIGxpbmtzID0gZGF0YS5saW5rcztcblxuICAgIC8vIGVtcHR5IGFuZCByZS1hZGRcbiAgICBkYXRhLm5vZGVzID0gW107XG4gICAgZGF0YS5saW5rcyA9IFtdO1xuXG4gICAgdGhpcy5ncmFwaCA9IG5ldyBHcmFwaE1hbmFnZXIodGhpcywgZGF0YSk7XG4gICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdGhpcy5ncmFwaC5hZGROb2RlKG5vZGUpO1xuICAgIH0sIHRoaXMpO1xuICAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIHRoaXMuZ3JhcGguYWRkRWRnZShlZGdlKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKlxuICAgKiBvcHRpb25zXG4gICAqICAgLSB0YXJnZXQge3N0cmluZ30gc2VsZWN0b3IgdG8gdGhlIGVsZW1lbnQgdG8gaG9sZCB0aGUgZ3JhcGhcbiAgICogICAtIHdpZHRoIHtudW1iZXJ9XG4gICAqICAgLSBoZWlnaHQge251bWJlcn1cbiAgICogICAtIGxhYmVscz10cnVlIHtib29sZWFufSBGYWxzZSB0byBoaWRlIHRoZSB2ZXJ0ZXggbGFiZWxzXG4gICAqICAgLSBkaXJlY3RlZD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBnaXZlIGFuIG9yaWVudGF0aW9uIHRvIHRoZSBlZGdlc1xuICAgKiAgIGhhdmUgYW4gZWRnZVxuICAgKiAgIC0gZGF0YSB7T2JqZWN0fVxuICAgKiAgICAgLSBsaW5rRGlzdGFuY2U9OTAge251bWJlcn0gRm9yY2VkIG1pbiBkaXN0YW5jZSBiZXR3ZWVuIHZlcnRpY2VzIHRoYXRcbiAgICogICAgIC0gY29uc3RyYWludHMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgLSBncm91cHMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgLSBub2RlcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAgIC0gcj0xMCB7bnVtYmVyfSBub2RlIHJhZGl1c1xuICAgKiAgICAgLSBsaW5rcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAgIC0gZGlyZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IHRydWUgdG8gZ2l2ZSBhbiBvcmllbnRhdGlvbiB0byB0aGlzIGVkZ2VcbiAgICogICAgICAgLSB3ZWlnaHQ9XCJcIiB7c3RyaW5nfSBMYWJlbCBvZiB0aGUgZWRnZSAoY2FuIGJlIHRoZSB3ZWlnaHQpXG4gICAqXG4gICAqL1xuICBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgLy8gZ3JhcGggZGVmYXVsdHNcbiAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIHdpZHRoOiA3MDAsXG4gICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgIGFuaW1hdGlvblRpbWU6IDEwMDAsXG4gICAgICBsYWJlbHM6IHRydWUsXG4gICAgICBkaXJlY3RlZDogZmFsc2VcbiAgICB9LCBvcHRpb25zKTtcblxuICAgIHRoaXMub3B0aW9ucy5kYXRhID0gZXh0ZW5kKHtcbiAgICAgIG5vZGVzOiBbXSxcbiAgICAgIGxpbmtzOiBbXSxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBjb25zdHJhaW50czogW10sXG4gICAgICBhdm9pZE92ZXJsYXBzOiB0cnVlLFxuICAgICAgc2l6ZTogW29wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0XSxcbiAgICAgIGxpbmtEaXN0YW5jZTogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubGlua0Rpc3RhbmNlIHx8IDgwO1xuICAgICAgfVxuICAgIH0sIHRoaXMub3B0aW9ucy5kYXRhKTtcbiAgfVxuXG4gIGluaXRMYXlvdXQodXBkYXRlT3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICh1cGRhdGVPcHRpb25zLnNraXBMYXlvdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhzZWxmLm9wdGlvbnMuZGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgdmFyIHYgPSBzZWxmLm9wdGlvbnMuZGF0YVtrXTtcbiAgICAgIHNlbGYubGF5b3V0W2tdKHYpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgLy90aGlzLmxheW91dC5zdGFydCgxNSwgMTUsIDE1KTtcbiAgICB0aGlzLmxheW91dC5zdGFydCgpO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICB0aGlzLmVkZ2VHcm91cC5jYWxsKHRoaXMuZWRnZURyYXdlcik7XG4gICAgdGhpcy5ub2RlR3JvdXAuY2FsbCh0aGlzLm5vZGVEcmF3ZXIpO1xuICB9XG5cbiAgdXBkYXRlKHVwZGF0ZU9wdGlvbnMpIHtcbiAgICB1cGRhdGVPcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIHNraXBMYXlvdXQ6IGZhbHNlXG4gICAgfSwgdXBkYXRlT3B0aW9ucyk7XG5cbiAgICB0aGlzLmluaXRMYXlvdXQodXBkYXRlT3B0aW9ucyk7XG4gICAgdGhpcy5idWlsZCh1cGRhdGVPcHRpb25zKTtcblxuICAgIC8vIHVwZGF0ZSBpbm5lciBub2Rlcy9lZGdlcyBpZiBsYXlvdXQudGljayB3YXNuJ3QgcnVuXG4gICAgaWYgKHVwZGF0ZU9wdGlvbnMuc2tpcExheW91dCkge1xuICAgICAgdGhpcy50aWNrKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICB0aGlzLnJvb3QgPSBkMy5zZWxlY3QodGhpcy5vcHRpb25zLnRhcmdldClcbiAgICAgIC5zZWxlY3RBbGwoJ3N2Zy5ncmV1bGVyJylcbiAgICAgIC5kYXRhKFt0aGlzLm9wdGlvbnNdKTtcblxuICAgIC8vIGVudGVyXG4gICAgdGhpcy5yb290LmVudGVyID0gdGhpcy5yb290LmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZ3JldWxlcicpO1xuXG4gICAgLy8gbWFya2VyIGRlZlxuICAgIHRoaXMucm9vdC5lbnRlclxuICAgICAgLmFwcGVuZCgnc3ZnOmRlZnMnKVxuICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXG4gICAgICAuYXR0cignaWQnLCB0aGlzLm1hcmtlcklkKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAtNSAxMCAxMCcpXG4gICAgICAuYXR0cigncmVmWCcsIDIwKVxuICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgNSlcbiAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCA1KVxuICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcbiAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgIC5hdHRyKCdkJywgJ00wLC00TDEwLDBMMCw0TDIsMCcpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgJzBweCcpXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM3NzcnKTtcblxuICAgIC8vIHVwZGF0ZVxuICAgIHRoaXMucm9vdFxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5vcHRpb25zLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpO1xuXG4gICAgLy8gd3JhcHBlciBmb3IgdGhlIGVkZ2VzXG4gICAgdGhpcy5lZGdlR3JvdXAgPSB0aGlzLnJvb3RcbiAgICAgIC5zZWxlY3RBbGwoJ2cuZWRnZXMnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkLmRhdGFdOyB9KTtcbiAgICB0aGlzLmVkZ2VHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlcycpO1xuXG4gICAgLy8gd3JhcHBlciBmb3IgdGhlIG5vZGVzXG4gICAgdGhpcy5ub2RlR3JvdXAgPSB0aGlzLnJvb3RcbiAgICAgIC5zZWxlY3RBbGwoJ2cubm9kZXMnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkLmRhdGFdOyB9KTtcbiAgICB0aGlzLm5vZGVHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlcycpO1xuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi9jb25zdCc7XG5cbmNvbnN0IE5PREVfREVGQVVMVF9PUFRJT05TID0ge1xuICByOiAxMCxcbiAgZmlsbDogJyMyOTgwQjknXG59O1xuXG5jb25zdCBFREdFX0RFRkFVTFRfT1BUSU9OUyA9IHtcbiAgc3Ryb2tlOiBjb2xvcnMuTElHSFRfR1JBWVxufTtcblxuZnVuY3Rpb24gaW5jbHVkZXMoYXJyLCBpZCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChhcnJbaV0uaWQgPT09IGlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKlxuICogXG4gKiBAY2xhc3MgR3JhcGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGgge1xuICBjb25zdHJ1Y3Rvcihvd25lciwgZGF0YSkge1xuICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB0aGlzLm5vZGVzID0gZGF0YS5ub2RlcztcbiAgICB0aGlzLmVkZ2VzID0gZGF0YS5saW5rcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZ3JhcGgsIGVhY2ggb2YgdGhlIGFyZ3VtZW50cyBtdXN0XG4gICAqIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIGlkIHtOdW1iZXJ8c3RyaW5nfVxuICAgKlxuICAgKiBPcHRpb25hbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0geCB7bnVtYmVyfSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgbm9kZSBpbiB0aGUgZ3JhcGggKG9ubHkgaWYgZml4ZWQgPSB0cnVlKVxuICAgKiAtIHkge251bWJlcn0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIG5vZGUgaW4gdGhlIGdyYXBoIChvbmx5IGlmIGZpeGVkID0gdHJ1ZSlcbiAgICogLSBmaXhlZCB7Ym9vbGVhbn0gYHRydWVgIHRvIG1ha2UgdGhpcyBub2RlIG5vdCB0byBwYXJ0aWNpcGF0ZSBpbiB0aGUgbGF5b3V0IHByb2Nlc3NcbiAgICogLSBmaWxsIHtzdHJpbmd9IFRoZSBmaWxsIG9mIHRoZSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIHRoZSBub2RlXG4gICAqIC0gciB7bnVtYmVyfSBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIHRoZSBub2RlXG4gICAqIC0gbGFiZWwge3N0cmluZ30gVGhlIHRleHQgaW5zaWRlIHRoZSBub2RlIChpZiBpdCdzIG5vdCBwcmVzZW50IGl0J3MgZXF1YWwgdG8gdGhlIGBpZGApXG4gICAqIC0gdG9wUmlnaHRMYWJlbCB7c3RyaW5nXSB0aGUgdGV4dCBzaG93biBvbiB0aGUgdG9wIHJpZ2h0IHNpZGUgb2YgdGhlIG5vZGUsIHVzZWZ1bFxuICAgKiB0byByZXByZXNlbnQgYWRkaXRpb25hbCBhbm5vdGF0aW9uc1xuICAgKlxuICAgKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqL1xuICBhZGROb2RlKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXROb2RlKGNvbmZpZykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25vZGUgYWxyZWFkeSBpbiBzdG9yZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5ub2Rlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmROb2RlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbm9kZSBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgZ2V0Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeUZuKHYgPT4gdi5pZCA9PT0gbm9kZS5pZClbMF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIG5vZGVzIHRoYXQgc2F0aXNmeSB0aGUgcGFyYW1ldGVyIGBmbmAsXG4gICAqIGFsaWFzIGZvciBgdGhpcy5ub2Rlcy5maWx0ZXIoZm4pYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXROb2Rlc0J5Rm4oZm4pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIoZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBhZGphY2VudCBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRBZGphY2VudE5vZGVzKG5vZGUpIHtcbiAgICB2YXIgYWRqYWNlbnROb2RlcyA9IFtdO1xuICAgIHZhciB0YWtlbiA9IHt9O1xuICAgIHZhciBuZXh0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldO1xuICAgICAgbmV4dCA9IG51bGw7XG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0O1xuICAgICAgfSBlbHNlIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWU7XG4gICAgICAgIGFkamFjZW50Tm9kZXMucHVzaChuZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRqYWNlbnROb2RlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgc3VjY2Vzc29yIG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldFN1Y2Nlc3Nvck5vZGVzKG5vZGUpIHtcbiAgICB2YXIgc3VjY2Vzc29yID0gW107XG4gICAgdmFyIHRha2VuID0ge307XG4gICAgdmFyIG5leHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV07XG4gICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIGlmIChlZGdlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS50YXJnZXQ7XG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlO1xuICAgICAgICBzdWNjZXNzb3IucHVzaChuZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBwcmVkZWNlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRQcmVkZWNlc3Nvck5vZGVzKG5vZGUpIHtcbiAgICB2YXIgcHJlZGVjZXNzb3IgPSBbXTtcbiAgICB2YXIgdGFrZW4gPSB7fTtcbiAgICB2YXIgbmV4dDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXTtcbiAgICAgIG5leHQgPSBudWxsO1xuICAgICAgaWYgKGVkZ2UudGFyZ2V0LmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnNvdXJjZTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWU7XG4gICAgICAgIHByZWRlY2Vzc29yLnB1c2gobmV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqL1xuICByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICB0aGlzLnJlbW92ZU5vZGVzQnlGbihmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYuaWQgPT09IG5vZGUuaWQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIG5vZGVzIHN0b3JlZCBpbiBgbm9kZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gbm9kZXNcbiAgICovXG4gIHJlbW92ZU5vZGVzKG5vZGVzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlTm9kZXNCeUZuKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMobm9kZXMsIHYuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHByZWRpY2F0ZVxuICAgKiBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuICByZW1vdmVOb2Rlc0J5Rm4oZm4pIHtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGZuKHRoaXMubm9kZXNbaV0sIGkpKSB7XG4gICAgICAgIC8vIHJlbW92ZSBub2Rlc1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAvLyByZW1vdmUgaW5jaWRlbnQgZWRnZXNcbiAgICAgICAgdGhpcy5yZW1vdmVFZGdlcyhcbiAgICAgICAgICB0aGlzLmdldEluY2lkZW50RWRnZXMobm9kZVswXSlcbiAgICAgICAgKTtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGVkZ2UgdG8gdGhlIGdyYXBoLCBlYWNoIG9mIHRoZSBhcmd1bWVudHMgbXVzdFxuICAgKiBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXNcbiAgICpcbiAgICogUmVxdWlyZWQgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIHNvdXJjZSB7bnVtYmVyfE9iamVjdH0gVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZSBvciB0aGUgc291cmNlIG5vZGUgaXRzZWxmXG4gICAqIC0gdGFyZ2V0IHtudW1iZXJ8T2JqZWN0fSBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlIG9yIHRoZSB0YXJnZXQgbm9kZSBpdHNlbGZcbiAgICpcbiAgICogT3B0aW9uYWwgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIGlkIHtzdHJpbmd8T2JqZWN0fSBJZiBhbiBpZCBpcyBub3QgcHJvdmlkZWQgYW4gYXV0byBnZW5lcmF0ZWQgc3RyaW5nIHdpbGwgYmUgYXNzaWduZWRcbiAgICogdG8gdGhpcyBlZGdlXG4gICAqIC0gc3Ryb2tlIHtzdHJpbmd9IFRoZSBzdHJva2Ugb2YgdGhlIHBhdGggdGhhdCByZXByZXNlbnRzIHRoZSBlZGdlXG4gICAqIC0gd2VpZ2h0IHtzdHJpbmd9IFRoZSB3ZWlnaHQgb2YgdGhlIGVkZ2VcbiAgICogLSBkaXJlY3RlZCB7Ym9vbGVhbn0gSWYgc2V0IHRvIHRydWUgYW4gYWRkaXRpb25hbCBhcnJvdyBpcyBhZGRlZCBhdCB0aGUgZW5kIG9mIHRoZSBlZGdlXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBhcmd1bWVudHNcbiAgICovXG4gIGFkZEVkZ2UoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KCdzb3VyY2UnKSB8fCAhY29uZmlnLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcigndGhlIGVkZ2UgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIGBzb3VyY2VgIGFuZCBgdGFyZ2V0YCcpO1xuICAgICAgfVxuICAgICAgdmFyIHNvdXJjZSA9IGNvbmZpZy5zb3VyY2U7XG4gICAgICB2YXIgdGFyZ2V0ID0gY29uZmlnLnRhcmdldDtcblxuICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHNvdXJjZSA9IHRoaXMuZ2V0Tm9kZSh7IGlkOiBjb25maWcuc291cmNlIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXROb2RlKHsgaWQ6IGNvbmZpZy50YXJnZXQgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc291cmNlIHx8ICF0YXJnZXQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25ldyBlZGdlIGRvZXMgbm90IGpvaW4gZXhpc3RpbmcgdmVydGljZXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbmZpZy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICBjb25maWcudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgdGhpcy5lZGdlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmRFZGdlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIGVkZ2UgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWRnZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVkZ2UuaWQgVGhlIGlkIG9mIHRoZSBlZGdlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBnZXRFZGdlKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZSA9PiBlLmlkID09PSBlZGdlLmlkKVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZGlyZWN0ZWQgZWRnZXMgZnJvbSB0aGUgbm9kZSB3aG9zZSBpZCBpc1xuICAgKiBgb3B0aW9ucy5zb3VyY2VgIGFuZCB0byB0aGUgbm9kZSB3aG9zZSBpZCBpcyBgb3B0aW9ucy50YXJnZXRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy5zb3VyY2UgVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMudGFyZ2V0IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0RWRnZXNCZXR3ZWVuKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy5zb3VyY2UgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMudGFyZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyBmcm9tIGBvcHRpb25zLnNvdXJjZWAgdG8gYG9wdGlvbnMudGFyZ2V0YFxuICAgKiBvciBgb3B0aW9ucy50YXJnZXRgIHRvIGBvcHRpb25zLnNvdXJjZWBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnNvdXJjZSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy50YXJnZXQgVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRBbGxFZGdlc0JldHdlZW4ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIChlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy5zb3VyY2UgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMudGFyZ2V0KSB8fFxuICAgICAgICAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMudGFyZ2V0ICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnNvdXJjZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBlZGdlIGlkZW50aWZpZWQgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKi9cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgdGhpcy5yZW1vdmVFZGdlc0J5Rm4oZSA9PiBlLmlkID09PSBlZGdlLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgZWRnZXMgc3RvcmVkIGluIGBlZGdlc2AsXG4gICAqIGVhY2ggb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBlZGdlc1xuICAgKi9cbiAgcmVtb3ZlRWRnZXMoZWRnZXMpIHtcbiAgICAvLyBUT0RPOiBpbXByb3ZlIG5eMiByZW1vdmFsXG4gICAgdGhpcy5yZW1vdmVFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBpbmNsdWRlcyhlZGdlcywgZS5pZCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlRWRnZXNCeUZuKGZuKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLmVkZ2VzW2ldLCBpKSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgdGhhdCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHByZWRpY2F0ZSBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQnlGbihmbikge1xuICAgIHJldHVybiB0aGlzLmVkZ2VzLmZpbHRlcihmbik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIG91dGdvaW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRPdXRnb2luZ0VkZ2VzKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oKGUpID0+IGUuc291cmNlLmlkID09PSBub2RlLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jb21pbmcgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY29taW5nRWRnZXMobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbigoZSkgPT4gZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBpbmNpZGVudCBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3V0Z29pbmdFZGdlcyhub2RlKVxuICAgICAgLmNvbmNhdCh0aGlzLmdldEluY29taW5nRWRnZXMobm9kZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZhY2FkZSB0byBhZGQgbm9kZXMvZWRnZXNcbiAgICpcbiAgICogTk9URTogdGhlIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgcGFyYW1ldGVyc1xuICAgKi9cbiAgYWRkKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWwgPSBhcmd1bWVudHNbaV07XG4gICAgICAvLyBhc3N1bWUgdGhhdCBlZGdlcyBoYXZlIGEgc291cmNlL3RhcmdldCBwYXJhbWV0ZXJcbiAgICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgJiYgZWwuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XG4gICAgICAgIHRoaXMuYWRkRWRnZShlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZE5vZGUoZWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmROb2RlRGVmYXVsdHModikge1xuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgdi5pZCA9IHV0aWwuaWQoKTtcbiAgICB9XG5cbiAgICB2ID0gZXh0ZW5kKFxuICAgICAge30sXG4gICAgICAvLyBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICBOT0RFX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIC8vIGluc3RhbmNlIGRlZmF1bHRzXG4gICAgICB0aGlzLm9wdGlvbnMubm9kZURlZmF1bHRzLFxuICAgICAgLy8gbm9kZVxuICAgICAgdlxuICAgICk7XG5cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykpIHtcbiAgICAgIHYud2lkdGggPSAyICogdi5yO1xuICAgIH1cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ2hlaWdodCcpKSB7XG4gICAgICB2LmhlaWdodCA9IDIgKiB2LnI7XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgc3RhdGljIGFwcGVuZEVkZ2VEZWZhdWx0cyhlKSB7XG4gICAgaWYgKCFlLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICBlLmlkID0gdXRpbC5pZCgpO1xuICAgIH1cbiAgICBlID0gZXh0ZW5kKFxuICAgICAge30sXG4gICAgICAvLyBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICBFREdFX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIC8vIGluc3RhbmNlIGRlZmF1bHRzXG4gICAgICB0aGlzLm9wdGlvbnMuZWRnZURlZmF1bHRzLFxuICAgICAgLy8gZWRnZVxuICAgICAgZVxuICAgICk7XG4gICAgcmV0dXJuIGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHJhbmRvbSBncmFwaCB3aXRoIHRoZSBmb2xsb3dpbmcgZGVmYXVsdHMgb3B0aW9ucyBvdmVycmlkZGVuIGJ5IGBvcHRpb25zYDpcbiAgICpcbiAgICogLSBvcHRpb25zLm9yZGVyPTEwIHtudW1iZXJ9IFRoZSBudW1iZXIgb2Ygbm9kZXMgaW4gdGhlIGdyYXBoXG4gICAqIC0gb3B0aW9ucy5zaXplPTE1IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZWRnZXMgaW4gdGhlIGdyYXBoXG4gICAqIC0gb3B0aW9ucy5jb25uZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gbWFrZSB0aGUgZ3JhcGggY29ubmVjdGVkLFxuICAgKiBpdCdzIGd1YXJhbnRlZWQgdG8gaGF2ZSBhdCBsZWFzdCBgb3B0aW9ucy5vcmRlciAtIDFgIGVkZ2VzXG4gICAqIC0gb3B0aW9ucy5tdWx0aUdyYXBoPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBwYXJhbGxlbCBlZGdlc1xuICAgKiAtIG9wdGlvbnMucHNldWRvR3JhcGg9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIGxvb3AgZWRnZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge3tub2RlczogQXJyYXksIGxpbmtzOiBBcnJheX19XG4gICAqL1xuICBzdGF0aWMgcmFuZG9tKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIG9yZGVyOiAxMCxcbiAgICAgIHNpemU6IDE1LFxuICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgIG11bHRpR3JhcGg6IGZhbHNlLFxuICAgICAgcHNldWRvR3JhcGg6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICB2YXIgaSwgdSwgdjtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgYWRqYWNlbmN5TGlzdCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLm9yZGVyOyBpICs9IDEpIHtcbiAgICAgIGFkamFjZW5jeUxpc3RbaV0gPSBbXTtcbiAgICAgIG5vZGVzLnB1c2goeyBpZDogaSB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQodSwgdikge1xuICAgICAgYWRqYWNlbmN5TGlzdFt1XVt2XSA9IGFkamFjZW5jeUxpc3Rbdl1bdV0gPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBlZGdlcyA9IFtdO1xuICAgIGkgPSAwO1xuXG4gICAgaWYgKG9wdGlvbnMuY29ubmVjdGVkKSB7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICAgIHYgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcbiAgICAgICAgYWRkKGksIHYpO1xuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IGksXG4gICAgICAgICAgdGFyZ2V0OiB2XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaSAtPSAxO1xuICAgIH1cblxuICAgIGZvciAoOyBpIDwgb3B0aW9ucy5zaXplOyBpICs9IDEpIHtcbiAgICAgIHUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm9yZGVyKTtcbiAgICAgIHYgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm9yZGVyKTtcblxuICAgICAgaWYgKHUgPT09IHYgJiYgIW9wdGlvbnMucHNldWRvR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfSBlbHNlIGlmIChhZGphY2VuY3lMaXN0W3VdW3ZdICYmICFvcHRpb25zLm11bHRpR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKHUsIHYpO1xuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IHUsXG4gICAgICAgICAgdGFyZ2V0OiB2XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBub2Rlczogbm9kZXMsXG4gICAgICBsaW5rczogZWRnZXNcbiAgICB9O1xuICB9XG59XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVmVjdG9yIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIC8vIHVuYXJ5XG5cbiAgc3RhdGljIG5lZyhhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoLWEueCwgLWEueSk7XG4gIH1cblxuICBzdGF0aWMgbGVuKGEpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFZlY3Rvci5sZW5TcShhKSk7XG4gIH1cblxuICBzdGF0aWMgbGVuU3EoYSkge1xuICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnk7XG4gIH1cblxuICBzdGF0aWMgdW5pdChhKSB7XG4gICAgaWYgKGEueCA9PT0gMCAmJiBhLnkgPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCd0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgaXMgMCcpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW4oYSk7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54IC8gbGVuZ3RoLCBhLnkgLyBsZW5ndGgpO1xuICB9XG5cbiAgc3RhdGljIG9ydGhvZ29uYWwoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLnksIGEueCk7XG4gIH1cblxuICBzdGF0aWMgYW5nbGVEZWcoYSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGEueSwgYS54KSAqIDE4MCAvIE1hdGguUEk7XG4gIH1cblxuLy8gYmluYXJ5XG5cbiAgc3RhdGljIGFkZChhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54ICsgYi54LCBhLnkgKyBiLnkpO1xuICB9XG5cbiAgc3RhdGljIHN1YihhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54IC0gYi54LCBhLnkgLSBiLnkpO1xuICB9XG5cbiAgc3RhdGljIGRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueTtcbiAgfVxuXG4gIHN0YXRpYyBzY2FsZShhLCBuKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54ICogbiwgYS55ICogbik7XG4gIH1cblxuICBzdGF0aWMgbWlkKGEsIGIpIHtcbiAgICByZXR1cm4gVmVjdG9yLnNjYWxlKFZlY3Rvci5hZGQoYSwgYiksIDAuNSk7XG4gIH1cblxuICBzdGF0aWMgYW5nbGVCZXR3ZWVuKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hY29zKFZlY3Rvci5kb3QoYSwgYikgLyBWZWN0b3IubGVuKGEpIC0gVmVjdG9yLmxlbihiKSk7XG4gIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gd2luZG93LmQzO1xudmFyIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpO1xudmFyIGNvbG9ycyA9IHt9O1xudmFyIGNvbG9yTGl0ZXJhbHMgPSBbJ0JMVUUnLCAnT1JBTkdFJywgJ0dSRUVOJywgJ1JFRCcsICdQVVJQTEUnLCAnQlJPV04nLCAnUElOSycsICdHUkFZJywgJ1lFTExPVycsICdDWUFOJ107XG5jb2xvckxpdGVyYWxzLmZvckVhY2goZnVuY3Rpb24gKGMsIGkpIHtcbiAgY29sb3JzW2NdID0gY29sb3IucmFuZ2UoKVsyICogaV07XG4gIGNvbG9yc1snTElHSFRfJyArIGNdID0gY29sb3IucmFuZ2UoKVsyICogaSArIDFdO1xufSk7XG5cbmNvbG9ycy5yYW5kb21Gcm9tUGFsZXR0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNvbG9yLnJhbmdlKClbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApXTtcbn07XG5cbmV4cG9ydCB7Y29sb3JzfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gd2luZG93LmQzO1xuXG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi4vY29uc3QnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9WZWN0b3InO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBvd25lcjtcblxuICBmdW5jdGlvbiBzZWxmTG9vcCh1LCBtYXJnaW4pIHtcbiAgICB2YXIgYWRqYWNlbnQgPSBvd25lci5ncmFwaC5nZXRBZGphY2VudE5vZGVzKHUpO1xuICAgIHZhciBkaXIgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciB2ID0gYWRqYWNlbnRbaV07XG4gICAgICBpZiAodS5pZCAhPT0gdi5pZCkge1xuICAgICAgICBkaXIgPSBWZWN0b3IudW5pdChWZWN0b3IuYWRkKFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHUsIHYpKVxuICAgICAgICApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBubyBhZGphY2VudCB2ZXJ0aWNlc1xuICAgIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA9PT0gMCkge1xuICAgICAgZGlyID0gVmVjdG9yLnVuaXQobmV3IFZlY3RvcigwLCAtMSkpO1xuICAgIH1cblxuICAgIHZhciBrID0gMC44O1xuICAgIHZhciB1cCA9IFZlY3Rvci5hZGQodSwgVmVjdG9yLnNjYWxlKGRpciwgbWFyZ2luICogaykpO1xuICAgIHZhciBtaWQgPSBWZWN0b3IubWlkKHUsIHVwKTtcbiAgICB2YXIgb3J0ID0gVmVjdG9yLm9ydGhvZ29uYWwoZGlyKTtcblxuICAgIHZhciByaWdodCA9IFZlY3Rvci5hZGQobWlkLCBWZWN0b3Iuc2NhbGUob3J0LCBtYXJnaW4gLyAyICogaykpO1xuICAgIHZhciBsZWZ0ID0gVmVjdG9yLmFkZChtaWQsIFZlY3Rvci5zY2FsZShvcnQsIC1tYXJnaW4gLyAyICogaykpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFtsZWZ0LCB1cCwgcmlnaHRdLFxuICAgICAgZGlyOiBvcnRcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGF0aChkLCBtZXRhLCBtYXJnaW4pIHtcbiAgICB2YXIgdSwgdjtcbiAgICB2YXIgY3VycmVudDtcblxuICAgIHUgPSBkLnNvdXJjZTtcbiAgICB2ID0gZC50YXJnZXQ7XG4gICAgaWYgKHUuaWQgPiB2LmlkKSB7XG4gICAgICBbdSwgdl0gPSBbdiwgdV07XG4gICAgfVxuICAgIG1ldGFbdS5pZF0gPSBtZXRhW3UuaWRdIHx8IHt9O1xuXG4gICAgY3VycmVudCA9IChtZXRhW3UuaWRdW3YuaWRdID0gbWV0YVt1LmlkXVt2LmlkXSB8fCB7XG4gICAgICBjb3VudDogMSxcbiAgICAgIG1pZDogVmVjdG9yLm1pZCh1LCB2KSxcbiAgICAgIGRpcmVjdGlvbjogLTFcbiAgICB9KTtcblxuICAgIHZhciBpbm5lckpvaW50cyA9IFtdO1xuXG4gICAgaWYgKHUuaWQgPT09IHYuaWQpIHtcbiAgICAgIC8vIGFwcGx5IHRoZSBmb2xsb3dpbmcgZm9yIHNlbGYtbG9vcCBlZGdlc1xuICAgICAgdmFyIGxvb3AgPSBzZWxmTG9vcCh1LCBtYXJnaW4gKiAoY3VycmVudC5jb3VudCArIDEpKTtcbiAgICAgIGlubmVySm9pbnRzID0gbG9vcC5wYXRoO1xuICAgICAgZC51bml0ID0gbG9vcC5kaXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1bml0O1xuICAgICAgaWYgKFZlY3Rvci5sZW4oVmVjdG9yLnN1Yih2LCB1KSkpIHtcbiAgICAgICAgdW5pdCA9IFZlY3Rvci51bml0KFZlY3Rvci5zdWIodiwgdSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5pdCA9IG5ldyBWZWN0b3IoMSwgMCk7XG4gICAgICB9XG5cbiAgICAgIGV4dGVuZChjdXJyZW50LCB7XG4gICAgICAgIHVuaXQ6IHVuaXQsXG4gICAgICAgIHVuaXRJbnZlcnNlOiBWZWN0b3Iub3J0aG9nb25hbCh1bml0KVxuICAgICAgfSk7XG4gICAgICBpbm5lckpvaW50cy5wdXNoKFZlY3Rvci5hZGQoXG4gICAgICAgIGN1cnJlbnQubWlkLFxuICAgICAgICBWZWN0b3Iuc2NhbGUoXG4gICAgICAgICAgY3VycmVudC51bml0SW52ZXJzZSxcbiAgICAgICAgICBNYXRoLmZsb29yKGN1cnJlbnQuY291bnQgLyAyKSAqIG1hcmdpbiAqIGN1cnJlbnQuZGlyZWN0aW9uXG4gICAgICAgIClcbiAgICAgICkpO1xuICAgICAgZC51bml0ID0gY3VycmVudC51bml0O1xuICAgIH1cblxuICAgIGN1cnJlbnQuY291bnQgKz0gMTtcbiAgICBjdXJyZW50LmRpcmVjdGlvbiAqPSAtMTtcbiAgICBkLnBhdGggPSBbZC5zb3VyY2VdXG4gICAgICAuY29uY2F0KGlubmVySm9pbnRzKVxuICAgICAgLmNvbmNhdChbZC50YXJnZXRdKTtcbiAgfVxuXG4gIHZhciBsaW5lID0gZDMuc3ZnLmxpbmUoKVxuICAgIC54KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLng7IH0pXG4gICAgLnkoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueTsgfSlcbiAgICAudGVuc2lvbigxLjUpXG4gICAgLmludGVycG9sYXRlKCdidW5kbGUnKTtcblxuICBmdW5jdGlvbiBpbm5lcihzZWxlY3Rpb24pIHtcbiAgICAvLyBlZGdlc1xuICAgIHZhciBsaW5rcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cuZWRnZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rcztcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG4gICAgbGlua3MuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpOyB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XG5cbiAgICAvLyB1cGRhdGVcbiAgICBsaW5rc1xuICAgICAgLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBjbHMgPSB7XG4gICAgICAgICAgZGlyZWN0ZWQ6IGQuZGlyZWN0ZWQgfHwgb3duZXIub3B0aW9ucy5kaXJlY3RlZFxuICAgICAgICB9O1xuICAgICAgICBjbHNbJ3NvdXJjZS0nICsgZC5zb3VyY2UuaWRdID0gdHJ1ZTtcbiAgICAgICAgY2xzWyd0YXJnZXQtJyArIGQudGFyZ2V0LmlkXSA9IHRydWU7XG4gICAgICAgIHNlbGYuY2xhc3NlZChjbHMpO1xuICAgICAgfSk7XG5cbiAgICB2YXIgbWV0YSA9IHt9O1xuICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgIGNyZWF0ZVBhdGgoZCwgbWV0YSwgMTcpO1xuICAgIH0pO1xuXG4gICAgLy8gcGF0aCBlbnRlclxuICAgIHZhciBwYXRocyA9IGxpbmtzLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICAvLyAxLiByZWFsIHBhdGhcbiAgICAgICAgLy8gMi4gc3Ryb2tlLWRhc2hhcnJheSBoZWxwZXJcbiAgICAgICAgcmV0dXJuIFtkLCBkXTtcbiAgICAgIH0pO1xuICAgIHBhdGhzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIGQgPT4gZC5zdHJva2UpXG4gICAgICAuYXR0cignZmlsbCcsICd0cmFuc3BhcmVudCcpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMilcbiAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgZWwuYXR0cignb3BhY2l0eScsICFpID8gMSA6IDApO1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIGVsLmNsYXNzZWQoJ2Jhc2UnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgIGVsLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDUpO1xuICAgICAgICAgIGVsLmNsYXNzZWQoJ3RyYXZlcnNhbCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vLmF0dHIoJ2QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgdmFyIHBhcmVudCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmRhdHVtKCk7XG4gICAgICAvLyAgcmV0dXJuIGxpbmUoW3BhcmVudC5zb3VyY2VdKTtcbiAgICAgIC8vfSk7XG5cbiAgICAvLyBwYXRoIHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbihwYXRocywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC5hdHRyKCdkJywgZCA9PiBsaW5lKGQucGF0aCkpO1xuXG4gICAgcGF0aHMuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgdmFyIHBhdGggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICB2YXIgcGFyZW50ID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSk7XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBwYXRoLmF0dHIoJ21hcmtlci1lbmQnLFxuICAgICAgICAgIHBhcmVudC5jbGFzc2VkKCdkaXJlY3RlZCcpXG4gICAgICAgICAgICA/ICd1cmwoIycgKyBvd25lci5tYXJrZXJJZCArICcpJ1xuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB3ZWlnaHRQb3NpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvblxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICB2YXIgYW5nbGUgPSBWZWN0b3IuYW5nbGVEZWcoZC51bml0KTtcbiAgICAgICAgICB2YXIgdiA9IGQucGF0aFtNYXRoLmZsb29yKGQucGF0aC5sZW5ndGggLyAyKV07XG4gICAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IHYsXG4gICAgICAgICAgICByb3RhdGU6IGFuZ2xlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciB3ZWlnaHRzID0gbGlua3Muc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZF07IH0pO1xuXG4gICAgLy8gd2VpZ2h0IGVudGVyXG4gICAgd2VpZ2h0cy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICd0ZXh0LWFmdGVyLWVkZ2UnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbik7XG5cbiAgICAvLyB3ZWlnaHQgdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKHdlaWdodHMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAudGV4dChkID0+IGQud2VpZ2h0KVxuICAgICAgLmNhbGwod2VpZ2h0UG9zaXRpb24pO1xuXG4gICAgLy8gd2VpZ2h0IGV4aXRcbiAgICB3ZWlnaHRzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuXG4gICAgLy8gZXhpdFxuICAgIGxpbmtzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuICB9XG5cbiAgaW5uZXIub3duZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBvd25lcjtcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5uZXI7XG4gIH07XG5cbiAgcmV0dXJuIGlubmVyO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi4vY29uc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIG93bmVyO1xuXG4gIGZ1bmN0aW9uIGlubmVyKHNlbGVjdGlvbikge1xuICAgIHZhciBub2RlcyA9IHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgnZy5ub2RlJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLm5vZGVzO1xuICAgICAgfSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9KTtcblxuICAgIHZhciBsYXlvdXQgPSBvd25lci5sYXlvdXQ7XG5cbiAgICB2YXIgZyA9IG5vZGVzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiAnbm9kZSAnICsgKGQuY2xhc3MgfHwgJycpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiB1dGlscy5ucyhkLmlkKTsgfSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHsgdHJhbnNsYXRlOiBkIH0pO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmICghZWwub3Zlcikge1xuICAgICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGVsLm92ZXIgPSB0cnVlO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgZWwub3ZlciA9IGZhbHNlO1xuICAgICAgICBlbC5zdHlsZSgnY3Vyc29yJywgbnVsbCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKTtcbiAgICBnLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XG4gICAgZy5jYWxsKGxheW91dC5kcmFnKTtcblxuICAgIHZhciBkcmFnU3RhcnQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJyk7XG4gICAgdmFyIGRyYWdFbmQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnZW5kLmQzYWRhcHRvcicpO1xuICAgIGxheW91dC5kcmFnKClcbiAgICAgIC5vbignZHJhZ3N0YXJ0LmQzYWRhcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3duZXIubm9kZURyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgZHJhZ1N0YXJ0LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgIH0pXG4gICAgICAub24oJ2RyYWdlbmQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgZHJhZ0VuZC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcblxuICAgIGcuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCkgPT4gZC5maWxsKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gZC5yICk7XG5cbiAgICAvLyBpbm5lciBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdsYWJlbCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsICd3aGl0ZScpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzEycHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuYXR0cigneScsIChkKSA9PiBkLmhlaWdodCAvIDQpO1xuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5sYWJlbCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ2xhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9KTtcblxuICAgIC8vIHRvcC1yaWdodCBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdvdXRlci10b3AtcmlnaHQnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBjb2xvcnMuQkxVRSlcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdzdGFydCcpXG4gICAgICAuYXR0cigneCcsIGQgPT4gZC53aWR0aCAvIDIgLSAyKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IC1kLmhlaWdodCAvIDIgKyAzKTtcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLXJpZ2h0JylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgndG9wUmlnaHRMYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLnRvcFJpZ2h0TGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gdG9wLWxlZnQgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnb3V0ZXItdG9wLWxlZnQnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBjb2xvcnMuQkxVRSlcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgLmF0dHIoJ3gnLCBkID0+IC1kLndpZHRoIC8gMiAtIDIpXG4gICAgICAuYXR0cigneScsIGQgPT4gLWQuaGVpZ2h0IC8gMiArIDMpO1xuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5vdXRlci10b3AtbGVmdCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BMZWZ0TGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKG5vZGVzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oe1xuICAgICAgICAgIHRyYW5zbGF0ZTogZFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gZXhpdFxuICAgIG5vZGVzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuICB9XG5cbiAgaW5uZXIub3duZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBvd25lcjtcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5uZXI7XG4gIH07XG5cbiAgcmV0dXJuIGlubmVyO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcG9seWZpbGxzIGZyb20gJy4vcG9seWZpbGxzJztcbnBvbHlmaWxscygpO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG5cbi8vIG5vZGVcbmltcG9ydCBEcmF3IGZyb20gJy4vRHJhdyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cbnZhciBpbnN0YW5jZXMgPSBbXTtcblxuZnVuY3Rpb24gcnVuKG9wdGlvbnMpIHtcbiAgZnVuY3Rpb24gZmFjdG9yeShvcHRpb25zKSB7XG4gICAgdmFyIGVsID0gZDMuc2VsZWN0KG9wdGlvbnMudGFyZ2V0KTtcbiAgICB2YXIgaWQgPSBlbC5hdHRyKCdncmV1bGVyLWlkJyk7XG4gICAgaWYgKCFpZCkge1xuICAgICAgaWQgPSB1dGlscy5pZCgpO1xuICAgICAgZWwuYXR0cignZ3JldWxlci1pZCcsIGlkKTtcbiAgICAgIGluc3RhbmNlc1tpZF0gPSBuZXcgRHJhdyhpZCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZXNbaWRdO1xuICB9XG5cbiAgcmV0dXJuIGZhY3Rvcnkob3B0aW9ucyk7XG59XG5cbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJztcbnJ1bi5HcmFwaCA9IEdyYXBoO1xuXG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi9jb25zdCc7XG5ydW4uY29sb3JzID0gY29sb3JzO1xuXG5pbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyL2luZGV4JztcbnJ1bi5wbGF5ZXIgPSBwbGF5ZXI7XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoYWN0aW9ucywgc3BlZWQpIHtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcblxuICAgIC8vIHN0YXRlc1xuICAgIHRoaXMudGltZXIgPSBudWxsO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYWN0aW9uc1t0aGlzLmluZGV4KytdKCk7XG4gICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLnBsYXkuYmluZCh0aGlzKSwgdGhpcy5zcGVlZCk7XG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZSwgc3BlZWQpIHtcbiAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkIHx8IGluc3RhbmNlLm9wdGlvbnMuYW5pbWF0aW9uVGltZTtcbiAgICB0aGlzLmZuID0gbnVsbDtcbiAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgfVxuXG4gIHJ1bihmbikge1xuICAgIHRoaXMuZm4gPSBmbih0aGlzLmluc3RhbmNlKTtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIHJ1bkFuaW1hdGlvbihhbmltYXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhbmltYXRpb24pKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uLmZvckVhY2godGhpcy5ydW5BbmltYXRpb24sIHRoaXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYW5pbWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uKHRoaXMuaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gdGhpcy5pbnN0YW5jZVthbmltYXRpb24udHlwZV07XG4gICAgcmV0dXJuIHR5cGVbYW5pbWF0aW9uLm9wXS5hcHBseSh0eXBlLCBhbmltYXRpb24uYXJncyB8fCBbXSk7XG4gIH1cblxuICBwbGF5KHZhbHVlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBuZXh0ID0gdGhpcy5mbi5uZXh0KHZhbHVlKTtcbiAgICBpZiAoIW5leHQuZG9uZSkge1xuICAgICAgdmFyIGRlbGF5ID0gdGhpcy5zcGVlZDtcbiAgICAgIHZhciBydW5BbmltYXRpb25WYWx1ZSA9IHRoaXMucnVuQW5pbWF0aW9uKG5leHQudmFsdWUpO1xuICAgICAgaWYgKHJ1bkFuaW1hdGlvblZhbHVlICYmIHR5cGVvZiBydW5BbmltYXRpb25WYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBydW5BbmltYXRpb25WYWx1ZS5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBkZWxheSA9IHJ1bkFuaW1hdGlvblZhbHVlLmRlbGF5O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5wbGF5KG5leHQudmFsdWUpO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRml4ZWQgZnJvbSAnLi9GaXhlZCc7XG5pbXBvcnQgR2VuZXJhdG9yIGZyb20gJy4vR2VuZXJhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBGaXhlZEludGVydmFsOiBGaXhlZCxcbiAgR2VuZXJhdG9yOiBHZW5lcmF0b3Jcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLyplc2xpbnQtZGlzYWJsZSAqL1xuICAoZnVuY3Rpb24oZG9jLCBwcm90bykge1xuICAgIHRyeSB7IC8vIGNoZWNrIGlmIGJyb3dzZXIgc3VwcG9ydHMgOnNjb3BlIG5hdGl2ZWx5XG4gICAgICBkb2MucXVlcnlTZWxlY3RvcignOnNjb3BlIGJvZHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHsgLy8gcG9seWZpbGwgbmF0aXZlIG1ldGhvZHMgaWYgaXQgZG9lc24ndFxuICAgICAgWydxdWVyeVNlbGVjdG9yJywgJ3F1ZXJ5U2VsZWN0b3JBbGwnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICB2YXIgbmF0aXZlID0gcHJvdG9bbWV0aG9kXTtcbiAgICAgICAgcHJvdG9bbWV0aG9kXSA9IGZ1bmN0aW9uKHNlbGVjdG9ycykge1xuICAgICAgICAgIGlmICgvKF58LClcXHMqOnNjb3BlLy50ZXN0KHNlbGVjdG9ycykpIHsgLy8gb25seSBpZiBzZWxlY3RvcnMgY29udGFpbnMgOnNjb3BlXG4gICAgICAgICAgICB2YXIgaWQgPSB0aGlzLmlkOyAvLyByZW1lbWJlciBjdXJyZW50IGVsZW1lbnQgaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSAnSURfJyArIERhdGUubm93KCk7IC8vIGFzc2lnbiBuZXcgdW5pcXVlIGlkXG4gICAgICAgICAgICBzZWxlY3RvcnMgPSBzZWxlY3RvcnMucmVwbGFjZSgvKChefCwpXFxzKik6c2NvcGUvZywgJyQxIycgKyB0aGlzLmlkKTsgLy8gcmVwbGFjZSA6c2NvcGUgd2l0aCAjSURcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBkb2NbbWV0aG9kXShzZWxlY3RvcnMpO1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkOyAvLyByZXN0b3JlIHByZXZpb3VzIGlkXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlLmNhbGwodGhpcywgc2VsZWN0b3JzKTsgLy8gdXNlIG5hdGl2ZSBjb2RlIGZvciBvdGhlciBzZWxlY3RvcnNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSkod2luZG93LmRvY3VtZW50LCBFbGVtZW50LnByb3RvdHlwZSk7XG4gIC8qZXNsaW50LWVuYWJsZSAqL1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtjb2xvcnN9IGZyb20gJy4uL2NvbnN0JztcbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3Iob3duZXIpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgdGhpcy5ncmFwaCA9IG93bmVyLmdyYXBoO1xuICAgIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucygpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmdldEFuaW1hdGlvblRpbWUoKSxcbiAgICAgIHN0cm9rZTogJyNFNzRDM0MnXG4gICAgfSwgdGhpcy5kZWZhdWx0U3R5bGVPcHRpb25zKTtcbiAgfVxuXG4gIGdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0QW5pbWF0aW9uVGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lci5vcHRpb25zLmFuaW1hdGlvblRpbWU7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzIHJldHVybmVkIGJ5IHRoZSBHcmFwaCBjbGFzcyB0aGlzIG1ldGhvZHMgcmV0dXJuc1xuICAgKiB0aGUgZDMgc2VsZWN0aW9uIHRoYXQgZm9yIGFsbCB0aG9zZSBvYmplY3RzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W118T2JqZWN0fSBlbHMgQW4gYXJyYXkgb2YgZWRnZXMvbm9kZXMgb3IgYSBzaW5nbGUgZWRnZS9ub2RlXG4gICAqIEByZXR1cm4ge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIHNlbGVjdChlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkge1xuICAgICAgZWxzID0gW2Vsc107XG4gICAgfVxuICAgIGlmICghZWxzLmxlbmd0aCkge1xuICAgICAgZWxzLnB1c2goeyBpZDogLTEgfSk7XG4gICAgfVxuICAgIGVscyA9IGVscy5maWx0ZXIoQm9vbGVhbik7XG4gICAgcmV0dXJuIHRoaXMub3duZXIucm9vdC5zZWxlY3RBbGwoXG4gICAgICBlbHMubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiAnIycgKyB1dGlscy5ucyhlLmlkKTtcbiAgICAgIH0pLmpvaW4oJywgJylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIHBhdGggaW5zaWRlIHRoZSB0YWcgPGc+IHRoYXQgcmVwcmVzZW50cyBhbiBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICovXG4gIGlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGguYmFzZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIGNpcmNsZSBpbnNpZGUgdGhlIHRhZyA8Zz4gdGhhdCByZXByZXNlbnRzIGEgbm9kZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqL1xuICBpbm5lck5vZGVTZWxlY3RvcihzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGQzID0gd2luZG93LmQzO1xuXG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi4vY29uc3QnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnO1xuXG52YXIgSElHSExJR0hUID0gJ2hpZ2hsaWdodCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbiBleHRlbmRzIEdyYXBoIHtcblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIG9mIHRoZSBncmFwaFxuICAgKlxuICAgKiBAcmV0dXJucyB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgZ2V0RWRnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmVkZ2VzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIG5vZGVzIG9mIHRoZSBncmFwaFxuICAgKlxuICAgKiBAcmV0dXJucyB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgZ2V0Tm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLm5vZGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyBhIG5vZGUgdGVtcG9yYXJpbHksIGl0IGNvbnNpc3RzIG9mIHR3b1xuICAgKiBjaGFpbmVkIHRyYW5zaXRpb25zXG4gICAqXG4gICAqIC0gaW5jcmVhc2UgdGhlIHJhZGl1cyB0byAxLjV4IHRoZSBvcmlnaW5hbCBgcmAgdmFsdWVcbiAgICogLSBkZWNyZWFzZSB0aGUgcmFkaXVzIHRvIHRoZSBvcmlnaW5hbCBgcmAgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIGRvVGVtcG9yYWxIaWdobGlnaHROb2RlKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBvcHRpb25zLnIgfHwgKGQuciAqIDEuNSkpXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gZC5yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIGFuIGVkZ2UgdGVtcG9yYXJpbHksIGl0IGNvbnNpc3RzIG9mIHR3b1xuICAgKiBjaGFpbmVkIHRyYW5zaXRpb25zXG4gICAqXG4gICAqIC0gY2hhbmdlIHRoZSBzdHJva2Ugb2YgdGhlIGBwYXRoYCB0aGF0IHJlcHJlc2VudHMgdGhlIGVkZ2UgdG9cbiAgICogYG9wdGlvbnMuc3Ryb2tlYFxuICAgKiAtIGNoYW5nZSB0aGUgc3Ryb2tlIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgKGQpID0+IGQuc3Ryb2tlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFZGdlIHRyYXZlcnNhbCBhbmltYXRpb24sIGl0IGFuaW1hdGVzIGEgaGlkZGVuIHBhdGggZ2l2aW5nIHRoZSBpbXByZXNzaW9uXG4gICAqIG9mIG1vdmVtZW50LCBpZiBzb3VyY2UgaXMgZ2l2ZW4gdGhlbiBpdCB3aWxsIGFsd2F5cyBzdGFydCB0aGUgYW5pbWF0aW9uXG4gICAqIGZyb20gdGhlIG5vZGUgYHNvdXJjZWAgZXZlbiBpZiB0aGUgZWRnZSBpcyBhbiBpbmNvbWluZyBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtjb25maWd9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzb3VyY2U9LTFdXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgdHJhdmVyc2VFZGdlV2l0aERpcmVjdGlvbihzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSA9IC0xKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgncGF0aC50cmF2ZXJzYWwnKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpO1xuICAgICAgICBlbFxuICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIGAke2x9ICR7bH1gKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIGwpXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKTtcbiAgICAgIH0pXG4gICAgICAudHJhbnNpdGlvbignZGFzaGFycmF5JylcbiAgICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uKVxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgICAgdmFyIHR3aWNlTGVuZ3RoID0gbGVuZ3RoICogMjtcbiAgICAgICAgdmFyIGxlbmd0aFRvTW92ZSA9IDA7XG4gICAgICAgIGlmIChzb3VyY2UgIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGQudGFyZ2V0LmlkID09PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICBsZW5ndGhUb01vdmUgPSB0d2ljZUxlbmd0aCAtIGxlbmd0aFRvTW92ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZW5ndGhUb01vdmU7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBlbC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgbnVsbClcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHRyYXZlcnNlRWRnZXMoc2VsZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIGtlZXBTdHJva2U6IHRydWUsXG4gICAgICByZXZlcnNlOiBmYWxzZVxuICAgIH0sIHRoaXMuZ2V0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpO1xuXG4gICAgc2VsZWN0aW9uLmNhbGwodGhpcy50cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UpO1xuICAgIGlmIChvcHRpb25zLmtlZXBTdHJva2UpIHtcbiAgICAgIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgICAudHJhbnNpdGlvbigndXBkYXRlJylcbiAgICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbik7XG4gIH1cblxuICBnZXROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0Tm9kZShub2RlKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0RWRnZShlZGdlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEVkZ2UoZWRnZSkpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRlbXBvcmFsIGhpZ2hsaWdodFxuXG4gIGhpZ2hsaWdodE5vZGUobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHROb2RlKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXROb2RlKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIGhpZ2hsaWdodEVkZ2UoZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0RWRnZShlZGdlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBoaWdobGlnaHRJbmNpZGVudEVkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY2lkZW50RWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgaGlnaGxpZ2h0T3V0Z29pbmdFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIGhpZ2hsaWdodEluY29taW5nRWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jb21pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBnaXZlbiBhIG5vZGVcblxuICB0cmF2ZXJzZU91dGdvaW5nRWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE91dGdvaW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgdHJhdmVyc2VJbmNvbWluZ0VkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIHRyYXZlcnNlSW5jaWRlbnRFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBiZXR3ZWVuIHR3byBub2Rlc1xuXG4gIHRyYXZlcnNlRWRnZXNCZXR3ZWVuKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QoXG4gICAgICAgIHRoaXMuZ3JhcGguZ2V0RWRnZXNCZXR3ZWVuKGVkZ2UpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucyksXG4gICAgICBlZGdlLnNvdXJjZVxuICAgICk7XG4gIH1cblxuICB0cmF2ZXJzZUFsbEVkZ2VzQmV0d2VlbihlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KFxuICAgICAgICB0aGlzLmdyYXBoLmdldEFsbEVkZ2VzQmV0d2VlbihlZGdlKVxuICAgICAgKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpLFxuICAgICAgZWRnZS5zb3VyY2VcbiAgICApO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBsY2cgZnJvbSAnY29tcHV0ZS1sY2cnO1xuXG52YXIgcmFuZCA9IGxjZygxKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBuID0gcmFuZCgpO1xuICAgIHZhciBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IobiAqIDI2KSArIDk3KTtcbiAgICByZXR1cm4gbGV0dGVyICsgbi50b1N0cmluZygxNikuc3Vic3RyKDIpO1xuICB9LFxuXG4gIHRyYW5zZm9ybTogZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgc3RyID0gYGA7XG4gICAgaWYgKCd0cmFuc2xhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHRyYW5zbGF0ZSgke28udHJhbnNsYXRlLnh9LCAke28udHJhbnNsYXRlLnl9KWA7XG4gICAgfVxuICAgIGlmICgncm90YXRlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCByb3RhdGUoJHtvLnJvdGF0ZX0pYDtcbiAgICB9XG4gICAgaWYgKCdzY2FsZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgc2NhbGUoJHtvLnNjYWxlfSlgO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9LFxuXG4gIHRyYW5zaXRpb246IGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAudHJhbnNpdGlvbignbGF5b3V0JylcbiAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAuZWFzZSgnbGluZWFyJyk7XG4gIH0sXG5cbiAgY29uZGl0aW9uYWxUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZWwsIGNvbmRpdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb24oZWwpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH0sXG5cbiAgbnM6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gJ2dyZXVsZXItJyArIHN0cjtcbiAgfVxufTtcbiJdfQ==
