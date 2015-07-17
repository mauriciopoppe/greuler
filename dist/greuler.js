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

    var p0 = u;
    var p1 = v;

    var NabP0 = versor({
      x: innerJoints[0].x - p0.x,
      y: innerJoints[0].y - p0.y
    });

    p0 = {
      x: p0.x + NabP0.x * u.r,
      y: p0.y + NabP0.y * u.r
    };

    var l = innerJoints.length - 1;

    var NabP1 = versor({
      x: p1.x - innerJoints[l].x,
      y: p1.y - innerJoints[l].y
    });

    p1 = {
      x: p1.x - NabP1.x * v.r,
      y: p1.y - NabP1.y * v.r
    };

    innerJoints.unshift(p0);
    innerJoints.push(p1);

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvRHJhdy5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvR3JhcGguanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvY29uc3QuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2VsZW1lbnRzL2VkZ2UuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL2luZGV4LmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy9wbGF5ZXIvRml4ZWQuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvaG9tZS9qZGlhcy9Xb3JrL2dyZXVsZXIvc3JjL3BsYXllci9pbmRleC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvcG9seWZpbGxzLmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9ob21lL2pkaWFzL1dvcmsvZ3JldWxlci9zcmMvc2VsZWN0b3IvR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uLmpzIiwiL2hvbWUvamRpYXMvV29yay9ncmV1bGVyL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O3NCQUtNLFFBQVE7Ozs7NEJBQ1YsaUJBQWlCOzs7OzRCQUNq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Q0FBQztLQUM1QjtBQUNELFdBQU8sRUFBRSxDQUFDO0dBQ1g7O0FBRUQsSUFBRSxFQUFFLFlBQVUsR0FBRyxFQUFFO0FBQ2pCLFdBQU8sVUFBVSxHQUFHLEdBQUcsQ0FBQztHQUN6QjtDQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuKlxuKlx0Q09NUFVURTogbGNnXG4qXG4qXG4qXHRERVNDUklQVElPTjpcbipcdFx0LSBBIGxpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgKGxjZykuXG4qXG4qXG4qXHROT1RFUzpcbipcdFx0WzFdIEJhc2VkIG9uIFcuIFByZXNzLCBldCBhbC4sIE51bWVyaWNhbCBSZWNpcGVzIGluIEMgKDJkIGVkLiAxOTkyKVxuKlxuKlxuKlx0VE9ETzpcbipcdFx0WzFdXG4qXG4qXG4qXHRMSUNFTlNFOlxuKlx0XHRNSVRcbipcbipcdENvcHlyaWdodCAoYykgMjAxNC4gcmdpenouXG4qXG4qXG4qXHRBVVRIT1I6XG4qXHRcdHJnaXp6LiBnenRvd24yMjE2QHlhaG9vLmNvbS4gMjAxNC5cbipcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gVkFSSUFCTEVTIC8vXG5cbnZhciBNQVNLID0gMTIzNDU5ODc2LFxuXHRNID0gMjE0NzQ4MzY0Nyxcblx0QSA9IDE2ODA3O1xuXG5cbi8vIExDRyAvL1xuXG4vKipcbiogRlVOQ1RJT046IGxjZyggW3NlZWRdIClcbipcdFJldHVybnMgYSBsaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLiBJZiBub3QgcHJvdmlkZWQgYSBzZWVkLCBhIHNlZWQgaXMgZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSBjdXJyZW50IHRpbWUuXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSBbc2VlZF0gLSByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBzZWVkXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gZ2VuZXJhdG9yXG4qL1xuZnVuY3Rpb24gbGNnKCB2YWwgKSB7XG5cdHZhciBzZWVkO1xuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0aWYgKCB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJyB8fCB2YWwgIT09IHZhbCB8fCB2YWwgJSAxICE9PSAwIHx8IHZhbCA8IDEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnbGNnKCk6OmludmFsaWQgaW5wdXQgYXJndW1lbnQuIFNlZWQgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuJyApO1xuXHRcdH1cblx0XHRzZWVkID0gdmFsO1xuXHR9IGVsc2Uge1xuXHRcdHNlZWQgPSBEYXRlLm5vdygpICUgMTAwMDAwMDAwO1xuXHR9XG5cdC8qKlxuXHQqIEZVTkNUSU9OOiBsY2coIFtOXSApXG5cdCpcdExpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuXG5cdCpcblx0KiBAcGFyYW0ge051bWJlcn0gW05dIC0gbnVtYmVyIG9mIHBzZXVkb3JhbmRvbSBudW1iZXJzIHRvIHJldHVyblxuXHQqIEByZXR1cm5zIHtOdW1iZXJ8QXJyYXl9IHBzZXVkb3JhbmRvbSBmbG9hdGluZy1wb2ludCBudW1iZXIocykgYmV0d2VlbiAwIGFuZCAxXG5cdCovXG5cdHJldHVybiBmdW5jdGlvbiBsY2coIE4gKSB7XG5cdFx0dmFyIGFycixcblx0XHRcdHJhbmQ7XG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHNlZWQgPSAoIEEgKiBzZWVkICkgJSBNO1xuXHRcdFx0cmFuZCA9IHNlZWQgLyBNO1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0cmV0dXJuIHJhbmQ7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIE4gIT09ICdudW1iZXInIHx8IE4gIT09IE4gfHwgTiUxICE9PSAwIHx8IE4gPCAxICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ2xjZygpOjppbnZhbGlkIGlucHV0IGFyZ3VtZW50LiBBcnJheSBsZW5ndGggbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuJyApO1xuXHRcdH1cblx0XHRhcnIgPSBuZXcgQXJyYXkoIE4gKTtcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBOOyBpKysgKSB7XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRzZWVkID0gKCBBICogc2VlZCApICUgTTtcblx0XHRcdGFyclsgaSBdID0gc2VlZCAvIE07XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0fVxuXHRcdHJldHVybiBhcnI7XG5cdH07XG59IC8vIGVuZCBGVU5DVElPTiBsY2coKVxuXG5cbi8vIEVYUE9SVFMgLy9cblxubW9kdWxlLmV4cG9ydHMgPSBsY2c7XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBpc0FycmF5ID0gZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcblx0aWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKTtcblx0fVxuXG5cdHJldHVybiB0b1N0ci5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG5cdGlmICghb2JqIHx8IHRvU3RyLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgaGFzT3duQ29uc3RydWN0b3IgPSBoYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpO1xuXHR2YXIgaGFzSXNQcm90b3R5cGVPZiA9IG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlICYmIGhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG5cdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0aWYgKG9iai5jb25zdHJ1Y3RvciAmJiAhaGFzT3duQ29uc3RydWN0b3IgJiYgIWhhc0lzUHJvdG90eXBlT2YpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBPd24gcHJvcGVydGllcyBhcmUgZW51bWVyYXRlZCBmaXJzdGx5LCBzbyB0byBzcGVlZCB1cCxcblx0Ly8gaWYgbGFzdCBvbmUgaXMgb3duLCB0aGVuIGFsbCBwcm9wZXJ0aWVzIGFyZSBvd24uXG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIG9iaikgey8qKi99XG5cblx0cmV0dXJuIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fSBlbHNlIGlmICgodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykgfHwgdGFyZ2V0ID09IG51bGwpIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdGZvciAoOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzW2ldO1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAob3B0aW9ucyAhPSBudWxsKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbbmFtZV07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKHRhcmdldCAhPT0gY29weSkge1xuXHRcdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRcdGlmIChkZWVwICYmIGNvcHkgJiYgKGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gaXNBcnJheShjb3B5KSkpKSB7XG5cdFx0XHRcdFx0XHRpZiAoY29weUlzQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNBcnJheShzcmMpID8gc3JjIDogW107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNvcHkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBjb3B5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHdpbmRvdy5kMztcbnZhciBjb2xhID0gd2luZG93LmNvbGE7XG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcbmltcG9ydCBub2RlIGZyb20gJy4vZWxlbWVudHMvbm9kZSc7XG5pbXBvcnQgZWRnZSBmcm9tICcuL2VsZW1lbnRzL2VkZ2UnO1xuaW1wb3J0IEdyYXBoTWFuYWdlciBmcm9tICcuL0dyYXBoJztcbmltcG9ydCBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24gZnJvbSAnLi9zZWxlY3Rvci9HcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3IHtcbiAgY29uc3RydWN0b3IoaWQsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5ldmVudHMgPSBkMy5kaXNwYXRjaCgnbGF5b3V0JywgJ2ZpcnN0TGF5b3V0RW5kJyk7XG5cbiAgICB0aGlzLm1hcmtlcklkID0gJ21hcmtlci0nICsgaWQ7XG5cbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy8gZ3JhcGggaGFuZGxlcyB0aGUgaW50ZXJhY3Rpb25zIHdpdGggdGhlIGRyYXdlclxuICAgIHRoaXMuY3JlYXRlR3JhcGgoKTtcblxuICAgIC8vIHNlbGVjdG9yIGFuaW1hdGVzIHRoZSBub2Rlcy9lZGdlc1xuICAgIHRoaXMuc2VsZWN0b3IgPSBuZXcgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uKHRoaXMpO1xuXG4gICAgLy8gc3ViLWVsZW1lbnRzIHRoYXQgZHJhdyBzdHVmZlxuICAgIHRoaXMubm9kZURyYXdlciA9IG5vZGUoKS5vd25lcih0aGlzKTtcbiAgICB0aGlzLmVkZ2VEcmF3ZXIgPSBlZGdlKCkub3duZXIodGhpcyk7XG5cbiAgICAvLyBjb2xhXG4gICAgdGhpcy5sYXlvdXQgPSBjb2xhLmQzYWRhcHRvcigpO1xuXG4gICAgdGhpcy5sYXlvdXQub24oJ3RpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnRpY2soKTtcbiAgICB9KTtcblxuICAgIHZhciBmaXJzdEVuZCA9IHRydWU7XG4gICAgdGhpcy5sYXlvdXQub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChmaXJzdEVuZCkge1xuICAgICAgICBzZWxmLmV2ZW50cy5maXJzdExheW91dEVuZCgpO1xuICAgICAgICBmaXJzdEVuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlR3JhcGgoKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLm9wdGlvbnMuZGF0YTtcbiAgICB2YXIgbm9kZXMgPSBkYXRhLm5vZGVzO1xuICAgIHZhciBsaW5rcyA9IGRhdGEubGlua3M7XG5cbiAgICAvLyBlbXB0eSBhbmQgcmUtYWRkXG4gICAgZGF0YS5ub2RlcyA9IFtdO1xuICAgIGRhdGEubGlua3MgPSBbXTtcblxuICAgIHRoaXMuZ3JhcGggPSBuZXcgR3JhcGhNYW5hZ2VyKHRoaXMsIGRhdGEpO1xuICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHRoaXMuZ3JhcGguYWRkTm9kZShub2RlKTtcbiAgICB9LCB0aGlzKTtcbiAgICBsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICB0aGlzLmdyYXBoLmFkZEVkZ2UoZWRnZSk7XG4gICAgfSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICpcbiAgICogb3B0aW9uc1xuICAgKiAgIC0gdGFyZ2V0IHtzdHJpbmd9IHNlbGVjdG9yIHRvIHRoZSBlbGVtZW50IHRvIGhvbGQgdGhlIGdyYXBoXG4gICAqICAgLSB3aWR0aCB7bnVtYmVyfVxuICAgKiAgIC0gaGVpZ2h0IHtudW1iZXJ9XG4gICAqICAgLSBsYWJlbHM9dHJ1ZSB7Ym9vbGVhbn0gRmFsc2UgdG8gaGlkZSB0aGUgdmVydGV4IGxhYmVsc1xuICAgKiAgIC0gZGlyZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gZ2l2ZSBhbiBvcmllbnRhdGlvbiB0byB0aGUgZWRnZXNcbiAgICogICBoYXZlIGFuIGVkZ2VcbiAgICogICAtIGRhdGEge09iamVjdH1cbiAgICogICAgIC0gbGlua0Rpc3RhbmNlPTkwIHtudW1iZXJ9IEZvcmNlZCBtaW4gZGlzdGFuY2UgYmV0d2VlbiB2ZXJ0aWNlcyB0aGF0XG4gICAqICAgICAtIGNvbnN0cmFpbnRzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgIC0gZ3JvdXBzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgIC0gbm9kZXMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgICAtIHI9MTAge251bWJlcn0gbm9kZSByYWRpdXNcbiAgICogICAgIC0gbGlua3Mge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgICAtIGRpcmVjdGVkPWZhbHNlIHtib29sZWFufSB0cnVlIHRvIGdpdmUgYW4gb3JpZW50YXRpb24gdG8gdGhpcyBlZGdlXG4gICAqICAgICAgIC0gd2VpZ2h0PVwiXCIge3N0cmluZ30gTGFiZWwgb2YgdGhlIGVkZ2UgKGNhbiBiZSB0aGUgd2VpZ2h0KVxuICAgKlxuICAgKi9cbiAgZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgIC8vIGdyYXBoIGRlZmF1bHRzXG4gICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICB3aWR0aDogNzAwLFxuICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICBhbmltYXRpb25UaW1lOiAxMDAwLFxuICAgICAgbGFiZWxzOiB0cnVlLFxuICAgICAgZGlyZWN0ZWQ6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLm9wdGlvbnMuZGF0YSA9IGV4dGVuZCh7XG4gICAgICBub2RlczogW10sXG4gICAgICBsaW5rczogW10sXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgY29uc3RyYWludHM6IFtdLFxuICAgICAgYXZvaWRPdmVybGFwczogdHJ1ZSxcbiAgICAgIHNpemU6IFtvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodF0sXG4gICAgICBsaW5rRGlzdGFuY2U6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmxpbmtEaXN0YW5jZSB8fCA4MDtcbiAgICAgIH1cbiAgICB9LCB0aGlzLm9wdGlvbnMuZGF0YSk7XG4gIH1cblxuICBpbml0TGF5b3V0KHVwZGF0ZU9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodXBkYXRlT3B0aW9ucy5za2lwTGF5b3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoc2VsZi5vcHRpb25zLmRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgIHZhciB2ID0gc2VsZi5vcHRpb25zLmRhdGFba107XG4gICAgICBzZWxmLmxheW91dFtrXSh2KTtcbiAgICB9LCB0aGlzKTtcblxuICAgIC8vdGhpcy5sYXlvdXQuc3RhcnQoMTUsIDE1LCAxNSk7XG4gICAgdGhpcy5sYXlvdXQuc3RhcnQoKTtcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgdGhpcy5lZGdlR3JvdXAuY2FsbCh0aGlzLmVkZ2VEcmF3ZXIpO1xuICAgIHRoaXMubm9kZUdyb3VwLmNhbGwodGhpcy5ub2RlRHJhd2VyKTtcbiAgfVxuXG4gIHVwZGF0ZSh1cGRhdGVPcHRpb25zKSB7XG4gICAgdXBkYXRlT3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICBza2lwTGF5b3V0OiBmYWxzZVxuICAgIH0sIHVwZGF0ZU9wdGlvbnMpO1xuXG4gICAgdGhpcy5pbml0TGF5b3V0KHVwZGF0ZU9wdGlvbnMpO1xuICAgIHRoaXMuYnVpbGQodXBkYXRlT3B0aW9ucyk7XG5cbiAgICAvLyB1cGRhdGUgaW5uZXIgbm9kZXMvZWRnZXMgaWYgbGF5b3V0LnRpY2sgd2Fzbid0IHJ1blxuICAgIGlmICh1cGRhdGVPcHRpb25zLnNraXBMYXlvdXQpIHtcbiAgICAgIHRoaXMudGljaygpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgdGhpcy5yb290ID0gZDMuc2VsZWN0KHRoaXMub3B0aW9ucy50YXJnZXQpXG4gICAgICAuc2VsZWN0QWxsKCdzdmcuZ3JldWxlcicpXG4gICAgICAuZGF0YShbdGhpcy5vcHRpb25zXSk7XG5cbiAgICAvLyBlbnRlclxuICAgIHRoaXMucm9vdC5lbnRlciA9IHRoaXMucm9vdC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyZXVsZXInKTtcblxuICAgIC8vIG1hcmtlciBkZWZcbiAgICB0aGlzLnJvb3QuZW50ZXJcbiAgICAgIC5hcHBlbmQoJ3N2ZzpkZWZzJylcbiAgICAgIC5hcHBlbmQoJ3N2ZzptYXJrZXInKVxuICAgICAgLmF0dHIoJ2lkJywgdGhpcy5tYXJrZXJJZClcbiAgICAgIC5hdHRyKCd2aWV3Qm94JywgJzAgLTUgMTAgMTAnKVxuICAgICAgLmF0dHIoJ3JlZlgnLCA5KVxuICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgNSlcbiAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCA1KVxuICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcbiAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgIC5hdHRyKCdkJywgJ00wLC00TDEwLDBMMCw0TDIsMCcpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgJzBweCcpXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM3NzcnKTtcblxuICAgIC8vIHVwZGF0ZVxuICAgIHRoaXMucm9vdFxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5vcHRpb25zLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpO1xuXG4gICAgLy8gd3JhcHBlciBmb3IgdGhlIGVkZ2VzXG4gICAgdGhpcy5lZGdlR3JvdXAgPSB0aGlzLnJvb3RcbiAgICAgIC5zZWxlY3RBbGwoJ2cuZWRnZXMnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkLmRhdGFdOyB9KTtcbiAgICB0aGlzLmVkZ2VHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlcycpO1xuXG4gICAgLy8gd3JhcHBlciBmb3IgdGhlIG5vZGVzXG4gICAgdGhpcy5ub2RlR3JvdXAgPSB0aGlzLnJvb3RcbiAgICAgIC5zZWxlY3RBbGwoJ2cubm9kZXMnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFtkLmRhdGFdOyB9KTtcbiAgICB0aGlzLm5vZGVHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlcycpO1xuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge2NvbG9yc30gZnJvbSAnLi9jb25zdCc7XG5cbmNvbnN0IE5PREVfREVGQVVMVF9PUFRJT05TID0ge1xuICByOiAxMCxcbiAgZmlsbDogJyMyOTgwQjknXG59O1xuXG5jb25zdCBFREdFX0RFRkFVTFRfT1BUSU9OUyA9IHtcbiAgc3Ryb2tlOiBjb2xvcnMuTElHSFRfR1JBWVxufTtcblxuZnVuY3Rpb24gaW5jbHVkZXMoYXJyLCBpZCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChhcnJbaV0uaWQgPT09IGlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKlxuICogXG4gKiBAY2xhc3MgR3JhcGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGgge1xuICBjb25zdHJ1Y3Rvcihvd25lciwgZGF0YSkge1xuICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB0aGlzLm5vZGVzID0gZGF0YS5ub2RlcztcbiAgICB0aGlzLmVkZ2VzID0gZGF0YS5saW5rcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZ3JhcGgsIGVhY2ggb2YgdGhlIGFyZ3VtZW50cyBtdXN0XG4gICAqIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIGlkIHtOdW1iZXJ8c3RyaW5nfVxuICAgKlxuICAgKiBPcHRpb25hbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0geCB7bnVtYmVyfSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgbm9kZSBpbiB0aGUgZ3JhcGggKG9ubHkgaWYgZml4ZWQgPSB0cnVlKVxuICAgKiAtIHkge251bWJlcn0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIG5vZGUgaW4gdGhlIGdyYXBoIChvbmx5IGlmIGZpeGVkID0gdHJ1ZSlcbiAgICogLSBmaXhlZCB7Ym9vbGVhbn0gYHRydWVgIHRvIG1ha2UgdGhpcyBub2RlIG5vdCB0byBwYXJ0aWNpcGF0ZSBpbiB0aGUgbGF5b3V0IHByb2Nlc3NcbiAgICogLSBmaWxsIHtzdHJpbmd9IFRoZSBmaWxsIG9mIHRoZSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIHRoZSBub2RlXG4gICAqIC0gciB7bnVtYmVyfSBUaGUgcmFkaXVzIG9mIHRoZSBjaXJjbGUgdGhhdCByZXByZXNlbnRzIHRoZSBub2RlXG4gICAqIC0gbGFiZWwge3N0cmluZ30gVGhlIHRleHQgaW5zaWRlIHRoZSBub2RlIChpZiBpdCdzIG5vdCBwcmVzZW50IGl0J3MgZXF1YWwgdG8gdGhlIGBpZGApXG4gICAqIC0gdG9wUmlnaHRMYWJlbCB7c3RyaW5nXSB0aGUgdGV4dCBzaG93biBvbiB0aGUgdG9wIHJpZ2h0IHNpZGUgb2YgdGhlIG5vZGUsIHVzZWZ1bFxuICAgKiB0byByZXByZXNlbnQgYWRkaXRpb25hbCBhbm5vdGF0aW9uc1xuICAgKlxuICAgKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqL1xuICBhZGROb2RlKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBvYmplY3QgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0eSBgaWRgJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXROb2RlKGNvbmZpZykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25vZGUgYWxyZWFkeSBpbiBzdG9yZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5ub2Rlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmROb2RlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbm9kZSBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgZ2V0Tm9kZShub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeUZuKHYgPT4gdi5pZCA9PT0gbm9kZS5pZClbMF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIG5vZGVzIHRoYXQgc2F0aXNmeSB0aGUgcGFyYW1ldGVyIGBmbmAsXG4gICAqIGFsaWFzIGZvciBgdGhpcy5ub2Rlcy5maWx0ZXIoZm4pYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXROb2Rlc0J5Rm4oZm4pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIoZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBhZGphY2VudCBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRBZGphY2VudE5vZGVzKG5vZGUpIHtcbiAgICB2YXIgYWRqYWNlbnROb2RlcyA9IFtdO1xuICAgIHZhciB0YWtlbiA9IHt9O1xuICAgIHZhciBuZXh0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldO1xuICAgICAgbmV4dCA9IG51bGw7XG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0O1xuICAgICAgfSBlbHNlIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWU7XG4gICAgICAgIGFkamFjZW50Tm9kZXMucHVzaChuZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRqYWNlbnROb2RlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgc3VjY2Vzc29yIG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldFN1Y2Nlc3Nvck5vZGVzKG5vZGUpIHtcbiAgICB2YXIgc3VjY2Vzc29yID0gW107XG4gICAgdmFyIHRha2VuID0ge307XG4gICAgdmFyIG5leHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV07XG4gICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIGlmIChlZGdlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS50YXJnZXQ7XG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlO1xuICAgICAgICBzdWNjZXNzb3IucHVzaChuZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBwcmVkZWNlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRQcmVkZWNlc3Nvck5vZGVzKG5vZGUpIHtcbiAgICB2YXIgcHJlZGVjZXNzb3IgPSBbXTtcbiAgICB2YXIgdGFrZW4gPSB7fTtcbiAgICB2YXIgbmV4dDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXTtcbiAgICAgIG5leHQgPSBudWxsO1xuICAgICAgaWYgKGVkZ2UudGFyZ2V0LmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnNvdXJjZTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWU7XG4gICAgICAgIHByZWRlY2Vzc29yLnB1c2gobmV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqL1xuICByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICB0aGlzLnJlbW92ZU5vZGVzQnlGbihmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYuaWQgPT09IG5vZGUuaWQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIG5vZGVzIHN0b3JlZCBpbiBgbm9kZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gbm9kZXNcbiAgICovXG4gIHJlbW92ZU5vZGVzKG5vZGVzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlTm9kZXNCeUZuKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMobm9kZXMsIHYuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHByZWRpY2F0ZVxuICAgKiBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuICByZW1vdmVOb2Rlc0J5Rm4oZm4pIHtcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGZuKHRoaXMubm9kZXNbaV0sIGkpKSB7XG4gICAgICAgIC8vIHJlbW92ZSBub2Rlc1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAvLyByZW1vdmUgaW5jaWRlbnQgZWRnZXNcbiAgICAgICAgdGhpcy5yZW1vdmVFZGdlcyhcbiAgICAgICAgICB0aGlzLmdldEluY2lkZW50RWRnZXMobm9kZVswXSlcbiAgICAgICAgKTtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGVkZ2UgdG8gdGhlIGdyYXBoLCBlYWNoIG9mIHRoZSBhcmd1bWVudHMgbXVzdFxuICAgKiBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXNcbiAgICpcbiAgICogUmVxdWlyZWQgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIHNvdXJjZSB7bnVtYmVyfE9iamVjdH0gVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZSBvciB0aGUgc291cmNlIG5vZGUgaXRzZWxmXG4gICAqIC0gdGFyZ2V0IHtudW1iZXJ8T2JqZWN0fSBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlIG9yIHRoZSB0YXJnZXQgbm9kZSBpdHNlbGZcbiAgICpcbiAgICogT3B0aW9uYWwgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIGlkIHtzdHJpbmd8T2JqZWN0fSBJZiBhbiBpZCBpcyBub3QgcHJvdmlkZWQgYW4gYXV0byBnZW5lcmF0ZWQgc3RyaW5nIHdpbGwgYmUgYXNzaWduZWRcbiAgICogdG8gdGhpcyBlZGdlXG4gICAqIC0gc3Ryb2tlIHtzdHJpbmd9IFRoZSBzdHJva2Ugb2YgdGhlIHBhdGggdGhhdCByZXByZXNlbnRzIHRoZSBlZGdlXG4gICAqIC0gd2VpZ2h0IHtzdHJpbmd9IFRoZSB3ZWlnaHQgb2YgdGhlIGVkZ2VcbiAgICogLSBkaXJlY3RlZCB7Ym9vbGVhbn0gSWYgc2V0IHRvIHRydWUgYW4gYWRkaXRpb25hbCBhcnJvdyBpcyBhZGRlZCBhdCB0aGUgZW5kIG9mIHRoZSBlZGdlXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBhcmd1bWVudHNcbiAgICovXG4gIGFkZEVkZ2UoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KCdzb3VyY2UnKSB8fCAhY29uZmlnLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcigndGhlIGVkZ2UgbXVzdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIGBzb3VyY2VgIGFuZCBgdGFyZ2V0YCcpO1xuICAgICAgfVxuICAgICAgdmFyIHNvdXJjZSA9IGNvbmZpZy5zb3VyY2U7XG4gICAgICB2YXIgdGFyZ2V0ID0gY29uZmlnLnRhcmdldDtcblxuICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHNvdXJjZSA9IHRoaXMuZ2V0Tm9kZSh7IGlkOiBjb25maWcuc291cmNlIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXROb2RlKHsgaWQ6IGNvbmZpZy50YXJnZXQgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc291cmNlIHx8ICF0YXJnZXQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25ldyBlZGdlIGRvZXMgbm90IGpvaW4gZXhpc3RpbmcgdmVydGljZXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbmZpZy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICBjb25maWcudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgdGhpcy5lZGdlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmRFZGdlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIGVkZ2UgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWRnZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IGVkZ2UuaWQgVGhlIGlkIG9mIHRoZSBlZGdlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBnZXRFZGdlKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZSA9PiBlLmlkID09PSBlZGdlLmlkKVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZGlyZWN0ZWQgZWRnZXMgZnJvbSB0aGUgbm9kZSB3aG9zZSBpZCBpc1xuICAgKiBgb3B0aW9ucy5zb3VyY2VgIGFuZCB0byB0aGUgbm9kZSB3aG9zZSBpZCBpcyBgb3B0aW9ucy50YXJnZXRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy5zb3VyY2UgVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMudGFyZ2V0IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0RWRnZXNCZXR3ZWVuKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy5zb3VyY2UgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMudGFyZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyBmcm9tIGBvcHRpb25zLnNvdXJjZWAgdG8gYG9wdGlvbnMudGFyZ2V0YFxuICAgKiBvciBgb3B0aW9ucy50YXJnZXRgIHRvIGBvcHRpb25zLnNvdXJjZWBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnNvdXJjZSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy50YXJnZXQgVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRBbGxFZGdlc0JldHdlZW4ob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIChlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy5zb3VyY2UgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMudGFyZ2V0KSB8fFxuICAgICAgICAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMudGFyZ2V0ICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnNvdXJjZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBlZGdlIGlkZW50aWZpZWQgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKi9cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgdGhpcy5yZW1vdmVFZGdlc0J5Rm4oZSA9PiBlLmlkID09PSBlZGdlLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgZWRnZXMgc3RvcmVkIGluIGBlZGdlc2AsXG4gICAqIGVhY2ggb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBlZGdlc1xuICAgKi9cbiAgcmVtb3ZlRWRnZXMoZWRnZXMpIHtcbiAgICAvLyBUT0RPOiBpbXByb3ZlIG5eMiByZW1vdmFsXG4gICAgdGhpcy5yZW1vdmVFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBpbmNsdWRlcyhlZGdlcywgZS5pZCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlRWRnZXNCeUZuKGZuKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLmVkZ2VzW2ldLCBpKSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgdGhhdCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHByZWRpY2F0ZSBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQnlGbihmbikge1xuICAgIHJldHVybiB0aGlzLmVkZ2VzLmZpbHRlcihmbik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIG91dGdvaW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRPdXRnb2luZ0VkZ2VzKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oKGUpID0+IGUuc291cmNlLmlkID09PSBub2RlLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jb21pbmcgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY29taW5nRWRnZXMobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbigoZSkgPT4gZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBpbmNpZGVudCBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3V0Z29pbmdFZGdlcyhub2RlKVxuICAgICAgLmNvbmNhdCh0aGlzLmdldEluY29taW5nRWRnZXMobm9kZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZhY2FkZSB0byBhZGQgbm9kZXMvZWRnZXNcbiAgICpcbiAgICogTk9URTogdGhlIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgcGFyYW1ldGVyc1xuICAgKi9cbiAgYWRkKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWwgPSBhcmd1bWVudHNbaV07XG4gICAgICAvLyBhc3N1bWUgdGhhdCBlZGdlcyBoYXZlIGEgc291cmNlL3RhcmdldCBwYXJhbWV0ZXJcbiAgICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgJiYgZWwuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XG4gICAgICAgIHRoaXMuYWRkRWRnZShlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZE5vZGUoZWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmROb2RlRGVmYXVsdHModikge1xuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgdi5pZCA9IHV0aWwuaWQoKTtcbiAgICB9XG5cbiAgICB2ID0gZXh0ZW5kKFxuICAgICAge30sXG4gICAgICAvLyBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICBOT0RFX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIC8vIGluc3RhbmNlIGRlZmF1bHRzXG4gICAgICB0aGlzLm9wdGlvbnMubm9kZURlZmF1bHRzLFxuICAgICAgLy8gbm9kZVxuICAgICAgdlxuICAgICk7XG5cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykpIHtcbiAgICAgIHYud2lkdGggPSAyICogdi5yO1xuICAgIH1cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ2hlaWdodCcpKSB7XG4gICAgICB2LmhlaWdodCA9IDIgKiB2LnI7XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG5cbiAgc3RhdGljIGFwcGVuZEVkZ2VEZWZhdWx0cyhlKSB7XG4gICAgaWYgKCFlLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICBlLmlkID0gdXRpbC5pZCgpO1xuICAgIH1cbiAgICBlID0gZXh0ZW5kKFxuICAgICAge30sXG4gICAgICAvLyBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICBFREdFX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIC8vIGluc3RhbmNlIGRlZmF1bHRzXG4gICAgICB0aGlzLm9wdGlvbnMuZWRnZURlZmF1bHRzLFxuICAgICAgLy8gZWRnZVxuICAgICAgZVxuICAgICk7XG4gICAgcmV0dXJuIGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHJhbmRvbSBncmFwaCB3aXRoIHRoZSBmb2xsb3dpbmcgZGVmYXVsdHMgb3B0aW9ucyBvdmVycmlkZGVuIGJ5IGBvcHRpb25zYDpcbiAgICpcbiAgICogLSBvcHRpb25zLm9yZGVyPTEwIHtudW1iZXJ9IFRoZSBudW1iZXIgb2Ygbm9kZXMgaW4gdGhlIGdyYXBoXG4gICAqIC0gb3B0aW9ucy5zaXplPTE1IHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgZWRnZXMgaW4gdGhlIGdyYXBoXG4gICAqIC0gb3B0aW9ucy5jb25uZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gbWFrZSB0aGUgZ3JhcGggY29ubmVjdGVkLFxuICAgKiBpdCdzIGd1YXJhbnRlZWQgdG8gaGF2ZSBhdCBsZWFzdCBgb3B0aW9ucy5vcmRlciAtIDFgIGVkZ2VzXG4gICAqIC0gb3B0aW9ucy5tdWx0aUdyYXBoPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBwYXJhbGxlbCBlZGdlc1xuICAgKiAtIG9wdGlvbnMucHNldWRvR3JhcGg9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIGxvb3AgZWRnZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge3tub2RlczogQXJyYXksIGxpbmtzOiBBcnJheX19XG4gICAqL1xuICBzdGF0aWMgcmFuZG9tKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIG9yZGVyOiAxMCxcbiAgICAgIHNpemU6IDE1LFxuICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgIG11bHRpR3JhcGg6IGZhbHNlLFxuICAgICAgcHNldWRvR3JhcGg6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICB2YXIgaSwgdSwgdjtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgYWRqYWNlbmN5TGlzdCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLm9yZGVyOyBpICs9IDEpIHtcbiAgICAgIGFkamFjZW5jeUxpc3RbaV0gPSBbXTtcbiAgICAgIG5vZGVzLnB1c2goeyBpZDogaSB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQodSwgdikge1xuICAgICAgYWRqYWNlbmN5TGlzdFt1XVt2XSA9IGFkamFjZW5jeUxpc3Rbdl1bdV0gPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBlZGdlcyA9IFtdO1xuICAgIGkgPSAwO1xuXG4gICAgaWYgKG9wdGlvbnMuY29ubmVjdGVkKSB7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICAgIHYgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKTtcbiAgICAgICAgYWRkKGksIHYpO1xuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IGksXG4gICAgICAgICAgdGFyZ2V0OiB2XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaSAtPSAxO1xuICAgIH1cblxuICAgIGZvciAoOyBpIDwgb3B0aW9ucy5zaXplOyBpICs9IDEpIHtcbiAgICAgIHUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm9yZGVyKTtcbiAgICAgIHYgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm9yZGVyKTtcblxuICAgICAgaWYgKHUgPT09IHYgJiYgIW9wdGlvbnMucHNldWRvR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfSBlbHNlIGlmIChhZGphY2VuY3lMaXN0W3VdW3ZdICYmICFvcHRpb25zLm11bHRpR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKHUsIHYpO1xuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IHUsXG4gICAgICAgICAgdGFyZ2V0OiB2XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBub2Rlczogbm9kZXMsXG4gICAgICBsaW5rczogZWRnZXNcbiAgICB9O1xuICB9XG59XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVmVjdG9yIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIC8vIHVuYXJ5XG5cbiAgc3RhdGljIG5lZyhhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoLWEueCwgLWEueSk7XG4gIH1cblxuICBzdGF0aWMgbGVuKGEpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KFZlY3Rvci5sZW5TcShhKSk7XG4gIH1cblxuICBzdGF0aWMgbGVuU3EoYSkge1xuICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnk7XG4gIH1cblxuICBzdGF0aWMgdW5pdChhKSB7XG4gICAgaWYgKGEueCA9PT0gMCAmJiBhLnkgPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCd0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgaXMgMCcpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW4oYSk7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54IC8gbGVuZ3RoLCBhLnkgLyBsZW5ndGgpO1xuICB9XG5cbiAgc3RhdGljIG9ydGhvZ29uYWwoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLnksIGEueCk7XG4gIH1cblxuICBzdGF0aWMgYW5nbGVEZWcoYSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGEueSwgYS54KSAqIDE4MCAvIE1hdGguUEk7XG4gIH1cblxuLy8gYmluYXJ5XG5cbiAgc3RhdGljIGFkZChhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54ICsgYi54LCBhLnkgKyBiLnkpO1xuICB9XG5cbiAgc3RhdGljIHN1YihhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54IC0gYi54LCBhLnkgLSBiLnkpO1xuICB9XG5cbiAgc3RhdGljIGRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueTtcbiAgfVxuXG4gIHN0YXRpYyBzY2FsZShhLCBuKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54ICogbiwgYS55ICogbik7XG4gIH1cblxuICBzdGF0aWMgbWlkKGEsIGIpIHtcbiAgICByZXR1cm4gVmVjdG9yLnNjYWxlKFZlY3Rvci5hZGQoYSwgYiksIDAuNSk7XG4gIH1cblxuICBzdGF0aWMgYW5nbGVCZXR3ZWVuKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hY29zKFZlY3Rvci5kb3QoYSwgYikgLyBWZWN0b3IubGVuKGEpIC0gVmVjdG9yLmxlbihiKSk7XG4gIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gd2luZG93LmQzO1xudmFyIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpO1xudmFyIGNvbG9ycyA9IHt9O1xudmFyIGNvbG9yTGl0ZXJhbHMgPSBbJ0JMVUUnLCAnT1JBTkdFJywgJ0dSRUVOJywgJ1JFRCcsICdQVVJQTEUnLCAnQlJPV04nLCAnUElOSycsICdHUkFZJywgJ1lFTExPVycsICdDWUFOJ107XG5jb2xvckxpdGVyYWxzLmZvckVhY2goZnVuY3Rpb24gKGMsIGkpIHtcbiAgY29sb3JzW2NdID0gY29sb3IucmFuZ2UoKVsyICogaV07XG4gIGNvbG9yc1snTElHSFRfJyArIGNdID0gY29sb3IucmFuZ2UoKVsyICogaSArIDFdO1xufSk7XG5cbmNvbG9ycy5yYW5kb21Gcm9tUGFsZXR0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNvbG9yLnJhbmdlKClbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApXTtcbn07XG5cbmV4cG9ydCB7Y29sb3JzfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gd2luZG93LmQzO1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1ZlY3Rvcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIG93bmVyO1xuXG4gIGZ1bmN0aW9uIHNlbGZMb29wKHUsIG1hcmdpbikge1xuICAgIHZhciBhZGphY2VudCA9IG93bmVyLmdyYXBoLmdldEFkamFjZW50Tm9kZXModSk7XG4gICAgdmFyIGRpciA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIHYgPSBhZGphY2VudFtpXTtcbiAgICAgIGlmICh1LmlkICE9PSB2LmlkKSB7XG4gICAgICAgIGRpciA9IFZlY3Rvci51bml0KFZlY3Rvci5hZGQoXG4gICAgICAgICAgZGlyLFxuICAgICAgICAgIFZlY3Rvci51bml0KFZlY3Rvci5zdWIodSwgdikpXG4gICAgICAgICkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5vIGFkamFjZW50IHZlcnRpY2VzXG4gICAgaWYgKGRpci54ID09PSAwICYmIGRpci55ID09PSAwKSB7XG4gICAgICBkaXIgPSBWZWN0b3IudW5pdChuZXcgVmVjdG9yKDAsIC0xKSk7XG4gICAgfVxuXG4gICAgdmFyIGsgPSAwLjg7XG4gICAgdmFyIHVwID0gVmVjdG9yLmFkZCh1LCBWZWN0b3Iuc2NhbGUoZGlyLCBtYXJnaW4gKiBrKSk7XG4gICAgdmFyIG1pZCA9IFZlY3Rvci5taWQodSwgdXApO1xuICAgIHZhciBvcnQgPSBWZWN0b3Iub3J0aG9nb25hbChkaXIpO1xuXG4gICAgdmFyIHJpZ2h0ID0gVmVjdG9yLmFkZChtaWQsIFZlY3Rvci5zY2FsZShvcnQsIG1hcmdpbiAvIDIgKiBrKSk7XG4gICAgdmFyIGxlZnQgPSBWZWN0b3IuYWRkKG1pZCwgVmVjdG9yLnNjYWxlKG9ydCwgLW1hcmdpbiAvIDIgKiBrKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogW2xlZnQsIHVwLCByaWdodF0sXG4gICAgICBkaXI6IG9ydFxuICAgIH07XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHZlcnNvcihwKSB7XG4gICAgdmFyIGR4ID0gcC54O1xuICAgIHZhciBkeSA9IHAueTtcbiAgICB2YXIgbCA9IE1hdGguc3FydCggZHggKiBkeCArIGR5ICogZHkgKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogcC54IC8gbCxcbiAgICAgIHk6IHAueSAvIGxcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGF0aChkLCBtZXRhLCBtYXJnaW4pIHtcbiAgICB2YXIgdSwgdjtcbiAgICB2YXIgY3VycmVudDtcblxuICAgIHUgPSBkLnNvdXJjZTtcbiAgICB2ID0gZC50YXJnZXQ7XG4gICAgaWYgKHUuaWQgPiB2LmlkKSB7XG4gICAgICBbdSwgdl0gPSBbdiwgdV07XG4gICAgfVxuICAgIG1ldGFbdS5pZF0gPSBtZXRhW3UuaWRdIHx8IHt9O1xuXG4gICAgY3VycmVudCA9IChtZXRhW3UuaWRdW3YuaWRdID0gbWV0YVt1LmlkXVt2LmlkXSB8fCB7XG4gICAgICBjb3VudDogMSxcbiAgICAgIG1pZDogVmVjdG9yLm1pZCh1LCB2KSxcbiAgICAgIGRpcmVjdGlvbjogLTFcbiAgICB9KTtcblxuICAgIHZhciBpbm5lckpvaW50cyA9IFtdO1xuXG4gICAgaWYgKHUuaWQgPT09IHYuaWQpIHtcbiAgICAgIC8vIGFwcGx5IHRoZSBmb2xsb3dpbmcgZm9yIHNlbGYtbG9vcCBlZGdlc1xuICAgICAgdmFyIGxvb3AgPSBzZWxmTG9vcCh1LCBtYXJnaW4gKiB2LnIgKiAoY3VycmVudC5jb3VudCArIDEpKTtcbiAgICAgIGlubmVySm9pbnRzID0gbG9vcC5wYXRoO1xuICAgICAgZC51bml0ID0gbG9vcC5kaXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1bml0O1xuICAgICAgaWYgKFZlY3Rvci5sZW4oVmVjdG9yLnN1Yih2LCB1KSkpIHtcbiAgICAgICAgdW5pdCA9IFZlY3Rvci51bml0KFZlY3Rvci5zdWIodiwgdSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5pdCA9IG5ldyBWZWN0b3IoMSwgMCk7XG4gICAgICB9XG5cbiAgICAgIGV4dGVuZChjdXJyZW50LCB7XG4gICAgICAgIHVuaXQ6IHVuaXQsXG4gICAgICAgIHVuaXRJbnZlcnNlOiBWZWN0b3Iub3J0aG9nb25hbCh1bml0KVxuICAgICAgfSk7XG4gICAgICBpbm5lckpvaW50cy5wdXNoKFZlY3Rvci5hZGQoXG4gICAgICAgIGN1cnJlbnQubWlkLFxuICAgICAgICBWZWN0b3Iuc2NhbGUoXG4gICAgICAgICAgY3VycmVudC51bml0SW52ZXJzZSxcbiAgICAgICAgICBNYXRoLmZsb29yKGN1cnJlbnQuY291bnQgLyAyKSAqIG1hcmdpbiAqIHYuciAqIGN1cnJlbnQuZGlyZWN0aW9uXG4gICAgICAgIClcbiAgICAgICkpO1xuICAgICAgZC51bml0ID0gY3VycmVudC51bml0O1xuICAgIH1cblxuICAgIGN1cnJlbnQuY291bnQgKz0gMTtcbiAgICBjdXJyZW50LmRpcmVjdGlvbiAqPSAtMTtcbiAgICBcbiAgICB2YXIgcDAgPSB1O1xuICAgIHZhciBwMSA9IHY7XG4gICAgXG4gICAgdmFyIE5hYlAwID0gdmVyc29yKHtcbiAgICAgIHg6IGlubmVySm9pbnRzWzBdLnggLSBwMC54LFxuICAgICAgeTogaW5uZXJKb2ludHNbMF0ueSAtIHAwLnlcbiAgICB9KTtcbiAgICBcbiAgICBwMCA9IHtcbiAgICAgIHg6IHAwLnggKyBOYWJQMC54ICogdS5yLFxuICAgICAgeTogcDAueSArIE5hYlAwLnkgKiB1LnJcbiAgICB9O1xuICAgIFxuICAgIHZhciBsID0gaW5uZXJKb2ludHMubGVuZ3RoIC0gMTtcbiAgICBcbiAgICB2YXIgTmFiUDEgPSB2ZXJzb3Ioe1xuICAgICAgeDogcDEueCAtIGlubmVySm9pbnRzW2xdLngsXG4gICAgICB5OiBwMS55IC0gaW5uZXJKb2ludHNbbF0ueVxuICAgIH0pO1xuICAgIFxuICAgIHAxID0ge1xuICAgICAgeDogcDEueCAtIE5hYlAxLnggKiB2LnIsXG4gICAgICB5OiBwMS55IC0gTmFiUDEueSAqIHYuclxuICAgIH07XG4gICAgXG4gICAgaW5uZXJKb2ludHMudW5zaGlmdChwMCk7XG4gICAgaW5uZXJKb2ludHMucHVzaChwMSk7XG4gICAgXG4gICAgZC5wYXRoID0gaW5uZXJKb2ludHM7XG4gIH1cblxuICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAueChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54OyB9KVxuICAgIC55KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnk7IH0pXG4gICAgLmludGVycG9sYXRlKCdiYXNpcycpO1xuICAgIC8vLnRlbnNpb24oMS41KVxuICAgIC8vLmludGVycG9sYXRlKCdidW5kbGUnKTtcblxuICBmdW5jdGlvbiBpbm5lcihzZWxlY3Rpb24pIHtcbiAgICAvLyBlZGdlc1xuICAgIHZhciBsaW5rcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cuZWRnZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rcztcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG4gICAgbGlua3MuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2UnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ2lkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHV0aWxzLm5zKGQuaWQpOyB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSk7XG5cbiAgICAvLyB1cGRhdGVcbiAgICBsaW5rc1xuICAgICAgLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBjbHMgPSB7XG4gICAgICAgICAgZGlyZWN0ZWQ6IGQuZGlyZWN0ZWQgfHwgb3duZXIub3B0aW9ucy5kaXJlY3RlZFxuICAgICAgICB9O1xuICAgICAgICBjbHNbJ3NvdXJjZS0nICsgZC5zb3VyY2UuaWRdID0gdHJ1ZTtcbiAgICAgICAgY2xzWyd0YXJnZXQtJyArIGQudGFyZ2V0LmlkXSA9IHRydWU7XG4gICAgICAgIHNlbGYuY2xhc3NlZChjbHMpO1xuICAgICAgfSk7XG5cbiAgICB2YXIgbWV0YSA9IHt9O1xuICAgIGxpbmtzLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgIGNyZWF0ZVBhdGgoZCwgbWV0YSwgMS43KTtcbiAgICB9KTtcblxuICAgIC8vIHBhdGggZW50ZXJcbiAgICB2YXIgcGF0aHMgPSBsaW5rcy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgLy8gMS4gcmVhbCBwYXRoXG4gICAgICAgIC8vIDIuIHN0cm9rZS1kYXNoYXJyYXkgaGVscGVyXG4gICAgICAgIHJldHVybiBbZCwgZF07XG4gICAgICB9KTtcbiAgICBwYXRocy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBkID0+IGQuc3Ryb2tlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAndHJhbnNwYXJlbnQnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDIpXG4gICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGVsLmF0dHIoJ29wYWNpdHknLCAhaSA/IDEgOiAwKTtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBlbC5jbGFzc2VkKCdiYXNlJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICBlbC5hdHRyKCdzdHJva2Utd2lkdGgnLCA1KTtcbiAgICAgICAgICBlbC5jbGFzc2VkKCd0cmF2ZXJzYWwnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLy5hdHRyKCdkJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpO1xuICAgICAgLy8gIHJldHVybiBsaW5lKFtwYXJlbnQuc291cmNlXSk7XG4gICAgICAvL30pO1xuXG4gICAgLy8gcGF0aCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24ocGF0aHMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAuYXR0cignZCcsIGQgPT4gbGluZShkLnBhdGgpKTtcblxuICAgIHBhdGhzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgdmFyIHBhcmVudCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgcGF0aC5hdHRyKCdtYXJrZXItZW5kJyxcbiAgICAgICAgICBwYXJlbnQuY2xhc3NlZCgnZGlyZWN0ZWQnKVxuICAgICAgICAgICAgPyAndXJsKCMnICsgb3duZXIubWFya2VySWQgKyAnKSdcbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gd2VpZ2h0UG9zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgdmFyIGFuZ2xlID0gVmVjdG9yLmFuZ2xlRGVnKGQudW5pdCk7XG4gICAgICAgICAgdmFyIHYgPSBkLnBhdGhbTWF0aC5mbG9vcihkLnBhdGgubGVuZ3RoIC8gMildO1xuICAgICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB2LFxuICAgICAgICAgICAgcm90YXRlOiBhbmdsZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgd2VpZ2h0cyA9IGxpbmtzLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2RdOyB9KTtcblxuICAgIC8vIHdlaWdodCBlbnRlclxuICAgIHdlaWdodHMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAndGV4dC1hZnRlci1lZGdlJylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgLmNhbGwod2VpZ2h0UG9zaXRpb24pO1xuXG4gICAgLy8gd2VpZ2h0IHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbih3ZWlnaHRzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLnRleHQoZCA9PiBkLndlaWdodClcbiAgICAgIC5jYWxsKHdlaWdodFBvc2l0aW9uKTtcblxuICAgIC8vIHdlaWdodCBleGl0XG4gICAgd2VpZ2h0cy5leGl0KClcbiAgICAgIC5yZW1vdmUoKTtcblxuICAgIC8vIGV4aXRcbiAgICBsaW5rcy5leGl0KClcbiAgICAgIC5yZW1vdmUoKTtcbiAgfVxuXG4gIGlubmVyLm93bmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb3duZXI7XG4gICAgfVxuICAgIG93bmVyID0gdmFsdWU7XG4gICAgcmV0dXJuIGlubmVyO1xuICB9O1xuXG4gIHJldHVybiBpbm5lcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gd2luZG93LmQzO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtjb2xvcnN9IGZyb20gJy4uL2NvbnN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBvd25lcjtcblxuICBmdW5jdGlvbiBpbm5lcihzZWxlY3Rpb24pIHtcbiAgICB2YXIgbm9kZXMgPSBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ2cubm9kZScpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5ub2RlcztcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG5cbiAgICB2YXIgbGF5b3V0ID0gb3duZXIubGF5b3V0O1xuXG4gICAgdmFyIGcgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gJ25vZGUgJyArIChkLmNsYXNzIHx8ICcnKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignaWQnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gdXRpbHMubnMoZC5pZCk7IH0pXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7IHRyYW5zbGF0ZTogZCB9KTtcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZiAoIWVsLm92ZXIpIHtcbiAgICAgICAgICBlbC5zdHlsZSgnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5vdmVyID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGVsLm92ZXIgPSBmYWxzZTtcbiAgICAgICAgZWwuc3R5bGUoJ2N1cnNvcicsIG51bGwpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMCk7XG4gICAgZy50cmFuc2l0aW9uKCdlbnRlcicpXG4gICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xuICAgIGcuY2FsbChsYXlvdXQuZHJhZyk7XG5cbiAgICB2YXIgZHJhZ1N0YXJ0ID0gbGF5b3V0LmRyYWcoKS5vbignZHJhZ3N0YXJ0LmQzYWRhcHRvcicpO1xuICAgIHZhciBkcmFnRW5kID0gbGF5b3V0LmRyYWcoKS5vbignZHJhZ2VuZC5kM2FkYXB0b3InKTtcbiAgICBsYXlvdXQuZHJhZygpXG4gICAgICAub24oJ2RyYWdzdGFydC5kM2FkYXB0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG93bmVyLm5vZGVEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIGRyYWdTdGFydC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICB9KVxuICAgICAgLm9uKCdkcmFnZW5kLmQzYWRhcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3duZXIubm9kZURyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIGRyYWdFbmQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG5cbiAgICBnLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgIC5hdHRyKCdmaWxsJywgKGQpID0+IGQuZmlsbClcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IGQuciApO1xuXG4gICAgLy8gaW5uZXIgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnbGFiZWwnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcxMnB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgLmF0dHIoJ3knLCAoZCkgPT4gZC5oZWlnaHQgLyA0KTtcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQubGFiZWwnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCdsYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLmxhYmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkLmlkO1xuICAgICAgfSk7XG5cbiAgICAvLyB0b3AtcmlnaHQgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnb3V0ZXItdG9wLXJpZ2h0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgLmF0dHIoJ3gnLCBkID0+IGQud2lkdGggLyAyIC0gMilcbiAgICAgIC5hdHRyKCd5JywgZCA9PiAtZC5oZWlnaHQgLyAyICsgMyk7XG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0Lm91dGVyLXRvcC1yaWdodCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BSaWdodExhYmVsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIHRvcC1sZWZ0IGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ291dGVyLXRvcC1sZWZ0JywgdHJ1ZSlcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JzLkJMVUUpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnZW5kJylcbiAgICAgIC5hdHRyKCd4JywgZCA9PiAtZC53aWR0aCAvIDIgLSAyKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IC1kLmhlaWdodCAvIDIgKyAzKTtcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLWxlZnQnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCd0b3BSaWdodExhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9wTGVmdExhYmVsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbihub2RlcywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IGRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIGV4aXRcbiAgICBub2Rlcy5leGl0KClcbiAgICAgIC5yZW1vdmUoKTtcbiAgfVxuXG4gIGlubmVyLm93bmVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb3duZXI7XG4gICAgfVxuICAgIG93bmVyID0gdmFsdWU7XG4gICAgcmV0dXJuIGlubmVyO1xuICB9O1xuXG4gIHJldHVybiBpbm5lcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBvbHlmaWxscyBmcm9tICcuL3BvbHlmaWxscyc7XG5wb2x5ZmlsbHMoKTtcblxudmFyIGQzID0gd2luZG93LmQzO1xuXG4vLyBub2RlXG5pbXBvcnQgRHJhdyBmcm9tICcuL0RyYXcnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG52YXIgaW5zdGFuY2VzID0gW107XG5cbmZ1bmN0aW9uIHJ1bihvcHRpb25zKSB7XG4gIGZ1bmN0aW9uIGZhY3Rvcnkob3B0aW9ucykge1xuICAgIHZhciBlbCA9IGQzLnNlbGVjdChvcHRpb25zLnRhcmdldCk7XG4gICAgdmFyIGlkID0gZWwuYXR0cignZ3JldWxlci1pZCcpO1xuICAgIGlmICghaWQpIHtcbiAgICAgIGlkID0gdXRpbHMuaWQoKTtcbiAgICAgIGVsLmF0dHIoJ2dyZXVsZXItaWQnLCBpZCk7XG4gICAgICBpbnN0YW5jZXNbaWRdID0gbmV3IERyYXcoaWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2VzW2lkXTtcbiAgfVxuXG4gIHJldHVybiBmYWN0b3J5KG9wdGlvbnMpO1xufVxuXG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCc7XG5ydW4uR3JhcGggPSBHcmFwaDtcblxuaW1wb3J0IHtjb2xvcnN9IGZyb20gJy4vY29uc3QnO1xucnVuLmNvbG9ycyA9IGNvbG9ycztcblxuaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllci9pbmRleCc7XG5ydW4ucGxheWVyID0gcGxheWVyO1xuXG5leHBvcnQgZGVmYXVsdCBydW47XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKGFjdGlvbnMsIHNwZWVkKSB7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG5cbiAgICAvLyBzdGF0ZXNcbiAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFjdGlvbnNbdGhpcy5pbmRleCsrXSgpO1xuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQodGhpcy5wbGF5LmJpbmQodGhpcyksIHRoaXMuc3BlZWQpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2UsIHNwZWVkKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZCB8fCBpbnN0YW5jZS5vcHRpb25zLmFuaW1hdGlvblRpbWU7XG4gICAgdGhpcy5mbiA9IG51bGw7XG4gICAgdGhpcy50aW1lciA9IG51bGw7XG4gIH1cblxuICBydW4oZm4pIHtcbiAgICB0aGlzLmZuID0gZm4odGhpcy5pbnN0YW5jZSk7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICBydW5BbmltYXRpb24oYW5pbWF0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYW5pbWF0aW9uKSkge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbi5mb3JFYWNoKHRoaXMucnVuQW5pbWF0aW9uLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbih0aGlzLmluc3RhbmNlKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHRoaXMuaW5zdGFuY2VbYW5pbWF0aW9uLnR5cGVdO1xuICAgIHJldHVybiB0eXBlW2FuaW1hdGlvbi5vcF0uYXBwbHkodHlwZSwgYW5pbWF0aW9uLmFyZ3MgfHwgW10pO1xuICB9XG5cbiAgcGxheSh2YWx1ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbmV4dCA9IHRoaXMuZm4ubmV4dCh2YWx1ZSk7XG4gICAgaWYgKCFuZXh0LmRvbmUpIHtcbiAgICAgIHZhciBkZWxheSA9IHRoaXMuc3BlZWQ7XG4gICAgICB2YXIgcnVuQW5pbWF0aW9uVmFsdWUgPSB0aGlzLnJ1bkFuaW1hdGlvbihuZXh0LnZhbHVlKTtcbiAgICAgIGlmIChydW5BbmltYXRpb25WYWx1ZSAmJiB0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcnVuQW5pbWF0aW9uVmFsdWUuZGVsYXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZGVsYXkgPSBydW5BbmltYXRpb25WYWx1ZS5kZWxheTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRpbWVyID0gd2luZG93LnJlcXVlc3RUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5wbGF5KG5leHQudmFsdWUpO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHdpbmRvdy5jbGVhclJlcXVlc3RUaW1lb3V0KHRoaXMudGltZXIpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBGaXhlZCBmcm9tICcuL0ZpeGVkJztcbmltcG9ydCBHZW5lcmF0b3IgZnJvbSAnLi9HZW5lcmF0b3InO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEZpeGVkSW50ZXJ2YWw6IEZpeGVkLFxuICBHZW5lcmF0b3I6IEdlbmVyYXRvclxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvKmVzbGludC1kaXNhYmxlICovXG4gIChmdW5jdGlvbihkb2MsIHByb3RvKSB7XG4gICAgdHJ5IHsgLy8gY2hlY2sgaWYgYnJvd3NlciBzdXBwb3J0cyA6c2NvcGUgbmF0aXZlbHlcbiAgICAgIGRvYy5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgYm9keScpO1xuICAgIH0gY2F0Y2ggKGVycikgeyAvLyBwb2x5ZmlsbCBuYXRpdmUgbWV0aG9kcyBpZiBpdCBkb2Vzbid0XG4gICAgICBbJ3F1ZXJ5U2VsZWN0b3InLCAncXVlcnlTZWxlY3RvckFsbCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHZhciBuYXRpdmUgPSBwcm90b1ttZXRob2RdO1xuICAgICAgICBwcm90b1ttZXRob2RdID0gZnVuY3Rpb24oc2VsZWN0b3JzKSB7XG4gICAgICAgICAgaWYgKC8oXnwsKVxccyo6c2NvcGUvLnRlc3Qoc2VsZWN0b3JzKSkgeyAvLyBvbmx5IGlmIHNlbGVjdG9ycyBjb250YWlucyA6c2NvcGVcbiAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7IC8vIHJlbWVtYmVyIGN1cnJlbnQgZWxlbWVudCBpZFxuICAgICAgICAgICAgdGhpcy5pZCA9ICdJRF8nICsgRGF0ZS5ub3coKTsgLy8gYXNzaWduIG5ldyB1bmlxdWUgaWRcbiAgICAgICAgICAgIHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5yZXBsYWNlKC8oKF58LClcXHMqKTpzY29wZS9nLCAnJDEjJyArIHRoaXMuaWQpOyAvLyByZXBsYWNlIDpzY29wZSB3aXRoICNJRFxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGRvY1ttZXRob2RdKHNlbGVjdG9ycyk7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7IC8vIHJlc3RvcmUgcHJldmlvdXMgaWRcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmUuY2FsbCh0aGlzLCBzZWxlY3RvcnMpOyAvLyB1c2UgbmF0aXZlIGNvZGUgZm9yIG90aGVyIHNlbGVjdG9yc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KSh3aW5kb3cuZG9jdW1lbnQsIEVsZW1lbnQucHJvdG90eXBlKTtcblxuICAvLyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2pvZWxhbWJlcnQvMTAwMjExNlxuICAvL1xuICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSBzaGltIGJ5IFBhdWwgSXJpc2hcbiAgLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICBmdW5jdGlvbigvKiBmdW5jdGlvbiAqLyBjYWxsYmFjaywgLyogRE9NRWxlbWVudCAqLyBlbGVtZW50KXtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICB9O1xuICB9KSgpO1xuXG4gIC8qKlxuICAgKiBCZWhhdmVzIHRoZSBzYW1lIGFzIHNldFRpbWVvdXQgZXhjZXB0IHVzZXMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgd2hlcmUgcG9zc2libGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtpbnR9IGRlbGF5IFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHNcbiAgICovXG4gIHdpbmRvdy5yZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uKGZuLCBkZWxheSkge1xuICAgIGlmKCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgIXdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICEod2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSAmJiAvLyBGaXJlZm94IDUgc2hpcHMgd2l0aG91dCBjYW5jZWwgc3VwcG9ydFxuICAgICAgIXdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZuLCBkZWxheSk7XG5cbiAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgaGFuZGxlID0ge307XG5cbiAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgZGVsdGEgPSBjdXJyZW50IC0gc3RhcnQ7XG5cbiAgICAgIGRlbHRhID49IGRlbGF5ID8gZm4uY2FsbCgpIDogaGFuZGxlLnZhbHVlID0gcmVxdWVzdEFuaW1GcmFtZShsb29wKTtcbiAgICB9XG5cbiAgICBoYW5kbGUudmFsdWUgPSByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApO1xuICAgIHJldHVybiBoYW5kbGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgY2xlYXJUaW1lb3V0IGV4Y2VwdCB1c2VzIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHdoZXJlIHBvc3NpYmxlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICogQHBhcmFtIHtpbnR8b2JqZWN0fSBoYW5kbGUgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICB3aW5kb3cuY2xlYXJSZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOiAvKiBTdXBwb3J0IGZvciBsZWdhY3kgQVBJICovXG4gICAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVx0PyB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpO1xuICB9O1xuICAvKmVzbGludC1lbmFibGUgKi9cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3Iob3duZXIpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgdGhpcy5ncmFwaCA9IG93bmVyLmdyYXBoO1xuICAgIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucygpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHtcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmdldEFuaW1hdGlvblRpbWUoKSxcbiAgICAgIHN0cm9rZTogJyNFNzRDM0MnXG4gICAgfSwgdGhpcy5kZWZhdWx0U3R5bGVPcHRpb25zKTtcbiAgfVxuXG4gIGdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0QW5pbWF0aW9uVGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lci5vcHRpb25zLmFuaW1hdGlvblRpbWU7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzIHJldHVybmVkIGJ5IHRoZSBHcmFwaCBjbGFzcyB0aGlzIG1ldGhvZHMgcmV0dXJuc1xuICAgKiB0aGUgZDMgc2VsZWN0aW9uIHRoYXQgZm9yIGFsbCB0aG9zZSBvYmplY3RzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W118T2JqZWN0fSBlbHMgQW4gYXJyYXkgb2YgZWRnZXMvbm9kZXMgb3IgYSBzaW5nbGUgZWRnZS9ub2RlXG4gICAqIEByZXR1cm4ge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIHNlbGVjdChlbHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkge1xuICAgICAgZWxzID0gW2Vsc107XG4gICAgfVxuICAgIGlmICghZWxzLmxlbmd0aCkge1xuICAgICAgZWxzLnB1c2goeyBpZDogLTEgfSk7XG4gICAgfVxuICAgIGVscyA9IGVscy5maWx0ZXIoQm9vbGVhbik7XG4gICAgcmV0dXJuIHRoaXMub3duZXIucm9vdC5zZWxlY3RBbGwoXG4gICAgICBlbHMubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiAnIycgKyB1dGlscy5ucyhlLmlkKTtcbiAgICAgIH0pLmpvaW4oJywgJylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIHBhdGggaW5zaWRlIHRoZSB0YWcgPGc+IHRoYXQgcmVwcmVzZW50cyBhbiBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICovXG4gIGlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGguYmFzZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIGNpcmNsZSBpbnNpZGUgdGhlIHRhZyA8Zz4gdGhhdCByZXByZXNlbnRzIGEgbm9kZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqL1xuICBpbm5lck5vZGVTZWxlY3RvcihzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGQzID0gd2luZG93LmQzO1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCc7XG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCc7XG5cbnZhciBISUdITElHSFQgPSAnaGlnaGxpZ2h0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGV4dGVuZHMgR3JhcGgge1xuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXRFZGdlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZWRnZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgbm9kZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXROb2RlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGgubm9kZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIGEgbm9kZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBpbmNyZWFzZSB0aGUgcmFkaXVzIHRvIDEuNXggdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKiAtIGRlY3JlYXNlIHRoZSByYWRpdXMgdG8gdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IG9wdGlvbnMuciB8fCAoZC5yICogMS41KSlcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBkLnIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYW4gZWRnZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBjaGFuZ2UgdGhlIHN0cm9rZSBvZiB0aGUgYHBhdGhgIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZSB0b1xuICAgKiBgb3B0aW9ucy5zdHJva2VgXG4gICAqIC0gY2hhbmdlIHRoZSBzdHJva2UgdG8gdGhlIG9yaWdpbmFsIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICBkb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoc2VsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdzdHJva2UnLCAoZCkgPT4gZC5zdHJva2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVkZ2UgdHJhdmVyc2FsIGFuaW1hdGlvbiwgaXQgYW5pbWF0ZXMgYSBoaWRkZW4gcGF0aCBnaXZpbmcgdGhlIGltcHJlc3Npb25cbiAgICogb2YgbW92ZW1lbnQsIGlmIHNvdXJjZSBpcyBnaXZlbiB0aGVuIGl0IHdpbGwgYWx3YXlzIHN0YXJ0IHRoZSBhbmltYXRpb25cbiAgICogZnJvbSB0aGUgbm9kZSBgc291cmNlYCBldmVuIGlmIHRoZSBlZGdlIGlzIGFuIGluY29taW5nIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge2NvbmZpZ30gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW3NvdXJjZT0tMV1cbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICB0cmF2ZXJzZUVkZ2VXaXRoRGlyZWN0aW9uKHNlbGVjdGlvbiwgb3B0aW9ucywgc291cmNlID0gLTEpIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdwYXRoLnRyYXZlcnNhbCcpXG4gICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICAgIGVsXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7bH0gJHtsfWApXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgbClcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpO1xuICAgICAgfSlcbiAgICAgIC50cmFuc2l0aW9uKCdkYXNoYXJyYXknKVxuICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpO1xuICAgICAgICB2YXIgdHdpY2VMZW5ndGggPSBsZW5ndGggKiAyO1xuICAgICAgICB2YXIgbGVuZ3RoVG9Nb3ZlID0gMDtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoZC50YXJnZXQuaWQgPT09IHNvdXJjZSkge1xuICAgICAgICAgICAgbGVuZ3RoVG9Nb3ZlID0gdHdpY2VMZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgIGxlbmd0aFRvTW92ZSA9IHR3aWNlTGVuZ3RoIC0gbGVuZ3RoVG9Nb3ZlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlbmd0aFRvTW92ZTtcbiAgICAgIH0pXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApXG4gICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGVsLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIG51bGwpXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAwKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdHJhdmVyc2VFZGdlcyhzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSkge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAga2VlcFN0cm9rZTogdHJ1ZSxcbiAgICAgIHJldmVyc2U6IGZhbHNlXG4gICAgfSwgdGhpcy5nZXRTdHlsZU9wdGlvbnMoKSwgb3B0aW9ucyk7XG5cbiAgICBzZWxlY3Rpb24uY2FsbCh0aGlzLnRyYXZlcnNlRWRnZVdpdGhEaXJlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSk7XG4gICAgaWYgKG9wdGlvbnMua2VlcFN0cm9rZSkge1xuICAgICAgdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgICAgIC50cmFuc2l0aW9uKCd1cGRhdGUnKVxuICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKTtcbiAgfVxuXG4gIGdldE5vZGUobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXROb2RlKG5vZGUpKVxuICAgICk7XG4gIH1cblxuICBnZXRFZGdlKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0RWRnZShlZGdlKSlcbiAgICApO1xuICB9XG5cbiAgLy8gdGVtcG9yYWwgaGlnaGxpZ2h0XG5cbiAgaGlnaGxpZ2h0Tm9kZShub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE5vZGUobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgaGlnaGxpZ2h0RWRnZShlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRFZGdlKGVkZ2UpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIGhpZ2hsaWdodEluY2lkZW50RWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBoaWdobGlnaHRPdXRnb2luZ0VkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE91dGdvaW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgaGlnaGxpZ2h0SW5jb21pbmdFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRyYXZlcnNhbCBvZiBhbiBlZGdlIGdpdmVuIGEgbm9kZVxuXG4gIHRyYXZlcnNlT3V0Z29pbmdFZGdlcyhub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICB0cmF2ZXJzZUluY29taW5nRWRnZXMobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY29taW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApO1xuICB9XG5cbiAgdHJhdmVyc2VJbmNpZGVudEVkZ2VzKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNpZGVudEVkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHRyYXZlcnNhbCBvZiBhbiBlZGdlIGJldHdlZW4gdHdvIG5vZGVzXG5cbiAgdHJhdmVyc2VFZGdlc0JldHdlZW4oZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdChcbiAgICAgICAgdGhpcy5ncmFwaC5nZXRFZGdlc0JldHdlZW4oZWRnZSlcbiAgICAgICksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGVkZ2Uuc291cmNlXG4gICAgKTtcbiAgfVxuXG4gIHRyYXZlcnNlQWxsRWRnZXNCZXR3ZWVuKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QoXG4gICAgICAgIHRoaXMuZ3JhcGguZ2V0QWxsRWRnZXNCZXR3ZWVuKGVkZ2UpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucyksXG4gICAgICBlZGdlLnNvdXJjZVxuICAgICk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGxjZyBmcm9tICdjb21wdXRlLWxjZyc7XG5cbnZhciByYW5kID0gbGNnKDEpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG4gPSByYW5kKCk7XG4gICAgdmFyIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcihuICogMjYpICsgOTcpO1xuICAgIHJldHVybiBsZXR0ZXIgKyBuLnRvU3RyaW5nKDE2KS5zdWJzdHIoMik7XG4gIH0sXG5cbiAgdHJhbnNmb3JtOiBmdW5jdGlvbiAobykge1xuICAgIHZhciBzdHIgPSBgYDtcbiAgICBpZiAoJ3RyYW5zbGF0ZScgaW4gbykge1xuICAgICAgc3RyICs9IGAgdHJhbnNsYXRlKCR7by50cmFuc2xhdGUueH0sICR7by50cmFuc2xhdGUueX0pYDtcbiAgICB9XG4gICAgaWYgKCdyb3RhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHJvdGF0ZSgke28ucm90YXRlfSlgO1xuICAgIH1cbiAgICBpZiAoJ3NjYWxlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCBzY2FsZSgke28uc2NhbGV9KWA7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH0sXG5cbiAgdHJhbnNpdGlvbjogZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC50cmFuc2l0aW9uKCdsYXlvdXQnKVxuICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgIC5lYXNlKCdsaW5lYXInKTtcbiAgfSxcblxuICBjb25kaXRpb25hbFRyYW5zaXRpb246IGZ1bmN0aW9uIChlbCwgY29uZGl0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbihlbCk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfSxcblxuICBuczogZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiAnZ3JldWxlci0nICsgc3RyO1xuICB9XG59O1xuIl19
