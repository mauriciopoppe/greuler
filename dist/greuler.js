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

      this.layout.start.apply(this.layout, updateOptions.iterations);
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
      updateOptions = (0, _extend2['default'])(true, {
        skipLayout: false,
        iterations: [0, 0, 0]
      }, updateOptions);

      this.initLayout(updateOptions);
      this.build(updateOptions);

      // update nodes/edges if layout.tick wasn't run
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL0RyYXcuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2NvbnN0LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvZWxlbWVudHMvZWRnZS5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9GaXhlZC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wb2x5ZmlsbHMuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbi5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUUsRUFBRSxTQUFTLEVBQUU7QUFDOUMsUUFBSSxTQUFTLEVBQUU7QUFDYixhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7S0FDM0I7QUFDRCxXQUFPLEVBQUUsQ0FBQTtHQUNWOztBQUVELElBQUUsRUFBRSxZQUFVLEdBQUcsRUFBRTtBQUNqQixXQUFPLFVBQVUsR0FBRyxHQUFHLENBQUE7R0FDeEI7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbipcbipcdENPTVBVVEU6IGxjZ1xuKlxuKlxuKlx0REVTQ1JJUFRJT046XG4qXHRcdC0gQSBsaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIChsY2cpLlxuKlxuKlxuKlx0Tk9URVM6XG4qXHRcdFsxXSBCYXNlZCBvbiBXLiBQcmVzcywgZXQgYWwuLCBOdW1lcmljYWwgUmVjaXBlcyBpbiBDICgyZCBlZC4gMTk5MilcbipcbipcbipcdFRPRE86XG4qXHRcdFsxXVxuKlxuKlxuKlx0TElDRU5TRTpcbipcdFx0TUlUXG4qXG4qXHRDb3B5cmlnaHQgKGMpIDIwMTQuIHJnaXp6LlxuKlxuKlxuKlx0QVVUSE9SOlxuKlx0XHRyZ2l6ei4gZ3p0b3duMjIxNkB5YWhvby5jb20uIDIwMTQuXG4qXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFZBUklBQkxFUyAvL1xuXG52YXIgTUFTSyA9IDEyMzQ1OTg3Nixcblx0TSA9IDIxNDc0ODM2NDcsXG5cdEEgPSAxNjgwNztcblxuXG4vLyBMQ0cgLy9cblxuLyoqXG4qIEZVTkNUSU9OOiBsY2coIFtzZWVkXSApXG4qXHRSZXR1cm5zIGEgbGluZWFyIGNvbmdydWVudGlhbCBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci4gSWYgbm90IHByb3ZpZGVkIGEgc2VlZCwgYSBzZWVkIGlzIGdlbmVyYXRlZCBiYXNlZCBvbiB0aGUgY3VycmVudCB0aW1lLlxuKlxuKiBAcGFyYW0ge051bWJlcn0gW3NlZWRdIC0gcmFuZG9tIG51bWJlciBnZW5lcmF0b3Igc2VlZFxuKiBAcmV0dXJucyB7RnVuY3Rpb259IGdlbmVyYXRvclxuKi9cbmZ1bmN0aW9uIGxjZyggdmFsICkge1xuXHR2YXIgc2VlZDtcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdGlmICggdHlwZW9mIHZhbCAhPT0gJ251bWJlcicgfHwgdmFsICE9PSB2YWwgfHwgdmFsICUgMSAhPT0gMCB8fCB2YWwgPCAxICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ2xjZygpOjppbnZhbGlkIGlucHV0IGFyZ3VtZW50LiBTZWVkIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0c2VlZCA9IHZhbDtcblx0fSBlbHNlIHtcblx0XHRzZWVkID0gRGF0ZS5ub3coKSAlIDEwMDAwMDAwMDtcblx0fVxuXHQvKipcblx0KiBGVU5DVElPTjogbGNnKCBbTl0gKVxuXHQqXHRMaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuXHQqXG5cdCogQHBhcmFtIHtOdW1iZXJ9IFtOXSAtIG51bWJlciBvZiBwc2V1ZG9yYW5kb20gbnVtYmVycyB0byByZXR1cm5cblx0KiBAcmV0dXJucyB7TnVtYmVyfEFycmF5fSBwc2V1ZG9yYW5kb20gZmxvYXRpbmctcG9pbnQgbnVtYmVyKHMpIGJldHdlZW4gMCBhbmQgMVxuXHQqL1xuXHRyZXR1cm4gZnVuY3Rpb24gbGNnKCBOICkge1xuXHRcdHZhciBhcnIsXG5cdFx0XHRyYW5kO1xuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRzZWVkID0gKCBBICogc2VlZCApICUgTTtcblx0XHRcdHJhbmQgPSBzZWVkIC8gTTtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHJldHVybiByYW5kO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiBOICE9PSAnbnVtYmVyJyB8fCBOICE9PSBOIHx8IE4lMSAhPT0gMCB8fCBOIDwgMSApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoICdsY2coKTo6aW52YWxpZCBpbnB1dCBhcmd1bWVudC4gQXJyYXkgbGVuZ3RoIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLicgKTtcblx0XHR9XG5cdFx0YXJyID0gbmV3IEFycmF5KCBOICk7XG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgTjsgaSsrICkge1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0c2VlZCA9ICggQSAqIHNlZWQgKSAlIE07XG5cdFx0XHRhcnJbIGkgXSA9IHNlZWQgLyBNO1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJyO1xuXHR9O1xufSAvLyBlbmQgRlVOQ1RJT04gbGNnKClcblxuXG4vLyBFWFBPUlRTIC8vXG5cbm1vZHVsZS5leHBvcnRzID0gbGNnO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgaXNBcnJheSA9IGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG5cdGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG5cdH1cblxuXHRyZXR1cm4gdG9TdHIuY2FsbChhcnIpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuXHRpZiAoIW9iaiB8fCB0b1N0ci5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dmFyIGhhc093bkNvbnN0cnVjdG9yID0gaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKTtcblx0dmFyIGhhc0lzUHJvdG90eXBlT2YgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAmJiBoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpO1xuXHQvLyBOb3Qgb3duIGNvbnN0cnVjdG9yIHByb3BlcnR5IG11c3QgYmUgT2JqZWN0XG5cdGlmIChvYmouY29uc3RydWN0b3IgJiYgIWhhc093bkNvbnN0cnVjdG9yICYmICFoYXNJc1Byb3RvdHlwZU9mKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gT3duIHByb3BlcnRpZXMgYXJlIGVudW1lcmF0ZWQgZmlyc3RseSwgc28gdG8gc3BlZWQgdXAsXG5cdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBvYmopIHsvKiovfVxuXG5cdHJldHVybiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJyB8fCBoYXNPd24uY2FsbChvYmosIGtleSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1swXSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbicpIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH0gZWxzZSBpZiAoKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpIHx8IHRhcmdldCA9PSBudWxsKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHRmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0W25hbWVdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICh0YXJnZXQgIT09IGNvcHkpIHtcblx0XHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0XHRpZiAoZGVlcCAmJiBjb3B5ICYmIChpc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGlzQXJyYXkoY29weSkpKSkge1xuXHRcdFx0XHRcdFx0aWYgKGNvcHlJc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge307XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gZXh0ZW5kKGRlZXAsIGNsb25lLCBjb3B5KTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjb3B5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0W25hbWVdID0gY29weTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xudmFyIGNvbGEgPSB3aW5kb3cuY29sYVxuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcbmltcG9ydCBub2RlIGZyb20gJy4vZWxlbWVudHMvbm9kZSdcbmltcG9ydCBlZGdlIGZyb20gJy4vZWxlbWVudHMvZWRnZSdcbmltcG9ydCBHcmFwaE1hbmFnZXIgZnJvbSAnLi9HcmFwaCdcbmltcG9ydCBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24gZnJvbSAnLi9zZWxlY3Rvci9HcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXcge1xuICBjb25zdHJ1Y3RvciAoaWQsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB0aGlzLmV2ZW50cyA9IGQzLmRpc3BhdGNoKCdsYXlvdXQnLCAnZmlyc3RMYXlvdXRFbmQnKVxuXG4gICAgdGhpcy5tYXJrZXJJZCA9ICdtYXJrZXItJyArIGlkXG5cbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zKG9wdGlvbnMpXG5cbiAgICAvLyBncmFwaCBoYW5kbGVzIHRoZSBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgZHJhd2VyXG4gICAgdGhpcy5jcmVhdGVHcmFwaCgpXG5cbiAgICAvLyBzZWxlY3RvciBhbmltYXRlcyB0aGUgbm9kZXMvZWRnZXNcbiAgICB0aGlzLnNlbGVjdG9yID0gbmV3IEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbih0aGlzKVxuXG4gICAgLy8gc3ViLWVsZW1lbnRzIHRoYXQgZHJhdyBzdHVmZlxuICAgIHRoaXMubm9kZURyYXdlciA9IG5vZGUoKS5vd25lcih0aGlzKVxuICAgIHRoaXMuZWRnZURyYXdlciA9IGVkZ2UoKS5vd25lcih0aGlzKVxuXG4gICAgLy8gY29sYVxuICAgIHRoaXMubGF5b3V0ID0gY29sYS5kM2FkYXB0b3IoKVxuXG4gICAgdGhpcy5sYXlvdXQub24oJ3RpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnRpY2soKVxuICAgIH0pXG5cbiAgICB2YXIgZmlyc3RFbmQgPSB0cnVlXG4gICAgdGhpcy5sYXlvdXQub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChmaXJzdEVuZCkge1xuICAgICAgICBzZWxmLmV2ZW50cy5maXJzdExheW91dEVuZCgpXG4gICAgICAgIGZpcnN0RW5kID0gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlR3JhcGggKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5vcHRpb25zLmRhdGFcbiAgICB2YXIgbm9kZXMgPSBkYXRhLm5vZGVzXG4gICAgdmFyIGxpbmtzID0gZGF0YS5saW5rc1xuXG4gICAgLy8gZW1wdHkgYW5kIHJlLWFkZFxuICAgIGRhdGEubm9kZXMgPSBbXVxuICAgIGRhdGEubGlua3MgPSBbXVxuXG4gICAgdGhpcy5ncmFwaCA9IG5ldyBHcmFwaE1hbmFnZXIodGhpcywgZGF0YSlcbiAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB0aGlzLmdyYXBoLmFkZE5vZGUobm9kZSlcbiAgICB9LCB0aGlzKVxuICAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIHRoaXMuZ3JhcGguYWRkRWRnZShlZGdlKVxuICAgIH0sIHRoaXMpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICpcbiAgICogb3B0aW9uc1xuICAgKiAgIC0gdGFyZ2V0IHtzdHJpbmd9IHNlbGVjdG9yIHRvIHRoZSBlbGVtZW50IHRvIGhvbGQgdGhlIGdyYXBoXG4gICAqICAgLSB3aWR0aCB7bnVtYmVyfVxuICAgKiAgIC0gaGVpZ2h0IHtudW1iZXJ9XG4gICAqICAgLSBsYWJlbHM9dHJ1ZSB7Ym9vbGVhbn0gRmFsc2UgdG8gaGlkZSB0aGUgdmVydGV4IGxhYmVsc1xuICAgKiAgIC0gZGlyZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gZ2l2ZSBhbiBvcmllbnRhdGlvbiB0byB0aGUgZWRnZXNcbiAgICogICBoYXZlIGFuIGVkZ2VcbiAgICogICAtIGRhdGEge09iamVjdH1cbiAgICogICAgIC0gbGlua0Rpc3RhbmNlPTkwIHtudW1iZXJ9IEZvcmNlZCBtaW4gZGlzdGFuY2UgYmV0d2VlbiB2ZXJ0aWNlcyB0aGF0XG4gICAqICAgICAtIGNvbnN0cmFpbnRzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgIC0gZ3JvdXBzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgIC0gbm9kZXMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgICAtIHI9MTAge251bWJlcn0gbm9kZSByYWRpdXNcbiAgICogICAgIC0gbGlua3Mge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgICAtIGRpcmVjdGVkPWZhbHNlIHtib29sZWFufSB0cnVlIHRvIGdpdmUgYW4gb3JpZW50YXRpb24gdG8gdGhpcyBlZGdlXG4gICAqICAgICAgIC0gd2VpZ2h0PVwiXCIge3N0cmluZ30gTGFiZWwgb2YgdGhlIGVkZ2UgKGNhbiBiZSB0aGUgd2VpZ2h0KVxuICAgKlxuICAgKi9cbiAgZGVmYXVsdE9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgICAvLyBncmFwaCBkZWZhdWx0c1xuICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgd2lkdGg6IDcwMCxcbiAgICAgIGhlaWdodDogMzAwLFxuICAgICAgYW5pbWF0aW9uVGltZTogMTAwMCxcbiAgICAgIGxhYmVsczogdHJ1ZSxcbiAgICAgIGRpcmVjdGVkOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpXG5cbiAgICB0aGlzLm9wdGlvbnMuZGF0YSA9IGV4dGVuZCh7XG4gICAgICBub2RlczogW10sXG4gICAgICBsaW5rczogW10sXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgY29uc3RyYWludHM6IFtdLFxuICAgICAgYXZvaWRPdmVybGFwczogdHJ1ZSxcbiAgICAgIHNpemU6IFtvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodF0sXG4gICAgICBsaW5rRGlzdGFuY2U6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmxpbmtEaXN0YW5jZSB8fCA4MFxuICAgICAgfVxuICAgIH0sIHRoaXMub3B0aW9ucy5kYXRhKVxuICB9XG5cbiAgaW5pdExheW91dCAodXBkYXRlT3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpc1xuXG4gICAgaWYgKHVwZGF0ZU9wdGlvbnMuc2tpcExheW91dCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoc2VsZi5vcHRpb25zLmRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgIHZhciB2ID0gc2VsZi5vcHRpb25zLmRhdGFba11cbiAgICAgIHNlbGYubGF5b3V0W2tdKHYpXG4gICAgfSwgdGhpcylcblxuICAgIHRoaXMubGF5b3V0LnN0YXJ0LmFwcGx5KHRoaXMubGF5b3V0LCB1cGRhdGVPcHRpb25zLml0ZXJhdGlvbnMpXG4gIH1cblxuICB0aWNrICgpIHtcbiAgICB0aGlzLmVkZ2VHcm91cC5jYWxsKHRoaXMuZWRnZURyYXdlcilcbiAgICB0aGlzLm5vZGVHcm91cC5jYWxsKHRoaXMubm9kZURyYXdlcilcbiAgfVxuXG4gIHVwZGF0ZSAodXBkYXRlT3B0aW9ucykge1xuICAgIHVwZGF0ZU9wdGlvbnMgPSBleHRlbmQodHJ1ZSwge1xuICAgICAgc2tpcExheW91dDogZmFsc2UsXG4gICAgICBpdGVyYXRpb25zOiBbMCwgMCwgMF1cbiAgICB9LCB1cGRhdGVPcHRpb25zKVxuXG4gICAgdGhpcy5pbml0TGF5b3V0KHVwZGF0ZU9wdGlvbnMpXG4gICAgdGhpcy5idWlsZCh1cGRhdGVPcHRpb25zKVxuXG4gICAgLy8gdXBkYXRlIG5vZGVzL2VkZ2VzIGlmIGxheW91dC50aWNrIHdhc24ndCBydW5cbiAgICBpZiAodXBkYXRlT3B0aW9ucy5za2lwTGF5b3V0KSB7XG4gICAgICB0aGlzLnRpY2soKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBidWlsZCAoKSB7XG4gICAgdGhpcy5yb290ID0gZDMuc2VsZWN0KHRoaXMub3B0aW9ucy50YXJnZXQpXG4gICAgICAuc2VsZWN0QWxsKCdzdmcuZ3JldWxlcicpXG4gICAgICAuZGF0YShbdGhpcy5vcHRpb25zXSlcblxuICAgIC8vIGVudGVyXG4gICAgdGhpcy5yb290LmVudGVyID0gdGhpcy5yb290LmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZ3JldWxlcicpXG5cbiAgICAvLyBtYXJrZXIgZGVmXG4gICAgdGhpcy5yb290LmVudGVyXG4gICAgICAuYXBwZW5kKCdzdmc6ZGVmcycpXG4gICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcbiAgICAgIC5hdHRyKCdpZCcsIHRoaXMubWFya2VySWQpXG4gICAgICAuYXR0cigndmlld0JveCcsICcwIC01IDEwIDEwJylcbiAgICAgIC5hdHRyKCdyZWZYJywgOSlcbiAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDUpXG4gICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgNSlcbiAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXG4gICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAuYXR0cignZCcsICdNMCwtNEwxMCwwTDAsNEwyLDAnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsICcwcHgnKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAuYXR0cignZmlsbCcsICcjNzc3JylcblxuICAgIC8vIHVwZGF0ZVxuICAgIHRoaXMucm9vdFxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5vcHRpb25zLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpXG5cbiAgICAvLyB3cmFwcGVyIGZvciB0aGUgZWRnZXNcbiAgICB0aGlzLmVkZ2VHcm91cCA9IHRoaXMucm9vdFxuICAgICAgLnNlbGVjdEFsbCgnZy5lZGdlcycpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2QuZGF0YV0gfSlcbiAgICB0aGlzLmVkZ2VHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlcycpXG5cbiAgICAvLyB3cmFwcGVyIGZvciB0aGUgbm9kZXNcbiAgICB0aGlzLm5vZGVHcm91cCA9IHRoaXMucm9vdFxuICAgICAgLnNlbGVjdEFsbCgnZy5ub2RlcycpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2QuZGF0YV0gfSlcbiAgICB0aGlzLm5vZGVHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlcycpXG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlscydcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29uc3QnXG5cbmNvbnN0IE5PREVfREVGQVVMVF9PUFRJT05TID0ge1xuICByOiAxMCxcbiAgZmlsbDogJyMyOTgwQjknXG59XG5cbmNvbnN0IEVER0VfREVGQVVMVF9PUFRJT05TID0ge1xuICBzdHJva2U6IGNvbG9ycy5MSUdIVF9HUkFZXG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzIChhcnIsIGlkKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGFycltpXS5pZCA9PT0gaWQpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoIHtcbiAgY29uc3RydWN0b3IgKG93bmVyLCBkYXRhKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgdGhpcy5ub2RlcyA9IGRhdGEubm9kZXNcbiAgICB0aGlzLmVkZ2VzID0gZGF0YS5saW5rc1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBub2RlIHRvIHRoZSBncmFwaCwgZWFjaCBvZiB0aGUgYXJndW1lbnRzIG11c3RcbiAgICogYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gaWQge051bWJlcnxzdHJpbmd9XG4gICAqXG4gICAqIE9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSB4IHtudW1iZXJ9IFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhpcyBub2RlIGluIHRoZSBncmFwaCAob25seSBpZiBmaXhlZCA9IHRydWUpXG4gICAqIC0geSB7bnVtYmVyfSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgbm9kZSBpbiB0aGUgZ3JhcGggKG9ubHkgaWYgZml4ZWQgPSB0cnVlKVxuICAgKiAtIGZpeGVkIHtib29sZWFufSBgdHJ1ZWAgdG8gbWFrZSB0aGlzIG5vZGUgbm90IHRvIHBhcnRpY2lwYXRlIGluIHRoZSBsYXlvdXQgcHJvY2Vzc1xuICAgKiAtIGZpbGwge3N0cmluZ30gVGhlIGZpbGwgb2YgdGhlIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgdGhlIG5vZGVcbiAgICogLSByIHtudW1iZXJ9IFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgdGhlIG5vZGVcbiAgICogLSBsYWJlbCB7c3RyaW5nfSBUaGUgdGV4dCBpbnNpZGUgdGhlIG5vZGUgKGlmIGl0J3Mgbm90IHByZXNlbnQgaXQncyBlcXVhbCB0byB0aGUgYGlkYClcbiAgICogLSB0b3BSaWdodExhYmVsIHtzdHJpbmddIHRoZSB0ZXh0IHNob3duIG9uIHRoZSB0b3AgcmlnaHQgc2lkZSBvZiB0aGUgbm9kZSwgdXNlZnVsXG4gICAqIHRvIHJlcHJlc2VudCBhZGRpdGlvbmFsIGFubm90YXRpb25zXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBhcmd1bWVudHNcbiAgICovXG4gIGFkZE5vZGUgKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzW2ldXG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcigndGhlIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGAnKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0Tm9kZShjb25maWcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdub2RlIGFscmVhZHkgaW4gc3RvcmUnKVxuICAgICAgfVxuICAgICAgdGhpcy5ub2Rlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmROb2RlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBub2RlIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuICBnZXROb2RlIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeUZuKHYgPT4gdi5pZCA9PT0gbm9kZS5pZClbMF1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgbm9kZXMgdGhhdCBzYXRpc2Z5IHRoZSBwYXJhbWV0ZXIgYGZuYCxcbiAgICogYWxpYXMgZm9yIGB0aGlzLm5vZGVzLmZpbHRlcihmbilgXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldE5vZGVzQnlGbiAoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIoZm4pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGFkamFjZW50IG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEFkamFjZW50Tm9kZXMgKG5vZGUpIHtcbiAgICB2YXIgYWRqYWNlbnROb2RlcyA9IFtdXG4gICAgdmFyIHRha2VuID0ge31cbiAgICB2YXIgbmV4dFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldXG4gICAgICBuZXh0ID0gbnVsbFxuICAgICAgaWYgKGVkZ2Uuc291cmNlLmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnRhcmdldFxuICAgICAgfSBlbHNlIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2VcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZVxuICAgICAgICBhZGphY2VudE5vZGVzLnB1c2gobmV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRqYWNlbnROb2Rlc1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBzdWNjZXNzb3Igbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0U3VjY2Vzc29yTm9kZXMgKG5vZGUpIHtcbiAgICB2YXIgc3VjY2Vzc29yID0gW11cbiAgICB2YXIgdGFrZW4gPSB7fVxuICAgIHZhciBuZXh0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV1cbiAgICAgIG5leHQgPSBudWxsXG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0XG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlXG4gICAgICAgIHN1Y2Nlc3Nvci5wdXNoKG5leHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBwcmVkZWNlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRQcmVkZWNlc3Nvck5vZGVzIChub2RlKSB7XG4gICAgdmFyIHByZWRlY2Vzc29yID0gW11cbiAgICB2YXIgdGFrZW4gPSB7fVxuICAgIHZhciBuZXh0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV1cbiAgICAgIG5leHQgPSBudWxsXG4gICAgICBpZiAoZWRnZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2Uuc291cmNlXG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlXG4gICAgICAgIHByZWRlY2Vzc29yLnB1c2gobmV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKi9cbiAgcmVtb3ZlTm9kZSAobm9kZSkge1xuICAgIHRoaXMucmVtb3ZlTm9kZXNCeUZuKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdi5pZCA9PT0gbm9kZS5pZFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIG5vZGVzIHN0b3JlZCBpbiBgbm9kZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gbm9kZXNcbiAgICovXG4gIHJlbW92ZU5vZGVzIChub2Rlcykge1xuICAgIC8vIFRPRE86IGltcHJvdmUgbl4yIHJlbW92YWxcbiAgICB0aGlzLnJlbW92ZU5vZGVzQnlGbihmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzKG5vZGVzLCB2LmlkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIG5vZGVzIHRoYXQgc2F0aXNmeSB0aGUgcHJlZGljYXRlXG4gICAqIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG4gIHJlbW92ZU5vZGVzQnlGbiAoZm4pIHtcbiAgICB2YXIgaVxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZm4odGhpcy5ub2Rlc1tpXSwgaSkpIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5vZGVzXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2Rlcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgLy8gcmVtb3ZlIGluY2lkZW50IGVkZ2VzXG4gICAgICAgIHRoaXMucmVtb3ZlRWRnZXMoXG4gICAgICAgICAgdGhpcy5nZXRJbmNpZGVudEVkZ2VzKG5vZGVbMF0pXG4gICAgICAgIClcbiAgICAgICAgaSAtPSAxXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZWRnZSB0byB0aGUgZ3JhcGgsIGVhY2ggb2YgdGhlIGFyZ3VtZW50cyBtdXN0XG4gICAqIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllc1xuICAgKlxuICAgKiBSZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gc291cmNlIHtudW1iZXJ8T2JqZWN0fSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlIG9yIHRoZSBzb3VyY2Ugbm9kZSBpdHNlbGZcbiAgICogLSB0YXJnZXQge251bWJlcnxPYmplY3R9IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGUgb3IgdGhlIHRhcmdldCBub2RlIGl0c2VsZlxuICAgKlxuICAgKiBPcHRpb25hbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gaWQge3N0cmluZ3xPYmplY3R9IElmIGFuIGlkIGlzIG5vdCBwcm92aWRlZCBhbiBhdXRvIGdlbmVyYXRlZCBzdHJpbmcgd2lsbCBiZSBhc3NpZ25lZFxuICAgKiB0byB0aGlzIGVkZ2VcbiAgICogLSBzdHJva2Uge3N0cmluZ30gVGhlIHN0cm9rZSBvZiB0aGUgcGF0aCB0aGF0IHJlcHJlc2VudHMgdGhlIGVkZ2VcbiAgICogLSB3ZWlnaHQge3N0cmluZ30gVGhlIHdlaWdodCBvZiB0aGUgZWRnZVxuICAgKiAtIGRpcmVjdGVkIHtib29sZWFufSBJZiBzZXQgdG8gdHJ1ZSBhbiBhZGRpdGlvbmFsIGFycm93IGlzIGFkZGVkIGF0IHRoZSBlbmQgb2YgdGhlIGVkZ2VcbiAgICpcbiAgICogTk9URTogdGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgKi9cbiAgYWRkRWRnZSAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHNbaV1cblxuICAgICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoJ3NvdXJjZScpIHx8ICFjb25maWcuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0aGUgZWRnZSBtdXN0IGhhdmUgdGhlIHByb3BlcnRpZXMgYHNvdXJjZWAgYW5kIGB0YXJnZXRgJylcbiAgICAgIH1cbiAgICAgIHZhciBzb3VyY2UgPSBjb25maWcuc291cmNlXG4gICAgICB2YXIgdGFyZ2V0ID0gY29uZmlnLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgc291cmNlID0gdGhpcy5nZXROb2RlKHsgaWQ6IGNvbmZpZy5zb3VyY2UgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0Tm9kZSh7IGlkOiBjb25maWcudGFyZ2V0IH0pXG4gICAgICB9XG5cbiAgICAgIGlmICghc291cmNlIHx8ICF0YXJnZXQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25ldyBlZGdlIGRvZXMgbm90IGpvaW4gZXhpc3RpbmcgdmVydGljZXMnKVxuICAgICAgfVxuICAgICAgY29uZmlnLnNvdXJjZSA9IHNvdXJjZVxuICAgICAgY29uZmlnLnRhcmdldCA9IHRhcmdldFxuICAgICAgdGhpcy5lZGdlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmRFZGdlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gZWRnZSBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlZGdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZWRnZS5pZCBUaGUgaWQgb2YgdGhlIGVkZ2VcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldEVkZ2UgKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZSA9PiBlLmlkID09PSBlZGdlLmlkKVswXVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBkaXJlY3RlZCBlZGdlcyBmcm9tIHRoZSBub2RlIHdob3NlIGlkIGlzXG4gICAqIGBvcHRpb25zLnNvdXJjZWAgYW5kIHRvIHRoZSBub2RlIHdob3NlIGlkIGlzIGBvcHRpb25zLnRhcmdldGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnNvdXJjZSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy50YXJnZXQgVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRFZGdlc0JldHdlZW4gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy5zb3VyY2UgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMudGFyZ2V0XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgZnJvbSBgb3B0aW9ucy5zb3VyY2VgIHRvIGBvcHRpb25zLnRhcmdldGBcbiAgICogb3IgYG9wdGlvbnMudGFyZ2V0YCB0byBgb3B0aW9ucy5zb3VyY2VgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy5zb3VyY2UgVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMudGFyZ2V0IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWxsRWRnZXNCZXR3ZWVuIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gKGUuc291cmNlLmlkID09PSBvcHRpb25zLnNvdXJjZSAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy50YXJnZXQpIHx8XG4gICAgICAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMudGFyZ2V0ICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnNvdXJjZSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZWRnZSBpZGVudGlmaWVkIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlZGdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZWRnZS5pZCBUaGUgaWQgb2YgdGhlIGVkZ2VcbiAgICovXG4gIHJlbW92ZUVkZ2UgKGVkZ2UpIHtcbiAgICB0aGlzLnJlbW92ZUVkZ2VzQnlGbihlID0+IGUuaWQgPT09IGVkZ2UuaWQpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHN0b3JlZCBpbiBgZWRnZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gZWRnZXNcbiAgICovXG4gIHJlbW92ZUVkZ2VzIChlZGdlcykge1xuICAgIC8vIFRPRE86IGltcHJvdmUgbl4yIHJlbW92YWxcbiAgICB0aGlzLnJlbW92ZUVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzKGVkZ2VzLCBlLmlkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlRWRnZXNCeUZuIChmbikge1xuICAgIHZhciBpXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLmVkZ2VzW2ldLCBpKSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNwbGljZShpLCAxKVxuICAgICAgICBpIC09IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGUgYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRFZGdlc0J5Rm4gKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZXMuZmlsdGVyKGZuKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBvdXRnb2luZyBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0T3V0Z29pbmdFZGdlcyAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbigoZSkgPT4gZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGluY29taW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRJbmNvbWluZ0VkZ2VzIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKChlKSA9PiBlLnRhcmdldC5pZCA9PT0gbm9kZS5pZClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jaWRlbnQgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY2lkZW50RWRnZXMgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpXG4gICAgICAuY29uY2F0KHRoaXMuZ2V0SW5jb21pbmdFZGdlcyhub2RlKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGYWNhZGUgdG8gYWRkIG5vZGVzL2VkZ2VzXG4gICAqXG4gICAqIE5PVEU6IHRoZSBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIHBhcmFtZXRlcnNcbiAgICovXG4gIGFkZCAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbCA9IGFyZ3VtZW50c1tpXVxuICAgICAgLy8gYXNzdW1lIHRoYXQgZWRnZXMgaGF2ZSBhIHNvdXJjZS90YXJnZXQgcGFyYW1ldGVyXG4gICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoJ3NvdXJjZScpICYmIGVsLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xuICAgICAgICB0aGlzLmFkZEVkZ2UoZWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZE5vZGUoZWwpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5vZGVEZWZhdWx0cyAodikge1xuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgdi5pZCA9IHV0aWwuaWQoKVxuICAgIH1cblxuICAgIHYgPSBleHRlbmQoXG4gICAgICB7fSxcbiAgICAgIC8vIHByZWRlZmluZWQgZGVmYXVsdHNcbiAgICAgIE5PREVfREVGQVVMVF9PUFRJT05TLFxuICAgICAgLy8gaW5zdGFuY2UgZGVmYXVsdHNcbiAgICAgIHRoaXMub3B0aW9ucy5ub2RlRGVmYXVsdHMsXG4gICAgICAvLyBub2RlXG4gICAgICB2XG4gICAgKVxuXG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCd3aWR0aCcpKSB7XG4gICAgICB2LndpZHRoID0gMiAqIHYuclxuICAgIH1cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ2hlaWdodCcpKSB7XG4gICAgICB2LmhlaWdodCA9IDIgKiB2LnJcbiAgICB9XG4gICAgcmV0dXJuIHZcbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmRFZGdlRGVmYXVsdHMgKGUpIHtcbiAgICBpZiAoIWUuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIGUuaWQgPSB1dGlsLmlkKClcbiAgICB9XG4gICAgZSA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgRURHRV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLmVkZ2VEZWZhdWx0cyxcbiAgICAgIC8vIGVkZ2VcbiAgICAgIGVcbiAgICApXG4gICAgcmV0dXJuIGVcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcmFuZG9tIGdyYXBoIHdpdGggdGhlIGZvbGxvd2luZyBkZWZhdWx0cyBvcHRpb25zIG92ZXJyaWRkZW4gYnkgYG9wdGlvbnNgOlxuICAgKlxuICAgKiAtIG9wdGlvbnMub3JkZXI9MTAge251bWJlcn0gVGhlIG51bWJlciBvZiBub2RlcyBpbiB0aGUgZ3JhcGhcbiAgICogLSBvcHRpb25zLnNpemU9MTUge251bWJlcn0gVGhlIG51bWJlciBvZiBlZGdlcyBpbiB0aGUgZ3JhcGhcbiAgICogLSBvcHRpb25zLmNvbm5lY3RlZD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBtYWtlIHRoZSBncmFwaCBjb25uZWN0ZWQsXG4gICAqIGl0J3MgZ3VhcmFudGVlZCB0byBoYXZlIGF0IGxlYXN0IGBvcHRpb25zLm9yZGVyIC0gMWAgZWRnZXNcbiAgICogLSBvcHRpb25zLm11bHRpR3JhcGg9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIHBhcmFsbGVsIGVkZ2VzXG4gICAqIC0gb3B0aW9ucy5wc2V1ZG9HcmFwaD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgbG9vcCBlZGdlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7e25vZGVzOiBBcnJheSwgbGlua3M6IEFycmF5fX1cbiAgICovXG4gIHN0YXRpYyByYW5kb20gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIG9yZGVyOiAxMCxcbiAgICAgIHNpemU6IDE1LFxuICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgIG11bHRpR3JhcGg6IGZhbHNlLFxuICAgICAgcHNldWRvR3JhcGg6IGZhbHNlXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHZhciBpLCB1LCB2XG4gICAgdmFyIG5vZGVzID0gW11cbiAgICB2YXIgYWRqYWNlbmN5TGlzdCA9IFtdXG4gICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMub3JkZXI7IGkgKz0gMSkge1xuICAgICAgYWRqYWNlbmN5TGlzdFtpXSA9IFtdXG4gICAgICBub2Rlcy5wdXNoKHsgaWQ6IGkgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQgKHUsIHYpIHtcbiAgICAgIGFkamFjZW5jeUxpc3RbdV1bdl0gPSBhZGphY2VuY3lMaXN0W3ZdW3VdID0gdHJ1ZVxuICAgIH1cblxuICAgIHZhciBlZGdlcyA9IFtdXG4gICAgaSA9IDBcblxuICAgIGlmIChvcHRpb25zLmNvbm5lY3RlZCkge1xuICAgICAgZm9yIChpID0gMTsgaSA8IG9wdGlvbnMub3JkZXI7IGkgKz0gMSkge1xuICAgICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSlcbiAgICAgICAgYWRkKGksIHYpXG4gICAgICAgIGVkZ2VzLnB1c2goe1xuICAgICAgICAgIHNvdXJjZTogaSxcbiAgICAgICAgICB0YXJnZXQ6IHZcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGkgLT0gMVxuICAgIH1cblxuICAgIGZvciAoOyBpIDwgb3B0aW9ucy5zaXplOyBpICs9IDEpIHtcbiAgICAgIHUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm9yZGVyKVxuICAgICAgdiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMub3JkZXIpXG5cbiAgICAgIGlmICh1ID09PSB2ICYmICFvcHRpb25zLnBzZXVkb0dyYXBoKSB7XG4gICAgICAgIGkgLT0gMVxuICAgICAgfSBlbHNlIGlmIChhZGphY2VuY3lMaXN0W3VdW3ZdICYmICFvcHRpb25zLm11bHRpR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGQodSwgdilcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiB1LFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBub2Rlczogbm9kZXMsXG4gICAgICBsaW5rczogZWRnZXNcbiAgICB9XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gIH1cblxuICAvLyB1bmFyeVxuXG4gIHN0YXRpYyBuZWcgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcigtYS54LCAtYS55KVxuICB9XG5cbiAgc3RhdGljIGxlbiAoYSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoVmVjdG9yLmxlblNxKGEpKVxuICB9XG5cbiAgc3RhdGljIGxlblNxIChhKSB7XG4gICAgcmV0dXJuIGEueCAqIGEueCArIGEueSAqIGEueVxuICB9XG5cbiAgc3RhdGljIHVuaXQgKGEpIHtcbiAgICBpZiAoYS54ID09PSAwICYmIGEueSA9PT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBsZW5ndGggb2YgdGhlIHZlY3RvciBpcyAwJylcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuKGEpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54IC8gbGVuZ3RoLCBhLnkgLyBsZW5ndGgpXG4gIH1cblxuICBzdGF0aWMgb3J0aG9nb25hbCAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLnksIGEueClcbiAgfVxuXG4gIHN0YXRpYyBhbmdsZURlZyAoYSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGEueSwgYS54KSAqIDE4MCAvIE1hdGguUElcbiAgfVxuXG4gIC8vIGJpbmFyeVxuXG4gIHN0YXRpYyBhZGQgKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKyBiLngsIGEueSArIGIueSlcbiAgfVxuXG4gIHN0YXRpYyBzdWIgKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggLSBiLngsIGEueSAtIGIueSlcbiAgfVxuXG4gIHN0YXRpYyBkb3QgKGEsIGIpIHtcbiAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55XG4gIH1cblxuICBzdGF0aWMgc2NhbGUgKGEsIG4pIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKiBuLCBhLnkgKiBuKVxuICB9XG5cbiAgc3RhdGljIG1pZCAoYSwgYikge1xuICAgIHJldHVybiBWZWN0b3Iuc2NhbGUoVmVjdG9yLmFkZChhLCBiKSwgMC41KVxuICB9XG5cbiAgc3RhdGljIGFuZ2xlQmV0d2VlbiAoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFjb3MoVmVjdG9yLmRvdChhLCBiKSAvIFZlY3Rvci5sZW4oYSkgLSBWZWN0b3IubGVuKGIpKVxuICB9XG5cbiAgc3RhdGljIHJvdGF0ZSAoYSwgYW5nbGUpIHtcbiAgICB2YXIgY29zQSA9IE1hdGguY29zKGFuZ2xlKVxuICAgIHZhciBzaW5BID0gTWF0aC5zaW4oYW5nbGUpXG4gICAgdmFyIG54ID0gYS54ICogY29zQSAtIGEueSAqIHNpbkFcbiAgICB2YXIgbnkgPSBhLnggKiBzaW5BICsgYS55ICogY29zQVxuICAgIHJldHVybiBuZXcgVmVjdG9yKG54LCBueSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3JcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZDMgPSB3aW5kb3cuZDNcbnZhciBjb2xvciA9IGQzLnNjYWxlLmNhdGVnb3J5MjAoKVxudmFyIGNvbG9ycyA9IHt9XG52YXIgY29sb3JMaXRlcmFscyA9IFsnQkxVRScsICdPUkFOR0UnLCAnR1JFRU4nLCAnUkVEJywgJ1BVUlBMRScsICdCUk9XTicsICdQSU5LJywgJ0dSQVknLCAnWUVMTE9XJywgJ0NZQU4nXVxuY29sb3JMaXRlcmFscy5mb3JFYWNoKGZ1bmN0aW9uIChjLCBpKSB7XG4gIGNvbG9yc1tjXSA9IGNvbG9yLnJhbmdlKClbMiAqIGldXG4gIGNvbG9yc1snTElHSFRfJyArIGNdID0gY29sb3IucmFuZ2UoKVsyICogaSArIDFdXG59KVxuXG5jb2xvcnMucmFuZG9tRnJvbVBhbGV0dGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjb2xvci5yYW5nZSgpW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKV1cbn1cblxuZXhwb3J0IHsgY29sb3JzIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZDMgPSB3aW5kb3cuZDNcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1ZlY3RvcidcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICB2YXIgb3duZXJcblxuICBmdW5jdGlvbiBtb3ZlVG93YXJkc1BvaW50IChwb2ludCwgbWlkZGxlKSB7XG4gICAgdmFyIG1hcmdpbiA9IHBvaW50LnJcbiAgICB2YXIgdW5pdCA9IFZlY3Rvci51bml0KFZlY3Rvci5zdWIobWlkZGxlLCBwb2ludCkpXG4gICAgcmV0dXJuIFZlY3Rvci5hZGQocG9pbnQsIFZlY3Rvci5zY2FsZSh1bml0LCBtYXJnaW4pKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBpbm5lciBwb2ludHMgb2YgYSBsb29wIGVkZ2VcbiAgICpcbiAgICogLSBhbmFseXplcyBlYWNoIGFkamFjZW50IHZlcnRleFxuICAgKiAgLSBmb3IgZWFjaCBlYWNoIGVkZ2UgdS12IG1vdmUgdGhlIG9wcG9zaXRlIHdheSBlLmcuIHYtPnVcbiAgICogIC0gdGhlIHN1bSBvZiB1bml0IHZlY3RvcnMgd2lsbCBnaXZlIHJvdWdobHkgYSBnb29kIGFwcHJveGltYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHUgVmVydGV4XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXJnaW5CZXR3ZWVuRWRnZXMgRGVmaW5lZCBpbiBgY3JlYXRlUGF0aGBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IFRoZSBudW1iZXIgb2YgdS11IGVkZ2VzIGZvdW5kIHlldFxuICAgKiBAcmV0dXJucyB7e3BhdGg6ICpbXSwgZGlyOiAqfX1cbiAgICovXG4gIGZ1bmN0aW9uIHNlbGZMb29wICh1LCBtYXJnaW5CZXR3ZWVuRWRnZXMsIGNvdW50KSB7XG4gICAgdmFyIGFkamFjZW50ID0gb3duZXIuZ3JhcGguZ2V0QWRqYWNlbnROb2Rlcyh1KVxuICAgIHZhciBkaXIgPSBuZXcgVmVjdG9yKDAsIDApXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIHYgPSBhZGphY2VudFtpXVxuICAgICAgaWYgKHUuaWQgIT09IHYuaWQpIHtcbiAgICAgICAgZGlyID0gVmVjdG9yLnVuaXQoVmVjdG9yLmFkZChcbiAgICAgICAgICBkaXIsXG4gICAgICAgICAgVmVjdG9yLnVuaXQoVmVjdG9yLnN1Yih1LCB2KSlcbiAgICAgICAgKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1JhZCAoYSkge1xuICAgICAgcmV0dXJuIGEgKiBNYXRoLlBJIC8gMTgwXG4gICAgfVxuXG4gICAgLy8gbm8gYWRqYWNlbnQgdmVydGljZXNcbiAgICBpZiAoZGlyLnggPT09IDAgJiYgZGlyLnkgPT09IDApIHtcbiAgICAgIGRpciA9IFZlY3Rvci51bml0KG5ldyBWZWN0b3IoMCwgLTEpKVxuICAgIH1cblxuICAgIHZhciBvcnQgPSBWZWN0b3Iub3J0aG9nb25hbChkaXIpXG5cbiAgICAvLyBtb3ZpbmcgdSB0b3dhcmRzIGBkaXJgIGB1LnJgIHVuaXRzXG4gICAgdmFyIHVCb3JkZXJPcmlnaW4gPSBWZWN0b3Iuc2NhbGUoZGlyLCB1LnIgKyA0KVxuICAgIC8vIHZhciB1Qm9yZGVyT3JpZ2luVHdpY2UgPSBWZWN0b3Iuc2NhbGUoZGlyLCB1LnIgKiAyKVxuICAgIC8vIHVEIGlzIG5vdyBpbiB0aGUgZWRnZSBvZiB0aGUgY2lyY2xlLCBtYWtpbmcgYSBsaXR0bGUgYXJjIGluIHRoZSBjaXJjbGVcblxuICAgIC8vIGVuZHBvaW50cyBvZiB0aGUgZWRnZSB3aWxsIGhhdmUgYSBzZXBhcmF0aW9uIG9mIDI1IGRlZywgNTAgZGVnLCA3NSBkZWcsIC4uLlxuICAgIHZhciBzZXBhcmF0aW9uID0gdG9SYWQoMjUpXG4gICAgdmFyIGFuZ2xlID0gc2VwYXJhdGlvbiArIChjb3VudCAtIDEpICogc2VwYXJhdGlvblxuXG4gICAgLy8gdGhlIHBvaW50IHRvIHRoZSBsZWZ0IG9mIHUgKyB1Qm9yZGVyXG4gICAgdmFyIHVCb3JkZXJMZWZ0ID0gVmVjdG9yLmFkZCh1LCBWZWN0b3Iucm90YXRlKHVCb3JkZXJPcmlnaW4sIGFuZ2xlKSlcbiAgICAvLyB0aGUgcG9pbnQgdG8gdGhlIHJpZ2h0IG9mIHUgKyB1Qm9yZGVyXG4gICAgdmFyIHVCb3JkZXJSaWdodCA9IFZlY3Rvci5hZGQodSwgVmVjdG9yLnJvdGF0ZSh1Qm9yZGVyT3JpZ2luLCAtYW5nbGUpKVxuXG4gICAgLy8gc29tZSBsZW5ndGggYXdheSBmcm9tIHRoZSBub2RlIGNvbXB1dGVkIGJ5IGRvaW5nIHJhbmRvbSBzYW1wbGVzXG4gICAgdmFyIGxlbmd0aCA9IChtYXJnaW5CZXR3ZWVuRWRnZXMgKiAwLjYpICogKGNvdW50ICsgMSlcblxuICAgIC8qXG4gICAgICogRm9ybSB0aGUgc2hhcGUgb2YgYSB3ZWlyZCByaG9tYnVzXG4gICAgICpcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgdXBcbiAgICAgKiAgICAgICAgICAgLyAgXFxcbiAgICAgKiAgICAgICAgICAvICAgIFxcXG4gICAgICogICAgICAgICAvICAgICAgXFxcbiAgICAgKiAgICAgICAgLyAgICAgICAgXFxcbiAgICAgKiAgICAgbGVmdCAgICAgICByaWdodFxuICAgICAqICAgICAgIFxcICAgICAgICAgL1xuICAgICAqICAgICBib3JkZXIgICBib3JkZXJcbiAgICAgKlxuICAgICAqL1xuICAgIHZhciB1cCA9IFZlY3Rvci5hZGQodSwgVmVjdG9yLnNjYWxlKGRpciwgdS5yICsgbGVuZ3RoKSlcblxuICAgIHZhciBtaWRMZWZ0ID0gVmVjdG9yLmFkZCh1Qm9yZGVyTGVmdCwgVmVjdG9yLnNjYWxlKGRpciwgbGVuZ3RoICogMC41KSlcbiAgICB2YXIgbWlkUmlnaHQgPSBWZWN0b3IuYWRkKHVCb3JkZXJSaWdodCwgVmVjdG9yLnNjYWxlKGRpciwgbGVuZ3RoICogMC41KSlcblxuICAgIHZhciBsZWZ0ID0gVmVjdG9yLmFkZChtaWRMZWZ0LCBWZWN0b3Iuc2NhbGUob3J0LCBsZW5ndGggLyA0KSlcbiAgICB2YXIgcmlnaHQgPSBWZWN0b3IuYWRkKG1pZFJpZ2h0LCBWZWN0b3Iuc2NhbGUob3J0LCAtbGVuZ3RoIC8gNCkpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogW3VCb3JkZXJMZWZ0LCBsZWZ0LCB1cCwgcmlnaHQsIHVCb3JkZXJSaWdodF0sXG4gICAgICBkaXI6IG9ydFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBwb2ludHMgb2YgdGhlIDxwYXRoPiB0aGF0IHJlcHJlc2VudCBhbiBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkIEVkZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG1ldGEgSG9sZHMgdGhlIGVkZ2UgY291bnQgYmV0d2VlbiB2ZXJ0aWNlcyxcbiAgICogdW5pdCB2ZWN0b3JzIGFuZCBvdGhlciBtZXRhZGF0YVxuICAgKiBAcGFyYW0ge251bWJlcn0gbWFyZ2luQmV0d2VlbkVkZ2VzIFVzZWQgaW4gYm90aCBub3JtYWwgYW5kXG4gICAqIGxvb3AgZWRnZXMgc2V0cyB0aGUgc2VwYXJhdGlvbiBiZXR3ZWVuIGVkZ2VzIGZyb20gdGhlIG1pZFxuICAgKiBwb2ludCBvZiB0aGUgdmVydGljZXMgdGhleSBqb2luXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVQYXRoIChkLCBtZXRhLCBtYXJnaW5CZXR3ZWVuRWRnZXMpIHtcbiAgICB2YXIgdSwgdlxuICAgIHZhciB1Qm9yZGVyLCB2Qm9yZGVyXG4gICAgdmFyIGN1cnJlbnRcblxuICAgIHUgPSBkLnNvdXJjZVxuICAgIHYgPSBkLnRhcmdldFxuICAgIGlmICh1LmlkID4gdi5pZCkge1xuICAgICAgW3UsIHZdID0gW3YsIHVdXG4gICAgfVxuICAgIG1ldGFbdS5pZF0gPSBtZXRhW3UuaWRdIHx8IHt9XG5cbiAgICAvLyB0aGUgbWlkIHBvaW50IGlzIGNvbXB1dGVkIGZyb20gdGhlIGJvcmRlcnMgb2YgYm90aCBub2Rlc1xuICAgIC8vIHRoZSBtaWQgcG9pbnQgaXMgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYWJlbFxuICAgIHVCb3JkZXIgPSB1XG4gICAgdkJvcmRlciA9IHZcbiAgICBpZiAodS5pZCAhPT0gdi5pZCkge1xuICAgICAgdUJvcmRlciA9IG1vdmVUb3dhcmRzUG9pbnQodSwgdilcbiAgICAgIHZCb3JkZXIgPSBtb3ZlVG93YXJkc1BvaW50KHYsIHUpXG4gICAgfVxuXG4gICAgY3VycmVudCA9IChtZXRhW3UuaWRdW3YuaWRdID0gbWV0YVt1LmlkXVt2LmlkXSB8fCB7XG4gICAgICBjb3VudDogMSxcbiAgICAgIG1pZDogVmVjdG9yLm1pZCh1Qm9yZGVyLCB2Qm9yZGVyKSxcbiAgICAgIGRpcmVjdGlvbjogLTFcbiAgICB9KVxuXG4gICAgdmFyIGlubmVySm9pbnRzID0gW11cbiAgICBpZiAodS5pZCA9PT0gdi5pZCkge1xuICAgICAgLy8gYXBwbHkgdGhlIGZvbGxvd2luZyBmb3Igc2VsZi1sb29wIGVkZ2VzXG4gICAgICB2YXIgbG9vcCA9IHNlbGZMb29wKHUsIG1hcmdpbkJldHdlZW5FZGdlcywgY3VycmVudC5jb3VudClcbiAgICAgIGlubmVySm9pbnRzID0gbG9vcC5wYXRoXG4gICAgICBkLnVuaXQgPSBsb29wLmRpclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdW5pdCA9IFZlY3Rvci51bml0KFZlY3Rvci5zdWIodiwgdSkpXG4gICAgICBleHRlbmQoY3VycmVudCwge1xuICAgICAgICB1bml0OiB1bml0LFxuICAgICAgICB1bml0T3J0aG9nb25hbDogVmVjdG9yLm9ydGhvZ29uYWwodW5pdClcbiAgICAgIH0pXG4gICAgICBpbm5lckpvaW50cy5wdXNoKFZlY3Rvci5hZGQoXG4gICAgICAgIGN1cnJlbnQubWlkLFxuICAgICAgICBWZWN0b3Iuc2NhbGUoXG4gICAgICAgICAgY3VycmVudC51bml0T3J0aG9nb25hbCxcbiAgICAgICAgICBNYXRoLmZsb29yKGN1cnJlbnQuY291bnQgLyAyKSAqIG1hcmdpbkJldHdlZW5FZGdlcyAqIGN1cnJlbnQuZGlyZWN0aW9uXG4gICAgICAgIClcbiAgICAgICkpXG4gICAgICBkLnVuaXQgPSBjdXJyZW50LnVuaXRcbiAgICB9XG5cbiAgICBjdXJyZW50LmNvdW50ICs9IDFcbiAgICBjdXJyZW50LmRpcmVjdGlvbiAqPSAtMVxuXG4gICAgLy8gcHJvYmxlbTogdGhlIGVkZ2Ugc3RhcnRzL2VuZHMgaW4gdGhlIGNlbnRlciBvZiBzb21lIG5vZGVcbiAgICAvL1xuICAgIC8vIHJlYWwgc29sdXRpb246IHJlbmRlciB0aGUgcGF0aCBub3JtYWxseSB0aGVuIGNvbXB1dGUgdGhlIHBvc2l0aW9uIG9mIGEgcG9pbnRcbiAgICAvLyB3aXRoIGBwYXRoLmdldFBvaW50QXRMZW5ndGgodCAqIGwpYCB3aGVyZSBgbGAgaXMgdGhlIGxlbmd0aCBvZiB0aGUgcGF0aCBhbmRcbiAgICAvLyBgdGAgYW4gaW50ZXJwb2xhdGVkIHBsYWNlID0gcmFkaXVzIG9mIGVhY2ggbm9kZVxuICAgIC8vXG4gICAgLy8gc2ltcGxlIHRyaWNrOiBzaG9ydGVuIHRoZSBsZW5ndGggb2YgdGhlIGVkZ2UgYnkgbW92aW5nIHRoZSBzdGFydC9lbmQgcG9pbnRzXG4gICAgLy8gb2YgdGhlIGVkZ2VzIHRvd2FyZCBlYWNoIG90aGVyXG4gICAgdmFyIHNvdXJjZSA9IG1vdmVUb3dhcmRzUG9pbnQoZC5zb3VyY2UsIGlubmVySm9pbnRzWzBdKVxuICAgIHZhciB0YXJnZXQgPSBtb3ZlVG93YXJkc1BvaW50KGQudGFyZ2V0LCBpbm5lckpvaW50c1tpbm5lckpvaW50cy5sZW5ndGggLSAxXSlcblxuICAgIGQucGF0aCA9IFtzb3VyY2VdXG4gICAgICAuY29uY2F0KGlubmVySm9pbnRzKVxuICAgICAgLmNvbmNhdChbdGFyZ2V0XSlcbiAgfVxuXG4gIHZhciBsaW5lID0gZDMuc3ZnLmxpbmUoKVxuICAgIC54KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnggfSlcbiAgICAueShmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55IH0pXG4gICAgLnRlbnNpb24oMS41KVxuICAgIC5pbnRlcnBvbGF0ZSgnYnVuZGxlJylcbiAgICAvLyAuaW50ZXJwb2xhdGUoJ2xpbmVhcicpXG5cbiAgZnVuY3Rpb24gaW5uZXIgKHNlbGVjdGlvbikge1xuICAgIC8vIGVkZ2VzXG4gICAgdmFyIGxpbmtzID0gc2VsZWN0aW9uLnNlbGVjdEFsbCgnZy5lZGdlJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmxpbmtzXG4gICAgICB9LCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5pZFxuICAgICAgfSlcbiAgICBsaW5rcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZWRnZScpXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApXG4gICAgICAuYXR0cignaWQnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gdXRpbHMubnMoZC5pZCkgfSlcbiAgICAgIC50cmFuc2l0aW9uKCdlbnRlcicpXG4gICAgICAuYXR0cignb3BhY2l0eScsIDEpXG5cbiAgICAvLyB1cGRhdGVcbiAgICBsaW5rc1xuICAgICAgLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgdmFyIGNscyA9IHtcbiAgICAgICAgICBkaXJlY3RlZDogZC5kaXJlY3RlZCB8fCBvd25lci5vcHRpb25zLmRpcmVjdGVkXG4gICAgICAgIH1cbiAgICAgICAgY2xzWydzb3VyY2UtJyArIGQuc291cmNlLmlkXSA9IHRydWVcbiAgICAgICAgY2xzWyd0YXJnZXQtJyArIGQudGFyZ2V0LmlkXSA9IHRydWVcbiAgICAgICAgc2VsZi5jbGFzc2VkKGNscylcbiAgICAgIH0pXG5cbiAgICB2YXIgbWV0YSA9IHt9XG4gICAgbGlua3MuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgY3JlYXRlUGF0aChkLCBtZXRhLCAxNylcbiAgICB9KVxuXG4gICAgLy8gcGF0aCBlbnRlclxuICAgIHZhciBwYXRocyA9IGxpbmtzLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkge1xuICAgICAgICAvLyAxLiByZWFsIHBhdGhcbiAgICAgICAgLy8gMi4gc3Ryb2tlLWRhc2hhcnJheSBoZWxwZXJcbiAgICAgICAgcmV0dXJuIFtkLCBkXVxuICAgICAgfSlcbiAgICBwYXRocy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdzdHJva2UnLCBkID0+IGQuc3Ryb2tlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAndHJhbnNwYXJlbnQnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDIpXG4gICAgICAuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgZWwuYXR0cignb3BhY2l0eScsICFpID8gMSA6IDApXG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgZWwuY2xhc3NlZCgnYmFzZScsIHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICBlbC5hdHRyKCdzdHJva2Utd2lkdGgnLCA1KVxuICAgICAgICAgIGVsLmNsYXNzZWQoJ3RyYXZlcnNhbCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyAuYXR0cignZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICB2YXIgcGFyZW50ID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuZGF0dW0oKVxuICAgICAgLy8gIHJldHVybiBsaW5lKFtwYXJlbnQuc291cmNlXSlcbiAgICAgIC8vIH0pXG5cbiAgICAvLyBwYXRoIHVwZGF0ZVxuICAgIHV0aWxzLmNvbmRpdGlvbmFsVHJhbnNpdGlvbihwYXRocywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC5hdHRyKCdkJywgZCA9PiBsaW5lKGQucGF0aCkpXG5cbiAgICBwYXRocy5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICB2YXIgcGF0aCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgdmFyIHBhcmVudCA9IGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBwYXRoLmF0dHIoJ21hcmtlci1lbmQnLFxuICAgICAgICAgIHBhcmVudC5jbGFzc2VkKCdkaXJlY3RlZCcpXG4gICAgICAgICAgICA/ICd1cmwoIycgKyBvd25lci5tYXJrZXJJZCArICcpJ1xuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gd2VpZ2h0UG9zaXRpb24gKHNlbGVjdGlvbikge1xuICAgICAgc2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIHZhciBhbmdsZSA9IFZlY3Rvci5hbmdsZURlZyhkLnVuaXQpXG4gICAgICAgICAgdmFyIHYgPSBkLnBhdGhbTWF0aC5mbG9vcihkLnBhdGgubGVuZ3RoIC8gMildXG4gICAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IHYsXG4gICAgICAgICAgICByb3RhdGU6IGFuZ2xlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB2YXIgd2VpZ2h0cyA9IGxpbmtzLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAuZGF0YShkID0+IFtkXSlcblxuICAgIC8vIHdlaWdodCBlbnRlclxuICAgIHdlaWdodHMuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzlweCcpXG4gICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAndGV4dC1hZnRlci1lZGdlJylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgLmNhbGwod2VpZ2h0UG9zaXRpb24pXG5cbiAgICAvLyB3ZWlnaHQgdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKHdlaWdodHMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAudGV4dChkID0+IGQud2VpZ2h0KVxuICAgICAgLmNhbGwod2VpZ2h0UG9zaXRpb24pXG5cbiAgICAvLyB3ZWlnaHQgZXhpdFxuICAgIHdlaWdodHMuZXhpdCgpXG4gICAgICAucmVtb3ZlKClcblxuICAgIC8vIGV4aXRcbiAgICBsaW5rcy5leGl0KClcbiAgICAgIC5yZW1vdmUoKVxuICB9XG5cbiAgaW5uZXIub3duZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBvd25lclxuICAgIH1cbiAgICBvd25lciA9IHZhbHVlXG4gICAgcmV0dXJuIGlubmVyXG4gIH1cblxuICByZXR1cm4gaW5uZXJcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZDMgPSB3aW5kb3cuZDNcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vY29uc3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG93bmVyXG5cbiAgZnVuY3Rpb24gaW5uZXIgKHNlbGVjdGlvbikge1xuICAgIHZhciBub2RlcyA9IHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgnZy5ub2RlJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLm5vZGVzXG4gICAgICB9LCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5pZFxuICAgICAgfSlcblxuICAgIHZhciBsYXlvdXQgPSBvd25lci5sYXlvdXRcblxuICAgIHZhciBnID0gbm9kZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuICdub2RlICcgKyAoZC5jbGFzcyB8fCAnJylcbiAgICAgIH0pXG4gICAgICAuYXR0cignaWQnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gdXRpbHMubnMoZC5pZCkgfSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHsgdHJhbnNsYXRlOiBkIH0pXG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICBpZiAoIWVsLm92ZXIpIHtcbiAgICAgICAgICBlbC5zdHlsZSgnY3Vyc29yJywgJ3BvaW50ZXInKVxuICAgICAgICB9XG4gICAgICAgIGVsLm92ZXIgPSB0cnVlXG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIGVsLm92ZXIgPSBmYWxzZVxuICAgICAgICBlbC5zdHlsZSgnY3Vyc29yJywgbnVsbClcbiAgICAgIH0pXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApXG4gICAgZy50cmFuc2l0aW9uKCdlbnRlcicpXG4gICAgICAuYXR0cignb3BhY2l0eScsIDEpXG4gICAgZy5jYWxsKGxheW91dC5kcmFnKVxuXG4gICAgdmFyIGRyYWdTdGFydCA9IGxheW91dC5kcmFnKCkub24oJ2RyYWdzdGFydC5kM2FkYXB0b3InKVxuICAgIHZhciBkcmFnRW5kID0gbGF5b3V0LmRyYWcoKS5vbignZHJhZ2VuZC5kM2FkYXB0b3InKVxuICAgIGxheW91dC5kcmFnKClcbiAgICAgIC5vbignZHJhZ3N0YXJ0LmQzYWRhcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3duZXIubm9kZURyYWdnaW5nID0gdHJ1ZVxuICAgICAgICBkcmFnU3RhcnQuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgICAgLm9uKCdkcmFnZW5kLmQzYWRhcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3duZXIubm9kZURyYWdnaW5nID0gZmFsc2VcbiAgICAgICAgZHJhZ0VuZC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cylcbiAgICAgIH0pXG5cbiAgICBnLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgIC5hdHRyKCdmaWxsJywgZCA9PiBkLmZpbGwpXG4gICAgICAuYXR0cigncicsIGQgPT4gZC5yKVxuXG4gICAgLy8gaW5uZXIgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnbGFiZWwnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnd2hpdGUnKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcxMnB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgLmF0dHIoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2NlbnRyYWwnKVxuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5sYWJlbCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ2xhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQubGFiZWxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC5pZFxuICAgICAgfSlcblxuICAgIC8vIHRvcC1yaWdodCBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdvdXRlci10b3AtcmlnaHQnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBjb2xvcnMuQkxVRSlcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdzdGFydCcpXG4gICAgICAuYXR0cigneCcsIGQgPT4gZC53aWR0aCAvIDIgLSAyKVxuICAgICAgLmF0dHIoJ3knLCBkID0+IC1kLmhlaWdodCAvIDIgKyAzKVxuICAgIG5vZGVzLnNlbGVjdEFsbCgndGV4dC5vdXRlci10b3AtcmlnaHQnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCd0b3BSaWdodExhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9wUmlnaHRMYWJlbFxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgLy8gdG9wLWxlZnQgbGFiZWxcbiAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAuY2xhc3NlZCgnb3V0ZXItdG9wLWxlZnQnLCB0cnVlKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBjb2xvcnMuQkxVRSlcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdlbmQnKVxuICAgICAgLmF0dHIoJ3gnLCBkID0+IC1kLndpZHRoIC8gMiAtIDIpXG4gICAgICAuYXR0cigneScsIGQgPT4gLWQuaGVpZ2h0IC8gMiArIDMpXG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0Lm91dGVyLXRvcC1sZWZ0JylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgndG9wUmlnaHRMYWJlbCcgaW4gZCkge1xuICAgICAgICAgIHJldHVybiBkLnRvcExlZnRMYWJlbFxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgLy8gdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKG5vZGVzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oe1xuICAgICAgICAgIHRyYW5zbGF0ZTogZFxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgIC8vIGV4aXRcbiAgICBub2Rlcy5leGl0KClcbiAgICAgIC5yZW1vdmUoKVxuICB9XG5cbiAgaW5uZXIub3duZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBvd25lclxuICAgIH1cbiAgICBvd25lciA9IHZhbHVlXG4gICAgcmV0dXJuIGlubmVyXG4gIH1cblxuICByZXR1cm4gaW5uZXJcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgcG9seWZpbGxzIGZyb20gJy4vcG9seWZpbGxzJ1xucG9seWZpbGxzKClcblxudmFyIGQzID0gd2luZG93LmQzXG5cbi8vIG5vZGVcbmltcG9ydCBEcmF3IGZyb20gJy4vRHJhdydcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJ1xuXG52YXIgaW5zdGFuY2VzID0gW11cblxuZnVuY3Rpb24gcnVuIChvcHRpb25zKSB7XG4gIGZ1bmN0aW9uIGZhY3RvcnkgKG9wdGlvbnMpIHtcbiAgICB2YXIgZWwgPSBkMy5zZWxlY3Qob3B0aW9ucy50YXJnZXQpXG4gICAgdmFyIGlkID0gZWwuYXR0cignZ3JldWxlci1pZCcpXG4gICAgaWYgKCFpZCkge1xuICAgICAgaWQgPSB1dGlscy5pZCgpXG4gICAgICBlbC5hdHRyKCdncmV1bGVyLWlkJywgaWQpXG4gICAgICBpbnN0YW5jZXNbaWRdID0gbmV3IERyYXcoaWQsIG9wdGlvbnMpXG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZXNbaWRdXG4gIH1cblxuICByZXR1cm4gZmFjdG9yeShvcHRpb25zKVxufVxuXG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCdcbnJ1bi5HcmFwaCA9IEdyYXBoXG5cbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29uc3QnXG5ydW4uY29sb3JzID0gY29sb3JzXG5cbmltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXIvaW5kZXgnXG5ydW4ucGxheWVyID0gcGxheWVyXG5cbmV4cG9ydCBkZWZhdWx0IHJ1blxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yIChhY3Rpb25zLCBzcGVlZCkge1xuICAgIHRoaXMuaW5kZXggPSAwXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkXG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9uc1xuXG4gICAgLy8gc3RhdGVzXG4gICAgdGhpcy50aW1lciA9IG51bGxcbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIGlmICh0aGlzLmluZGV4IDwgdGhpcy5hY3Rpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5hY3Rpb25zW3RoaXMuaW5kZXgrK10oKVxuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQodGhpcy5wbGF5LmJpbmQodGhpcyksIHRoaXMuc3BlZWQpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgdGhpcy5wYXVzZSgpXG4gICAgdGhpcy5pbmRleCA9IDBcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3IgKGluc3RhbmNlLCBzcGVlZCkge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZVxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZCB8fCBpbnN0YW5jZS5vcHRpb25zLmFuaW1hdGlvblRpbWVcbiAgICB0aGlzLmZuID0gbnVsbFxuICAgIHRoaXMudGltZXIgPSBudWxsXG4gIH1cblxuICBydW4gKGZuKSB7XG4gICAgdGhpcy5mbiA9IGZuKHRoaXMuaW5zdGFuY2UpXG4gICAgdGhpcy5wbGF5KClcbiAgfVxuXG4gIHJ1bkFuaW1hdGlvbiAoYW5pbWF0aW9uKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYW5pbWF0aW9uKSkge1xuICAgICAgcmV0dXJuIGFuaW1hdGlvbi5mb3JFYWNoKHRoaXMucnVuQW5pbWF0aW9uLCB0aGlzKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYW5pbWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uKHRoaXMuaW5zdGFuY2UpXG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSB0aGlzLmluc3RhbmNlW2FuaW1hdGlvbi50eXBlXVxuICAgIHJldHVybiB0eXBlW2FuaW1hdGlvbi5vcF0uYXBwbHkodHlwZSwgYW5pbWF0aW9uLmFyZ3MgfHwgW10pXG4gIH1cblxuICBwbGF5ICh2YWx1ZSkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciBuZXh0ID0gdGhpcy5mbi5uZXh0KHZhbHVlKVxuICAgIGlmICghbmV4dC5kb25lKSB7XG4gICAgICB2YXIgZGVsYXkgPSB0aGlzLnNwZWVkXG4gICAgICB2YXIgcnVuQW5pbWF0aW9uVmFsdWUgPSB0aGlzLnJ1bkFuaW1hdGlvbihuZXh0LnZhbHVlKVxuICAgICAgaWYgKHJ1bkFuaW1hdGlvblZhbHVlICYmIHR5cGVvZiBydW5BbmltYXRpb25WYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBydW5BbmltYXRpb25WYWx1ZS5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBkZWxheSA9IHJ1bkFuaW1hdGlvblZhbHVlLmRlbGF5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy50aW1lciA9IHdpbmRvdy5yZXF1ZXN0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYucGxheShuZXh0LnZhbHVlKVxuICAgICAgfSwgZGVsYXkpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHdpbmRvdy5jbGVhclJlcXVlc3RUaW1lb3V0KHRoaXMudGltZXIpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgRml4ZWQgZnJvbSAnLi9GaXhlZCdcbmltcG9ydCBHZW5lcmF0b3IgZnJvbSAnLi9HZW5lcmF0b3InXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgRml4ZWRJbnRlcnZhbDogRml4ZWQsXG4gIEdlbmVyYXRvcjogR2VuZXJhdG9yXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvKmVzbGludC1kaXNhYmxlICovXG4gIChmdW5jdGlvbiAoZG9jLCBwcm90bykge1xuICAgIHRyeSB7IC8vIGNoZWNrIGlmIGJyb3dzZXIgc3VwcG9ydHMgOnNjb3BlIG5hdGl2ZWx5XG4gICAgICBkb2MucXVlcnlTZWxlY3RvcignOnNjb3BlIGJvZHknKVxuICAgIH0gY2F0Y2ggKGVycikgeyAvLyBwb2x5ZmlsbCBuYXRpdmUgbWV0aG9kcyBpZiBpdCBkb2Vzbid0XG4gICAgICBbJ3F1ZXJ5U2VsZWN0b3InLCAncXVlcnlTZWxlY3RvckFsbCddLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgICB2YXIgbmF0aXZlID0gcHJvdG9bbWV0aG9kXVxuICAgICAgICBwcm90b1ttZXRob2RdID0gZnVuY3Rpb24gKHNlbGVjdG9ycykge1xuICAgICAgICAgIGlmICgvKF58LClcXHMqOnNjb3BlLy50ZXN0KHNlbGVjdG9ycykpIHsgLy8gb25seSBpZiBzZWxlY3RvcnMgY29udGFpbnMgOnNjb3BlXG4gICAgICAgICAgICB2YXIgaWQgPSB0aGlzLmlkIC8vIHJlbWVtYmVyIGN1cnJlbnQgZWxlbWVudCBpZFxuICAgICAgICAgICAgdGhpcy5pZCA9ICdJRF8nICsgRGF0ZS5ub3coKSAvLyBhc3NpZ24gbmV3IHVuaXF1ZSBpZFxuICAgICAgICAgICAgc2VsZWN0b3JzID0gc2VsZWN0b3JzLnJlcGxhY2UoLygoXnwsKVxccyopOnNjb3BlL2csICckMSMnICsgdGhpcy5pZCk7IC8vIHJlcGxhY2UgOnNjb3BlIHdpdGggI0lEXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZG9jW21ldGhvZF0oc2VsZWN0b3JzKVxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkIC8vIHJlc3RvcmUgcHJldmlvdXMgaWRcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZS5jYWxsKHRoaXMsIHNlbGVjdG9ycykgLy8gdXNlIG5hdGl2ZSBjb2RlIGZvciBvdGhlciBzZWxlY3RvcnNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KSh3aW5kb3cuZG9jdW1lbnQsIEVsZW1lbnQucHJvdG90eXBlKVxuXG4gIC8vIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vam9lbGFtYmVydC8xMDAyMTE2XG4gIC8vXG4gIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHNoaW0gYnkgUGF1bCBJcmlzaFxuICAvLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgZnVuY3Rpb24gKCAvKiBmdW5jdGlvbiAqLyBjYWxsYmFjaywgLyogRE9NRWxlbWVudCAqLyBlbGVtZW50KSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKVxuICAgIH1cbiAgfSkoKVxuXG4gIC8qKlxuICAgKiBCZWhhdmVzIHRoZSBzYW1lIGFzIHNldFRpbWVvdXQgZXhjZXB0IHVzZXMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgd2hlcmUgcG9zc2libGUgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtpbnR9IGRlbGF5IFRoZSBkZWxheSBpbiBtaWxsaXNlY29uZHNcbiAgICovXG4gIHdpbmRvdy5yZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcbiAgICBpZiAoICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgISh3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpICYmIC8vIEZpcmVmb3ggNSBzaGlwcyB3aXRob3V0IGNhbmNlbCBzdXBwb3J0XG4gICAgICAhd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICF3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZm4sIGRlbGF5KVxuXG4gICAgdmFyIHN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICB2YXIgaGFuZGxlID0ge31cblxuICAgIGZ1bmN0aW9uIGxvb3AgKCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgZGVsdGEgPSBjdXJyZW50IC0gc3RhcnRcblxuICAgICAgZGVsdGEgPj0gZGVsYXkgPyBmbi5jYWxsKCkgOiBoYW5kbGUudmFsdWUgPSByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApXG4gICAgfVxuXG4gICAgaGFuZGxlLnZhbHVlID0gcmVxdWVzdEFuaW1GcmFtZShsb29wKVxuICAgIHJldHVybiBoYW5kbGVcbiAgfVxuXG4gIC8qKlxuICAgKiBCZWhhdmVzIHRoZSBzYW1lIGFzIGNsZWFyVGltZW91dCBleGNlcHQgdXNlcyBjYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZSBwb3NzaWJsZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAqIEBwYXJhbSB7aW50fG9iamVjdH0gaGFuZGxlIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgd2luZG93LmNsZWFyUmVxdWVzdFRpbWVvdXQgPSBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lID8gd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDogLyogU3VwcG9ydCBmb3IgbGVnYWN5IEFQSSAqL1xuICAgICAgICAgIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcdD8gd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICAgIHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKVxuICB9XG4vKmVzbGludC1lbmFibGUgKi9cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IgKG93bmVyKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgdGhpcy5ncmFwaCA9IG93bmVyLmdyYXBoXG4gICAgdGhpcy5kZWZhdWx0U3R5bGVPcHRpb25zID0ge31cbiAgfVxuXG4gIGdldERlZmF1bHRTdHlsZU9wdGlvbnMgKCkge1xuICAgIHJldHVybiBleHRlbmQoe1xuICAgICAgZHVyYXRpb246IHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpLFxuICAgICAgc3Ryb2tlOiAnI0U3NEMzQydcbiAgICB9LCB0aGlzLmRlZmF1bHRTdHlsZU9wdGlvbnMpXG4gIH1cblxuICBnZXRTdHlsZU9wdGlvbnMgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZXh0ZW5kKHt9LCB0aGlzLmdldERlZmF1bHRTdHlsZU9wdGlvbnMoKSwgb3B0aW9ucylcbiAgfVxuXG4gIGdldEFuaW1hdGlvblRpbWUgKCkge1xuICAgIHJldHVybiB0aGlzLm93bmVyLm9wdGlvbnMuYW5pbWF0aW9uVGltZVxuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgY29sbGVjdGlvbiBvZiBlbGVtZW50cyByZXR1cm5lZCBieSB0aGUgR3JhcGggY2xhc3MgdGhpcyBtZXRob2RzIHJldHVybnNcbiAgICogdGhlIGQzIHNlbGVjdGlvbiB0aGF0IGZvciBhbGwgdGhvc2Ugb2JqZWN0c1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfE9iamVjdH0gZWxzIEFuIGFycmF5IG9mIGVkZ2VzL25vZGVzIG9yIGEgc2luZ2xlIGVkZ2Uvbm9kZVxuICAgKiBAcmV0dXJuIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBzZWxlY3QgKGVscykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShlbHMpKSB7XG4gICAgICBlbHMgPSBbZWxzXVxuICAgIH1cbiAgICBpZiAoIWVscy5sZW5ndGgpIHtcbiAgICAgIGVscy5wdXNoKHsgaWQ6IC0xIH0pXG4gICAgfVxuICAgIGVscyA9IGVscy5maWx0ZXIoQm9vbGVhbilcbiAgICByZXR1cm4gdGhpcy5vd25lci5yb290LnNlbGVjdEFsbChcbiAgICAgIGVscy5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuICcjJyArIHV0aWxzLm5zKGUuaWQpXG4gICAgICB9KS5qb2luKCcsICcpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIHBhdGggaW5zaWRlIHRoZSB0YWcgPGc+IHRoYXQgcmVwcmVzZW50cyBhbiBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICovXG4gIGlubmVyRWRnZVNlbGVjdG9yIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdwYXRoLmJhc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIGNpcmNsZSBpbnNpZGUgdGhlIHRhZyA8Zz4gdGhhdCByZXByZXNlbnRzIGEgbm9kZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqL1xuICBpbm5lck5vZGVTZWxlY3RvciAoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvblxuICAgICAgLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZDMgPSB3aW5kb3cuZDNcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCdcblxudmFyIEhJR0hMSUdIVCA9ICdoaWdobGlnaHQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbiBleHRlbmRzIEdyYXBoIHtcblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIG9mIHRoZSBncmFwaFxuICAgKlxuICAgKiBAcmV0dXJucyB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgZ2V0RWRnZXMgKCkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5lZGdlcylcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIG5vZGVzIG9mIHRoZSBncmFwaFxuICAgKlxuICAgKiBAcmV0dXJucyB7ZDNfc2VsZWN0aW9ufVxuICAgKi9cbiAgZ2V0Tm9kZXMgKCkge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5ub2RlcylcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyBhIG5vZGUgdGVtcG9yYXJpbHksIGl0IGNvbnNpc3RzIG9mIHR3b1xuICAgKiBjaGFpbmVkIHRyYW5zaXRpb25zXG4gICAqXG4gICAqIC0gaW5jcmVhc2UgdGhlIHJhZGl1cyB0byAxLjV4IHRoZSBvcmlnaW5hbCBgcmAgdmFsdWVcbiAgICogLSBkZWNyZWFzZSB0aGUgcmFkaXVzIHRvIHRoZSBvcmlnaW5hbCBgcmAgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIGRvVGVtcG9yYWxIaWdobGlnaHROb2RlIChzZWxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gb3B0aW9ucy5yIHx8IChkLnIgKiAxLjUpKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IGQucilcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIGFuIGVkZ2UgdGVtcG9yYXJpbHksIGl0IGNvbnNpc3RzIG9mIHR3b1xuICAgKiBjaGFpbmVkIHRyYW5zaXRpb25zXG4gICAqXG4gICAqIC0gY2hhbmdlIHRoZSBzdHJva2Ugb2YgdGhlIGBwYXRoYCB0aGF0IHJlcHJlc2VudHMgdGhlIGVkZ2UgdG9cbiAgICogYG9wdGlvbnMuc3Ryb2tlYFxuICAgKiAtIGNoYW5nZSB0aGUgc3Ryb2tlIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzIChzZWxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihzZWxlY3Rpb24pXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgICAgLnRyYW5zaXRpb24oSElHSExJR0hUKVxuICAgICAgLmR1cmF0aW9uKHRoaXMuZ2V0QW5pbWF0aW9uVGltZSgpIC8gMilcbiAgICAgIC5hdHRyKCdzdHJva2UnLCAoZCkgPT4gZC5zdHJva2UpXG4gIH1cblxuICAvKipcbiAgICogRWRnZSB0cmF2ZXJzYWwgYW5pbWF0aW9uLCBpdCBhbmltYXRlcyBhIGhpZGRlbiBwYXRoIGdpdmluZyB0aGUgaW1wcmVzc2lvblxuICAgKiBvZiBtb3ZlbWVudCwgaWYgc291cmNlIGlzIGdpdmVuIHRoZW4gaXQgd2lsbCBhbHdheXMgc3RhcnQgdGhlIGFuaW1hdGlvblxuICAgKiBmcm9tIHRoZSBub2RlIGBzb3VyY2VgIGV2ZW4gaWYgdGhlIGVkZ2UgaXMgYW4gaW5jb21pbmcgZWRnZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7Y29uZmlnfSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbc291cmNlPS0xXVxuICAgKiBAcmV0dXJucyB7ZDNfdHJhbnNpdGlvbn1cbiAgICovXG4gIHRyYXZlcnNlRWRnZVdpdGhEaXJlY3Rpb24gKHNlbGVjdGlvbiwgb3B0aW9ucywgc291cmNlID0gLTEpIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdwYXRoLnRyYXZlcnNhbCcpXG4gICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKVxuICAgICAgICBlbFxuICAgICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIGAke2x9ICR7bH1gKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIGwpXG4gICAgICAgICAgLmF0dHIoJ29wYWNpdHknLCAxKVxuICAgICAgfSlcbiAgICAgIC50cmFuc2l0aW9uKCdkYXNoYXJyYXknKVxuICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpXG4gICAgICAgIHZhciB0d2ljZUxlbmd0aCA9IGxlbmd0aCAqIDJcbiAgICAgICAgdmFyIGxlbmd0aFRvTW92ZSA9IDBcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoZC50YXJnZXQuaWQgPT09IHNvdXJjZSkge1xuICAgICAgICAgICAgbGVuZ3RoVG9Nb3ZlID0gdHdpY2VMZW5ndGhcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5yZXZlcnNlKSB7XG4gICAgICAgICAgbGVuZ3RoVG9Nb3ZlID0gdHdpY2VMZW5ndGggLSBsZW5ndGhUb01vdmVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZW5ndGhUb01vdmVcbiAgICAgIH0pXG4gICAgICAuYXR0cignb3BhY2l0eScsIDApXG4gICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgZWwuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIG51bGwpXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgbnVsbClcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDApXG4gICAgICB9KVxuICB9XG5cbiAgdHJhdmVyc2VFZGdlcyAoc2VsZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIGtlZXBTdHJva2U6IHRydWUsXG4gICAgICByZXZlcnNlOiBmYWxzZVxuICAgIH0sIHRoaXMuZ2V0U3R5bGVPcHRpb25zKCksIG9wdGlvbnMpXG5cbiAgICBzZWxlY3Rpb24uY2FsbCh0aGlzLnRyYXZlcnNlRWRnZVdpdGhEaXJlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSlcbiAgICBpZiAob3B0aW9ucy5rZWVwU3Ryb2tlKSB7XG4gICAgICB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgICAgLnRyYW5zaXRpb24oJ3VwZGF0ZScpXG4gICAgICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uKVxuICAgICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgfVxuXG4gIGdldE5vZGUgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lck5vZGVTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0Tm9kZShub2RlKSlcbiAgICApXG4gIH1cblxuICBnZXRFZGdlIChlZGdlKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEVkZ2UoZWRnZSkpXG4gICAgKVxuICB9XG5cbiAgLy8gdGVtcG9yYWwgaGlnaGxpZ2h0XG5cbiAgaGlnaGxpZ2h0Tm9kZSAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHROb2RlKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXROb2RlKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaGlnaGxpZ2h0RWRnZSAoZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0RWRnZShlZGdlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGhpZ2hsaWdodEluY2lkZW50RWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY2lkZW50RWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICBoaWdobGlnaHRPdXRnb2luZ0VkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaGlnaGxpZ2h0SW5jb21pbmdFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jb21pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIC8vIHRyYXZlcnNhbCBvZiBhbiBlZGdlIGdpdmVuIGEgbm9kZVxuXG4gIHRyYXZlcnNlT3V0Z29pbmdFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE91dGdvaW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICB0cmF2ZXJzZUluY29taW5nRWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgdHJhdmVyc2VJbmNpZGVudEVkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIC8vIHRyYXZlcnNhbCBvZiBhbiBlZGdlIGJldHdlZW4gdHdvIG5vZGVzXG5cbiAgdHJhdmVyc2VFZGdlc0JldHdlZW4gKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QoXG4gICAgICAgIHRoaXMuZ3JhcGguZ2V0RWRnZXNCZXR3ZWVuKGVkZ2UpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucyksXG4gICAgICBlZGdlLnNvdXJjZVxuICAgIClcbiAgfVxuXG4gIHRyYXZlcnNlQWxsRWRnZXNCZXR3ZWVuIChlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KFxuICAgICAgICB0aGlzLmdyYXBoLmdldEFsbEVkZ2VzQmV0d2VlbihlZGdlKVxuICAgICAgKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpLFxuICAgICAgZWRnZS5zb3VyY2VcbiAgICApXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgbGNnIGZyb20gJ2NvbXB1dGUtbGNnJ1xuXG52YXIgcmFuZCA9IGxjZygxKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG4gPSByYW5kKClcbiAgICB2YXIgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKG4gKiAyNikgKyA5NylcbiAgICByZXR1cm4gbGV0dGVyICsgbi50b1N0cmluZygxNikuc3Vic3RyKDIpXG4gIH0sXG5cbiAgdHJhbnNmb3JtOiBmdW5jdGlvbiAobykge1xuICAgIHZhciBzdHIgPSBgYFxuICAgIGlmICgndHJhbnNsYXRlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCB0cmFuc2xhdGUoJHtvLnRyYW5zbGF0ZS54fSwgJHtvLnRyYW5zbGF0ZS55fSlgXG4gICAgfVxuICAgIGlmICgncm90YXRlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCByb3RhdGUoJHtvLnJvdGF0ZX0pYFxuICAgIH1cbiAgICBpZiAoJ3NjYWxlJyBpbiBvKSB7XG4gICAgICBzdHIgKz0gYCBzY2FsZSgke28uc2NhbGV9KWBcbiAgICB9XG4gICAgcmV0dXJuIHN0clxuICB9LFxuXG4gIHRyYW5zaXRpb246IGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAudHJhbnNpdGlvbignbGF5b3V0JylcbiAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAuZWFzZSgnbGluZWFyJylcbiAgfSxcblxuICBjb25kaXRpb25hbFRyYW5zaXRpb246IGZ1bmN0aW9uIChlbCwgY29uZGl0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbihlbClcbiAgICB9XG4gICAgcmV0dXJuIGVsXG4gIH0sXG5cbiAgbnM6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gJ2dyZXVsZXItJyArIHN0clxuICB9XG59XG4iXX0=
