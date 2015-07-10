'use strict';

var d3 = window.d3;
var cola = window.cola;

import extend from 'extend';
import node from './elements/node';
import edge from './elements/edge';
import GraphManager from './Graph';

class Draw {
  constructor(id, options) {
    this.markerId = 'marker-' + id;

    this.defaultOptions(options);

    // sub-elements that draw stuff
    this.nodeDrawer = node().owner(this);
    this.edgeDrawer = edge().owner(this);

    this.update();

    // graph handles the interactions with the drawer
    this.manager = new GraphManager(this, this.options.data);
  }

  /**
   *
   * @param {Object} options
   *
   * options
   *   - target {string} selector to the element to hold the graph
   *   - data {Object}
   *     - groups {Array[Objects]}
   *     - nodes {Array[Objects]}
   *     - links {Array[Objects]}
   *       - class="" {string} additional class set to the edge
   *       - directed=false {boolean} true to give an orientation to this edge
   *       - value="" {string} Label of the edge (can be the weight)
   *     - width {number}
   *     - height {number}
   *     - linkDistance=90 {number} Forced min distance between vertices that
   *     have an edge
   *     - labels=true {boolean} False to hide the vertex labels
   *     - draggable=false {boolean} True to enable node drag
   *     - tree=false {boolean} True to layout the graph as a tree
   *     - directed=false {boolean} True to give an orientation to the edges
   *     - highlightIncomingEdges=false {boolean} true to highlight the incoming
   *     edges of a vertex on mouseover
   *     - highlightOutgoingEdges=false {boolean} true to highlight the outgoing
   *     edges of a vertex on mouseover
   *
   */
  defaultOptions(options) {
    options.data = extend({
      groups: [],
      constraints: []
    }, options.data);

    // node/edge defaults
    options.data.nodes.forEach(GraphManager.nodeDefaults);
    options.data.links.forEach(GraphManager.edgeDefaults);

    // graph defaults
    this.options = extend({
      width: 700,
      height: 300,
      linkDistance: 90,
      labels: true,
      //treeLayout: false,
      directed: false,
      draggable: true
    }, options);
  }

  initLayout() {
    var options = this.options;
    var hasLayout = !!this.layout;

    if (!hasLayout) {
      this.layout = cola.d3adaptor();
    }

    this.layout
      .linkDistance(function (d) {
        return d.linkDistance || options.linkDistance;
      })
      .avoidOverlaps(true)
      //.handleDisconnected(true)
      //.convergenceThreshold(0.1)
      .size([options.width, options.height])
      .nodes(options.data.nodes)
      .links(options.data.links)
      .constraints(options.data.constraints)
      .groups(options.data.groups);

    this.layout.start();

    this.tick();
  }

  tick() {
    var self = this;
    // event tick is fired async
    this.layout.on('tick', function () {
      self.edgeGroup.call(self.edgeDrawer);
      self.nodeGroup.call(self.nodeDrawer);
    });
  }

  update() {
    this.initLayout();
    this.build();
  }

  build() {
    this.root = d3.select(this.options.target)
      .selectAll('svg.greuler')
      .data([this.options]);

    // enter
    this.root.enter = this.root.enter()
      .append('svg')
      .attr('class', 'greuler');

    // marker def
    this.root.enter
      .append('svg:defs')
      .append('svg:marker')
      .attr('id', this.markerId)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-4L10,0L0,4L2,0')
      .attr('stroke-width', '0px')
      .attr('fill-opacity', .8)
      .attr('fill', 'black');

    // update
    this.root
      .attr('width', this.options.width)
      .attr('height', this.options.height);

    // wrapper for the edges
    this.edgeGroup = this.root
      .selectAll('g.edges')
      .data(function (d) { return [d.data]; });
    this.edgeGroup
      .enter().append('g')
      .attr('class', 'edges');

    // wrapper for the nodes
    this.nodeGroup = this.root
      .selectAll('g.nodes')
      .data(function (d) { return [d.data]; });
    this.nodeGroup
      .enter().append('g')
      .attr('class', 'nodes');
  }
  // public

}

export default Draw;
