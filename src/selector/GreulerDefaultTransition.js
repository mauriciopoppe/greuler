'use strict';

const d3 = window.d3;

import {colors} from '../const';
import extend from 'extend';
import Graph from './Graph';

var HIGHLIGHT = 'highlight';

export default class GreulerDefaultTransition extends Graph {

  innerEdgeSelector(selection) {
    return selection
      .selectAll('path.base');
  }

  innerNodeSelector(selection) {
    return selection
      .selectAll('circle');
  }

  getEdges() {
    return this.innerEdgeSelector(
      this.select(this.graph.edges)
    );
  }

  getNodes() {
    return this.innerNodeSelector(
      this.select(this.graph.nodes)
    );
  }

  doTemporalHighlightNode(selection, options) {
    return this.innerNodeSelector(selection)
      .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => options.r || (d.r * 1.5))
      .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => d.r);
  }

  doTemporalHighlightEdges(selection, options) {
    return this.innerEdgeSelector(selection)
    .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', options.stroke)
    .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', (d) => d.stroke);
  }

  traverseEdgeWithDirection(selection, options, source = -1) {
    return selection
      .selectAll('path.traversal')
      .each(function () {
        var el = d3.select(this);
        var l = this.getTotalLength();
        el
          .attr('stroke', options.stroke)
          .attr('stroke-dasharray', `${l} ${l}`)
          .attr('stroke-dashoffset', l)
          .attr('opacity', 1);
      })
      .transition('dasharray')
      .duration(options.duration)
      .attr('stroke-dashoffset', function (d) {
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
      })
      .attr('opacity', 0)
      .each('end', function () {
        var el = d3.select(this);
        el.attr('stroke-dasharray', null)
          .attr('stroke-dashoffset', null)
          .attr('opacity', 0);
      });
  }

  traverseEdges(selection, options, source) {
    options = extend({
      keepStroke: true,
      reverse: false
    }, this.getStyleOptions(), options);

    selection.call(this.traverseEdgeWithDirection, options, source);
    if (options.keepStroke) {
      this.innerEdgeSelector(selection)
        .transition('update')
        .duration(options.duration)
        .attr('stroke', options.stroke);
    }
    return this.innerEdgeSelector(selection);
  }

  getNode(node) {
    return this.innerNodeSelector(
      this.select(this.graph.getNode(node))
    );
  }

  getEdge(edge) {
    return this.innerEdgeSelector(
      this.select(this.graph.getEdge(edge))
    );
  }

  // temporal highlight

  highlightNode(node, options) {
    return this.doTemporalHighlightNode(
      this.select(this.graph.getNode(node)),
      this.getStyleOptions(options)
    );
  }

  highlightEdge(edge, options) {
    return this.doTemporalHighlightEdges(
      this.select(this.graph.getEdge(edge)),
      this.getStyleOptions(options)
    );
  }

  highlightIncidentEdges(node, options) {
    return this.doTemporalHighlightEdges(
      this.select(this.graph.getIncidentEdges(node)),
      this.getStyleOptions(options)
    );
  }

  highlightOutgoingEdges(node, options) {
    return this.doTemporalHighlightEdges(
      this.select(this.graph.getOutgoingEdges(node)),
      this.getStyleOptions(options)
    );
  }

  highlightIncomingEdges(node, options) {
    return this.doTemporalHighlightEdges(
      this.select(this.graph.getIncomingEdges(node)),
      this.getStyleOptions(options)
    );
  }

  // traversal of an edge given a node

  traverseOutgoingEdges(node, options) {
    return this.traverseEdges(
      this.select(this.graph.getOutgoingEdges(node)),
      this.getStyleOptions(options)
    );
  }

  traverseIncomingEdges(node, options) {
    return this.traverseEdges(
      this.select(this.graph.getIncomingEdges(node)),
      this.getStyleOptions(options)
    );
  }

  traverseIncidentEdges(node, options) {
    return this.traverseEdges(
      this.select(this.graph.getIncidentEdges(node)),
      this.getStyleOptions(options)
    );
  }

  // traversal of an edge between two nodes

  traverseEdgesBetween(edge, options) {
    return this.traverseEdges(
      this.select(
        this.graph.getEdgesBetween(edge)
      ),
      this.getStyleOptions(options),
      edge.source
    );
  }

  traverseAllEdgesBetween(edge, options) {
    return this.traverseEdges(
      this.select(
        this.graph.getAllEdgesBetween(edge)
      ),
      this.getStyleOptions(options),
      edge.source
    );
  }
}
