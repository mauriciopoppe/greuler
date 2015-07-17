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

  function versor(p) {
    var dx = p.x;
    var dy = p.y;
    var l = Math.sqrt(dx * dx + dy * dy);
    return {
      x: p.x / l,
      y: p.y / l
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
      var loop = selfLoop(u, 1.5 * margin * v.r * (current.count + 1));
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

    var NabP0 = versor({
      x: innerJoints[0].x - u.x,
      y: innerJoints[0].y - u.y
    });

    innerJoints.unshift({
      x: u.x + NabP0.x * u.r,
      y: u.y + NabP0.y * u.r
    });

    var l = innerJoints.length - 1;

    var NabP1 = versor({
      x: v.x - innerJoints[l].x,
      y: v.y - innerJoints[l].y
    });

    innerJoints.push({
      x: v.x - NabP1.x * v.r,
      y: v.y - NabP1.y * v.r
    });

    d.path = innerJoints;
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
    weights.enter().append('text').classed('weight', true).attr('font-size', '9px').attr('dominant-baseline', 'text-after-edge').attr('text-anchor', 'middle').call(weightPosition);

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
    //.attr('y', (d) => d.height / 4);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvRHJhdy5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvR3JhcGguanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvY29uc3QuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2VsZW1lbnRzL2VkZ2UuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2luZGV4LmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy9wbGF5ZXIvRml4ZWQuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL3BsYXllci9pbmRleC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvcG9seWZpbGxzLmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvc2VsZWN0b3IvR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uLmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O3NCQUtNLFFBQVE7Ozs7NEJBQ1YsaUJBQWlCOzs7OzRCQUNqQixpQkFBaUI7Ozs7cUJBQ1QsU0FBUzs7OztnREFDRyxxQ0FBcUM7Ozs7QUFQMUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNuQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDOztJQVFGLElBQUk7QUFDWixXQURRLElBQUksQ0FDWCxFQUFFLEVBQUUsT0FBTyxFQUFFOzBCQUROLElBQUk7O0FBRXJCLFFBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixRQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7O0FBRXRELFFBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7QUFFL0IsUUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBRzdCLFFBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7O0FBR25CLFFBQUksQ0FBQyxRQUFRLEdBQUcsa0RBQTZCLElBQUksQ0FBQyxDQUFDOzs7QUFHbkQsUUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxRQUFJLENBQUMsVUFBVSxHQUFHLGdDQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHckMsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O0FBRS9CLFFBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZO0FBQ2pDLFVBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNiLENBQUMsQ0FBQzs7QUFFSCxRQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVk7QUFDaEMsVUFBSSxRQUFRLEVBQUU7QUFDWixZQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzdCLGdCQUFRLEdBQUcsS0FBSyxDQUFDO09BQ2xCO0tBQ0YsQ0FBQyxDQUFDO0dBQ0o7O2VBakNrQixJQUFJOztXQW1DWix1QkFBRztBQUNaLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzdCLFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkIsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7O0FBR3ZCLFVBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFVBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVoQixVQUFJLENBQUMsS0FBSyxHQUFHLHVCQUFpQixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsV0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtBQUM1QixZQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUMxQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1QsV0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtBQUM1QixZQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUMxQixFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBd0JhLHdCQUFDLE9BQU8sRUFBRTs7QUFFdEIsYUFBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcseUJBQU87QUFDOUIsYUFBSyxFQUFFLEdBQUc7QUFDVixjQUFNLEVBQUUsR0FBRztBQUNYLHFCQUFhLEVBQUUsSUFBSTtBQUNuQixjQUFNLEVBQUUsSUFBSTtBQUNaLGdCQUFRLEVBQUUsS0FBSztPQUNoQixFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUVaLFVBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLHlCQUFPO0FBQ3pCLGFBQUssRUFBRSxFQUFFO0FBQ1QsYUFBSyxFQUFFLEVBQUU7QUFDVCxjQUFNLEVBQUUsRUFBRTtBQUNWLG1CQUFXLEVBQUUsRUFBRTtBQUNmLHFCQUFhLEVBQUUsSUFBSTtBQUNuQixZQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDckMsb0JBQVksRUFBRSxzQkFBVSxDQUFDLEVBQUU7QUFDekIsaUJBQU8sQ0FBQyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7U0FDN0I7T0FDRixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7OztXQUVTLG9CQUFDLGFBQWEsRUFBRTtBQUN4QixVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWhCLFVBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtBQUM1QixlQUFPO09BQ1I7O0FBRUQsWUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNsRCxZQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixZQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ25CLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUdULFVBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDckI7OztXQUVHLGdCQUFHO0FBQ0wsVUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLFVBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN0Qzs7O1dBRUssZ0JBQUMsYUFBYSxFQUFFO0FBQ3BCLG1CQUFhLEdBQUcseUJBQU87QUFDckIsa0JBQVUsRUFBRSxLQUFLO09BQ2xCLEVBQUUsYUFBYSxDQUFDLENBQUM7O0FBRWxCLFVBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDL0IsVUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O0FBRzFCLFVBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtBQUM1QixZQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDYjs7QUFFRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFSSxpQkFBRztBQUNOLFVBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUN2QyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQ3hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7QUFHeEIsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNiLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7OztBQUc1QixVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDWixNQUFNLENBQUMsVUFBVSxDQUFDLENBQ2xCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FDdEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUNsQixJQUFJLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUd4QixVQUFJLENBQUMsSUFBSSxDQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDakMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHdkMsVUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUN2QixTQUFTLENBQUMsU0FBUyxDQUFDLENBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUFFLGVBQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7T0FBRSxDQUFDLENBQUM7QUFDM0MsVUFBSSxDQUFDLFNBQVMsQ0FDWCxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7OztBQUcxQixVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQ3ZCLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQUUsZUFBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUFFLENBQUMsQ0FBQztBQUMzQyxVQUFJLENBQUMsU0FBUyxDQUNYLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMzQjs7O1NBckxrQixJQUFJOzs7cUJBQUosSUFBSTs7OztBQ1h6QixZQUFZLENBQUM7Ozs7Ozs7Ozs7OztzQkFFTSxRQUFROzs7O3FCQUNWLFNBQVM7Ozs7cUJBQ0wsU0FBUzs7QUFFOUIsSUFBTSxvQkFBb0IsR0FBRztBQUMzQixHQUFDLEVBQUUsRUFBRTtBQUNMLE1BQUksRUFBRSxTQUFTO0NBQ2hCLENBQUM7O0FBRUYsSUFBTSxvQkFBb0IsR0FBRztBQUMzQixRQUFNLEVBQUUsT0FSRixNQUFNLENBUUcsVUFBVTtDQUMxQixDQUFDOztBQUVGLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUU7QUFDekIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN0QyxRQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO0FBQ3BCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7R0FDRjtDQUNGOzs7Ozs7OztJQU9vQixLQUFLO0FBQ2IsV0FEUSxLQUFLLENBQ1osS0FBSyxFQUFFLElBQUksRUFBRTswQkFETixLQUFLOztBQUV0QixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQ3pCOztlQUxrQixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBMEJqQixtQkFBRztBQUNSLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDNUMsWUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLFlBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2hDLGdCQUFNLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1NBQ3ZEO0FBQ0QsWUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3hCLGdCQUFNLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3RDO0FBQ0QsWUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2IsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUNsRCxDQUFDO09BQ0g7S0FDRjs7Ozs7Ozs7Ozs7V0FTTSxpQkFBQyxJQUFJLEVBQUU7QUFDWixhQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBQSxDQUFDO2VBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwRDs7Ozs7Ozs7Ozs7V0FTVyxzQkFBQyxFQUFFLEVBQUU7QUFDZixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzlCOzs7Ozs7Ozs7OztXQVNlLDBCQUFDLElBQUksRUFBRTtBQUNyQixVQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDdkIsVUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsVUFBSSxJQUFJLENBQUM7QUFDVCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QyxZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLFlBQUksR0FBRyxJQUFJLENBQUM7QUFDWixZQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDOUIsY0FBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEIsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDckMsY0FBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7O0FBRUQsWUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzNCLGVBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLHVCQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO09BQ0Y7O0FBRUQsYUFBTyxhQUFhLENBQUM7S0FDdEI7Ozs7Ozs7Ozs7O1dBU2dCLDJCQUFDLElBQUksRUFBRTtBQUN0QixVQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbkIsVUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsVUFBSSxJQUFJLENBQUM7QUFDVCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QyxZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLFlBQUksR0FBRyxJQUFJLENBQUM7QUFDWixZQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDOUIsY0FBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7QUFDRCxZQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDM0IsZUFBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDdEIsbUJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7T0FDRjs7QUFFRCxhQUFPLFNBQVMsQ0FBQztLQUNsQjs7Ozs7Ozs7Ozs7V0FTa0IsNkJBQUMsSUFBSSxFQUFFO0FBQ3hCLFVBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyQixVQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixVQUFJLElBQUksQ0FBQztBQUNULFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzdDLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIsWUFBSSxHQUFHLElBQUksQ0FBQztBQUNaLFlBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUM5QixjQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjtBQUNELFlBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixlQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN0QixxQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjtPQUNGOztBQUVELGFBQU8sV0FBVyxDQUFDO0tBQ3BCOzs7Ozs7Ozs7O1dBUVMsb0JBQUMsSUFBSSxFQUFFO0FBQ2YsVUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNoQyxlQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztPQUN6QixDQUFDLENBQUM7S0FDSjs7Ozs7Ozs7OztXQVFVLHFCQUFDLEtBQUssRUFBRTs7QUFFakIsVUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNoQyxlQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQzlCLENBQUMsQ0FBQztLQUNKOzs7Ozs7Ozs7O1dBUWMseUJBQUMsRUFBRSxFQUFFO0FBQ2xCLFVBQUksQ0FBQyxDQUFDO0FBQ04sV0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pDLFlBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7O0FBRXhCLGNBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFbkMsY0FBSSxDQUFDLFdBQVcsQ0FDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7QUFDRixXQUFDLElBQUksQ0FBQyxDQUFDO1NBQ1I7T0FDRjtLQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXFCTSxtQkFBRztBQUNSLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDNUMsWUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUUxQixZQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDeEUsZ0JBQU0sS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7U0FDeEU7QUFDRCxZQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzNCLFlBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7O0FBRTNCLFlBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQzlCLGdCQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM5Qzs7QUFFRCxZQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUM5QixnQkFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDOUM7O0FBRUQsWUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUN0QixnQkFBTSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUN6RDtBQUNELGNBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLGNBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLFlBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNiLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FDbEQsQ0FBQztPQUNIO0tBQ0Y7Ozs7Ozs7Ozs7O1dBU00saUJBQUMsSUFBSSxFQUFFO0FBQ1osYUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUEsQ0FBQztlQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7T0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDcEQ7Ozs7Ozs7Ozs7Ozs7V0FXYyx5QkFBQyxPQUFPLEVBQUU7QUFDdkIsYUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BDLGVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO09BQ3pFLENBQUMsQ0FBQztLQUNKOzs7Ozs7Ozs7Ozs7O1dBV2lCLDRCQUFDLE9BQU8sRUFBRTtBQUMxQixhQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDcEMsZUFBTyxBQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sSUFDckUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsTUFBTSxBQUFDLENBQUM7T0FDdEUsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7Ozs7V0FRUyxvQkFBQyxJQUFJLEVBQUU7QUFDZixVQUFJLENBQUMsZUFBZSxDQUFDLFVBQUEsQ0FBQztlQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7T0FBQSxDQUFDLENBQUM7S0FDN0M7Ozs7Ozs7Ozs7V0FRVSxxQkFBQyxLQUFLLEVBQUU7O0FBRWpCLFVBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDaEMsZUFBTyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUM5QixDQUFDLENBQUM7S0FDSjs7Ozs7Ozs7OztXQVFjLHlCQUFDLEVBQUUsRUFBRTtBQUNsQixVQUFJLENBQUMsQ0FBQztBQUNOLFdBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6QyxZQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLGNBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixXQUFDLElBQUksQ0FBQyxDQUFDO1NBQ1I7T0FDRjtLQUNGOzs7Ozs7Ozs7O1dBUVcsc0JBQUMsRUFBRSxFQUFFO0FBQ2YsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM5Qjs7Ozs7Ozs7Ozs7V0FTZSwwQkFBQyxJQUFJLEVBQUU7QUFDckIsYUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUMsQ0FBQztlQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFO09BQUEsQ0FBQyxDQUFDO0tBQzFEOzs7Ozs7Ozs7OztXQVNlLDBCQUFDLElBQUksRUFBRTtBQUNyQixhQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBQyxDQUFDO2VBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7T0FBQSxDQUFDLENBQUM7S0FDMUQ7Ozs7Ozs7Ozs7O1dBU2UsMEJBQUMsSUFBSSxFQUFFO0FBQ3JCLGFBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDeEM7Ozs7Ozs7OztXQU9FLGVBQUc7QUFDSixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLFlBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEIsWUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDOUQsY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQixNQUFNO0FBQ0wsY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQjtPQUNGO0tBQ0Y7OztXQUV3Qiw0QkFBQyxDQUFDLEVBQUU7QUFDM0IsVUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDM0IsU0FBQyxDQUFDLEVBQUUsR0FBRyxtQkFBSyxFQUFFLEVBQUUsQ0FBQztPQUNsQjs7QUFFRCxPQUFDLEdBQUcseUJBQ0YsRUFBRTs7QUFFRiwwQkFBb0I7O0FBRXBCLFVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTs7QUFFekIsT0FBQyxDQUNGLENBQUM7O0FBRUYsVUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDOUIsU0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUNuQjtBQUNELFVBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQy9CLFNBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDcEI7QUFDRCxhQUFPLENBQUMsQ0FBQztLQUNWOzs7V0FFd0IsNEJBQUMsQ0FBQyxFQUFFO0FBQzNCLFVBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzNCLFNBQUMsQ0FBQyxFQUFFLEdBQUcsbUJBQUssRUFBRSxFQUFFLENBQUM7T0FDbEI7QUFDRCxPQUFDLEdBQUcseUJBQ0YsRUFBRTs7QUFFRiwwQkFBb0I7O0FBRXBCLFVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTs7QUFFekIsT0FBQyxDQUNGLENBQUM7QUFDRixhQUFPLENBQUMsQ0FBQztLQUNWOzs7Ozs7Ozs7Ozs7Ozs7OztXQWVZLGdCQUFDLE9BQU8sRUFBRTtBQUNyQixhQUFPLEdBQUcseUJBQU87QUFDZixhQUFLLEVBQUUsRUFBRTtBQUNULFlBQUksRUFBRSxFQUFFO0FBQ1IsaUJBQVMsRUFBRSxLQUFLO0FBQ2hCLGtCQUFVLEVBQUUsS0FBSztBQUNqQixtQkFBVyxFQUFFLEtBQUs7T0FDbkIsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFWixVQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ1osVUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsVUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFdBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3JDLHFCQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLGFBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUN2Qjs7QUFFRCxlQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2pCLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztPQUNsRDs7QUFFRCxVQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixPQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVOLFVBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtBQUNyQixhQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNyQyxXQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEMsYUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLGVBQUssQ0FBQyxJQUFJLENBQUM7QUFDVCxrQkFBTSxFQUFFLENBQUM7QUFDVCxrQkFBTSxFQUFFLENBQUM7V0FDVixDQUFDLENBQUM7U0FDSjtBQUNELFNBQUMsSUFBSSxDQUFDLENBQUM7T0FDUjs7QUFFRCxhQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDL0IsU0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QyxTQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUU5QyxZQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO0FBQ25DLFdBQUMsSUFBSSxDQUFDLENBQUM7U0FDUixNQUFNLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNyRCxXQUFDLElBQUksQ0FBQyxDQUFDO1NBQ1IsTUFBTTtBQUNMLGFBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDVixlQUFLLENBQUMsSUFBSSxDQUFDO0FBQ1Qsa0JBQU0sRUFBRSxDQUFDO0FBQ1Qsa0JBQU0sRUFBRSxDQUFDO1dBQ1YsQ0FBQyxDQUFDO1NBQ0o7T0FDRjs7QUFFRCxhQUFPO0FBQ0wsYUFBSyxFQUFFLEtBQUs7QUFDWixhQUFLLEVBQUUsS0FBSztPQUNiLENBQUM7S0FDSDs7O1NBMWVrQixLQUFLOzs7cUJBQUwsS0FBSzs7OztBQzVCMUIsWUFBWSxDQUFDOzs7Ozs7Ozs7O0lBRVAsTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLENBQUMsRUFBRSxDQUFDLEVBQUU7MEJBRGQsTUFBTTs7QUFFUixRQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNYLFFBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ1o7O2VBSkcsTUFBTTs7Ozs7V0FRQSxhQUFDLENBQUMsRUFBRTtBQUNaLGFBQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9COzs7V0FFUyxhQUFDLENBQUMsRUFBRTtBQUNaLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkM7OztXQUVXLGVBQUMsQ0FBQyxFQUFFO0FBQ2QsYUFBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlCOzs7V0FFVSxjQUFDLENBQUMsRUFBRTtBQUNiLFVBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDMUIsY0FBTSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztPQUM5QztBQUNELFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIsYUFBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0tBQy9DOzs7V0FFZ0Isb0JBQUMsQ0FBQyxFQUFFO0FBQ25CLGFBQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5Qjs7O1dBRWMsa0JBQUMsQ0FBQyxFQUFFO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUM3Qzs7Ozs7O1dBSVMsYUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2YsYUFBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekM7OztXQUVTLGFBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNmLGFBQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDOzs7V0FFUyxhQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDZixhQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUI7OztXQUVXLGVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNqQixhQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckM7OztXQUVTLGFBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNmLGFBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUM1Qzs7O1dBRWtCLHNCQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEIsYUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BFOzs7U0E1REcsTUFBTTs7O3FCQWlFRyxNQUFNOzs7O0FDbkVyQixZQUFZLENBQUM7Ozs7O0FBRWIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNuQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLGFBQWEsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVHLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3BDLFFBQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFFBQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDakQsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxZQUFZO0FBQ3JDLFNBQU8sS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDdEQsQ0FBQzs7UUFFTSxNQUFNLEdBQU4sTUFBTTs7O0FDZmQsWUFBWSxDQUFDOzs7Ozs7OztzQkFJTSxRQUFROzs7O3NCQUNSLFdBQVc7Ozs7cUJBQ1osVUFBVTs7OztBQUo1QixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDOztxQkFNSixZQUFZOztBQUV6QixNQUFJLEtBQUssQ0FBQzs7QUFFVixXQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzNCLFFBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0MsUUFBSSxHQUFHLEdBQUcsd0JBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNCLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDM0MsVUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLFVBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ2pCLFdBQUcsR0FBRyxvQkFBTyxJQUFJLENBQUMsb0JBQU8sR0FBRyxDQUMxQixHQUFHLEVBQ0gsb0JBQU8sSUFBSSxDQUFDLG9CQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDOUIsQ0FBQyxDQUFDO09BQ0o7S0FDRjs7O0FBR0QsUUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM5QixTQUFHLEdBQUcsb0JBQU8sSUFBSSxDQUFDLHdCQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEM7O0FBRUQsUUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ1osUUFBSSxFQUFFLEdBQUcsb0JBQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxvQkFBTyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFFBQUksR0FBRyxHQUFHLG9CQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDNUIsUUFBSSxHQUFHLEdBQUcsb0JBQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVqQyxRQUFJLEtBQUssR0FBRyxvQkFBTyxHQUFHLENBQUMsR0FBRyxFQUFFLG9CQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9ELFFBQUksSUFBSSxHQUFHLG9CQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsb0JBQU8sS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFL0QsV0FBTztBQUNMLFVBQUksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDO0FBQ3ZCLFNBQUcsRUFBRSxHQUFHO0tBQ1QsQ0FBQztHQUNIOztBQUVELFdBQVMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUNqQixRQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2IsUUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNiLFFBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFFLENBQUM7QUFDdkMsV0FBTztBQUNMLE9BQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDVixPQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQ1gsQ0FBQztHQUNIOztBQUVELFdBQVMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ25DLFFBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNULFFBQUksT0FBTyxDQUFDOztBQUVaLEtBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2IsS0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDYixRQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtpQkFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFBZCxPQUFDO0FBQUUsT0FBQztLQUNOO0FBQ0QsUUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFOUIsV0FBTyxHQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJO0FBQ2hELFdBQUssRUFBRSxDQUFDO0FBQ1IsU0FBRyxFQUFFLG9CQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JCLGVBQVMsRUFBRSxDQUFDLENBQUM7S0FDZCxBQUFDLENBQUM7O0FBRUgsUUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDOztBQUVyQixRQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRTs7QUFFakIsVUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFDLENBQUM7QUFDakUsaUJBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3hCLE9BQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNuQixNQUFNO0FBQ0wsVUFBSSxJQUFJLENBQUM7QUFDVCxVQUFJLG9CQUFPLEdBQUcsQ0FBQyxvQkFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEMsWUFBSSxHQUFHLG9CQUFPLElBQUksQ0FBQyxvQkFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDdEMsTUFBTTtBQUNMLFlBQUksR0FBRyx3QkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7T0FDekI7O0FBRUQsK0JBQU8sT0FBTyxFQUFFO0FBQ2QsWUFBSSxFQUFFLElBQUk7QUFDVixtQkFBVyxFQUFFLG9CQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUM7T0FDckMsQ0FBQyxDQUFDO0FBQ0gsaUJBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQU8sR0FBRyxDQUN6QixPQUFPLENBQUMsR0FBRyxFQUNYLG9CQUFPLEtBQUssQ0FDVixPQUFPLENBQUMsV0FBVyxFQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FDakUsQ0FDRixDQUFDLENBQUM7QUFDSCxPQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7S0FDdkI7O0FBRUQsV0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDbkIsV0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFeEIsUUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ2pCLE9BQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLE9BQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzFCLENBQUMsQ0FBQzs7QUFFSCxlQUFXLENBQUMsT0FBTyxDQUFDO0FBQ2xCLE9BQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEIsT0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN2QixDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRS9CLFFBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUNqQixPQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixPQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQixDQUFDLENBQUM7O0FBRUgsZUFBVyxDQUFDLElBQUksQ0FBQztBQUNmLE9BQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEIsT0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN2QixDQUFDLENBQUM7O0FBRUgsS0FBQyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7R0FDdEI7O0FBRUQsTUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQUUsV0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQUUsQ0FBQyxDQUMvQixDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFBRSxXQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FBRSxDQUFDLENBQy9CLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztBQUl4QixXQUFTLEtBQUssQ0FBQyxTQUFTLEVBQUU7O0FBRXhCLFFBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNqQixhQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDaEIsRUFBRSxVQUFVLENBQUMsRUFBRTtBQUNkLGFBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNiLENBQUMsQ0FBQztBQUNMLFNBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ3RCLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFBRSxhQUFPLG1CQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FBRSxDQUFDLENBQ25ELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBR3RCLFNBQUssQ0FDRixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDakIsVUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixVQUFJLEdBQUcsR0FBRztBQUNSLGdCQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVE7T0FDL0MsQ0FBQztBQUNGLFNBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDcEMsU0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNwQyxVQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ25CLENBQUMsQ0FBQzs7QUFFTCxRQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxTQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3RCLGdCQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztLQUMxQixDQUFDLENBQUM7OztBQUdILFFBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTs7O0FBR2pCLGFBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDZixDQUFDLENBQUM7QUFDTCxTQUFLLENBQUMsS0FBSyxFQUFFLENBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLE1BQU07S0FBQSxDQUFDLENBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDcEIsVUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixRQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsVUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1gsVUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDMUI7QUFDRCxVQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxVQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQixVQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztPQUMvQjtLQUNGLENBQUMsQ0FBQzs7Ozs7OztBQU9MLHVCQUFNLHFCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDcEQsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFBLENBQUM7YUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUFBLENBQUMsQ0FBQzs7QUFFaEMsU0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDekIsVUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixVQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QyxVQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxZQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FDdEIsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUM5QixJQUFJLENBQ1QsQ0FBQztPQUNIO0tBQ0YsQ0FBQyxDQUFDOztBQUVILGFBQVMsY0FBYyxDQUFDLFNBQVMsRUFBRTtBQUNqQyxlQUFTLENBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsRUFBRTtBQUM5QixZQUFJLEtBQUssR0FBRyxvQkFBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlDLGVBQU8sbUJBQU0sU0FBUyxDQUFDO0FBQ3JCLG1CQUFTLEVBQUUsQ0FBQztBQUNaLGdCQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQztLQUNOOztBQUVELFFBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUFFLGFBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFFLENBQUMsQ0FBQzs7O0FBR3RDLFdBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FDWixNQUFNLENBQUMsTUFBTSxDQUFDLENBQ2QsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FDeEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQzVDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs7O0FBR3hCLHVCQUFNLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDdEQsSUFBSSxDQUFDLFVBQUEsQ0FBQzthQUFJLENBQUMsQ0FBQyxNQUFNO0tBQUEsQ0FBQyxDQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7OztBQUd4QixXQUFPLENBQUMsSUFBSSxFQUFFLENBQ1gsTUFBTSxFQUFFLENBQUM7OztBQUdaLFNBQUssQ0FBQyxJQUFJLEVBQUUsQ0FDVCxNQUFNLEVBQUUsQ0FBQztHQUNiOztBQUVELE9BQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDN0IsUUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDckIsYUFBTyxLQUFLLENBQUM7S0FDZDtBQUNELFNBQUssR0FBRyxLQUFLLENBQUM7QUFDZCxXQUFPLEtBQUssQ0FBQztHQUNkLENBQUM7O0FBRUYsU0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7QUNsUUQsWUFBWSxDQUFDOzs7Ozs7OztxQkFJSyxVQUFVOzs7O3FCQUNQLFVBQVU7O0FBSC9CLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7O3FCQUtKLFlBQVk7O0FBRXpCLE1BQUksS0FBSyxDQUFDOztBQUVWLFdBQVMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUN4QixRQUFJLEtBQUssR0FBRyxTQUFTLENBQ2xCLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2pCLGFBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNoQixFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ2QsYUFBTyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ2IsQ0FBQyxDQUFDOztBQUVMLFFBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLFFBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDMUIsYUFBTyxPQUFPLElBQUksQ0FBQyxTQUFNLElBQUksRUFBRSxDQUFBLEFBQUMsQ0FBQztLQUNsQyxDQUFDLENBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtBQUFFLGFBQU8sbUJBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUFFLENBQUMsQ0FDbkQsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsRUFBRTtBQUM5QixhQUFPLG1CQUFNLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzFDLENBQUMsQ0FDRCxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVk7QUFDM0IsVUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixVQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtBQUNaLFVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO09BQy9CO0FBQ0QsUUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDaEIsQ0FBQyxDQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWTtBQUMxQixVQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLFFBQUUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2hCLFFBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzFCLENBQUMsQ0FDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLEtBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEIsS0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXBCLFFBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN4RCxRQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDcEQsVUFBTSxDQUFDLElBQUksRUFBRSxDQUNWLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZO0FBQ3JDLFdBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGVBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3ZDLENBQUMsQ0FDRCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsWUFBWTtBQUNuQyxXQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMzQixhQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNyQyxDQUFDLENBQUM7O0FBRUwsS0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FDZixJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsQ0FBQzthQUFLLENBQUMsQ0FBQyxJQUFJO0tBQUEsQ0FBQyxDQUMzQixJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsQ0FBQzthQUFLLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBRSxDQUFDOzs7QUFHMUIsS0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FDYixPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUM3QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxDQUFDLENBQUM7O0FBRXhDLFNBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNqQixVQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7QUFDaEIsZUFBTyxDQUFDLENBQUMsS0FBSyxDQUFDO09BQ2hCO0FBQ0QsYUFBTyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ2IsQ0FBQyxDQUFDOzs7QUFHTCxLQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNiLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQTdFWixNQUFNLENBNkVhLElBQUksQ0FBQyxDQUN6QixJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUM1QixJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUEsQ0FBQzthQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUM7S0FBQSxDQUFDLENBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0FBQ3JDLFNBQUssQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2pCLFVBQUksZUFBZSxJQUFJLENBQUMsRUFBRTtBQUN4QixlQUFPLENBQUMsQ0FBQyxhQUFhLENBQUM7T0FDeEI7S0FDRixDQUFDLENBQUM7OztBQUdMLEtBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQ2IsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLE9BNUZaLE1BQU0sQ0E0RmEsSUFBSSxDQUFDLENBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQzFCLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQUEsQ0FBQyxDQUNoQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUEsQ0FBQzthQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FBQztBQUNyQyxTQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNqQixVQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUU7QUFDeEIsZUFBTyxDQUFDLENBQUMsWUFBWSxDQUFDO09BQ3ZCO0tBQ0YsQ0FBQyxDQUFDOzs7QUFHTCx1QkFBTSxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQ3BELElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDOUIsYUFBTyxtQkFBTSxTQUFTLENBQUM7QUFDckIsaUJBQVMsRUFBRSxDQUFDO09BQ2IsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDOzs7QUFHTCxTQUFLLENBQUMsSUFBSSxFQUFFLENBQ1QsTUFBTSxFQUFFLENBQUM7R0FDYjs7QUFFRCxPQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsS0FBSyxFQUFFO0FBQzdCLFFBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3JCLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDRCxTQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2QsV0FBTyxLQUFLLENBQUM7R0FDZCxDQUFDOztBQUVGLFNBQU8sS0FBSyxDQUFDO0NBQ2Q7Ozs7O0FDbklELFlBQVksQ0FBQzs7Ozs7Ozs7eUJBRVMsYUFBYTs7Ozs7O29CQU1sQixRQUFROzs7O3FCQUNQLFNBQVM7Ozs7cUJBbUJULFNBQVM7Ozs7cUJBR04sU0FBUzs7MkJBR1gsZ0JBQWdCOzs7O0FBL0JuQyw2QkFBVyxDQUFDOztBQUVaLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7O0FBTW5CLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFO0FBQ3BCLFdBQVMsT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUN4QixRQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQyxRQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQy9CLFFBQUksQ0FBQyxFQUFFLEVBQUU7QUFDUCxRQUFFLEdBQUcsbUJBQU0sRUFBRSxFQUFFLENBQUM7QUFDaEIsUUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUIsZUFBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHNCQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2QztBQUNELFdBQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ3RCOztBQUVELFNBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3pCOztBQUdELEdBQUcsQ0FBQyxLQUFLLHFCQUFRLENBQUM7O0FBR2xCLEdBQUcsQ0FBQyxNQUFNLFVBREYsTUFBTSxBQUNLLENBQUM7O0FBR3BCLEdBQUcsQ0FBQyxNQUFNLDJCQUFTLENBQUM7O3FCQUVMLEdBQUc7Ozs7QUNyQ2xCLFlBQVksQ0FBQzs7Ozs7Ozs7OztJQUVRLE1BQU07QUFDZCxXQURRLE1BQU0sQ0FDYixPQUFPLEVBQUUsS0FBSyxFQUFFOzBCQURULE1BQU07O0FBRXZCLFFBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7OztBQUd2QixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztHQUNuQjs7ZUFSa0IsTUFBTTs7V0FVckIsZ0JBQUc7QUFDTCxVQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDcEMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzdCLFlBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUMzRDtLQUNGOzs7V0FFSSxpQkFBRztBQUNOLGtCQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOzs7V0FFRyxnQkFBRztBQUNMLFVBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLFVBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCOzs7U0F4QmtCLE1BQU07OztxQkFBTixNQUFNOzs7O0FDRjNCLFlBQVksQ0FBQzs7Ozs7Ozs7OztJQUVRLFNBQVM7QUFDakIsV0FEUSxTQUFTLENBQ2hCLFFBQVEsRUFBRSxLQUFLLEVBQUU7MEJBRFYsU0FBUzs7QUFFMUIsUUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDckQsUUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztHQUNuQjs7ZUFOa0IsU0FBUzs7V0FRekIsYUFBQyxFQUFFLEVBQUU7QUFDTixVQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUIsVUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2I7OztXQUVXLHNCQUFDLFNBQVMsRUFBRTtBQUN0QixVQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDNUIsZUFBTyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDbkQ7O0FBRUQsVUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDbkMsZUFBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ2pDOztBQUVELFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FDN0Q7OztXQUVHLGNBQUMsS0FBSyxFQUFFO0FBQ1YsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2QsWUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2QixZQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RELFlBQUksaUJBQWlCLElBQUksT0FBTyxpQkFBaUIsS0FBSyxRQUFRLEVBQUU7QUFDOUQsY0FBSSxPQUFPLGlCQUFpQixDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDL0MsaUJBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7V0FDakM7U0FDRjs7QUFFRCxZQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWTtBQUM3QyxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QixFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ1g7S0FDRjs7O1dBRUksaUJBQUc7QUFDTixZQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hDOzs7U0E5Q2tCLFNBQVM7OztxQkFBVCxTQUFTOzs7O0FDRjlCLFlBQVksQ0FBQzs7Ozs7Ozs7cUJBRUssU0FBUzs7Ozt5QkFDTCxhQUFhOzs7O3FCQUVwQjtBQUNiLGVBQWEsb0JBQU87QUFDcEIsV0FBUyx3QkFBVztDQUNyQjs7OztBQ1JELFlBQVksQ0FBQzs7Ozs7O3FCQUVFLFlBQVk7O0FBRXpCLEdBQUMsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3BCLFFBQUk7O0FBQ0YsU0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUNsQyxDQUFDLE9BQU8sR0FBRyxFQUFFOztBQUNaLE9BQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsTUFBTSxFQUFFO0FBQzdELFlBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixhQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBUyxTQUFTLEVBQUU7QUFDbEMsY0FBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O0FBQ3BDLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ2pCLGdCQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDN0IscUJBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEUsZ0JBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNwQyxnQkFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDYixtQkFBTyxNQUFNLENBQUM7V0FDZixNQUFNO0FBQ0wsbUJBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7V0FDckM7U0FDRixDQUFBO09BQ0YsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFBLENBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7OztBQU12QyxRQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxZQUFXO0FBQ3BDLFdBQVEsTUFBTSxDQUFDLHFCQUFxQixJQUNsQyxNQUFNLENBQUMsMkJBQTJCLElBQ2xDLE1BQU0sQ0FBQyx3QkFBd0IsSUFDL0IsTUFBTSxDQUFDLHNCQUFzQixJQUM3QixNQUFNLENBQUMsdUJBQXVCLElBQzlCLHlCQUF3QixRQUFRLGtCQUFtQixPQUFPLEVBQUM7QUFDekQsWUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDLENBQUM7R0FDTCxDQUFBLEVBQUcsQ0FBQzs7Ozs7OztBQU9MLFFBQU0sQ0FBQyxjQUFjLEdBQUcsVUFBUyxFQUFFLEVBQUUsS0FBSyxFQUFFO0FBQzFDLFFBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLElBQy9CLENBQUMsTUFBTSxDQUFDLDJCQUEyQixJQUNuQyxFQUFFLE1BQU0sQ0FBQyx3QkFBd0IsSUFBSSxNQUFNLENBQUMsOEJBQThCLENBQUEsQUFBQztBQUMzRSxLQUFDLE1BQU0sQ0FBQyxzQkFBc0IsSUFDOUIsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQy9CLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRXRDLFFBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDakMsUUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUVoQixhQUFTLElBQUksR0FBRztBQUNkLFVBQUksT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO1VBQ2hDLEtBQUssR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDOztBQUUxQixXQUFLLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BFOztBQUVELFVBQU0sQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsV0FBTyxNQUFNLENBQUM7R0FDZixDQUFDOzs7Ozs7QUFNRixRQUFNLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxNQUFNLEVBQUU7QUFDN0MsVUFBTSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQ3JFLE1BQU0sQ0FBQywwQkFBMEIsR0FBRyxNQUFNLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUNqRixNQUFNLENBQUMsaUNBQWlDLEdBQUcsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDL0YsVUFBTSxDQUFDLDhCQUE4QixHQUFHLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQ3pGLE1BQU0sQ0FBQyw0QkFBNEIsR0FBRyxNQUFNLENBQUMsNEJBQTRCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUNyRixNQUFNLENBQUMsNkJBQTZCLEdBQUcsTUFBTSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FDdkYsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ2xDLENBQUM7O0NBRUg7Ozs7O0FDbEZELFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O3FCQUVLLFVBQVU7Ozs7c0JBQ1QsUUFBUTs7OztJQUVOLGVBQWU7QUFDdkIsV0FEUSxlQUFlLENBQ3RCLEtBQUssRUFBRTswQkFEQSxlQUFlOztBQUVoQyxRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDekIsUUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztHQUMvQjs7ZUFMa0IsZUFBZTs7V0FPWixrQ0FBRztBQUN2QixhQUFPLHlCQUFPO0FBQ1osZ0JBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7QUFDakMsY0FBTSxFQUFFLFNBQVM7T0FDbEIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUM5Qjs7O1dBRWMseUJBQUMsT0FBTyxFQUFFO0FBQ3ZCLGFBQU8seUJBQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNEOzs7V0FFZSw0QkFBRztBQUNqQixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUN6Qzs7Ozs7Ozs7Ozs7V0FTSyxnQkFBQyxHQUFHLEVBQUU7QUFDVixVQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN2QixXQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNiO0FBQ0QsVUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7QUFDZixXQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUN0QjtBQUNELFNBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ25CLGVBQU8sR0FBRyxHQUFHLG1CQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZCxDQUFDO0tBQ0g7Ozs7Ozs7OztXQU9nQiwyQkFBQyxTQUFTLEVBQUU7QUFDM0IsYUFBTyxTQUFTLENBQ2IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzNCOzs7Ozs7Ozs7V0FPZ0IsMkJBQUMsU0FBUyxFQUFFO0FBQzNCLGFBQU8sU0FBUyxDQUNiLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4Qjs7O1NBOURrQixlQUFlOzs7cUJBQWYsZUFBZTs7OztBQ0xwQyxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBSU0sUUFBUTs7OztzQkFDVCxTQUFTOzs7O0FBSDNCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7O0FBS3JCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQzs7SUFFUCx3QkFBd0I7WUFBeEIsd0JBQXdCOztXQUF4Qix3QkFBd0I7MEJBQXhCLHdCQUF3Qjs7K0JBQXhCLHdCQUF3Qjs7O2VBQXhCLHdCQUF3Qjs7Ozs7Ozs7V0FPbkMsb0JBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUM5QixDQUFDO0tBQ0g7Ozs7Ozs7OztXQU9PLG9CQUFHO0FBQ1QsYUFBTyxJQUFJLENBQUMsaUJBQWlCLENBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDOUIsQ0FBQztLQUNIOzs7Ozs7Ozs7Ozs7Ozs7V0Fhc0IsaUNBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUMxQyxhQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FDckMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ3JDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxDQUFDO2VBQUssT0FBTyxDQUFDLENBQUMsSUFBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQUFBQztPQUFBLENBQUMsQ0FDMUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ3JDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxDQUFDO2VBQUssQ0FBQyxDQUFDLENBQUM7T0FBQSxDQUFDLENBQUM7S0FDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7V0FjdUIsa0NBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUMzQyxhQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FDdkMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUNoQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDckMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7ZUFBSyxDQUFDLENBQUMsTUFBTTtPQUFBLENBQUMsQ0FBQztLQUNwQzs7Ozs7Ozs7Ozs7Ozs7V0FZd0IsbUNBQUMsU0FBUyxFQUFFLE9BQU8sRUFBZTtVQUFiLE1BQU0seURBQUcsQ0FBQyxDQUFDOztBQUN2RCxhQUFPLFNBQVMsQ0FDYixTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FDM0IsSUFBSSxDQUFDLFlBQVk7QUFDaEIsWUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDOUIsVUFBRSxDQUNDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUM5QixJQUFJLENBQUMsa0JBQWtCLEVBQUssQ0FBQyxTQUFJLENBQUMsQ0FBRyxDQUNyQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7T0FDdkIsQ0FBQyxDQUNELFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FDdkIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FDMUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3RDLFlBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQyxZQUFJLFdBQVcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLFlBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixZQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNqQixjQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRTtBQUMxQix3QkFBWSxHQUFHLFdBQVcsQ0FBQztXQUM1QjtTQUNGOztBQUVELFlBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNuQixzQkFBWSxHQUFHLFdBQVcsR0FBRyxZQUFZLENBQUM7U0FDM0M7O0FBRUQsZUFBTyxZQUFZLENBQUM7T0FDckIsQ0FBQyxDQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWTtBQUN2QixZQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLFVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQzlCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FDL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztPQUN2QixDQUFDLENBQUM7S0FDTjs7O1dBRVksdUJBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDeEMsYUFBTyxHQUFHLHlCQUFPO0FBQ2Ysa0JBQVUsRUFBRSxJQUFJO0FBQ2hCLGVBQU8sRUFBRSxLQUFLO09BQ2YsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRXBDLGVBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoRSxVQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7QUFDdEIsWUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUM5QixVQUFVLENBQUMsUUFBUSxDQUFDLENBQ3BCLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQ25DO0FBQ0QsYUFBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUM7OztXQUVNLGlCQUFDLElBQUksRUFBRTtBQUNaLGFBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3RDLENBQUM7S0FDSDs7O1dBRU0saUJBQUMsSUFBSSxFQUFFO0FBQ1osYUFBTyxJQUFJLENBQUMsaUJBQWlCLENBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDdEMsQ0FBQztLQUNIOzs7Ozs7V0FJWSx1QkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzNCLGFBQU8sSUFBSSxDQUFDLHVCQUF1QixDQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQzlCLENBQUM7S0FDSDs7O1dBRVksdUJBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUMzQixhQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUM5QixDQUFDO0tBQ0g7OztXQUVxQixnQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLGFBQU8sSUFBSSxDQUFDLHdCQUF3QixDQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FDOUIsQ0FBQztLQUNIOzs7V0FFcUIsZ0NBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNwQyxhQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQzlCLENBQUM7S0FDSDs7O1dBRXFCLGdDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDcEMsYUFBTyxJQUFJLENBQUMsd0JBQXdCLENBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUM5QixDQUFDO0tBQ0g7Ozs7OztXQUlvQiwrQkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ25DLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQzlCLENBQUM7S0FDSDs7O1dBRW9CLCtCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDbkMsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FDOUIsQ0FBQztLQUNIOzs7V0FFb0IsK0JBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNuQyxhQUFPLElBQUksQ0FBQyxhQUFhLENBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUM5QixDQUFDO0tBQ0g7Ozs7OztXQUltQiw4QkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ2xDLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FDVCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FDakMsRUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUM3QixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUM7S0FDSDs7O1dBRXNCLGlDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDckMsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUN2QixJQUFJLENBQUMsTUFBTSxDQUNULElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQ3BDLEVBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDO0tBQ0g7OztTQWhPa0Isd0JBQXdCOzs7cUJBQXhCLHdCQUF3Qjs7OztBQ1Q3QyxZQUFZLENBQUM7Ozs7Ozs7OzBCQUVHLGFBQWE7Ozs7QUFFN0IsSUFBSSxJQUFJLEdBQUcsNkJBQUksQ0FBQyxDQUFDLENBQUM7O3FCQUVIO0FBQ2IsSUFBRSxFQUFFLGNBQVk7QUFDZCxRQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNmLFFBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDMUQsV0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDMUM7O0FBRUQsV0FBUyxFQUFFLG1CQUFVLENBQUMsRUFBRTtBQUN0QixRQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2IsUUFBSSxXQUFXLElBQUksQ0FBQyxFQUFFO0FBQ3BCLFNBQUcsb0JBQWtCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFHLENBQUM7S0FDekQ7QUFDRCxRQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFDakIsU0FBRyxpQkFBZSxDQUFDLENBQUMsTUFBTSxNQUFHLENBQUM7S0FDL0I7QUFDRCxRQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7QUFDaEIsU0FBRyxnQkFBYyxDQUFDLENBQUMsS0FBSyxNQUFHLENBQUM7S0FDN0I7QUFDRCxXQUFPLEdBQUcsQ0FBQztHQUNaOztBQUVELFlBQVUsRUFBRSxvQkFBVSxTQUFTLEVBQUU7QUFDL0IsV0FBTyxTQUFTLENBQ2IsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUNwQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0dBQ25COztBQUVELHVCQUFxQixFQUFFLCtCQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUU7QUFDOUMsUUFBSSxTQUFTLEVBQUU7QUFDYixhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDNUI7QUFDRCxXQUFPLEVBQUUsQ0FBQztHQUNYOztBQUVELElBQUUsRUFBRSxZQUFVLEdBQUcsRUFBRTtBQUNqQixXQUFPLFVBQVUsR0FBRyxHQUFHLENBQUM7R0FDekI7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbipcbipcdENPTVBVVEU6IGxjZ1xuKlxuKlxuKlx0REVTQ1JJUFRJT046XG4qXHRcdC0gQSBsaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIChsY2cpLlxuKlxuKlxuKlx0Tk9URVM6XG4qXHRcdFsxXSBCYXNlZCBvbiBXLiBQcmVzcywgZXQgYWwuLCBOdW1lcmljYWwgUmVjaXBlcyBpbiBDICgyZCBlZC4gMTk5MilcbipcbipcbipcdFRPRE86XG4qXHRcdFsxXVxuKlxuKlxuKlx0TElDRU5TRTpcbipcdFx0TUlUXG4qXG4qXHRDb3B5cmlnaHQgKGMpIDIwMTQuIHJnaXp6LlxuKlxuKlxuKlx0QVVUSE9SOlxuKlx0XHRyZ2l6ei4gZ3p0b3duMjIxNkB5YWhvby5jb20uIDIwMTQuXG4qXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFZBUklBQkxFUyAvL1xuXG52YXIgTUFTSyA9IDEyMzQ1OTg3Nixcblx0TSA9IDIxNDc0ODM2NDcsXG5cdEEgPSAxNjgwNztcblxuXG4vLyBMQ0cgLy9cblxuLyoqXG4qIEZVTkNUSU9OOiBsY2coIFtzZWVkXSApXG4qXHRSZXR1cm5zIGEgbGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci4gSWYgbm90IHByb3ZpZGVkIGEgc2VlZCwgYSBzZWVkIGlzIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgY3VycmVudCB0aW1lLlxuKlxuKiBAcGFyYW0ge051bWJlcn0gW3NlZWRdIC0gcmFuZG9tIG51bWJlciBnZW5lcmF0b3Igc2VlZFxuKiBAcmV0dXJucyB7RnVuY3Rpb259IGdlbmVyYXRvclxuKi9cbmZ1bmN0aW9uIGxjZyggdmFsICkge1xuXHR2YXIgc2VlZDtcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdGlmICggdHlwZW9mIHZhbCAhPT0gJ251bWJlcicgfHwgdmFsICE9PSB2YWwgfHwgdmFsICUgMSAhPT0gMCB8fCB2YWwgPCAxICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ2xjZygpOjppbnZhbGlkIGlucHV0IGFyZ3VtZW50LiBTZWVkIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0c2VlZCA9IHZhbDtcblx0fSBlbHNlIHtcblx0XHRzZWVkID0gRGF0ZS5ub3coKSAlIDEwMDAwMDAwMDtcblx0fVxuXHQvKipcblx0KiBGVU5DVElPTjogbGNnKCBbTl0gKVxuXHQqXHRMaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuXHQqXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFtOXSAtIG51bWJlciBvZiBwc2V1ZG9yYW5kb20gbnVtYmVycyB0byByZXR1cm5cblx0KiBAcmV0dXJucyB7TnVtYmVyfEFycmF5fSBwc2V1ZG9yYW5kb20gZmxvYXRpbmctcG9pbnQgbnVtYmVyKHMpIGJldHdlZW4gMCBhbmQgMVxuXHQqL1xuXHRyZXR1cm4gZnVuY3Rpb24gbGNnKCBOICkge1xuXHRcdHZhciBhcnIsXG5cdFx0XHRyYW5kO1xuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRzZWVkID0gKCBBICogc2VlZCApICUgTTtcblx0XHRcdHJhbmQgPSBzZWVkIC8gTTtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHJldHVybiByYW5kO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiBOICE9PSAnbnVtYmVyJyB8fCBOICE9PSBOIHx8IE4lMSAhPT0gMCB8fCBOIDwgMSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdsY2coKTo6aW52YWxpZCBpbnB1dCBhcmd1bWVudC4gQXJyYXkgbGVuZ3RoIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0YXJyID0gbmV3IEFycmF5KCBOICk7XG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgTjsgaSsrICkge1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0c2VlZCA9ICggQSAqIHNlZWQgKSAlIE07XG5cdFx0XHRhcnJbIGkgXSA9IHNlZWQgLyBNO1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJyO1xuXHR9O1xufSAvLyBlbmQgRlVOQ1RJT04gbGNnKClcblxuXG4vLyBFWFBPUlRTIC8vXG5cbm1vZHVsZS5leHBvcnRzID0gbGNnO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG5cdGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG5cdH1cblxuXHRyZXR1cm4gdG9TdHIuY2FsbChhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaiB8fCB0b1N0ci5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGhhc093bkNvbnN0cnVjdG9yID0gaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKTtcblx0dmFyIGhhc0lzUHJvdG90eXBlT2YgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpO1xuXHQvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XG5cdGlmIChvYmouY29uc3RydWN0b3IgJiYgIWhhc093bkNvbnN0cnVjdG9yICYmICFoYXNJc1Byb3RvdHlwZU9mKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBvYmopIHsvKiovfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1swXSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicpIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH0gZWxzZSBpZiAoKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpIHx8IHRhcmdldCA9PSBudWxsKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG52YXIgY29sYSA9IHdpbmRvdy5jb2xhO1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5pbXBvcnQgbm9kZSBmcm9tICcuL2VsZW1lbnRzL25vZGUnO1xuaW1wb3J0IGVkZ2UgZnJvbSAnLi9lbGVtZW50cy9lZGdlJztcbmltcG9ydCBHcmFwaE1hbmFnZXIgZnJvbSAnLi9HcmFwaCc7XG5pbXBvcnQgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGZyb20gJy4vc2VsZWN0b3IvR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhdyB7XG4gIGNvbnN0cnVjdG9yKGlkLCBvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZXZlbnRzID0gZDMuZGlzcGF0Y2goJ2xheW91dCcsICdmaXJzdExheW91dEVuZCcpO1xuXG4gICAgdGhpcy5tYXJrZXJJZCA9ICdtYXJrZXItJyArIGlkO1xuXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyhvcHRpb25zKTtcblxuICAgIC8vIGdyYXBoIGhhbmRsZXMgdGhlIGludGVyYWN0aW9ucyB3aXRoIHRoZSBkcmF3ZXJcbiAgICB0aGlzLmNyZWF0ZUdyYXBoKCk7XG5cbiAgICAvLyBzZWxlY3RvciBhbmltYXRlcyB0aGUgbm9kZXMvZWRnZXNcbiAgICB0aGlzLnNlbGVjdG9yID0gbmV3IEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbih0aGlzKTtcblxuICAgIC8vIHN1Yi1lbGVtZW50cyB0aGF0IGRyYXcgc3R1ZmZcbiAgICB0aGlzLm5vZGVEcmF3ZXIgPSBub2RlKCkub3duZXIodGhpcyk7XG4gICAgdGhpcy5lZGdlRHJhd2VyID0gZWRnZSgpLm93bmVyKHRoaXMpO1xuXG4gICAgLy8gY29sYVxuICAgIHRoaXMubGF5b3V0ID0gY29sYS5kM2FkYXB0b3IoKTtcblxuICAgIHRoaXMubGF5b3V0Lm9uKCd0aWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50aWNrKCk7XG4gICAgfSk7XG5cbiAgICB2YXIgZmlyc3RFbmQgPSB0cnVlO1xuICAgIHRoaXMubGF5b3V0Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZmlyc3RFbmQpIHtcbiAgICAgICAgc2VsZi5ldmVudHMuZmlyc3RMYXlvdXRFbmQoKTtcbiAgICAgICAgZmlyc3RFbmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUdyYXBoKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5vcHRpb25zLmRhdGE7XG4gICAgdmFyIG5vZGVzID0gZGF0YS5ub2RlcztcbiAgICB2YXIgbGlua3MgPSBkYXRhLmxpbmtzO1xuXG4gICAgLy8gZW1wdHkgYW5kIHJlLWFkZFxuICAgIGRhdGEubm9kZXMgPSBbXTtcbiAgICBkYXRhLmxpbmtzID0gW107XG5cbiAgICB0aGlzLmdyYXBoID0gbmV3IEdyYXBoTWFuYWdlcih0aGlzLCBkYXRhKTtcbiAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB0aGlzLmdyYXBoLmFkZE5vZGUobm9kZSk7XG4gICAgfSwgdGhpcyk7XG4gICAgbGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgdGhpcy5ncmFwaC5hZGRFZGdlKGVkZ2UpO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqXG4gICAqIG9wdGlvbnNcbiAgICogICAtIHRhcmdldCB7c3RyaW5nfSBzZWxlY3RvciB0byB0aGUgZWxlbWVudCB0byBob2xkIHRoZSBncmFwaFxuICAgKiAgIC0gd2lkdGgge251bWJlcn1cbiAgICogICAtIGhlaWdodCB7bnVtYmVyfVxuICAgKiAgIC0gbGFiZWxzPXRydWUge2Jvb2xlYW59IEZhbHNlIHRvIGhpZGUgdGhlIHZlcnRleCBsYWJlbHNcbiAgICogICAtIGRpcmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGdpdmUgYW4gb3JpZW50YXRpb24gdG8gdGhlIGVkZ2VzXG4gICAqICAgaGF2ZSBhbiBlZGdlXG4gICAqICAgLSBkYXRhIHtPYmplY3R9XG4gICAqICAgICAtIGxpbmtEaXN0YW5jZT05MCB7bnVtYmVyfSBGb3JjZWQgbWluIGRpc3RhbmNlIGJldHdlZW4gdmVydGljZXMgdGhhdFxuICAgKiAgICAgLSBjb25zdHJhaW50cyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIGdyb3VwcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIG5vZGVzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSByPTEwIHtudW1iZXJ9IG5vZGUgcmFkaXVzXG4gICAqICAgICAtIGxpbmtzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSBkaXJlY3RlZD1mYWxzZSB7Ym9vbGVhbn0gdHJ1ZSB0byBnaXZlIGFuIG9yaWVudGF0aW9uIHRvIHRoaXMgZWRnZVxuICAgKiAgICAgICAtIHdlaWdodD1cIlwiIHtzdHJpbmd9IExhYmVsIG9mIHRoZSBlZGdlIChjYW4gYmUgdGhlIHdlaWdodClcbiAgICpcbiAgICovXG4gIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAvLyBncmFwaCBkZWZhdWx0c1xuICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgd2lkdGg6IDcwMCxcbiAgICAgIGhlaWdodDogMzAwLFxuICAgICAgYW5pbWF0aW9uVGltZTogMTAwMCxcbiAgICAgIGxhYmVsczogdHJ1ZSxcbiAgICAgIGRpcmVjdGVkOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5vcHRpb25zLmRhdGEgPSBleHRlbmQoe1xuICAgICAgbm9kZXM6IFtdLFxuICAgICAgbGlua3M6IFtdLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIGNvbnN0cmFpbnRzOiBbXSxcbiAgICAgIGF2b2lkT3ZlcmxhcHM6IHRydWUsXG4gICAgICBzaXplOiBbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdLFxuICAgICAgbGlua0Rpc3RhbmNlOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rRGlzdGFuY2UgfHwgODA7XG4gICAgICB9XG4gICAgfSwgdGhpcy5vcHRpb25zLmRhdGEpO1xuICB9XG5cbiAgaW5pdExheW91dCh1cGRhdGVPcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHVwZGF0ZU9wdGlvbnMuc2tpcExheW91dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHNlbGYub3B0aW9ucy5kYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICB2YXIgdiA9IHNlbGYub3B0aW9ucy5kYXRhW2tdO1xuICAgICAgc2VsZi5sYXlvdXRba10odik7XG4gICAgfSwgdGhpcyk7XG5cbiAgICAvL3RoaXMubGF5b3V0LnN0YXJ0KDE1LCAxNSwgMTUpO1xuICAgIHRoaXMubGF5b3V0LnN0YXJ0KCk7XG4gIH1cblxuICB0aWNrKCkge1xuICAgIHRoaXMuZWRnZUdyb3VwLmNhbGwodGhpcy5lZGdlRHJhd2VyKTtcbiAgICB0aGlzLm5vZGVHcm91cC5jYWxsKHRoaXMubm9kZURyYXdlcik7XG4gIH1cblxuICB1cGRhdGUodXBkYXRlT3B0aW9ucykge1xuICAgIHVwZGF0ZU9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgc2tpcExheW91dDogZmFsc2VcbiAgICB9LCB1cGRhdGVPcHRpb25zKTtcblxuICAgIHRoaXMuaW5pdExheW91dCh1cGRhdGVPcHRpb25zKTtcbiAgICB0aGlzLmJ1aWxkKHVwZGF0ZU9wdGlvbnMpO1xuXG4gICAgLy8gdXBkYXRlIGlubmVyIG5vZGVzL2VkZ2VzIGlmIGxheW91dC50aWNrIHdhc24ndCBydW5cbiAgICBpZiAodXBkYXRlT3B0aW9ucy5za2lwTGF5b3V0KSB7XG4gICAgICB0aGlzLnRpY2soKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJ1aWxkKCkge1xuICAgIHRoaXMucm9vdCA9IGQzLnNlbGVjdCh0aGlzLm9wdGlvbnMudGFyZ2V0KVxuICAgICAgLnNlbGVjdEFsbCgnc3ZnLmdyZXVsZXInKVxuICAgICAgLmRhdGEoW3RoaXMub3B0aW9uc10pO1xuXG4gICAgLy8gZW50ZXJcbiAgICB0aGlzLnJvb3QuZW50ZXIgPSB0aGlzLnJvb3QuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdncmV1bGVyJyk7XG5cbiAgICAvLyBtYXJrZXIgZGVmXG4gICAgdGhpcy5yb290LmVudGVyXG4gICAgICAuYXBwZW5kKCdzdmc6ZGVmcycpXG4gICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcbiAgICAgIC5hdHRyKCdpZCcsIHRoaXMubWFya2VySWQpXG4gICAgICAuYXR0cigndmlld0JveCcsICcwIC01IDEwIDEwJylcbiAgICAgIC5hdHRyKCdyZWZYJywgOSlcbiAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDUpXG4gICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgNSlcbiAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXG4gICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAuYXR0cignZCcsICdNMCwtNEwxMCwwTDAsNEwyLDAnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsICcwcHgnKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAuYXR0cignZmlsbCcsICcjNzc3Jyk7XG5cbiAgICAvLyB1cGRhdGVcbiAgICB0aGlzLnJvb3RcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMub3B0aW9ucy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KTtcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBlZGdlc1xuICAgIHRoaXMuZWRnZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLmVkZ2VzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXTsgfSk7XG4gICAgdGhpcy5lZGdlR3JvdXBcbiAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZWRnZXMnKTtcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBub2Rlc1xuICAgIHRoaXMubm9kZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGVzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXTsgfSk7XG4gICAgdGhpcy5ub2RlR3JvdXBcbiAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbm9kZXMnKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtjb2xvcnN9IGZyb20gJy4vY29uc3QnO1xuXG5jb25zdCBOT0RFX0RFRkFVTFRfT1BUSU9OUyA9IHtcbiAgcjogMTAsXG4gIGZpbGw6ICcjMjk4MEI5J1xufTtcblxuY29uc3QgRURHRV9ERUZBVUxUX09QVElPTlMgPSB7XG4gIHN0cm9rZTogY29sb3JzLkxJR0hUX0dSQVlcbn07XG5cbmZ1bmN0aW9uIGluY2x1ZGVzKGFyciwgaWQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoYXJyW2ldLmlkID09PSBpZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICpcbiAqIFxuICogQGNsYXNzIEdyYXBoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoIHtcbiAgY29uc3RydWN0b3Iob3duZXIsIGRhdGEpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgdGhpcy5ub2RlcyA9IGRhdGEubm9kZXM7XG4gICAgdGhpcy5lZGdlcyA9IGRhdGEubGlua3M7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5vZGUgdG8gdGhlIGdyYXBoLCBlYWNoIG9mIHRoZSBhcmd1bWVudHMgbXVzdFxuICAgKiBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7TnVtYmVyfHN0cmluZ31cbiAgICpcbiAgICogT3B0aW9uYWwgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIHgge251bWJlcn0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIG5vZGUgaW4gdGhlIGdyYXBoIChvbmx5IGlmIGZpeGVkID0gdHJ1ZSlcbiAgICogLSB5IHtudW1iZXJ9IFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhpcyBub2RlIGluIHRoZSBncmFwaCAob25seSBpZiBmaXhlZCA9IHRydWUpXG4gICAqIC0gZml4ZWQge2Jvb2xlYW59IGB0cnVlYCB0byBtYWtlIHRoaXMgbm9kZSBub3QgdG8gcGFydGljaXBhdGUgaW4gdGhlIGxheW91dCBwcm9jZXNzXG4gICAqIC0gZmlsbCB7c3RyaW5nfSBUaGUgZmlsbCBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIHIge251bWJlcn0gVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIGxhYmVsIHtzdHJpbmd9IFRoZSB0ZXh0IGluc2lkZSB0aGUgbm9kZSAoaWYgaXQncyBub3QgcHJlc2VudCBpdCdzIGVxdWFsIHRvIHRoZSBgaWRgKVxuICAgKiAtIHRvcFJpZ2h0TGFiZWwge3N0cmluZ10gdGhlIHRleHQgc2hvd24gb24gdGhlIHRvcCByaWdodCBzaWRlIG9mIHRoZSBub2RlLCB1c2VmdWxcbiAgICogdG8gcmVwcmVzZW50IGFkZGl0aW9uYWwgYW5ub3RhdGlvbnNcbiAgICpcbiAgICogTk9URTogdGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgKi9cbiAgYWRkTm9kZSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0aGUgb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0Tm9kZShjb25maWcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdub2RlIGFscmVhZHkgaW4gc3RvcmUnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubm9kZXMucHVzaChcbiAgICAgICAgR3JhcGguYXBwZW5kTm9kZURlZmF1bHRzLmNhbGwodGhpcy5vd25lciwgY29uZmlnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIG5vZGUgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIGdldE5vZGUobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzQnlGbih2ID0+IHYuaWQgPT09IG5vZGUuaWQpWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHBhcmFtZXRlciBgZm5gLFxuICAgKiBhbGlhcyBmb3IgYHRoaXMubm9kZXMuZmlsdGVyKGZuKWBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0Tm9kZXNCeUZuKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZXMuZmlsdGVyKGZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgYWRqYWNlbnQgbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnROb2Rlcyhub2RlKSB7XG4gICAgdmFyIGFkamFjZW50Tm9kZXMgPSBbXTtcbiAgICB2YXIgdGFrZW4gPSB7fTtcbiAgICB2YXIgbmV4dDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXTtcbiAgICAgIG5leHQgPSBudWxsO1xuICAgICAgaWYgKGVkZ2Uuc291cmNlLmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnRhcmdldDtcbiAgICAgIH0gZWxzZSBpZiAoZWRnZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2Uuc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlO1xuICAgICAgICBhZGphY2VudE5vZGVzLnB1c2gobmV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkamFjZW50Tm9kZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHN1Y2Nlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRTdWNjZXNzb3JOb2Rlcyhub2RlKSB7XG4gICAgdmFyIHN1Y2Nlc3NvciA9IFtdO1xuICAgIHZhciB0YWtlbiA9IHt9O1xuICAgIHZhciBuZXh0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldO1xuICAgICAgbmV4dCA9IG51bGw7XG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0O1xuICAgICAgfVxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZTtcbiAgICAgICAgc3VjY2Vzc29yLnB1c2gobmV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgcHJlZGVjZXNzb3Igbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0UHJlZGVjZXNzb3JOb2Rlcyhub2RlKSB7XG4gICAgdmFyIHByZWRlY2Vzc29yID0gW107XG4gICAgdmFyIHRha2VuID0ge307XG4gICAgdmFyIG5leHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV07XG4gICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2U7XG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlO1xuICAgICAgICBwcmVkZWNlc3Nvci5wdXNoKG5leHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcmVkZWNlc3NvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKi9cbiAgcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgdGhpcy5yZW1vdmVOb2Rlc0J5Rm4oZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2LmlkID09PSBub2RlLmlkO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBub2RlcyBzdG9yZWQgaW4gYG5vZGVzYCxcbiAgICogZWFjaCBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IG5vZGVzXG4gICAqL1xuICByZW1vdmVOb2Rlcyhub2Rlcykge1xuICAgIC8vIFRPRE86IGltcHJvdmUgbl4yIHJlbW92YWxcbiAgICB0aGlzLnJlbW92ZU5vZGVzQnlGbihmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzKG5vZGVzLCB2LmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgbm9kZXMgdGhhdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlTm9kZXNCeUZuKGZuKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLm5vZGVzW2ldLCBpKSkge1xuICAgICAgICAvLyByZW1vdmUgbm9kZXNcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgLy8gcmVtb3ZlIGluY2lkZW50IGVkZ2VzXG4gICAgICAgIHRoaXMucmVtb3ZlRWRnZXMoXG4gICAgICAgICAgdGhpcy5nZXRJbmNpZGVudEVkZ2VzKG5vZGVbMF0pXG4gICAgICAgICk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlZGdlIHRvIHRoZSBncmFwaCwgZWFjaCBvZiB0aGUgYXJndW1lbnRzIG11c3RcbiAgICogYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIFJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBzb3VyY2Uge251bWJlcnxPYmplY3R9IFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGUgb3IgdGhlIHNvdXJjZSBub2RlIGl0c2VsZlxuICAgKiAtIHRhcmdldCB7bnVtYmVyfE9iamVjdH0gVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZSBvciB0aGUgdGFyZ2V0IG5vZGUgaXRzZWxmXG4gICAqXG4gICAqIE9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7c3RyaW5nfE9iamVjdH0gSWYgYW4gaWQgaXMgbm90IHByb3ZpZGVkIGFuIGF1dG8gZ2VuZXJhdGVkIHN0cmluZyB3aWxsIGJlIGFzc2lnbmVkXG4gICAqIHRvIHRoaXMgZWRnZVxuICAgKiAtIHN0cm9rZSB7c3RyaW5nfSBUaGUgc3Ryb2tlIG9mIHRoZSBwYXRoIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZVxuICAgKiAtIHdlaWdodCB7c3RyaW5nfSBUaGUgd2VpZ2h0IG9mIHRoZSBlZGdlXG4gICAqIC0gZGlyZWN0ZWQge2Jvb2xlYW59IElmIHNldCB0byB0cnVlIGFuIGFkZGl0aW9uYWwgYXJyb3cgaXMgYWRkZWQgYXQgdGhlIGVuZCBvZiB0aGUgZWRnZVxuICAgKlxuICAgKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqL1xuICBhZGRFZGdlKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgfHwgIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0JykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBlZGdlIG11c3QgaGF2ZSB0aGUgcHJvcGVydGllcyBgc291cmNlYCBhbmQgYHRhcmdldGAnKTtcbiAgICAgIH1cbiAgICAgIHZhciBzb3VyY2UgPSBjb25maWcuc291cmNlO1xuICAgICAgdmFyIHRhcmdldCA9IGNvbmZpZy50YXJnZXQ7XG5cbiAgICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBzb3VyY2UgPSB0aGlzLmdldE5vZGUoeyBpZDogY29uZmlnLnNvdXJjZSB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0Tm9kZSh7IGlkOiBjb25maWcudGFyZ2V0IH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNvdXJjZSB8fCAhdGFyZ2V0KSB7XG4gICAgICAgIHRocm93IEVycm9yKCduZXcgZWRnZSBkb2VzIG5vdCBqb2luIGV4aXN0aW5nIHZlcnRpY2VzJyk7XG4gICAgICB9XG4gICAgICBjb25maWcuc291cmNlID0gc291cmNlO1xuICAgICAgY29uZmlnLnRhcmdldCA9IHRhcmdldDtcbiAgICAgIHRoaXMuZWRnZXMucHVzaChcbiAgICAgICAgR3JhcGguYXBwZW5kRWRnZURlZmF1bHRzLmNhbGwodGhpcy5vd25lciwgY29uZmlnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBlZGdlIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0RWRnZShlZGdlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGUgPT4gZS5pZCA9PT0gZWRnZS5pZClbMF07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGRpcmVjdGVkIGVkZ2VzIGZyb20gdGhlIG5vZGUgd2hvc2UgaWQgaXNcbiAgICogYG9wdGlvbnMuc291cmNlYCBhbmQgdG8gdGhlIG5vZGUgd2hvc2UgaWQgaXMgYG9wdGlvbnMudGFyZ2V0YFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMuc291cmNlIFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnRhcmdldCBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQmV0d2VlbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMuc291cmNlICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnRhcmdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgZnJvbSBgb3B0aW9ucy5zb3VyY2VgIHRvIGBvcHRpb25zLnRhcmdldGBcbiAgICogb3IgYG9wdGlvbnMudGFyZ2V0YCB0byBgb3B0aW9ucy5zb3VyY2VgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy5zb3VyY2UgVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMudGFyZ2V0IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWxsRWRnZXNCZXR3ZWVuKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMuc291cmNlICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnRhcmdldCkgfHxcbiAgICAgICAgKGUuc291cmNlLmlkID09PSBvcHRpb25zLnRhcmdldCAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy5zb3VyY2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZWRnZSBpZGVudGlmaWVkIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlZGdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZWRnZS5pZCBUaGUgaWQgb2YgdGhlIGVkZ2VcbiAgICovXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGUgPT4gZS5pZCA9PT0gZWRnZS5pZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHN0b3JlZCBpbiBgZWRnZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gZWRnZXNcbiAgICovXG4gIHJlbW92ZUVkZ2VzKGVkZ2VzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMoZWRnZXMsIGUuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBlZGdlcyB0aGF0IHJldHVybiB0cnVlIGZvciB0aGUgcHJlZGljYXRlXG4gICAqIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAgICovXG4gIHJlbW92ZUVkZ2VzQnlGbihmbikge1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZm4odGhpcy5lZGdlc1tpXSwgaSkpIHtcbiAgICAgICAgdGhpcy5lZGdlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGUgYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRFZGdlc0J5Rm4oZm4pIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlcy5maWx0ZXIoZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBvdXRnb2luZyBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKChlKSA9PiBlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGluY29taW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRJbmNvbWluZ0VkZ2VzKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oKGUpID0+IGUudGFyZ2V0LmlkID09PSBub2RlLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jaWRlbnQgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY2lkZW50RWRnZXMobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldE91dGdvaW5nRWRnZXMobm9kZSlcbiAgICAgIC5jb25jYXQodGhpcy5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGYWNhZGUgdG8gYWRkIG5vZGVzL2VkZ2VzXG4gICAqXG4gICAqIE5PVEU6IHRoZSBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIHBhcmFtZXRlcnNcbiAgICovXG4gIGFkZCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVsID0gYXJndW1lbnRzW2ldO1xuICAgICAgLy8gYXNzdW1lIHRoYXQgZWRnZXMgaGF2ZSBhIHNvdXJjZS90YXJnZXQgcGFyYW1ldGVyXG4gICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoJ3NvdXJjZScpICYmIGVsLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xuICAgICAgICB0aGlzLmFkZEVkZ2UoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGROb2RlKGVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTm9kZURlZmF1bHRzKHYpIHtcbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIHYuaWQgPSB1dGlsLmlkKCk7XG4gICAgfVxuXG4gICAgdiA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgTk9ERV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLm5vZGVEZWZhdWx0cyxcbiAgICAgIC8vIG5vZGVcbiAgICAgIHZcbiAgICApO1xuXG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCd3aWR0aCcpKSB7XG4gICAgICB2LndpZHRoID0gMiAqIHYucjtcbiAgICB9XG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCdoZWlnaHQnKSkge1xuICAgICAgdi5oZWlnaHQgPSAyICogdi5yO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmRFZGdlRGVmYXVsdHMoZSkge1xuICAgIGlmICghZS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgZS5pZCA9IHV0aWwuaWQoKTtcbiAgICB9XG4gICAgZSA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgRURHRV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLmVkZ2VEZWZhdWx0cyxcbiAgICAgIC8vIGVkZ2VcbiAgICAgIGVcbiAgICApO1xuICAgIHJldHVybiBlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSByYW5kb20gZ3JhcGggd2l0aCB0aGUgZm9sbG93aW5nIGRlZmF1bHRzIG9wdGlvbnMgb3ZlcnJpZGRlbiBieSBgb3B0aW9uc2A6XG4gICAqXG4gICAqIC0gb3B0aW9ucy5vcmRlcj0xMCB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuc2l6ZT0xNSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGVkZ2VzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuY29ubmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIG1ha2UgdGhlIGdyYXBoIGNvbm5lY3RlZCxcbiAgICogaXQncyBndWFyYW50ZWVkIHRvIGhhdmUgYXQgbGVhc3QgYG9wdGlvbnMub3JkZXIgLSAxYCBlZGdlc1xuICAgKiAtIG9wdGlvbnMubXVsdGlHcmFwaD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgcGFyYWxsZWwgZWRnZXNcbiAgICogLSBvcHRpb25zLnBzZXVkb0dyYXBoPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBsb29wIGVkZ2VzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHt7bm9kZXM6IEFycmF5LCBsaW5rczogQXJyYXl9fVxuICAgKi9cbiAgc3RhdGljIHJhbmRvbShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBvcmRlcjogMTAsXG4gICAgICBzaXplOiAxNSxcbiAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICBtdWx0aUdyYXBoOiBmYWxzZSxcbiAgICAgIHBzZXVkb0dyYXBoOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgdmFyIGksIHUsIHY7XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIGFkamFjZW5jeUxpc3QgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICBhZGphY2VuY3lMaXN0W2ldID0gW107XG4gICAgICBub2Rlcy5wdXNoKHsgaWQ6IGkgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKHUsIHYpIHtcbiAgICAgIGFkamFjZW5jeUxpc3RbdV1bdl0gPSBhZGphY2VuY3lMaXN0W3ZdW3VdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZWRnZXMgPSBbXTtcbiAgICBpID0gMDtcblxuICAgIGlmIChvcHRpb25zLmNvbm5lY3RlZCkge1xuICAgICAgZm9yIChpID0gMTsgaSA8IG9wdGlvbnMub3JkZXI7IGkgKz0gMSkge1xuICAgICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XG4gICAgICAgIGFkZChpLCB2KTtcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBpLFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGkgLT0gMTtcbiAgICB9XG5cbiAgICBmb3IgKDsgaSA8IG9wdGlvbnMuc2l6ZTsgaSArPSAxKSB7XG4gICAgICB1ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5vcmRlcik7XG4gICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5vcmRlcik7XG5cbiAgICAgIGlmICh1ID09PSB2ICYmICFvcHRpb25zLnBzZXVkb0dyYXBoKSB7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH0gZWxzZSBpZiAoYWRqYWNlbmN5TGlzdFt1XVt2XSAmJiAhb3B0aW9ucy5tdWx0aUdyYXBoKSB7XG4gICAgICAgIGkgLT0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZCh1LCB2KTtcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiB1LFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbm9kZXM6IG5vZGVzLFxuICAgICAgbGlua3M6IGVkZ2VzXG4gICAgfTtcbiAgfVxufVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFZlY3RvciB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICAvLyB1bmFyeVxuXG4gIHN0YXRpYyBuZWcoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLngsIC1hLnkpO1xuICB9XG5cbiAgc3RhdGljIGxlbihhKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChWZWN0b3IubGVuU3EoYSkpO1xuICB9XG5cbiAgc3RhdGljIGxlblNxKGEpIHtcbiAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55O1xuICB9XG5cbiAgc3RhdGljIHVuaXQoYSkge1xuICAgIGlmIChhLnggPT09IDAgJiYgYS55ID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIGlzIDAnKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuKGEpO1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAvIGxlbmd0aCwgYS55IC8gbGVuZ3RoKTtcbiAgfVxuXG4gIHN0YXRpYyBvcnRob2dvbmFsKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcigtYS55LCBhLngpO1xuICB9XG5cbiAgc3RhdGljIGFuZ2xlRGVnKGEpIHtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihhLnksIGEueCkgKiAxODAgLyBNYXRoLlBJO1xuICB9XG5cbi8vIGJpbmFyeVxuXG4gIHN0YXRpYyBhZGQoYSwgYikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCArIGIueCwgYS55ICsgYi55KTtcbiAgfVxuXG4gIHN0YXRpYyBzdWIoYSwgYikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAtIGIueCwgYS55IC0gYi55KTtcbiAgfVxuXG4gIHN0YXRpYyBkb3QoYSwgYikge1xuICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnk7XG4gIH1cblxuICBzdGF0aWMgc2NhbGUoYSwgbikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAqIG4sIGEueSAqIG4pO1xuICB9XG5cbiAgc3RhdGljIG1pZChhLCBiKSB7XG4gICAgcmV0dXJuIFZlY3Rvci5zY2FsZShWZWN0b3IuYWRkKGEsIGIpLCAwLjUpO1xuICB9XG5cbiAgc3RhdGljIGFuZ2xlQmV0d2VlbihhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWNvcyhWZWN0b3IuZG90KGEsIGIpIC8gVmVjdG9yLmxlbihhKSAtIFZlY3Rvci5sZW4oYikpO1xuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHdpbmRvdy5kMztcbnZhciBjb2xvciA9IGQzLnNjYWxlLmNhdGVnb3J5MjAoKTtcbnZhciBjb2xvcnMgPSB7fTtcbnZhciBjb2xvckxpdGVyYWxzID0gWydCTFVFJywgJ09SQU5HRScsICdHUkVFTicsICdSRUQnLCAnUFVSUExFJywgJ0JST1dOJywgJ1BJTksnLCAnR1JBWScsICdZRUxMT1cnLCAnQ1lBTiddO1xuY29sb3JMaXRlcmFscy5mb3JFYWNoKGZ1bmN0aW9uIChjLCBpKSB7XG4gIGNvbG9yc1tjXSA9IGNvbG9yLnJhbmdlKClbMiAqIGldO1xuICBjb2xvcnNbJ0xJR0hUXycgKyBjXSA9IGNvbG9yLnJhbmdlKClbMiAqIGkgKyAxXTtcbn0pO1xuXG5jb2xvcnMucmFuZG9tRnJvbVBhbGV0dGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjb2xvci5yYW5nZSgpW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKV07XG59O1xuXG5leHBvcnQge2NvbG9yc307XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHdpbmRvdy5kMztcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9WZWN0b3InO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBvd25lcjtcblxuICBmdW5jdGlvbiBzZWxmTG9vcCh1LCBtYXJnaW4pIHtcbiAgICB2YXIgYWRqYWNlbnQgPSBvd25lci5ncmFwaC5nZXRBZGphY2VudE5vZGVzKHUpO1xuICAgIHZhciBkaXIgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciB2ID0gYWRqYWNlbnRbaV07XG4gICAgICBpZiAodS5pZCAhPT0gdi5pZCkge1xuICAgICAgICBkaXIgPSBWZWN0b3IudW5pdChWZWN0b3IuYWRkKFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHUsIHYpKVxuICAgICAgICApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBubyBhZGphY2VudCB2ZXJ0aWNlc1xuICAgIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA9PT0gMCkge1xuICAgICAgZGlyID0gVmVjdG9yLnVuaXQobmV3IFZlY3RvcigwLCAtMSkpO1xuICAgIH1cblxuICAgIHZhciBrID0gMC44O1xuICAgIHZhciB1cCA9IFZlY3Rvci5hZGQodSwgVmVjdG9yLnNjYWxlKGRpciwgbWFyZ2luICogaykpO1xuICAgIHZhciBtaWQgPSBWZWN0b3IubWlkKHUsIHVwKTtcbiAgICB2YXIgb3J0ID0gVmVjdG9yLm9ydGhvZ29uYWwoZGlyKTtcblxuICAgIHZhciByaWdodCA9IFZlY3Rvci5hZGQobWlkLCBWZWN0b3Iuc2NhbGUob3J0LCBtYXJnaW4gLyAyICogaykpO1xuICAgIHZhciBsZWZ0ID0gVmVjdG9yLmFkZChtaWQsIFZlY3Rvci5zY2FsZShvcnQsIC1tYXJnaW4gLyAyICogaykpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFtsZWZ0LCB1cCwgcmlnaHRdLFxuICAgICAgZGlyOiBvcnRcbiAgICB9O1xuICB9XG4gIFxuICBmdW5jdGlvbiB2ZXJzb3IocCkge1xuICAgIHZhciBkeCA9IHAueDtcbiAgICB2YXIgZHkgPSBwLnk7XG4gICAgdmFyIGwgPSBNYXRoLnNxcnQoIGR4ICogZHggKyBkeSAqIGR5ICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHAueCAvIGwsXG4gICAgICB5OiBwLnkgLyBsXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGgoZCwgbWV0YSwgbWFyZ2luKSB7XG4gICAgdmFyIHUsIHY7XG4gICAgdmFyIGN1cnJlbnQ7XG5cbiAgICB1ID0gZC5zb3VyY2U7XG4gICAgdiA9IGQudGFyZ2V0O1xuICAgIGlmICh1LmlkID4gdi5pZCkge1xuICAgICAgW3UsIHZdID0gW3YsIHVdO1xuICAgIH1cbiAgICBtZXRhW3UuaWRdID0gbWV0YVt1LmlkXSB8fCB7fTtcblxuICAgIGN1cnJlbnQgPSAobWV0YVt1LmlkXVt2LmlkXSA9IG1ldGFbdS5pZF1bdi5pZF0gfHwge1xuICAgICAgY291bnQ6IDEsXG4gICAgICBtaWQ6IFZlY3Rvci5taWQodSwgdiksXG4gICAgICBkaXJlY3Rpb246IC0xXG4gICAgfSk7XG5cbiAgICB2YXIgaW5uZXJKb2ludHMgPSBbXTtcblxuICAgIGlmICh1LmlkID09PSB2LmlkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgZm9sbG93aW5nIGZvciBzZWxmLWxvb3AgZWRnZXNcbiAgICAgIHZhciBsb29wID0gc2VsZkxvb3AodSwgMS41ICogbWFyZ2luICogdi5yICogKGN1cnJlbnQuY291bnQgKyAxKSk7XG4gICAgICBpbm5lckpvaW50cyA9IGxvb3AucGF0aDtcbiAgICAgIGQudW5pdCA9IGxvb3AuZGlyO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdW5pdDtcbiAgICAgIGlmIChWZWN0b3IubGVuKFZlY3Rvci5zdWIodiwgdSkpKSB7XG4gICAgICAgIHVuaXQgPSBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHYsIHUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaXQgPSBuZXcgVmVjdG9yKDEsIDApO1xuICAgICAgfVxuXG4gICAgICBleHRlbmQoY3VycmVudCwge1xuICAgICAgICB1bml0OiB1bml0LFxuICAgICAgICB1bml0SW52ZXJzZTogVmVjdG9yLm9ydGhvZ29uYWwodW5pdClcbiAgICAgIH0pO1xuICAgICAgaW5uZXJKb2ludHMucHVzaChWZWN0b3IuYWRkKFxuICAgICAgICBjdXJyZW50Lm1pZCxcbiAgICAgICAgVmVjdG9yLnNjYWxlKFxuICAgICAgICAgIGN1cnJlbnQudW5pdEludmVyc2UsXG4gICAgICAgICAgTWF0aC5mbG9vcihjdXJyZW50LmNvdW50IC8gMikgKiBtYXJnaW4gKiB2LnIgKiBjdXJyZW50LmRpcmVjdGlvblxuICAgICAgICApXG4gICAgICApKTtcbiAgICAgIGQudW5pdCA9IGN1cnJlbnQudW5pdDtcbiAgICB9XG5cbiAgICBjdXJyZW50LmNvdW50ICs9IDE7XG4gICAgY3VycmVudC5kaXJlY3Rpb24gKj0gLTE7XG5cbiAgICB2YXIgTmFiUDAgPSB2ZXJzb3Ioe1xuICAgICAgeDogaW5uZXJKb2ludHNbMF0ueCAtIHUueCxcbiAgICAgIHk6IGlubmVySm9pbnRzWzBdLnkgLSB1LnlcbiAgICB9KTtcblxuICAgIGlubmVySm9pbnRzLnVuc2hpZnQoe1xuICAgICAgeDogdS54ICsgTmFiUDAueCAqIHUucixcbiAgICAgIHk6IHUueSArIE5hYlAwLnkgKiB1LnJcbiAgICB9KTtcbiAgICBcbiAgICB2YXIgbCA9IGlubmVySm9pbnRzLmxlbmd0aCAtIDE7XG4gICAgXG4gICAgdmFyIE5hYlAxID0gdmVyc29yKHtcbiAgICAgIHg6IHYueCAtIGlubmVySm9pbnRzW2xdLngsXG4gICAgICB5OiB2LnkgLSBpbm5lckpvaW50c1tsXS55XG4gICAgfSk7XG5cbiAgICBpbm5lckpvaW50cy5wdXNoKHtcbiAgICAgIHg6IHYueCAtIE5hYlAxLnggKiB2LnIsXG4gICAgICB5OiB2LnkgLSBOYWJQMS55ICogdi5yXG4gICAgfSk7XG4gICAgXG4gICAgZC5wYXRoID0gaW5uZXJKb2ludHM7XG4gIH1cblxuICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAueChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54OyB9KVxuICAgIC55KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnk7IH0pXG4gICAgLmludGVycG9sYXRlKCdiYXNpcycpO1xuICAgIC8vLnRlbnNpb24oMS41KVxuICAgIC8vLmludGVycG9sYXRlKCdidW5kbGUnKTtcblxuICBmdW5jdGlvbiBpbm5lcihzZWxlY3Rpb24pIHtcbiAgICAvLyBlZGdlc1xuICAgIHZhciBsaW5rcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cuZWRnZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rcztcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG4gICAgbGlua3MuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpOyB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XG5cbiAgICAvLyB1cGRhdGVcbiAgICBsaW5rc1xuICAgICAgLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBjbHMgPSB7XG4gICAgICAgICAgZGlyZWN0ZWQ6IGQuZGlyZWN0ZWQgfHwgb3duZXIub3B0aW9ucy5kaXJlY3RlZFxuICAgICAgICB9O1xuICAgICAgICBjbHNbJ3NvdXJjZS0nICsgZC5zb3VyY2UuaWRdID0gdHJ1ZTtcbiAgICAgICAgY2xzWyd0YXJnZXQtJyArIGQudGFyZ2V0LmlkXSA9IHRydWU7XG4gICAgICAgIHNlbGYuY2xhc3NlZChjbHMpO1xuICAgICAgfSk7XG5cbiAgICB2YXIgbWV0YSA9IHt9O1xuICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgIGNyZWF0ZVBhdGgoZCwgbWV0YSwgMS43KTtcbiAgICB9KTtcblxuICAgIC8vIHBhdGggZW50ZXJcbiAgICB2YXIgcGF0aHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gMS4gcmVhbCBwYXRoXG4gICAgICAgIC8vIDIuIHN0cm9rZS1kYXNoYXJyYXkgaGVscGVyXG4gICAgICAgIHJldHVybiBbZCwgZF07XG4gICAgICB9KTtcbiAgICBwYXRocy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBkID0+IGQuc3Ryb2tlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAndHJhbnNwYXJlbnQnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDIpXG4gICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGVsLmF0dHIoJ29wYWNpdHknLCAhaSA/IDEgOiAwKTtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBlbC5jbGFzc2VkKCdiYXNlJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICBlbC5hdHRyKCdzdHJva2Utd2lkdGgnLCA1KTtcbiAgICAgICAgICBlbC5jbGFzc2VkKCd0cmF2ZXJzYWwnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLy5hdHRyKCdkJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpO1xuICAgICAgLy8gIHJldHVybiBsaW5lKFtwYXJlbnQuc291cmNlXSk7XG4gICAgICAvL30pO1xuXG4gICAgLy8gcGF0aCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24ocGF0aHMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAuYXR0cignZCcsIGQgPT4gbGluZShkLnBhdGgpKTtcblxuICAgIHBhdGhzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgdmFyIHBhcmVudCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgcGF0aC5hdHRyKCdtYXJrZXItZW5kJyxcbiAgICAgICAgICBwYXJlbnQuY2xhc3NlZCgnZGlyZWN0ZWQnKVxuICAgICAgICAgICAgPyAndXJsKCMnICsgb3duZXIubWFya2VySWQgKyAnKSdcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gd2VpZ2h0UG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgdmFyIGFuZ2xlID0gVmVjdG9yLmFuZ2xlRGVnKGQudW5pdCk7XG4gICAgICAgICAgdmFyIHYgPSBkLnBhdGhbTWF0aC5mbG9vcihkLnBhdGgubGVuZ3RoIC8gMildO1xuICAgICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB2LFxuICAgICAgICAgICAgcm90YXRlOiBhbmdsZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgd2VpZ2h0cyA9IGxpbmtzLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2RdOyB9KTtcblxuICAgIC8vIHdlaWdodCBlbnRlclxuICAgIHdlaWdodHMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnd2VpZ2h0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICd0ZXh0LWFmdGVyLWVkZ2UnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbik7XG5cbiAgICAvLyB3ZWlnaHQgdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKHdlaWdodHMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAudGV4dChkID0+IGQud2VpZ2h0KVxuICAgICAgLmNhbGwod2VpZ2h0UG9zaXRpb24pO1xuXG4gICAgLy8gd2VpZ2h0IGV4aXRcbiAgICB3ZWlnaHRzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuXG4gICAgLy8gZXhpdFxuICAgIGxpbmtzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuICB9XG5cbiAgaW5uZXIub3duZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBvd25lcjtcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5uZXI7XG4gIH07XG5cbiAgcmV0dXJuIGlubmVyO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi4vY29uc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIG93bmVyO1xuXG4gIGZ1bmN0aW9uIGlubmVyKHNlbGVjdGlvbikge1xuICAgIHZhciBub2RlcyA9IHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgnZy5ub2RlJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLm5vZGVzO1xuICAgICAgfSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9KTtcblxuICAgIHZhciBsYXlvdXQgPSBvd25lci5sYXlvdXQ7XG5cbiAgICB2YXIgZyA9IG5vZGVzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiAnbm9kZSAnICsgKGQuY2xhc3MgfHwgJycpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiB1dGlscy5ucyhkLmlkKTsgfSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHsgdHJhbnNsYXRlOiBkIH0pO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGlmICghZWwub3Zlcikge1xuICAgICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGVsLm92ZXIgPSB0cnVlO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgZWwub3ZlciA9IGZhbHNlO1xuICAgICAgICBlbC5zdHlsZSgnY3Vyc29yJywgbnVsbCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKTtcbiAgICBnLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XG4gICAgZy5jYWxsKGxheW91dC5kcmFnKTtcblxuICAgIHZhciBkcmFnU3RhcnQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJyk7XG4gICAgdmFyIGRyYWdFbmQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnZW5kLmQzYWRhcHRvcicpO1xuICAgIGxheW91dC5kcmFnKClcbiAgICAgIC5vbignZHJhZ3N0YXJ0LmQzYWRhcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3duZXIubm9kZURyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgZHJhZ1N0YXJ0LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgIH0pXG4gICAgICAub24oJ2RyYWdlbmQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgZHJhZ0VuZC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcblxuICAgIGcuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAoZCkgPT4gZC5maWxsKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gZC5yICk7XG5cbiAgICAvLyBpbm5lciBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdsYWJlbCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsICd3aGl0ZScpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzEycHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpO1xuICAgICAgLy8uYXR0cigneScsIChkKSA9PiBkLmhlaWdodCAvIDQpO1xuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5sYWJlbCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ2xhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgICB9KTtcblxuICAgIC8vIHRvcC1yaWdodCBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdvdXRlci10b3AtcmlnaHQnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBjb2xvcnMuQkxVRSlcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdzdGFydCcpXG4gICAgICAuYXR0cigneCcsIGQgPT4gZC53aWR0aCAvIDIgLSAyKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IC1kLmhlaWdodCAvIDIgKyAzKTtcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLXJpZ2h0JylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgndG9wUmlnaHRMYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLnRvcFJpZ2h0TGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gdG9wLWxlZnQgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnb3V0ZXItdG9wLWxlZnQnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBjb2xvcnMuQkxVRSlcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgLmF0dHIoJ3gnLCBkID0+IC1kLndpZHRoIC8gMiAtIDIpXG4gICAgICAuYXR0cigneScsIGQgPT4gLWQuaGVpZ2h0IC8gMiArIDMpO1xuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5vdXRlci10b3AtbGVmdCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BMZWZ0TGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKG5vZGVzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oe1xuICAgICAgICAgIHRyYW5zbGF0ZTogZFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gZXhpdFxuICAgIG5vZGVzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpO1xuICB9XG5cbiAgaW5uZXIub3duZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBvd25lcjtcbiAgICB9XG4gICAgb3duZXIgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5uZXI7XG4gIH07XG5cbiAgcmV0dXJuIGlubmVyO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcG9seWZpbGxzIGZyb20gJy4vcG9seWZpbGxzJztcbnBvbHlmaWxscygpO1xuXG52YXIgZDMgPSB3aW5kb3cuZDM7XG5cbi8vIG5vZGVcbmltcG9ydCBEcmF3IGZyb20gJy4vRHJhdyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cbnZhciBpbnN0YW5jZXMgPSBbXTtcblxuZnVuY3Rpb24gcnVuKG9wdGlvbnMpIHtcbiAgZnVuY3Rpb24gZmFjdG9yeShvcHRpb25zKSB7XG4gICAgdmFyIGVsID0gZDMuc2VsZWN0KG9wdGlvbnMudGFyZ2V0KTtcbiAgICB2YXIgaWQgPSBlbC5hdHRyKCdncmV1bGVyLWlkJyk7XG4gICAgaWYgKCFpZCkge1xuICAgICAgaWQgPSB1dGlscy5pZCgpO1xuICAgICAgZWwuYXR0cignZ3JldWxlci1pZCcsIGlkKTtcbiAgICAgIGluc3RhbmNlc1tpZF0gPSBuZXcgRHJhdyhpZCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZXNbaWRdO1xuICB9XG5cbiAgcmV0dXJuIGZhY3Rvcnkob3B0aW9ucyk7XG59XG5cbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJztcbnJ1bi5HcmFwaCA9IEdyYXBoO1xuXG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi9jb25zdCc7XG5ydW4uY29sb3JzID0gY29sb3JzO1xuXG5pbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyL2luZGV4JztcbnJ1bi5wbGF5ZXIgPSBwbGF5ZXI7XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoYWN0aW9ucywgc3BlZWQpIHtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcblxuICAgIC8vIHN0YXRlc1xuICAgIHRoaXMudGltZXIgPSBudWxsO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYWN0aW9uc1t0aGlzLmluZGV4KytdKCk7XG4gICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLnBsYXkuYmluZCh0aGlzKSwgdGhpcy5zcGVlZCk7XG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZSwgc3BlZWQpIHtcbiAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkIHx8IGluc3RhbmNlLm9wdGlvbnMuYW5pbWF0aW9uVGltZTtcbiAgICB0aGlzLmZuID0gbnVsbDtcbiAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgfVxuXG4gIHJ1bihmbikge1xuICAgIHRoaXMuZm4gPSBmbih0aGlzLmluc3RhbmNlKTtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIHJ1bkFuaW1hdGlvbihhbmltYXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhbmltYXRpb24pKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uLmZvckVhY2godGhpcy5ydW5BbmltYXRpb24sIHRoaXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYW5pbWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uKHRoaXMuaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gdGhpcy5pbnN0YW5jZVthbmltYXRpb24udHlwZV07XG4gICAgcmV0dXJuIHR5cGVbYW5pbWF0aW9uLm9wXS5hcHBseSh0eXBlLCBhbmltYXRpb24uYXJncyB8fCBbXSk7XG4gIH1cblxuICBwbGF5KHZhbHVlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBuZXh0ID0gdGhpcy5mbi5uZXh0KHZhbHVlKTtcbiAgICBpZiAoIW5leHQuZG9uZSkge1xuICAgICAgdmFyIGRlbGF5ID0gdGhpcy5zcGVlZDtcbiAgICAgIHZhciBydW5BbmltYXRpb25WYWx1ZSA9IHRoaXMucnVuQW5pbWF0aW9uKG5leHQudmFsdWUpO1xuICAgICAgaWYgKHJ1bkFuaW1hdGlvblZhbHVlICYmIHR5cGVvZiBydW5BbmltYXRpb25WYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBydW5BbmltYXRpb25WYWx1ZS5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBkZWxheSA9IHJ1bkFuaW1hdGlvblZhbHVlLmRlbGF5O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMudGltZXIgPSB3aW5kb3cucmVxdWVzdFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnBsYXkobmV4dC52YWx1ZSk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfVxuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgd2luZG93LmNsZWFyUmVxdWVzdFRpbWVvdXQodGhpcy50aW1lcik7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEZpeGVkIGZyb20gJy4vRml4ZWQnO1xuaW1wb3J0IEdlbmVyYXRvciBmcm9tICcuL0dlbmVyYXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgRml4ZWRJbnRlcnZhbDogRml4ZWQsXG4gIEdlbmVyYXRvcjogR2VuZXJhdG9yXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8qZXNsaW50LWRpc2FibGUgKi9cbiAgKGZ1bmN0aW9uKGRvYywgcHJvdG8pIHtcbiAgICB0cnkgeyAvLyBjaGVjayBpZiBicm93c2VyIHN1cHBvcnRzIDpzY29wZSBuYXRpdmVseVxuICAgICAgZG9jLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSBib2R5Jyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7IC8vIHBvbHlmaWxsIG5hdGl2ZSBtZXRob2RzIGlmIGl0IGRvZXNuJ3RcbiAgICAgIFsncXVlcnlTZWxlY3RvcicsICdxdWVyeVNlbGVjdG9yQWxsJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIG5hdGl2ZSA9IHByb3RvW21ldGhvZF07XG4gICAgICAgIHByb3RvW21ldGhvZF0gPSBmdW5jdGlvbihzZWxlY3RvcnMpIHtcbiAgICAgICAgICBpZiAoLyhefCwpXFxzKjpzY29wZS8udGVzdChzZWxlY3RvcnMpKSB7IC8vIG9ubHkgaWYgc2VsZWN0b3JzIGNvbnRhaW5zIDpzY29wZVxuICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5pZDsgLy8gcmVtZW1iZXIgY3VycmVudCBlbGVtZW50IGlkXG4gICAgICAgICAgICB0aGlzLmlkID0gJ0lEXycgKyBEYXRlLm5vdygpOyAvLyBhc3NpZ24gbmV3IHVuaXF1ZSBpZFxuICAgICAgICAgICAgc2VsZWN0b3JzID0gc2VsZWN0b3JzLnJlcGxhY2UoLygoXnwsKVxccyopOnNjb3BlL2csICckMSMnICsgdGhpcy5pZCk7IC8vIHJlcGxhY2UgOnNjb3BlIHdpdGggI0lEXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZG9jW21ldGhvZF0oc2VsZWN0b3JzKTtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDsgLy8gcmVzdG9yZSBwcmV2aW91cyBpZFxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZS5jYWxsKHRoaXMsIHNlbGVjdG9ycyk7IC8vIHVzZSBuYXRpdmUgY29kZSBmb3Igb3RoZXIgc2VsZWN0b3JzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKHdpbmRvdy5kb2N1bWVudCwgRWxlbWVudC5wcm90b3R5cGUpO1xuXG4gIC8vIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vam9lbGFtYmVydC8xMDAyMTE2XG4gIC8vXG4gIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHNoaW0gYnkgUGF1bCBJcmlzaFxuICAvLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICAgfHxcbiAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbiAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbiAgICAgIGZ1bmN0aW9uKC8qIGZ1bmN0aW9uICovIGNhbGxiYWNrLCAvKiBET01FbGVtZW50ICovIGVsZW1lbnQpe1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgIH07XG4gIH0pKCk7XG5cbiAgLyoqXG4gICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgc2V0VGltZW91dCBleGNlcHQgdXNlcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZSBwb3NzaWJsZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2ludH0gZGVsYXkgVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgd2luZG93LnJlcXVlc3RUaW1lb3V0ID0gZnVuY3Rpb24oZm4sIGRlbGF5KSB7XG4gICAgaWYoICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgISh3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpICYmIC8vIEZpcmVmb3ggNSBzaGlwcyB3aXRob3V0IGNhbmNlbCBzdXBwb3J0XG4gICAgICAhd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICF3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZm4sIGRlbGF5KTtcblxuICAgIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciBoYW5kbGUgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICB2YXIgY3VycmVudCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICBkZWx0YSA9IGN1cnJlbnQgLSBzdGFydDtcblxuICAgICAgZGVsdGEgPj0gZGVsYXkgPyBmbi5jYWxsKCkgOiBoYW5kbGUudmFsdWUgPSByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApO1xuICAgIH1cblxuICAgIGhhbmRsZS52YWx1ZSA9IHJlcXVlc3RBbmltRnJhbWUobG9vcCk7XG4gICAgcmV0dXJuIGhhbmRsZTtcbiAgfTtcblxuICAvKipcbiAgICogQmVoYXZlcyB0aGUgc2FtZSBhcyBjbGVhclRpbWVvdXQgZXhjZXB0IHVzZXMgY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgd2hlcmUgcG9zc2libGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgKiBAcGFyYW0ge2ludHxvYmplY3R9IGhhbmRsZSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHdpbmRvdy5jbGVhclJlcXVlc3RUaW1lb3V0ID0gZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6IC8qIFN1cHBvcnQgZm9yIGxlZ2FjeSBBUEkgKi9cbiAgICAgICAgICB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHQ/IHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gIH07XG4gIC8qZXNsaW50LWVuYWJsZSAqL1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50U2VsZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihvd25lcikge1xuICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB0aGlzLmdyYXBoID0gb3duZXIuZ3JhcGg7XG4gICAgdGhpcy5kZWZhdWx0U3R5bGVPcHRpb25zID0ge307XG4gIH1cblxuICBnZXREZWZhdWx0U3R5bGVPcHRpb25zKCkge1xuICAgIHJldHVybiBleHRlbmQoe1xuICAgICAgZHVyYXRpb246IHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpLFxuICAgICAgc3Ryb2tlOiAnI0U3NEMzQydcbiAgICB9LCB0aGlzLmRlZmF1bHRTdHlsZU9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHt9LCB0aGlzLmdldERlZmF1bHRTdHlsZU9wdGlvbnMoKSwgb3B0aW9ucyk7XG4gIH1cblxuICBnZXRBbmltYXRpb25UaW1lKCkge1xuICAgIHJldHVybiB0aGlzLm93bmVyLm9wdGlvbnMuYW5pbWF0aW9uVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGNvbGxlY3Rpb24gb2YgZWxlbWVudHMgcmV0dXJuZWQgYnkgdGhlIEdyYXBoIGNsYXNzIHRoaXMgbWV0aG9kcyByZXR1cm5zXG4gICAqIHRoZSBkMyBzZWxlY3Rpb24gdGhhdCBmb3IgYWxsIHRob3NlIG9iamVjdHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXXxPYmplY3R9IGVscyBBbiBhcnJheSBvZiBlZGdlcy9ub2RlcyBvciBhIHNpbmdsZSBlZGdlL25vZGVcbiAgICogQHJldHVybiB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgc2VsZWN0KGVscykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbHMpKSB7XG4gICAgICBlbHMgPSBbZWxzXTtcbiAgICB9XG4gICAgaWYgKCFlbHMubGVuZ3RoKSB7XG4gICAgICBlbHMucHVzaCh7IGlkOiAtMSB9KTtcbiAgICB9XG4gICAgZWxzID0gZWxzLmZpbHRlcihCb29sZWFuKTtcbiAgICByZXR1cm4gdGhpcy5vd25lci5yb290LnNlbGVjdEFsbChcbiAgICAgIGVscy5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuICcjJyArIHV0aWxzLm5zKGUuaWQpO1xuICAgICAgfSkuam9pbignLCAnKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgcGF0aCBpbnNpZGUgdGhlIHRhZyA8Zz4gdGhhdCByZXByZXNlbnRzIGFuIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKi9cbiAgaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgncGF0aC5iYXNlJyk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgY2lyY2xlIGluc2lkZSB0aGUgdGFnIDxnPiB0aGF0IHJlcHJlc2VudHMgYSBub2RlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICovXG4gIGlubmVyTm9kZVNlbGVjdG9yKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ2NpcmNsZScpO1xuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZDMgPSB3aW5kb3cuZDM7XG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJztcblxudmFyIEhJR0hMSUdIVCA9ICdoaWdobGlnaHQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24gZXh0ZW5kcyBHcmFwaCB7XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyBvZiB0aGUgZ3JhcGhcbiAgICpcbiAgICogQHJldHVybnMge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIGdldEVkZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5lZGdlcylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBub2RlcyBvZiB0aGUgZ3JhcGhcbiAgICpcbiAgICogQHJldHVybnMge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIGdldE5vZGVzKCkge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5ub2RlcylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYSBub2RlIHRlbXBvcmFyaWx5LCBpdCBjb25zaXN0cyBvZiB0d29cbiAgICogY2hhaW5lZCB0cmFuc2l0aW9uc1xuICAgKlxuICAgKiAtIGluY3JlYXNlIHRoZSByYWRpdXMgdG8gMS41eCB0aGUgb3JpZ2luYWwgYHJgIHZhbHVlXG4gICAqIC0gZGVjcmVhc2UgdGhlIHJhZGl1cyB0byB0aGUgb3JpZ2luYWwgYHJgIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICBkb1RlbXBvcmFsSGlnaGxpZ2h0Tm9kZShzZWxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gb3B0aW9ucy5yIHx8IChkLnIgKiAxLjUpKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IGQucik7XG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyBhbiBlZGdlIHRlbXBvcmFyaWx5LCBpdCBjb25zaXN0cyBvZiB0d29cbiAgICogY2hhaW5lZCB0cmFuc2l0aW9uc1xuICAgKlxuICAgKiAtIGNoYW5nZSB0aGUgc3Ryb2tlIG9mIHRoZSBgcGF0aGAgdGhhdCByZXByZXNlbnRzIHRoZSBlZGdlIHRvXG4gICAqIGBvcHRpb25zLnN0cm9rZWBcbiAgICogLSBjaGFuZ2UgdGhlIHN0cm9rZSB0byB0aGUgb3JpZ2luYWwgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIGRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhzZWxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIChkKSA9PiBkLnN0cm9rZSk7XG4gIH1cblxuICAvKipcbiAgICogRWRnZSB0cmF2ZXJzYWwgYW5pbWF0aW9uLCBpdCBhbmltYXRlcyBhIGhpZGRlbiBwYXRoIGdpdmluZyB0aGUgaW1wcmVzc2lvblxuICAgKiBvZiBtb3ZlbWVudCwgaWYgc291cmNlIGlzIGdpdmVuIHRoZW4gaXQgd2lsbCBhbHdheXMgc3RhcnQgdGhlIGFuaW1hdGlvblxuICAgKiBmcm9tIHRoZSBub2RlIGBzb3VyY2VgIGV2ZW4gaWYgdGhlIGVkZ2UgaXMgYW4gaW5jb21pbmcgZWRnZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7Y29uZmlnfSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbc291cmNlPS0xXVxuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIHRyYXZlcnNlRWRnZVdpdGhEaXJlY3Rpb24oc2VsZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UgPSAtMSkge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudHJhdmVyc2FsJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgICAgZWxcbiAgICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBgJHtsfSAke2x9YClcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBsKVxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XG4gICAgICB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2Rhc2hhcnJheScpXG4gICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICAgIHZhciB0d2ljZUxlbmd0aCA9IGxlbmd0aCAqIDI7XG4gICAgICAgIHZhciBsZW5ndGhUb01vdmUgPSAwO1xuICAgICAgICBpZiAoc291cmNlICE9PSAtMSkge1xuICAgICAgICAgIGlmIChkLnRhcmdldC5pZCA9PT0gc291cmNlKSB7XG4gICAgICAgICAgICBsZW5ndGhUb01vdmUgPSB0d2ljZUxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5yZXZlcnNlKSB7XG4gICAgICAgICAgbGVuZ3RoVG9Nb3ZlID0gdHdpY2VMZW5ndGggLSBsZW5ndGhUb01vdmU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGVuZ3RoVG9Nb3ZlO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgZWwuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIG51bGwpXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgbnVsbClcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDApO1xuICAgICAgfSk7XG4gIH1cblxuICB0cmF2ZXJzZUVkZ2VzKHNlbGVjdGlvbiwgb3B0aW9ucywgc291cmNlKSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBrZWVwU3Ryb2tlOiB0cnVlLFxuICAgICAgcmV2ZXJzZTogZmFsc2VcbiAgICB9LCB0aGlzLmdldFN0eWxlT3B0aW9ucygpLCBvcHRpb25zKTtcblxuICAgIHNlbGVjdGlvbi5jYWxsKHRoaXMudHJhdmVyc2VFZGdlV2l0aERpcmVjdGlvbiwgb3B0aW9ucywgc291cmNlKTtcbiAgICBpZiAob3B0aW9ucy5rZWVwU3Ryb2tlKSB7XG4gICAgICB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgICAgLnRyYW5zaXRpb24oJ3VwZGF0ZScpXG4gICAgICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uKVxuICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pO1xuICB9XG5cbiAgZ2V0Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE5vZGUobm9kZSkpXG4gICAgKTtcbiAgfVxuXG4gIGdldEVkZ2UoZWRnZSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRFZGdlKGVkZ2UpKVxuICAgICk7XG4gIH1cblxuICAvLyB0ZW1wb3JhbCBoaWdobGlnaHRcblxuICBoaWdobGlnaHROb2RlKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0Tm9kZShcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0Tm9kZShub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBoaWdobGlnaHRFZGdlKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEVkZ2UoZWRnZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgaGlnaGxpZ2h0SW5jaWRlbnRFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNpZGVudEVkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIGhpZ2hsaWdodE91dGdvaW5nRWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBoaWdobGlnaHRJbmNvbWluZ0VkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY29taW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgLy8gdHJhdmVyc2FsIG9mIGFuIGVkZ2UgZ2l2ZW4gYSBub2RlXG5cbiAgdHJhdmVyc2VPdXRnb2luZ0VkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIHRyYXZlcnNlSW5jb21pbmdFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jb21pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICB0cmF2ZXJzZUluY2lkZW50RWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY2lkZW50RWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgLy8gdHJhdmVyc2FsIG9mIGFuIGVkZ2UgYmV0d2VlbiB0d28gbm9kZXNcblxuICB0cmF2ZXJzZUVkZ2VzQmV0d2VlbihlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KFxuICAgICAgICB0aGlzLmdyYXBoLmdldEVkZ2VzQmV0d2VlbihlZGdlKVxuICAgICAgKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpLFxuICAgICAgZWRnZS5zb3VyY2VcbiAgICApO1xuICB9XG5cbiAgdHJhdmVyc2VBbGxFZGdlc0JldHdlZW4oZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdChcbiAgICAgICAgdGhpcy5ncmFwaC5nZXRBbGxFZGdlc0JldHdlZW4oZWRnZSlcbiAgICAgICksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGVkZ2Uuc291cmNlXG4gICAgKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbGNnIGZyb20gJ2NvbXB1dGUtbGNnJztcblxudmFyIHJhbmQgPSBsY2coMSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbiA9IHJhbmQoKTtcbiAgICB2YXIgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKG4gKiAyNikgKyA5Nyk7XG4gICAgcmV0dXJuIGxldHRlciArIG4udG9TdHJpbmcoMTYpLnN1YnN0cigyKTtcbiAgfSxcblxuICB0cmFuc2Zvcm06IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIHN0ciA9IGBgO1xuICAgIGlmICgndHJhbnNsYXRlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCB0cmFuc2xhdGUoJHtvLnRyYW5zbGF0ZS54fSwgJHtvLnRyYW5zbGF0ZS55fSlgO1xuICAgIH1cbiAgICBpZiAoJ3JvdGF0ZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgcm90YXRlKCR7by5yb3RhdGV9KWA7XG4gICAgfVxuICAgIGlmICgnc2NhbGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHNjYWxlKCR7by5zY2FsZX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfSxcblxuICB0cmFuc2l0aW9uOiBmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnRyYW5zaXRpb24oJ2xheW91dCcpXG4gICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgLmVhc2UoJ2xpbmVhcicpO1xuICB9LFxuXG4gIGNvbmRpdGlvbmFsVHJhbnNpdGlvbjogZnVuY3Rpb24gKGVsLCBjb25kaXRpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uKGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuXG4gIG5zOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuICdncmV1bGVyLScgKyBzdHI7XG4gIH1cbn07XG4iXX0=
