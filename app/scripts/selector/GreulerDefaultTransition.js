'use strict';

const d3 = window.d3;

import {colors} from '../const';
import extend from 'extend';
import Graph from './Graph';

var HIGHLIGHT = 'highlight';

export default class GreulerDefaultTransition extends Graph {

  doTemporalHighlightNode(selection, options) {
    return selection
      .selectAll('circle')
      .each(function (d) {
        d.$radius = d3.select(this).attr('r');
      })
      .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => d.$radius * 1.5)
      .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => d.$radius)
      .each('end', function (d) {
        delete d.$radius;
      });
  }

  doTemporalHighlightEdges(selection, options) {
    return selection
      .selectAll('path.base')
      .each(function (d) {
        d.$stroke = d3.select(this).attr('stroke');
      })
    .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', options.color)
    .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', (d) => d.$stroke)
      .each('end', function (d) {
        delete d.$stroke;
      });
  }

  traverseEdgeWithDirection(selection, options) {
    return selection
      .selectAll('path.traversal')
      .each(function () {
        var el = d3.select(this);
        var l = this.getTotalLength();
        el
          .attr('stroke', options.color)
          .attr('stroke-dasharray', `${l} ${l}`)
          .attr('stroke-dashoffset', l)
          .attr('opacity', 1);
      })
      .transition('dasharray')
      .duration(options.duration)
      .attr('stroke-dashoffset', function () {
        var parentDatum = d3.select(this.parentNode).datum();
        var l = this.getTotalLength();
        if (options.source !== -1) {
          // reverse animation
          if (parentDatum.target.id === options.source) {
            return l * 2;
          }
        }
        return 0;
      })
      .attr('opacity', 0)
      .each('end', function () {
        var el = d3.select(this);
        el.attr('stroke-dasharray', null)
          .attr('stroke-dashoffset', null)
          .attr('opacity', 0);
      });
  }

  updateEdges(selection, options) {
    var transition = selection
      .selectAll('path.base')
      .transition('update')
      .duration(options.duration);
    options.color && transition.attr('stroke', options.color);
    return transition;
  }

  updateNodes(selection, options) {
    var transition = selection
      .selectAll('circle')
      .transition('update')
      .duration(options.duration);
    options.fill && transition.attr('fill', options.fill);
    options.r && transition.attr('r', options.r);
    return transition;
  }

  traverseEdges(selection, options) {
    options = this.updateOptions(options);
    options = extend({
      keepStroke: true
    }, options);

    selection.call(this.traverseEdgeWithDirection, options);
    if (options.keepStroke) {
      selection.call(this.updateEdges, options);
    }
    return selection;
  }

  // the following functions are intercepted so that
  // options is augmented with the default options

  updateNode(options) {
    options = this.updateOptions(options);
    return this.updateNodes(
      this.select(this.graph.getNode(options.source)),
      options
    );
  }

  highlightNode(options) {
    options = this.updateOptions(options);
    return this.doTemporalHighlightNode(
      this.select(this.graph.getNode(options.source)),
      options
    );
  }

  highlightIncidentEdges(options) {
    options = this.updateOptions(options);
    return this.doTemporalHighlightEdges(
      this.select(this.graph.getIncidentEdges(options.source)),
      options
    );
  }

  traverseOutgoingEdges(options) {
    options = this.updateOptions(options);
    return this.traverseEdges(
      this.select(this.graph.getOutgoingEdges(options.source)),
      options
    );
  }

  traverseIncomingEdges(options) {
    options = this.updateOptions(options);
    return this.traverseEdges(
      this.select(this.graph.getIncomingEdges(options.source)),
      options
    );
  }

  traverseIncidentEdges(options) {
    return this.traverseEdges(
      this.select(this.graph.getIncidentEdges(options.source)),
      options
    );
  }

  traverseEdgesBetween(options) {
    options = this.updateOptions(options);
    return this.traverseEdges(
      this.select(
        this.graph.getAllEdgesBetween(
          options.source,
          options.target
        )
      ),
      options
    );
  }
}
