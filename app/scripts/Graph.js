'use strict';

import _ from 'lodash';
import extend from 'extend';
import assert from 'assert';
import util from './utils';
import {colors} from './const';

const NODE_DEFAULT_OPTIONS = {
  r: 10,
  fill: colors.BLUE
};

const EDGE_DEFAULT_OPTIONS = {
  stroke: colors.LIGHT_GRAY
};

export default class Graph {
  constructor(owner, data) {
    this.owner = owner;
    this.nodes = data.nodes;
    this.edges = data.links;
  }

  // nodes
  addNode() {
    for (var i = 0; i < arguments.length; i += 1) {
      var config = arguments[i];
      assert(config.hasOwnProperty('id'));
      if (this.getNode(config.id)) {
        throw Error('node already in store');
      }
      this.nodes.push(
        Graph.appendNodeDefaults.call(this.owner, config)
      );
    }
  }

  getNode(id) {
    return _.where(this.nodes, { id: id })[0];
  }

  getNodesByFn(fn) {
    return this.nodes.filter(fn);
  }

  getAdjacentNodes(id) {
    var adjacentNodes = [];
    var taken = {};
    var node;
    for (var i = 0; i < this.edges.length; i += 1) {
      var edge = this.edges[i];
      node = null;
      if (edge.source.id === id) {
        node = edge.target;
      } else if (edge.target.id === id) {
        node = edge.source;
      }

      if (node && !taken[node.id]) {
        taken[node.id] = true;
        adjacentNodes.push(node);
      }
    }

    return adjacentNodes;
  }

  getSuccessorNodes(id) {
    var successor = [];
    var taken = {};
    var node;
    for (var i = 0; i < this.edges.length; i += 1) {
      var edge = this.edges[i];
      node = null;
      if (edge.source.id === id) {
        node = edge.target;
      }
      if (node && !taken[node.id]) {
        taken[node.id] = true;
        successor.push(node);
      }
    }

    return successor;
  }

  getPredecessorNodes(id) {
    var predecessor = [];
    var taken = {};
    var node;
    for (var i = 0; i < this.edges.length; i += 1) {
      var edge = this.edges[i];
      node = null;
      if (edge.target.id === id) {
        node = edge.source;
      }
      if (node && !taken[node.id]) {
        taken[node.id] = true;
        predecessor.push(node);
      }
    }

    return predecessor;
  }

  removeNode(id) {
    return this.removeNodesByFn(function (v) {
      return v.id === id;
    });
  }

  removeNodes(nodes) {
    this.removeNodesByFn(function (v) {
      return _.find(nodes, {id: v.id});
    });
  }

  removeNodesByFn(fn) {
    var i;
    for (i = 0; i < this.nodes.length; i += 1) {
      if (fn(this.nodes[i])) {
        // remove nodes
        var node = this.nodes.splice(i, 1);
        // remove incident edges
        this.removeEdges(
          this.getIncidentEdges(node[0].id)
        );
        i -= 1;
      }
    }
  }

  // edges
  addEdge() {
    for (var i = 0; i < arguments.length; i += 1) {
      var config = arguments[i];
      assert(config.hasOwnProperty('source') && config.hasOwnProperty('target'));
      var source = config.source;
      var target = config.target;

      if (typeof source !== 'object') {
        source = this.getNode(config.source);
      }

      if (typeof target !== 'object') {
        target = this.getNode(config.target);
      }

      if (!source || !target) {
        throw Error('new edge does not join existing vertices');
      }
      config.source = source;
      config.target = target;
      this.edges.push(
        Graph.appendEdgeDefaults.call(this.owner, config)
      );
    }
  }

  getEdge(id) {
    return this.getEdgesByFn((e) => e.id === id)[0];
  }

  getEdgesBetween(u, v) {
    var incidentEdges = this.getIncidentEdges(u);
    return incidentEdges.filter(function (e) {
      return e.target.id === v;
    });
  }

  getAllEdgesBetween(u, v) {
    var incidentEdges = this.getIncidentEdges(u);
    return incidentEdges.filter(function (e) {
      return e.source.id === v || e.target.id === v;
    });
  }

  removeEdge(id) {
    this.removeEdgesByFn(function (e) {
      return e.id === id;
    });
  }

  removeEdges(edges) {
    // TODO: improve n^2 removal
    this.removeEdgesByFn(function (e) {
      return _.find(edges, {id: e.id});
    });
  }

  getEdgesByFn(fn) {
    return this.edges.filter(fn);
  }

  getOutgoingEdges(nodeId) {
    return this.getEdgesByFn((e) => e.source.id === nodeId);
  }

  getIncomingEdges(nodeId) {
    return this.getEdgesByFn((e) => e.target.id === nodeId);
  }

  getIncidentEdges(nodeId) {
    return this.getOutgoingEdges(nodeId)
      .concat(this.getIncomingEdges(nodeId));
  }

  removeEdgesByFn(fn) {
    var i;
    for (i = 0; i < this.edges.length; i += 1) {
      if (fn(this.edges[i])) {
        this.edges.splice(i, 1);
        i -= 1;
      }
    }
  }

  static appendNodeDefaults(v) {
    if (!v.hasOwnProperty('id')) {
      v.id = util.id();
    }

    v = extend(
      {},
      // predefined defaults
      NODE_DEFAULT_OPTIONS,
      // instance defaults
      this.options.nodeDefaults,
      // node
      v
    );

    if (!v.hasOwnProperty('width')) {
      v.width = 2 * v.r;
    }
    if (!v.hasOwnProperty('height')) {
      v.height = 2 * v.r;
    }
    return v;
  }

  static appendEdgeDefaults(e) {
    if (!e.hasOwnProperty('id')) {
      e.id = util.id();
    }
    e = extend(
      {},
      // predefined defaults
      EDGE_DEFAULT_OPTIONS,
      // instance defaults
      this.options.edgeDefaults,
      // edge
      e
    );
    return e;
  }
}

