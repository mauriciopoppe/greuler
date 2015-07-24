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
            return native.call(this, selectors) // use native code for other selectors
            ;
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
  }
  /*eslint-enable */
  ;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29tcHV0ZS1sY2cvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL0RyYXcuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL1ZlY3Rvci5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2NvbnN0LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvZWxlbWVudHMvZWRnZS5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2VsZW1lbnRzL25vZGUuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9GaXhlZC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3BsYXllci9HZW5lcmF0b3IuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wb2x5ZmlsbHMuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmFwaC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbi5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkEsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7c0JBS08sUUFBUTs7Ozs0QkFDVixpQkFBaUI7Ozs7NEJBQ2pCLGlCQUFpQjs7OztxQkFDVCxTQUFTOzs7O2dEQUNHLHFDQUFxQzs7OztBQVAxRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFBO0FBQ2xCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7O0lBUUQsSUFBSTtBQUNYLFdBRE8sSUFBSSxDQUNWLEVBQUUsRUFBRSxPQUFPLEVBQUU7MEJBRFAsSUFBSTs7QUFFckIsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2YsUUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBOztBQUVyRCxRQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUE7O0FBRTlCLFFBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7OztBQUc1QixRQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7OztBQUdsQixRQUFJLENBQUMsUUFBUSxHQUFHLGtEQUE2QixJQUFJLENBQUMsQ0FBQTs7O0FBR2xELFFBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEMsUUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTs7O0FBR3BDLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBOztBQUU5QixRQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWTtBQUNqQyxVQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7S0FDWixDQUFDLENBQUE7O0FBRUYsUUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFBO0FBQ25CLFFBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZO0FBQ2hDLFVBQUksUUFBUSxFQUFFO0FBQ1osWUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQTtBQUM1QixnQkFBUSxHQUFHLEtBQUssQ0FBQTtPQUNqQjtLQUNGLENBQUMsQ0FBQTtHQUNIOztlQWpDa0IsSUFBSTs7V0FtQ1gsdUJBQUc7QUFDYixVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtBQUM1QixVQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ3RCLFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7OztBQUd0QixVQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtBQUNmLFVBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBOztBQUVmLFVBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQWlCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN6QyxXQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQzVCLFlBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO09BQ3pCLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDUixXQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQzVCLFlBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO09BQ3pCLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F3QmMsd0JBQUMsT0FBTyxFQUFFOztBQUV2QixhQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBTztBQUM5QixhQUFLLEVBQUUsR0FBRztBQUNWLGNBQU0sRUFBRSxHQUFHO0FBQ1gscUJBQWEsRUFBRSxJQUFJO0FBQ25CLGNBQU0sRUFBRSxJQUFJO0FBQ1osZ0JBQVEsRUFBRSxLQUFLO09BQ2hCLEVBQUUsT0FBTyxDQUFDLENBQUE7O0FBRVgsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcseUJBQU87QUFDekIsYUFBSyxFQUFFLEVBQUU7QUFDVCxhQUFLLEVBQUUsRUFBRTtBQUNULGNBQU0sRUFBRSxFQUFFO0FBQ1YsbUJBQVcsRUFBRSxFQUFFO0FBQ2YscUJBQWEsRUFBRSxJQUFJO0FBQ25CLFlBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUNyQyxvQkFBWSxFQUFFLHNCQUFVLENBQUMsRUFBRTtBQUN6QixpQkFBTyxDQUFDLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQTtTQUM1QjtPQUNGLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUN0Qjs7O1dBRVUsb0JBQUMsYUFBYSxFQUFFO0FBQ3pCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQTs7QUFFZixVQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7QUFDNUIsZUFBTTtPQUNQOztBQUVELFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDbEQsWUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDNUIsWUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUNsQixFQUFFLElBQUksQ0FBQyxDQUFBOzs7QUFHUixVQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQ3BCOzs7V0FFSSxnQkFBRztBQUNOLFVBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNwQyxVQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7S0FDckM7OztXQUVNLGdCQUFDLGFBQWEsRUFBRTtBQUNyQixtQkFBYSxHQUFHLHlCQUFPO0FBQ3JCLGtCQUFVLEVBQUUsS0FBSztPQUNsQixFQUFFLGFBQWEsQ0FBQyxDQUFBOztBQUVqQixVQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQzlCLFVBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7OztBQUd6QixVQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7QUFDNUIsWUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO09BQ1o7O0FBRUQsYUFBTyxJQUFJLENBQUE7S0FDWjs7O1dBRUssaUJBQUc7QUFDUCxVQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDdkMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTs7O0FBR3ZCLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDYixJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBOzs7QUFHM0IsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ1osTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUNsQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QixJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUM3QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FDbEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUMvQixJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOzs7QUFHdkIsVUFBSSxDQUFDLElBQUksQ0FDTixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTs7O0FBR3RDLFVBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDdkIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFBRSxlQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO09BQUUsQ0FBQyxDQUFBO0FBQ3pDLFVBQUksQ0FBQyxTQUFTLENBQ1gsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBOzs7QUFHekIsVUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUN2QixTQUFTLENBQUMsU0FBUyxDQUFDLENBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUFFLGVBQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7T0FBRSxDQUFDLENBQUE7QUFDekMsVUFBSSxDQUFDLFNBQVMsQ0FDWCxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7S0FDMUI7OztTQXJMa0IsSUFBSTs7O3FCQUFKLElBQUk7Ozs7QUNYekIsWUFBWSxDQUFBOzs7Ozs7Ozs7Ozs7c0JBRU8sUUFBUTs7OztxQkFDVixTQUFTOzs7O3FCQUNILFNBQVM7O0FBRWhDLElBQU0sb0JBQW9CLEdBQUc7QUFDM0IsR0FBQyxFQUFFLEVBQUU7QUFDTCxNQUFJLEVBQUUsU0FBUztDQUNoQixDQUFBOztBQUVELElBQU0sb0JBQW9CLEdBQUc7QUFDM0IsUUFBTSxFQUFFLE9BUkQsTUFBTSxDQVFFLFVBQVU7Q0FDMUIsQ0FBQTs7QUFFRCxTQUFTLFFBQVEsQ0FBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0FBQzFCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdEMsUUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtBQUNwQixhQUFPLElBQUksQ0FBQTtLQUNaO0dBQ0Y7Q0FDRjs7SUFFb0IsS0FBSztBQUNaLFdBRE8sS0FBSyxDQUNYLEtBQUssRUFBRSxJQUFJLEVBQUU7MEJBRFAsS0FBSzs7QUFFdEIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7QUFDbEIsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ3ZCLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtHQUN4Qjs7ZUFMa0IsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTBCaEIsbUJBQUc7QUFDVCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN6QixZQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNoQyxnQkFBTSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtTQUN0RDtBQUNELFlBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN4QixnQkFBTSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtTQUNyQztBQUNELFlBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNiLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FDbEQsQ0FBQTtPQUNGO0tBQ0Y7Ozs7Ozs7Ozs7O1dBU08saUJBQUMsSUFBSSxFQUFFO0FBQ2IsYUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUEsQ0FBQztlQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUU7T0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDbkQ7Ozs7Ozs7Ozs7O1dBU1ksc0JBQUMsRUFBRSxFQUFFO0FBQ2hCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7S0FDN0I7Ozs7Ozs7Ozs7O1dBU2dCLDBCQUFDLElBQUksRUFBRTtBQUN0QixVQUFJLGFBQWEsR0FBRyxFQUFFLENBQUE7QUFDdEIsVUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO0FBQ2QsVUFBSSxJQUFJLENBQUE7QUFDUixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QyxZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hCLFlBQUksR0FBRyxJQUFJLENBQUE7QUFDWCxZQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDOUIsY0FBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7U0FDbkIsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDckMsY0FBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7U0FDbkI7O0FBRUQsWUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzNCLGVBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO0FBQ3JCLHVCQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3pCO09BQ0Y7O0FBRUQsYUFBTyxhQUFhLENBQUE7S0FDckI7Ozs7Ozs7Ozs7O1dBU2lCLDJCQUFDLElBQUksRUFBRTtBQUN2QixVQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7QUFDbEIsVUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO0FBQ2QsVUFBSSxJQUFJLENBQUE7QUFDUixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QyxZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hCLFlBQUksR0FBRyxJQUFJLENBQUE7QUFDWCxZQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDOUIsY0FBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7U0FDbkI7QUFDRCxZQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDM0IsZUFBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7QUFDckIsbUJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDckI7T0FDRjs7QUFFRCxhQUFPLFNBQVMsQ0FBQTtLQUNqQjs7Ozs7Ozs7Ozs7V0FTbUIsNkJBQUMsSUFBSSxFQUFFO0FBQ3pCLFVBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtBQUNwQixVQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7QUFDZCxVQUFJLElBQUksQ0FBQTtBQUNSLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzdDLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDeEIsWUFBSSxHQUFHLElBQUksQ0FBQTtBQUNYLFlBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUM5QixjQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtTQUNuQjtBQUNELFlBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixlQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQTtBQUNyQixxQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN2QjtPQUNGOztBQUVELGFBQU8sV0FBVyxDQUFBO0tBQ25COzs7Ozs7Ozs7O1dBUVUsb0JBQUMsSUFBSSxFQUFFO0FBQ2hCLFVBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDaEMsZUFBTyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUE7T0FDeEIsQ0FBQyxDQUFBO0tBQ0g7Ozs7Ozs7Ozs7V0FRVyxxQkFBQyxLQUFLLEVBQUU7O0FBRWxCLFVBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDaEMsZUFBTyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtPQUM3QixDQUFDLENBQUE7S0FDSDs7Ozs7Ozs7OztXQVFlLHlCQUFDLEVBQUUsRUFBRTtBQUNuQixVQUFJLENBQUMsQ0FBQTtBQUNMLFdBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6QyxZQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFOztBQUV4QixjQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRWxDLGNBQUksQ0FBQyxXQUFXLENBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFBO0FBQ0QsV0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNQO09BQ0Y7S0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FxQk8sbUJBQUc7QUFDVCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLFlBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7QUFFekIsWUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3hFLGdCQUFNLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFBO1NBQ3ZFO0FBQ0QsWUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUMxQixZQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBOztBQUUxQixZQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUM5QixnQkFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7U0FDN0M7O0FBRUQsWUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDOUIsZ0JBQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1NBQzdDOztBQUVELFlBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDdEIsZ0JBQU0sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7U0FDeEQ7QUFDRCxjQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtBQUN0QixjQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtBQUN0QixZQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQ2xELENBQUE7T0FDRjtLQUNGOzs7Ozs7Ozs7OztXQVNPLGlCQUFDLElBQUksRUFBRTtBQUNiLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFBLENBQUM7ZUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFO09BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25EOzs7Ozs7Ozs7Ozs7O1dBV2UseUJBQUMsT0FBTyxFQUFFO0FBQ3hCLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQyxlQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQTtPQUN4RSxDQUFDLENBQUE7S0FDSDs7Ozs7Ozs7Ozs7OztXQVdrQiw0QkFBQyxPQUFPLEVBQUU7QUFDM0IsYUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BDLGVBQU8sQUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLElBQ3ZFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sQUFBQyxDQUFBO09BQ25FLENBQUMsQ0FBQTtLQUNIOzs7Ozs7Ozs7O1dBUVUsb0JBQUMsSUFBSSxFQUFFO0FBQ2hCLFVBQUksQ0FBQyxlQUFlLENBQUMsVUFBQSxDQUFDO2VBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtPQUFBLENBQUMsQ0FBQTtLQUM1Qzs7Ozs7Ozs7OztXQVFXLHFCQUFDLEtBQUssRUFBRTs7QUFFbEIsVUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNoQyxlQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO09BQzdCLENBQUMsQ0FBQTtLQUNIOzs7Ozs7Ozs7O1dBUWUseUJBQUMsRUFBRSxFQUFFO0FBQ25CLFVBQUksQ0FBQyxDQUFBO0FBQ0wsV0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pDLFlBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDeEIsY0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3ZCLFdBQUMsSUFBSSxDQUFDLENBQUE7U0FDUDtPQUNGO0tBQ0Y7Ozs7Ozs7Ozs7V0FRWSxzQkFBQyxFQUFFLEVBQUU7QUFDaEIsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUM3Qjs7Ozs7Ozs7Ozs7V0FTZ0IsMEJBQUMsSUFBSSxFQUFFO0FBQ3RCLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFDLENBQUM7ZUFBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtPQUFBLENBQUMsQ0FBQTtLQUN6RDs7Ozs7Ozs7Ozs7V0FTZ0IsMEJBQUMsSUFBSSxFQUFFO0FBQ3RCLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFDLENBQUM7ZUFBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRTtPQUFBLENBQUMsQ0FBQTtLQUN6RDs7Ozs7Ozs7Ozs7V0FTZ0IsMEJBQUMsSUFBSSxFQUFFO0FBQ3RCLGFBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDdkM7Ozs7Ozs7OztXQU9HLGVBQUc7QUFDTCxXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLFlBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7QUFFckIsWUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDOUQsY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNqQixNQUFNO0FBQ0wsY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNqQjtPQUNGO0tBQ0Y7OztXQUV5Qiw0QkFBQyxDQUFDLEVBQUU7QUFDNUIsVUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDM0IsU0FBQyxDQUFDLEVBQUUsR0FBRyxtQkFBSyxFQUFFLEVBQUUsQ0FBQTtPQUNqQjs7QUFFRCxPQUFDLEdBQUcseUJBQ0YsRUFBRTs7QUFFRiwwQkFBb0I7O0FBRXBCLFVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTs7QUFFekIsT0FBQyxDQUNGLENBQUE7O0FBRUQsVUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDOUIsU0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUNsQjtBQUNELFVBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQy9CLFNBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FDbkI7QUFDRCxhQUFPLENBQUMsQ0FBQTtLQUNUOzs7V0FFeUIsNEJBQUMsQ0FBQyxFQUFFO0FBQzVCLFVBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzNCLFNBQUMsQ0FBQyxFQUFFLEdBQUcsbUJBQUssRUFBRSxFQUFFLENBQUE7T0FDakI7QUFDRCxPQUFDLEdBQUcseUJBQ0YsRUFBRTs7QUFFRiwwQkFBb0I7O0FBRXBCLFVBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTs7QUFFekIsT0FBQyxDQUNGLENBQUE7QUFDRCxhQUFPLENBQUMsQ0FBQTtLQUNUOzs7Ozs7Ozs7Ozs7Ozs7OztXQWVhLGdCQUFDLE9BQU8sRUFBRTtBQUN0QixhQUFPLEdBQUcseUJBQU87QUFDZixhQUFLLEVBQUUsRUFBRTtBQUNULFlBQUksRUFBRSxFQUFFO0FBQ1IsaUJBQVMsRUFBRSxLQUFLO0FBQ2hCLGtCQUFVLEVBQUUsS0FBSztBQUNqQixtQkFBVyxFQUFFLEtBQUs7T0FDbkIsRUFBRSxPQUFPLENBQUMsQ0FBQTs7QUFFWCxVQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ1gsVUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO0FBQ2QsVUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFBO0FBQ3RCLFdBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3JDLHFCQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ3JCLGFBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtPQUN0Qjs7QUFFRCxlQUFTLEdBQUcsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2xCLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtPQUNqRDs7QUFFRCxVQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7QUFDZCxPQUFDLEdBQUcsQ0FBQyxDQUFBOztBQUVMLFVBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtBQUNyQixhQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNyQyxXQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsYUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNULGVBQUssQ0FBQyxJQUFJLENBQUM7QUFDVCxrQkFBTSxFQUFFLENBQUM7QUFDVCxrQkFBTSxFQUFFLENBQUM7V0FDVixDQUFDLENBQUE7U0FDSDtBQUNELFNBQUMsSUFBSSxDQUFDLENBQUE7T0FDUDs7QUFFRCxhQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDL0IsU0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUM3QyxTQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBOztBQUU3QyxZQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO0FBQ25DLFdBQUMsSUFBSSxDQUFDLENBQUE7U0FDUCxNQUFNLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNyRCxXQUFDLElBQUksQ0FBQyxDQUFBO1NBQ1AsTUFBTTtBQUNMLGFBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDVCxlQUFLLENBQUMsSUFBSSxDQUFDO0FBQ1Qsa0JBQU0sRUFBRSxDQUFDO0FBQ1Qsa0JBQU0sRUFBRSxDQUFDO1dBQ1YsQ0FBQyxDQUFBO1NBQ0g7T0FDRjs7QUFFRCxhQUFPO0FBQ0wsYUFBSyxFQUFFLEtBQUs7QUFDWixhQUFLLEVBQUUsS0FBSztPQUNiLENBQUE7S0FDRjs7O1NBMWVrQixLQUFLOzs7cUJBQUwsS0FBSzs7OztBQ3ZCMUIsWUFBWSxDQUFBOzs7Ozs7Ozs7O0lBRU4sTUFBTTtBQUNFLFdBRFIsTUFBTSxDQUNHLENBQUMsRUFBRSxDQUFDLEVBQUU7MEJBRGYsTUFBTTs7QUFFUixRQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNWLFFBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ1g7O2VBSkcsTUFBTTs7Ozs7V0FRQyxhQUFDLENBQUMsRUFBRTtBQUNiLGFBQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzlCOzs7V0FFVSxhQUFDLENBQUMsRUFBRTtBQUNiLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDbEM7OztXQUVZLGVBQUMsQ0FBQyxFQUFFO0FBQ2YsYUFBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzdCOzs7V0FFVyxjQUFDLENBQUMsRUFBRTtBQUNkLFVBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDMUIsY0FBTSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQTtPQUM3QztBQUNELFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDeEIsYUFBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFBO0tBQzlDOzs7V0FFaUIsb0JBQUMsQ0FBQyxFQUFFO0FBQ3BCLGFBQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUM3Qjs7O1dBRWUsa0JBQUMsQ0FBQyxFQUFFO0FBQ2xCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtLQUM1Qzs7Ozs7O1dBSVUsYUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hCLGFBQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3hDOzs7V0FFVSxhQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEIsYUFBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDeEM7OztXQUVVLGFBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQixhQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDN0I7OztXQUVZLGVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsQixhQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7S0FDcEM7OztXQUVVLGFBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQixhQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDM0M7OztXQUVtQixzQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3pCLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNuRTs7O1dBRWEsZ0JBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUN2QixVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzFCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDMUIsVUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7QUFDaEMsVUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7QUFDaEMsYUFBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDMUI7OztTQXBFRyxNQUFNOzs7cUJBdUVHLE1BQU07Ozs7QUN6RXJCLFlBQVksQ0FBQTs7Ozs7QUFFWixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFBO0FBQ2xCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUE7QUFDakMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0FBQ2YsSUFBSSxhQUFhLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUMzRyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNwQyxRQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUNoQyxRQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0NBQ2hELENBQUMsQ0FBQTs7QUFFRixNQUFNLENBQUMsaUJBQWlCLEdBQUcsWUFBWTtBQUNyQyxTQUFPLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO0NBQ3JELENBQUE7O1FBRVEsTUFBTSxHQUFOLE1BQU07OztBQ2ZmLFlBQVksQ0FBQTs7Ozs7Ozs7c0JBSU8sUUFBUTs7OztzQkFDUixXQUFXOzs7O3FCQUNaLFVBQVU7Ozs7QUFKNUIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQTs7cUJBTUgsWUFBWTtBQUN6QixNQUFJLEtBQUssQ0FBQTs7QUFFVCxXQUFTLGdCQUFnQixDQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDeEMsUUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUNwQixRQUFJLElBQUksR0FBRyxvQkFBTyxJQUFJLENBQUMsb0JBQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ2pELFdBQU8sb0JBQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxvQkFBTyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7R0FDckQ7Ozs7Ozs7Ozs7Ozs7O0FBY0QsV0FBUyxRQUFRLENBQUUsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRTtBQUMvQyxRQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzlDLFFBQUksR0FBRyxHQUFHLHdCQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUMxQixTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzNDLFVBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQixVQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNqQixXQUFHLEdBQUcsb0JBQU8sSUFBSSxDQUFDLG9CQUFPLEdBQUcsQ0FDMUIsR0FBRyxFQUNILG9CQUFPLElBQUksQ0FBQyxvQkFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQzlCLENBQUMsQ0FBQTtPQUNIO0tBQ0Y7O0FBRUQsYUFBUyxLQUFLLENBQUUsQ0FBQyxFQUFFO0FBQ2pCLGFBQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFBO0tBQ3pCOzs7QUFHRCxRQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzlCLFNBQUcsR0FBRyxvQkFBTyxJQUFJLENBQUMsd0JBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNyQzs7QUFFRCxRQUFJLEdBQUcsR0FBRyxvQkFBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7OztBQUdoQyxRQUFJLGFBQWEsR0FBRyxvQkFBTyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Ozs7O0FBSzlDLFFBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUEsR0FBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7OztBQUcvQyxRQUFJLFdBQVcsR0FBRyxvQkFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLG9CQUFPLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTs7QUFFcEUsUUFBSSxZQUFZLEdBQUcsb0JBQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxvQkFBTyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTs7O0FBR3RFLFFBQUksTUFBTSxHQUFHLEFBQUMsa0JBQWtCLEdBQUcsR0FBRyxJQUFLLEtBQUssR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JyRCxRQUFJLEVBQUUsR0FBRyxvQkFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLG9CQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFBOztBQUV2RCxRQUFJLE9BQU8sR0FBRyxvQkFBTyxHQUFHLENBQUMsV0FBVyxFQUFFLG9CQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDdEUsUUFBSSxRQUFRLEdBQUcsb0JBQU8sR0FBRyxDQUFDLFlBQVksRUFBRSxvQkFBTyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBOztBQUV4RSxRQUFJLElBQUksR0FBRyxvQkFBTyxHQUFHLENBQUMsT0FBTyxFQUFFLG9CQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0QsUUFBSSxLQUFLLEdBQUcsb0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxvQkFBTyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRWhFLFdBQU87QUFDTCxVQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDO0FBQ2xELFNBQUcsRUFBRSxHQUFHO0tBQ1QsQ0FBQTtHQUNGOzs7Ozs7Ozs7Ozs7QUFZRCxXQUFTLFVBQVUsQ0FBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFO0FBQ2hELFFBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNSLFFBQUksT0FBTyxDQUFBOztBQUVYLEtBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQ1osS0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDWixRQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtpQkFDTixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFBZCxPQUFDO0FBQUUsT0FBQztLQUNOO0FBQ0QsUUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTs7QUFFN0IsV0FBTyxHQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJO0FBQzlDLFdBQUssRUFBRSxDQUFDO0FBQ1IsU0FBRyxFQUFFLG9CQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JCLGVBQVMsRUFBRSxDQUFDLENBQUM7S0FDaEIsQUFBQyxDQUFBOztBQUVGLFFBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTs7QUFFcEIsUUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUU7O0FBRWpCLFVBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pELGlCQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtBQUN2QixPQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7S0FDbEIsTUFBTTtBQUNMLFVBQUksSUFBSSxDQUFBO0FBQ1IsVUFBSSxvQkFBTyxHQUFHLENBQUMsb0JBQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hDLFlBQUksR0FBRyxvQkFBTyxJQUFJLENBQUMsb0JBQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQ3JDLE1BQU07QUFDTCxZQUFJLEdBQUcsd0JBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO09BQ3hCOztBQUVELCtCQUFPLE9BQU8sRUFBRTtBQUNkLFlBQUksRUFBRSxJQUFJO0FBQ1Ysc0JBQWMsRUFBRSxvQkFBTyxVQUFVLENBQUMsSUFBSSxDQUFDO09BQ3hDLENBQUMsQ0FBQTtBQUNGLGlCQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFPLEdBQUcsQ0FDekIsT0FBTyxDQUFDLEdBQUcsRUFDWCxvQkFBTyxLQUFLLENBQ1YsT0FBTyxDQUFDLGNBQWMsRUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQ3ZFLENBQ0YsQ0FBQyxDQUFBO0FBQ0YsT0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO0tBQ3RCOztBQUVELFdBQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFBO0FBQ2xCLFdBQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUE7Ozs7Ozs7Ozs7QUFVdkIsUUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtBQUNyQixRQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQ3JCLFVBQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ25ELFVBQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRXhFLEtBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FDZCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQ25CLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7R0FDcEI7O0FBRUQsTUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQUUsV0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUUsQ0FBQyxDQUM5QixDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFBRSxXQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBRSxDQUFDLENBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDWixXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7OztBQUd4QixXQUFTLEtBQUssQ0FBRSxTQUFTLEVBQUU7O0FBRXpCLFFBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNqQixhQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7S0FDZixFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ2QsYUFBTyxDQUFDLENBQUMsRUFBRSxDQUFBO0tBQ1osQ0FBQyxDQUFBO0FBQ0osU0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FDbEIsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtBQUFFLGFBQU8sbUJBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUFFLENBQUMsQ0FDbEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBOzs7QUFHckIsU0FBSyxDQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNqQixVQUFJLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFCLFVBQUksR0FBRyxHQUFHO0FBQ1IsZ0JBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUTtPQUMvQyxDQUFBO0FBQ0QsU0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQTtBQUNuQyxTQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO0FBQ25DLFVBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDbEIsQ0FBQyxDQUFBOztBQUVKLFFBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNiLFNBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDdEIsZ0JBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0tBQ3hCLENBQUMsQ0FBQTs7O0FBR0YsUUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzs7QUFHakIsYUFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNkLENBQUMsQ0FBQTtBQUNKLFNBQUssQ0FBQyxLQUFLLEVBQUUsQ0FDVixNQUFNLENBQUMsTUFBTSxDQUFDLENBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFBLENBQUM7YUFBSSxDQUFDLENBQUMsTUFBTTtLQUFBLENBQUMsQ0FDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FDM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNwQixVQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFFBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUM5QixVQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxVQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtPQUN6QjtBQUNELFVBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNYLFVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQzFCLFVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO09BQzlCO0tBQ0YsQ0FBQyxDQUFBOzs7Ozs7O0FBT0osdUJBQU0scUJBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUNwRCxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUEsQ0FBQzthQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQUEsQ0FBQyxDQUFBOztBQUUvQixTQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN6QixVQUFJLElBQUksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzFCLFVBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3ZDLFVBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNYLFlBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUN0QixPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQzlCLElBQUksQ0FDVCxDQUFBO09BQ0Y7S0FDRixDQUFDLENBQUE7O0FBRUYsYUFBUyxjQUFjLENBQUUsU0FBUyxFQUFFO0FBQ2xDLGVBQVMsQ0FDTixJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQzlCLFlBQUksS0FBSyxHQUFHLG9CQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbkMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDN0MsZUFBTyxtQkFBTSxTQUFTLENBQUM7QUFDckIsbUJBQVMsRUFBRSxDQUFDO0FBQ1osZ0JBQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUFBO09BQ0gsQ0FBQyxDQUFBO0tBQ0w7O0FBRUQsUUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FDbEMsSUFBSSxDQUFDLFVBQUEsQ0FBQzthQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFBOzs7QUFHakIsV0FBTyxDQUFDLEtBQUssRUFBRSxDQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FDZCxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FDNUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBOzs7QUFHdkIsdUJBQU0scUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUN0RCxJQUFJLENBQUMsVUFBQSxDQUFDO2FBQUksQ0FBQyxDQUFDLE1BQU07S0FBQSxDQUFDLENBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTs7O0FBR3ZCLFdBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FDWCxNQUFNLEVBQUUsQ0FBQTs7O0FBR1gsU0FBSyxDQUFDLElBQUksRUFBRSxDQUNULE1BQU0sRUFBRSxDQUFBO0dBQ1o7O0FBRUQsT0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLEtBQUssRUFBRTtBQUM3QixRQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNyQixhQUFPLEtBQUssQ0FBQTtLQUNiO0FBQ0QsU0FBSyxHQUFHLEtBQUssQ0FBQTtBQUNiLFdBQU8sS0FBSyxDQUFBO0dBQ2IsQ0FBQTs7QUFFRCxTQUFPLEtBQUssQ0FBQTtDQUNiOzs7OztBQy9TRCxZQUFZLENBQUE7Ozs7Ozs7O3FCQUlNLFVBQVU7Ozs7cUJBQ0wsVUFBVTs7QUFIakMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQTs7cUJBS0gsWUFBWTtBQUN6QixNQUFJLEtBQUssQ0FBQTs7QUFFVCxXQUFTLEtBQUssQ0FBRSxTQUFTLEVBQUU7QUFDekIsUUFBSSxLQUFLLEdBQUcsU0FBUyxDQUNsQixTQUFTLENBQUMsUUFBUSxDQUFDLENBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNqQixhQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7S0FDZixFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ2QsYUFBTyxDQUFDLENBQUMsRUFBRSxDQUFBO0tBQ1osQ0FBQyxDQUFBOztBQUVKLFFBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUE7O0FBRXpCLFFBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDMUIsYUFBTyxPQUFPLElBQUksQ0FBQyxTQUFNLElBQUksRUFBRSxDQUFBLEFBQUMsQ0FBQTtLQUNqQyxDQUFDLENBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsRUFBRTtBQUFFLGFBQU8sbUJBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUFFLENBQUMsQ0FDbEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsRUFBRTtBQUM5QixhQUFPLG1CQUFNLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0tBQ3pDLENBQUMsQ0FDRCxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVk7QUFDM0IsVUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixVQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtBQUNaLFVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFBO09BQzlCO0FBQ0QsUUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7S0FDZixDQUFDLENBQ0QsRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZO0FBQzFCLFVBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDeEIsUUFBRSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7QUFDZixRQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUN6QixDQUFDLENBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNyQixLQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JCLEtBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBOztBQUVuQixRQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFDdkQsUUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ25ELFVBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FDVixFQUFFLENBQUMscUJBQXFCLEVBQUUsWUFBWTtBQUNyQyxXQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtBQUN6QixlQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtLQUN0QyxDQUFDLENBQ0QsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFlBQVk7QUFDbkMsV0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7QUFDMUIsYUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7S0FDcEMsQ0FBQyxDQUFBOztBQUVKLEtBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFBLENBQUM7YUFBSSxDQUFDLENBQUMsSUFBSTtLQUFBLENBQUMsQ0FDekIsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFBLENBQUM7YUFBSSxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQTs7O0FBR3RCLEtBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQ2IsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FDN0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLENBQUM7YUFBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7S0FBQSxDQUFDLENBQUE7QUFDakMsU0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2pCLFVBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtBQUNoQixlQUFPLENBQUMsQ0FBQyxLQUFLLENBQUE7T0FDZjtBQUNELGFBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQTtLQUNaLENBQUMsQ0FBQTs7O0FBR0osS0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FDYixPQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0EzRVgsTUFBTSxDQTJFWSxJQUFJLENBQUMsQ0FDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FDNUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFBLENBQUM7YUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQUEsQ0FBQyxDQUMvQixJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUEsQ0FBQzthQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FBQTtBQUNwQyxTQUFLLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNqQixVQUFJLGVBQWUsSUFBSSxDQUFDLEVBQUU7QUFDeEIsZUFBTyxDQUFDLENBQUMsYUFBYSxDQUFBO09BQ3ZCO0tBQ0YsQ0FBQyxDQUFBOzs7QUFHSixLQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNiLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQTFGWCxNQUFNLENBMEZZLElBQUksQ0FBQyxDQUN6QixJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUMxQixJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUEsQ0FBQzthQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFBLENBQUM7YUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7S0FBQSxDQUFDLENBQUE7QUFDcEMsU0FBSyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDakIsVUFBSSxlQUFlLElBQUksQ0FBQyxFQUFFO0FBQ3hCLGVBQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQTtPQUN0QjtLQUNGLENBQUMsQ0FBQTs7O0FBR0osdUJBQU0scUJBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUNwRCxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQzlCLGFBQU8sbUJBQU0sU0FBUyxDQUFDO0FBQ3JCLGlCQUFTLEVBQUUsQ0FBQztPQUNiLENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTs7O0FBR0osU0FBSyxDQUFDLElBQUksRUFBRSxDQUNULE1BQU0sRUFBRSxDQUFBO0dBQ1o7O0FBRUQsT0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLEtBQUssRUFBRTtBQUM3QixRQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNyQixhQUFPLEtBQUssQ0FBQTtLQUNiO0FBQ0QsU0FBSyxHQUFHLEtBQUssQ0FBQTtBQUNiLFdBQU8sS0FBSyxDQUFBO0dBQ2IsQ0FBQTs7QUFFRCxTQUFPLEtBQUssQ0FBQTtDQUNiOzs7OztBQ2pJRCxZQUFZLENBQUE7Ozs7Ozs7O3lCQUVVLGFBQWE7Ozs7OztvQkFNbEIsUUFBUTs7OztxQkFDUCxTQUFTOzs7O3FCQW1CVCxTQUFTOzs7O3FCQUdKLFNBQVM7OzJCQUdiLGdCQUFnQjs7OztBQS9CbkMsNkJBQVcsQ0FBQTs7QUFFWCxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFBOztBQU1sQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUE7O0FBRWxCLFNBQVMsR0FBRyxDQUFFLE9BQU8sRUFBRTtBQUNyQixXQUFTLE9BQU8sQ0FBRSxPQUFPLEVBQUU7QUFDekIsUUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbEMsUUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUM5QixRQUFJLENBQUMsRUFBRSxFQUFFO0FBQ1AsUUFBRSxHQUFHLG1CQUFNLEVBQUUsRUFBRSxDQUFBO0FBQ2YsUUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDekIsZUFBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHNCQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUN0QztBQUNELFdBQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0dBQ3JCOztBQUVELFNBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0NBQ3hCOztBQUdELEdBQUcsQ0FBQyxLQUFLLHFCQUFRLENBQUE7O0FBR2pCLEdBQUcsQ0FBQyxNQUFNLFVBREQsTUFBTSxBQUNJLENBQUE7O0FBR25CLEdBQUcsQ0FBQyxNQUFNLDJCQUFTLENBQUE7O3FCQUVKLEdBQUc7Ozs7QUNyQ2xCLFlBQVksQ0FBQTs7Ozs7Ozs7OztJQUVTLE1BQU07QUFDYixXQURPLE1BQU0sQ0FDWixPQUFPLEVBQUUsS0FBSyxFQUFFOzBCQURWLE1BQU07O0FBRXZCLFFBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0FBQ2QsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7QUFDbEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7OztBQUd0QixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtHQUNsQjs7ZUFSa0IsTUFBTTs7V0FVcEIsZ0JBQUc7QUFDTixVQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDcEMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFBO0FBQzVCLFlBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtPQUMxRDtLQUNGOzs7V0FFSyxpQkFBRztBQUNQLGtCQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ3pCOzs7V0FFSSxnQkFBRztBQUNOLFVBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtBQUNaLFVBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0tBQ2Y7OztTQXhCa0IsTUFBTTs7O3FCQUFOLE1BQU07Ozs7QUNGM0IsWUFBWSxDQUFBOzs7Ozs7Ozs7O0lBRVMsU0FBUztBQUNoQixXQURPLFNBQVMsQ0FDZixRQUFRLEVBQUUsS0FBSyxFQUFFOzBCQURYLFNBQVM7O0FBRTFCLFFBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0FBQ3hCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFBO0FBQ3BELFFBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFBO0FBQ2QsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7R0FDbEI7O2VBTmtCLFNBQVM7O1dBUXhCLGFBQUMsRUFBRSxFQUFFO0FBQ1AsVUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNCLFVBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUNaOzs7V0FFWSxzQkFBQyxTQUFTLEVBQUU7QUFDdkIsVUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQzVCLGVBQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO09BQ2xEOztBQUVELFVBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQ25DLGVBQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQUNoQzs7QUFFRCxVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QyxhQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0tBQzVEOzs7V0FFSSxjQUFDLEtBQUssRUFBRTtBQUNYLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNmLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzlCLFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2QsWUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQUN0QixZQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3JELFlBQUksaUJBQWlCLElBQUksT0FBTyxpQkFBaUIsS0FBSyxRQUFRLEVBQUU7QUFDOUQsY0FBSSxPQUFPLGlCQUFpQixDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDL0MsaUJBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUE7V0FDaEM7U0FDRjs7QUFFRCxZQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWTtBQUM3QyxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUN0QixFQUFFLEtBQUssQ0FBQyxDQUFBO09BQ1Y7S0FDRjs7O1dBRUssaUJBQUc7QUFDUCxZQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ3ZDOzs7U0E5Q2tCLFNBQVM7OztxQkFBVCxTQUFTOzs7O0FDRjlCLFlBQVksQ0FBQTs7Ozs7Ozs7cUJBRU0sU0FBUzs7Ozt5QkFDTCxhQUFhOzs7O3FCQUVwQjtBQUNiLGVBQWEsb0JBQU87QUFDcEIsV0FBUyx3QkFBVztDQUNyQjs7OztBQ1JELFlBQVksQ0FBQTs7Ozs7O3FCQUVHLFlBQVk7O0FBRXpCLEdBQUMsVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3JCLFFBQUk7O0FBQ0YsU0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtLQUNqQyxDQUFDLE9BQU8sR0FBRyxFQUFFOztBQUNaLE9BQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsTUFBTSxFQUFFO0FBQzlELFlBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQixhQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBVSxTQUFTLEVBQUU7QUFDbkMsY0FBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O0FBQ3BDLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO0FBQ2hCLGdCQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDNUIscUJBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEUsZ0JBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNuQyxnQkFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7QUFDWixtQkFBTyxNQUFNLENBQUE7V0FDZCxNQUFNO0FBQ0wsbUJBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO2FBQUE7V0FDcEM7U0FDRixDQUFBO09BQ0YsQ0FBQyxDQUFBO0tBQ0g7R0FDRixDQUFBLENBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7Ozs7OztBQU10QyxRQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxZQUFZO0FBQ3JDLFdBQU8sTUFBTSxDQUFDLHFCQUFxQixJQUNuQyxNQUFNLENBQUMsMkJBQTJCLElBQ2xDLE1BQU0sQ0FBQyx3QkFBd0IsSUFDL0IsTUFBTSxDQUFDLHNCQUFzQixJQUM3QixNQUFNLENBQUMsdUJBQXVCLElBQzlCLHlCQUEwQixRQUFRLGtCQUFtQixPQUFPLEVBQUU7QUFDNUQsWUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0tBQ3ZDLENBQUE7R0FDRixDQUFBLEVBQUcsQ0FBQTs7Ozs7OztBQU9KLFFBQU0sQ0FBQyxjQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFO0FBQzNDLFFBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLElBQ2hDLENBQUMsTUFBTSxDQUFDLDJCQUEyQixJQUNuQyxFQUFFLE1BQU0sQ0FBQyx3QkFBd0IsSUFBSSxNQUFNLENBQUMsOEJBQThCLENBQUEsQUFBQztBQUMzRSxLQUFDLE1BQU0sQ0FBQyxzQkFBc0IsSUFDOUIsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQy9CLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7O0FBRXJDLFFBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDaEMsUUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBOztBQUVmLGFBQVMsSUFBSSxHQUFJO0FBQ2YsVUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7VUFDaEMsS0FBSyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUE7O0FBRXpCLFdBQUssSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDbkU7O0FBRUQsVUFBTSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNyQyxXQUFPLE1BQU0sQ0FBQTtHQUNkLENBQUE7Ozs7OztBQU1ELFFBQU0sQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUM3QyxVQUFNLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FDckUsTUFBTSxDQUFDLDBCQUEwQixHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQ2pGLE1BQU0sQ0FBQyxpQ0FBaUMsR0FBRyxNQUFNLENBQUMsaUNBQWlDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMvRixVQUFNLENBQUMsOEJBQThCLEdBQUcsTUFBTSxDQUFDLDhCQUE4QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FDekYsTUFBTSxDQUFDLDRCQUE0QixHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQ3JGLE1BQU0sQ0FBQyw2QkFBNkIsR0FBRyxNQUFNLENBQUMsNkJBQTZCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUN2RixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7R0FDakM7O0FBQUEsR0FBQTtDQUVGOzs7OztBQ2xGRCxZQUFZLENBQUE7Ozs7Ozs7Ozs7OztxQkFFTSxVQUFVOzs7O3NCQUNULFFBQVE7Ozs7SUFFTixlQUFlO0FBQ3RCLFdBRE8sZUFBZSxDQUNyQixLQUFLLEVBQUU7MEJBREQsZUFBZTs7QUFFaEMsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7QUFDbEIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO0FBQ3hCLFFBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUE7R0FDOUI7O2VBTGtCLGVBQWU7O1dBT1gsa0NBQUc7QUFDeEIsYUFBTyx5QkFBTztBQUNaLGdCQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO0FBQ2pDLGNBQU0sRUFBRSxTQUFTO09BQ2xCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7S0FDN0I7OztXQUVlLHlCQUFDLE9BQU8sRUFBRTtBQUN4QixhQUFPLHlCQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUMxRDs7O1dBRWdCLDRCQUFHO0FBQ2xCLGFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFBO0tBQ3hDOzs7Ozs7Ozs7OztXQVNNLGdCQUFDLEdBQUcsRUFBRTtBQUNYLFVBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLFdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO09BQ1o7QUFDRCxVQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUNmLFdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO09BQ3JCO0FBQ0QsU0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDekIsYUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDbkIsZUFBTyxHQUFHLEdBQUcsbUJBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtPQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNkLENBQUE7S0FDRjs7Ozs7Ozs7O1dBT2lCLDJCQUFDLFNBQVMsRUFBRTtBQUM1QixhQUFPLFNBQVMsQ0FDYixTQUFTLENBQUMsV0FBVyxDQUFDLENBQUE7S0FDMUI7Ozs7Ozs7OztXQU9pQiwyQkFBQyxTQUFTLEVBQUU7QUFDNUIsYUFBTyxTQUFTLENBQ2IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ3ZCOzs7U0E5RGtCLGVBQWU7OztxQkFBZixlQUFlOzs7O0FDTHBDLFlBQVksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztzQkFJTyxRQUFROzs7O3NCQUNULFNBQVM7Ozs7QUFIM0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQTs7QUFLcEIsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFBOztJQUVOLHdCQUF3QjtZQUF4Qix3QkFBd0I7O1dBQXhCLHdCQUF3QjswQkFBeEIsd0JBQXdCOzsrQkFBeEIsd0JBQXdCOzs7ZUFBeEIsd0JBQXdCOzs7Ozs7OztXQU9sQyxvQkFBRztBQUNWLGFBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQzlCLENBQUE7S0FDRjs7Ozs7Ozs7O1dBT1Esb0JBQUc7QUFDVixhQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUM5QixDQUFBO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7OztXQWF1QixpQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzNDLGFBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUNyQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDckMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLENBQUM7ZUFBSyxPQUFPLENBQUMsQ0FBQyxJQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxBQUFDO09BQUEsQ0FBQyxDQUMxQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDckMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLENBQUM7ZUFBSyxDQUFDLENBQUMsQ0FBQztPQUFBLENBQUMsQ0FBQTtLQUN6Qjs7Ozs7Ozs7Ozs7Ozs7OztXQWN3QixrQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzVDLGFBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUNyQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDckMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQzlCLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQztlQUFLLENBQUMsQ0FBQyxNQUFNO09BQUEsQ0FBQyxDQUFBO0tBQ25DOzs7Ozs7Ozs7Ozs7OztXQVl5QixtQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFlO1VBQWIsTUFBTSx5REFBRyxDQUFDLENBQUM7O0FBQ3hELGFBQU8sU0FBUyxDQUNiLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUMzQixJQUFJLENBQUMsWUFBWTtBQUNoQixZQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3hCLFlBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtBQUM3QixVQUFFLENBQ0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQzlCLElBQUksQ0FBQyxrQkFBa0IsRUFBSyxDQUFDLFNBQUksQ0FBQyxDQUFHLENBQ3JDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FDNUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtPQUN0QixDQUFDLENBQ0QsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUN2QixRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUMxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDdEMsWUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0FBQ2xDLFlBQUksV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUE7QUFDNUIsWUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLFlBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pCLGNBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssTUFBTSxFQUFFO0FBQzFCLHdCQUFZLEdBQUcsV0FBVyxDQUFBO1dBQzNCO1NBQ0Y7O0FBRUQsWUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQ25CLHNCQUFZLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQTtTQUMxQzs7QUFFRCxlQUFPLFlBQVksQ0FBQTtPQUNwQixDQUFDLENBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZO0FBQ3ZCLFlBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDeEIsVUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FDOUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO09BQ3RCLENBQUMsQ0FBQTtLQUNMOzs7V0FFYSx1QkFBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUN6QyxhQUFPLEdBQUcseUJBQU87QUFDZixrQkFBVSxFQUFFLElBQUk7QUFDaEIsZUFBTyxFQUFFLEtBQUs7T0FDZixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTs7QUFFbkMsZUFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQy9ELFVBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUN0QixZQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQzlCLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDcEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FDMUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7T0FDbEM7QUFDRCxhQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUN6Qzs7O1dBRU8saUJBQUMsSUFBSSxFQUFFO0FBQ2IsYUFBTyxJQUFJLENBQUMsaUJBQWlCLENBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDdEMsQ0FBQTtLQUNGOzs7V0FFTyxpQkFBQyxJQUFJLEVBQUU7QUFDYixhQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN0QyxDQUFBO0tBQ0Y7Ozs7OztXQUlhLHVCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDNUIsYUFBTyxJQUFJLENBQUMsdUJBQXVCLENBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FDOUIsQ0FBQTtLQUNGOzs7V0FFYSx1QkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzVCLGFBQU8sSUFBSSxDQUFDLHdCQUF3QixDQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQzlCLENBQUE7S0FDRjs7O1dBRXNCLGdDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDckMsYUFBTyxJQUFJLENBQUMsd0JBQXdCLENBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUM5QixDQUFBO0tBQ0Y7OztXQUVzQixnQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3JDLGFBQU8sSUFBSSxDQUFDLHdCQUF3QixDQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FDOUIsQ0FBQTtLQUNGOzs7V0FFc0IsZ0NBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNyQyxhQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQzlCLENBQUE7S0FDRjs7Ozs7O1dBSXFCLCtCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDcEMsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDOUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FDOUIsQ0FBQTtLQUNGOzs7V0FFcUIsK0JBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNwQyxhQUFPLElBQUksQ0FBQyxhQUFhLENBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUM5QixDQUFBO0tBQ0Y7OztXQUVxQiwrQkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQzlCLENBQUE7S0FDRjs7Ozs7O1dBSW9CLDhCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDbkMsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUN2QixJQUFJLENBQUMsTUFBTSxDQUNULElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUNqQyxFQUNELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQzdCLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FBQTtLQUNGOzs7V0FFdUIsaUNBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUN0QyxhQUFPLElBQUksQ0FBQyxhQUFhLENBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FDcEMsRUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUM3QixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUE7S0FDRjs7O1NBaE9rQix3QkFBd0I7OztxQkFBeEIsd0JBQXdCOzs7O0FDVDdDLFlBQVksQ0FBQTs7Ozs7Ozs7MEJBRUksYUFBYTs7OztBQUU3QixJQUFJLElBQUksR0FBRyw2QkFBSSxDQUFDLENBQUMsQ0FBQTs7cUJBRUY7QUFDYixJQUFFLEVBQUUsY0FBWTtBQUNkLFFBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBO0FBQ2QsUUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUN6RCxXQUFPLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUN6Qzs7QUFFRCxXQUFTLEVBQUUsbUJBQVUsQ0FBQyxFQUFFO0FBQ3RCLFFBQUksR0FBRyxLQUFLLENBQUE7QUFDWixRQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUU7QUFDcEIsU0FBRyxvQkFBa0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQUcsQ0FBQTtLQUN4RDtBQUNELFFBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtBQUNqQixTQUFHLGlCQUFlLENBQUMsQ0FBQyxNQUFNLE1BQUcsQ0FBQTtLQUM5QjtBQUNELFFBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtBQUNoQixTQUFHLGdCQUFjLENBQUMsQ0FBQyxLQUFLLE1BQUcsQ0FBQTtLQUM1QjtBQUNELFdBQU8sR0FBRyxDQUFBO0dBQ1g7O0FBRUQsWUFBVSxFQUFFLG9CQUFVLFNBQVMsRUFBRTtBQUMvQixXQUFPLFNBQVMsQ0FDYixVQUFVLENBQUMsUUFBUSxDQUFDLENBQ3BCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FDYixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7R0FDbEI7O0FBRUQsdUJBQXFCLEVBQUUsK0JBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRTtBQUM5QyxRQUFJLFNBQVMsRUFBRTtBQUNiLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUMzQjtBQUNELFdBQU8sRUFBRSxDQUFBO0dBQ1Y7O0FBRUQsSUFBRSxFQUFFLFlBQVUsR0FBRyxFQUFFO0FBQ2pCLFdBQU8sVUFBVSxHQUFHLEdBQUcsQ0FBQTtHQUN4QjtDQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuKlxuKlx0Q09NUFVURTogbGNnXG4qXG4qXG4qXHRERVNDUklQVElPTjpcbipcdFx0LSBBIGxpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgKGxjZykuXG4qXG4qXG4qXHROT1RFUzpcbipcdFx0WzFdIEJhc2VkIG9uIFcuIFByZXNzLCBldCBhbC4sIE51bWVyaWNhbCBSZWNpcGVzIGluIEMgKDJkIGVkLiAxOTkyKVxuKlxuKlxuKlx0VE9ETzpcbipcdFx0WzFdXG4qXG4qXG4qXHRMSUNFTlNFOlxuKlx0XHRNSVRcbipcbipcdENvcHlyaWdodCAoYykgMjAxNC4gcmdpenouXG4qXG4qXG4qXHRBVVRIT1I6XG4qXHRcdHJnaXp6LiBnenRvd24yMjE2QHlhaG9vLmNvbS4gMjAxNC5cbipcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gVkFSSUFCTEVTIC8vXG5cbnZhciBNQVNLID0gMTIzNDU5ODc2LFxuXHRNID0gMjE0NzQ4MzY0Nyxcblx0QSA9IDE2ODA3O1xuXG5cbi8vIExDRyAvL1xuXG4vKipcbiogRlVOQ1RJT046IGxjZyggW3NlZWRdIClcbipcdFJldHVybnMgYSBsaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLiBJZiBub3QgcHJvdmlkZWQgYSBzZWVkLCBhIHNlZWQgaXMgZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSBjdXJyZW50IHRpbWUuXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSBbc2VlZF0gLSByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBzZWVkXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gZ2VuZXJhdG9yXG4qL1xuZnVuY3Rpb24gbGNnKCB2YWwgKSB7XG5cdHZhciBzZWVkO1xuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0aWYgKCB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJyB8fCB2YWwgIT09IHZhbCB8fCB2YWwgJSAxICE9PSAwIHx8IHZhbCA8IDEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnbGNnKCk6OmludmFsaWQgaW5wdXQgYXJndW1lbnQuIFNlZWQgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuJyApO1xuXHRcdH1cblx0XHRzZWVkID0gdmFsO1xuXHR9IGVsc2Uge1xuXHRcdHNlZWQgPSBEYXRlLm5vdygpICUgMTAwMDAwMDAwO1xuXHR9XG5cdC8qKlxuXHQqIEZVTkNUSU9OOiBsY2coIFtOXSApXG5cdCpcdExpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuXG5cdCpcblx0KiBAcGFyYW0ge051bWJlcn0gW05dIC0gbnVtYmVyIG9mIHBzZXVkb3JhbmRvbSBudW1iZXJzIHRvIHJldHVyblxuXHQqIEByZXR1cm5zIHtOdW1iZXJ8QXJyYXl9IHBzZXVkb3JhbmRvbSBmbG9hdGluZy1wb2ludCBudW1iZXIocykgYmV0d2VlbiAwIGFuZCAxXG5cdCovXG5cdHJldHVybiBmdW5jdGlvbiBsY2coIE4gKSB7XG5cdFx0dmFyIGFycixcblx0XHRcdHJhbmQ7XG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHNlZWQgPSAoIEEgKiBzZWVkICkgJSBNO1xuXHRcdFx0cmFuZCA9IHNlZWQgLyBNO1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0cmV0dXJuIHJhbmQ7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIE4gIT09ICdudW1iZXInIHx8IE4gIT09IE4gfHwgTiUxICE9PSAwIHx8IE4gPCAxICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ2xjZygpOjppbnZhbGlkIGlucHV0IGFyZ3VtZW50LiBBcnJheSBsZW5ndGggbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuJyApO1xuXHRcdH1cblx0XHRhcnIgPSBuZXcgQXJyYXkoIE4gKTtcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBOOyBpKysgKSB7XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRzZWVkID0gKCBBICogc2VlZCApICUgTTtcblx0XHRcdGFyclsgaSBdID0gc2VlZCAvIE07XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0fVxuXHRcdHJldHVybiBhcnI7XG5cdH07XG59IC8vIGVuZCBGVU5DVElPTiBsY2coKVxuXG5cbi8vIEVYUE9SVFMgLy9cblxubW9kdWxlLmV4cG9ydHMgPSBsY2c7XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBpc0FycmF5ID0gZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcblx0aWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKTtcblx0fVxuXG5cdHJldHVybiB0b1N0ci5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG5cdGlmICghb2JqIHx8IHRvU3RyLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgaGFzT3duQ29uc3RydWN0b3IgPSBoYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpO1xuXHR2YXIgaGFzSXNQcm90b3R5cGVPZiA9IG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlICYmIGhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG5cdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0aWYgKG9iai5jb25zdHJ1Y3RvciAmJiAhaGFzT3duQ29uc3RydWN0b3IgJiYgIWhhc0lzUHJvdG90eXBlT2YpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBPd24gcHJvcGVydGllcyBhcmUgZW51bWVyYXRlZCBmaXJzdGx5LCBzbyB0byBzcGVlZCB1cCxcblx0Ly8gaWYgbGFzdCBvbmUgaXMgb3duLCB0aGVuIGFsbCBwcm9wZXJ0aWVzIGFyZSBvd24uXG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIG9iaikgey8qKi99XG5cblx0cmV0dXJuIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fSBlbHNlIGlmICgodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykgfHwgdGFyZ2V0ID09IG51bGwpIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdGZvciAoOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzW2ldO1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAob3B0aW9ucyAhPSBudWxsKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbbmFtZV07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKHRhcmdldCAhPT0gY29weSkge1xuXHRcdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRcdGlmIChkZWVwICYmIGNvcHkgJiYgKGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gaXNBcnJheShjb3B5KSkpKSB7XG5cdFx0XHRcdFx0XHRpZiAoY29weUlzQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNBcnJheShzcmMpID8gc3JjIDogW107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNvcHkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBjb3B5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gd2luZG93LmQzXG52YXIgY29sYSA9IHdpbmRvdy5jb2xhXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuaW1wb3J0IG5vZGUgZnJvbSAnLi9lbGVtZW50cy9ub2RlJ1xuaW1wb3J0IGVkZ2UgZnJvbSAnLi9lbGVtZW50cy9lZGdlJ1xuaW1wb3J0IEdyYXBoTWFuYWdlciBmcm9tICcuL0dyYXBoJ1xuaW1wb3J0IEdyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbiBmcm9tICcuL3NlbGVjdG9yL0dyZXVsZXJEZWZhdWx0VHJhbnNpdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhdyB7XG4gIGNvbnN0cnVjdG9yIChpZCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHRoaXMuZXZlbnRzID0gZDMuZGlzcGF0Y2goJ2xheW91dCcsICdmaXJzdExheW91dEVuZCcpXG5cbiAgICB0aGlzLm1hcmtlcklkID0gJ21hcmtlci0nICsgaWRcblxuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMob3B0aW9ucylcblxuICAgIC8vIGdyYXBoIGhhbmRsZXMgdGhlIGludGVyYWN0aW9ucyB3aXRoIHRoZSBkcmF3ZXJcbiAgICB0aGlzLmNyZWF0ZUdyYXBoKClcblxuICAgIC8vIHNlbGVjdG9yIGFuaW1hdGVzIHRoZSBub2Rlcy9lZGdlc1xuICAgIHRoaXMuc2VsZWN0b3IgPSBuZXcgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uKHRoaXMpXG5cbiAgICAvLyBzdWItZWxlbWVudHMgdGhhdCBkcmF3IHN0dWZmXG4gICAgdGhpcy5ub2RlRHJhd2VyID0gbm9kZSgpLm93bmVyKHRoaXMpXG4gICAgdGhpcy5lZGdlRHJhd2VyID0gZWRnZSgpLm93bmVyKHRoaXMpXG5cbiAgICAvLyBjb2xhXG4gICAgdGhpcy5sYXlvdXQgPSBjb2xhLmQzYWRhcHRvcigpXG5cbiAgICB0aGlzLmxheW91dC5vbigndGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYudGljaygpXG4gICAgfSlcblxuICAgIHZhciBmaXJzdEVuZCA9IHRydWVcbiAgICB0aGlzLmxheW91dC5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGZpcnN0RW5kKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzLmZpcnN0TGF5b3V0RW5kKClcbiAgICAgICAgZmlyc3RFbmQgPSBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjcmVhdGVHcmFwaCAoKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLm9wdGlvbnMuZGF0YVxuICAgIHZhciBub2RlcyA9IGRhdGEubm9kZXNcbiAgICB2YXIgbGlua3MgPSBkYXRhLmxpbmtzXG5cbiAgICAvLyBlbXB0eSBhbmQgcmUtYWRkXG4gICAgZGF0YS5ub2RlcyA9IFtdXG4gICAgZGF0YS5saW5rcyA9IFtdXG5cbiAgICB0aGlzLmdyYXBoID0gbmV3IEdyYXBoTWFuYWdlcih0aGlzLCBkYXRhKVxuICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHRoaXMuZ3JhcGguYWRkTm9kZShub2RlKVxuICAgIH0sIHRoaXMpXG4gICAgbGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgdGhpcy5ncmFwaC5hZGRFZGdlKGVkZ2UpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKlxuICAgKiBvcHRpb25zXG4gICAqICAgLSB0YXJnZXQge3N0cmluZ30gc2VsZWN0b3IgdG8gdGhlIGVsZW1lbnQgdG8gaG9sZCB0aGUgZ3JhcGhcbiAgICogICAtIHdpZHRoIHtudW1iZXJ9XG4gICAqICAgLSBoZWlnaHQge251bWJlcn1cbiAgICogICAtIGxhYmVscz10cnVlIHtib29sZWFufSBGYWxzZSB0byBoaWRlIHRoZSB2ZXJ0ZXggbGFiZWxzXG4gICAqICAgLSBkaXJlY3RlZD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBnaXZlIGFuIG9yaWVudGF0aW9uIHRvIHRoZSBlZGdlc1xuICAgKiAgIGhhdmUgYW4gZWRnZVxuICAgKiAgIC0gZGF0YSB7T2JqZWN0fVxuICAgKiAgICAgLSBsaW5rRGlzdGFuY2U9OTAge251bWJlcn0gRm9yY2VkIG1pbiBkaXN0YW5jZSBiZXR3ZWVuIHZlcnRpY2VzIHRoYXRcbiAgICogICAgIC0gY29uc3RyYWludHMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgLSBncm91cHMge0FycmF5W09iamVjdHNdfVxuICAgKiAgICAgLSBub2RlcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAgIC0gcj0xMCB7bnVtYmVyfSBub2RlIHJhZGl1c1xuICAgKiAgICAgLSBsaW5rcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAgIC0gZGlyZWN0ZWQ9ZmFsc2Uge2Jvb2xlYW59IHRydWUgdG8gZ2l2ZSBhbiBvcmllbnRhdGlvbiB0byB0aGlzIGVkZ2VcbiAgICogICAgICAgLSB3ZWlnaHQ9XCJcIiB7c3RyaW5nfSBMYWJlbCBvZiB0aGUgZWRnZSAoY2FuIGJlIHRoZSB3ZWlnaHQpXG4gICAqXG4gICAqL1xuICBkZWZhdWx0T3B0aW9ucyAob3B0aW9ucykge1xuICAgIC8vIGdyYXBoIGRlZmF1bHRzXG4gICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICB3aWR0aDogNzAwLFxuICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICBhbmltYXRpb25UaW1lOiAxMDAwLFxuICAgICAgbGFiZWxzOiB0cnVlLFxuICAgICAgZGlyZWN0ZWQ6IGZhbHNlXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMub3B0aW9ucy5kYXRhID0gZXh0ZW5kKHtcbiAgICAgIG5vZGVzOiBbXSxcbiAgICAgIGxpbmtzOiBbXSxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBjb25zdHJhaW50czogW10sXG4gICAgICBhdm9pZE92ZXJsYXBzOiB0cnVlLFxuICAgICAgc2l6ZTogW29wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0XSxcbiAgICAgIGxpbmtEaXN0YW5jZTogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubGlua0Rpc3RhbmNlIHx8IDgwXG4gICAgICB9XG4gICAgfSwgdGhpcy5vcHRpb25zLmRhdGEpXG4gIH1cblxuICBpbml0TGF5b3V0ICh1cGRhdGVPcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgICBpZiAodXBkYXRlT3B0aW9ucy5za2lwTGF5b3V0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhzZWxmLm9wdGlvbnMuZGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgdmFyIHYgPSBzZWxmLm9wdGlvbnMuZGF0YVtrXVxuICAgICAgc2VsZi5sYXlvdXRba10odilcbiAgICB9LCB0aGlzKVxuXG4gICAgLy8gdGhpcy5sYXlvdXQuc3RhcnQoMTUsIDE1LCAxNSlcbiAgICB0aGlzLmxheW91dC5zdGFydCgpXG4gIH1cblxuICB0aWNrICgpIHtcbiAgICB0aGlzLmVkZ2VHcm91cC5jYWxsKHRoaXMuZWRnZURyYXdlcilcbiAgICB0aGlzLm5vZGVHcm91cC5jYWxsKHRoaXMubm9kZURyYXdlcilcbiAgfVxuXG4gIHVwZGF0ZSAodXBkYXRlT3B0aW9ucykge1xuICAgIHVwZGF0ZU9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgc2tpcExheW91dDogZmFsc2VcbiAgICB9LCB1cGRhdGVPcHRpb25zKVxuXG4gICAgdGhpcy5pbml0TGF5b3V0KHVwZGF0ZU9wdGlvbnMpXG4gICAgdGhpcy5idWlsZCh1cGRhdGVPcHRpb25zKVxuXG4gICAgLy8gdXBkYXRlIGlubmVyIG5vZGVzL2VkZ2VzIGlmIGxheW91dC50aWNrIHdhc24ndCBydW5cbiAgICBpZiAodXBkYXRlT3B0aW9ucy5za2lwTGF5b3V0KSB7XG4gICAgICB0aGlzLnRpY2soKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBidWlsZCAoKSB7XG4gICAgdGhpcy5yb290ID0gZDMuc2VsZWN0KHRoaXMub3B0aW9ucy50YXJnZXQpXG4gICAgICAuc2VsZWN0QWxsKCdzdmcuZ3JldWxlcicpXG4gICAgICAuZGF0YShbdGhpcy5vcHRpb25zXSlcblxuICAgIC8vIGVudGVyXG4gICAgdGhpcy5yb290LmVudGVyID0gdGhpcy5yb290LmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZ3JldWxlcicpXG5cbiAgICAvLyBtYXJrZXIgZGVmXG4gICAgdGhpcy5yb290LmVudGVyXG4gICAgICAuYXBwZW5kKCdzdmc6ZGVmcycpXG4gICAgICAuYXBwZW5kKCdzdmc6bWFya2VyJylcbiAgICAgIC5hdHRyKCdpZCcsIHRoaXMubWFya2VySWQpXG4gICAgICAuYXR0cigndmlld0JveCcsICcwIC01IDEwIDEwJylcbiAgICAgIC5hdHRyKCdyZWZYJywgOSlcbiAgICAgIC5hdHRyKCdtYXJrZXJXaWR0aCcsIDUpXG4gICAgICAuYXR0cignbWFya2VySGVpZ2h0JywgNSlcbiAgICAgIC5hdHRyKCdvcmllbnQnLCAnYXV0bycpXG4gICAgICAuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAuYXR0cignZCcsICdNMCwtNEwxMCwwTDAsNEwyLDAnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsICcwcHgnKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDEpXG4gICAgICAuYXR0cignZmlsbCcsICcjNzc3JylcblxuICAgIC8vIHVwZGF0ZVxuICAgIHRoaXMucm9vdFxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5vcHRpb25zLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpXG5cbiAgICAvLyB3cmFwcGVyIGZvciB0aGUgZWRnZXNcbiAgICB0aGlzLmVkZ2VHcm91cCA9IHRoaXMucm9vdFxuICAgICAgLnNlbGVjdEFsbCgnZy5lZGdlcycpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2QuZGF0YV0gfSlcbiAgICB0aGlzLmVkZ2VHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlcycpXG5cbiAgICAvLyB3cmFwcGVyIGZvciB0aGUgbm9kZXNcbiAgICB0aGlzLm5vZGVHcm91cCA9IHRoaXMucm9vdFxuICAgICAgLnNlbGVjdEFsbCgnZy5ub2RlcycpXG4gICAgICAuZGF0YShmdW5jdGlvbiAoZCkgeyByZXR1cm4gW2QuZGF0YV0gfSlcbiAgICB0aGlzLm5vZGVHcm91cFxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdub2RlcycpXG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlscydcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29uc3QnXG5cbmNvbnN0IE5PREVfREVGQVVMVF9PUFRJT05TID0ge1xuICByOiAxMCxcbiAgZmlsbDogJyMyOTgwQjknXG59XG5cbmNvbnN0IEVER0VfREVGQVVMVF9PUFRJT05TID0ge1xuICBzdHJva2U6IGNvbG9ycy5MSUdIVF9HUkFZXG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzIChhcnIsIGlkKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGFycltpXS5pZCA9PT0gaWQpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoIHtcbiAgY29uc3RydWN0b3IgKG93bmVyLCBkYXRhKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyXG4gICAgdGhpcy5ub2RlcyA9IGRhdGEubm9kZXNcbiAgICB0aGlzLmVkZ2VzID0gZGF0YS5saW5rc1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBub2RlIHRvIHRoZSBncmFwaCwgZWFjaCBvZiB0aGUgYXJndW1lbnRzIG11c3RcbiAgICogYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gaWQge051bWJlcnxzdHJpbmd9XG4gICAqXG4gICAqIE9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSB4IHtudW1iZXJ9IFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhpcyBub2RlIGluIHRoZSBncmFwaCAob25seSBpZiBmaXhlZCA9IHRydWUpXG4gICAqIC0geSB7bnVtYmVyfSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgbm9kZSBpbiB0aGUgZ3JhcGggKG9ubHkgaWYgZml4ZWQgPSB0cnVlKVxuICAgKiAtIGZpeGVkIHtib29sZWFufSBgdHJ1ZWAgdG8gbWFrZSB0aGlzIG5vZGUgbm90IHRvIHBhcnRpY2lwYXRlIGluIHRoZSBsYXlvdXQgcHJvY2Vzc1xuICAgKiAtIGZpbGwge3N0cmluZ30gVGhlIGZpbGwgb2YgdGhlIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgdGhlIG5vZGVcbiAgICogLSByIHtudW1iZXJ9IFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZSB0aGF0IHJlcHJlc2VudHMgdGhlIG5vZGVcbiAgICogLSBsYWJlbCB7c3RyaW5nfSBUaGUgdGV4dCBpbnNpZGUgdGhlIG5vZGUgKGlmIGl0J3Mgbm90IHByZXNlbnQgaXQncyBlcXVhbCB0byB0aGUgYGlkYClcbiAgICogLSB0b3BSaWdodExhYmVsIHtzdHJpbmddIHRoZSB0ZXh0IHNob3duIG9uIHRoZSB0b3AgcmlnaHQgc2lkZSBvZiB0aGUgbm9kZSwgdXNlZnVsXG4gICAqIHRvIHJlcHJlc2VudCBhZGRpdGlvbmFsIGFubm90YXRpb25zXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYW55IG51bWJlciBvZiBhcmd1bWVudHNcbiAgICovXG4gIGFkZE5vZGUgKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzW2ldXG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgICB0aHJvdyBFcnJvcigndGhlIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGAnKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ2V0Tm9kZShjb25maWcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdub2RlIGFscmVhZHkgaW4gc3RvcmUnKVxuICAgICAgfVxuICAgICAgdGhpcy5ub2Rlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmROb2RlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBub2RlIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuICBnZXROb2RlIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNCeUZuKHYgPT4gdi5pZCA9PT0gbm9kZS5pZClbMF1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgbm9kZXMgdGhhdCBzYXRpc2Z5IHRoZSBwYXJhbWV0ZXIgYGZuYCxcbiAgICogYWxpYXMgZm9yIGB0aGlzLm5vZGVzLmZpbHRlcihmbilgXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldE5vZGVzQnlGbiAoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5maWx0ZXIoZm4pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGFkamFjZW50IG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEFkamFjZW50Tm9kZXMgKG5vZGUpIHtcbiAgICB2YXIgYWRqYWNlbnROb2RlcyA9IFtdXG4gICAgdmFyIHRha2VuID0ge31cbiAgICB2YXIgbmV4dFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVkZ2UgPSB0aGlzLmVkZ2VzW2ldXG4gICAgICBuZXh0ID0gbnVsbFxuICAgICAgaWYgKGVkZ2Uuc291cmNlLmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnRhcmdldFxuICAgICAgfSBlbHNlIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2VcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHQgJiYgIXRha2VuW25leHQuaWRdKSB7XG4gICAgICAgIHRha2VuW25leHQuaWRdID0gdHJ1ZVxuICAgICAgICBhZGphY2VudE5vZGVzLnB1c2gobmV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRqYWNlbnROb2Rlc1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBzdWNjZXNzb3Igbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0U3VjY2Vzc29yTm9kZXMgKG5vZGUpIHtcbiAgICB2YXIgc3VjY2Vzc29yID0gW11cbiAgICB2YXIgdGFrZW4gPSB7fVxuICAgIHZhciBuZXh0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV1cbiAgICAgIG5leHQgPSBudWxsXG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0XG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlXG4gICAgICAgIHN1Y2Nlc3Nvci5wdXNoKG5leHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBwcmVkZWNlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRQcmVkZWNlc3Nvck5vZGVzIChub2RlKSB7XG4gICAgdmFyIHByZWRlY2Vzc29yID0gW11cbiAgICB2YXIgdGFrZW4gPSB7fVxuICAgIHZhciBuZXh0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV1cbiAgICAgIG5leHQgPSBudWxsXG4gICAgICBpZiAoZWRnZS50YXJnZXQuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2Uuc291cmNlXG4gICAgICB9XG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlXG4gICAgICAgIHByZWRlY2Vzc29yLnB1c2gobmV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKi9cbiAgcmVtb3ZlTm9kZSAobm9kZSkge1xuICAgIHRoaXMucmVtb3ZlTm9kZXNCeUZuKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdi5pZCA9PT0gbm9kZS5pZFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIG5vZGVzIHN0b3JlZCBpbiBgbm9kZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gbm9kZXNcbiAgICovXG4gIHJlbW92ZU5vZGVzIChub2Rlcykge1xuICAgIC8vIFRPRE86IGltcHJvdmUgbl4yIHJlbW92YWxcbiAgICB0aGlzLnJlbW92ZU5vZGVzQnlGbihmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzKG5vZGVzLCB2LmlkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIG5vZGVzIHRoYXQgc2F0aXNmeSB0aGUgcHJlZGljYXRlXG4gICAqIGBmbmBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG4gIHJlbW92ZU5vZGVzQnlGbiAoZm4pIHtcbiAgICB2YXIgaVxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoZm4odGhpcy5ub2Rlc1tpXSwgaSkpIHtcbiAgICAgICAgLy8gcmVtb3ZlIG5vZGVzXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2Rlcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgLy8gcmVtb3ZlIGluY2lkZW50IGVkZ2VzXG4gICAgICAgIHRoaXMucmVtb3ZlRWRnZXMoXG4gICAgICAgICAgdGhpcy5nZXRJbmNpZGVudEVkZ2VzKG5vZGVbMF0pXG4gICAgICAgIClcbiAgICAgICAgaSAtPSAxXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZWRnZSB0byB0aGUgZ3JhcGgsIGVhY2ggb2YgdGhlIGFyZ3VtZW50cyBtdXN0XG4gICAqIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllc1xuICAgKlxuICAgKiBSZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gc291cmNlIHtudW1iZXJ8T2JqZWN0fSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlIG9yIHRoZSBzb3VyY2Ugbm9kZSBpdHNlbGZcbiAgICogLSB0YXJnZXQge251bWJlcnxPYmplY3R9IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGUgb3IgdGhlIHRhcmdldCBub2RlIGl0c2VsZlxuICAgKlxuICAgKiBPcHRpb25hbCBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIC0gaWQge3N0cmluZ3xPYmplY3R9IElmIGFuIGlkIGlzIG5vdCBwcm92aWRlZCBhbiBhdXRvIGdlbmVyYXRlZCBzdHJpbmcgd2lsbCBiZSBhc3NpZ25lZFxuICAgKiB0byB0aGlzIGVkZ2VcbiAgICogLSBzdHJva2Uge3N0cmluZ30gVGhlIHN0cm9rZSBvZiB0aGUgcGF0aCB0aGF0IHJlcHJlc2VudHMgdGhlIGVkZ2VcbiAgICogLSB3ZWlnaHQge3N0cmluZ30gVGhlIHdlaWdodCBvZiB0aGUgZWRnZVxuICAgKiAtIGRpcmVjdGVkIHtib29sZWFufSBJZiBzZXQgdG8gdHJ1ZSBhbiBhZGRpdGlvbmFsIGFycm93IGlzIGFkZGVkIGF0IHRoZSBlbmQgb2YgdGhlIGVkZ2VcbiAgICpcbiAgICogTk9URTogdGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgKi9cbiAgYWRkRWRnZSAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHNbaV1cblxuICAgICAgaWYgKCFjb25maWcuaGFzT3duUHJvcGVydHkoJ3NvdXJjZScpIHx8ICFjb25maWcuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0aGUgZWRnZSBtdXN0IGhhdmUgdGhlIHByb3BlcnRpZXMgYHNvdXJjZWAgYW5kIGB0YXJnZXRgJylcbiAgICAgIH1cbiAgICAgIHZhciBzb3VyY2UgPSBjb25maWcuc291cmNlXG4gICAgICB2YXIgdGFyZ2V0ID0gY29uZmlnLnRhcmdldFxuXG4gICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgc291cmNlID0gdGhpcy5nZXROb2RlKHsgaWQ6IGNvbmZpZy5zb3VyY2UgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0Tm9kZSh7IGlkOiBjb25maWcudGFyZ2V0IH0pXG4gICAgICB9XG5cbiAgICAgIGlmICghc291cmNlIHx8ICF0YXJnZXQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25ldyBlZGdlIGRvZXMgbm90IGpvaW4gZXhpc3RpbmcgdmVydGljZXMnKVxuICAgICAgfVxuICAgICAgY29uZmlnLnNvdXJjZSA9IHNvdXJjZVxuICAgICAgY29uZmlnLnRhcmdldCA9IHRhcmdldFxuICAgICAgdGhpcy5lZGdlcy5wdXNoKFxuICAgICAgICBHcmFwaC5hcHBlbmRFZGdlRGVmYXVsdHMuY2FsbCh0aGlzLm93bmVyLCBjb25maWcpXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gZWRnZSBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlZGdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZWRnZS5pZCBUaGUgaWQgb2YgdGhlIGVkZ2VcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldEVkZ2UgKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZSA9PiBlLmlkID09PSBlZGdlLmlkKVswXVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBkaXJlY3RlZCBlZGdlcyBmcm9tIHRoZSBub2RlIHdob3NlIGlkIGlzXG4gICAqIGBvcHRpb25zLnNvdXJjZWAgYW5kIHRvIHRoZSBub2RlIHdob3NlIGlkIGlzIGBvcHRpb25zLnRhcmdldGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnNvdXJjZSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy50YXJnZXQgVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRFZGdlc0JldHdlZW4gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy5zb3VyY2UgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMudGFyZ2V0XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgZnJvbSBgb3B0aW9ucy5zb3VyY2VgIHRvIGBvcHRpb25zLnRhcmdldGBcbiAgICogb3IgYG9wdGlvbnMudGFyZ2V0YCB0byBgb3B0aW9ucy5zb3VyY2VgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy5zb3VyY2UgVGhlIGlkIG9mIHRoZSBzb3VyY2Ugbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMudGFyZ2V0IFRoZSBpZCBvZiB0aGUgdGFyZ2V0IG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWxsRWRnZXNCZXR3ZWVuIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gKGUuc291cmNlLmlkID09PSBvcHRpb25zLnNvdXJjZSAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy50YXJnZXQpIHx8XG4gICAgICAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMudGFyZ2V0ICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnNvdXJjZSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZWRnZSBpZGVudGlmaWVkIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlZGdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZWRnZS5pZCBUaGUgaWQgb2YgdGhlIGVkZ2VcbiAgICovXG4gIHJlbW92ZUVkZ2UgKGVkZ2UpIHtcbiAgICB0aGlzLnJlbW92ZUVkZ2VzQnlGbihlID0+IGUuaWQgPT09IGVkZ2UuaWQpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHN0b3JlZCBpbiBgZWRnZXNgLFxuICAgKiBlYWNoIG9iamVjdCBtdXN0IGhhdmUgdGhlIHByb3BlcnR5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gZWRnZXNcbiAgICovXG4gIHJlbW92ZUVkZ2VzIChlZGdlcykge1xuICAgIC8vIFRPRE86IGltcHJvdmUgbl4yIHJlbW92YWxcbiAgICB0aGlzLnJlbW92ZUVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGluY2x1ZGVzKGVkZ2VzLCBlLmlkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlRWRnZXNCeUZuIChmbikge1xuICAgIHZhciBpXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLmVkZ2VzW2ldLCBpKSkge1xuICAgICAgICB0aGlzLmVkZ2VzLnNwbGljZShpLCAxKVxuICAgICAgICBpIC09IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGVkZ2VzIHRoYXQgcmV0dXJuIHRydWUgZm9yIHRoZSBwcmVkaWNhdGUgYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRFZGdlc0J5Rm4gKGZuKSB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZXMuZmlsdGVyKGZuKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBvdXRnb2luZyBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0T3V0Z29pbmdFZGdlcyAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbigoZSkgPT4gZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGluY29taW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRJbmNvbWluZ0VkZ2VzIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKChlKSA9PiBlLnRhcmdldC5pZCA9PT0gbm9kZS5pZClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jaWRlbnQgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY2lkZW50RWRnZXMgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPdXRnb2luZ0VkZ2VzKG5vZGUpXG4gICAgICAuY29uY2F0KHRoaXMuZ2V0SW5jb21pbmdFZGdlcyhub2RlKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGYWNhZGUgdG8gYWRkIG5vZGVzL2VkZ2VzXG4gICAqXG4gICAqIE5PVEU6IHRoZSBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIHBhcmFtZXRlcnNcbiAgICovXG4gIGFkZCAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbCA9IGFyZ3VtZW50c1tpXVxuICAgICAgLy8gYXNzdW1lIHRoYXQgZWRnZXMgaGF2ZSBhIHNvdXJjZS90YXJnZXQgcGFyYW1ldGVyXG4gICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoJ3NvdXJjZScpICYmIGVsLmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xuICAgICAgICB0aGlzLmFkZEVkZ2UoZWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZE5vZGUoZWwpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZE5vZGVEZWZhdWx0cyAodikge1xuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgdi5pZCA9IHV0aWwuaWQoKVxuICAgIH1cblxuICAgIHYgPSBleHRlbmQoXG4gICAgICB7fSxcbiAgICAgIC8vIHByZWRlZmluZWQgZGVmYXVsdHNcbiAgICAgIE5PREVfREVGQVVMVF9PUFRJT05TLFxuICAgICAgLy8gaW5zdGFuY2UgZGVmYXVsdHNcbiAgICAgIHRoaXMub3B0aW9ucy5ub2RlRGVmYXVsdHMsXG4gICAgICAvLyBub2RlXG4gICAgICB2XG4gICAgKVxuXG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCd3aWR0aCcpKSB7XG4gICAgICB2LndpZHRoID0gMiAqIHYuclxuICAgIH1cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ2hlaWdodCcpKSB7XG4gICAgICB2LmhlaWdodCA9IDIgKiB2LnJcbiAgICB9XG4gICAgcmV0dXJuIHZcbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmRFZGdlRGVmYXVsdHMgKGUpIHtcbiAgICBpZiAoIWUuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIGUuaWQgPSB1dGlsLmlkKClcbiAgICB9XG4gICAgZSA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgRURHRV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLmVkZ2VEZWZhdWx0cyxcbiAgICAgIC8vIGVkZ2VcbiAgICAgIGVcbiAgICApXG4gICAgcmV0dXJuIGVcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcmFuZG9tIGdyYXBoIHdpdGggdGhlIGZvbGxvd2luZyBkZWZhdWx0cyBvcHRpb25zIG92ZXJyaWRkZW4gYnkgYG9wdGlvbnNgOlxuICAgKlxuICAgKiAtIG9wdGlvbnMub3JkZXI9MTAge251bWJlcn0gVGhlIG51bWJlciBvZiBub2RlcyBpbiB0aGUgZ3JhcGhcbiAgICogLSBvcHRpb25zLnNpemU9MTUge251bWJlcn0gVGhlIG51bWJlciBvZiBlZGdlcyBpbiB0aGUgZ3JhcGhcbiAgICogLSBvcHRpb25zLmNvbm5lY3RlZD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBtYWtlIHRoZSBncmFwaCBjb25uZWN0ZWQsXG4gICAqIGl0J3MgZ3VhcmFudGVlZCB0byBoYXZlIGF0IGxlYXN0IGBvcHRpb25zLm9yZGVyIC0gMWAgZWRnZXNcbiAgICogLSBvcHRpb25zLm11bHRpR3JhcGg9ZmFsc2Uge2Jvb2xlYW59IFRydWUgdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIHBhcmFsbGVsIGVkZ2VzXG4gICAqIC0gb3B0aW9ucy5wc2V1ZG9HcmFwaD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgbG9vcCBlZGdlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7e25vZGVzOiBBcnJheSwgbGlua3M6IEFycmF5fX1cbiAgICovXG4gIHN0YXRpYyByYW5kb20gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIG9yZGVyOiAxMCxcbiAgICAgIHNpemU6IDE1LFxuICAgICAgY29ubmVjdGVkOiBmYWxzZSxcbiAgICAgIG11bHRpR3JhcGg6IGZhbHNlLFxuICAgICAgcHNldWRvR3JhcGg6IGZhbHNlXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHZhciBpLCB1LCB2XG4gICAgdmFyIG5vZGVzID0gW11cbiAgICB2YXIgYWRqYWNlbmN5TGlzdCA9IFtdXG4gICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMub3JkZXI7IGkgKz0gMSkge1xuICAgICAgYWRqYWNlbmN5TGlzdFtpXSA9IFtdXG4gICAgICBub2Rlcy5wdXNoKHsgaWQ6IGkgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQgKHUsIHYpIHtcbiAgICAgIGFkamFjZW5jeUxpc3RbdV1bdl0gPSBhZGphY2VuY3lMaXN0W3ZdW3VdID0gdHJ1ZVxuICAgIH1cblxuICAgIHZhciBlZGdlcyA9IFtdXG4gICAgaSA9IDBcblxuICAgIGlmIChvcHRpb25zLmNvbm5lY3RlZCkge1xuICAgICAgZm9yIChpID0gMTsgaSA8IG9wdGlvbnMub3JkZXI7IGkgKz0gMSkge1xuICAgICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSlcbiAgICAgICAgYWRkKGksIHYpXG4gICAgICAgIGVkZ2VzLnB1c2goe1xuICAgICAgICAgIHNvdXJjZTogaSxcbiAgICAgICAgICB0YXJnZXQ6IHZcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGkgLT0gMVxuICAgIH1cblxuICAgIGZvciAoOyBpIDwgb3B0aW9ucy5zaXplOyBpICs9IDEpIHtcbiAgICAgIHUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm9yZGVyKVxuICAgICAgdiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMub3JkZXIpXG5cbiAgICAgIGlmICh1ID09PSB2ICYmICFvcHRpb25zLnBzZXVkb0dyYXBoKSB7XG4gICAgICAgIGkgLT0gMVxuICAgICAgfSBlbHNlIGlmIChhZGphY2VuY3lMaXN0W3VdW3ZdICYmICFvcHRpb25zLm11bHRpR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGQodSwgdilcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiB1LFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBub2Rlczogbm9kZXMsXG4gICAgICBsaW5rczogZWRnZXNcbiAgICB9XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBWZWN0b3Ige1xuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gIH1cblxuICAvLyB1bmFyeVxuXG4gIHN0YXRpYyBuZWcgKGEpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcigtYS54LCAtYS55KVxuICB9XG5cbiAgc3RhdGljIGxlbiAoYSkge1xuICAgIHJldHVybiBNYXRoLnNxcnQoVmVjdG9yLmxlblNxKGEpKVxuICB9XG5cbiAgc3RhdGljIGxlblNxIChhKSB7XG4gICAgcmV0dXJuIGEueCAqIGEueCArIGEueSAqIGEueVxuICB9XG5cbiAgc3RhdGljIHVuaXQgKGEpIHtcbiAgICBpZiAoYS54ID09PSAwICYmIGEueSA9PT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBsZW5ndGggb2YgdGhlIHZlY3RvciBpcyAwJylcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuKGEpXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoYS54IC8gbGVuZ3RoLCBhLnkgLyBsZW5ndGgpXG4gIH1cblxuICBzdGF0aWMgb3J0aG9nb25hbCAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLnksIGEueClcbiAgfVxuXG4gIHN0YXRpYyBhbmdsZURlZyAoYSkge1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGEueSwgYS54KSAqIDE4MCAvIE1hdGguUElcbiAgfVxuXG4gIC8vIGJpbmFyeVxuXG4gIHN0YXRpYyBhZGQgKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKyBiLngsIGEueSArIGIueSlcbiAgfVxuXG4gIHN0YXRpYyBzdWIgKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggLSBiLngsIGEueSAtIGIueSlcbiAgfVxuXG4gIHN0YXRpYyBkb3QgKGEsIGIpIHtcbiAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55XG4gIH1cblxuICBzdGF0aWMgc2NhbGUgKGEsIG4pIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggKiBuLCBhLnkgKiBuKVxuICB9XG5cbiAgc3RhdGljIG1pZCAoYSwgYikge1xuICAgIHJldHVybiBWZWN0b3Iuc2NhbGUoVmVjdG9yLmFkZChhLCBiKSwgMC41KVxuICB9XG5cbiAgc3RhdGljIGFuZ2xlQmV0d2VlbiAoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFjb3MoVmVjdG9yLmRvdChhLCBiKSAvIFZlY3Rvci5sZW4oYSkgLSBWZWN0b3IubGVuKGIpKVxuICB9XG5cbiAgc3RhdGljIHJvdGF0ZSAoYSwgYW5nbGUpIHtcbiAgICB2YXIgY29zQSA9IE1hdGguY29zKGFuZ2xlKVxuICAgIHZhciBzaW5BID0gTWF0aC5zaW4oYW5nbGUpXG4gICAgdmFyIG54ID0gYS54ICogY29zQSAtIGEueSAqIHNpbkFcbiAgICB2YXIgbnkgPSBhLnggKiBzaW5BICsgYS55ICogY29zQVxuICAgIHJldHVybiBuZXcgVmVjdG9yKG54LCBueSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWN0b3JcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZDMgPSB3aW5kb3cuZDNcbnZhciBjb2xvciA9IGQzLnNjYWxlLmNhdGVnb3J5MjAoKVxudmFyIGNvbG9ycyA9IHt9XG52YXIgY29sb3JMaXRlcmFscyA9IFsnQkxVRScsICdPUkFOR0UnLCAnR1JFRU4nLCAnUkVEJywgJ1BVUlBMRScsICdCUk9XTicsICdQSU5LJywgJ0dSQVknLCAnWUVMTE9XJywgJ0NZQU4nXVxuY29sb3JMaXRlcmFscy5mb3JFYWNoKGZ1bmN0aW9uIChjLCBpKSB7XG4gIGNvbG9yc1tjXSA9IGNvbG9yLnJhbmdlKClbMiAqIGldXG4gIGNvbG9yc1snTElHSFRfJyArIGNdID0gY29sb3IucmFuZ2UoKVsyICogaSArIDFdXG59KVxuXG5jb2xvcnMucmFuZG9tRnJvbVBhbGV0dGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjb2xvci5yYW5nZSgpW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKV1cbn1cblxuZXhwb3J0IHsgY29sb3JzIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZDMgPSB3aW5kb3cuZDNcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1ZlY3RvcidcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICB2YXIgb3duZXJcblxuICBmdW5jdGlvbiBtb3ZlVG93YXJkc1BvaW50IChwb2ludCwgbWlkZGxlKSB7XG4gICAgdmFyIG1hcmdpbiA9IHBvaW50LnJcbiAgICB2YXIgdW5pdCA9IFZlY3Rvci51bml0KFZlY3Rvci5zdWIobWlkZGxlLCBwb2ludCkpXG4gICAgcmV0dXJuIFZlY3Rvci5hZGQocG9pbnQsIFZlY3Rvci5zY2FsZSh1bml0LCBtYXJnaW4pKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBpbm5lciBwb2ludHMgb2YgYSBsb29wIGVkZ2VcbiAgICpcbiAgICogLSBhbmFseXplcyBlYWNoIGFkamFjZW50IHZlcnRleFxuICAgKiAgLSBmb3IgZWFjaCBlYWNoIGVkZ2UgdS12IG1vdmUgdGhlIG9wcG9zaXRlIHdheSBlLmcuIHYtPnVcbiAgICogIC0gdGhlIHN1bSBvZiB1bml0IHZlY3RvcnMgd2lsbCBnaXZlIHJvdWdobHkgYSBnb29kIGFwcHJveGltYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHUgVmVydGV4XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXJnaW5CZXR3ZWVuRWRnZXMgRGVmaW5lZCBpbiBgY3JlYXRlUGF0aGBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IFRoZSBudW1iZXIgb2YgdS11IGVkZ2VzIGZvdW5kIHlldFxuICAgKiBAcmV0dXJucyB7e3BhdGg6ICpbXSwgZGlyOiAqfX1cbiAgICovXG4gIGZ1bmN0aW9uIHNlbGZMb29wICh1LCBtYXJnaW5CZXR3ZWVuRWRnZXMsIGNvdW50KSB7XG4gICAgdmFyIGFkamFjZW50ID0gb3duZXIuZ3JhcGguZ2V0QWRqYWNlbnROb2Rlcyh1KVxuICAgIHZhciBkaXIgPSBuZXcgVmVjdG9yKDAsIDApXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIHYgPSBhZGphY2VudFtpXVxuICAgICAgaWYgKHUuaWQgIT09IHYuaWQpIHtcbiAgICAgICAgZGlyID0gVmVjdG9yLnVuaXQoVmVjdG9yLmFkZChcbiAgICAgICAgICBkaXIsXG4gICAgICAgICAgVmVjdG9yLnVuaXQoVmVjdG9yLnN1Yih1LCB2KSlcbiAgICAgICAgKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1JhZCAoYSkge1xuICAgICAgcmV0dXJuIGEgKiBNYXRoLlBJIC8gMTgwXG4gICAgfVxuXG4gICAgLy8gbm8gYWRqYWNlbnQgdmVydGljZXNcbiAgICBpZiAoZGlyLnggPT09IDAgJiYgZGlyLnkgPT09IDApIHtcbiAgICAgIGRpciA9IFZlY3Rvci51bml0KG5ldyBWZWN0b3IoMCwgLTEpKVxuICAgIH1cblxuICAgIHZhciBvcnQgPSBWZWN0b3Iub3J0aG9nb25hbChkaXIpXG5cbiAgICAvLyBtb3ZpbmcgdSB0b3dhcmRzIGBkaXJgIGB1LnJgIHVuaXRzXG4gICAgdmFyIHVCb3JkZXJPcmlnaW4gPSBWZWN0b3Iuc2NhbGUoZGlyLCB1LnIgKyA0KVxuICAgIC8vIHZhciB1Qm9yZGVyT3JpZ2luVHdpY2UgPSBWZWN0b3Iuc2NhbGUoZGlyLCB1LnIgKiAyKVxuICAgIC8vIHVEIGlzIG5vdyBpbiB0aGUgZWRnZSBvZiB0aGUgY2lyY2xlLCBtYWtpbmcgYSBsaXR0bGUgYXJjIGluIHRoZSBjaXJjbGVcblxuICAgIC8vIGVuZHBvaW50cyBvZiB0aGUgZWRnZSB3aWxsIGhhdmUgYSBzZXBhcmF0aW9uIG9mIDI1IGRlZywgNTAgZGVnLCA3NSBkZWcsIC4uLlxuICAgIHZhciBhbmdsZSA9IHRvUmFkKDI1KSArIChjb3VudCAtIDEpICogdG9SYWQoMjUpXG5cbiAgICAvLyB0aGUgcG9pbnQgdG8gdGhlIGxlZnQgb2YgdSArIHVCb3JkZXJcbiAgICB2YXIgdUJvcmRlckxlZnQgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5yb3RhdGUodUJvcmRlck9yaWdpbiwgYW5nbGUpKVxuICAgIC8vIHRoZSBwb2ludCB0byB0aGUgcmlnaHQgb2YgdSArIHVCb3JkZXJcbiAgICB2YXIgdUJvcmRlclJpZ2h0ID0gVmVjdG9yLmFkZCh1LCBWZWN0b3Iucm90YXRlKHVCb3JkZXJPcmlnaW4sIC1hbmdsZSkpXG5cbiAgICAvLyBzb21lIGxlbmd0aCBhd2F5IGZyb20gdGhlIG5vZGUgY29tcHV0ZWQgYnkgZG9pbmcgcmFuZG9tIHNhbXBsZXNcbiAgICB2YXIgbGVuZ3RoID0gKG1hcmdpbkJldHdlZW5FZGdlcyAqIDAuNikgKiAoY291bnQgKyAxKVxuXG4gICAgLypcbiAgICAgKiBGb3JtIHRoZSBzaGFwZSBvZiBhIHdlaXJkIHJob21idXNcbiAgICAgKlxuICAgICAqXG4gICAgICogICAgICAgICAgICB1cFxuICAgICAqICAgICAgICAgICAvICBcXFxuICAgICAqICAgICAgICAgIC8gICAgXFxcbiAgICAgKiAgICAgICAgIC8gICAgICBcXFxuICAgICAqICAgICAgICAvICAgICAgICBcXFxuICAgICAqICAgICBsZWZ0ICAgICAgIHJpZ2h0XG4gICAgICogICAgICAgXFwgICAgICAgICAvXG4gICAgICogICAgIGJvcmRlciAgIGJvcmRlclxuICAgICAqXG4gICAgICovXG4gICAgdmFyIHVwID0gVmVjdG9yLmFkZCh1LCBWZWN0b3Iuc2NhbGUoZGlyLCB1LnIgKyBsZW5ndGgpKVxuXG4gICAgdmFyIG1pZExlZnQgPSBWZWN0b3IuYWRkKHVCb3JkZXJMZWZ0LCBWZWN0b3Iuc2NhbGUoZGlyLCBsZW5ndGggKiAwLjUpKVxuICAgIHZhciBtaWRSaWdodCA9IFZlY3Rvci5hZGQodUJvcmRlclJpZ2h0LCBWZWN0b3Iuc2NhbGUoZGlyLCBsZW5ndGggKiAwLjUpKVxuXG4gICAgdmFyIGxlZnQgPSBWZWN0b3IuYWRkKG1pZExlZnQsIFZlY3Rvci5zY2FsZShvcnQsIGxlbmd0aCAvIDQpKVxuICAgIHZhciByaWdodCA9IFZlY3Rvci5hZGQobWlkUmlnaHQsIFZlY3Rvci5zY2FsZShvcnQsIC1sZW5ndGggLyA0KSlcblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbdUJvcmRlckxlZnQsIGxlZnQsIHVwLCByaWdodCwgdUJvcmRlclJpZ2h0XSxcbiAgICAgIGRpcjogb3J0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHBvaW50cyBvZiB0aGUgPHBhdGg+IHRoYXQgcmVwcmVzZW50IGFuIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGQgRWRnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbWV0YSBIb2xkcyB0aGUgZWRnZSBjb3VudCBiZXR3ZWVuIHZlcnRpY2VzLFxuICAgKiB1bml0IHZlY3RvcnMgYW5kIG90aGVyIG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXJnaW5CZXR3ZWVuRWRnZXMgVXNlZCBpbiBib3RoIG5vcm1hbCBhbmRcbiAgICogbG9vcCBlZGdlcyBzZXRzIHRoZSBzZXBhcmF0aW9uIGJldHdlZW4gZWRnZXMgZnJvbSB0aGUgbWlkXG4gICAqIHBvaW50IG9mIHRoZSB2ZXJ0aWNlcyB0aGV5IGpvaW5cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGggKGQsIG1ldGEsIG1hcmdpbkJldHdlZW5FZGdlcykge1xuICAgIHZhciB1LCB2XG4gICAgdmFyIGN1cnJlbnRcblxuICAgIHUgPSBkLnNvdXJjZVxuICAgIHYgPSBkLnRhcmdldFxuICAgIGlmICh1LmlkID4gdi5pZCkge1xuICAgICAgW3UsIHZdID0gW3YsIHVdXG4gICAgfVxuICAgIG1ldGFbdS5pZF0gPSBtZXRhW3UuaWRdIHx8IHt9XG5cbiAgICBjdXJyZW50ID0gKG1ldGFbdS5pZF1bdi5pZF0gPSBtZXRhW3UuaWRdW3YuaWRdIHx8IHtcbiAgICAgICAgY291bnQ6IDEsXG4gICAgICAgIG1pZDogVmVjdG9yLm1pZCh1LCB2KSxcbiAgICAgICAgZGlyZWN0aW9uOiAtMVxuICAgIH0pXG5cbiAgICB2YXIgaW5uZXJKb2ludHMgPSBbXVxuXG4gICAgaWYgKHUuaWQgPT09IHYuaWQpIHtcbiAgICAgIC8vIGFwcGx5IHRoZSBmb2xsb3dpbmcgZm9yIHNlbGYtbG9vcCBlZGdlc1xuICAgICAgdmFyIGxvb3AgPSBzZWxmTG9vcCh1LCBtYXJnaW5CZXR3ZWVuRWRnZXMsIGN1cnJlbnQuY291bnQpXG4gICAgICBpbm5lckpvaW50cyA9IGxvb3AucGF0aFxuICAgICAgZC51bml0ID0gbG9vcC5kaXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVuaXRcbiAgICAgIGlmIChWZWN0b3IubGVuKFZlY3Rvci5zdWIodiwgdSkpKSB7XG4gICAgICAgIHVuaXQgPSBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHYsIHUpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5pdCA9IG5ldyBWZWN0b3IoMSwgMClcbiAgICAgIH1cblxuICAgICAgZXh0ZW5kKGN1cnJlbnQsIHtcbiAgICAgICAgdW5pdDogdW5pdCxcbiAgICAgICAgdW5pdE9ydGhvZ29uYWw6IFZlY3Rvci5vcnRob2dvbmFsKHVuaXQpXG4gICAgICB9KVxuICAgICAgaW5uZXJKb2ludHMucHVzaChWZWN0b3IuYWRkKFxuICAgICAgICBjdXJyZW50Lm1pZCxcbiAgICAgICAgVmVjdG9yLnNjYWxlKFxuICAgICAgICAgIGN1cnJlbnQudW5pdE9ydGhvZ29uYWwsXG4gICAgICAgICAgTWF0aC5mbG9vcihjdXJyZW50LmNvdW50IC8gMikgKiBtYXJnaW5CZXR3ZWVuRWRnZXMgKiBjdXJyZW50LmRpcmVjdGlvblxuICAgICAgICApXG4gICAgICApKVxuICAgICAgZC51bml0ID0gY3VycmVudC51bml0XG4gICAgfVxuXG4gICAgY3VycmVudC5jb3VudCArPSAxXG4gICAgY3VycmVudC5kaXJlY3Rpb24gKj0gLTFcblxuICAgIC8vIHByb2JsZW06IHRoZSBlZGdlIHN0YXJ0cy9lbmRzIGluIHRoZSBjZW50ZXIgb2Ygc29tZSBub2RlXG4gICAgLy9cbiAgICAvLyByZWFsIHNvbHV0aW9uOiByZW5kZXIgdGhlIHBhdGggbm9ybWFsbHkgdGhlbiBjb21wdXRlIHRoZSBwb3NpdGlvbiBvZiBhIHBvaW50XG4gICAgLy8gd2l0aCBgcGF0aC5nZXRQb2ludEF0TGVuZ3RoKHQgKiBsKWAgd2hlcmUgYGxgIGlzIHRoZSBsZW5ndGggb2YgdGhlIHBhdGggYW5kXG4gICAgLy8gYHRgIGFuIGludGVycG9sYXRlZCBwbGFjZSA9IHJhZGl1cyBvZiBlYWNoIG5vZGVcbiAgICAvL1xuICAgIC8vIHNpbXBsZSB0cmljazogc2hvcnRlbiB0aGUgbGVuZ3RoIG9mIHRoZSBlZGdlIGJ5IG1vdmluZyB0aGUgc3RhcnQvZW5kIHBvaW50c1xuICAgIC8vIG9mIHRoZSBlZGdlcyB0b3dhcmQgZWFjaCBvdGhlclxuICAgIHZhciBzb3VyY2UgPSBkLnNvdXJjZVxuICAgIHZhciB0YXJnZXQgPSBkLnRhcmdldFxuICAgIHNvdXJjZSA9IG1vdmVUb3dhcmRzUG9pbnQoZC5zb3VyY2UsIGlubmVySm9pbnRzWzBdKVxuICAgIHRhcmdldCA9IG1vdmVUb3dhcmRzUG9pbnQoZC50YXJnZXQsIGlubmVySm9pbnRzW2lubmVySm9pbnRzLmxlbmd0aCAtIDFdKVxuXG4gICAgZC5wYXRoID0gW3NvdXJjZV1cbiAgICAgIC5jb25jYXQoaW5uZXJKb2ludHMpXG4gICAgICAuY29uY2F0KFt0YXJnZXRdKVxuICB9XG5cbiAgdmFyIGxpbmUgPSBkMy5zdmcubGluZSgpXG4gICAgLngoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueCB9KVxuICAgIC55KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnkgfSlcbiAgICAudGVuc2lvbigxLjUpXG4gICAgLmludGVycG9sYXRlKCdidW5kbGUnKVxuICAgIC8vIC5pbnRlcnBvbGF0ZSgnbGluZWFyJylcblxuICBmdW5jdGlvbiBpbm5lciAoc2VsZWN0aW9uKSB7XG4gICAgLy8gZWRnZXNcbiAgICB2YXIgbGlua3MgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKCdnLmVkZ2UnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubGlua3NcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkXG4gICAgICB9KVxuICAgIGxpbmtzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiB1dGlscy5ucyhkLmlkKSB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcblxuICAgIC8vIHVwZGF0ZVxuICAgIGxpbmtzXG4gICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICB2YXIgc2VsZiA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICB2YXIgY2xzID0ge1xuICAgICAgICAgIGRpcmVjdGVkOiBkLmRpcmVjdGVkIHx8IG93bmVyLm9wdGlvbnMuZGlyZWN0ZWRcbiAgICAgICAgfVxuICAgICAgICBjbHNbJ3NvdXJjZS0nICsgZC5zb3VyY2UuaWRdID0gdHJ1ZVxuICAgICAgICBjbHNbJ3RhcmdldC0nICsgZC50YXJnZXQuaWRdID0gdHJ1ZVxuICAgICAgICBzZWxmLmNsYXNzZWQoY2xzKVxuICAgICAgfSlcblxuICAgIHZhciBtZXRhID0ge31cbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICBjcmVhdGVQYXRoKGQsIG1ldGEsIDE3KVxuICAgIH0pXG5cbiAgICAvLyBwYXRoIGVudGVyXG4gICAgdmFyIHBhdGhzID0gbGlua3Muc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIDEuIHJlYWwgcGF0aFxuICAgICAgICAvLyAyLiBzdHJva2UtZGFzaGFycmF5IGhlbHBlclxuICAgICAgICByZXR1cm4gW2QsIGRdXG4gICAgICB9KVxuICAgIHBhdGhzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIGQgPT4gZC5zdHJva2UpXG4gICAgICAuYXR0cignZmlsbCcsICd0cmFuc3BhcmVudCcpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMilcbiAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICBlbC5hdHRyKCdvcGFjaXR5JywgIWkgPyAxIDogMClcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBlbC5jbGFzc2VkKCdiYXNlJywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgIGVsLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDUpXG4gICAgICAgICAgZWwuY2xhc3NlZCgndHJhdmVyc2FsJywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC8vIC5hdHRyKCdkJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpXG4gICAgICAvLyAgcmV0dXJuIGxpbmUoW3BhcmVudC5zb3VyY2VdKVxuICAgICAgLy8gfSlcblxuICAgIC8vIHBhdGggdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKHBhdGhzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IGxpbmUoZC5wYXRoKSlcblxuICAgIHBhdGhzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICB2YXIgcGFyZW50ID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSlcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHBhdGguYXR0cignbWFya2VyLWVuZCcsXG4gICAgICAgICAgcGFyZW50LmNsYXNzZWQoJ2RpcmVjdGVkJylcbiAgICAgICAgICAgID8gJ3VybCgjJyArIG93bmVyLm1hcmtlcklkICsgJyknXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB3ZWlnaHRQb3NpdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgdmFyIGFuZ2xlID0gVmVjdG9yLmFuZ2xlRGVnKGQudW5pdClcbiAgICAgICAgICB2YXIgdiA9IGQucGF0aFtNYXRoLmZsb29yKGQucGF0aC5sZW5ndGggLyAyKV1cbiAgICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdixcbiAgICAgICAgICAgIHJvdGF0ZTogYW5nbGVcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHZhciB3ZWlnaHRzID0gbGlua3Muc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgIC5kYXRhKGQgPT4gW2RdKVxuXG4gICAgLy8gd2VpZ2h0IGVudGVyXG4gICAgd2VpZ2h0cy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICd0ZXh0LWFmdGVyLWVkZ2UnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbilcblxuICAgIC8vIHdlaWdodCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24od2VpZ2h0cywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC50ZXh0KGQgPT4gZC53ZWlnaHQpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbilcblxuICAgIC8vIHdlaWdodCBleGl0XG4gICAgd2VpZ2h0cy5leGl0KClcbiAgICAgIC5yZW1vdmUoKVxuXG4gICAgLy8gZXhpdFxuICAgIGxpbmtzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpXG4gIH1cblxuICBpbm5lci5vd25lciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG93bmVyXG4gICAgfVxuICAgIG93bmVyID0gdmFsdWVcbiAgICByZXR1cm4gaW5uZXJcbiAgfVxuXG4gIHJldHVybiBpbm5lclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICB2YXIgb3duZXJcblxuICBmdW5jdGlvbiBpbm5lciAoc2VsZWN0aW9uKSB7XG4gICAgdmFyIG5vZGVzID0gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGUnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubm9kZXNcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkXG4gICAgICB9KVxuXG4gICAgdmFyIGxheW91dCA9IG93bmVyLmxheW91dFxuXG4gICAgdmFyIGcgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gJ25vZGUgJyArIChkLmNsYXNzIHx8ICcnKVxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiB1dGlscy5ucyhkLmlkKSB9KVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oeyB0cmFuc2xhdGU6IGQgfSlcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIGlmICghZWwub3Zlcikge1xuICAgICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpXG4gICAgICAgIH1cbiAgICAgICAgZWwub3ZlciA9IHRydWVcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgZWwub3ZlciA9IGZhbHNlXG4gICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCBudWxsKVxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICBnLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICBnLmNhbGwobGF5b3V0LmRyYWcpXG5cbiAgICB2YXIgZHJhZ1N0YXJ0ID0gbGF5b3V0LmRyYWcoKS5vbignZHJhZ3N0YXJ0LmQzYWRhcHRvcicpXG4gICAgdmFyIGRyYWdFbmQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnZW5kLmQzYWRhcHRvcicpXG4gICAgbGF5b3V0LmRyYWcoKVxuICAgICAgLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSB0cnVlXG4gICAgICAgIGRyYWdTdGFydC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cylcbiAgICAgIH0pXG4gICAgICAub24oJ2RyYWdlbmQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSBmYWxzZVxuICAgICAgICBkcmFnRW5kLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKVxuICAgICAgfSlcblxuICAgIGcuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IGQuZmlsbClcbiAgICAgIC5hdHRyKCdyJywgZCA9PiBkLnIpXG5cbiAgICAvLyBpbm5lciBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdsYWJlbCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsICd3aGl0ZScpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzEycHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuYXR0cigneScsIChkKSA9PiBkLmhlaWdodCAvIDQpXG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0LmxhYmVsJylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgnbGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5sYWJlbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkLmlkXG4gICAgICB9KVxuXG4gICAgLy8gdG9wLXJpZ2h0IGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ291dGVyLXRvcC1yaWdodCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsIGNvbG9ycy5CTFVFKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgIC5hdHRyKCd4JywgZCA9PiBkLndpZHRoIC8gMiAtIDIpXG4gICAgICAuYXR0cigneScsIGQgPT4gLWQuaGVpZ2h0IC8gMiArIDMpXG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0Lm91dGVyLXRvcC1yaWdodCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BSaWdodExhYmVsXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAvLyB0b3AtbGVmdCBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdvdXRlci10b3AtbGVmdCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsIGNvbG9ycy5CTFVFKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAuYXR0cigneCcsIGQgPT4gLWQud2lkdGggLyAyIC0gMilcbiAgICAgIC5hdHRyKCd5JywgZCA9PiAtZC5oZWlnaHQgLyAyICsgMylcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLWxlZnQnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCd0b3BSaWdodExhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9wTGVmdExhYmVsXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAvLyB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24obm9kZXMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7XG4gICAgICAgICAgdHJhbnNsYXRlOiBkXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgLy8gZXhpdFxuICAgIG5vZGVzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpXG4gIH1cblxuICBpbm5lci5vd25lciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG93bmVyXG4gICAgfVxuICAgIG93bmVyID0gdmFsdWVcbiAgICByZXR1cm4gaW5uZXJcbiAgfVxuXG4gIHJldHVybiBpbm5lclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBwb2x5ZmlsbHMgZnJvbSAnLi9wb2x5ZmlsbHMnXG5wb2x5ZmlsbHMoKVxuXG52YXIgZDMgPSB3aW5kb3cuZDNcblxuLy8gbm9kZVxuaW1wb3J0IERyYXcgZnJvbSAnLi9EcmF3J1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnXG5cbnZhciBpbnN0YW5jZXMgPSBbXVxuXG5mdW5jdGlvbiBydW4gKG9wdGlvbnMpIHtcbiAgZnVuY3Rpb24gZmFjdG9yeSAob3B0aW9ucykge1xuICAgIHZhciBlbCA9IGQzLnNlbGVjdChvcHRpb25zLnRhcmdldClcbiAgICB2YXIgaWQgPSBlbC5hdHRyKCdncmV1bGVyLWlkJylcbiAgICBpZiAoIWlkKSB7XG4gICAgICBpZCA9IHV0aWxzLmlkKClcbiAgICAgIGVsLmF0dHIoJ2dyZXVsZXItaWQnLCBpZClcbiAgICAgIGluc3RhbmNlc1tpZF0gPSBuZXcgRHJhdyhpZCwgb3B0aW9ucylcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlc1tpZF1cbiAgfVxuXG4gIHJldHVybiBmYWN0b3J5KG9wdGlvbnMpXG59XG5cbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJ1xucnVuLkdyYXBoID0gR3JhcGhcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi9jb25zdCdcbnJ1bi5jb2xvcnMgPSBjb2xvcnNcblxuaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllci9pbmRleCdcbnJ1bi5wbGF5ZXIgPSBwbGF5ZXJcblxuZXhwb3J0IGRlZmF1bHQgcnVuXG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKGFjdGlvbnMsIHNwZWVkKSB7XG4gICAgdGhpcy5pbmRleCA9IDBcbiAgICB0aGlzLnNwZWVkID0gc3BlZWRcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zXG5cbiAgICAvLyBzdGF0ZXNcbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFjdGlvbnNbdGhpcy5pbmRleCsrXSgpXG4gICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLnBsYXkuYmluZCh0aGlzKSwgdGhpcy5zcGVlZClcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICB0aGlzLmluZGV4ID0gMFxuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvciAoaW5zdGFuY2UsIHNwZWVkKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkIHx8IGluc3RhbmNlLm9wdGlvbnMuYW5pbWF0aW9uVGltZVxuICAgIHRoaXMuZm4gPSBudWxsXG4gICAgdGhpcy50aW1lciA9IG51bGxcbiAgfVxuXG4gIHJ1biAoZm4pIHtcbiAgICB0aGlzLmZuID0gZm4odGhpcy5pbnN0YW5jZSlcbiAgICB0aGlzLnBsYXkoKVxuICB9XG5cbiAgcnVuQW5pbWF0aW9uIChhbmltYXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhbmltYXRpb24pKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uLmZvckVhY2godGhpcy5ydW5BbmltYXRpb24sIHRoaXMpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhbmltYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb24odGhpcy5pbnN0YW5jZSlcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHRoaXMuaW5zdGFuY2VbYW5pbWF0aW9uLnR5cGVdXG4gICAgcmV0dXJuIHR5cGVbYW5pbWF0aW9uLm9wXS5hcHBseSh0eXBlLCBhbmltYXRpb24uYXJncyB8fCBbXSlcbiAgfVxuXG4gIHBsYXkgKHZhbHVlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdmFyIG5leHQgPSB0aGlzLmZuLm5leHQodmFsdWUpXG4gICAgaWYgKCFuZXh0LmRvbmUpIHtcbiAgICAgIHZhciBkZWxheSA9IHRoaXMuc3BlZWRcbiAgICAgIHZhciBydW5BbmltYXRpb25WYWx1ZSA9IHRoaXMucnVuQW5pbWF0aW9uKG5leHQudmFsdWUpXG4gICAgICBpZiAocnVuQW5pbWF0aW9uVmFsdWUgJiYgdHlwZW9mIHJ1bkFuaW1hdGlvblZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodHlwZW9mIHJ1bkFuaW1hdGlvblZhbHVlLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGRlbGF5ID0gcnVuQW5pbWF0aW9uVmFsdWUuZGVsYXlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRpbWVyID0gd2luZG93LnJlcXVlc3RUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5wbGF5KG5leHQudmFsdWUpXG4gICAgICB9LCBkZWxheSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgd2luZG93LmNsZWFyUmVxdWVzdFRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBGaXhlZCBmcm9tICcuL0ZpeGVkJ1xuaW1wb3J0IEdlbmVyYXRvciBmcm9tICcuL0dlbmVyYXRvcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBGaXhlZEludGVydmFsOiBGaXhlZCxcbiAgR2VuZXJhdG9yOiBHZW5lcmF0b3Jcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8qZXNsaW50LWRpc2FibGUgKi9cbiAgKGZ1bmN0aW9uIChkb2MsIHByb3RvKSB7XG4gICAgdHJ5IHsgLy8gY2hlY2sgaWYgYnJvd3NlciBzdXBwb3J0cyA6c2NvcGUgbmF0aXZlbHlcbiAgICAgIGRvYy5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgYm9keScpXG4gICAgfSBjYXRjaCAoZXJyKSB7IC8vIHBvbHlmaWxsIG5hdGl2ZSBtZXRob2RzIGlmIGl0IGRvZXNuJ3RcbiAgICAgIFsncXVlcnlTZWxlY3RvcicsICdxdWVyeVNlbGVjdG9yQWxsJ10uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgIHZhciBuYXRpdmUgPSBwcm90b1ttZXRob2RdXG4gICAgICAgIHByb3RvW21ldGhvZF0gPSBmdW5jdGlvbiAoc2VsZWN0b3JzKSB7XG4gICAgICAgICAgaWYgKC8oXnwsKVxccyo6c2NvcGUvLnRlc3Qoc2VsZWN0b3JzKSkgeyAvLyBvbmx5IGlmIHNlbGVjdG9ycyBjb250YWlucyA6c2NvcGVcbiAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuaWQgLy8gcmVtZW1iZXIgY3VycmVudCBlbGVtZW50IGlkXG4gICAgICAgICAgICB0aGlzLmlkID0gJ0lEXycgKyBEYXRlLm5vdygpIC8vIGFzc2lnbiBuZXcgdW5pcXVlIGlkXG4gICAgICAgICAgICBzZWxlY3RvcnMgPSBzZWxlY3RvcnMucmVwbGFjZSgvKChefCwpXFxzKik6c2NvcGUvZywgJyQxIycgKyB0aGlzLmlkKTsgLy8gcmVwbGFjZSA6c2NvcGUgd2l0aCAjSURcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBkb2NbbWV0aG9kXShzZWxlY3RvcnMpXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQgLy8gcmVzdG9yZSBwcmV2aW91cyBpZFxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlLmNhbGwodGhpcywgc2VsZWN0b3JzKSAvLyB1c2UgbmF0aXZlIGNvZGUgZm9yIG90aGVyIHNlbGVjdG9yc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pKHdpbmRvdy5kb2N1bWVudCwgRWxlbWVudC5wcm90b3R5cGUpXG5cbiAgLy8gZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qb2VsYW1iZXJ0LzEwMDIxMTZcbiAgLy9cbiAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgc2hpbSBieSBQYXVsIElyaXNoXG4gIC8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoIC8qIGZ1bmN0aW9uICovIGNhbGxiYWNrLCAvKiBET01FbGVtZW50ICovIGVsZW1lbnQpIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApXG4gICAgfVxuICB9KSgpXG5cbiAgLyoqXG4gICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgc2V0VGltZW91dCBleGNlcHQgdXNlcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZSBwb3NzaWJsZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2ludH0gZGVsYXkgVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgd2luZG93LnJlcXVlc3RUaW1lb3V0ID0gZnVuY3Rpb24gKGZuLCBkZWxheSkge1xuICAgIGlmICggIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICF3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhKHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSkgJiYgLy8gRmlyZWZveCA1IHNoaXBzIHdpdGhvdXQgY2FuY2VsIHN1cHBvcnRcbiAgICAgICF3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgIXdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmbiwgZGVsYXkpXG5cbiAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIHZhciBoYW5kbGUgPSB7fVxuXG4gICAgZnVuY3Rpb24gbG9vcCAoKSB7XG4gICAgICB2YXIgY3VycmVudCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICBkZWx0YSA9IGN1cnJlbnQgLSBzdGFydFxuXG4gICAgICBkZWx0YSA+PSBkZWxheSA/IGZuLmNhbGwoKSA6IGhhbmRsZS52YWx1ZSA9IHJlcXVlc3RBbmltRnJhbWUobG9vcClcbiAgICB9XG5cbiAgICBoYW5kbGUudmFsdWUgPSByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApXG4gICAgcmV0dXJuIGhhbmRsZVxuICB9XG5cbiAgLyoqXG4gICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgY2xlYXJUaW1lb3V0IGV4Y2VwdCB1c2VzIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHdoZXJlIHBvc3NpYmxlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICogQHBhcmFtIHtpbnR8b2JqZWN0fSBoYW5kbGUgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICB3aW5kb3cuY2xlYXJSZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOiAvKiBTdXBwb3J0IGZvciBsZWdhY3kgQVBJICovXG4gICAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVx0PyB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpXG4gIH1cbi8qZXNsaW50LWVuYWJsZSAqL1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscydcbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50U2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvciAob3duZXIpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICB0aGlzLmdyYXBoID0gb3duZXIuZ3JhcGhcbiAgICB0aGlzLmRlZmF1bHRTdHlsZU9wdGlvbnMgPSB7fVxuICB9XG5cbiAgZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucyAoKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICBkdXJhdGlvbjogdGhpcy5nZXRBbmltYXRpb25UaW1lKCksXG4gICAgICBzdHJva2U6ICcjRTc0QzNDJ1xuICAgIH0sIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucylcbiAgfVxuXG4gIGdldFN0eWxlT3B0aW9ucyAob3B0aW9ucykge1xuICAgIHJldHVybiBleHRlbmQoe30sIHRoaXMuZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucygpLCBvcHRpb25zKVxuICB9XG5cbiAgZ2V0QW5pbWF0aW9uVGltZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXIub3B0aW9ucy5hbmltYXRpb25UaW1lXG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzIHJldHVybmVkIGJ5IHRoZSBHcmFwaCBjbGFzcyB0aGlzIG1ldGhvZHMgcmV0dXJuc1xuICAgKiB0aGUgZDMgc2VsZWN0aW9uIHRoYXQgZm9yIGFsbCB0aG9zZSBvYmplY3RzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W118T2JqZWN0fSBlbHMgQW4gYXJyYXkgb2YgZWRnZXMvbm9kZXMgb3IgYSBzaW5nbGUgZWRnZS9ub2RlXG4gICAqIEByZXR1cm4ge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIHNlbGVjdCAoZWxzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVscykpIHtcbiAgICAgIGVscyA9IFtlbHNdXG4gICAgfVxuICAgIGlmICghZWxzLmxlbmd0aCkge1xuICAgICAgZWxzLnB1c2goeyBpZDogLTEgfSlcbiAgICB9XG4gICAgZWxzID0gZWxzLmZpbHRlcihCb29sZWFuKVxuICAgIHJldHVybiB0aGlzLm93bmVyLnJvb3Quc2VsZWN0QWxsKFxuICAgICAgZWxzLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gJyMnICsgdXRpbHMubnMoZS5pZClcbiAgICAgIH0pLmpvaW4oJywgJylcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgcGF0aCBpbnNpZGUgdGhlIHRhZyA8Zz4gdGhhdCByZXByZXNlbnRzIGFuIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKi9cbiAgaW5uZXJFZGdlU2VsZWN0b3IgKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGguYmFzZScpXG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgY2lyY2xlIGluc2lkZSB0aGUgdGFnIDxnPiB0aGF0IHJlcHJlc2VudHMgYSBub2RlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICovXG4gIGlubmVyTm9kZVNlbGVjdG9yIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBkMyA9IHdpbmRvdy5kM1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJ1xuXG52YXIgSElHSExJR0hUID0gJ2hpZ2hsaWdodCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGV4dGVuZHMgR3JhcGgge1xuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXRFZGdlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmVkZ2VzKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgbm9kZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXROb2RlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLm5vZGVzKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIGEgbm9kZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBpbmNyZWFzZSB0aGUgcmFkaXVzIHRvIDEuNXggdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKiAtIGRlY3JlYXNlIHRoZSByYWRpdXMgdG8gdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUgKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBvcHRpb25zLnIgfHwgKGQuciAqIDEuNSkpXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gZC5yKVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYW4gZWRnZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBjaGFuZ2UgdGhlIHN0cm9rZSBvZiB0aGUgYHBhdGhgIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZSB0b1xuICAgKiBgb3B0aW9ucy5zdHJva2VgXG4gICAqIC0gY2hhbmdlIHRoZSBzdHJva2UgdG8gdGhlIG9yaWdpbmFsIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICBkb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMgKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIChkKSA9PiBkLnN0cm9rZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBFZGdlIHRyYXZlcnNhbCBhbmltYXRpb24sIGl0IGFuaW1hdGVzIGEgaGlkZGVuIHBhdGggZ2l2aW5nIHRoZSBpbXByZXNzaW9uXG4gICAqIG9mIG1vdmVtZW50LCBpZiBzb3VyY2UgaXMgZ2l2ZW4gdGhlbiBpdCB3aWxsIGFsd2F5cyBzdGFydCB0aGUgYW5pbWF0aW9uXG4gICAqIGZyb20gdGhlIG5vZGUgYHNvdXJjZWAgZXZlbiBpZiB0aGUgZWRnZSBpcyBhbiBpbmNvbWluZyBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtjb25maWd9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzb3VyY2U9LTFdXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgdHJhdmVyc2VFZGdlV2l0aERpcmVjdGlvbiAoc2VsZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UgPSAtMSkge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudHJhdmVyc2FsJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpXG4gICAgICAgIGVsXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7bH0gJHtsfWApXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgbClcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpXG4gICAgICB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2Rhc2hhcnJheScpXG4gICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmdldFRvdGFsTGVuZ3RoKClcbiAgICAgICAgdmFyIHR3aWNlTGVuZ3RoID0gbGVuZ3RoICogMlxuICAgICAgICB2YXIgbGVuZ3RoVG9Nb3ZlID0gMFxuICAgICAgICBpZiAoc291cmNlICE9PSAtMSkge1xuICAgICAgICAgIGlmIChkLnRhcmdldC5pZCA9PT0gc291cmNlKSB7XG4gICAgICAgICAgICBsZW5ndGhUb01vdmUgPSB0d2ljZUxlbmd0aFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICBsZW5ndGhUb01vdmUgPSB0d2ljZUxlbmd0aCAtIGxlbmd0aFRvTW92ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlbmd0aFRvTW92ZVxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICBlbC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgbnVsbClcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIH0pXG4gIH1cblxuICB0cmF2ZXJzZUVkZ2VzIChzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSkge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAga2VlcFN0cm9rZTogdHJ1ZSxcbiAgICAgIHJldmVyc2U6IGZhbHNlXG4gICAgfSwgdGhpcy5nZXRTdHlsZU9wdGlvbnMoKSwgb3B0aW9ucylcblxuICAgIHNlbGVjdGlvbi5jYWxsKHRoaXMudHJhdmVyc2VFZGdlV2l0aERpcmVjdGlvbiwgb3B0aW9ucywgc291cmNlKVxuICAgIGlmIChvcHRpb25zLmtlZXBTdHJva2UpIHtcbiAgICAgIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgICAudHJhbnNpdGlvbigndXBkYXRlJylcbiAgICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICB9XG5cbiAgZ2V0Tm9kZSAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXROb2RlKG5vZGUpKVxuICAgIClcbiAgfVxuXG4gIGdldEVkZ2UgKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0RWRnZShlZGdlKSlcbiAgICApXG4gIH1cblxuICAvLyB0ZW1wb3JhbCBoaWdobGlnaHRcblxuICBoaWdobGlnaHROb2RlIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE5vZGUobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICBoaWdobGlnaHRFZGdlIChlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRFZGdlKGVkZ2UpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaGlnaGxpZ2h0SW5jaWRlbnRFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGhpZ2hsaWdodE91dGdvaW5nRWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE91dGdvaW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICBoaWdobGlnaHRJbmNvbWluZ0VkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgLy8gdHJhdmVyc2FsIG9mIGFuIGVkZ2UgZ2l2ZW4gYSBub2RlXG5cbiAgdHJhdmVyc2VPdXRnb2luZ0VkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIHRyYXZlcnNlSW5jb21pbmdFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY29taW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICB0cmF2ZXJzZUluY2lkZW50RWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNpZGVudEVkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgLy8gdHJhdmVyc2FsIG9mIGFuIGVkZ2UgYmV0d2VlbiB0d28gbm9kZXNcblxuICB0cmF2ZXJzZUVkZ2VzQmV0d2VlbiAoZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdChcbiAgICAgICAgdGhpcy5ncmFwaC5nZXRFZGdlc0JldHdlZW4oZWRnZSlcbiAgICAgICksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGVkZ2Uuc291cmNlXG4gICAgKVxuICB9XG5cbiAgdHJhdmVyc2VBbGxFZGdlc0JldHdlZW4gKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QoXG4gICAgICAgIHRoaXMuZ3JhcGguZ2V0QWxsRWRnZXNCZXR3ZWVuKGVkZ2UpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucyksXG4gICAgICBlZGdlLnNvdXJjZVxuICAgIClcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBsY2cgZnJvbSAnY29tcHV0ZS1sY2cnXG5cbnZhciByYW5kID0gbGNnKDEpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbiA9IHJhbmQoKVxuICAgIHZhciBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IobiAqIDI2KSArIDk3KVxuICAgIHJldHVybiBsZXR0ZXIgKyBuLnRvU3RyaW5nKDE2KS5zdWJzdHIoMilcbiAgfSxcblxuICB0cmFuc2Zvcm06IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIHN0ciA9IGBgXG4gICAgaWYgKCd0cmFuc2xhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHRyYW5zbGF0ZSgke28udHJhbnNsYXRlLnh9LCAke28udHJhbnNsYXRlLnl9KWBcbiAgICB9XG4gICAgaWYgKCdyb3RhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHJvdGF0ZSgke28ucm90YXRlfSlgXG4gICAgfVxuICAgIGlmICgnc2NhbGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHNjYWxlKCR7by5zY2FsZX0pYFxuICAgIH1cbiAgICByZXR1cm4gc3RyXG4gIH0sXG5cbiAgdHJhbnNpdGlvbjogZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC50cmFuc2l0aW9uKCdsYXlvdXQnKVxuICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgIC5lYXNlKCdsaW5lYXInKVxuICB9LFxuXG4gIGNvbmRpdGlvbmFsVHJhbnNpdGlvbjogZnVuY3Rpb24gKGVsLCBjb25kaXRpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uKGVsKVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfSxcblxuICBuczogZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiAnZ3JldWxlci0nICsgc3RyXG4gIH1cbn1cbiJdfQ==
