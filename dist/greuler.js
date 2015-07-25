(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.greuler = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
module.exports = function (val) {
	if (val == null) {
		return [];
	}

	return Array.isArray(val) ? val : [val];
};

},{}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _arrify = require('arrify');

var _arrify2 = _interopRequireDefault(_arrify);

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

      var receivesArray = {
        nodes: true,
        links: true,
        groups: true,
        constraints: true,
        distanceMatrix: true,
        size: true
      };

      Object.keys(self.options.data).forEach(function (k) {
        var v = self.options.data[k];
        if (receivesArray[k]) {
          self.layout[k]((0, _arrify2['default'])(v));
        } else {
          self.layout[k].apply(self.layout, (0, _arrify2['default'])(v));
        }
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
        iterations: []
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

},{"./Graph":5,"./elements/edge":8,"./elements/node":9,"./selector/GreulerDefaultTransition":16,"arrify":1,"extend":3}],5:[function(require,module,exports){
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

},{"./const":7,"./utils":17,"extend":3}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"../Vector":6,"../utils":17,"extend":3}],9:[function(require,module,exports){
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

},{"../const":7,"../utils":17}],10:[function(require,module,exports){
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

},{"./Draw":4,"./Graph":5,"./const":7,"./player/index":13,"./polyfills":14,"./utils":17}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./Fixed":11,"./Generator":12}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"../utils":17,"extend":3}],16:[function(require,module,exports){
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

},{"./Graph":15,"extend":3}],17:[function(require,module,exports){
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

},{"compute-lcg":2}]},{},[10])(10)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXJyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvbXB1dGUtbGNnL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9EcmF3LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvR3JhcGguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9WZWN0b3IuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9jb25zdC5qcyIsIi9Vc2Vycy9tYXVyaWNpby9Eb2N1bWVudHMvd2ViL21hdXJpenp6aW8ubWUvbnBtL2dyZXVsZXIvc3JjL2VsZW1lbnRzL2VkZ2UuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9lbGVtZW50cy9ub2RlLmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvaW5kZXguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvRml4ZWQuanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9wbGF5ZXIvR2VuZXJhdG9yLmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvcGxheWVyL2luZGV4LmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvcG9seWZpbGxzLmpzIiwiL1VzZXJzL21hdXJpY2lvL0RvY3VtZW50cy93ZWIvbWF1cml6enppby5tZS9ucG0vZ3JldWxlci9zcmMvc2VsZWN0b3IvR3JhcGguanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy9zZWxlY3Rvci9HcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24uanMiLCIvVXNlcnMvbWF1cmljaW8vRG9jdW1lbnRzL3dlYi9tYXVyaXp6emlvLm1lL25wbS9ncmV1bGVyL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QyxTQUFTLENBQUMsQ0FBQyxNQUFHLENBQUE7S0FDeEQ7QUFDRCxRQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFDakIsU0FBRyxpQkFBZSxDQUFDLENBQUMsTUFBTSxNQUFHLENBQUE7S0FDOUI7QUFDRCxRQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7QUFDaEIsU0FBRyxnQkFBYyxDQUFDLENBQUMsS0FBSyxNQUFHLENBQUE7S0FDNUI7QUFDRCxXQUFPLEdBQUcsQ0FBQTtHQUNYOztBQUVELFlBQVUsRUFBRSxvQkFBVSxTQUFTLEVBQUU7QUFDL0IsV0FBTyxTQUFTLENBQ2IsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUNwQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0dBQ2xCOztBQUVELHVCQUFxQixFQUFFLCtCQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUU7QUFDOUMsUUFBSSxTQUFTLEVBQUU7QUFDYixhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7S0FDM0I7QUFDRCxXQUFPLEVBQUUsQ0FBQTtHQUNWOztBQUVELElBQUUsRUFBRSxZQUFVLEdBQUcsRUFBRTtBQUNqQixXQUFPLFVBQVUsR0FBRyxHQUFHLENBQUE7R0FDeEI7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwpIHtcblx0aWYgKHZhbCA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdO1xufTtcbiIsIi8qKlxuKlxuKlx0Q09NUFVURTogbGNnXG4qXG4qXG4qXHRERVNDUklQVElPTjpcbipcdFx0LSBBIGxpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgKGxjZykuXG4qXG4qXG4qXHROT1RFUzpcbipcdFx0WzFdIEJhc2VkIG9uIFcuIFByZXNzLCBldCBhbC4sIE51bWVyaWNhbCBSZWNpcGVzIGluIEMgKDJkIGVkLiAxOTkyKVxuKlxuKlxuKlx0VE9ETzpcbipcdFx0WzFdXG4qXG4qXG4qXHRMSUNFTlNFOlxuKlx0XHRNSVRcbipcbipcdENvcHlyaWdodCAoYykgMjAxNC4gcmdpenouXG4qXG4qXG4qXHRBVVRIT1I6XG4qXHRcdHJnaXp6LiBnenRvd24yMjE2QHlhaG9vLmNvbS4gMjAxNC5cbipcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gVkFSSUFCTEVTIC8vXG5cbnZhciBNQVNLID0gMTIzNDU5ODc2LFxuXHRNID0gMjE0NzQ4MzY0Nyxcblx0QSA9IDE2ODA3O1xuXG5cbi8vIExDRyAvL1xuXG4vKipcbiogRlVOQ1RJT046IGxjZyggW3NlZWRdIClcbipcdFJldHVybnMgYSBsaW5lYXIgY29uZ3J1ZW50aWFsIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLiBJZiBub3QgcHJvdmlkZWQgYSBzZWVkLCBhIHNlZWQgaXMgZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSBjdXJyZW50IHRpbWUuXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSBbc2VlZF0gLSByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBzZWVkXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gZ2VuZXJhdG9yXG4qL1xuZnVuY3Rpb24gbGNnKCB2YWwgKSB7XG5cdHZhciBzZWVkO1xuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0aWYgKCB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJyB8fCB2YWwgIT09IHZhbCB8fCB2YWwgJSAxICE9PSAwIHx8IHZhbCA8IDEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCAnbGNnKCk6OmludmFsaWQgaW5wdXQgYXJndW1lbnQuIFNlZWQgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuJyApO1xuXHRcdH1cblx0XHRzZWVkID0gdmFsO1xuXHR9IGVsc2Uge1xuXHRcdHNlZWQgPSBEYXRlLm5vdygpICUgMTAwMDAwMDAwO1xuXHR9XG5cdC8qKlxuXHQqIEZVTkNUSU9OOiBsY2coIFtOXSApXG5cdCpcdExpbmVhciBjb25ncnVlbnRpYWwgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuXG5cdCpcblx0KiBAcGFyYW0ge051bWJlcn0gW05dIC0gbnVtYmVyIG9mIHBzZXVkb3JhbmRvbSBudW1iZXJzIHRvIHJldHVyblxuXHQqIEByZXR1cm5zIHtOdW1iZXJ8QXJyYXl9IHBzZXVkb3JhbmRvbSBmbG9hdGluZy1wb2ludCBudW1iZXIocykgYmV0d2VlbiAwIGFuZCAxXG5cdCovXG5cdHJldHVybiBmdW5jdGlvbiBsY2coIE4gKSB7XG5cdFx0dmFyIGFycixcblx0XHRcdHJhbmQ7XG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHNlZWQgPSBzZWVkIF4gTUFTSztcblx0XHRcdHNlZWQgPSAoIEEgKiBzZWVkICkgJSBNO1xuXHRcdFx0cmFuZCA9IHNlZWQgLyBNO1xuXHRcdFx0c2VlZCA9IHNlZWQgXiBNQVNLO1xuXHRcdFx0cmV0dXJuIHJhbmQ7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIE4gIT09ICdudW1iZXInIHx8IE4gIT09IE4gfHwgTiUxICE9PSAwIHx8IE4gPCAxICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggJ2xjZygpOjppbnZhbGlkIGlucHV0IGFyZ3VtZW50LiBBcnJheSBsZW5ndGggbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIuJyApO1xuXHRcdH1cblx0XHRhcnIgPSBuZXcgQXJyYXkoIE4gKTtcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBOOyBpKysgKSB7XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0XHRzZWVkID0gKCBBICogc2VlZCApICUgTTtcblx0XHRcdGFyclsgaSBdID0gc2VlZCAvIE07XG5cdFx0XHRzZWVkID0gc2VlZCBeIE1BU0s7XG5cdFx0fVxuXHRcdHJldHVybiBhcnI7XG5cdH07XG59IC8vIGVuZCBGVU5DVElPTiBsY2coKVxuXG5cbi8vIEVYUE9SVFMgLy9cblxubW9kdWxlLmV4cG9ydHMgPSBsY2c7XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBpc0FycmF5ID0gZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcblx0aWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKTtcblx0fVxuXG5cdHJldHVybiB0b1N0ci5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG5cdGlmICghb2JqIHx8IHRvU3RyLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgaGFzT3duQ29uc3RydWN0b3IgPSBoYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpO1xuXHR2YXIgaGFzSXNQcm90b3R5cGVPZiA9IG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlICYmIGhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG5cdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0aWYgKG9iai5jb25zdHJ1Y3RvciAmJiAhaGFzT3duQ29uc3RydWN0b3IgJiYgIWhhc0lzUHJvdG90eXBlT2YpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBPd24gcHJvcGVydGllcyBhcmUgZW51bWVyYXRlZCBmaXJzdGx5LCBzbyB0byBzcGVlZCB1cCxcblx0Ly8gaWYgbGFzdCBvbmUgaXMgb3duLCB0aGVuIGFsbCBwcm9wZXJ0aWVzIGFyZSBvd24uXG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIG9iaikgey8qKi99XG5cblx0cmV0dXJuIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fSBlbHNlIGlmICgodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykgfHwgdGFyZ2V0ID09IG51bGwpIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdGZvciAoOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzW2ldO1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAob3B0aW9ucyAhPSBudWxsKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbbmFtZV07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKHRhcmdldCAhPT0gY29weSkge1xuXHRcdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRcdGlmIChkZWVwICYmIGNvcHkgJiYgKGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gaXNBcnJheShjb3B5KSkpKSB7XG5cdFx0XHRcdFx0XHRpZiAoY29weUlzQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNBcnJheShzcmMpID8gc3JjIDogW107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNvcHkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBjb3B5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gd2luZG93LmQzXG52YXIgY29sYSA9IHdpbmRvdy5jb2xhXG5cbmltcG9ydCBhcnJpZnkgZnJvbSAnYXJyaWZ5J1xuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5pbXBvcnQgbm9kZSBmcm9tICcuL2VsZW1lbnRzL25vZGUnXG5pbXBvcnQgZWRnZSBmcm9tICcuL2VsZW1lbnRzL2VkZ2UnXG5pbXBvcnQgR3JhcGhNYW5hZ2VyIGZyb20gJy4vR3JhcGgnXG5pbXBvcnQgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGZyb20gJy4vc2VsZWN0b3IvR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3IHtcbiAgY29uc3RydWN0b3IgKGlkLCBvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdGhpcy5ldmVudHMgPSBkMy5kaXNwYXRjaCgnbGF5b3V0JywgJ2ZpcnN0TGF5b3V0RW5kJylcblxuICAgIHRoaXMubWFya2VySWQgPSAnbWFya2VyLScgKyBpZFxuXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyhvcHRpb25zKVxuXG4gICAgLy8gZ3JhcGggaGFuZGxlcyB0aGUgaW50ZXJhY3Rpb25zIHdpdGggdGhlIGRyYXdlclxuICAgIHRoaXMuY3JlYXRlR3JhcGgoKVxuXG4gICAgLy8gc2VsZWN0b3IgYW5pbWF0ZXMgdGhlIG5vZGVzL2VkZ2VzXG4gICAgdGhpcy5zZWxlY3RvciA9IG5ldyBHcmV1bGVyRGVmYXVsdFRyYW5zaXRpb24odGhpcylcblxuICAgIC8vIHN1Yi1lbGVtZW50cyB0aGF0IGRyYXcgc3R1ZmZcbiAgICB0aGlzLm5vZGVEcmF3ZXIgPSBub2RlKCkub3duZXIodGhpcylcbiAgICB0aGlzLmVkZ2VEcmF3ZXIgPSBlZGdlKCkub3duZXIodGhpcylcblxuICAgIC8vIGNvbGFcbiAgICB0aGlzLmxheW91dCA9IGNvbGEuZDNhZGFwdG9yKClcblxuICAgIHRoaXMubGF5b3V0Lm9uKCd0aWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50aWNrKClcbiAgICB9KVxuXG4gICAgdmFyIGZpcnN0RW5kID0gdHJ1ZVxuICAgIHRoaXMubGF5b3V0Lm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZmlyc3RFbmQpIHtcbiAgICAgICAgc2VsZi5ldmVudHMuZmlyc3RMYXlvdXRFbmQoKVxuICAgICAgICBmaXJzdEVuZCA9IGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZUdyYXBoICgpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMub3B0aW9ucy5kYXRhXG4gICAgdmFyIG5vZGVzID0gZGF0YS5ub2Rlc1xuICAgIHZhciBsaW5rcyA9IGRhdGEubGlua3NcblxuICAgIC8vIGVtcHR5IGFuZCByZS1hZGRcbiAgICBkYXRhLm5vZGVzID0gW11cbiAgICBkYXRhLmxpbmtzID0gW11cblxuICAgIHRoaXMuZ3JhcGggPSBuZXcgR3JhcGhNYW5hZ2VyKHRoaXMsIGRhdGEpXG4gICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdGhpcy5ncmFwaC5hZGROb2RlKG5vZGUpXG4gICAgfSwgdGhpcylcbiAgICBsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICB0aGlzLmdyYXBoLmFkZEVkZ2UoZWRnZSlcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqXG4gICAqIG9wdGlvbnNcbiAgICogICAtIHRhcmdldCB7c3RyaW5nfSBzZWxlY3RvciB0byB0aGUgZWxlbWVudCB0byBob2xkIHRoZSBncmFwaFxuICAgKiAgIC0gd2lkdGgge251bWJlcn1cbiAgICogICAtIGhlaWdodCB7bnVtYmVyfVxuICAgKiAgIC0gbGFiZWxzPXRydWUge2Jvb2xlYW59IEZhbHNlIHRvIGhpZGUgdGhlIHZlcnRleCBsYWJlbHNcbiAgICogICAtIGRpcmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGdpdmUgYW4gb3JpZW50YXRpb24gdG8gdGhlIGVkZ2VzXG4gICAqICAgaGF2ZSBhbiBlZGdlXG4gICAqICAgLSBkYXRhIHtPYmplY3R9XG4gICAqICAgICAtIGxpbmtEaXN0YW5jZT05MCB7bnVtYmVyfSBGb3JjZWQgbWluIGRpc3RhbmNlIGJldHdlZW4gdmVydGljZXMgdGhhdFxuICAgKiAgICAgLSBjb25zdHJhaW50cyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIGdyb3VwcyB7QXJyYXlbT2JqZWN0c119XG4gICAqICAgICAtIG5vZGVzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSByPTEwIHtudW1iZXJ9IG5vZGUgcmFkaXVzXG4gICAqICAgICAtIGxpbmtzIHtBcnJheVtPYmplY3RzXX1cbiAgICogICAgICAgLSBkaXJlY3RlZD1mYWxzZSB7Ym9vbGVhbn0gdHJ1ZSB0byBnaXZlIGFuIG9yaWVudGF0aW9uIHRvIHRoaXMgZWRnZVxuICAgKiAgICAgICAtIHdlaWdodD1cIlwiIHtzdHJpbmd9IExhYmVsIG9mIHRoZSBlZGdlIChjYW4gYmUgdGhlIHdlaWdodClcbiAgICpcbiAgICovXG4gIGRlZmF1bHRPcHRpb25zIChvcHRpb25zKSB7XG4gICAgLy8gZ3JhcGggZGVmYXVsdHNcbiAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgIHdpZHRoOiA3MDAsXG4gICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgIGFuaW1hdGlvblRpbWU6IDEwMDAsXG4gICAgICBsYWJlbHM6IHRydWUsXG4gICAgICBkaXJlY3RlZDogZmFsc2VcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5vcHRpb25zLmRhdGEgPSBleHRlbmQoe1xuICAgICAgbm9kZXM6IFtdLFxuICAgICAgbGlua3M6IFtdLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIGNvbnN0cmFpbnRzOiBbXSxcbiAgICAgIGF2b2lkT3ZlcmxhcHM6IHRydWUsXG4gICAgICBzaXplOiBbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdLFxuICAgICAgbGlua0Rpc3RhbmNlOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5saW5rRGlzdGFuY2UgfHwgODBcbiAgICAgIH1cbiAgICB9LCB0aGlzLm9wdGlvbnMuZGF0YSlcbiAgfVxuXG4gIGluaXRMYXlvdXQgKHVwZGF0ZU9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcblxuICAgIGlmICh1cGRhdGVPcHRpb25zLnNraXBMYXlvdXQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciByZWNlaXZlc0FycmF5ID0ge1xuICAgICAgbm9kZXM6IHRydWUsXG4gICAgICBsaW5rczogdHJ1ZSxcbiAgICAgIGdyb3VwczogdHJ1ZSxcbiAgICAgIGNvbnN0cmFpbnRzOiB0cnVlLFxuICAgICAgZGlzdGFuY2VNYXRyaXg6IHRydWUsXG4gICAgICBzaXplOiB0cnVlXG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoc2VsZi5vcHRpb25zLmRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgIHZhciB2ID0gc2VsZi5vcHRpb25zLmRhdGFba11cbiAgICAgIGlmIChyZWNlaXZlc0FycmF5W2tdKSB7XG4gICAgICAgIHNlbGYubGF5b3V0W2tdKGFycmlmeSh2KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubGF5b3V0W2tdLmFwcGx5KHNlbGYubGF5b3V0LCBhcnJpZnkodikpXG4gICAgICB9XG4gICAgfSwgdGhpcylcblxuICAgIHRoaXMubGF5b3V0LnN0YXJ0LmFwcGx5KHRoaXMubGF5b3V0LCB1cGRhdGVPcHRpb25zLml0ZXJhdGlvbnMpXG4gIH1cblxuICB0aWNrICgpIHtcbiAgICB0aGlzLmVkZ2VHcm91cC5jYWxsKHRoaXMuZWRnZURyYXdlcilcbiAgICB0aGlzLm5vZGVHcm91cC5jYWxsKHRoaXMubm9kZURyYXdlcilcbiAgfVxuXG4gIHVwZGF0ZSAodXBkYXRlT3B0aW9ucykge1xuICAgIHVwZGF0ZU9wdGlvbnMgPSBleHRlbmQodHJ1ZSwge1xuICAgICAgc2tpcExheW91dDogZmFsc2UsXG4gICAgICBpdGVyYXRpb25zOiBbXVxuICAgIH0sIHVwZGF0ZU9wdGlvbnMpXG5cbiAgICB0aGlzLmluaXRMYXlvdXQodXBkYXRlT3B0aW9ucylcbiAgICB0aGlzLmJ1aWxkKHVwZGF0ZU9wdGlvbnMpXG5cbiAgICAvLyB1cGRhdGUgbm9kZXMvZWRnZXMgaWYgbGF5b3V0LnRpY2sgd2Fzbid0IHJ1blxuICAgIGlmICh1cGRhdGVPcHRpb25zLnNraXBMYXlvdXQpIHtcbiAgICAgIHRoaXMudGljaygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGJ1aWxkICgpIHtcbiAgICB0aGlzLnJvb3QgPSBkMy5zZWxlY3QodGhpcy5vcHRpb25zLnRhcmdldClcbiAgICAgIC5zZWxlY3RBbGwoJ3N2Zy5ncmV1bGVyJylcbiAgICAgIC5kYXRhKFt0aGlzLm9wdGlvbnNdKVxuXG4gICAgLy8gZW50ZXJcbiAgICB0aGlzLnJvb3QuZW50ZXIgPSB0aGlzLnJvb3QuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdncmV1bGVyJylcblxuICAgIC8vIG1hcmtlciBkZWZcbiAgICB0aGlzLnJvb3QuZW50ZXJcbiAgICAgIC5hcHBlbmQoJ3N2ZzpkZWZzJylcbiAgICAgIC5hcHBlbmQoJ3N2ZzptYXJrZXInKVxuICAgICAgLmF0dHIoJ2lkJywgdGhpcy5tYXJrZXJJZClcbiAgICAgIC5hdHRyKCd2aWV3Qm94JywgJzAgLTUgMTAgMTAnKVxuICAgICAgLmF0dHIoJ3JlZlgnLCA5KVxuICAgICAgLmF0dHIoJ21hcmtlcldpZHRoJywgNSlcbiAgICAgIC5hdHRyKCdtYXJrZXJIZWlnaHQnLCA1KVxuICAgICAgLmF0dHIoJ29yaWVudCcsICdhdXRvJylcbiAgICAgIC5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgIC5hdHRyKCdkJywgJ00wLC00TDEwLDBMMCw0TDIsMCcpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgJzBweCcpXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMSlcbiAgICAgIC5hdHRyKCdmaWxsJywgJyM3NzcnKVxuXG4gICAgLy8gdXBkYXRlXG4gICAgdGhpcy5yb290XG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5vcHRpb25zLmhlaWdodClcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBlZGdlc1xuICAgIHRoaXMuZWRnZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLmVkZ2VzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXSB9KVxuICAgIHRoaXMuZWRnZUdyb3VwXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2VkZ2VzJylcblxuICAgIC8vIHdyYXBwZXIgZm9yIHRoZSBub2Rlc1xuICAgIHRoaXMubm9kZUdyb3VwID0gdGhpcy5yb290XG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGVzJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7IHJldHVybiBbZC5kYXRhXSB9KVxuICAgIHRoaXMubm9kZUdyb3VwXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ25vZGVzJylcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IGV4dGVuZCBmcm9tICdleHRlbmQnXG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi9jb25zdCdcblxuY29uc3QgTk9ERV9ERUZBVUxUX09QVElPTlMgPSB7XG4gIHI6IDEwLFxuICBmaWxsOiAnIzI5ODBCOSdcbn1cblxuY29uc3QgRURHRV9ERUZBVUxUX09QVElPTlMgPSB7XG4gIHN0cm9rZTogY29sb3JzLkxJR0hUX0dSQVlcbn1cblxuZnVuY3Rpb24gaW5jbHVkZXMgKGFyciwgaWQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoYXJyW2ldLmlkID09PSBpZCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGgge1xuICBjb25zdHJ1Y3RvciAob3duZXIsIGRhdGEpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICB0aGlzLm5vZGVzID0gZGF0YS5ub2Rlc1xuICAgIHRoaXMuZWRnZXMgPSBkYXRhLmxpbmtzXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5vZGUgdG8gdGhlIGdyYXBoLCBlYWNoIG9mIHRoZSBhcmd1bWVudHMgbXVzdFxuICAgKiBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7TnVtYmVyfHN0cmluZ31cbiAgICpcbiAgICogT3B0aW9uYWwgcHJvcGVydGllc1xuICAgKlxuICAgKiAtIHgge251bWJlcn0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIG5vZGUgaW4gdGhlIGdyYXBoIChvbmx5IGlmIGZpeGVkID0gdHJ1ZSlcbiAgICogLSB5IHtudW1iZXJ9IFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhpcyBub2RlIGluIHRoZSBncmFwaCAob25seSBpZiBmaXhlZCA9IHRydWUpXG4gICAqIC0gZml4ZWQge2Jvb2xlYW59IGB0cnVlYCB0byBtYWtlIHRoaXMgbm9kZSBub3QgdG8gcGFydGljaXBhdGUgaW4gdGhlIGxheW91dCBwcm9jZXNzXG4gICAqIC0gZmlsbCB7c3RyaW5nfSBUaGUgZmlsbCBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIHIge251bWJlcn0gVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlIHRoYXQgcmVwcmVzZW50cyB0aGUgbm9kZVxuICAgKiAtIGxhYmVsIHtzdHJpbmd9IFRoZSB0ZXh0IGluc2lkZSB0aGUgbm9kZSAoaWYgaXQncyBub3QgcHJlc2VudCBpdCdzIGVxdWFsIHRvIHRoZSBgaWRgKVxuICAgKiAtIHRvcFJpZ2h0TGFiZWwge3N0cmluZ10gdGhlIHRleHQgc2hvd24gb24gdGhlIHRvcCByaWdodCBzaWRlIG9mIHRoZSBub2RlLCB1c2VmdWxcbiAgICogdG8gcmVwcmVzZW50IGFkZGl0aW9uYWwgYW5ub3RhdGlvbnNcbiAgICpcbiAgICogTk9URTogdGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgKi9cbiAgYWRkTm9kZSAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHNbaV1cbiAgICAgIGlmICghY29uZmlnLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0aGUgb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYCcpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5nZXROb2RlKGNvbmZpZykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ25vZGUgYWxyZWFkeSBpbiBzdG9yZScpXG4gICAgICB9XG4gICAgICB0aGlzLm5vZGVzLnB1c2goXG4gICAgICAgIEdyYXBoLmFwcGVuZE5vZGVEZWZhdWx0cy5jYWxsKHRoaXMub3duZXIsIGNvbmZpZylcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIG5vZGUgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH1cbiAgICovXG4gIGdldE5vZGUgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0J5Rm4odiA9PiB2LmlkID09PSBub2RlLmlkKVswXVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSBub2RlcyB0aGF0IHNhdGlzZnkgdGhlIHBhcmFtZXRlciBgZm5gLFxuICAgKiBhbGlhcyBmb3IgYHRoaXMubm9kZXMuZmlsdGVyKGZuKWBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0Tm9kZXNCeUZuIChmbikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLmZpbHRlcihmbilcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgYWRqYWNlbnQgbm9kZXMgb2YgdGhlIG5vZGUgaWRlbnRpZmllZCBieSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0QWRqYWNlbnROb2RlcyAobm9kZSkge1xuICAgIHZhciBhZGphY2VudE5vZGVzID0gW11cbiAgICB2YXIgdGFrZW4gPSB7fVxuICAgIHZhciBuZXh0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVkZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWRnZSA9IHRoaXMuZWRnZXNbaV1cbiAgICAgIG5leHQgPSBudWxsXG4gICAgICBpZiAoZWRnZS5zb3VyY2UuaWQgPT09IG5vZGUuaWQpIHtcbiAgICAgICAgbmV4dCA9IGVkZ2UudGFyZ2V0XG4gICAgICB9IGVsc2UgaWYgKGVkZ2UudGFyZ2V0LmlkID09PSBub2RlLmlkKSB7XG4gICAgICAgIG5leHQgPSBlZGdlLnNvdXJjZVxuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCAmJiAhdGFrZW5bbmV4dC5pZF0pIHtcbiAgICAgICAgdGFrZW5bbmV4dC5pZF0gPSB0cnVlXG4gICAgICAgIGFkamFjZW50Tm9kZXMucHVzaChuZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhZGphY2VudE5vZGVzXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHN1Y2Nlc3NvciBub2RlcyBvZiB0aGUgbm9kZSBpZGVudGlmaWVkIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRTdWNjZXNzb3JOb2RlcyAobm9kZSkge1xuICAgIHZhciBzdWNjZXNzb3IgPSBbXVxuICAgIHZhciB0YWtlbiA9IHt9XG4gICAgdmFyIG5leHRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXVxuICAgICAgbmV4dCA9IG51bGxcbiAgICAgIGlmIChlZGdlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS50YXJnZXRcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWVcbiAgICAgICAgc3VjY2Vzc29yLnB1c2gobmV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHByZWRlY2Vzc29yIG5vZGVzIG9mIHRoZSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldFByZWRlY2Vzc29yTm9kZXMgKG5vZGUpIHtcbiAgICB2YXIgcHJlZGVjZXNzb3IgPSBbXVxuICAgIHZhciB0YWtlbiA9IHt9XG4gICAgdmFyIG5leHRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWRnZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlZGdlID0gdGhpcy5lZGdlc1tpXVxuICAgICAgbmV4dCA9IG51bGxcbiAgICAgIGlmIChlZGdlLnRhcmdldC5pZCA9PT0gbm9kZS5pZCkge1xuICAgICAgICBuZXh0ID0gZWRnZS5zb3VyY2VcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0ICYmICF0YWtlbltuZXh0LmlkXSkge1xuICAgICAgICB0YWtlbltuZXh0LmlkXSA9IHRydWVcbiAgICAgICAgcHJlZGVjZXNzb3IucHVzaChuZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcmVkZWNlc3NvclxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBub2RlIGlkZW50aWZpZWQgYnkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqL1xuICByZW1vdmVOb2RlIChub2RlKSB7XG4gICAgdGhpcy5yZW1vdmVOb2Rlc0J5Rm4oZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2LmlkID09PSBub2RlLmlkXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgbm9kZXMgc3RvcmVkIGluIGBub2Rlc2AsXG4gICAqIGVhY2ggb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBub2Rlc1xuICAgKi9cbiAgcmVtb3ZlTm9kZXMgKG5vZGVzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlTm9kZXNCeUZuKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMobm9kZXMsIHYuaWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgbm9kZXMgdGhhdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGVcbiAgICogYGZuYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgcmVtb3ZlTm9kZXNCeUZuIChmbikge1xuICAgIHZhciBpXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMubm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChmbih0aGlzLm5vZGVzW2ldLCBpKSkge1xuICAgICAgICAvLyByZW1vdmUgbm9kZXNcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVzLnNwbGljZShpLCAxKVxuICAgICAgICAvLyByZW1vdmUgaW5jaWRlbnQgZWRnZXNcbiAgICAgICAgdGhpcy5yZW1vdmVFZGdlcyhcbiAgICAgICAgICB0aGlzLmdldEluY2lkZW50RWRnZXMobm9kZVswXSlcbiAgICAgICAgKVxuICAgICAgICBpIC09IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBlZGdlIHRvIHRoZSBncmFwaCwgZWFjaCBvZiB0aGUgYXJndW1lbnRzIG11c3RcbiAgICogYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIFJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBzb3VyY2Uge251bWJlcnxPYmplY3R9IFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGUgb3IgdGhlIHNvdXJjZSBub2RlIGl0c2VsZlxuICAgKiAtIHRhcmdldCB7bnVtYmVyfE9iamVjdH0gVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZSBvciB0aGUgdGFyZ2V0IG5vZGUgaXRzZWxmXG4gICAqXG4gICAqIE9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICpcbiAgICogLSBpZCB7c3RyaW5nfE9iamVjdH0gSWYgYW4gaWQgaXMgbm90IHByb3ZpZGVkIGFuIGF1dG8gZ2VuZXJhdGVkIHN0cmluZyB3aWxsIGJlIGFzc2lnbmVkXG4gICAqIHRvIHRoaXMgZWRnZVxuICAgKiAtIHN0cm9rZSB7c3RyaW5nfSBUaGUgc3Ryb2tlIG9mIHRoZSBwYXRoIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZVxuICAgKiAtIHdlaWdodCB7c3RyaW5nfSBUaGUgd2VpZ2h0IG9mIHRoZSBlZGdlXG4gICAqIC0gZGlyZWN0ZWQge2Jvb2xlYW59IElmIHNldCB0byB0cnVlIGFuIGFkZGl0aW9uYWwgYXJyb3cgaXMgYWRkZWQgYXQgdGhlIGVuZCBvZiB0aGUgZWRnZVxuICAgKlxuICAgKiBOT1RFOiB0aGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqL1xuICBhZGRFZGdlICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgfHwgIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgndGFyZ2V0JykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBlZGdlIG11c3QgaGF2ZSB0aGUgcHJvcGVydGllcyBgc291cmNlYCBhbmQgYHRhcmdldGAnKVxuICAgICAgfVxuICAgICAgdmFyIHNvdXJjZSA9IGNvbmZpZy5zb3VyY2VcbiAgICAgIHZhciB0YXJnZXQgPSBjb25maWcudGFyZ2V0XG5cbiAgICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBzb3VyY2UgPSB0aGlzLmdldE5vZGUoeyBpZDogY29uZmlnLnNvdXJjZSB9KVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXROb2RlKHsgaWQ6IGNvbmZpZy50YXJnZXQgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKCFzb3VyY2UgfHwgIXRhcmdldCkge1xuICAgICAgICB0aHJvdyBFcnJvcignbmV3IGVkZ2UgZG9lcyBub3Qgam9pbiBleGlzdGluZyB2ZXJ0aWNlcycpXG4gICAgICB9XG4gICAgICBjb25maWcuc291cmNlID0gc291cmNlXG4gICAgICBjb25maWcudGFyZ2V0ID0gdGFyZ2V0XG4gICAgICB0aGlzLmVkZ2VzLnB1c2goXG4gICAgICAgIEdyYXBoLmFwcGVuZEVkZ2VEZWZhdWx0cy5jYWxsKHRoaXMub3duZXIsIGNvbmZpZylcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBlZGdlIGJ5IGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZ2V0RWRnZSAoZWRnZSkge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihlID0+IGUuaWQgPT09IGVkZ2UuaWQpWzBdXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIGRpcmVjdGVkIGVkZ2VzIGZyb20gdGhlIG5vZGUgd2hvc2UgaWQgaXNcbiAgICogYG9wdGlvbnMuc291cmNlYCBhbmQgdG8gdGhlIG5vZGUgd2hvc2UgaWQgaXMgYG9wdGlvbnMudGFyZ2V0YFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG9wdGlvbnMuc291cmNlIFRoZSBpZCBvZiB0aGUgc291cmNlIG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnRhcmdldCBUaGUgaWQgb2YgdGhlIHRhcmdldCBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQmV0d2VlbiAob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmdldEVkZ2VzQnlGbihmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUuc291cmNlLmlkID09PSBvcHRpb25zLnNvdXJjZSAmJiBlLnRhcmdldC5pZCA9PT0gb3B0aW9ucy50YXJnZXRcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBlZGdlcyBmcm9tIGBvcHRpb25zLnNvdXJjZWAgdG8gYG9wdGlvbnMudGFyZ2V0YFxuICAgKiBvciBgb3B0aW9ucy50YXJnZXRgIHRvIGBvcHRpb25zLnNvdXJjZWBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBvcHRpb25zLnNvdXJjZSBUaGUgaWQgb2YgdGhlIHNvdXJjZSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gb3B0aW9ucy50YXJnZXQgVGhlIGlkIG9mIHRoZSB0YXJnZXQgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRBbGxFZGdlc0JldHdlZW4gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiAoZS5zb3VyY2UuaWQgPT09IG9wdGlvbnMuc291cmNlICYmIGUudGFyZ2V0LmlkID09PSBvcHRpb25zLnRhcmdldCkgfHxcbiAgICAgIChlLnNvdXJjZS5pZCA9PT0gb3B0aW9ucy50YXJnZXQgJiYgZS50YXJnZXQuaWQgPT09IG9wdGlvbnMuc291cmNlKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBlZGdlIGlkZW50aWZpZWQgYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVkZ2VcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBlZGdlLmlkIFRoZSBpZCBvZiB0aGUgZWRnZVxuICAgKi9cbiAgcmVtb3ZlRWRnZSAoZWRnZSkge1xuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGUgPT4gZS5pZCA9PT0gZWRnZS5pZClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgZWRnZXMgc3RvcmVkIGluIGBlZGdlc2AsXG4gICAqIGVhY2ggb2JqZWN0IG11c3QgaGF2ZSB0aGUgcHJvcGVydHkgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBlZGdlc1xuICAgKi9cbiAgcmVtb3ZlRWRnZXMgKGVkZ2VzKSB7XG4gICAgLy8gVE9ETzogaW1wcm92ZSBuXjIgcmVtb3ZhbFxuICAgIHRoaXMucmVtb3ZlRWRnZXNCeUZuKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXMoZWRnZXMsIGUuaWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCB0aGUgZWRnZXMgdGhhdCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHByZWRpY2F0ZVxuICAgKiBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gICAqL1xuICByZW1vdmVFZGdlc0J5Rm4gKGZuKSB7XG4gICAgdmFyIGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5lZGdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGZuKHRoaXMuZWRnZXNbaV0sIGkpKSB7XG4gICAgICAgIHRoaXMuZWRnZXMuc3BsaWNlKGksIDEpXG4gICAgICAgIGkgLT0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgdGhhdCByZXR1cm4gdHJ1ZSBmb3IgdGhlIHByZWRpY2F0ZSBgZm5gXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEVkZ2VzQnlGbiAoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlcy5maWx0ZXIoZm4pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIG91dGdvaW5nIGVkZ2VzIG9mIHRoZSBub2RlIGBpZGBcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG5vZGVcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBub2RlLmlkIFRoZSBpZCBvZiB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0W119XG4gICAqL1xuICBnZXRPdXRnb2luZ0VkZ2VzIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWRnZXNCeUZuKChlKSA9PiBlLnNvdXJjZS5pZCA9PT0gbm9kZS5pZClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgaW5jb21pbmcgZWRnZXMgb2YgdGhlIG5vZGUgYGlkYFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG5vZGUuaWQgVGhlIGlkIG9mIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtPYmplY3RbXX1cbiAgICovXG4gIGdldEluY29taW5nRWRnZXMgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFZGdlc0J5Rm4oKGUpID0+IGUudGFyZ2V0LmlkID09PSBub2RlLmlkKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHRoZSBpbmNpZGVudCBlZGdlcyBvZiB0aGUgbm9kZSBgaWRgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbm9kZS5pZCBUaGUgaWQgb2YgdGhlIG5vZGVcbiAgICogQHJldHVybnMge09iamVjdFtdfVxuICAgKi9cbiAgZ2V0SW5jaWRlbnRFZGdlcyAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmdldE91dGdvaW5nRWRnZXMobm9kZSlcbiAgICAgIC5jb25jYXQodGhpcy5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKVxuICB9XG5cbiAgLyoqXG4gICAqIEZhY2FkZSB0byBhZGQgbm9kZXMvZWRnZXNcbiAgICpcbiAgICogTk9URTogdGhlIGZ1bmN0aW9uIHJlY2VpdmVzIGFueSBudW1iZXIgb2YgcGFyYW1ldGVyc1xuICAgKi9cbiAgYWRkICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVsID0gYXJndW1lbnRzW2ldXG4gICAgICAvLyBhc3N1bWUgdGhhdCBlZGdlcyBoYXZlIGEgc291cmNlL3RhcmdldCBwYXJhbWV0ZXJcbiAgICAgIGlmIChlbC5oYXNPd25Qcm9wZXJ0eSgnc291cmNlJykgJiYgZWwuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XG4gICAgICAgIHRoaXMuYWRkRWRnZShlbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkTm9kZShlbClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXBwZW5kTm9kZURlZmF1bHRzICh2KSB7XG4gICAgaWYgKCF2Lmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICB2LmlkID0gdXRpbC5pZCgpXG4gICAgfVxuXG4gICAgdiA9IGV4dGVuZChcbiAgICAgIHt9LFxuICAgICAgLy8gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgTk9ERV9ERUZBVUxUX09QVElPTlMsXG4gICAgICAvLyBpbnN0YW5jZSBkZWZhdWx0c1xuICAgICAgdGhpcy5vcHRpb25zLm5vZGVEZWZhdWx0cyxcbiAgICAgIC8vIG5vZGVcbiAgICAgIHZcbiAgICApXG5cbiAgICBpZiAoIXYuaGFzT3duUHJvcGVydHkoJ3dpZHRoJykpIHtcbiAgICAgIHYud2lkdGggPSAyICogdi5yXG4gICAgfVxuICAgIGlmICghdi5oYXNPd25Qcm9wZXJ0eSgnaGVpZ2h0JykpIHtcbiAgICAgIHYuaGVpZ2h0ID0gMiAqIHYuclxuICAgIH1cbiAgICByZXR1cm4gdlxuICB9XG5cbiAgc3RhdGljIGFwcGVuZEVkZ2VEZWZhdWx0cyAoZSkge1xuICAgIGlmICghZS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgZS5pZCA9IHV0aWwuaWQoKVxuICAgIH1cbiAgICBlID0gZXh0ZW5kKFxuICAgICAge30sXG4gICAgICAvLyBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICBFREdFX0RFRkFVTFRfT1BUSU9OUyxcbiAgICAgIC8vIGluc3RhbmNlIGRlZmF1bHRzXG4gICAgICB0aGlzLm9wdGlvbnMuZWRnZURlZmF1bHRzLFxuICAgICAgLy8gZWRnZVxuICAgICAgZVxuICAgIClcbiAgICByZXR1cm4gZVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSByYW5kb20gZ3JhcGggd2l0aCB0aGUgZm9sbG93aW5nIGRlZmF1bHRzIG9wdGlvbnMgb3ZlcnJpZGRlbiBieSBgb3B0aW9uc2A6XG4gICAqXG4gICAqIC0gb3B0aW9ucy5vcmRlcj0xMCB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIG5vZGVzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuc2l6ZT0xNSB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGVkZ2VzIGluIHRoZSBncmFwaFxuICAgKiAtIG9wdGlvbnMuY29ubmVjdGVkPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIG1ha2UgdGhlIGdyYXBoIGNvbm5lY3RlZCxcbiAgICogaXQncyBndWFyYW50ZWVkIHRvIGhhdmUgYXQgbGVhc3QgYG9wdGlvbnMub3JkZXIgLSAxYCBlZGdlc1xuICAgKiAtIG9wdGlvbnMubXVsdGlHcmFwaD1mYWxzZSB7Ym9vbGVhbn0gVHJ1ZSB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgcGFyYWxsZWwgZWRnZXNcbiAgICogLSBvcHRpb25zLnBzZXVkb0dyYXBoPWZhbHNlIHtib29sZWFufSBUcnVlIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBsb29wIGVkZ2VzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHt7bm9kZXM6IEFycmF5LCBsaW5rczogQXJyYXl9fVxuICAgKi9cbiAgc3RhdGljIHJhbmRvbSAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAgb3JkZXI6IDEwLFxuICAgICAgc2l6ZTogMTUsXG4gICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgbXVsdGlHcmFwaDogZmFsc2UsXG4gICAgICBwc2V1ZG9HcmFwaDogZmFsc2VcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdmFyIGksIHUsIHZcbiAgICB2YXIgbm9kZXMgPSBbXVxuICAgIHZhciBhZGphY2VuY3lMaXN0ID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICBhZGphY2VuY3lMaXN0W2ldID0gW11cbiAgICAgIG5vZGVzLnB1c2goeyBpZDogaSB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCAodSwgdikge1xuICAgICAgYWRqYWNlbmN5TGlzdFt1XVt2XSA9IGFkamFjZW5jeUxpc3Rbdl1bdV0gPSB0cnVlXG4gICAgfVxuXG4gICAgdmFyIGVkZ2VzID0gW11cbiAgICBpID0gMFxuXG4gICAgaWYgKG9wdGlvbnMuY29ubmVjdGVkKSB7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgb3B0aW9ucy5vcmRlcjsgaSArPSAxKSB7XG4gICAgICAgIHYgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKVxuICAgICAgICBhZGQoaSwgdilcbiAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBpLFxuICAgICAgICAgIHRhcmdldDogdlxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaSAtPSAxXG4gICAgfVxuXG4gICAgZm9yICg7IGkgPCBvcHRpb25zLnNpemU7IGkgKz0gMSkge1xuICAgICAgdSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMub3JkZXIpXG4gICAgICB2ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5vcmRlcilcblxuICAgICAgaWYgKHUgPT09IHYgJiYgIW9wdGlvbnMucHNldWRvR3JhcGgpIHtcbiAgICAgICAgaSAtPSAxXG4gICAgICB9IGVsc2UgaWYgKGFkamFjZW5jeUxpc3RbdV1bdl0gJiYgIW9wdGlvbnMubXVsdGlHcmFwaCkge1xuICAgICAgICBpIC09IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZCh1LCB2KVxuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IHUsXG4gICAgICAgICAgdGFyZ2V0OiB2XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGVzOiBub2RlcyxcbiAgICAgIGxpbmtzOiBlZGdlc1xuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIFZlY3RvciB7XG4gIGNvbnN0cnVjdG9yICh4LCB5KSB7XG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgfVxuXG4gIC8vIHVuYXJ5XG5cbiAgc3RhdGljIG5lZyAoYSkge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKC1hLngsIC1hLnkpXG4gIH1cblxuICBzdGF0aWMgbGVuIChhKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChWZWN0b3IubGVuU3EoYSkpXG4gIH1cblxuICBzdGF0aWMgbGVuU3EgKGEpIHtcbiAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55XG4gIH1cblxuICBzdGF0aWMgdW5pdCAoYSkge1xuICAgIGlmIChhLnggPT09IDAgJiYgYS55ID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGhlIGxlbmd0aCBvZiB0aGUgdmVjdG9yIGlzIDAnKVxuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW4oYSlcbiAgICByZXR1cm4gbmV3IFZlY3RvcihhLnggLyBsZW5ndGgsIGEueSAvIGxlbmd0aClcbiAgfVxuXG4gIHN0YXRpYyBvcnRob2dvbmFsIChhKSB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoLWEueSwgYS54KVxuICB9XG5cbiAgc3RhdGljIGFuZ2xlRGVnIChhKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoYS55LCBhLngpICogMTgwIC8gTWF0aC5QSVxuICB9XG5cbiAgLy8gYmluYXJ5XG5cbiAgc3RhdGljIGFkZCAoYSwgYikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCArIGIueCwgYS55ICsgYi55KVxuICB9XG5cbiAgc3RhdGljIHN1YiAoYSwgYikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAtIGIueCwgYS55IC0gYi55KVxuICB9XG5cbiAgc3RhdGljIGRvdCAoYSwgYikge1xuICAgIHJldHVybiBhLnggKiBiLnggKyBhLnkgKiBiLnlcbiAgfVxuXG4gIHN0YXRpYyBzY2FsZSAoYSwgbikge1xuICAgIHJldHVybiBuZXcgVmVjdG9yKGEueCAqIG4sIGEueSAqIG4pXG4gIH1cblxuICBzdGF0aWMgbWlkIChhLCBiKSB7XG4gICAgcmV0dXJuIFZlY3Rvci5zY2FsZShWZWN0b3IuYWRkKGEsIGIpLCAwLjUpXG4gIH1cblxuICBzdGF0aWMgYW5nbGVCZXR3ZWVuIChhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWNvcyhWZWN0b3IuZG90KGEsIGIpIC8gVmVjdG9yLmxlbihhKSAtIFZlY3Rvci5sZW4oYikpXG4gIH1cblxuICBzdGF0aWMgcm90YXRlIChhLCBhbmdsZSkge1xuICAgIHZhciBjb3NBID0gTWF0aC5jb3MoYW5nbGUpXG4gICAgdmFyIHNpbkEgPSBNYXRoLnNpbihhbmdsZSlcbiAgICB2YXIgbnggPSBhLnggKiBjb3NBIC0gYS55ICogc2luQVxuICAgIHZhciBueSA9IGEueCAqIHNpbkEgKyBhLnkgKiBjb3NBXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IobngsIG55KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZlY3RvclxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xudmFyIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkyMCgpXG52YXIgY29sb3JzID0ge31cbnZhciBjb2xvckxpdGVyYWxzID0gWydCTFVFJywgJ09SQU5HRScsICdHUkVFTicsICdSRUQnLCAnUFVSUExFJywgJ0JST1dOJywgJ1BJTksnLCAnR1JBWScsICdZRUxMT1cnLCAnQ1lBTiddXG5jb2xvckxpdGVyYWxzLmZvckVhY2goZnVuY3Rpb24gKGMsIGkpIHtcbiAgY29sb3JzW2NdID0gY29sb3IucmFuZ2UoKVsyICogaV1cbiAgY29sb3JzWydMSUdIVF8nICsgY10gPSBjb2xvci5yYW5nZSgpWzIgKiBpICsgMV1cbn0pXG5cbmNvbG9ycy5yYW5kb21Gcm9tUGFsZXR0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNvbG9yLnJhbmdlKClbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApXVxufVxuXG5leHBvcnQgeyBjb2xvcnMgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vVmVjdG9yJ1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIHZhciBvd25lclxuXG4gIGZ1bmN0aW9uIG1vdmVUb3dhcmRzUG9pbnQgKHBvaW50LCBtaWRkbGUpIHtcbiAgICB2YXIgbWFyZ2luID0gcG9pbnQuclxuICAgIHZhciB1bml0ID0gVmVjdG9yLnVuaXQoVmVjdG9yLnN1YihtaWRkbGUsIHBvaW50KSlcbiAgICByZXR1cm4gVmVjdG9yLmFkZChwb2ludCwgVmVjdG9yLnNjYWxlKHVuaXQsIG1hcmdpbikpXG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGlubmVyIHBvaW50cyBvZiBhIGxvb3AgZWRnZVxuICAgKlxuICAgKiAtIGFuYWx5emVzIGVhY2ggYWRqYWNlbnQgdmVydGV4XG4gICAqICAtIGZvciBlYWNoIGVhY2ggZWRnZSB1LXYgbW92ZSB0aGUgb3Bwb3NpdGUgd2F5IGUuZy4gdi0+dVxuICAgKiAgLSB0aGUgc3VtIG9mIHVuaXQgdmVjdG9ycyB3aWxsIGdpdmUgcm91Z2hseSBhIGdvb2QgYXBwcm94aW1hdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdSBWZXJ0ZXhcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1hcmdpbkJldHdlZW5FZGdlcyBEZWZpbmVkIGluIGBjcmVhdGVQYXRoYFxuICAgKiBAcGFyYW0ge251bWJlcn0gY291bnQgVGhlIG51bWJlciBvZiB1LXUgZWRnZXMgZm91bmQgeWV0XG4gICAqIEByZXR1cm5zIHt7cGF0aDogKltdLCBkaXI6ICp9fVxuICAgKi9cbiAgZnVuY3Rpb24gc2VsZkxvb3AgKHUsIG1hcmdpbkJldHdlZW5FZGdlcywgY291bnQpIHtcbiAgICB2YXIgYWRqYWNlbnQgPSBvd25lci5ncmFwaC5nZXRBZGphY2VudE5vZGVzKHUpXG4gICAgdmFyIGRpciA9IG5ldyBWZWN0b3IoMCwgMClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgdiA9IGFkamFjZW50W2ldXG4gICAgICBpZiAodS5pZCAhPT0gdi5pZCkge1xuICAgICAgICBkaXIgPSBWZWN0b3IudW5pdChWZWN0b3IuYWRkKFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBWZWN0b3IudW5pdChWZWN0b3Iuc3ViKHUsIHYpKVxuICAgICAgICApKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvUmFkIChhKSB7XG4gICAgICByZXR1cm4gYSAqIE1hdGguUEkgLyAxODBcbiAgICB9XG5cbiAgICAvLyBubyBhZGphY2VudCB2ZXJ0aWNlc1xuICAgIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA9PT0gMCkge1xuICAgICAgZGlyID0gVmVjdG9yLnVuaXQobmV3IFZlY3RvcigwLCAtMSkpXG4gICAgfVxuXG4gICAgdmFyIG9ydCA9IFZlY3Rvci5vcnRob2dvbmFsKGRpcilcblxuICAgIC8vIG1vdmluZyB1IHRvd2FyZHMgYGRpcmAgYHUucmAgdW5pdHNcbiAgICB2YXIgdUJvcmRlck9yaWdpbiA9IFZlY3Rvci5zY2FsZShkaXIsIHUuciArIDQpXG4gICAgLy8gdmFyIHVCb3JkZXJPcmlnaW5Ud2ljZSA9IFZlY3Rvci5zY2FsZShkaXIsIHUuciAqIDIpXG4gICAgLy8gdUQgaXMgbm93IGluIHRoZSBlZGdlIG9mIHRoZSBjaXJjbGUsIG1ha2luZyBhIGxpdHRsZSBhcmMgaW4gdGhlIGNpcmNsZVxuXG4gICAgLy8gZW5kcG9pbnRzIG9mIHRoZSBlZGdlIHdpbGwgaGF2ZSBhIHNlcGFyYXRpb24gb2YgMjUgZGVnLCA1MCBkZWcsIDc1IGRlZywgLi4uXG4gICAgdmFyIHNlcGFyYXRpb24gPSB0b1JhZCgyNSlcbiAgICB2YXIgYW5nbGUgPSBzZXBhcmF0aW9uICsgKGNvdW50IC0gMSkgKiBzZXBhcmF0aW9uXG5cbiAgICAvLyB0aGUgcG9pbnQgdG8gdGhlIGxlZnQgb2YgdSArIHVCb3JkZXJcbiAgICB2YXIgdUJvcmRlckxlZnQgPSBWZWN0b3IuYWRkKHUsIFZlY3Rvci5yb3RhdGUodUJvcmRlck9yaWdpbiwgYW5nbGUpKVxuICAgIC8vIHRoZSBwb2ludCB0byB0aGUgcmlnaHQgb2YgdSArIHVCb3JkZXJcbiAgICB2YXIgdUJvcmRlclJpZ2h0ID0gVmVjdG9yLmFkZCh1LCBWZWN0b3Iucm90YXRlKHVCb3JkZXJPcmlnaW4sIC1hbmdsZSkpXG5cbiAgICAvLyBzb21lIGxlbmd0aCBhd2F5IGZyb20gdGhlIG5vZGUgY29tcHV0ZWQgYnkgZG9pbmcgcmFuZG9tIHNhbXBsZXNcbiAgICB2YXIgbGVuZ3RoID0gKG1hcmdpbkJldHdlZW5FZGdlcyAqIDAuNikgKiAoY291bnQgKyAxKVxuXG4gICAgLypcbiAgICAgKiBGb3JtIHRoZSBzaGFwZSBvZiBhIHdlaXJkIHJob21idXNcbiAgICAgKlxuICAgICAqXG4gICAgICogICAgICAgICAgICB1cFxuICAgICAqICAgICAgICAgICAvICBcXFxuICAgICAqICAgICAgICAgIC8gICAgXFxcbiAgICAgKiAgICAgICAgIC8gICAgICBcXFxuICAgICAqICAgICAgICAvICAgICAgICBcXFxuICAgICAqICAgICBsZWZ0ICAgICAgIHJpZ2h0XG4gICAgICogICAgICAgXFwgICAgICAgICAvXG4gICAgICogICAgIGJvcmRlciAgIGJvcmRlclxuICAgICAqXG4gICAgICovXG4gICAgdmFyIHVwID0gVmVjdG9yLmFkZCh1LCBWZWN0b3Iuc2NhbGUoZGlyLCB1LnIgKyBsZW5ndGgpKVxuXG4gICAgdmFyIG1pZExlZnQgPSBWZWN0b3IuYWRkKHVCb3JkZXJMZWZ0LCBWZWN0b3Iuc2NhbGUoZGlyLCBsZW5ndGggKiAwLjUpKVxuICAgIHZhciBtaWRSaWdodCA9IFZlY3Rvci5hZGQodUJvcmRlclJpZ2h0LCBWZWN0b3Iuc2NhbGUoZGlyLCBsZW5ndGggKiAwLjUpKVxuXG4gICAgdmFyIGxlZnQgPSBWZWN0b3IuYWRkKG1pZExlZnQsIFZlY3Rvci5zY2FsZShvcnQsIGxlbmd0aCAvIDQpKVxuICAgIHZhciByaWdodCA9IFZlY3Rvci5hZGQobWlkUmlnaHQsIFZlY3Rvci5zY2FsZShvcnQsIC1sZW5ndGggLyA0KSlcblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbdUJvcmRlckxlZnQsIGxlZnQsIHVwLCByaWdodCwgdUJvcmRlclJpZ2h0XSxcbiAgICAgIGRpcjogb3J0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHBvaW50cyBvZiB0aGUgPHBhdGg+IHRoYXQgcmVwcmVzZW50IGFuIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGQgRWRnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbWV0YSBIb2xkcyB0aGUgZWRnZSBjb3VudCBiZXR3ZWVuIHZlcnRpY2VzLFxuICAgKiB1bml0IHZlY3RvcnMgYW5kIG90aGVyIG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXJnaW5CZXR3ZWVuRWRnZXMgVXNlZCBpbiBib3RoIG5vcm1hbCBhbmRcbiAgICogbG9vcCBlZGdlcyBzZXRzIHRoZSBzZXBhcmF0aW9uIGJldHdlZW4gZWRnZXMgZnJvbSB0aGUgbWlkXG4gICAqIHBvaW50IG9mIHRoZSB2ZXJ0aWNlcyB0aGV5IGpvaW5cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGggKGQsIG1ldGEsIG1hcmdpbkJldHdlZW5FZGdlcykge1xuICAgIHZhciB1LCB2XG4gICAgdmFyIHVCb3JkZXIsIHZCb3JkZXJcbiAgICB2YXIgY3VycmVudFxuXG4gICAgdSA9IGQuc291cmNlXG4gICAgdiA9IGQudGFyZ2V0XG4gICAgaWYgKHUuaWQgPiB2LmlkKSB7XG4gICAgICBbdSwgdl0gPSBbdiwgdV1cbiAgICB9XG4gICAgbWV0YVt1LmlkXSA9IG1ldGFbdS5pZF0gfHwge31cblxuICAgIC8vIHRoZSBtaWQgcG9pbnQgaXMgY29tcHV0ZWQgZnJvbSB0aGUgYm9yZGVycyBvZiBib3RoIG5vZGVzXG4gICAgLy8gdGhlIG1pZCBwb2ludCBpcyB1c2VkIHRvIGRldGVybWluZSB0aGUgcG9zaXRpb24gb2YgdGhlIGxhYmVsXG4gICAgdUJvcmRlciA9IHVcbiAgICB2Qm9yZGVyID0gdlxuICAgIGlmICh1LmlkICE9PSB2LmlkKSB7XG4gICAgICB1Qm9yZGVyID0gbW92ZVRvd2FyZHNQb2ludCh1LCB2KVxuICAgICAgdkJvcmRlciA9IG1vdmVUb3dhcmRzUG9pbnQodiwgdSlcbiAgICB9XG5cbiAgICBjdXJyZW50ID0gKG1ldGFbdS5pZF1bdi5pZF0gPSBtZXRhW3UuaWRdW3YuaWRdIHx8IHtcbiAgICAgIGNvdW50OiAxLFxuICAgICAgbWlkOiBWZWN0b3IubWlkKHVCb3JkZXIsIHZCb3JkZXIpLFxuICAgICAgZGlyZWN0aW9uOiAtMVxuICAgIH0pXG5cbiAgICB2YXIgaW5uZXJKb2ludHMgPSBbXVxuICAgIGlmICh1LmlkID09PSB2LmlkKSB7XG4gICAgICAvLyBhcHBseSB0aGUgZm9sbG93aW5nIGZvciBzZWxmLWxvb3AgZWRnZXNcbiAgICAgIHZhciBsb29wID0gc2VsZkxvb3AodSwgbWFyZ2luQmV0d2VlbkVkZ2VzLCBjdXJyZW50LmNvdW50KVxuICAgICAgaW5uZXJKb2ludHMgPSBsb29wLnBhdGhcbiAgICAgIGQudW5pdCA9IGxvb3AuZGlyXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1bml0ID0gVmVjdG9yLnVuaXQoVmVjdG9yLnN1Yih2LCB1KSlcbiAgICAgIGV4dGVuZChjdXJyZW50LCB7XG4gICAgICAgIHVuaXQ6IHVuaXQsXG4gICAgICAgIHVuaXRPcnRob2dvbmFsOiBWZWN0b3Iub3J0aG9nb25hbCh1bml0KVxuICAgICAgfSlcbiAgICAgIGlubmVySm9pbnRzLnB1c2goVmVjdG9yLmFkZChcbiAgICAgICAgY3VycmVudC5taWQsXG4gICAgICAgIFZlY3Rvci5zY2FsZShcbiAgICAgICAgICBjdXJyZW50LnVuaXRPcnRob2dvbmFsLFxuICAgICAgICAgIE1hdGguZmxvb3IoY3VycmVudC5jb3VudCAvIDIpICogbWFyZ2luQmV0d2VlbkVkZ2VzICogY3VycmVudC5kaXJlY3Rpb25cbiAgICAgICAgKVxuICAgICAgKSlcbiAgICAgIGQudW5pdCA9IGN1cnJlbnQudW5pdFxuICAgIH1cblxuICAgIGN1cnJlbnQuY291bnQgKz0gMVxuICAgIGN1cnJlbnQuZGlyZWN0aW9uICo9IC0xXG5cbiAgICAvLyBwcm9ibGVtOiB0aGUgZWRnZSBzdGFydHMvZW5kcyBpbiB0aGUgY2VudGVyIG9mIHNvbWUgbm9kZVxuICAgIC8vXG4gICAgLy8gcmVhbCBzb2x1dGlvbjogcmVuZGVyIHRoZSBwYXRoIG5vcm1hbGx5IHRoZW4gY29tcHV0ZSB0aGUgcG9zaXRpb24gb2YgYSBwb2ludFxuICAgIC8vIHdpdGggYHBhdGguZ2V0UG9pbnRBdExlbmd0aCh0ICogbClgIHdoZXJlIGBsYCBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBwYXRoIGFuZFxuICAgIC8vIGB0YCBhbiBpbnRlcnBvbGF0ZWQgcGxhY2UgPSByYWRpdXMgb2YgZWFjaCBub2RlXG4gICAgLy9cbiAgICAvLyBzaW1wbGUgdHJpY2s6IHNob3J0ZW4gdGhlIGxlbmd0aCBvZiB0aGUgZWRnZSBieSBtb3ZpbmcgdGhlIHN0YXJ0L2VuZCBwb2ludHNcbiAgICAvLyBvZiB0aGUgZWRnZXMgdG93YXJkIGVhY2ggb3RoZXJcbiAgICB2YXIgc291cmNlID0gbW92ZVRvd2FyZHNQb2ludChkLnNvdXJjZSwgaW5uZXJKb2ludHNbMF0pXG4gICAgdmFyIHRhcmdldCA9IG1vdmVUb3dhcmRzUG9pbnQoZC50YXJnZXQsIGlubmVySm9pbnRzW2lubmVySm9pbnRzLmxlbmd0aCAtIDFdKVxuXG4gICAgZC5wYXRoID0gW3NvdXJjZV1cbiAgICAgIC5jb25jYXQoaW5uZXJKb2ludHMpXG4gICAgICAuY29uY2F0KFt0YXJnZXRdKVxuICB9XG5cbiAgdmFyIGxpbmUgPSBkMy5zdmcubGluZSgpXG4gICAgLngoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueCB9KVxuICAgIC55KGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnkgfSlcbiAgICAudGVuc2lvbigxLjUpXG4gICAgLmludGVycG9sYXRlKCdidW5kbGUnKVxuICAgIC8vIC5pbnRlcnBvbGF0ZSgnbGluZWFyJylcblxuICBmdW5jdGlvbiBpbm5lciAoc2VsZWN0aW9uKSB7XG4gICAgLy8gZWRnZXNcbiAgICB2YXIgbGlua3MgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKCdnLmVkZ2UnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubGlua3NcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkXG4gICAgICB9KVxuICAgIGxpbmtzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdlZGdlJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiB1dGlscy5ucyhkLmlkKSB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcblxuICAgIC8vIHVwZGF0ZVxuICAgIGxpbmtzXG4gICAgICAuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICB2YXIgc2VsZiA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICB2YXIgY2xzID0ge1xuICAgICAgICAgIGRpcmVjdGVkOiBkLmRpcmVjdGVkIHx8IG93bmVyLm9wdGlvbnMuZGlyZWN0ZWRcbiAgICAgICAgfVxuICAgICAgICBjbHNbJ3NvdXJjZS0nICsgZC5zb3VyY2UuaWRdID0gdHJ1ZVxuICAgICAgICBjbHNbJ3RhcmdldC0nICsgZC50YXJnZXQuaWRdID0gdHJ1ZVxuICAgICAgICBzZWxmLmNsYXNzZWQoY2xzKVxuICAgICAgfSlcblxuICAgIHZhciBtZXRhID0ge31cbiAgICBsaW5rcy5lYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICBjcmVhdGVQYXRoKGQsIG1ldGEsIDE3KVxuICAgIH0pXG5cbiAgICAvLyBwYXRoIGVudGVyXG4gICAgdmFyIHBhdGhzID0gbGlua3Muc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIC8vIDEuIHJlYWwgcGF0aFxuICAgICAgICAvLyAyLiBzdHJva2UtZGFzaGFycmF5IGhlbHBlclxuICAgICAgICByZXR1cm4gW2QsIGRdXG4gICAgICB9KVxuICAgIHBhdGhzLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIGQgPT4gZC5zdHJva2UpXG4gICAgICAuYXR0cignZmlsbCcsICd0cmFuc3BhcmVudCcpXG4gICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMilcbiAgICAgIC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICBlbC5hdHRyKCdvcGFjaXR5JywgIWkgPyAxIDogMClcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBlbC5jbGFzc2VkKCdiYXNlJywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgIGVsLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDUpXG4gICAgICAgICAgZWwuY2xhc3NlZCgndHJhdmVyc2FsJywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC8vIC5hdHRyKCdkJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gIHZhciBwYXJlbnQgPSBkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5kYXR1bSgpXG4gICAgICAvLyAgcmV0dXJuIGxpbmUoW3BhcmVudC5zb3VyY2VdKVxuICAgICAgLy8gfSlcblxuICAgIC8vIHBhdGggdXBkYXRlXG4gICAgdXRpbHMuY29uZGl0aW9uYWxUcmFuc2l0aW9uKHBhdGhzLCAhb3duZXIubm9kZURyYWdnaW5nKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IGxpbmUoZC5wYXRoKSlcblxuICAgIHBhdGhzLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICB2YXIgcGFyZW50ID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSlcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHBhdGguYXR0cignbWFya2VyLWVuZCcsXG4gICAgICAgICAgcGFyZW50LmNsYXNzZWQoJ2RpcmVjdGVkJylcbiAgICAgICAgICAgID8gJ3VybCgjJyArIG93bmVyLm1hcmtlcklkICsgJyknXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB3ZWlnaHRQb3NpdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICBzZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgdmFyIGFuZ2xlID0gVmVjdG9yLmFuZ2xlRGVnKGQudW5pdClcbiAgICAgICAgICB2YXIgdiA9IGQucGF0aFtNYXRoLmZsb29yKGQucGF0aC5sZW5ndGggLyAyKV1cbiAgICAgICAgICByZXR1cm4gdXRpbHMudHJhbnNmb3JtKHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdixcbiAgICAgICAgICAgIHJvdGF0ZTogYW5nbGVcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHZhciB3ZWlnaHRzID0gbGlua3Muc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgIC5kYXRhKGQgPT4gW2RdKVxuXG4gICAgLy8gd2VpZ2h0IGVudGVyXG4gICAgd2VpZ2h0cy5lbnRlcigpXG4gICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdmb250LXNpemUnLCAnOXB4JylcbiAgICAgIC5hdHRyKCdkb21pbmFudC1iYXNlbGluZScsICd0ZXh0LWFmdGVyLWVkZ2UnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbilcblxuICAgIC8vIHdlaWdodCB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24od2VpZ2h0cywgIW93bmVyLm5vZGVEcmFnZ2luZylcbiAgICAgIC50ZXh0KGQgPT4gZC53ZWlnaHQpXG4gICAgICAuY2FsbCh3ZWlnaHRQb3NpdGlvbilcblxuICAgIC8vIHdlaWdodCBleGl0XG4gICAgd2VpZ2h0cy5leGl0KClcbiAgICAgIC5yZW1vdmUoKVxuXG4gICAgLy8gZXhpdFxuICAgIGxpbmtzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpXG4gIH1cblxuICBpbm5lci5vd25lciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG93bmVyXG4gICAgfVxuICAgIG93bmVyID0gdmFsdWVcbiAgICByZXR1cm4gaW5uZXJcbiAgfVxuXG4gIHJldHVybiBpbm5lclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHdpbmRvdy5kM1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tICcuLi9jb25zdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICB2YXIgb3duZXJcblxuICBmdW5jdGlvbiBpbm5lciAoc2VsZWN0aW9uKSB7XG4gICAgdmFyIG5vZGVzID0gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdnLm5vZGUnKVxuICAgICAgLmRhdGEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQubm9kZXNcbiAgICAgIH0sIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLmlkXG4gICAgICB9KVxuXG4gICAgdmFyIGxheW91dCA9IG93bmVyLmxheW91dFxuXG4gICAgdmFyIGcgPSBub2Rlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gJ25vZGUgJyArIChkLmNsYXNzIHx8ICcnKVxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdpZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiB1dGlscy5ucyhkLmlkKSB9KVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm0oeyB0cmFuc2xhdGU6IGQgfSlcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIGlmICghZWwub3Zlcikge1xuICAgICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpXG4gICAgICAgIH1cbiAgICAgICAgZWwub3ZlciA9IHRydWVcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgZWwub3ZlciA9IGZhbHNlXG4gICAgICAgIGVsLnN0eWxlKCdjdXJzb3InLCBudWxsKVxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICBnLnRyYW5zaXRpb24oJ2VudGVyJylcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMSlcbiAgICBnLmNhbGwobGF5b3V0LmRyYWcpXG5cbiAgICB2YXIgZHJhZ1N0YXJ0ID0gbGF5b3V0LmRyYWcoKS5vbignZHJhZ3N0YXJ0LmQzYWRhcHRvcicpXG4gICAgdmFyIGRyYWdFbmQgPSBsYXlvdXQuZHJhZygpLm9uKCdkcmFnZW5kLmQzYWRhcHRvcicpXG4gICAgbGF5b3V0LmRyYWcoKVxuICAgICAgLm9uKCdkcmFnc3RhcnQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSB0cnVlXG4gICAgICAgIGRyYWdTdGFydC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cylcbiAgICAgIH0pXG4gICAgICAub24oJ2RyYWdlbmQuZDNhZGFwdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvd25lci5ub2RlRHJhZ2dpbmcgPSBmYWxzZVxuICAgICAgICBkcmFnRW5kLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKVxuICAgICAgfSlcblxuICAgIGcuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IGQuZmlsbClcbiAgICAgIC5hdHRyKCdyJywgZCA9PiBkLnIpXG5cbiAgICAvLyBpbm5lciBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdsYWJlbCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsICd3aGl0ZScpXG4gICAgICAuYXR0cignZm9udC1zaXplJywgJzEycHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAuYXR0cignZG9taW5hbnQtYmFzZWxpbmUnLCAnY2VudHJhbCcpXG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0LmxhYmVsJylcbiAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmICgnbGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5sYWJlbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkLmlkXG4gICAgICB9KVxuXG4gICAgLy8gdG9wLXJpZ2h0IGxhYmVsXG4gICAgZy5hcHBlbmQoJ3RleHQnKVxuICAgICAgLmNsYXNzZWQoJ291dGVyLXRvcC1yaWdodCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsIGNvbG9ycy5CTFVFKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgIC5hdHRyKCd4JywgZCA9PiBkLndpZHRoIC8gMiAtIDIpXG4gICAgICAuYXR0cigneScsIGQgPT4gLWQuaGVpZ2h0IC8gMiArIDMpXG4gICAgbm9kZXMuc2VsZWN0QWxsKCd0ZXh0Lm91dGVyLXRvcC1yaWdodCcpXG4gICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoJ3RvcFJpZ2h0TGFiZWwnIGluIGQpIHtcbiAgICAgICAgICByZXR1cm4gZC50b3BSaWdodExhYmVsXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAvLyB0b3AtbGVmdCBsYWJlbFxuICAgIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5jbGFzc2VkKCdvdXRlci10b3AtbGVmdCcsIHRydWUpXG4gICAgICAuYXR0cignZmlsbCcsIGNvbG9ycy5CTFVFKVxuICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICc5cHgnKVxuICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpXG4gICAgICAuYXR0cigneCcsIGQgPT4gLWQud2lkdGggLyAyIC0gMilcbiAgICAgIC5hdHRyKCd5JywgZCA9PiAtZC5oZWlnaHQgLyAyICsgMylcbiAgICBub2Rlcy5zZWxlY3RBbGwoJ3RleHQub3V0ZXItdG9wLWxlZnQnKVxuICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKCd0b3BSaWdodExhYmVsJyBpbiBkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudG9wTGVmdExhYmVsXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAvLyB1cGRhdGVcbiAgICB1dGlscy5jb25kaXRpb25hbFRyYW5zaXRpb24obm9kZXMsICFvd25lci5ub2RlRHJhZ2dpbmcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybSh7XG4gICAgICAgICAgdHJhbnNsYXRlOiBkXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgLy8gZXhpdFxuICAgIG5vZGVzLmV4aXQoKVxuICAgICAgLnJlbW92ZSgpXG4gIH1cblxuICBpbm5lci5vd25lciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG93bmVyXG4gICAgfVxuICAgIG93bmVyID0gdmFsdWVcbiAgICByZXR1cm4gaW5uZXJcbiAgfVxuXG4gIHJldHVybiBpbm5lclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBwb2x5ZmlsbHMgZnJvbSAnLi9wb2x5ZmlsbHMnXG5wb2x5ZmlsbHMoKVxuXG52YXIgZDMgPSB3aW5kb3cuZDNcblxuLy8gbm9kZVxuaW1wb3J0IERyYXcgZnJvbSAnLi9EcmF3J1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnXG5cbnZhciBpbnN0YW5jZXMgPSBbXVxuXG5mdW5jdGlvbiBydW4gKG9wdGlvbnMpIHtcbiAgZnVuY3Rpb24gZmFjdG9yeSAob3B0aW9ucykge1xuICAgIHZhciBlbCA9IGQzLnNlbGVjdChvcHRpb25zLnRhcmdldClcbiAgICB2YXIgaWQgPSBlbC5hdHRyKCdncmV1bGVyLWlkJylcbiAgICBpZiAoIWlkKSB7XG4gICAgICBpZCA9IHV0aWxzLmlkKClcbiAgICAgIGVsLmF0dHIoJ2dyZXVsZXItaWQnLCBpZClcbiAgICAgIGluc3RhbmNlc1tpZF0gPSBuZXcgRHJhdyhpZCwgb3B0aW9ucylcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlc1tpZF1cbiAgfVxuXG4gIHJldHVybiBmYWN0b3J5KG9wdGlvbnMpXG59XG5cbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJ1xucnVuLkdyYXBoID0gR3JhcGhcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi9jb25zdCdcbnJ1bi5jb2xvcnMgPSBjb2xvcnNcblxuaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllci9pbmRleCdcbnJ1bi5wbGF5ZXIgPSBwbGF5ZXJcblxuZXhwb3J0IGRlZmF1bHQgcnVuXG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKGFjdGlvbnMsIHNwZWVkKSB7XG4gICAgdGhpcy5pbmRleCA9IDBcbiAgICB0aGlzLnNwZWVkID0gc3BlZWRcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zXG5cbiAgICAvLyBzdGF0ZXNcbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFjdGlvbnNbdGhpcy5pbmRleCsrXSgpXG4gICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLnBsYXkuYmluZCh0aGlzKSwgdGhpcy5zcGVlZClcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICB0aGlzLnBhdXNlKClcbiAgICB0aGlzLmluZGV4ID0gMFxuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvciAoaW5zdGFuY2UsIHNwZWVkKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkIHx8IGluc3RhbmNlLm9wdGlvbnMuYW5pbWF0aW9uVGltZVxuICAgIHRoaXMuZm4gPSBudWxsXG4gICAgdGhpcy50aW1lciA9IG51bGxcbiAgfVxuXG4gIHJ1biAoZm4pIHtcbiAgICB0aGlzLmZuID0gZm4odGhpcy5pbnN0YW5jZSlcbiAgICB0aGlzLnBsYXkoKVxuICB9XG5cbiAgcnVuQW5pbWF0aW9uIChhbmltYXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhbmltYXRpb24pKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uLmZvckVhY2godGhpcy5ydW5BbmltYXRpb24sIHRoaXMpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhbmltYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBhbmltYXRpb24odGhpcy5pbnN0YW5jZSlcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHRoaXMuaW5zdGFuY2VbYW5pbWF0aW9uLnR5cGVdXG4gICAgcmV0dXJuIHR5cGVbYW5pbWF0aW9uLm9wXS5hcHBseSh0eXBlLCBhbmltYXRpb24uYXJncyB8fCBbXSlcbiAgfVxuXG4gIHBsYXkgKHZhbHVlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdmFyIG5leHQgPSB0aGlzLmZuLm5leHQodmFsdWUpXG4gICAgaWYgKCFuZXh0LmRvbmUpIHtcbiAgICAgIHZhciBkZWxheSA9IHRoaXMuc3BlZWRcbiAgICAgIHZhciBydW5BbmltYXRpb25WYWx1ZSA9IHRoaXMucnVuQW5pbWF0aW9uKG5leHQudmFsdWUpXG4gICAgICBpZiAocnVuQW5pbWF0aW9uVmFsdWUgJiYgdHlwZW9mIHJ1bkFuaW1hdGlvblZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodHlwZW9mIHJ1bkFuaW1hdGlvblZhbHVlLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGRlbGF5ID0gcnVuQW5pbWF0aW9uVmFsdWUuZGVsYXlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRpbWVyID0gd2luZG93LnJlcXVlc3RUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5wbGF5KG5leHQudmFsdWUpXG4gICAgICB9LCBkZWxheSlcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgd2luZG93LmNsZWFyUmVxdWVzdFRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBGaXhlZCBmcm9tICcuL0ZpeGVkJ1xuaW1wb3J0IEdlbmVyYXRvciBmcm9tICcuL0dlbmVyYXRvcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBGaXhlZEludGVydmFsOiBGaXhlZCxcbiAgR2VuZXJhdG9yOiBHZW5lcmF0b3Jcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8qZXNsaW50LWRpc2FibGUgKi9cbiAgKGZ1bmN0aW9uIChkb2MsIHByb3RvKSB7XG4gICAgdHJ5IHsgLy8gY2hlY2sgaWYgYnJvd3NlciBzdXBwb3J0cyA6c2NvcGUgbmF0aXZlbHlcbiAgICAgIGRvYy5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgYm9keScpXG4gICAgfSBjYXRjaCAoZXJyKSB7IC8vIHBvbHlmaWxsIG5hdGl2ZSBtZXRob2RzIGlmIGl0IGRvZXNuJ3RcbiAgICAgIFsncXVlcnlTZWxlY3RvcicsICdxdWVyeVNlbGVjdG9yQWxsJ10uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgIHZhciBuYXRpdmUgPSBwcm90b1ttZXRob2RdXG4gICAgICAgIHByb3RvW21ldGhvZF0gPSBmdW5jdGlvbiAoc2VsZWN0b3JzKSB7XG4gICAgICAgICAgaWYgKC8oXnwsKVxccyo6c2NvcGUvLnRlc3Qoc2VsZWN0b3JzKSkgeyAvLyBvbmx5IGlmIHNlbGVjdG9ycyBjb250YWlucyA6c2NvcGVcbiAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuaWQgLy8gcmVtZW1iZXIgY3VycmVudCBlbGVtZW50IGlkXG4gICAgICAgICAgICB0aGlzLmlkID0gJ0lEXycgKyBEYXRlLm5vdygpIC8vIGFzc2lnbiBuZXcgdW5pcXVlIGlkXG4gICAgICAgICAgICBzZWxlY3RvcnMgPSBzZWxlY3RvcnMucmVwbGFjZSgvKChefCwpXFxzKik6c2NvcGUvZywgJyQxIycgKyB0aGlzLmlkKTsgLy8gcmVwbGFjZSA6c2NvcGUgd2l0aCAjSURcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBkb2NbbWV0aG9kXShzZWxlY3RvcnMpXG4gICAgICAgICAgICB0aGlzLmlkID0gaWQgLy8gcmVzdG9yZSBwcmV2aW91cyBpZFxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlLmNhbGwodGhpcywgc2VsZWN0b3JzKSAvLyB1c2UgbmF0aXZlIGNvZGUgZm9yIG90aGVyIHNlbGVjdG9yc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pKHdpbmRvdy5kb2N1bWVudCwgRWxlbWVudC5wcm90b3R5cGUpXG5cbiAgLy8gZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qb2VsYW1iZXJ0LzEwMDIxMTZcbiAgLy9cbiAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgc2hpbSBieSBQYXVsIElyaXNoXG4gIC8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICBmdW5jdGlvbiAoIC8qIGZ1bmN0aW9uICovIGNhbGxiYWNrLCAvKiBET01FbGVtZW50ICovIGVsZW1lbnQpIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApXG4gICAgfVxuICB9KSgpXG5cbiAgLyoqXG4gICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgc2V0VGltZW91dCBleGNlcHQgdXNlcyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZSBwb3NzaWJsZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2ludH0gZGVsYXkgVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgd2luZG93LnJlcXVlc3RUaW1lb3V0ID0gZnVuY3Rpb24gKGZuLCBkZWxheSkge1xuICAgIGlmICggIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiZcbiAgICAgICF3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmXG4gICAgICAhKHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSkgJiYgLy8gRmlyZWZveCA1IHNoaXBzIHdpdGhvdXQgY2FuY2VsIHN1cHBvcnRcbiAgICAgICF3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAmJlxuICAgICAgIXdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmbiwgZGVsYXkpXG5cbiAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIHZhciBoYW5kbGUgPSB7fVxuXG4gICAgZnVuY3Rpb24gbG9vcCAoKSB7XG4gICAgICB2YXIgY3VycmVudCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICBkZWx0YSA9IGN1cnJlbnQgLSBzdGFydFxuXG4gICAgICBkZWx0YSA+PSBkZWxheSA/IGZuLmNhbGwoKSA6IGhhbmRsZS52YWx1ZSA9IHJlcXVlc3RBbmltRnJhbWUobG9vcClcbiAgICB9XG5cbiAgICBoYW5kbGUudmFsdWUgPSByZXF1ZXN0QW5pbUZyYW1lKGxvb3ApXG4gICAgcmV0dXJuIGhhbmRsZVxuICB9XG5cbiAgLyoqXG4gICAqIEJlaGF2ZXMgdGhlIHNhbWUgYXMgY2xlYXJUaW1lb3V0IGV4Y2VwdCB1c2VzIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHdoZXJlIHBvc3NpYmxlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICogQHBhcmFtIHtpbnR8b2JqZWN0fSBoYW5kbGUgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICB3aW5kb3cuY2xlYXJSZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOiAvKiBTdXBwb3J0IGZvciBsZWdhY3kgQVBJICovXG4gICAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSA/IHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKSA6XG4gICAgICAgICAgICB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVx0PyB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpIDpcbiAgICAgICAgICAgICAgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSkgOlxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpXG4gIH1cbi8qZXNsaW50LWVuYWJsZSAqL1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscydcbmltcG9ydCBleHRlbmQgZnJvbSAnZXh0ZW5kJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50U2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvciAob3duZXIpIHtcbiAgICB0aGlzLm93bmVyID0gb3duZXJcbiAgICB0aGlzLmdyYXBoID0gb3duZXIuZ3JhcGhcbiAgICB0aGlzLmRlZmF1bHRTdHlsZU9wdGlvbnMgPSB7fVxuICB9XG5cbiAgZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucyAoKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh7XG4gICAgICBkdXJhdGlvbjogdGhpcy5nZXRBbmltYXRpb25UaW1lKCksXG4gICAgICBzdHJva2U6ICcjRTc0QzNDJ1xuICAgIH0sIHRoaXMuZGVmYXVsdFN0eWxlT3B0aW9ucylcbiAgfVxuXG4gIGdldFN0eWxlT3B0aW9ucyAob3B0aW9ucykge1xuICAgIHJldHVybiBleHRlbmQoe30sIHRoaXMuZ2V0RGVmYXVsdFN0eWxlT3B0aW9ucygpLCBvcHRpb25zKVxuICB9XG5cbiAgZ2V0QW5pbWF0aW9uVGltZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXIub3B0aW9ucy5hbmltYXRpb25UaW1lXG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzIHJldHVybmVkIGJ5IHRoZSBHcmFwaCBjbGFzcyB0aGlzIG1ldGhvZHMgcmV0dXJuc1xuICAgKiB0aGUgZDMgc2VsZWN0aW9uIHRoYXQgZm9yIGFsbCB0aG9zZSBvYmplY3RzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0W118T2JqZWN0fSBlbHMgQW4gYXJyYXkgb2YgZWRnZXMvbm9kZXMgb3IgYSBzaW5nbGUgZWRnZS9ub2RlXG4gICAqIEByZXR1cm4ge2QzX3NlbGVjdGlvbn1cbiAgICovXG4gIHNlbGVjdCAoZWxzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGVscykpIHtcbiAgICAgIGVscyA9IFtlbHNdXG4gICAgfVxuICAgIGlmICghZWxzLmxlbmd0aCkge1xuICAgICAgZWxzLnB1c2goeyBpZDogLTEgfSlcbiAgICB9XG4gICAgZWxzID0gZWxzLmZpbHRlcihCb29sZWFuKVxuICAgIHJldHVybiB0aGlzLm93bmVyLnJvb3Quc2VsZWN0QWxsKFxuICAgICAgZWxzLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gJyMnICsgdXRpbHMubnMoZS5pZClcbiAgICAgIH0pLmpvaW4oJywgJylcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgcGF0aCBpbnNpZGUgdGhlIHRhZyA8Zz4gdGhhdCByZXByZXNlbnRzIGFuIGVkZ2VcbiAgICpcbiAgICogQHBhcmFtIHtkM19zZWxlY3Rpb259IHNlbGVjdGlvblxuICAgKi9cbiAgaW5uZXJFZGdlU2VsZWN0b3IgKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGguYmFzZScpXG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgY2lyY2xlIGluc2lkZSB0aGUgdGFnIDxnPiB0aGF0IHJlcHJlc2VudHMgYSBub2RlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICovXG4gIGlubmVyTm9kZVNlbGVjdG9yIChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICB9XG5cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBkMyA9IHdpbmRvdy5kM1xuXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcbmltcG9ydCBHcmFwaCBmcm9tICcuL0dyYXBoJ1xuXG52YXIgSElHSExJR0hUID0gJ2hpZ2hsaWdodCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JldWxlckRlZmF1bHRUcmFuc2l0aW9uIGV4dGVuZHMgR3JhcGgge1xuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgZWRnZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXRFZGdlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmVkZ2VzKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgbm9kZXMgb2YgdGhlIGdyYXBoXG4gICAqXG4gICAqIEByZXR1cm5zIHtkM19zZWxlY3Rpb259XG4gICAqL1xuICBnZXROb2RlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJOb2RlU2VsZWN0b3IoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLm5vZGVzKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHRzIGEgbm9kZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBpbmNyZWFzZSB0aGUgcmFkaXVzIHRvIDEuNXggdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKiAtIGRlY3JlYXNlIHRoZSByYWRpdXMgdG8gdGhlIG9yaWdpbmFsIGByYCB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge2QzX3NlbGVjdGlvbn0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUgKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cigncicsIChkKSA9PiBvcHRpb25zLnIgfHwgKGQuciAqIDEuNSkpXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3InLCAoZCkgPT4gZC5yKVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodHMgYW4gZWRnZSB0ZW1wb3JhcmlseSwgaXQgY29uc2lzdHMgb2YgdHdvXG4gICAqIGNoYWluZWQgdHJhbnNpdGlvbnNcbiAgICpcbiAgICogLSBjaGFuZ2UgdGhlIHN0cm9rZSBvZiB0aGUgYHBhdGhgIHRoYXQgcmVwcmVzZW50cyB0aGUgZWRnZSB0b1xuICAgKiBgb3B0aW9ucy5zdHJva2VgXG4gICAqIC0gY2hhbmdlIHRoZSBzdHJva2UgdG8gdGhlIG9yaWdpbmFsIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge2QzX3RyYW5zaXRpb259XG4gICAqL1xuICBkb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMgKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmlubmVyRWRnZVNlbGVjdG9yKHNlbGVjdGlvbilcbiAgICAgIC50cmFuc2l0aW9uKEhJR0hMSUdIVClcbiAgICAgIC5kdXJhdGlvbih0aGlzLmdldEFuaW1hdGlvblRpbWUoKSAvIDIpXG4gICAgICAuYXR0cignc3Ryb2tlJywgb3B0aW9ucy5zdHJva2UpXG4gICAgICAudHJhbnNpdGlvbihISUdITElHSFQpXG4gICAgICAuZHVyYXRpb24odGhpcy5nZXRBbmltYXRpb25UaW1lKCkgLyAyKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIChkKSA9PiBkLnN0cm9rZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBFZGdlIHRyYXZlcnNhbCBhbmltYXRpb24sIGl0IGFuaW1hdGVzIGEgaGlkZGVuIHBhdGggZ2l2aW5nIHRoZSBpbXByZXNzaW9uXG4gICAqIG9mIG1vdmVtZW50LCBpZiBzb3VyY2UgaXMgZ2l2ZW4gdGhlbiBpdCB3aWxsIGFsd2F5cyBzdGFydCB0aGUgYW5pbWF0aW9uXG4gICAqIGZyb20gdGhlIG5vZGUgYHNvdXJjZWAgZXZlbiBpZiB0aGUgZWRnZSBpcyBhbiBpbmNvbWluZyBlZGdlXG4gICAqXG4gICAqIEBwYXJhbSB7ZDNfc2VsZWN0aW9ufSBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtjb25maWd9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzb3VyY2U9LTFdXG4gICAqIEByZXR1cm5zIHtkM190cmFuc2l0aW9ufVxuICAgKi9cbiAgdHJhdmVyc2VFZGdlV2l0aERpcmVjdGlvbiAoc2VsZWN0aW9uLCBvcHRpb25zLCBzb3VyY2UgPSAtMSkge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGgudHJhdmVyc2FsJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpXG4gICAgICAgIGVsXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZScsIG9wdGlvbnMuc3Ryb2tlKVxuICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgYCR7bH0gJHtsfWApXG4gICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNob2Zmc2V0JywgbClcbiAgICAgICAgICAuYXR0cignb3BhY2l0eScsIDEpXG4gICAgICB9KVxuICAgICAgLnRyYW5zaXRpb24oJ2Rhc2hhcnJheScpXG4gICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgIC5hdHRyKCdzdHJva2UtZGFzaG9mZnNldCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmdldFRvdGFsTGVuZ3RoKClcbiAgICAgICAgdmFyIHR3aWNlTGVuZ3RoID0gbGVuZ3RoICogMlxuICAgICAgICB2YXIgbGVuZ3RoVG9Nb3ZlID0gMFxuICAgICAgICBpZiAoc291cmNlICE9PSAtMSkge1xuICAgICAgICAgIGlmIChkLnRhcmdldC5pZCA9PT0gc291cmNlKSB7XG4gICAgICAgICAgICBsZW5ndGhUb01vdmUgPSB0d2ljZUxlbmd0aFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICBsZW5ndGhUb01vdmUgPSB0d2ljZUxlbmd0aCAtIGxlbmd0aFRvTW92ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlbmd0aFRvTW92ZVxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICBlbC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgbnVsbClcbiAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hvZmZzZXQnLCBudWxsKVxuICAgICAgICAgIC5hdHRyKCdvcGFjaXR5JywgMClcbiAgICAgIH0pXG4gIH1cblxuICB0cmF2ZXJzZUVkZ2VzIChzZWxlY3Rpb24sIG9wdGlvbnMsIHNvdXJjZSkge1xuICAgIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgICAga2VlcFN0cm9rZTogdHJ1ZSxcbiAgICAgIHJldmVyc2U6IGZhbHNlXG4gICAgfSwgdGhpcy5nZXRTdHlsZU9wdGlvbnMoKSwgb3B0aW9ucylcblxuICAgIHNlbGVjdGlvbi5jYWxsKHRoaXMudHJhdmVyc2VFZGdlV2l0aERpcmVjdGlvbiwgb3B0aW9ucywgc291cmNlKVxuICAgIGlmIChvcHRpb25zLmtlZXBTdHJva2UpIHtcbiAgICAgIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICAgICAgICAudHJhbnNpdGlvbigndXBkYXRlJylcbiAgICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBvcHRpb25zLnN0cm9rZSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJFZGdlU2VsZWN0b3Ioc2VsZWN0aW9uKVxuICB9XG5cbiAgZ2V0Tm9kZSAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlubmVyTm9kZVNlbGVjdG9yKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXROb2RlKG5vZGUpKVxuICAgIClcbiAgfVxuXG4gIGdldEVkZ2UgKGVkZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckVkZ2VTZWxlY3RvcihcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0RWRnZShlZGdlKSlcbiAgICApXG4gIH1cblxuICAvLyB0ZW1wb3JhbCBoaWdobGlnaHRcblxuICBoaWdobGlnaHROb2RlIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodE5vZGUoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE5vZGUobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICBoaWdobGlnaHRFZGdlIChlZGdlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRFZGdlKGVkZ2UpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgaGlnaGxpZ2h0SW5jaWRlbnRFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRvVGVtcG9yYWxIaWdobGlnaHRFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0SW5jaWRlbnRFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGhpZ2hsaWdodE91dGdvaW5nRWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5kb1RlbXBvcmFsSGlnaGxpZ2h0RWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldE91dGdvaW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICBoaWdobGlnaHRJbmNvbWluZ0VkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9UZW1wb3JhbEhpZ2hsaWdodEVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNvbWluZ0VkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgLy8gdHJhdmVyc2FsIG9mIGFuIGVkZ2UgZ2l2ZW4gYSBub2RlXG5cbiAgdHJhdmVyc2VPdXRnb2luZ0VkZ2VzIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVyc2VFZGdlcyhcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZ3JhcGguZ2V0T3V0Z29pbmdFZGdlcyhub2RlKSksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIHRyYXZlcnNlSW5jb21pbmdFZGdlcyAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLmdyYXBoLmdldEluY29taW5nRWRnZXMobm9kZSkpLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucylcbiAgICApXG4gIH1cblxuICB0cmF2ZXJzZUluY2lkZW50RWRnZXMgKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5ncmFwaC5nZXRJbmNpZGVudEVkZ2VzKG5vZGUpKSxcbiAgICAgIHRoaXMuZ2V0U3R5bGVPcHRpb25zKG9wdGlvbnMpXG4gICAgKVxuICB9XG5cbiAgLy8gdHJhdmVyc2FsIG9mIGFuIGVkZ2UgYmV0d2VlbiB0d28gbm9kZXNcblxuICB0cmF2ZXJzZUVkZ2VzQmV0d2VlbiAoZWRnZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRWRnZXMoXG4gICAgICB0aGlzLnNlbGVjdChcbiAgICAgICAgdGhpcy5ncmFwaC5nZXRFZGdlc0JldHdlZW4oZWRnZSlcbiAgICAgICksXG4gICAgICB0aGlzLmdldFN0eWxlT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIGVkZ2Uuc291cmNlXG4gICAgKVxuICB9XG5cbiAgdHJhdmVyc2VBbGxFZGdlc0JldHdlZW4gKGVkZ2UsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUVkZ2VzKFxuICAgICAgdGhpcy5zZWxlY3QoXG4gICAgICAgIHRoaXMuZ3JhcGguZ2V0QWxsRWRnZXNCZXR3ZWVuKGVkZ2UpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRTdHlsZU9wdGlvbnMob3B0aW9ucyksXG4gICAgICBlZGdlLnNvdXJjZVxuICAgIClcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBsY2cgZnJvbSAnY29tcHV0ZS1sY2cnXG5cbnZhciByYW5kID0gbGNnKDEpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbiA9IHJhbmQoKVxuICAgIHZhciBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IobiAqIDI2KSArIDk3KVxuICAgIHJldHVybiBsZXR0ZXIgKyBuLnRvU3RyaW5nKDE2KS5zdWJzdHIoMilcbiAgfSxcblxuICB0cmFuc2Zvcm06IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIHN0ciA9IGBgXG4gICAgaWYgKCd0cmFuc2xhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHRyYW5zbGF0ZSgke28udHJhbnNsYXRlLnh9LCAke28udHJhbnNsYXRlLnl9KWBcbiAgICB9XG4gICAgaWYgKCdyb3RhdGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHJvdGF0ZSgke28ucm90YXRlfSlgXG4gICAgfVxuICAgIGlmICgnc2NhbGUnIGluIG8pIHtcbiAgICAgIHN0ciArPSBgIHNjYWxlKCR7by5zY2FsZX0pYFxuICAgIH1cbiAgICByZXR1cm4gc3RyXG4gIH0sXG5cbiAgdHJhbnNpdGlvbjogZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb25cbiAgICAgIC50cmFuc2l0aW9uKCdsYXlvdXQnKVxuICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgIC5lYXNlKCdsaW5lYXInKVxuICB9LFxuXG4gIGNvbmRpdGlvbmFsVHJhbnNpdGlvbjogZnVuY3Rpb24gKGVsLCBjb25kaXRpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uKGVsKVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfSxcblxuICBuczogZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiAnZ3JldWxlci0nICsgc3RyXG4gIH1cbn1cbiJdfQ==
