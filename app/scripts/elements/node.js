'use strict';

var d3 = window.d3;

import utils from '../utils';
import {color} from '../const';

export default function () {

  var owner;

  //function highlightEdge(edge, highlight) {
  //  owner.root.selectAll('.link.' + edge.id)
  //    .selectAll('path')
  //    .each(function (d) {
  //      var parent = d3.select(this.parentNode);
  //      highlight = highlight || parent.classed('highlight');
  //      d3.select(this)
  //        .transition()
  //        .style('opacity', highlight ? 1 : 0.3)
  //        .style('stroke', highlight ? color.range()[3] : '#999');
  //    });
  //}
  //
  //function incoming(d, over) {
  //  if (data.highlightIncomingEdges) {
  //    owner.root
  //      .selectAll('.link.target-' + d.id)
  //      .each(function (d) {
  //        highlightEdge(d, over);
  //      });
  //  }
  //}
  //
  //function outgoing(d, over) {
  //  if (data.highlightOutgoingEdges) {
  //    svg
  //      .selectAll('.link.source-' + d.id)
  //      .each(function (d) {
  //        highlightEdge(d, over);
  //      });
  //  }
  //}

  function inner(selection) {
    var nodes = selection
      .selectAll('g.node')
      .data(function (d) {
        return d.nodes;
      }, function (d) {
        return d.id;
      });

    var layout = owner.layout;

    var g = nodes.enter().append('g')
      .attr('class', function (d) {
        return 'node ' + (d.class || '');
      })
      .attr('id', function (d) { return utils.ns(d.id); })
      //.on('mouseover', function (d) {
      //  var el = d3.select(this);
      //  if (!el.over) {
      //    //incoming(d, true);
      //    //outgoing(d, true);
      //    el.style('cursor', 'pointer');
      //  }
      //  el.over = true;
      //})
      //.on('mouseout', function (d) {
      //  var el = d3.select(this);
      //  el.over = false;
      //  //incoming(d, false);
      //  //outgoing(d, false);
      //  el.style('cursor', null);
      //})
      .call(layout.drag);

    var dragStart = layout.drag().on('dragstart.d3adaptor');
    var dragEnd = layout.drag().on('dragend.d3adaptor');
    layout.drag()
      .on('dragstart.d3adaptor', function () {
        owner.nodeDragging = true;
        dragStart.apply(undefined, arguments);
      })
      .on('dragend.d3adaptor', function () {
        owner.nodeDragging = false;
        dragEnd.apply(undefined, arguments);
      });

    g.append('circle')
      .attr('fill', function (d) { return color(0); });

    // circle update
    nodes.selectAll('circle')
      .attr('r', function (d) { return d.radius; });

    g.append('text')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('y', 5);

    // text update
    nodes.selectAll('text')
      //.attr('opacity', data.labels ? 1 : 0)
      .text(function (d) {
        if ('label' in d) {
          return d.label;
        }
        return d.id;
      });

    g.attr('transform', function (d) {
      return utils.transform({
        translate: d
      });
    });

    // update
    utils.conditionalTransition(nodes, !owner.nodeDragging)
      .attr('transform', function (d) {
        return utils.transform({
          translate: d
        });
      });

    // exit
    nodes.exit()
      .transition()
      .attr('opacity', 0)
      .remove();
  }

  inner.owner = function (value) {
    if (!arguments.length) {
      return owner;
    }
    owner = value;
    return inner;
  };

  return inner;
}
