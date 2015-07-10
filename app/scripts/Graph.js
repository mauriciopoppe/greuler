'use strict';

import assert from 'assert';
import util from './utils';

export default class Graph {
  constructor(owner, data) {
    this.owner = owner;
    this.nodes = data.nodes;
    this.edges = data.links;
  }

  // nodes
  addNode(config) {
    assert(config.id);
    if (this.getNode(config.id)) {
      throw Error('node already in store');
    }
    this.nodes.push(
      Graph.nodeDefaults(config)
    );
  }

  getNode(id) {
    return this.getNodesByFn((v) => v.id === id)[0];
  }

  removeNode(id) {
    return this.removeNodesByFn(function (v) {
      return v.id === id;
    });
  }

  getNodesByFn(fn) {
    var i;
    var nodes = [];
    for (i = 0; i < this.nodes.length; i += 1) {
      if (fn(this.nodes[i])) {
        nodes.push(this.nodes[i]);
      }
    }
    return nodes;
  }

  removeNodesByFn(fn) {
    var i;
    for (i = 0; i < this.nodes.length; i += 1) {
      if (fn(this.nodes[i])) {
        // remove nodes
        var node = this.nodes.splice(i, 1);

        // remove incident edges
        this.removeIncidentEdges(node[0].id);
        i -= 1;
      }
    }
  }

  // edges
  addEdge(config) {
    assert('source' in config && 'target' in config);
    var source = this.getNode(config.source);
    var target = this.getNode(config.target);
    if (!source || !target) {
      throw Error('edge does not join existing vertices');
    }
    config.source = source;
    config.target = target;
    this.edges.push(
      Graph.edgeDefaults(config)
    );
  }

  getEdge(id) {
    return this.getEdgesByFn((e) => e.id === id)[0];
  }

  removeEdge(id) {
    this.removeEdgesByFn(function (e) {
      return e.id === id;
    });
  }

  getEdgesByFn(fn) {
    var i;
    var edges = [];
    for (i = 0; i < this.edges.length; i += 1) {
      if (fn(this.edges[i])) {
        edges.push(this.edges[i]);
      }
    }
    return edges;
  }

  removeIncidentEdges(nodeId) {
    this.removeOutgoingEdges(nodeId);
    this.removeIncomingEdges(nodeId);
  }

  removeOutgoingEdges(nodeId) {
    this.removeEdgesByFn((e) => e.source.id === nodeId);
  }

  removeIncomingEdges(nodeId) {
    this.removeEdgesByFn((e) => e.target.id === nodeId);
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

  static nodeDefaults(v) {
    if (!v.hasOwnProperty('id')) {
      v.id = util.id();
    }
    v.radius = v.radius || 10;
    v.width = v.width || 2 * v.radius;
    v.height = v.height || 2 * v.radius;
    return v;
  }

  static edgeDefaults(e) {
    if (!e.hasOwnProperty('id')) {
      e.id = util.id();
    }
    return e;
  }
}
