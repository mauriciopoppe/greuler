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
      this.root.enter.append('svg:defs').append('svg:marker').attr('id', this.markerId).attr('viewBox', '0 -5 10 10').attr('refX', 8).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto').append('svg:path').attr('d', 'M0,-4L10,0L0,4L2,0').attr('stroke-width', '0px').attr('fill-opacity', 1).attr('fill', '#777');

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

  function xyOfObj(o) {
    return { x: o.x, y: o.y };
  };

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
      var loop = selfLoop(u, margin * v.r * (current.count + 1));
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
      innerJoints.push(_Vector2['default'].add(current.mid, _Vector2['default'].scale(current.unitInverse, Math.floor(current.count / 2) * margin * v.r * current.direction)));
      d.unit = current.unit;
    }

    current.count += 1;
    current.direction *= -1;

    var p0 = xyOfObj(d.source);
    var p1 = xyOfObj(d.target);

    var ix = innerJoints[0].x;
    var iy = innerJoints[0].y;

    var abP0 = {
      x: ix - p0.x,
      y: iy - p0.y
    };

    var dx = p0.x - ix;
    var dy = p0.y - iy;
    var l = Math.sqrt(dx * dx + dy * dy);

    var n_abP0 = {
      x: abP0.x / l,
      y: abP0.y / l
    };

    p0 = {
      x: p0.x + n_abP0.x * d.source.r,
      y: p0.y + n_abP0.y * d.source.r
    };

    var _l = innerJoints.length - 1;
    ix = innerJoints[_l].x;
    iy = innerJoints[_l].y;

    var abP1 = {
      x: p1.x - ix,
      y: p1.y - iy
    };

    var dx = p1.x - ix;
    var dy = p1.y - iy;
    var l = Math.sqrt(dx * dx + dy * dy);

    var n_abP1 = {
      x: abP1.x / l,
      y: abP1.y / l
    };

    p1 = {
      x: p1.x - n_abP1.x * d.target.r,
      y: p1.y - n_abP1.y * d.target.r
    };

    innerJoints.unshift(p0);
    innerJoints.push(p1);

    d.path = innerJoints;

    /*d.path = [d.source]
      .concat(innerJoints)
      .concat([d.target]);*/
    //console.log(d.path);
  }

  var line = d3.svg.line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).interpolate('basis');
  //.tension(1.5)
  //.interpolate('bundle');

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
      createPath(d, meta, 1.7);
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

  // from https://gist.github.com/joelambert/1002116
  //
  // requestAnimationFrame() shim by Paul Irish
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvRHJhdy5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvR3JhcGguanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvY29uc3QuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2VsZW1lbnRzL2VkZ2UuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2luZGV4LmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy9wbGF5ZXIvRml4ZWQuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL3BsYXllci9pbmRleC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvcG9seWZpbGxzLmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvc2VsZWN0b3IvR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uLmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O3NCQUtNLFFBQVE7Ozs7NEJBQ1YsaUJBQWlCOzs7OzRCQUNq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QUVELFdBQVMsRUFBRSxtQkFBVSxDQUFDLEVBQUU7QUFDdEIsUUFBSSxHQUFHLEtBQUssQ0FBQztBQUNiLFFBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtBQUNwQixTQUFHLG9CQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBRyxDQUFDO0tBQ3pEO0FBQ0QsUUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLFNBQUcsaUJBQWUsQ0FBQyxDQUFDLE1BQU0sTUFBRyxDQUFDO0tBQy9CO0FBQ0QsUUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO0FBQ2hCLFNBQUcsZ0JBQWMsQ0FBQyxDQUFDLEtBQUssTUFBRyxDQUFDO0tBQzdCO0FBQ0QsV0FBTyxHQUFHLENBQUM7R0FDWjs7QUFFRCxZQUFVLEVBQUUsb0JBQVUsU0FBUyxFQUFFO0FBQy9CLFdBQU8sU0FBUyxDQUNiLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDcEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUNuQjs7QUFFRCx1QkFBcUIsRUFBRSwrQkFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFO0FBQzlDLFFBQUksU0FBUyxFQUFFO0FBQ2IsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzVCO0FBQ0QsV0FBTyxFQUFFLENBQUM7R0FDWDs7QUFFRCxJQUFFLEVBQUUsWUFBVSxHQUFHLEVBQUU7QUFDakIsV0FBTyxVQUFVLEdBQUcsR0FBRyxDQUFDO0dBQ3pCO0NBQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4qXG4qXHRDT01QVVRFOiBsY2dcbipcbipcbipcdERFU0NSSVBUSU9OOlxuKlx0XHQtIEEgbGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvciAobGNnKS5cbipcbipcbipcdE5PVEVTOlxuKlx0XHRbMV0gQmFzZWQgb24gVy4gUHJlc3MsIGV0IGFsLiwgTnVtZXJpY2FsIFJlY2lwZXMgaW4gQyAoMmQgZWQuIDE5OTIpXG4qXG4qXG4qXHRUT0RPOlxuKlx0XHRbMV1cbipcbipcbipcdExJQ0VOU0U6XG4qXHRcdE1JVFxuKlxuKlx0Q29weXJpZ2h0IChjKSAyMDE0LiByZ2l6ei5cbipcbipcbipcdEFVVEhPUjpcbipcdFx0cmdpenouIGd6dG93bjIyMTZAeWFob28uY29tLiAyMDE0LlxuKlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBWQVJJQUJMRVMgLy9cblxudmFyIE1BU0sgPSAxMjM0NTk4NzYsXG5cdE0gPSAyMTQ3NDgzNjQ3LFxuXHRBID0gMTY4MDc7XG5cblxuLy8gTENHIC8vXG5cbi8qKlxuKiBGVU5DVElPTjogbGNnKCBbc2VlZF0gKVxuKlx0UmV0dXJucyBhIGxpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuIElmIG5vdCBwcm92aWRlZCBhIHNlZWQsIGEgc2VlZCBpcyBnZW5lcmF0ZWQgYmFzZWQgb24gdGhlIGN1cnJlbnQgdGltZS5cbipcbiogQHBhcmFtIHtOdW1iZXJ9IFtzZWVkXSAtIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIHNlZWRcbiogQHJldHVybnMge0Z1bmN0aW9ufSBnZW5lcmF0b3JcbiovXG5mdW5jdGlvbiBsY2coIHZhbCApIHtcblx0dmFyIHNlZWQ7XG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRpZiAoIHR5cGVvZiB2YWwgIT09ICdudW1iZXInIHx8IHZhbCAhPT0gdmFsIHx8IHZhbCAlIDEgIT09IDAgfHwgdmFsIDwgMSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdsY2coKTo6aW52YWxpZCBpbnB1dCBhcmd1bWVudC4gU2VlZCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4nICk7XG5cdFx0fVxuXHRcdHNlZWQgPSB2YWw7XG5cdH0gZWxzZSB7XG5cdFx0c2VlZCA9IERhdGUubm93KCkgJSAxMDAwMDAwMDA7XG5cdH1cblx0LyoqXG5cdCogRlVOQ1RJT046IGxjZyggW05dIClcblx0Klx0TGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cblx0KlxuXHQqIEBwYXJhbSB7TnVtYmVyfSBbTl0gLSBudW1iZXIgb2YgcHNldWRvcmFuZG9tIG51bWJlcnMgdG8gcmV0dXJuXG5cdCogQHJldHVybnMge051bWJlcnxBcnJheX0gcHNldWRvcmFuZG9tIGZsb2F0aW5nLXBvaW50IG51bWJlcihzKSBiZXR3ZWVuIDAgYW5kIDFcblx0Ki9cblx0cmV0dXJuIGZ1bmN0aW9uIGxjZyggTiApIHtcblx0XHR2YXIgYXJyLFxuXHRcdFx0cmFuZDtcblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0c2VlZCA9ICggQSAqIHNlZWQgKSAlIE07XG5cdFx0XHRyYW5kID0gc2VlZCAvIE07XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRyZXR1cm4gcmFuZDtcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgTiAhPT0gJ251bWJlcicgfHwgTiAhPT0gTiB8fCBOJTEgIT09IDAgfHwgTiA8IDEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnbGNnKCk6OmludmFsaWQgaW5wdXQgYXJndW1lbnQuIEFycmF5IGxlbmd0aCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlci4nICk7XG5cdFx0fVxuXHRcdGFyciA9IG5ldyBBcnJheSggTiApO1xuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IE47IGkrKyApIHtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHNlZWQgPSAoIEEgKiBzZWVkICkgJSBNO1xuXHRcdFx0YXJyWyBpIF0gPSBzZWVkIC8gTTtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHR9XG5cdFx0cmV0dXJuIGFycjtcblx0fTtcbn0gLy8gZW5kIEZVTkNUSU9OIGxjZygpXG5cblxuLy8gRVhQT1JUUyAvL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxjZztcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gd2luZG93LmQzO1xudmFyIGNvbGEgPSB3aW5kb3cuY29sYTtcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IG5vZGUgZnJvbSAnLi9lbGVtZW50cy9ub2RlJztcbmltcG9ydCBlZGdlIGZyb20gJy4vZWxlbWVudHMvZWRnZSc7XG5pbXBvcnQgR3JhcGhNYW5hZ2VyIGZyb20gJy4vR3JhcGgnO1xuaW1wb3J0IEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbiBmcm9tICcuL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICBjb25zdHJ1Y3RvcihpZCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmV2ZW50cyA9IGQzLmRpc3BhdGNoKCdsYXlvdXQnLCAnZmlyc3RMYXlvdXRFbmQnKTtcblxuICAgIHRoaXMubWFya2VySWQgPSAnbWFya2VyLScgKyBpZDtcblxuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAvLyBncmFwaCBoYW5kbGVzIHRoZSBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgZHJhd2VyXG4gICAgdGhpcy5jcmVhdGVHcmFwaCgpO1xuXG4gICAgLy8gc2VsZWN0b3IgYW5pbWF0ZXMgdGhlIG5vZGVzL2VkZ2VzXG4gICAgdGhpcy5zZWxlY3RvciA9IG5ldyBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24odGhpcyk7XG5cbiAgICAvLyBzdWItZWxlbWVudHMgdGhhdCBkcmF3IHN0dWZmXG4gICAgdGhpcy5ub2RlRHJhd2VyID0gbm9kZSgpLm93bmVyKHRoaXMpO1xuICAgIHRoaXMuZWRnZURyYXdlciA9IGVkZ2UoKS5vd25lcih0aGlzKTtcblxuICAgIC8vIGNvbGFcbiAgICB0aGlzLmxheW91dCA9IGNvbGEuZDNhZGFwdG9yKCk7XG5cbiAgICB0aGlzLmxheW91dC5vbigndGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYudGljaygpO1xuICAgIH0pO1xuXG4gICAgdmFyIGZpcnN0RW5kID0gdHJ1ZTtcbiAgICB0aGlzLmxheW91dC5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGZpcnN0RW5kKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzLmZpcnN0TGF5b3V0RW5kKCk7XG4gICAgICAgIGZpcnN0RW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVHcmFwaCgpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMub3B0aW9ucy5kYXRhO1xuICAgIHZhciBub2RlcyA9IGRhdGEubm9kZXM7XG4gICAgdmFyIGxpbmtzID0gZGF0YS5saW5rcztcblxuICAgIC8vIGVtcHR5IGFuZCByZS1hZGRcbiAgICBkYXRhLm5vZGVzID0gW107XG4gICAgZGF0YS5saW5rcyA9IFtdO1xuXG4gICAgdGhpcy5ncmFwaCA9IG5ldyBHcmFwaE1hbmFnZXIodGhpcywgZGF0YSk7XG4gICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdGhpcy5ncmFwaC5hZGROb2RlKG5vZGUpO1xuICAgIH0sIHRoaXMpO1xuICAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIHRoaXMuZ3JhcGguYWRkRWRnZShlZGdlKTtcbiAgICB9LCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKlxuICAgKiBvcHRpb25zXG4gICAqICAgLSB0YXJnZXQge3N0cmluZ30gc2VsZWN0b3IgdG8gdGhlIGVsZW1lbnQgdG8gaG9sZCB0aGUgZ3JhcGhcbiAgICogICAtIHdpZHRoIHtudW1iZXJ9XG4gICAqICAgLSBoZWlnaHQge251bWJlcn1cbiAgICogICAtIGxhYmVscz10cnVlIHtib29sZWFufSBGYWxzZSB0byBoaWRlIHRoZSB2ZXJ0ZXggbGFiZWxzXG4gICAqICAgLSBkaXJlY3RlZD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBnaXZlIGFuIG9yaWVudGF0aW9uIHRvIHRoZSBlZGdlc1xuICAgKiAgIGhhdmUgYW4gZWRnZVxuICAgKiAgIC0gZGF0YSB7T2JqZWN0fVxuICAgKiAgICAgLSBsaW5rRGlzdGFuY2U9OTAge251bWJlcn0gRm9yY2VkIG1pbiBkaXN0YW5jZSBiZXR3ZWVuIHZlcnRpY2VzIHRoYXRcbiAgICogICAgIC0gY29uc3RyYWludHMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgLSBncm91cHMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgLSBub2RlcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAgIC0gcj0xMCB7bnVtYmVyfSBub2RlIHJhZGl1c1xuICAgKiAgICAgLSBsaW5rcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAgIC0gZGlyZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IHRydWUgdG8gZ2l2ZSBhbiBvcmllbnRhdGlvbiB0byB0aGlzIGVkZ2VcbiAgICogICAgICAgLSB3ZWlnaHQ9XCJcIiB7c3RyaW5nfSBMYWJlbCBvZiB0aGUgZWRnZSAoY2FuIGJlIHRoZSB3ZWlnaHQpXG4gICAqXG4gICAqL1xuICBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgLy8gZ3JhcGggZGVmYXVsdHNcbiAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIHdpZHRoOiA3MDAsXG4gICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgIGFuaW1hdGlvblRpbWU6IDEwMDAsXG4gICAgICBsYWJlbHM6IHRydWUsXG4gICAgICBkaXJlY3RlZDogZmFsc2VcbiAgICB9LCBvcHRpb25zKTtcblxuICAgIHRoaXMub3B0aW9ucy5kYXRhID0gZXh0ZW5kKHtcbiAgICAgIG5vZGVzOiBbXSxcbiAgICAgIGxpbmtzOiBbXSxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBjb25zdHJhaW50czogW10sXG4gICAgICBhdm9pZE92ZXJsYXBzOiB0cnVlLFxuICAgICAgc2l6ZTogW29wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0XSxcbiAgICAgIGxpbmtEaXN0YW5jZTogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubGlua0Rpc3RhbmNlIHx8IDgwO1xuICAgICAgfVxuICAgIH0sIHRoaXMub3B0aW9ucy5kYXRhKTtcbiAgfVxuXG4gIGluaXRMYXlvdXQodXBkYXRlT3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICh1cGRhdGVPcHRpb25zLnNraXBMYXlvdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhzZWxmLm9wdGlvbnMuZGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgdmFyIHYgPSBzZWxmLm9wdGlvbnMuZGF0YVtrXTtcbiAgICAgIHNlbGYubGF5b3V0W2tdKHYpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgLy90aGlzLmxheW91dC5zdGFydCgxNSwgMTUsIDE1KTtcbiAgICB0aGlzLmxheW91dC5zdGFydCgpO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICB0aGlzLmVkZ2VHcm91cC5jYWxsKHRoaXMuZWRnZURyYXdlcik7XG4gICAgdGhpcy5ub2RlR3JvdXAuY2FsbCh0aGlzLm5vZGVEcmF3ZXIpO1xuICB9XG5cbiAgdXBkYXRlKHVwZGF0ZU9wdGlvbnMpIHtcbiAgICB1cGRhdGVPcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIHNraXBMYXlvdXQ6IGZhbHNlXG4gICAgfSwgdXBkYXRlT3B0aW9ucyk7XG5cbiAgICB0aGlzLmluaXRMYXlvdXQodXBkYXRlT3B0aW9ucyk7XG4gICAgdGhpcy5idWlsZCh1cGRhdGVPcHRpb25zKTtcblxuICAgIC8vIHVwZGF0ZSBpbm5lciBub2Rlcy9lZGdlcyBpZiBsYXlvdXQudGljayB3YXNuJ3QgcnVuXG4gICAgaWYgKHVwZGF0ZU9wdGlvbnMuc2tpcExheW91dCkge1xuICAgICAgdGhpcy50aWNrKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICB0aGlzLnJvb3QgPSBkMy5zZWxlY3QodGhpcy5vcHRpb25zLnRhcmdldClcbiAgICAgIC5zZWxlY3RBbGwoJ3N2Zy5ncmV1bGVyJylcbiAgICAgIC5kYXRhKFt0aGlzLm9wdGlvbnNdKTtcblxuICAgIC8vIGVudGVyXG4gICAgdGhpcy5yb290LmVudGVyID0gdGhpcy5yb290LmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZ3JldWxlcicpO1xuXG4gICAgLy8gbWFya2VyIGRlZlxuICAgIHRoaXMucm9vdC5lbnRlclxuICAgICAgLmFwcGVuZCgnc3ZnOmRlZnMnKVxuICAgICAgLmFwcGVuZCgnc3ZnOm1hcmtlcicpXG4gICAgICAuYXR0cignaWQnLCB0aGlzLm1hcmtlcklkKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAnMCAtNSAxMCAxMCcpXG4gICAgICAuYXR0cigncmVmWCcsIDgpXG4gICAgICAuYXR0cignbWFya2VyV2lkdGgnLCA1KVxuICAgICAgLmF0dHIoJ21hcmtlckhlaWdodCcsIDUpXG4gICAgICAuYXR0cignb3JpZW50JywgJ2F1dG8nKVxuICAgICAgLmFwcGVuZCgnc3ZnOnBhdGgnKVxuICAgICAgLmF0dHIoJ2QnLCAnTTAsLTRMMTAsMEwwLDRMMiwwJylcbiAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAnMHB4JylcbiAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAxKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnIzc3NycpO1xuXG4gICAgLy8gdXBkYXRlXG4gICAgdGhpcy5yb290XG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5vcHRpb25zLmhlaWdodCk7XG5cbiAgICAvLyB3cmFwcGVyIGZvciB0aGUgZWRnZXNcbiAgICB0aGlzLmVkZ2VHcm91cCA9IHRoaXMucm9vdFxuICAgICAgLnNlbGVjdEFsbCgnZy5lZGdlcycpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2QuZGF0YV07IH0pO1xuICAgIHRoaXMuZWRnZUdyb3VwXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2VzJyk7XG5cbiAgICAvLyB3cmFwcGVyIGZvciB0aGUgbm9kZXNcbiAgICB0aGlzLm5vZGVHcm91cCA9IHRoaXMucm9vdFxuICAgICAgLnNlbGVjdEFsbCgnZy5ub2RlcycpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2QuZGF0YV07IH0pO1xuICAgIHRoaXMubm9kZUdyb3VwXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGVzJyk7XG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Y29sb3JzfSBmcm9tICcuL2NvbnN0JztcblxuY29uc3QgTk9ERV9ERUZBVUxUX09QVElPTlMgPSB7XG4gIHI6IDEwLFxuICBmaWxsOiAnIzI5ODBCOSdcbn07XG5cbmNvbnN0IEVER0VfREVGQVVMVF9PUFRJT05TID0ge1xuICBzdHJva2U6IGNvbG9ycy5MSUdIVF9HUkFZXG59O1xuXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnIsIGlkKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGFycltpXS5pZCA9PT0gaWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqXG4gKiBcbiAqIEBjbGFzcyBHcmFwaFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKG93bmVyLCBkYXRhKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIHRoaXMubm9kZXMgPSBkYXRhLm5vZGVzO1xuICAgIHRoaXMuZWRnZXMgPSBkYXRhLmxpbmtzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBub2RlIHRvIHRoZSBncmFwaCwgZWFjaCBvZiB0aGUgYXJndW1lbnRzIG11c3RcbiAgICogYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gaWQge051bWJlcnxzdHJpbmd9XG4gICAqXG4gICAqIE9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSB4IHtudW1iZXJ9IFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhpcyBub2RlIGluIHRoZSBncmFwaCAob25seSBpZiBmaXhlZCA9IHRydWUpXG4gICAqIC0geSB7bnVtYmVyfSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgbm9kZSBpbiB0aGUgZ3JhcGggKG9ubHkgaWYgZml4ZWQgPSB0cnVlKVxuICAgKiAtIGZpeGVkIHtib29sZWFufSBgdHJ1ZWAgdG8gbWFrZSB0aGlzIG5vZGUgbm90IHRvIHBhcnRpY2lwYXRlIGluIHRoZSBsYXlvdXQgcHJvY2Vzc1xuICAgKiAtIGZpbGwge3N0cmluZ30gVGhlIGZpbGwgb2YgdGhlIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgdGhlIG5vZGVcbiAgICogLSByIHtudW1iZXJ9IFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgdGhlIG5vZGVcbiAgICogLSBsYWJlbCB7c3RyaW5nfSBUaGUgdGV4dCBpbnNpZGUgdGhlIG5vZGUgKGlmIGl0J3Mgbm90IHByZXNlbnQgaXQncyBlcXVhbCB0byB0aGUgYGlkYClcbiAgICogLSB0b3BSaWdodExhYmVsIHtzdHJpbmddIHRoZSB0ZXh0IHNob3duIG9uIHRoZSB0b3AgcmlnaHQgc2lkZSBvZiB0aGUgbm9kZSwgdXNlZnVsXG4gICAqIHRvIHJlcHJlc2VudCBhZGRpdGlvbmFsIGFubm90YXRpb25zXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBhcmd1bWVudHNcbiAgICovXG4gIGFkZE5vZGUoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcigndGhlIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGAnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdldE5vZGUoY29uZmlnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignbm9kZSBhbHJlYWR5IGluIHN0b3JlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLm5vZGVzLnB1c2goXG4gICAgICAgIEdyYXBoLmFwcGVuZE5vZGVEZWZhdWx0cy5jYWxsKHRoaXMub3duZXIsIGNvbmZpZylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBub2RlIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuICBnZXROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0J5Rm4odiA9PiB2LmlkID09PSBub2RlLmlkKVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgbm9kZXMgdGhhdCBzYXRpc2Z5IHRoZSBwYXJhbWV0ZXIgYGZuYCxcbiAgICogYWxpYXMgZm9yIGB0aGlzLm5vZGVzLmZpbHRlcihmbilgXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldE5vZGVzQnlGbihmbikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLmZpbHRlcihmbik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGFkamFjZW50IG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEFkamFjZW50Tm9kZXMobm9kZSkge1xuICAgIHZhciBhZGphY2VudE5vZGVzID0gW107XG4gICAgdmFyIHRha2VuID0ge307XG4gICAgdmFyIG5leHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV07XG4gICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIGlmIChlZGdlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS50YXJnZXQ7XG4gICAgICB9IGVsc2UgaWYgKGVkZ2UudGFyZ2V0LmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnNvdXJjZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZTtcbiAgICAgICAgYWRqYWNlbnROb2Rlcy5wdXNoKG5leHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZGphY2VudE5vZGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBzdWNjZXNzb3Igbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0U3VjY2Vzc29yTm9kZXMobm9kZSkge1xuICAgIHZhciBzdWNjZXNzb3IgPSBbXTtcbiAgICB2YXIgdGFrZW4gPSB7fTtcbiAgICB2YXIgbmV4dDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXTtcbiAgICAgIG5leHQgPSBudWxsO1xuICAgICAgaWYgKGVkZ2Uuc291cmNlLmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnRhcmdldDtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWU7XG4gICAgICAgIHN1Y2Nlc3Nvci5wdXNoKG5leHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzb3I7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHByZWRlY2Vzc29yIG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldFByZWRlY2Vzc29yTm9kZXMobm9kZSkge1xuICAgIHZhciBwcmVkZWNlc3NvciA9IFtdO1xuICAgIHZhciB0YWtlbiA9IHt9O1xuICAgIHZhciBuZXh0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldO1xuICAgICAgbmV4dCA9IG51bGw7XG4gICAgICBpZiAoZWRnZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2Uuc291cmNlO1xuICAgICAgfVxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZTtcbiAgICAgICAgcHJlZGVjZXNzb3IucHVzaChuZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3I7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICovXG4gIHJlbW92ZU5vZGUobm9kZSkge1xuICAgIHRoaXMucmVtb3ZlTm9kZXNCeUZuKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdi5pZCA9PT0gbm9kZS5pZDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgbm9kZXMgc3RvcmVkIGluIGBub2Rlc2AsXG4gICAqIGVhY2ggb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBub2Rlc1xuICAgKi9cbiAgcmVtb3ZlTm9kZXMobm9kZXMpIHtcbiAgICAvLyBUT0RPOiBpbXByb3ZlIG5eMiByZW1vdmFsXG4gICAgdGhpcy5yZW1vdmVOb2Rlc0J5Rm4oZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiBpbmNsdWRlcyhub2Rlcywgdi5pZCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIG5vZGVzIHRoYXQgc2F0aXNmeSB0aGUgcHJlZGljYXRlXG4gICAqIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG4gIHJlbW92ZU5vZGVzQnlGbihmbikge1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZm4odGhpcy5ub2Rlc1tpXSwgaSkpIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5vZGVzXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIC8vIHJlbW92ZSBpbmNpZGVudCBlZGdlc1xuICAgICAgICB0aGlzLnJlbW92ZUVkZ2VzKFxuICAgICAgICAgIHRoaXMuZ2V0SW5jaWRlbnRFZGdlcyhub2RlWzBdKVxuICAgICAgICApO1xuICAgICAgICBpIC09IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZWRnZSB0byB0aGUgZ3JhcGgsIGVhY2ggb2YgdGhlIGFyZ3VtZW50cyBtdXN0XG4gICAqIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllc1xuICAgKlxuICAgKiBSZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gc291cmNlIHtudW1iZXJ8T2JqZWN0fSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlIG9yIHRoZSBzb3VyY2Ugbm9kZSBpdHNlbGZcbiAgICogLSB0YXJnZXQge251bWJlcnxPYmplY3R9IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGUgb3IgdGhlIHRhcmdldCBub2RlIGl0c2VsZlxuICAgKlxuICAgKiBPcHRpb25hbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gaWQge3N0cmluZ3xPYmplY3R9IElmIGFuIGlkIGlzIG5vdCBwcm92aWRlZCBhbiBhdXRvIGdlbmVyYXRlZCBzdHJpbmcgd2lsbCBiZSBhc3NpZ25lZFxuICAgKiB0byB0aGlzIGVkZ2VcbiAgICogLSBzdHJva2Uge3N0cmluZ30gVGhlIHN0cm9rZSBvZiB0aGUgcGF0aCB0aGF0IHJlcHJlc2VudHMgdGhlIGVkZ2VcbiAgICogLSB3ZWlnaHQge3N0cmluZ30gVGhlIHdlaWdodCBvZiB0aGUgZWRnZVxuICAgKiAtIGRpcmVjdGVkIHtib29sZWFufSBJZiBzZXQgdG8gdHJ1ZSBhbiBhZGRpdGlvbmFsIGFycm93IGlzIGFkZGVkIGF0IHRoZSBlbmQgb2YgdGhlIGVkZ2VcbiAgICpcbiAgICogTk9URTogdGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgKi9cbiAgYWRkRWRnZSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoJ3NvdXJjZScpIHx8ICFjb25maWcuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0aGUgZWRnZSBtdXN0IGhhdmUgdGhlIHByb3BlcnRpZXMgYHNvdXJjZWAgYW5kIGB0YXJnZXRgJyk7XG4gICAgICB9XG4gICAgICB2YXIgc291cmNlID0gY29uZmlnLnNvdXJjZTtcbiAgICAgIHZhciB0YXJnZXQgPSBjb25maWcudGFyZ2V0O1xuXG4gICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgc291cmNlID0gdGhpcy5nZXROb2RlKHsgaWQ6IGNvbmZpZy5zb3VyY2UgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmdldE5vZGUoeyBpZDogY29uZmlnLnRhcmdldCB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzb3VyY2UgfHwgIXRhcmdldCkge1xuICAgICAgICB0aHJvdyBFcnJvcignbmV3IGVkZ2UgZG9lcyBub3Qgam9pbiBleGlzdGluZyB2ZXJ0aWNlcycpO1xuICAgICAgfVxuICAgICAgY29uZmlnLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIGNvbmZpZy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICB0aGlzLmVkZ2VzLnB1c2goXG4gICAgICAgIEdyYXBoLmFwcGVuZEVkZ2VEZWZhdWx0cy5jYWxsKHRoaXMub3duZXIsIGNvbmZpZylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gZWRnZSBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlZGdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZWRnZS5pZCBUaGUgaWQgb2YgdGhlIGVkZ2VcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldEVkZ2UoZWRnZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihlID0+IGUuaWQgPT09IGVkZ2UuaWQpWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBkaXJlY3RlZCBlZGdlcyBmcm9tIHRoZSBub2RlIHdob3NlIGlkIGlzXG4gICAqIGBvcHRpb25zLnNvdXJjZWAgYW5kIHRvIHRoZSBub2RlIHdob3NlIGlkIGlzIGBvcHRpb25zLnRhcmdldGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnNvdXJjZSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy50YXJnZXQgVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRFZGdlc0JldHdlZW4ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUuc291cmNlLmlkID09PSBvcHRpb25zLnNvdXJjZSAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy50YXJnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIGZyb20gYG9wdGlvbnMuc291cmNlYCB0byBgb3B0aW9ucy50YXJnZXRgXG4gICAqIG9yIGBvcHRpb25zLnRhcmdldGAgdG8gYG9wdGlvbnMuc291cmNlYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMuc291cmNlIFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnRhcmdldCBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEFsbEVkZ2VzQmV0d2VlbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gKGUuc291cmNlLmlkID09PSBvcHRpb25zLnNvdXJjZSAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy50YXJnZXQpIHx8XG4gICAgICAgIChlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy50YXJnZXQgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMuc291cmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGVkZ2UgaWRlbnRpZmllZCBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWRnZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVkZ2UuaWQgVGhlIGlkIG9mIHRoZSBlZGdlXG4gICAqL1xuICByZW1vdmVFZGdlKGVkZ2UpIHtcbiAgICB0aGlzLnJlbW92ZUVkZ2VzQnlGbihlID0+IGUuaWQgPT09IGVkZ2UuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBlZGdlcyBzdG9yZWQgaW4gYGVkZ2VzYCxcbiAgICogZWFjaCBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGVkZ2VzXG4gICAqL1xuICByZW1vdmVFZGdlcyhlZGdlcykge1xuICAgIC8vIFRPRE86IGltcHJvdmUgbl4yIHJlbW92YWxcbiAgICB0aGlzLnJlbW92ZUVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzKGVkZ2VzLCBlLmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgZWRnZXMgdGhhdCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHByZWRpY2F0ZVxuICAgKiBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gICAqL1xuICByZW1vdmVFZGdlc0J5Rm4oZm4pIHtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGZuKHRoaXMuZWRnZXNbaV0sIGkpKSB7XG4gICAgICAgIHRoaXMuZWRnZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpIC09IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyB0aGF0IHJldHVybiB0cnVlIGZvciB0aGUgcHJlZGljYXRlIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0RWRnZXNCeUZuKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZXMuZmlsdGVyKGZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgb3V0Z29pbmcgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldE91dGdvaW5nRWRnZXMobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbigoZSkgPT4gZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBpbmNvbWluZyBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0SW5jb21pbmdFZGdlcyhub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKChlKSA9PiBlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGluY2lkZW50IGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRJbmNpZGVudEVkZ2VzKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpXG4gICAgICAuY29uY2F0KHRoaXMuZ2V0SW5jb21pbmdFZGdlcyhub2RlKSk7XG4gIH1cblxuICAvKipcbiAgICogRmFjYWRlIHRvIGFkZCBub2Rlcy9lZGdlc1xuICAgKlxuICAgKiBOT1RFOiB0aGUgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBwYXJhbWV0ZXJzXG4gICAqL1xuICBhZGQoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbCA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIC8vIGFzc3VtZSB0aGF0IGVkZ2VzIGhhdmUgYSBzb3VyY2UvdGFyZ2V0IHBhcmFtZXRlclxuICAgICAgaWYgKGVsLmhhc093blByb3BlcnR5KCdzb3VyY2UnKSAmJiBlbC5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0JykpIHtcbiAgICAgICAgdGhpcy5hZGRFZGdlKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkTm9kZShlbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5vZGVEZWZhdWx0cyh2KSB7XG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICB2LmlkID0gdXRpbC5pZCgpO1xuICAgIH1cblxuICAgIHYgPSBleHRlbmQoXG4gICAgICB7fSxcbiAgICAgIC8vIHByZWRlZmluZWQgZGVmYXVsdHNcbiAgICAgIE5PREVfREVGQVVMVF9PUFRJT05TLFxuICAgICAgLy8gaW5zdGFuY2UgZGVmYXVsdHNcbiAgICAgIHRoaXMub3B0aW9ucy5ub2RlRGVmYXVsdHMsXG4gICAgICAvLyBub2RlXG4gICAgICB2XG4gICAgKTtcblxuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSkge1xuICAgICAgdi53aWR0aCA9IDIgKiB2LnI7XG4gICAgfVxuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnaGVpZ2h0JykpIHtcbiAgICAgIHYuaGVpZ2h0ID0gMiAqIHYucjtcbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kRWRnZURlZmF1bHRzKGUpIHtcbiAgICBpZiAoIWUuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIGUuaWQgPSB1dGlsLmlkKCk7XG4gICAgfVxuICAgIGUgPSBleHRlbmQoXG4gICAgICB7fSxcbiAgICAgIC8vIHByZWRlZmluZWQgZGVmYXVsdHNcbiAgICAgIEVER0VfREVGQVVMVF9PUFRJT05TLFxuICAgICAgLy8gaW5zdGFuY2UgZGVmYXVsdHNcbiAgICAgIHRoaXMub3B0aW9ucy5lZGdlRGVmYXVsdHMsXG4gICAgICAvLyBlZGdlXG4gICAgICBlXG4gICAgKTtcbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcmFuZG9tIGdyYXBoIHdpdGggdGhlIGZvbGxvd2luZyBkZWZhdWx0cyBvcHRpb25zIG92ZXJyaWRkZW4gYnkgYG9wdGlvbnNgOlxuICAgKlxuICAgKiAtIG9wdGlvbnMub3JkZXI9MTAge251bWJlcn0gVGhlIG51bWJlciBvZiBub2RlcyBpbiB0aGUgZ3JhcGhcbiAgICogLSBvcHRpb25zLnNpemU9MTUge251bWJlcn0gVGhlIG51bWJlciBvZiBlZGdlcyBpbiB0aGUgZ3JhcGhcbiAgICogLSBvcHRpb25zLmNvbm5lY3RlZD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBtYWtlIHRoZSBncmFwaCBjb25uZWN0ZWQsXG4gICAqIGl0J3MgZ3VhcmFudGVlZCB0byBoYXZlIGF0IGxlYXN0IGBvcHRpb25zLm9yZGVyIC0gMWAgZWRnZXNcbiAgICogLSBvcHRpb25zLm11bHRpR3JhcGg9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIHBhcmFsbGVsIGVkZ2VzXG4gICAqIC0gb3B0aW9ucy5wc2V1ZG9HcmFwaD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgbG9vcCBlZGdlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7e25vZGVzOiBBcnJheSwgbGlua3M6IEFycmF5fX1cbiAgICovXG4gIHN0YXRpYyByYW5kb20ob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgb3JkZXI6IDEwLFxuICAgICAgc2l6ZTogMTUsXG4gICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgbXVsdGlHcmFwaDogZmFsc2UsXG4gICAgICBwc2V1ZG9HcmFwaDogZmFsc2VcbiAgICB9LCBvcHRpb25zKTtcblxuICAgIHZhciBpLCB1LCB2O1xuICAgIHZhciBub2RlcyA9IFtdO1xuICAgIHZhciBhZGphY2VuY3lMaXN0ID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMub3JkZXI7IGkgKz0gMSkge1xuICAgICAgYWRqYWNlbmN5TGlzdFtpXSA9IFtdO1xuICAgICAgbm9kZXMucHVzaCh7IGlkOiBpIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCh1LCB2KSB7XG4gICAgICBhZGphY2VuY3lMaXN0W3VdW3ZdID0gYWRqYWNlbmN5TGlzdFt2XVt1XSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGVkZ2VzID0gW107XG4gICAgaSA9IDA7XG5cbiAgICBpZiAob3B0aW9ucy5jb25uZWN0ZWQpIHtcbiAgICAgIGZvciAoaSA9IDE7IGkgPCBvcHRpb25zLm9yZGVyOyBpICs9IDEpIHtcbiAgICAgICAgdiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpO1xuICAgICAgICBhZGQoaSwgdik7XG4gICAgICAgIGVkZ2VzLnB1c2goe1xuICAgICAgICAgIHNvdXJjZTogaSxcbiAgICAgICAgICB0YXJnZXQ6IHZcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpIC09IDE7XG4gICAgfVxuXG4gICAgZm9yICg7IGkgPCBvcHRpb25zLnNpemU7IGkgKz0gMSkge1xuICAgICAgdSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMub3JkZXIpO1xuICAgICAgdiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMub3JkZXIpO1xuXG4gICAgICBpZiAodSA9PT0gdiAmJiAhb3B0aW9ucy5wc2V1ZG9HcmFwaCkge1xuICAgICAgICBpIC09IDE7XG4gICAgICB9IGVsc2UgaWYgKGFkamFjZW5jeUxpc3RbdV1bdl0gJiYgIW9wdGlvbnMubXVsdGlHcmFwaCkge1xuICAgICAgICBpIC09IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGQodSwgdik7XG4gICAgICAgIGVkZ2VzLnB1c2goe1xuICAgICAgICAgIHNvdXJjZTogdSxcbiAgICAgICAgICB0YXJnZXQ6IHZcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGVzOiBub2RlcyxcbiAgICAgIGxpbmtzOiBlZGdlc1xuICAgIH07XG4gIH1cbn1cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgLy8gdW5hcnlcblxuICBzdGF0aWMgbmVnKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcigtYS54LCAtYS55KTtcbiAgfVxuXG4gIHN0YXRpYyBsZW4oYSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoVmVjdG9yLmxlblNxKGEpKTtcbiAgfVxuXG4gIHN0YXRpYyBsZW5TcShhKSB7XG4gICAgcmV0dXJuIGEueCAqIGEueCArIGEueSAqIGEueTtcbiAgfVxuXG4gIHN0YXRpYyB1bml0KGEpIHtcbiAgICBpZiAoYS54ID09PSAwICYmIGEueSA9PT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBsZW5ndGggb2YgdGhlIHZlY3RvciBpcyAwJyk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbihhKTtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggLyBsZW5ndGgsIGEueSAvIGxlbmd0aCk7XG4gIH1cblxuICBzdGF0aWMgb3J0aG9nb25hbChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoLWEueSwgYS54KTtcbiAgfVxuXG4gIHN0YXRpYyBhbmdsZURlZyhhKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoYS55LCBhLngpICogMTgwIC8gTWF0aC5QSTtcbiAgfVxuXG4vLyBiaW5hcnlcblxuICBzdGF0aWMgYWRkKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKyBiLngsIGEueSArIGIueSk7XG4gIH1cblxuICBzdGF0aWMgc3ViKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggLSBiLngsIGEueSAtIGIueSk7XG4gIH1cblxuICBzdGF0aWMgZG90KGEsIGIpIHtcbiAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55O1xuICB9XG5cbiAgc3RhdGljIHNjYWxlKGEsIG4pIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKiBuLCBhLnkgKiBuKTtcbiAgfVxuXG4gIHN0YXRpYyBtaWQoYSwgYikge1xuICAgIHJldHVybiBWZWN0b3Iuc2NhbGUoVmVjdG9yLmFkZChhLCBiKSwgMC41KTtcbiAgfVxuXG4gIHN0YXRpYyBhbmdsZUJldHdlZW4oYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFjb3MoVmVjdG9yLmRvdChhLCBiKSAvIFZlY3Rvci5sZW4oYSkgLSBWZWN0b3IubGVuKGIpKTtcbiAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG52YXIgY29sb3IgPSBkMy5zY2FsZS5jYXRlZ29yeTIwKCk7XG52YXIgY29sb3JzID0ge307XG52YXIgY29sb3JMaXRlcmFscyA9IFsnQkxVRScsICdPUkFOR0UnLCAnR1JFRU4nLCAnUkVEJywgJ1BVUlBMRScsICdCUk9XTicsICdQSU5LJywgJ0dSQVknLCAnWUVMTE9XJywgJ0NZQU4nXTtcbmNvbG9yTGl0ZXJhbHMuZm9yRWFjaChmdW5jdGlvbiAoYywgaSkge1xuICBjb2xvcnNbY10gPSBjb2xvci5yYW5nZSgpWzIgKiBpXTtcbiAgY29sb3JzWydMSUdIVF8nICsgY10gPSBjb2xvci5yYW5nZSgpWzIgKiBpICsgMV07XG59KTtcblxuY29sb3JzLnJhbmRvbUZyb21QYWxldHRlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY29sb3IucmFuZ2UoKVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCldO1xufTtcblxuZXhwb3J0IHtjb2xvcnN9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vVmVjdG9yJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgb3duZXI7XG5cbiAgZnVuY3Rpb24gc2VsZkxvb3AodSwgbWFyZ2luKSB7XG4gICAgdmFyIGFkamFjZW50ID0gb3duZXIuZ3JhcGguZ2V0QWRqYWNlbnROb2Rlcyh1KTtcbiAgICB2YXIgZGlyID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgdiA9IGFkamFjZW50W2ldO1xuICAgICAgaWYgKHUuaWQgIT09IHYuaWQpIHtcbiAgICAgICAgZGlyID0gVmVjdG9yLnVuaXQoVmVjdG9yLmFkZChcbiAgICAgICAgICBkaXIsXG4gICAgICAgICAgVmVjdG9yLnVuaXQoVmVjdG9yLnN1Yih1LCB2KSlcbiAgICAgICAgKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbm8gYWRqYWNlbnQgdmVydGljZXNcbiAgICBpZiAoZGlyLnggPT09IDAgJiYgZGlyLnkgPT09IDApIHtcbiAgICAgIGRpciA9IFZlY3Rvci51bml0KG5ldyBWZWN0b3IoMCwgLTEpKTtcbiAgICB9XG5cbiAgICB2YXIgayA9IDAuODtcbiAgICB2YXIgdXAgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5zY2FsZShkaXIsIG1hcmdpbiAqIGspKTtcbiAgICB2YXIgbWlkID0gVmVjdG9yLm1pZCh1LCB1cCk7XG4gICAgdmFyIG9ydCA9IFZlY3Rvci5vcnRob2dvbmFsKGRpcik7XG5cbiAgICB2YXIgcmlnaHQgPSBWZWN0b3IuYWRkKG1pZCwgVmVjdG9yLnNjYWxlKG9ydCwgbWFyZ2luIC8gMiAqIGspKTtcbiAgICB2YXIgbGVmdCA9IFZlY3Rvci5hZGQobWlkLCBWZWN0b3Iuc2NhbGUob3J0LCAtbWFyZ2luIC8gMiAqIGspKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbbGVmdCwgdXAsIHJpZ2h0XSxcbiAgICAgIGRpcjogb3J0XG4gICAgfTtcbiAgfVxuICBcbiAgZnVuY3Rpb24geHlPZk9iaihvKSB7XG4gICAgcmV0dXJuIHt4Om8ueCwgeTpvLnl9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGgoZCwgbWV0YSwgbWFyZ2luKSB7XG4gICAgdmFyIHUsIHY7XG4gICAgdmFyIGN1cnJlbnQ7XG5cbiAgICB1ID0gZC5zb3VyY2U7XG4gICAgdiA9IGQudGFyZ2V0O1xuICAgIGlmICh1LmlkID4gdi5pZCkge1xuICAgICAgW3UsIHZdID0gW3YsIHVdO1xuICAgIH1cbiAgICBtZXRhW3UuaWRdID0gbWV0YVt1LmlkXSB8fCB7fTtcblxuICAgIGN1cnJlbnQgPSAobWV0YVt1LmlkXVt2LmlkXSA9IG1ldGFbdS5pZF1bdi5pZF0gfHwge1xuICAgICAgY291bnQ6IDEsXG4gICAgICBtaWQ6IFZlY3Rvci5taWQodSwgdiksXG4gICAgICBkaXJlY3Rpb246IC0xXG4gICAgfSk7XG5cbiAgICB2YXIgaW5uZXJKb2ludHMgPSBbXTtcblxuICAgIGlmICh1LmlkID09PSB2LmlkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgZm9sbG93aW5nIGZvciBzZWxmLWxvb3AgZWRnZXNcbiAgICAgIHZhciBsb29wID0gc2VsZkxvb3AodSwgbWFyZ2luICogdi5yICogKGN1cnJlbnQuY291bnQgKyAxKSk7XG4gICAgICBpbm5lckpvaW50cyA9IGxvb3AucGF0aDtcbiAgICAgIGQudW5pdCA9IGxvb3AuZGlyO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdW5pdDtcbiAgICAgIGlmIChWZWN0b3IubGVuKFZlY3Rvci5zdWIodiwgdSkpKSB7XG4gICAgICAgIHVuaXQgPSBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHYsIHUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaXQgPSBuZXcgVmVjdG9yKDEsIDApO1xuICAgICAgfVxuXG4gICAgICBleHRlbmQoY3VycmVudCwge1xuICAgICAgICB1bml0OiB1bml0LFxuICAgICAgICB1bml0SW52ZXJzZTogVmVjdG9yLm9ydGhvZ29uYWwodW5pdClcbiAgICAgIH0pO1xuICAgICAgaW5uZXJKb2ludHMucHVzaChWZWN0b3IuYWRkKFxuICAgICAgICBjdXJyZW50Lm1pZCxcbiAgICAgICAgVmVjdG9yLnNjYWxlKFxuICAgICAgICAgIGN1cnJlbnQudW5pdEludmVyc2UsXG4gICAgICAgICAgTWF0aC5mbG9vcihjdXJyZW50LmNvdW50IC8gMikgKiBtYXJnaW4gKiB2LnIgKiBjdXJyZW50LmRpcmVjdGlvblxuICAgICAgICApXG4gICAgICApKTtcbiAgICAgIGQudW5pdCA9IGN1cnJlbnQudW5pdDtcbiAgICB9XG5cbiAgICBjdXJyZW50LmNvdW50ICs9IDE7XG4gICAgY3VycmVudC5kaXJlY3Rpb24gKj0gLTE7XG4gICAgXG4gICAgdmFyIHAwID0geHlPZk9iaihkLnNvdXJjZSk7XG4gICAgdmFyIHAxID0geHlPZk9iaihkLnRhcmdldCk7XG4gICAgXG4gICAgdmFyIGl4ID0gaW5uZXJKb2ludHNbMF0ueDtcbiAgICB2YXIgaXkgPSBpbm5lckpvaW50c1swXS55O1xuICAgIFxuICAgIHZhciBhYlAwID0ge1xuICAgICAgeDogaXggLSBwMC54LFxuICAgICAgeTogaXkgLSBwMC55XG4gICAgfTtcbiAgICBcbiAgICB2YXIgZHggPSBwMC54LWl4O1xuICAgIHZhciBkeSA9IHAwLnktaXk7XG4gICAgdmFyIGwgPSBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcbiAgICBcbiAgICB2YXIgbl9hYlAwID0ge1xuICAgICAgeDogYWJQMC54IC8gbCxcbiAgICAgIHk6IGFiUDAueSAvIGxcbiAgICB9O1xuICAgIFxuICAgIHAwID0ge1xuICAgICAgeDogcDAueCArIG5fYWJQMC54ICogZC5zb3VyY2UucixcbiAgICAgIHk6IHAwLnkgKyBuX2FiUDAueSAqIGQuc291cmNlLnJcbiAgICB9O1xuICAgIFxuICAgIHZhciBfbCA9IGlubmVySm9pbnRzLmxlbmd0aCAtIDFcbiAgICBpeCA9IGlubmVySm9pbnRzWyBfbCBdLng7XG4gICAgaXkgPSBpbm5lckpvaW50c1sgX2wgXS55O1xuICAgIFxuICAgIHZhciBhYlAxID0ge1xuICAgICAgeDogcDEueCAtIGl4ICxcbiAgICAgIHk6IHAxLnkgLSBpeVxuICAgIH07XG4gICAgXG4gICAgdmFyIGR4ID0gcDEueC1peDtcbiAgICB2YXIgZHkgPSBwMS55LWl5O1xuICAgIHZhciBsID0gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG4gICAgXG4gICAgdmFyIG5fYWJQMSA9IHtcbiAgICAgIHg6IGFiUDEueCAvIGwsXG4gICAgICB5OiBhYlAxLnkgLyBsXG4gICAgfTtcbiAgICBcbiAgICBwMSA9IHtcbiAgICAgIHg6IHAxLnggLSBuX2FiUDEueCAqIGQudGFyZ2V0LnIsXG4gICAgICB5OiBwMS55IC0gbl9hYlAxLnkgKiBkLnRhcmdldC5yXG4gICAgfTtcbiAgICBcbiAgICBcbiAgICBpbm5lckpvaW50cy51bnNoaWZ0KHAwKTtcbiAgICBpbm5lckpvaW50cy5wdXNoKHAxKTtcbiAgICBcbiAgICBkLnBhdGggPSBpbm5lckpvaW50cztcbiAgICBcbiAgICAvKmQucGF0aCA9IFtkLnNvdXJjZV1cbiAgICAgIC5jb25jYXQoaW5uZXJKb2ludHMpXG4gICAgICAuY29uY2F0KFtkLnRhcmdldF0pOyovXG4gICAgLy9jb25zb2xlLmxvZyhkLnBhdGgpO1xuICB9XG5cbiAgdmFyIGxpbmUgPSBkMy5zdmcubGluZSgpXG4gICAgLngoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueDsgfSlcbiAgICAueShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55OyB9KVxuICAgIC5pbnRlcnBvbGF0ZSgnYmFzaXMnKTtcbiAgICAvLy50ZW5zaW9uKDEuNSlcbiAgICAvLy5pbnRlcnBvbGF0ZSgnYnVuZGxlJyk7XG5cbiAgZnVuY3Rpb24gaW5uZXIoc2VsZWN0aW9uKSB7XG4gICAgLy8gZWRnZXNcbiAgICB2YXIgbGlua3MgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKCdnLmVkZ2UnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubGlua3M7XG4gICAgICB9LCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuICAgIGxpbmtzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiB1dGlscy5ucyhkLmlkKTsgfSlcbiAgICAgIC50cmFuc2l0aW9uKCdlbnRlcicpXG4gICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xuXG4gICAgLy8gdXBkYXRlXG4gICAgbGlua3NcbiAgICAgIC5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZhciBzZWxmID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgY2xzID0ge1xuICAgICAgICAgIGRpcmVjdGVkOiBkLmRpcmVjdGVkIHx8IG93bmVyLm9wdGlvbnMuZGlyZWN0ZWRcbiAgICAgICAgfTtcbiAgICAgICAgY2xzWydzb3VyY2UtJyArIGQuc291cmNlLmlkXSA9IHRydWU7XG4gICAgICAgIGNsc1sndGFyZ2V0LScgKyBkLnRhcmdldC5pZF0gPSB0cnVlO1xuICAgICAgICBzZWxmLmNsYXNzZWQoY2xzKTtcbiAgICAgIH0pO1xuXG4gICAgdmFyIG1ldGEgPSB7fTtcbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICBjcmVhdGVQYXRoKGQsIG1ldGEsIDEuNyk7XG4gICAgfSk7XG5cbiAgICAvLyBwYXRoIGVudGVyXG4gICAgdmFyIHBhdGhzID0gbGlua3Muc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIDEuIHJlYWwgcGF0aFxuICAgICAgICAvLyAyLiBzdHJva2UtZGFzaGFycmF5IGhlbHBlclxuICAgICAgICByZXR1cm4gW2QsIGRdO1xuICAgICAgfSk7XG4gICAgcGF0aHMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignc3Ryb2tlJywgZCA9PiBkLnN0cm9rZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBlbC5hdHRyKCdvcGFjaXR5JywgIWkgPyAxIDogMCk7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgZWwuY2xhc3NlZCgnYmFzZScsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgZWwuYXR0cignc3Ryb2tlLXdpZHRoJywgNSk7XG4gICAgICAgICAgZWwuY2xhc3NlZCgndHJhdmVyc2FsJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8uYXR0cignZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICB2YXIgcGFyZW50ID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKTtcbiAgICAgIC8vICByZXR1cm4gbGluZShbcGFyZW50LnNvdXJjZV0pO1xuICAgICAgLy99KTtcblxuICAgIC8vIHBhdGggdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKHBhdGhzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IGxpbmUoZC5wYXRoKSk7XG5cbiAgICBwYXRocy5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICB2YXIgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKTtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHBhdGguYXR0cignbWFya2VyLWVuZCcsXG4gICAgICAgICAgcGFyZW50LmNsYXNzZWQoJ2RpcmVjdGVkJylcbiAgICAgICAgICAgID8gJ3VybCgjJyArIG93bmVyLm1hcmtlcklkICsgJyknXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHdlaWdodFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgc2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIHZhciBhbmdsZSA9IFZlY3Rvci5hbmdsZURlZyhkLnVuaXQpO1xuICAgICAgICAgIHZhciB2ID0gZC5wYXRoW01hdGguZmxvb3IoZC5wYXRoLmxlbmd0aCAvIDIpXTtcbiAgICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdixcbiAgICAgICAgICAgIHJvdGF0ZTogYW5nbGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHdlaWdodHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkXTsgfSk7XG5cbiAgICAvLyB3ZWlnaHQgZW50ZXJcbiAgICB3ZWlnaHRzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ3RleHQtYWZ0ZXItZWRnZScpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5jYWxsKHdlaWdodFBvc2l0aW9uKTtcblxuICAgIC8vIHdlaWdodCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24od2VpZ2h0cywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC50ZXh0KGQgPT4gZC53ZWlnaHQpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbik7XG5cbiAgICAvLyB3ZWlnaHQgZXhpdFxuICAgIHdlaWdodHMuZXhpdCgpXG4gICAgICAucmVtb3ZlKCk7XG5cbiAgICAvLyBleGl0XG4gICAgbGlua3MuZXhpdCgpXG4gICAgICAucmVtb3ZlKCk7XG4gIH1cblxuICBpbm5lci5vd25lciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG93bmVyO1xuICAgIH1cbiAgICBvd25lciA9IHZhbHVlO1xuICAgIHJldHVybiBpbm5lcjtcbiAgfTtcblxuICByZXR1cm4gaW5uZXI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHdpbmRvdy5kMztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7Y29sb3JzfSBmcm9tICcuLi9jb25zdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgb3duZXI7XG5cbiAgZnVuY3Rpb24gaW5uZXIoc2VsZWN0aW9uKSB7XG4gICAgdmFyIG5vZGVzID0gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGUnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubm9kZXM7XG4gICAgICB9LCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuXG4gICAgdmFyIGxheW91dCA9IG93bmVyLmxheW91dDtcblxuICAgIHZhciBnID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuICdub2RlICcgKyAoZC5jbGFzcyB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpOyB9KVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oeyB0cmFuc2xhdGU6IGQgfSk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYgKCFlbC5vdmVyKSB7XG4gICAgICAgICAgZWwuc3R5bGUoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwub3ZlciA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBlbC5vdmVyID0gZmFsc2U7XG4gICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCBudWxsKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApO1xuICAgIGcudHJhbnNpdGlvbignZW50ZXInKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKTtcbiAgICBnLmNhbGwobGF5b3V0LmRyYWcpO1xuXG4gICAgdmFyIGRyYWdTdGFydCA9IGxheW91dC5kcmFnKCkub24oJ2RyYWdzdGFydC5kM2FkYXB0b3InKTtcbiAgICB2YXIgZHJhZ0VuZCA9IGxheW91dC5kcmFnKCkub24oJ2RyYWdlbmQuZDNhZGFwdG9yJyk7XG4gICAgbGF5b3V0LmRyYWcoKVxuICAgICAgLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBkcmFnU3RhcnQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgfSlcbiAgICAgIC5vbignZHJhZ2VuZC5kM2FkYXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG93bmVyLm5vZGVEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBkcmFnRW5kLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuXG4gICAgZy5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAuYXR0cignZmlsbCcsIChkKSA9PiBkLmZpbGwpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBkLnIgKTtcblxuICAgIC8vIGlubmVyIGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ2xhYmVsJywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3doaXRlJylcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnMTJweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5hdHRyKCd5JywgKGQpID0+IGQuaGVpZ2h0IC8gNCk7XG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0LmxhYmVsJylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgnbGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5sYWJlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuXG4gICAgLy8gdG9wLXJpZ2h0IGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ291dGVyLXRvcC1yaWdodCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsIGNvbG9ycy5CTFVFKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgIC5hdHRyKCd4JywgZCA9PiBkLndpZHRoIC8gMiAtIDIpXG4gICAgICAuYXR0cigneScsIGQgPT4gLWQuaGVpZ2h0IC8gMiArIDMpO1xuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5vdXRlci10b3AtcmlnaHQnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCd0b3BSaWdodExhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9wUmlnaHRMYWJlbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAvLyB0b3AtbGVmdCBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdvdXRlci10b3AtbGVmdCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsIGNvbG9ycy5CTFVFKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAuYXR0cigneCcsIGQgPT4gLWQud2lkdGggLyAyIC0gMilcbiAgICAgIC5hdHRyKCd5JywgZCA9PiAtZC5oZWlnaHQgLyAyICsgMyk7XG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0Lm91dGVyLXRvcC1sZWZ0JylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgndG9wUmlnaHRMYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLnRvcExlZnRMYWJlbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAvLyB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24obm9kZXMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7XG4gICAgICAgICAgdHJhbnNsYXRlOiBkXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBleGl0XG4gICAgbm9kZXMuZXhpdCgpXG4gICAgICAucmVtb3ZlKCk7XG4gIH1cblxuICBpbm5lci5vd25lciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG93bmVyO1xuICAgIH1cbiAgICBvd25lciA9IHZhbHVlO1xuICAgIHJldHVybiBpbm5lcjtcbiAgfTtcblxuICByZXR1cm4gaW5uZXI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwb2x5ZmlsbHMgZnJvbSAnLi9wb2x5ZmlsbHMnO1xucG9seWZpbGxzKCk7XG5cbnZhciBkMyA9IHdpbmRvdy5kMztcblxuLy8gbm9kZVxuaW1wb3J0IERyYXcgZnJvbSAnLi9EcmF3JztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcblxudmFyIGluc3RhbmNlcyA9IFtdO1xuXG5mdW5jdGlvbiBydW4ob3B0aW9ucykge1xuICBmdW5jdGlvbiBmYWN0b3J5KG9wdGlvbnMpIHtcbiAgICB2YXIgZWwgPSBkMy5zZWxlY3Qob3B0aW9ucy50YXJnZXQpO1xuICAgIHZhciBpZCA9IGVsLmF0dHIoJ2dyZXVsZXItaWQnKTtcbiAgICBpZiAoIWlkKSB7XG4gICAgICBpZCA9IHV0aWxzLmlkKCk7XG4gICAgICBlbC5hdHRyKCdncmV1bGVyLWlkJywgaWQpO1xuICAgICAgaW5zdGFuY2VzW2lkXSA9IG5ldyBEcmF3KGlkLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlc1tpZF07XG4gIH1cblxuICByZXR1cm4gZmFjdG9yeShvcHRpb25zKTtcbn1cblxuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnO1xucnVuLkdyYXBoID0gR3JhcGg7XG5cbmltcG9ydCB7Y29sb3JzfSBmcm9tICcuL2NvbnN0JztcbnJ1bi5jb2xvcnMgPSBjb2xvcnM7XG5cbmltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXIvaW5kZXgnO1xucnVuLnBsYXllciA9IHBsYXllcjtcblxuZXhwb3J0IGRlZmF1bHQgcnVuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihhY3Rpb25zLCBzcGVlZCkge1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuXG4gICAgLy8gc3RhdGVzXG4gICAgdGhpcy50aW1lciA9IG51bGw7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5hY3Rpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuaW5kZXgrK10oKTtcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMucGxheS5iaW5kKHRoaXMpLCB0aGlzLnNwZWVkKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlLCBzcGVlZCkge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQgfHwgaW5zdGFuY2Uub3B0aW9ucy5hbmltYXRpb25UaW1lO1xuICAgIHRoaXMuZm4gPSBudWxsO1xuICAgIHRoaXMudGltZXIgPSBudWxsO1xuICB9XG5cbiAgcnVuKGZuKSB7XG4gICAgdGhpcy5mbiA9IGZuKHRoaXMuaW5zdGFuY2UpO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgcnVuQW5pbWF0aW9uKGFuaW1hdGlvbikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFuaW1hdGlvbikpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb24uZm9yRWFjaCh0aGlzLnJ1bkFuaW1hdGlvbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhbmltYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb24odGhpcy5pbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSB0aGlzLmluc3RhbmNlW2FuaW1hdGlvbi50eXBlXTtcbiAgICByZXR1cm4gdHlwZVthbmltYXRpb24ub3BdLmFwcGx5KHR5cGUsIGFuaW1hdGlvbi5hcmdzIHx8IFtdKTtcbiAgfVxuXG4gIHBsYXkodmFsdWUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG5leHQgPSB0aGlzLmZuLm5leHQodmFsdWUpO1xuICAgIGlmICghbmV4dC5kb25lKSB7XG4gICAgICB2YXIgZGVsYXkgPSB0aGlzLnNwZWVkO1xuICAgICAgdmFyIHJ1bkFuaW1hdGlvblZhbHVlID0gdGhpcy5ydW5BbmltYXRpb24obmV4dC52YWx1ZSk7XG4gICAgICBpZiAocnVuQW5pbWF0aW9uVmFsdWUgJiYgdHlwZW9mIHJ1bkFuaW1hdGlvblZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodHlwZW9mIHJ1bkFuaW1hdGlvblZhbHVlLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGRlbGF5ID0gcnVuQW5pbWF0aW9uVmFsdWUuZGVsYXk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy50aW1lciA9IHdpbmRvdy5yZXF1ZXN0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYucGxheShuZXh0LnZhbHVlKTtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB3aW5kb3cuY2xlYXJSZXF1ZXN0VGltZW91dCh0aGlzLnRpbWVyKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRml4ZWQgZnJvbSAnLi9GaXhlZCc7XG5pbXBvcnQgR2VuZXJhdG9yIGZyb20gJy4vR2VuZXJhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBGaXhlZEludGVydmFsOiBGaXhlZCxcbiAgR2VuZXJhdG9yOiBHZW5lcmF0b3Jcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLyplc2xpbnQtZGlzYWJsZSAqL1xuICAoZnVuY3Rpb24oZG9jLCBwcm90bykge1xuICAgIHRyeSB7IC8vIGNoZWNrIGlmIGJyb3dzZXIgc3VwcG9ydHMgOnNjb3BlIG5hdGl2ZWx5XG4gICAgICBkb2MucXVlcnlTZWxlY3RvcignOnNjb3BlIGJvZHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHsgLy8gcG9seWZpbGwgbmF0aXZlIG1ldGhvZHMgaWYgaXQgZG9lc24ndFxuICAgICAgWydxdWVyeVNlbGVjdG9yJywgJ3F1ZXJ5U2VsZWN0b3JBbGwnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICB2YXIgbmF0aXZlID0gcHJvdG9bbWV0aG9kXTtcbiAgICAgICAgcHJvdG9bbWV0aG9kXSA9IGZ1bmN0aW9uKHNlbGVjdG9ycykge1xuICAgICAgICAgIGlmICgvKF58LClcXHMqOnNjb3BlLy50ZXN0KHNlbGVjdG9ycykpIHsgLy8gb25seSBpZiBzZWxlY3RvcnMgY29udGFpbnMgOnNjb3BlXG4gICAgICAgICAgICB2YXIgaWQgPSB0aGlzLmlkOyAvLyByZW1lbWJlciBjdXJyZW50IGVsZW1lbnQgaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSAnSURfJyArIERhdGUubm93KCk7IC8vIGFzc2lnbiBuZXcgdW5pcXVlIGlkXG4gICAgICAgICAgICBzZWxlY3RvcnMgPSBzZWxlY3RvcnMucmVwbGFjZSgvKChefCwpXFxzKik6c2NvcGUvZywgJyQxIycgKyB0aGlzLmlkKTsgLy8gcmVwbGFjZSA6c2NvcGUgd2l0aCAjSURcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBkb2NbbWV0aG9kXShzZWxlY3RvcnMpO1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkOyAvLyByZXN0b3JlIHByZXZpb3VzIGlkXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlLmNhbGwodGhpcywgc2VsZWN0b3JzKTsgLy8gdXNlIG5hdGl2ZSBjb2RlIGZvciBvdGhlciBzZWxlY3RvcnNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSkod2luZG93LmRvY3VtZW50LCBFbGVtZW50LnByb3RvdHlwZSk7XG5cbiAgLy8gZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qb2VsYW1iZXJ0LzEwMDIxMTZcbiAgLy9cbiAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgc2hpbSBieSBQYXVsIElyaXNoXG4gIC8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuICAgICAgZnVuY3Rpb24oLyogZnVuY3Rpb24gKi8gY2FsbGJhY2ssIC8qIERPTUVsZW1lbnQgKi8gZWxlbWVudCl7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICAvKipcbiAgICogQmVoYXZlcyB0aGUgc2FtZSBhcyBzZXRUaW1lb3V0IGV4Y2VwdCB1c2VzIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHdoZXJlIHBvc3NpYmxlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7aW50fSBkZWxheSBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICB3aW5kb3cucmVxdWVzdFRpbWVvdXQgPSBmdW5jdGlvbihmbiwgZGVsYXkpIHtcbiAgICBpZiggIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICF3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhKHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSkgJiYgLy8gRmlyZWZveCA1IHNoaXBzIHdpdGhvdXQgY2FuY2VsIHN1cHBvcnRcbiAgICAgICF3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgIXdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmbiwgZGVsYXkpO1xuXG4gICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdmFyIGhhbmRsZSA9IHt9O1xuXG4gICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIGRlbHRhID0gY3VycmVudCAtIHN0YXJ0O1xuXG4gICAgICBkZWx0YSA+PSBkZWxheSA/IGZuLmNhbGwoKSA6IGhhbmRsZS52YWx1ZSA9IHJlcXVlc3RBbmltRnJhbWUobG9vcCk7XG4gICAgfVxuXG4gICAgaGFuZGxlLnZhbHVlID0gcmVxdWVzdEFuaW1GcmFtZShsb29wKTtcbiAgICByZXR1cm4gaGFuZGxlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBCZWhhdmVzIHRoZSBzYW1lIGFzIGNsZWFyVGltZW91dCBleGNlcHQgdXNlcyBjYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZSBwb3NzaWJsZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAqIEBwYXJhbSB7aW50fG9iamVjdH0gaGFuZGxlIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgd2luZG93LmNsZWFyUmVxdWVzdFRpbWVvdXQgPSBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lID8gd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDogLyogU3VwcG9ydCBmb3IgbGVnYWN5IEFQSSAqL1xuICAgICAgICAgIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdD8gd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICAgIHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgfTtcbiAgLyplc2xpbnQtZW5hYmxlICovXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKG93bmVyKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIHRoaXMuZ3JhcGggPSBvd25lci5ncmFwaDtcbiAgICB0aGlzLmRlZmF1bHRTdHlsZU9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGdldERlZmF1bHRTdHlsZU9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICBkdXJhdGlvbjogdGhpcy5nZXRBbmltYXRpb25UaW1lKCksXG4gICAgICBzdHJva2U6ICcjRTc0QzNDJ1xuICAgIH0sIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucyk7XG4gIH1cblxuICBnZXRTdHlsZU9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiBleHRlbmQoe30sIHRoaXMuZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucygpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldEFuaW1hdGlvblRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXIub3B0aW9ucy5hbmltYXRpb25UaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgY29sbGVjdGlvbiBvZiBlbGVtZW50cyByZXR1cm5lZCBieSB0aGUgR3JhcGggY2xhc3MgdGhpcyBtZXRob2RzIHJldHVybnNcbiAgICogdGhlIGQzIHNlbGVjdGlvbiB0aGF0IGZvciBhbGwgdGhvc2Ugb2JqZWN0c1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfE9iamVjdH0gZWxzIEFuIGFycmF5IG9mIGVkZ2VzL25vZGVzIG9yIGEgc2luZ2xlIGVkZ2Uvbm9kZVxuICAgKiBAcmV0dXJuIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBzZWxlY3QoZWxzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVscykpIHtcbiAgICAgIGVscyA9IFtlbHNdO1xuICAgIH1cbiAgICBpZiAoIWVscy5sZW5ndGgpIHtcbiAgICAgIGVscy5wdXNoKHsgaWQ6IC0xIH0pO1xuICAgIH1cbiAgICBlbHMgPSBlbHMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIHJldHVybiB0aGlzLm93bmVyLnJvb3Quc2VsZWN0QWxsKFxuICAgICAgZWxzLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gJyMnICsgdXRpbHMubnMoZS5pZCk7XG4gICAgICB9KS5qb2luKCcsICcpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSBwYXRoIGluc2lkZSB0aGUgdGFnIDxnPiB0aGF0IHJlcHJlc2VudHMgYW4gZWRnZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqL1xuICBpbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdwYXRoLmJhc2UnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSBjaXJjbGUgaW5zaWRlIHRoZSB0YWcgPGc+IHRoYXQgcmVwcmVzZW50cyBhIG5vZGVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKi9cbiAgaW5uZXJOb2RlU2VsZWN0b3Ioc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgnY2lyY2xlJyk7XG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkMyA9IHdpbmRvdy5kMztcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IEdyYXBoIGZyb20gJy4vR3JhcGgnO1xuXG52YXIgSElHSExJR0hUID0gJ2hpZ2hsaWdodCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbiBleHRlbmRzIEdyYXBoIHtcblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIG9mIHRoZSBncmFwaFxuICAgKlxuICAgKiBAcmV0dXJucyB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgZ2V0RWRnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmVkZ2VzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIG5vZGVzIG9mIHRoZSBncmFwaFxuICAgKlxuICAgKiBAcmV0dXJucyB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgZ2V0Tm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLm5vZGVzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyBhIG5vZGUgdGVtcG9yYXJpbHksIGl0IGNvbnNpc3RzIG9mIHR3b1xuICAgKiBjaGFpbmVkIHRyYW5zaXRpb25zXG4gICAqXG4gICAqIC0gaW5jcmVhc2UgdGhlIHJhZGl1cyB0byAxLjV4IHRoZSBvcmlnaW5hbCBgcmAgdmFsdWVcbiAgICogLSBkZWNyZWFzZSB0aGUgcmFkaXVzIHRvIHRoZSBvcmlnaW5hbCBgcmAgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIGRvVGVtcG9yYWxIaWdobGlnaHROb2RlKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBvcHRpb25zLnIgfHwgKGQuciAqIDEuNSkpXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gZC5yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIGFuIGVkZ2UgdGVtcG9yYXJpbHksIGl0IGNvbnNpc3RzIG9mIHR3b1xuICAgKiBjaGFpbmVkIHRyYW5zaXRpb25zXG4gICAqXG4gICAqIC0gY2hhbmdlIHRoZSBzdHJva2Ugb2YgdGhlIGBwYXRoYCB0aGF0IHJlcHJlc2VudHMgdGhlIGVkZ2UgdG9cbiAgICogYG9wdGlvbnMuc3Ryb2tlYFxuICAgKiAtIGNoYW5nZSB0aGUgc3Ryb2tlIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgKGQpID0+IGQuc3Ryb2tlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFZGdlIHRyYXZlcnNhbCBhbmltYXRpb24sIGl0IGFuaW1hdGVzIGEgaGlkZGVuIHBhdGggZ2l2aW5nIHRoZSBpbXByZXNzaW9uXG4gICAqIG9mIG1vdmVtZW50LCBpZiBzb3VyY2UgaXMgZ2l2ZW4gdGhlbiBpdCB3aWxsIGFsd2F5cyBzdGFydCB0aGUgYW5pbWF0aW9uXG4gICAqIGZyb20gdGhlIG5vZGUgYHNvdXJjZWAgZXZlbiBpZiB0aGUgZWRnZSBpcyBhbiBpbmNvbWluZyBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtjb25maWd9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzb3VyY2U9LTFdXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgdHJhdmVyc2VFZGdlV2l0aERpcmVjdGlvbihzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSA9IC0xKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgncGF0aC50cmF2ZXJzYWwnKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpO1xuICAgICAgICBlbFxuICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIGAke2x9ICR7bH1gKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIGwpXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKTtcbiAgICAgIH0pXG4gICAgICAudHJhbnNpdGlvbignZGFzaGFycmF5JylcbiAgICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uKVxuICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgICAgdmFyIHR3aWNlTGVuZ3RoID0gbGVuZ3RoICogMjtcbiAgICAgICAgdmFyIGxlbmd0aFRvTW92ZSA9IDA7XG4gICAgICAgIGlmIChzb3VyY2UgIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGQudGFyZ2V0LmlkID09PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICBsZW5ndGhUb01vdmUgPSB0d2ljZUxlbmd0aCAtIGxlbmd0aFRvTW92ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZW5ndGhUb01vdmU7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBlbC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgbnVsbClcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHRyYXZlcnNlRWRnZXMoc2VsZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIGtlZXBTdHJva2U6IHRydWUsXG4gICAgICByZXZlcnNlOiBmYWxzZVxuICAgIH0sIHRoaXMuZ2V0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpO1xuXG4gICAgc2VsZWN0aW9uLmNhbGwodGhpcy50cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UpO1xuICAgIGlmIChvcHRpb25zLmtlZXBTdHJva2UpIHtcbiAgICAgIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgICAudHJhbnNpdGlvbigndXBkYXRlJylcbiAgICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbik7XG4gIH1cblxuICBnZXROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0Tm9kZShub2RlKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0RWRnZShlZGdlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEVkZ2UoZWRnZSkpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRlbXBvcmFsIGhpZ2hsaWdodFxuXG4gIGhpZ2hsaWdodE5vZGUobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHROb2RlKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXROb2RlKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIGhpZ2hsaWdodEVkZ2UoZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0RWRnZShlZGdlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBoaWdobGlnaHRJbmNpZGVudEVkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY2lkZW50RWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgaGlnaGxpZ2h0T3V0Z29pbmdFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIGhpZ2hsaWdodEluY29taW5nRWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jb21pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBnaXZlbiBhIG5vZGVcblxuICB0cmF2ZXJzZU91dGdvaW5nRWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE91dGdvaW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgdHJhdmVyc2VJbmNvbWluZ0VkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIHRyYXZlcnNlSW5jaWRlbnRFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICAvLyB0cmF2ZXJzYWwgb2YgYW4gZWRnZSBiZXR3ZWVuIHR3byBub2Rlc1xuXG4gIHRyYXZlcnNlRWRnZXNCZXR3ZWVuKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QoXG4gICAgICAgIHRoaXMuZ3JhcGguZ2V0RWRnZXNCZXR3ZWVuKGVkZ2UpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucyksXG4gICAgICBlZGdlLnNvdXJjZVxuICAgICk7XG4gIH1cblxuICB0cmF2ZXJzZUFsbEVkZ2VzQmV0d2VlbihlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KFxuICAgICAgICB0aGlzLmdyYXBoLmdldEFsbEVkZ2VzQmV0d2VlbihlZGdlKVxuICAgICAgKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpLFxuICAgICAgZWRnZS5zb3VyY2VcbiAgICApO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBsY2cgZnJvbSAnY29tcHV0ZS1sY2cnO1xuXG52YXIgcmFuZCA9IGxjZygxKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBuID0gcmFuZCgpO1xuICAgIHZhciBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IobiAqIDI2KSArIDk3KTtcbiAgICByZXR1cm4gbGV0dGVyICsgbi50b1N0cmluZygxNikuc3Vic3RyKDIpO1xuICB9LFxuXG4gIHRyYW5zZm9ybTogZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgc3RyID0gYGA7XG4gICAgaWYgKCd0cmFuc2xhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHRyYW5zbGF0ZSgke28udHJhbnNsYXRlLnh9LCAke28udHJhbnNsYXRlLnl9KWA7XG4gICAgfVxuICAgIGlmICgncm90YXRlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCByb3RhdGUoJHtvLnJvdGF0ZX0pYDtcbiAgICB9XG4gICAgaWYgKCdzY2FsZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgc2NhbGUoJHtvLnNjYWxlfSlgO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9LFxuXG4gIHRyYW5zaXRpb246IGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAudHJhbnNpdGlvbignbGF5b3V0JylcbiAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAuZWFzZSgnbGluZWFyJyk7XG4gIH0sXG5cbiAgY29uZGl0aW9uYWxUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZWwsIGNvbmRpdGlvbikge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zaXRpb24oZWwpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH0sXG5cbiAgbnM6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gJ2dyZXVsZXItJyArIHN0cjtcbiAgfVxufTtcbiJdfQ==
