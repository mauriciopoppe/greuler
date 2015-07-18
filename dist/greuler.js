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
    //var uBorderOriginTwice = Vector.scale(dir, u.r * 2);
    // uD is now in the edge of the circle, making a little arc in the circle

    // endpoints of the edge will have a separation of 10 deg, 30 deg, 50 deg, ...
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
   * Creates the points of the <path> that represent an ege
   *
   * @param {Object} d
   * @param {Object} meta Holds info about the
   * @param marginBetweenEdges
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
  //.interpolate('linear');

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL0RyYXcuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2NvbnN0LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvZWxlbWVudHMvZWRnZS5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9GaXhlZC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wb2x5ZmlsbHMuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbi5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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NUI7QUFDRCxXQUFPLEVBQUUsQ0FBQztHQUNYOztBQUVELElBQUUsRUFBRSxZQUFVLEdBQUcsRUFBRTtBQUNqQixXQUFPLFVBQVUsR0FBRyxHQUFHLENBQUM7R0FDekI7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbipcbipcdENPTVBVVEU6IGxjZ1xuKlxuKlxuKlx0REVTQ1JJUFRJT046XG4qXHRcdC0gQSBsaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIChsY2cpLlxuKlxuKlxuKlx0Tk9URVM6XG4qXHRcdFsxXSBCYXNlZCBvbiBXLiBQcmVzcywgZXQgYWwuLCBOdW1lcmljYWwgUmVjaXBlcyBpbiBDICgyZCBlZC4gMTk5MilcbipcbipcbipcdFRPRE86XG4qXHRcdFsxXVxuKlxuKlxuKlx0TElDRU5TRTpcbipcdFx0TUlUXG4qXG4qXHRDb3B5cmlnaHQgKGMpIDIwMTQuIHJnaXp6LlxuKlxuKlxuKlx0QVVUSE9SOlxuKlx0XHRyZ2l6ei4gZ3p0b3duMjIxNkB5YWhvby5jb20uIDIwMTQuXG4qXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFZBUklBQkxFUyAvL1xuXG52YXIgTUFTSyA9IDEyMzQ1OTg3Nixcblx0TSA9IDIxNDc0ODM2NDcsXG5cdEEgPSAxNjgwNztcblxuXG4vLyBMQ0cgLy9cblxuLyoqXG4qIEZVTkNUSU9OOiBsY2coIFtzZWVkXSApXG4qXHRSZXR1cm5zIGEgbGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci4gSWYgbm90IHByb3ZpZGVkIGEgc2VlZCwgYSBzZWVkIGlzIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgY3VycmVudCB0aW1lLlxuKlxuKiBAcGFyYW0ge051bWJlcn0gW3NlZWRdIC0gcmFuZG9tIG51bWJlciBnZW5lcmF0b3Igc2VlZFxuKiBAcmV0dXJucyB7RnVuY3Rpb259IGdlbmVyYXRvclxuKi9cbmZ1bmN0aW9uIGxjZyggdmFsICkge1xuXHR2YXIgc2VlZDtcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdGlmICggdHlwZW9mIHZhbCAhPT0gJ251bWJlcicgfHwgdmFsICE9PSB2YWwgfHwgdmFsICUgMSAhPT0gMCB8fCB2YWwgPCAxICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ2xjZygpOjppbnZhbGlkIGlucHV0IGFyZ3VtZW50LiBTZWVkIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0c2VlZCA9IHZhbDtcblx0fSBlbHNlIHtcblx0XHRzZWVkID0gRGF0ZS5ub3coKSAlIDEwMDAwMDAwMDtcblx0fVxuXHQvKipcblx0KiBGVU5DVElPTjogbGNnKCBbTl0gKVxuXHQqXHRMaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuXHQqXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFtOXSAtIG51bWJlciBvZiBwc2V1ZG9yYW5kb20gbnVtYmVycyB0byByZXR1cm5cblx0KiBAcmV0dXJucyB7TnVtYmVyfEFycmF5fSBwc2V1ZG9yYW5kb20gZmxvYXRpbmctcG9pbnQgbnVtYmVyKHMpIGJldHdlZW4gMCBhbmQgMVxuXHQqL1xuXHRyZXR1cm4gZnVuY3Rpb24gbGNnKCBOICkge1xuXHRcdHZhciBhcnIsXG5cdFx0XHRyYW5kO1xuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRzZWVkID0gKCBBICogc2VlZCApICUgTTtcblx0XHRcdHJhbmQgPSBzZWVkIC8gTTtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHJldHVybiByYW5kO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiBOICE9PSAnbnVtYmVyJyB8fCBOICE9PSBOIHx8IE4lMSAhPT0gMCB8fCBOIDwgMSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdsY2coKTo6aW52YWxpZCBpbnB1dCBhcmd1bWVudC4gQXJyYXkgbGVuZ3RoIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0YXJyID0gbmV3IEFycmF5KCBOICk7XG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgTjsgaSsrICkge1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0c2VlZCA9ICggQSAqIHNlZWQgKSAlIE07XG5cdFx0XHRhcnJbIGkgXSA9IHNlZWQgLyBNO1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJyO1xuXHR9O1xufSAvLyBlbmQgRlVOQ1RJT04gbGNnKClcblxuXG4vLyBFWFBPUlRTIC8vXG5cbm1vZHVsZS5leHBvcnRzID0gbGNnO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG5cdGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG5cdH1cblxuXHRyZXR1cm4gdG9TdHIuY2FsbChhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaiB8fCB0b1N0ci5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGhhc093bkNvbnN0cnVjdG9yID0gaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKTtcblx0dmFyIGhhc0lzUHJvdG90eXBlT2YgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpO1xuXHQvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XG5cdGlmIChvYmouY29uc3RydWN0b3IgJiYgIWhhc093bkNvbnN0cnVjdG9yICYmICFoYXNJc1Byb3RvdHlwZU9mKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBvYmopIHsvKiovfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1swXSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicpIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH0gZWxzZSBpZiAoKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpIHx8IHRhcmdldCA9PSBudWxsKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG52YXIgY29sYSA9IHdpbmRvdy5jb2xhO1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5pbXBvcnQgbm9kZSBmcm9tICcuL2VsZW1lbnRzL25vZGUnO1xuaW1wb3J0IGVkZ2UgZnJvbSAnLi9lbGVtZW50cy9lZGdlJztcbmltcG9ydCBHcmFwaE1hbmFnZXIgZnJvbSAnLi9HcmFwaCc7XG5pbXBvcnQgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGZyb20gJy4vc2VsZWN0b3IvR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhdyB7XG4gIGNvbnN0cnVjdG9yKGlkLCBvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZXZlbnRzID0gZDMuZGlzcGF0Y2goJ2xheW91dCcsICdmaXJzdExheW91dEVuZCcpO1xuXG4gICAgdGhpcy5tYXJrZXJJZCA9ICdtYXJrZXItJyArIGlkO1xuXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyhvcHRpb25zKTtcblxuICAgIC8vIGdyYXBoIGhhbmRsZXMgdGhlIGludGVyYWN0aW9ucyB3aXRoIHRoZSBkcmF3ZXJcbiAgICB0aGlzLmNyZWF0ZUdyYXBoKCk7XG5cbiAgICAvLyBzZWxlY3RvciBhbmltYXRlcyB0aGUgbm9kZXMvZWRnZXNcbiAgICB0aGlzLnNlbGVjdG9yID0gbmV3IEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbih0aGlzKTtcblxuICAgIC8vIHN1Yi1lbGVtZW50cyB0aGF0IGRyYXcgc3R1ZmZcbiAgICB0aGlzLm5vZGVEcmF3ZXIgPSBub2RlKCkub3duZXIodGhpcyk7XG4gICAgdGhpcy5lZGdlRHJhd2VyID0gZWRnZSgpLm93bmVyKHRoaXMpO1xuXG4gICAgLy8gY29sYVxuICAgIHRoaXMubGF5b3V0ID0gY29sYS5kM2FkYXB0b3IoKTtcblxuICAgIHRoaXMubGF5b3V0Lm9uKCd0aWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50aWNrKCk7XG4gICAgfSk7XG5cbiAgICB2YXIgZmlyc3RFbmQgPSB0cnVlO1xuICAgIHRoaXMubGF5b3V0Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZmlyc3RFbmQpIHtcbiAgICAgICAgc2VsZi5ldmVudHMuZmlyc3RMYXlvdXRFbmQoKTtcbiAgICAgICAgZmlyc3RFbmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUdyYXBoKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5vcHRpb25zLmRhdGE7XG4gICAgdmFyIG5vZGVzID0gZGF0YS5ub2RlcztcbiAgICB2YXIgbGlua3MgPSBkYXRhLmxpbmtzO1xuXG4gICAgLy8gZW1wdHkgYW5kIHJlLWFkZFxuICAgIGRhdGEubm9kZXMgPSBbXTtcbiAgICBkYXRhLmxpbmtzID0gW107XG5cbiAgICB0aGlzLmdyYXBoID0gbmV3IEdyYXBoTWFuYWdlcih0aGlzLCBkYXRhKTtcbiAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB0aGlzLmdyYXBoLmFkZE5vZGUobm9kZSk7XG4gICAgfSwgdGhpcyk7XG4gICAgbGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgdGhpcy5ncmFwaC5hZGRFZGdlKGVkZ2UpO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqXG4gICAqIG9wdGlvbnNcbiAgICogICAtIHRhcmdldCB7c3RyaW5nfSBzZWxlY3RvciB0byB0aGUgZWxlbWVudCB0byBob2xkIHRoZSBncmFwaFxuICAgKiAgIC0gd2lkdGgge251bWJlcn1cbiAgICogICAtIGhlaWdodCB7bnVtYmVyfVxuICAgKiAgIC0gbGFiZWxzPXRydWUge2Jvb2xlYW59IEZhbHNlIHRvIGhpZGUgdGhlIHZlcnRleCBsYWJlbHNcbiAgICogICAtIGRpcmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGdpdmUgYW4gb3JpZW50YXRpb24gdG8gdGhlIGVkZ2VzXG4gICAqICAgaGF2ZSBhbiBlZGdlXG4gICAqICAgLSBkYXRhIHtPYmplY3R9XG4gICAqICAgICAtIGxpbmtEaXN0YW5jZT05MCB7bnVtYmVyfSBGb3JjZWQgbWluIGRpc3RhbmNlIGJldHdlZW4gdmVydGljZXMgdGhhdFxuICAgKiAgICAgLSBjb25zdHJhaW50cyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIGdyb3VwcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIG5vZGVzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSByPTEwIHtudW1iZXJ9IG5vZGUgcmFkaXVzXG4gICAqICAgICAtIGxpbmtzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSBkaXJlY3RlZD1mYWxzZSB7Ym9vbGVhbn0gdHJ1ZSB0byBnaXZlIGFuIG9yaWVudGF0aW9uIHRvIHRoaXMgZWRnZVxuICAgKiAgICAgICAtIHdlaWdodD1cIlwiIHtzdHJpbmd9IExhYmVsIG9mIHRoZSBlZGdlIChjYW4gYmUgdGhlIHdlaWdodClcbiAgICpcbiAgICovXG4gIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAvLyBncmFwaCBkZWZhdWx0c1xuICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgd2lkdGg6IDcwMCxcbiAgICAgIGhlaWdodDogMzAwLFxuICAgICAgYW5pbWF0aW9uVGltZTogMTAwMCxcbiAgICAgIGxhYmVsczogdHJ1ZSxcbiAgICAgIGRpcmVjdGVkOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5vcHRpb25zLmRhdGEgPSBleHRlbmQoe1xuICAgICAgbm9kZXM6IFtdLFxuICAgICAgbGlua3M6IFtdLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIGNvbnN0cmFpbnRzOiBbXSxcbiAgICAgIGF2b2lkT3ZlcmxhcHM6IHRydWUsXG4gICAgICBzaXplOiBbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdLFxuICAgICAgbGlua0Rpc3RhbmNlOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rRGlzdGFuY2UgfHwgODA7XG4gICAgICB9XG4gICAgfSwgdGhpcy5vcHRpb25zLmRhdGEpO1xuICB9XG5cbiAgaW5pdExheW91dCh1cGRhdGVPcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHVwZGF0ZU9wdGlvbnMuc2tpcExheW91dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHNlbGYub3B0aW9ucy5kYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICB2YXIgdiA9IHNlbGYub3B0aW9ucy5kYXRhW2tdO1xuICAgICAgc2VsZi5sYXlvdXRba10odik7XG4gICAgfSwgdGhpcyk7XG5cbiAgICAvL3RoaXMubGF5b3V0LnN0YXJ0KDE1LCAxNSwgMTUpO1xuICAgIHRoaXMubGF5b3V0LnN0YXJ0KCk7XG4gIH1cblxuICB0aWNrKCkge1xuICAgIHRoaXMuZWRnZUdyb3VwLmNhbGwodGhpcy5lZGdlRHJhd2VyKTtcbiAgICB0aGlzLm5vZGVHcm91cC5jYWxsKHRoaXMubm9kZURyYXdlcik7XG4gIH1cblxuICB1cGRhdGUodXBkYXRlT3B0aW9ucykge1xuICAgIHVwZGF0ZU9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgc2tpcExheW91dDogZmFsc2VcbiAgICB9LCB1cGRhdGVPcHRpb25zKTtcblxuICAgIHRoaXMuaW5pdExheW91dCh1cGRhdGVPcHRpb25zKTtcbiAgICB0aGlzLmJ1aWxkKHVwZGF0ZU9wdGlvbnMpO1xuXG4gICAgLy8gdXBkYXRlIGlubmVyIG5vZGVzL2VkZ2VzIGlmIGxheW91dC50aWNrIHdhc24ndCBydW5cbiAgICBpZiAodXBkYXRlT3B0aW9ucy5za2lwTGF5b3V0KSB7XG4gICAgICB0aGlzLnRpY2soKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJ1aWxkKCkge1xuICAgIHRoaXMucm9vdCA9IGQzLnNlbGVjdCh0aGlzLm9wdGlvbnMudGFyZ2V0KVxuICAgICAgLnNlbGVjdEFsbCgnc3ZnLmdyZXVsZXInKVxuICAgICAgLmRhdGEoW3RoaXMub3B0aW9uc10pO1xuXG4gICAgLy8gZW50ZXJcbiAgICB0aGlzLnJvb3QuZW50ZXIgPSB0aGlzLnJvb3QuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdncmV1bGVyJyk7XG5cbiAgICAvLyBtYXJrZXIgZGVmXG4gICAgdGhpcy5yb290LmVudGVyXG4gICAgICAuYXBwZW5kKCdzdmc6ZGVmcycpXG4gICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcbiAgICAgIC5hdHRyKCdpZCcsIHRoaXMubWFya2VySWQpXG4gICAgICAuYXR0cigndmlld0JveCcsICcwIC01IDEwIDEwJylcbiAgICAgIC5hdHRyKCdyZWZYJywgOSlcbiAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDUpXG4gICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgNSlcbiAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXG4gICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAuYXR0cignZCcsICdNMCwtNEwxMCwwTDAsNEwyLDAnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsICcwcHgnKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAuYXR0cignZmlsbCcsICcjNzc3Jyk7XG5cbiAgICAvLyB1cGRhdGVcbiAgICB0aGlzLnJvb3RcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMub3B0aW9ucy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KTtcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBlZGdlc1xuICAgIHRoaXMuZWRnZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLmVkZ2VzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXTsgfSk7XG4gICAgdGhpcy5lZGdlR3JvdXBcbiAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZWRnZXMnKTtcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBub2Rlc1xuICAgIHRoaXMubm9kZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGVzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXTsgfSk7XG4gICAgdGhpcy5ub2RlR3JvdXBcbiAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbm9kZXMnKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtjb2xvcnN9IGZyb20gJy4vY29uc3QnO1xuXG5jb25zdCBOT0RFX0RFRkFVTFRfT1BUSU9OUyA9IHtcbiAgcjogMTAsXG4gIGZpbGw6ICcjMjk4MEI5J1xufTtcblxuY29uc3QgRURHRV9ERUZBVUxUX09QVElPTlMgPSB7XG4gIHN0cm9rZTogY29sb3JzLkxJR0hUX0dSQVlcbn07XG5cbmZ1bmN0aW9uIGluY2x1ZGVzKGFyciwgaWQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoYXJyW2ldLmlkID09PSBpZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICpcbiAqIFxuICogQGNsYXNzIEdyYXBoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoIHtcbiAgY29uc3RydWN0b3Iob3duZXIsIGRhdGEpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgdGhpcy5ub2RlcyA9IGRhdGEubm9kZXM7XG4gICAgdGhpcy5lZGdlcyA9IGRhdGEubGlua3M7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5vZGUgdG8gdGhlIGdyYXBoLCBlYWNoIG9mIHRoZSBhcmd1bWVudHMgbXVzdFxuICAgKiBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7TnVtYmVyfHN0cmluZ31cbiAgICpcbiAgICogT3B0aW9uYWwgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIHgge251bWJlcn0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIG5vZGUgaW4gdGhlIGdyYXBoIChvbmx5IGlmIGZpeGVkID0gdHJ1ZSlcbiAgICogLSB5IHtudW1iZXJ9IFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhpcyBub2RlIGluIHRoZSBncmFwaCAob25seSBpZiBmaXhlZCA9IHRydWUpXG4gICAqIC0gZml4ZWQge2Jvb2xlYW59IGB0cnVlYCB0byBtYWtlIHRoaXMgbm9kZSBub3QgdG8gcGFydGljaXBhdGUgaW4gdGhlIGxheW91dCBwcm9jZXNzXG4gICAqIC0gZmlsbCB7c3RyaW5nfSBUaGUgZmlsbCBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIHIge251bWJlcn0gVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIGxhYmVsIHtzdHJpbmd9IFRoZSB0ZXh0IGluc2lkZSB0aGUgbm9kZSAoaWYgaXQncyBub3QgcHJlc2VudCBpdCdzIGVxdWFsIHRvIHRoZSBgaWRgKVxuICAgKiAtIHRvcFJpZ2h0TGFiZWwge3N0cmluZ10gdGhlIHRleHQgc2hvd24gb24gdGhlIHRvcCByaWdodCBzaWRlIG9mIHRoZSBub2RlLCB1c2VmdWxcbiAgICogdG8gcmVwcmVzZW50IGFkZGl0aW9uYWwgYW5ub3RhdGlvbnNcbiAgICpcbiAgICogTk9URTogdGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgKi9cbiAgYWRkTm9kZSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0aGUgb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0Tm9kZShjb25maWcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdub2RlIGFscmVhZHkgaW4gc3RvcmUnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubm9kZXMucHVzaChcbiAgICAgICAgR3JhcGguYXBwZW5kTm9kZURlZmF1bHRzLmNhbGwodGhpcy5vd25lciwgY29uZmlnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIG5vZGUgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIGdldE5vZGUobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzQnlGbih2ID0+IHYuaWQgPT09IG5vZGUuaWQpWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHBhcmFtZXRlciBgZm5gLFxuICAgKiBhbGlhcyBmb3IgYHRoaXMubm9kZXMuZmlsdGVyKGZuKWBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0Tm9kZXNCeUZuKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXMuZmlsdGVyKGZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgYWRqYWNlbnQgbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnROb2Rlcyhub2RlKSB7XG4gICAgdmFyIGFkamFjZW50Tm9kZXMgPSBbXTtcbiAgICB2YXIgdGFrZW4gPSB7fTtcbiAgICB2YXIgbmV4dDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXTtcbiAgICAgIG5leHQgPSBudWxsO1xuICAgICAgaWYgKGVkZ2Uuc291cmNlLmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnRhcmdldDtcbiAgICAgIH0gZWxzZSBpZiAoZWRnZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2Uuc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlO1xuICAgICAgICBhZGphY2VudE5vZGVzLnB1c2gobmV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkamFjZW50Tm9kZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHN1Y2Nlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRTdWNjZXNzb3JOb2Rlcyhub2RlKSB7XG4gICAgdmFyIHN1Y2Nlc3NvciA9IFtdO1xuICAgIHZhciB0YWtlbiA9IHt9O1xuICAgIHZhciBuZXh0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldO1xuICAgICAgbmV4dCA9IG51bGw7XG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0O1xuICAgICAgfVxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZTtcbiAgICAgICAgc3VjY2Vzc29yLnB1c2gobmV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgcHJlZGVjZXNzb3Igbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0UHJlZGVjZXNzb3JOb2Rlcyhub2RlKSB7XG4gICAgdmFyIHByZWRlY2Vzc29yID0gW107XG4gICAgdmFyIHRha2VuID0ge307XG4gICAgdmFyIG5leHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV07XG4gICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2U7XG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlO1xuICAgICAgICBwcmVkZWNlc3Nvci5wdXNoKG5leHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcmVkZWNlc3NvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKi9cbiAgcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgdGhpcy5yZW1vdmVOb2Rlc0J5Rm4oZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2LmlkID09PSBub2RlLmlkO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBub2RlcyBzdG9yZWQgaW4gYG5vZGVzYCxcbiAgICogZWFjaCBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IG5vZGVzXG4gICAqL1xuICByZW1vdmVOb2Rlcyhub2Rlcykge1xuICAgIC8vIFRPRE86IGltcHJvdmUgbl4yIHJlbW92YWxcbiAgICB0aGlzLnJlbW92ZU5vZGVzQnlGbihmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzKG5vZGVzLCB2LmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgbm9kZXMgdGhhdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlTm9kZXNCeUZuKGZuKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLm5vZGVzW2ldLCBpKSkge1xuICAgICAgICAvLyByZW1vdmUgbm9kZXNcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgLy8gcmVtb3ZlIGluY2lkZW50IGVkZ2VzXG4gICAgICAgIHRoaXMucmVtb3ZlRWRnZXMoXG4gICAgICAgICAgdGhpcy5nZXRJbmNpZGVudEVkZ2VzKG5vZGVbMF0pXG4gICAgICAgICk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlZGdlIHRvIHRoZSBncmFwaCwgZWFjaCBvZiB0aGUgYXJndW1lbnRzIG11c3RcbiAgICogYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIFJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBzb3VyY2Uge251bWJlcnxPYmplY3R9IFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGUgb3IgdGhlIHNvdXJjZSBub2RlIGl0c2VsZlxuICAgKiAtIHRhcmdldCB7bnVtYmVyfE9iamVjdH0gVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZSBvciB0aGUgdGFyZ2V0IG5vZGUgaXRzZWxmXG4gICAqXG4gICAqIE9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7c3RyaW5nfE9iamVjdH0gSWYgYW4gaWQgaXMgbm90IHByb3ZpZGVkIGFuIGF1dG8gZ2VuZXJhdGVkIHN0cmluZyB3aWxsIGJlIGFzc2lnbmVkXG4gICAqIHRvIHRoaXMgZWRnZVxuICAgKiAtIHN0cm9rZSB7c3RyaW5nfSBUaGUgc3Ryb2tlIG9mIHRoZSBwYXRoIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZVxuICAgKiAtIHdlaWdodCB7c3RyaW5nfSBUaGUgd2VpZ2h0IG9mIHRoZSBlZGdlXG4gICAqIC0gZGlyZWN0ZWQge2Jvb2xlYW59IElmIHNldCB0byB0cnVlIGFuIGFkZGl0aW9uYWwgYXJyb3cgaXMgYWRkZWQgYXQgdGhlIGVuZCBvZiB0aGUgZWRnZVxuICAgKlxuICAgKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqL1xuICBhZGRFZGdlKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgfHwgIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0JykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBlZGdlIG11c3QgaGF2ZSB0aGUgcHJvcGVydGllcyBgc291cmNlYCBhbmQgYHRhcmdldGAnKTtcbiAgICAgIH1cbiAgICAgIHZhciBzb3VyY2UgPSBjb25maWcuc291cmNlO1xuICAgICAgdmFyIHRhcmdldCA9IGNvbmZpZy50YXJnZXQ7XG5cbiAgICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBzb3VyY2UgPSB0aGlzLmdldE5vZGUoeyBpZDogY29uZmlnLnNvdXJjZSB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0Tm9kZSh7IGlkOiBjb25maWcudGFyZ2V0IH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNvdXJjZSB8fCAhdGFyZ2V0KSB7XG4gICAgICAgIHRocm93IEVycm9yKCduZXcgZWRnZSBkb2VzIG5vdCBqb2luIGV4aXN0aW5nIHZlcnRpY2VzJyk7XG4gICAgICB9XG4gICAgICBjb25maWcuc291cmNlID0gc291cmNlO1xuICAgICAgY29uZmlnLnRhcmdldCA9IHRhcmdldDtcbiAgICAgIHRoaXMuZWRnZXMucHVzaChcbiAgICAgICAgR3JhcGguYXBwZW5kRWRnZURlZmF1bHRzLmNhbGwodGhpcy5vd25lciwgY29uZmlnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBlZGdlIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0RWRnZShlZGdlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGUgPT4gZS5pZCA9PT0gZWRnZS5pZClbMF07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGRpcmVjdGVkIGVkZ2VzIGZyb20gdGhlIG5vZGUgd2hvc2UgaWQgaXNcbiAgICogYG9wdGlvbnMuc291cmNlYCBhbmQgdG8gdGhlIG5vZGUgd2hvc2UgaWQgaXMgYG9wdGlvbnMudGFyZ2V0YFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMuc291cmNlIFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnRhcmdldCBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQmV0d2VlbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMuc291cmNlICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnRhcmdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgZnJvbSBgb3B0aW9ucy5zb3VyY2VgIHRvIGBvcHRpb25zLnRhcmdldGBcbiAgICogb3IgYG9wdGlvbnMudGFyZ2V0YCB0byBgb3B0aW9ucy5zb3VyY2VgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy5zb3VyY2UgVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMudGFyZ2V0IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWxsRWRnZXNCZXR3ZWVuKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMuc291cmNlICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnRhcmdldCkgfHxcbiAgICAgICAgKGUuc291cmNlLmlkID09PSBvcHRpb25zLnRhcmdldCAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy5zb3VyY2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZWRnZSBpZGVudGlmaWVkIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlZGdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZWRnZS5pZCBUaGUgaWQgb2YgdGhlIGVkZ2VcbiAgICovXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGUgPT4gZS5pZCA9PT0gZWRnZS5pZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHN0b3JlZCBpbiBgZWRnZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gZWRnZXNcbiAgICovXG4gIHJlbW92ZUVkZ2VzKGVkZ2VzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMoZWRnZXMsIGUuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBlZGdlcyB0aGF0IHJldHVybiB0cnVlIGZvciB0aGUgcHJlZGljYXRlXG4gICAqIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAgICovXG4gIHJlbW92ZUVkZ2VzQnlGbihmbikge1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZm4odGhpcy5lZGdlc1tpXSwgaSkpIHtcbiAgICAgICAgdGhpcy5lZGdlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGUgYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRFZGdlc0J5Rm4oZm4pIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlcy5maWx0ZXIoZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBvdXRnb2luZyBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKChlKSA9PiBlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGluY29taW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRJbmNvbWluZ0VkZ2VzKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oKGUpID0+IGUudGFyZ2V0LmlkID09PSBub2RlLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jaWRlbnQgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY2lkZW50RWRnZXMobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldE91dGdvaW5nRWRnZXMobm9kZSlcbiAgICAgIC5jb25jYXQodGhpcy5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGYWNhZGUgdG8gYWRkIG5vZGVzL2VkZ2VzXG4gICAqXG4gICAqIE5PVEU6IHRoZSBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIHBhcmFtZXRlcnNcbiAgICovXG4gIGFkZCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVsID0gYXJndW1lbnRzW2ldO1xuICAgICAgLy8gYXNzdW1lIHRoYXQgZWRnZXMgaGF2ZSBhIHNvdXJjZS90YXJnZXQgcGFyYW1ldGVyXG4gICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoJ3NvdXJjZScpICYmIGVsLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xuICAgICAgICB0aGlzLmFkZEVkZ2UoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGROb2RlKGVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTm9kZURlZmF1bHRzKHYpIHtcbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIHYuaWQgPSB1dGlsLmlkKCk7XG4gICAgfVxuXG4gICAgdiA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgTk9ERV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLm5vZGVEZWZhdWx0cyxcbiAgICAgIC8vIG5vZGVcbiAgICAgIHZcbiAgICApO1xuXG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCd3aWR0aCcpKSB7XG4gICAgICB2LndpZHRoID0gMiAqIHYucjtcbiAgICB9XG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCdoZWlnaHQnKSkge1xuICAgICAgdi5oZWlnaHQgPSAyICogdi5yO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmRFZGdlRGVmYXVsdHMoZSkge1xuICAgIGlmICghZS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgZS5pZCA9IHV0aWwuaWQoKTtcbiAgICB9XG4gICAgZSA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgRURHRV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLmVkZ2VEZWZhdWx0cyxcbiAgICAgIC8vIGVkZ2VcbiAgICAgIGVcbiAgICApO1xuICAgIHJldHVybiBlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSByYW5kb20gZ3JhcGggd2l0aCB0aGUgZm9sbG93aW5nIGRlZmF1bHRzIG9wdGlvbnMgb3ZlcnJpZGRlbiBieSBgb3B0aW9uc2A6XG4gICAqXG4gICAqIC0gb3B0aW9ucy5vcmRlcj0xMCB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuc2l6ZT0xNSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGVkZ2VzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuY29ubmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIG1ha2UgdGhlIGdyYXBoIGNvbm5lY3RlZCxcbiAgICogaXQncyBndWFyYW50ZWVkIHRvIGhhdmUgYXQgbGVhc3QgYG9wdGlvbnMub3JkZXIgLSAxYCBlZGdlc1xuICAgKiAtIG9wdGlvbnMubXVsdGlHcmFwaD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgcGFyYWxsZWwgZWRnZXNcbiAgICogLSBvcHRpb25zLnBzZXVkb0dyYXBoPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBsb29wIGVkZ2VzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHt7bm9kZXM6IEFycmF5LCBsaW5rczogQXJyYXl9fVxuICAgKi9cbiAgc3RhdGljIHJhbmRvbShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBvcmRlcjogMTAsXG4gICAgICBzaXplOiAxNSxcbiAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICBtdWx0aUdyYXBoOiBmYWxzZSxcbiAgICAgIHBzZXVkb0dyYXBoOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgdmFyIGksIHUsIHY7XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIGFkamFjZW5jeUxpc3QgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICBhZGphY2VuY3lMaXN0W2ldID0gW107XG4gICAgICBub2Rlcy5wdXNoKHsgaWQ6IGkgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKHUsIHYpIHtcbiAgICAgIGFkamFjZW5jeUxpc3RbdV1bdl0gPSBhZGphY2VuY3lMaXN0W3ZdW3VdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZWRnZXMgPSBbXTtcbiAgICBpID0gMDtcblxuICAgIGlmIChvcHRpb25zLmNvbm5lY3RlZCkge1xuICAgICAgZm9yIChpID0gMTsgaSA8IG9wdGlvbnMub3JkZXI7IGkgKz0gMSkge1xuICAgICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XG4gICAgICAgIGFkZChpLCB2KTtcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBpLFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGkgLT0gMTtcbiAgICB9XG5cbiAgICBmb3IgKDsgaSA8IG9wdGlvbnMuc2l6ZTsgaSArPSAxKSB7XG4gICAgICB1ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5vcmRlcik7XG4gICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5vcmRlcik7XG5cbiAgICAgIGlmICh1ID09PSB2ICYmICFvcHRpb25zLnBzZXVkb0dyYXBoKSB7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH0gZWxzZSBpZiAoYWRqYWNlbmN5TGlzdFt1XVt2XSAmJiAhb3B0aW9ucy5tdWx0aUdyYXBoKSB7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZCh1LCB2KTtcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiB1LFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbm9kZXM6IG5vZGVzLFxuICAgICAgbGlua3M6IGVkZ2VzXG4gICAgfTtcbiAgfVxufVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFZlY3RvciB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICAvLyB1bmFyeVxuXG4gIHN0YXRpYyBuZWcoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLngsIC1hLnkpO1xuICB9XG5cbiAgc3RhdGljIGxlbihhKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChWZWN0b3IubGVuU3EoYSkpO1xuICB9XG5cbiAgc3RhdGljIGxlblNxKGEpIHtcbiAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55O1xuICB9XG5cbiAgc3RhdGljIHVuaXQoYSkge1xuICAgIGlmIChhLnggPT09IDAgJiYgYS55ID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIGlzIDAnKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuKGEpO1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAvIGxlbmd0aCwgYS55IC8gbGVuZ3RoKTtcbiAgfVxuXG4gIHN0YXRpYyBvcnRob2dvbmFsKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcigtYS55LCBhLngpO1xuICB9XG5cbiAgc3RhdGljIGFuZ2xlRGVnKGEpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihhLnksIGEueCkgKiAxODAgLyBNYXRoLlBJO1xuICB9XG5cblxuICAvLyBiaW5hcnlcblxuICBzdGF0aWMgYWRkKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKyBiLngsIGEueSArIGIueSk7XG4gIH1cblxuICBzdGF0aWMgc3ViKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggLSBiLngsIGEueSAtIGIueSk7XG4gIH1cblxuICBzdGF0aWMgZG90KGEsIGIpIHtcbiAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55O1xuICB9XG5cbiAgc3RhdGljIHNjYWxlKGEsIG4pIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKiBuLCBhLnkgKiBuKTtcbiAgfVxuXG4gIHN0YXRpYyBtaWQoYSwgYikge1xuICAgIHJldHVybiBWZWN0b3Iuc2NhbGUoVmVjdG9yLmFkZChhLCBiKSwgMC41KTtcbiAgfVxuXG4gIHN0YXRpYyBhbmdsZUJldHdlZW4oYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFjb3MoVmVjdG9yLmRvdChhLCBiKSAvIFZlY3Rvci5sZW4oYSkgLSBWZWN0b3IubGVuKGIpKTtcbiAgfVxuXG4gIHN0YXRpYyByb3RhdGUoYSwgYW5nbGUpIHtcbiAgICB2YXIgY29zQSA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICB2YXIgc2luQSA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICB2YXIgbnggPSBhLnggKiBjb3NBIC0gYS55ICogc2luQTtcbiAgICB2YXIgbnkgPSBhLnggKiBzaW5BICsgYS55ICogY29zQTtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihueCwgbnkpO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG52YXIgY29sb3IgPSBkMy5zY2FsZS5jYXRlZ29yeTIwKCk7XG52YXIgY29sb3JzID0ge307XG52YXIgY29sb3JMaXRlcmFscyA9IFsnQkxVRScsICdPUkFOR0UnLCAnR1JFRU4nLCAnUkVEJywgJ1BVUlBMRScsICdCUk9XTicsICdQSU5LJywgJ0dSQVknLCAnWUVMTE9XJywgJ0NZQU4nXTtcbmNvbG9yTGl0ZXJhbHMuZm9yRWFjaChmdW5jdGlvbiAoYywgaSkge1xuICBjb2xvcnNbY10gPSBjb2xvci5yYW5nZSgpWzIgKiBpXTtcbiAgY29sb3JzWydMSUdIVF8nICsgY10gPSBjb2xvci5yYW5nZSgpWzIgKiBpICsgMV07XG59KTtcblxuY29sb3JzLnJhbmRvbUZyb21QYWxldHRlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY29sb3IucmFuZ2UoKVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCldO1xufTtcblxuZXhwb3J0IHtjb2xvcnN9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vVmVjdG9yJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgb3duZXI7XG5cbiAgZnVuY3Rpb24gbW92ZVRvd2FyZHNQb2ludChwb2ludCwgbWlkZGxlKSB7XG4gICAgdmFyIG1hcmdpbiA9IHBvaW50LnI7XG4gICAgdmFyIHVuaXQgPSBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKG1pZGRsZSwgcG9pbnQpKTtcbiAgICByZXR1cm4gVmVjdG9yLmFkZChwb2ludCwgVmVjdG9yLnNjYWxlKHVuaXQsIG1hcmdpbikpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBpbm5lciBwb2ludHMgb2YgYSBsb29wIGVkZ2VcbiAgICpcbiAgICogLSBhbmFseXplcyBlYWNoIGFkamFjZW50IHZlcnRleFxuICAgKiAgLSBmb3IgZWFjaCBlYWNoIGVkZ2UgdS12IG1vdmUgdGhlIG9wcG9zaXRlIHdheSBlLmcuIHYtPnVcbiAgICogIC0gdGhlIHN1bSBvZiB1bml0IHZlY3RvcnMgd2lsbCBnaXZlIHJvdWdobHkgYSBnb29kIGFwcHJveGltYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHUgVmVydGV4XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXJnaW5CZXR3ZWVuRWRnZXMgRGVmaW5lZCBpbiBgY3JlYXRlUGF0aGBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IFRoZSBudW1iZXIgb2YgdS11IGVkZ2VzIGZvdW5kIHlldFxuICAgKiBAcmV0dXJucyB7e3BhdGg6ICpbXSwgZGlyOiAqfX1cbiAgICovXG4gIGZ1bmN0aW9uIHNlbGZMb29wKHUsIG1hcmdpbkJldHdlZW5FZGdlcywgY291bnQpIHtcbiAgICB2YXIgYWRqYWNlbnQgPSBvd25lci5ncmFwaC5nZXRBZGphY2VudE5vZGVzKHUpO1xuICAgIHZhciBkaXIgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciB2ID0gYWRqYWNlbnRbaV07XG4gICAgICBpZiAodS5pZCAhPT0gdi5pZCkge1xuICAgICAgICBkaXIgPSBWZWN0b3IudW5pdChWZWN0b3IuYWRkKFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHUsIHYpKVxuICAgICAgICApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1JhZChhKSB7XG4gICAgICByZXR1cm4gYSAqIE1hdGguUEkgLyAxODA7XG4gICAgfVxuXG4gICAgLy8gbm8gYWRqYWNlbnQgdmVydGljZXNcbiAgICBpZiAoZGlyLnggPT09IDAgJiYgZGlyLnkgPT09IDApIHtcbiAgICAgIGRpciA9IFZlY3Rvci51bml0KG5ldyBWZWN0b3IoMCwgLTEpKTtcbiAgICB9XG5cbiAgICB2YXIgb3J0ID0gVmVjdG9yLm9ydGhvZ29uYWwoZGlyKTtcblxuICAgIC8vIG1vdmluZyB1IHRvd2FyZHMgYGRpcmAgYHUucmAgdW5pdHNcbiAgICB2YXIgdUJvcmRlck9yaWdpbiA9IFZlY3Rvci5zY2FsZShkaXIsIHUuciArIDQpO1xuICAgIC8vdmFyIHVCb3JkZXJPcmlnaW5Ud2ljZSA9IFZlY3Rvci5zY2FsZShkaXIsIHUuciAqIDIpO1xuICAgIC8vIHVEIGlzIG5vdyBpbiB0aGUgZWRnZSBvZiB0aGUgY2lyY2xlLCBtYWtpbmcgYSBsaXR0bGUgYXJjIGluIHRoZSBjaXJjbGVcblxuICAgIC8vIGVuZHBvaW50cyBvZiB0aGUgZWRnZSB3aWxsIGhhdmUgYSBzZXBhcmF0aW9uIG9mIDEwIGRlZywgMzAgZGVnLCA1MCBkZWcsIC4uLlxuICAgIHZhciBhbmdsZSA9IHRvUmFkKDI1KSArIChjb3VudCAtIDEpICogdG9SYWQoMjUpO1xuXG4gICAgLy8gdGhlIHBvaW50IHRvIHRoZSBsZWZ0IG9mIHUgKyB1Qm9yZGVyXG4gICAgdmFyIHVCb3JkZXJMZWZ0ID0gVmVjdG9yLmFkZCh1LCBWZWN0b3Iucm90YXRlKHVCb3JkZXJPcmlnaW4sIGFuZ2xlKSk7XG4gICAgLy8gdGhlIHBvaW50IHRvIHRoZSByaWdodCBvZiB1ICsgdUJvcmRlclxuICAgIHZhciB1Qm9yZGVyUmlnaHQgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5yb3RhdGUodUJvcmRlck9yaWdpbiwgLWFuZ2xlKSk7XG5cbiAgICAvLyBzb21lIGxlbmd0aCBhd2F5IGZyb20gdGhlIG5vZGUgY29tcHV0ZWQgYnkgZG9pbmcgcmFuZG9tIHNhbXBsZXNcbiAgICB2YXIgbGVuZ3RoID0gKG1hcmdpbkJldHdlZW5FZGdlcyAqIDAuNikgKiAoY291bnQgKyAxKTtcblxuXG5cbiAgICAvKlxuICAgICAqIEZvcm0gdGhlIHNoYXBlIG9mIGEgd2VpcmQgcmhvbWJ1c1xuICAgICAqXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgIHVwXG4gICAgICogICAgICAgICAgIC8gIFxcXG4gICAgICogICAgICAgICAgLyAgICBcXFxuICAgICAqICAgICAgICAgLyAgICAgIFxcXG4gICAgICogICAgICAgIC8gICAgICAgIFxcXG4gICAgICogICAgIGxlZnQgICAgICAgcmlnaHRcbiAgICAgKiAgICAgICBcXCAgICAgICAgIC9cbiAgICAgKiAgICAgYm9yZGVyICAgYm9yZGVyXG4gICAgICpcbiAgICAgKi9cbiAgICB2YXIgdXAgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5zY2FsZShkaXIsIHUuciArIGxlbmd0aCkpO1xuXG4gICAgdmFyIG1pZExlZnQgPSBWZWN0b3IuYWRkKHVCb3JkZXJMZWZ0LCBWZWN0b3Iuc2NhbGUoZGlyLCBsZW5ndGggKiAwLjUpKTtcbiAgICB2YXIgbWlkUmlnaHQgPSBWZWN0b3IuYWRkKHVCb3JkZXJSaWdodCwgVmVjdG9yLnNjYWxlKGRpciwgbGVuZ3RoICogMC41KSk7XG5cbiAgICB2YXIgbGVmdCA9IFZlY3Rvci5hZGQobWlkTGVmdCwgVmVjdG9yLnNjYWxlKG9ydCwgbGVuZ3RoIC8gNCkpO1xuICAgIHZhciByaWdodCA9IFZlY3Rvci5hZGQobWlkUmlnaHQsIFZlY3Rvci5zY2FsZShvcnQsIC1sZW5ndGggLyA0KSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogW3VCb3JkZXJMZWZ0LCBsZWZ0LCB1cCwgcmlnaHQsIHVCb3JkZXJSaWdodF0sXG4gICAgICBkaXI6IG9ydFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgcG9pbnRzIG9mIHRoZSA8cGF0aD4gdGhhdCByZXByZXNlbnQgYW4gZWdlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhIEhvbGRzIGluZm8gYWJvdXQgdGhlXG4gICAqIEBwYXJhbSBtYXJnaW5CZXR3ZWVuRWRnZXNcbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGgoZCwgbWV0YSwgbWFyZ2luQmV0d2VlbkVkZ2VzKSB7XG4gICAgdmFyIHUsIHY7XG4gICAgdmFyIGN1cnJlbnQ7XG5cbiAgICB1ID0gZC5zb3VyY2U7XG4gICAgdiA9IGQudGFyZ2V0O1xuICAgIGlmICh1LmlkID4gdi5pZCkge1xuICAgICAgW3UsIHZdID0gW3YsIHVdO1xuICAgIH1cbiAgICBtZXRhW3UuaWRdID0gbWV0YVt1LmlkXSB8fCB7fTtcblxuICAgIGN1cnJlbnQgPSAobWV0YVt1LmlkXVt2LmlkXSA9IG1ldGFbdS5pZF1bdi5pZF0gfHwge1xuICAgICAgY291bnQ6IDEsXG4gICAgICBtaWQ6IFZlY3Rvci5taWQodSwgdiksXG4gICAgICBkaXJlY3Rpb246IC0xXG4gICAgfSk7XG5cbiAgICB2YXIgaW5uZXJKb2ludHMgPSBbXTtcblxuICAgIGlmICh1LmlkID09PSB2LmlkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgZm9sbG93aW5nIGZvciBzZWxmLWxvb3AgZWRnZXNcbiAgICAgIHZhciBsb29wID0gc2VsZkxvb3AodSwgbWFyZ2luQmV0d2VlbkVkZ2VzLCBjdXJyZW50LmNvdW50KTtcbiAgICAgIGlubmVySm9pbnRzID0gbG9vcC5wYXRoO1xuICAgICAgZC51bml0ID0gbG9vcC5kaXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1bml0O1xuICAgICAgaWYgKFZlY3Rvci5sZW4oVmVjdG9yLnN1Yih2LCB1KSkpIHtcbiAgICAgICAgdW5pdCA9IFZlY3Rvci51bml0KFZlY3Rvci5zdWIodiwgdSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5pdCA9IG5ldyBWZWN0b3IoMSwgMCk7XG4gICAgICB9XG5cbiAgICAgIGV4dGVuZChjdXJyZW50LCB7XG4gICAgICAgIHVuaXQ6IHVuaXQsXG4gICAgICAgIHVuaXRPcnRob2dvbmFsOiBWZWN0b3Iub3J0aG9nb25hbCh1bml0KVxuICAgICAgfSk7XG4gICAgICBpbm5lckpvaW50cy5wdXNoKFZlY3Rvci5hZGQoXG4gICAgICAgIGN1cnJlbnQubWlkLFxuICAgICAgICBWZWN0b3Iuc2NhbGUoXG4gICAgICAgICAgY3VycmVudC51bml0T3J0aG9nb25hbCxcbiAgICAgICAgICBNYXRoLmZsb29yKGN1cnJlbnQuY291bnQgLyAyKSAqIG1hcmdpbkJldHdlZW5FZGdlcyAqIGN1cnJlbnQuZGlyZWN0aW9uXG4gICAgICAgIClcbiAgICAgICkpO1xuICAgICAgZC51bml0ID0gY3VycmVudC51bml0O1xuICAgIH1cblxuICAgIGN1cnJlbnQuY291bnQgKz0gMTtcbiAgICBjdXJyZW50LmRpcmVjdGlvbiAqPSAtMTtcblxuICAgIC8vIHByb2JsZW06IHRoZSBlZGdlIHN0YXJ0cy9lbmRzIGluIHRoZSBjZW50ZXIgb2Ygc29tZSBub2RlXG4gICAgLy9cbiAgICAvLyByZWFsIHNvbHV0aW9uOiByZW5kZXIgdGhlIHBhdGggbm9ybWFsbHkgdGhlbiBjb21wdXRlIHRoZSBwb3NpdGlvbiBvZiBhIHBvaW50XG4gICAgLy8gd2l0aCBgcGF0aC5nZXRQb2ludEF0TGVuZ3RoKHQgKiBsKWAgd2hlcmUgYGxgIGlzIHRoZSBsZW5ndGggb2YgdGhlIHBhdGggYW5kXG4gICAgLy8gYHRgIGFuIGludGVycG9sYXRlZCBwbGFjZSA9IHJhZGl1cyBvZiBlYWNoIG5vZGVcbiAgICAvL1xuICAgIC8vIHNpbXBsZSB0cmljazogc2hvcnRlbiB0aGUgbGVuZ3RoIG9mIHRoZSBlZGdlIGJ5IG1vdmluZyB0aGUgc3RhcnQvZW5kIHBvaW50c1xuICAgIC8vIG9mIHRoZSBlZGdlcyB0b3dhcmQgZWFjaCBvdGhlclxuICAgIHZhciBzb3VyY2UgPSBkLnNvdXJjZTtcbiAgICB2YXIgdGFyZ2V0ID0gZC50YXJnZXQ7XG4gICAgc291cmNlID0gbW92ZVRvd2FyZHNQb2ludChkLnNvdXJjZSwgaW5uZXJKb2ludHNbMF0pO1xuICAgIHRhcmdldCA9IG1vdmVUb3dhcmRzUG9pbnQoZC50YXJnZXQsIGlubmVySm9pbnRzW2lubmVySm9pbnRzLmxlbmd0aCAtIDFdKTtcblxuICAgIGQucGF0aCA9IFtzb3VyY2VdXG4gICAgICAuY29uY2F0KGlubmVySm9pbnRzKVxuICAgICAgLmNvbmNhdChbdGFyZ2V0XSk7XG4gIH1cblxuICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAueChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54OyB9KVxuICAgIC55KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnk7IH0pXG4gICAgLnRlbnNpb24oMS41KVxuICAgIC5pbnRlcnBvbGF0ZSgnYnVuZGxlJyk7XG4gICAgLy8uaW50ZXJwb2xhdGUoJ2xpbmVhcicpO1xuXG4gIGZ1bmN0aW9uIGlubmVyKHNlbGVjdGlvbikge1xuICAgIC8vIGVkZ2VzXG4gICAgdmFyIGxpbmtzID0gc2VsZWN0aW9uLnNlbGVjdEFsbCgnZy5lZGdlJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmxpbmtzO1xuICAgICAgfSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9KTtcbiAgICBsaW5rcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZWRnZScpXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApXG4gICAgICAuYXR0cignaWQnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gdXRpbHMubnMoZC5pZCk7IH0pXG4gICAgICAudHJhbnNpdGlvbignZW50ZXInKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKTtcblxuICAgIC8vIHVwZGF0ZVxuICAgIGxpbmtzXG4gICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICB2YXIgc2VsZiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGNscyA9IHtcbiAgICAgICAgICBkaXJlY3RlZDogZC5kaXJlY3RlZCB8fCBvd25lci5vcHRpb25zLmRpcmVjdGVkXG4gICAgICAgIH07XG4gICAgICAgIGNsc1snc291cmNlLScgKyBkLnNvdXJjZS5pZF0gPSB0cnVlO1xuICAgICAgICBjbHNbJ3RhcmdldC0nICsgZC50YXJnZXQuaWRdID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5jbGFzc2VkKGNscyk7XG4gICAgICB9KTtcblxuICAgIHZhciBtZXRhID0ge307XG4gICAgbGlua3MuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgY3JlYXRlUGF0aChkLCBtZXRhLCAxNyk7XG4gICAgfSk7XG5cbiAgICAvLyBwYXRoIGVudGVyXG4gICAgdmFyIHBhdGhzID0gbGlua3Muc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIDEuIHJlYWwgcGF0aFxuICAgICAgICAvLyAyLiBzdHJva2UtZGFzaGFycmF5IGhlbHBlclxuICAgICAgICByZXR1cm4gW2QsIGRdO1xuICAgICAgfSk7XG4gICAgcGF0aHMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignc3Ryb2tlJywgZCA9PiBkLnN0cm9rZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJ3RyYW5zcGFyZW50JylcbiAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBlbC5hdHRyKCdvcGFjaXR5JywgIWkgPyAxIDogMCk7XG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgZWwuY2xhc3NlZCgnYmFzZScsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgZWwuYXR0cignc3Ryb2tlLXdpZHRoJywgNSk7XG4gICAgICAgICAgZWwuY2xhc3NlZCgndHJhdmVyc2FsJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8uYXR0cignZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICB2YXIgcGFyZW50ID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKTtcbiAgICAgIC8vICByZXR1cm4gbGluZShbcGFyZW50LnNvdXJjZV0pO1xuICAgICAgLy99KTtcblxuICAgIC8vIHBhdGggdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKHBhdGhzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IGxpbmUoZC5wYXRoKSk7XG5cbiAgICBwYXRocy5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICB2YXIgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKTtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHBhdGguYXR0cignbWFya2VyLWVuZCcsXG4gICAgICAgICAgcGFyZW50LmNsYXNzZWQoJ2RpcmVjdGVkJylcbiAgICAgICAgICAgID8gJ3VybCgjJyArIG93bmVyLm1hcmtlcklkICsgJyknXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHdlaWdodFBvc2l0aW9uKHNlbGVjdGlvbikge1xuICAgICAgc2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIHZhciBhbmdsZSA9IFZlY3Rvci5hbmdsZURlZyhkLnVuaXQpO1xuICAgICAgICAgIHZhciB2ID0gZC5wYXRoW01hdGguZmxvb3IoZC5wYXRoLmxlbmd0aCAvIDIpXTtcbiAgICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdixcbiAgICAgICAgICAgIHJvdGF0ZTogYW5nbGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHdlaWdodHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkXTsgfSk7XG5cbiAgICAvLyB3ZWlnaHQgZW50ZXJcbiAgICB3ZWlnaHRzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ3RleHQtYWZ0ZXItZWRnZScpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC5jYWxsKHdlaWdodFBvc2l0aW9uKTtcblxuICAgIC8vIHdlaWdodCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24od2VpZ2h0cywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC50ZXh0KGQgPT4gZC53ZWlnaHQpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbik7XG5cbiAgICAvLyB3ZWlnaHQgZXhpdFxuICAgIHdlaWdodHMuZXhpdCgpXG4gICAgICAucmVtb3ZlKCk7XG5cbiAgICAvLyBleGl0XG4gICAgbGlua3MuZXhpdCgpXG4gICAgICAucmVtb3ZlKCk7XG4gIH1cblxuICBpbm5lci5vd25lciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG93bmVyO1xuICAgIH1cbiAgICBvd25lciA9IHZhbHVlO1xuICAgIHJldHVybiBpbm5lcjtcbiAgfTtcblxuICByZXR1cm4gaW5uZXI7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHdpbmRvdy5kMztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7Y29sb3JzfSBmcm9tICcuLi9jb25zdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgb3duZXI7XG5cbiAgZnVuY3Rpb24gaW5uZXIoc2VsZWN0aW9uKSB7XG4gICAgdmFyIG5vZGVzID0gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGUnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubm9kZXM7XG4gICAgICB9LCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5pZDtcbiAgICAgIH0pO1xuXG4gICAgdmFyIGxheW91dCA9IG93bmVyLmxheW91dDtcblxuICAgIHZhciBnID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuICdub2RlICcgKyAoZC5jbGFzcyB8fCAnJyk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpOyB9KVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oeyB0cmFuc2xhdGU6IGQgfSk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgaWYgKCFlbC5vdmVyKSB7XG4gICAgICAgICAgZWwuc3R5bGUoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwub3ZlciA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBlbC5vdmVyID0gZmFsc2U7XG4gICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCBudWxsKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApO1xuICAgIGcudHJhbnNpdGlvbignZW50ZXInKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKTtcbiAgICBnLmNhbGwobGF5b3V0LmRyYWcpO1xuXG4gICAgdmFyIGRyYWdTdGFydCA9IGxheW91dC5kcmFnKCkub24oJ2RyYWdzdGFydC5kM2FkYXB0b3InKTtcbiAgICB2YXIgZHJhZ0VuZCA9IGxheW91dC5kcmFnKCkub24oJ2RyYWdlbmQuZDNhZGFwdG9yJyk7XG4gICAgbGF5b3V0LmRyYWcoKVxuICAgICAgLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBkcmFnU3RhcnQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgfSlcbiAgICAgIC5vbignZHJhZ2VuZC5kM2FkYXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG93bmVyLm5vZGVEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBkcmFnRW5kLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuXG4gICAgZy5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAuYXR0cignZmlsbCcsIGQgPT4gZC5maWxsKVxuICAgICAgLmF0dHIoJ3InLCBkID0+IGQuciApO1xuXG4gICAgLy8gaW5uZXIgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnbGFiZWwnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcxMnB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgLmF0dHIoJ3knLCAoZCkgPT4gZC5oZWlnaHQgLyA0KTtcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQubGFiZWwnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCdsYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLmxhYmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG5cbiAgICAvLyB0b3AtcmlnaHQgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnb3V0ZXItdG9wLXJpZ2h0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgLmF0dHIoJ3gnLCBkID0+IGQud2lkdGggLyAyIC0gMilcbiAgICAgIC5hdHRyKCd5JywgZCA9PiAtZC5oZWlnaHQgLyAyICsgMyk7XG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0Lm91dGVyLXRvcC1yaWdodCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BSaWdodExhYmVsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIHRvcC1sZWZ0IGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ291dGVyLXRvcC1sZWZ0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgIC5hdHRyKCd4JywgZCA9PiAtZC53aWR0aCAvIDIgLSAyKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IC1kLmhlaWdodCAvIDIgKyAzKTtcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLWxlZnQnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCd0b3BSaWdodExhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9wTGVmdExhYmVsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbihub2RlcywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IGRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIGV4aXRcbiAgICBub2Rlcy5leGl0KClcbiAgICAgIC5yZW1vdmUoKTtcbiAgfVxuXG4gIGlubmVyLm93bmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb3duZXI7XG4gICAgfVxuICAgIG93bmVyID0gdmFsdWU7XG4gICAgcmV0dXJuIGlubmVyO1xuICB9O1xuXG4gIHJldHVybiBpbm5lcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBvbHlmaWxscyBmcm9tICcuL3BvbHlmaWxscyc7XG5wb2x5ZmlsbHMoKTtcblxudmFyIGQzID0gd2luZG93LmQzO1xuXG4vLyBub2RlXG5pbXBvcnQgRHJhdyBmcm9tICcuL0RyYXcnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG52YXIgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHJ1bihvcHRpb25zKSB7XG4gIGZ1bmN0aW9uIGZhY3Rvcnkob3B0aW9ucykge1xuICAgIHZhciBlbCA9IGQzLnNlbGVjdChvcHRpb25zLnRhcmdldCk7XG4gICAgdmFyIGlkID0gZWwuYXR0cignZ3JldWxlci1pZCcpO1xuICAgIGlmICghaWQpIHtcbiAgICAgIGlkID0gdXRpbHMuaWQoKTtcbiAgICAgIGVsLmF0dHIoJ2dyZXVsZXItaWQnLCBpZCk7XG4gICAgICBpbnN0YW5jZXNbaWRdID0gbmV3IERyYXcoaWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2VzW2lkXTtcbiAgfVxuXG4gIHJldHVybiBmYWN0b3J5KG9wdGlvbnMpO1xufVxuXG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCc7XG5ydW4uR3JhcGggPSBHcmFwaDtcblxuaW1wb3J0IHtjb2xvcnN9IGZyb20gJy4vY29uc3QnO1xucnVuLmNvbG9ycyA9IGNvbG9ycztcblxuaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllci9pbmRleCc7XG5ydW4ucGxheWVyID0gcGxheWVyO1xuXG5leHBvcnQgZGVmYXVsdCBydW47XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKGFjdGlvbnMsIHNwZWVkKSB7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG5cbiAgICAvLyBzdGF0ZXNcbiAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFjdGlvbnNbdGhpcy5pbmRleCsrXSgpO1xuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQodGhpcy5wbGF5LmJpbmQodGhpcyksIHRoaXMuc3BlZWQpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2UsIHNwZWVkKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZCB8fCBpbnN0YW5jZS5vcHRpb25zLmFuaW1hdGlvblRpbWU7XG4gICAgdGhpcy5mbiA9IG51bGw7XG4gICAgdGhpcy50aW1lciA9IG51bGw7XG4gIH1cblxuICBydW4oZm4pIHtcbiAgICB0aGlzLmZuID0gZm4odGhpcy5pbnN0YW5jZSk7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICBydW5BbmltYXRpb24oYW5pbWF0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYW5pbWF0aW9uKSkge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbi5mb3JFYWNoKHRoaXMucnVuQW5pbWF0aW9uLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbih0aGlzLmluc3RhbmNlKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHRoaXMuaW5zdGFuY2VbYW5pbWF0aW9uLnR5cGVdO1xuICAgIHJldHVybiB0eXBlW2FuaW1hdGlvbi5vcF0uYXBwbHkodHlwZSwgYW5pbWF0aW9uLmFyZ3MgfHwgW10pO1xuICB9XG5cbiAgcGxheSh2YWx1ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbmV4dCA9IHRoaXMuZm4ubmV4dCh2YWx1ZSk7XG4gICAgaWYgKCFuZXh0LmRvbmUpIHtcbiAgICAgIHZhciBkZWxheSA9IHRoaXMuc3BlZWQ7XG4gICAgICB2YXIgcnVuQW5pbWF0aW9uVmFsdWUgPSB0aGlzLnJ1bkFuaW1hdGlvbihuZXh0LnZhbHVlKTtcbiAgICAgIGlmIChydW5BbmltYXRpb25WYWx1ZSAmJiB0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZGVsYXkgPSBydW5BbmltYXRpb25WYWx1ZS5kZWxheTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRpbWVyID0gd2luZG93LnJlcXVlc3RUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5wbGF5KG5leHQudmFsdWUpO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHdpbmRvdy5jbGVhclJlcXVlc3RUaW1lb3V0KHRoaXMudGltZXIpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBGaXhlZCBmcm9tICcuL0ZpeGVkJztcbmltcG9ydCBHZW5lcmF0b3IgZnJvbSAnLi9HZW5lcmF0b3InO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEZpeGVkSW50ZXJ2YWw6IEZpeGVkLFxuICBHZW5lcmF0b3I6IEdlbmVyYXRvclxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvKmVzbGludC1kaXNhYmxlICovXG4gIChmdW5jdGlvbihkb2MsIHByb3RvKSB7XG4gICAgdHJ5IHsgLy8gY2hlY2sgaWYgYnJvd3NlciBzdXBwb3J0cyA6c2NvcGUgbmF0aXZlbHlcbiAgICAgIGRvYy5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgYm9keScpO1xuICAgIH0gY2F0Y2ggKGVycikgeyAvLyBwb2x5ZmlsbCBuYXRpdmUgbWV0aG9kcyBpZiBpdCBkb2Vzbid0XG4gICAgICBbJ3F1ZXJ5U2VsZWN0b3InLCAncXVlcnlTZWxlY3RvckFsbCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHZhciBuYXRpdmUgPSBwcm90b1ttZXRob2RdO1xuICAgICAgICBwcm90b1ttZXRob2RdID0gZnVuY3Rpb24oc2VsZWN0b3JzKSB7XG4gICAgICAgICAgaWYgKC8oXnwsKVxccyo6c2NvcGUvLnRlc3Qoc2VsZWN0b3JzKSkgeyAvLyBvbmx5IGlmIHNlbGVjdG9ycyBjb250YWlucyA6c2NvcGVcbiAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7IC8vIHJlbWVtYmVyIGN1cnJlbnQgZWxlbWVudCBpZFxuICAgICAgICAgICAgdGhpcy5pZCA9ICdJRF8nICsgRGF0ZS5ub3coKTsgLy8gYXNzaWduIG5ldyB1bmlxdWUgaWRcbiAgICAgICAgICAgIHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5yZXBsYWNlKC8oKF58LClcXHMqKTpzY29wZS9nLCAnJDEjJyArIHRoaXMuaWQpOyAvLyByZXBsYWNlIDpzY29wZSB3aXRoICNJRFxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGRvY1ttZXRob2RdKHNlbGVjdG9ycyk7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7IC8vIHJlc3RvcmUgcHJldmlvdXMgaWRcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmUuY2FsbCh0aGlzLCBzZWxlY3RvcnMpOyAvLyB1c2UgbmF0aXZlIGNvZGUgZm9yIG90aGVyIHNlbGVjdG9yc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KSh3aW5kb3cuZG9jdW1lbnQsIEVsZW1lbnQucHJvdG90eXBlKTtcblxuICAvLyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2pvZWxhbWJlcnQvMTAwMjExNlxuICAvL1xuICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSBzaGltIGJ5IFBhdWwgSXJpc2hcbiAgLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICBmdW5jdGlvbigvKiBmdW5jdGlvbiAqLyBjYWxsYmFjaywgLyogRE9NRWxlbWVudCAqLyBlbGVtZW50KXtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICB9O1xuICB9KSgpO1xuXG4gIC8qKlxuICAgKiBCZWhhdmVzIHRoZSBzYW1lIGFzIHNldFRpbWVvdXQgZXhjZXB0IHVzZXMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgd2hlcmUgcG9zc2libGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtpbnR9IGRlbGF5IFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHNcbiAgICovXG4gIHdpbmRvdy5yZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uKGZuLCBkZWxheSkge1xuICAgIGlmKCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgIXdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICEod2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSAmJiAvLyBGaXJlZm94IDUgc2hpcHMgd2l0aG91dCBjYW5jZWwgc3VwcG9ydFxuICAgICAgIXdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZuLCBkZWxheSk7XG5cbiAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgaGFuZGxlID0ge307XG5cbiAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgZGVsdGEgPSBjdXJyZW50IC0gc3RhcnQ7XG5cbiAgICAgIGRlbHRhID49IGRlbGF5ID8gZm4uY2FsbCgpIDogaGFuZGxlLnZhbHVlID0gcmVxdWVzdEFuaW1GcmFtZShsb29wKTtcbiAgICB9XG5cbiAgICBoYW5kbGUudmFsdWUgPSByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApO1xuICAgIHJldHVybiBoYW5kbGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgY2xlYXJUaW1lb3V0IGV4Y2VwdCB1c2VzIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHdoZXJlIHBvc3NpYmxlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICogQHBhcmFtIHtpbnR8b2JqZWN0fSBoYW5kbGUgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICB3aW5kb3cuY2xlYXJSZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOiAvKiBTdXBwb3J0IGZvciBsZWdhY3kgQVBJICovXG4gICAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVx0PyB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICB9O1xuICAvKmVzbGludC1lbmFibGUgKi9cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3Iob3duZXIpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgdGhpcy5ncmFwaCA9IG93bmVyLmdyYXBoO1xuICAgIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucygpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmdldEFuaW1hdGlvblRpbWUoKSxcbiAgICAgIHN0cm9rZTogJyNFNzRDM0MnXG4gICAgfSwgdGhpcy5kZWZhdWx0U3R5bGVPcHRpb25zKTtcbiAgfVxuXG4gIGdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0QW5pbWF0aW9uVGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lci5vcHRpb25zLmFuaW1hdGlvblRpbWU7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzIHJldHVybmVkIGJ5IHRoZSBHcmFwaCBjbGFzcyB0aGlzIG1ldGhvZHMgcmV0dXJuc1xuICAgKiB0aGUgZDMgc2VsZWN0aW9uIHRoYXQgZm9yIGFsbCB0aG9zZSBvYmplY3RzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W118T2JqZWN0fSBlbHMgQW4gYXJyYXkgb2YgZWRnZXMvbm9kZXMgb3IgYSBzaW5nbGUgZWRnZS9ub2RlXG4gICAqIEByZXR1cm4ge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIHNlbGVjdChlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkge1xuICAgICAgZWxzID0gW2Vsc107XG4gICAgfVxuICAgIGlmICghZWxzLmxlbmd0aCkge1xuICAgICAgZWxzLnB1c2goeyBpZDogLTEgfSk7XG4gICAgfVxuICAgIGVscyA9IGVscy5maWx0ZXIoQm9vbGVhbik7XG4gICAgcmV0dXJuIHRoaXMub3duZXIucm9vdC5zZWxlY3RBbGwoXG4gICAgICBlbHMubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiAnIycgKyB1dGlscy5ucyhlLmlkKTtcbiAgICAgIH0pLmpvaW4oJywgJylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIHBhdGggaW5zaWRlIHRoZSB0YWcgPGc+IHRoYXQgcmVwcmVzZW50cyBhbiBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICovXG4gIGlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGguYmFzZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIGNpcmNsZSBpbnNpZGUgdGhlIHRhZyA8Zz4gdGhhdCByZXByZXNlbnRzIGEgbm9kZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqL1xuICBpbm5lck5vZGVTZWxlY3RvcihzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGQzID0gd2luZG93LmQzO1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCc7XG5cbnZhciBISUdITElHSFQgPSAnaGlnaGxpZ2h0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGV4dGVuZHMgR3JhcGgge1xuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXRFZGdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZWRnZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgbm9kZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXROb2RlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGgubm9kZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIGEgbm9kZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBpbmNyZWFzZSB0aGUgcmFkaXVzIHRvIDEuNXggdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKiAtIGRlY3JlYXNlIHRoZSByYWRpdXMgdG8gdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IG9wdGlvbnMuciB8fCAoZC5yICogMS41KSlcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBkLnIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYW4gZWRnZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBjaGFuZ2UgdGhlIHN0cm9rZSBvZiB0aGUgYHBhdGhgIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZSB0b1xuICAgKiBgb3B0aW9ucy5zdHJva2VgXG4gICAqIC0gY2hhbmdlIHRoZSBzdHJva2UgdG8gdGhlIG9yaWdpbmFsIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICBkb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdzdHJva2UnLCAoZCkgPT4gZC5zdHJva2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVkZ2UgdHJhdmVyc2FsIGFuaW1hdGlvbiwgaXQgYW5pbWF0ZXMgYSBoaWRkZW4gcGF0aCBnaXZpbmcgdGhlIGltcHJlc3Npb25cbiAgICogb2YgbW92ZW1lbnQsIGlmIHNvdXJjZSBpcyBnaXZlbiB0aGVuIGl0IHdpbGwgYWx3YXlzIHN0YXJ0IHRoZSBhbmltYXRpb25cbiAgICogZnJvbSB0aGUgbm9kZSBgc291cmNlYCBldmVuIGlmIHRoZSBlZGdlIGlzIGFuIGluY29taW5nIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge2NvbmZpZ30gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW3NvdXJjZT0tMV1cbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICB0cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uKHNlbGVjdGlvbiwgb3B0aW9ucywgc291cmNlID0gLTEpIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdwYXRoLnRyYXZlcnNhbCcpXG4gICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICAgIGVsXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7bH0gJHtsfWApXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgbClcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xuICAgICAgfSlcbiAgICAgIC50cmFuc2l0aW9uKCdkYXNoYXJyYXknKVxuICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpO1xuICAgICAgICB2YXIgdHdpY2VMZW5ndGggPSBsZW5ndGggKiAyO1xuICAgICAgICB2YXIgbGVuZ3RoVG9Nb3ZlID0gMDtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoZC50YXJnZXQuaWQgPT09IHNvdXJjZSkge1xuICAgICAgICAgICAgbGVuZ3RoVG9Nb3ZlID0gdHdpY2VMZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoIC0gbGVuZ3RoVG9Nb3ZlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlbmd0aFRvTW92ZTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApXG4gICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGVsLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIG51bGwpXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdHJhdmVyc2VFZGdlcyhzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSkge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAga2VlcFN0cm9rZTogdHJ1ZSxcbiAgICAgIHJldmVyc2U6IGZhbHNlXG4gICAgfSwgdGhpcy5nZXRTdHlsZU9wdGlvbnMoKSwgb3B0aW9ucyk7XG5cbiAgICBzZWxlY3Rpb24uY2FsbCh0aGlzLnRyYXZlcnNlRWRnZVdpdGhEaXJlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSk7XG4gICAgaWYgKG9wdGlvbnMua2VlcFN0cm9rZSkge1xuICAgICAgdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgICAgIC50cmFuc2l0aW9uKCd1cGRhdGUnKVxuICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKTtcbiAgfVxuXG4gIGdldE5vZGUobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXROb2RlKG5vZGUpKVxuICAgICk7XG4gIH1cblxuICBnZXRFZGdlKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0RWRnZShlZGdlKSlcbiAgICApO1xuICB9XG5cbiAgLy8gdGVtcG9yYWwgaGlnaGxpZ2h0XG5cbiAgaGlnaGxpZ2h0Tm9kZShub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE5vZGUobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgaGlnaGxpZ2h0RWRnZShlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRFZGdlKGVkZ2UpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIGhpZ2hsaWdodEluY2lkZW50RWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBoaWdobGlnaHRPdXRnb2luZ0VkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE91dGdvaW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgaGlnaGxpZ2h0SW5jb21pbmdFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRyYXZlcnNhbCBvZiBhbiBlZGdlIGdpdmVuIGEgbm9kZVxuXG4gIHRyYXZlcnNlT3V0Z29pbmdFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICB0cmF2ZXJzZUluY29taW5nRWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY29taW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgdHJhdmVyc2VJbmNpZGVudEVkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNpZGVudEVkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRyYXZlcnNhbCBvZiBhbiBlZGdlIGJldHdlZW4gdHdvIG5vZGVzXG5cbiAgdHJhdmVyc2VFZGdlc0JldHdlZW4oZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdChcbiAgICAgICAgdGhpcy5ncmFwaC5nZXRFZGdlc0JldHdlZW4oZWRnZSlcbiAgICAgICksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGVkZ2Uuc291cmNlXG4gICAgKTtcbiAgfVxuXG4gIHRyYXZlcnNlQWxsRWRnZXNCZXR3ZWVuKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QoXG4gICAgICAgIHRoaXMuZ3JhcGguZ2V0QWxsRWRnZXNCZXR3ZWVuKGVkZ2UpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucyksXG4gICAgICBlZGdlLnNvdXJjZVxuICAgICk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGxjZyBmcm9tICdjb21wdXRlLWxjZyc7XG5cbnZhciByYW5kID0gbGNnKDEpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG4gPSByYW5kKCk7XG4gICAgdmFyIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcihuICogMjYpICsgOTcpO1xuICAgIHJldHVybiBsZXR0ZXIgKyBuLnRvU3RyaW5nKDE2KS5zdWJzdHIoMik7XG4gIH0sXG5cbiAgdHJhbnNmb3JtOiBmdW5jdGlvbiAobykge1xuICAgIHZhciBzdHIgPSBgYDtcbiAgICBpZiAoJ3RyYW5zbGF0ZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgdHJhbnNsYXRlKCR7by50cmFuc2xhdGUueH0sICR7by50cmFuc2xhdGUueX0pYDtcbiAgICB9XG4gICAgaWYgKCdyb3RhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHJvdGF0ZSgke28ucm90YXRlfSlgO1xuICAgIH1cbiAgICBpZiAoJ3NjYWxlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCBzY2FsZSgke28uc2NhbGV9KWA7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH0sXG5cbiAgdHJhbnNpdGlvbjogZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC50cmFuc2l0aW9uKCdsYXlvdXQnKVxuICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgIC5lYXNlKCdsaW5lYXInKTtcbiAgfSxcblxuICBjb25kaXRpb25hbFRyYW5zaXRpb246IGZ1bmN0aW9uIChlbCwgY29uZGl0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbihlbCk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfSxcblxuICBuczogZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiAnZ3JldWxlci0nICsgc3RyO1xuICB9XG59O1xuIl19
