'use strict';

import utils from './utils';

export default class ElementSelector {
  constructor(owner) {
    this.owner = owner;
    this.graph = owner.manager;
  }

  // nodes
  nodesByFn(fn) {
    var nodes = this.graph.getNodesByFn(fn);
    // empty selection
    if (!nodes.length) {
      nodes.push({ id: -1 });
    }
    return this.owner.root.selectAll(
      nodes.map(function (e) {
        return '#' + utils.ns(e.id);
      }).join(', ')
    );
  }

  // edges
  edgesByFn(fn) {
    var edges = this.graph.getEdgesByFn(fn);
    // empty selection
    if (!edges.length) {
      edges.push({ id: -1 });
    }
    return this.owner.root.selectAll(
      edges.map(function (e) {
        return '#' + utils.ns(e.id);
      }).join(', ')
    );
  }
}
