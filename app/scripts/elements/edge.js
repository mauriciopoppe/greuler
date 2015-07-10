'use strict';

var d3 = window.d3;

import extend from 'extend';
import Vector from '../Vector';
import utils from '../utils';

export default function () {

  var owner;

  // TODO
  function selfLoop(uIndex, meta, margin) {
    var nodes = meta.nodes;
    var adjacent = meta.adjacent[uIndex];
    var dir = new Vector(0, 0);
    var u = nodes[uIndex];
    for (var i = 0; i < adjacent.length; i += 1) {
      var vIndex = adjacent[i];
      var v = nodes[vIndex];
      dir = Vector.unit(Vector.add(
        dir,
        Vector.unit(Vector.sub(u, v))
      ));
    }
    var up = Vector.add(u, Vector.scale(dir, margin));
    var mid = Vector.mid(u, up);
    var ort = Vector.orthogonal(dir);

    var right = Vector.add(mid, Vector.scale(ort, margin / 2));
    var left = Vector.add(mid, Vector.scale(ort, -margin / 2));

    return {
      path: [left, up, right],
      dir: ort
    };
  }

  function createPath(d, meta, margin) {
    var u, v;
    var current;
    var mid;
    if (d.source.index < d.target.index) {
      u = d.source;
      v = d.target;
    } else {
      u = d.target;
      v = d.source;
    }
    meta[u.index] = meta[u.index] || {};

    current = (meta[u.index][v.index] = meta[u.index][v.index] || {
      count: 1,
      mid: Vector.mid(u, v),
      direction: -1
    });

    var innerJoints = [];

    if (u.index === v.index) {
      // apply the following for self-loop edges
      extend(current, {
        unit: Vector.unit(new Vector(1, 1))
      });
      var loop = selfLoop(u.index, meta, margin * (current.count + 1));
      innerJoints = loop.path;
      d.unit = loop.dir;
      // innerJoints.push(
      //   Vector.add(
      //     u,
      //     Vector.scale(
      //       current.unit,
      //       margin * current.count
      //     )
      //   ),
      //   Vector.add(
      //     u,
      //     Vector.scale(
      //       Vector.orthogonal(current.unit),
      //       margin * current.count
      //     )
      //   )
      // );
    } else {
      extend(current, {
        unit: Vector.unit(
          Vector.sub(v, u)
        ),
        unitInverse: Vector.orthogonal(
          Vector.unit(
            Vector.sub(v, u)
          )
        )
      });

      mid = Vector.add(
        current.mid,
        Vector.scale(
          current.unitInverse,
          Math.floor(current.count / 2) * margin * current.direction
        )
      );
      innerJoints.push(mid);
      d.unit = current.unit;
    }

    current.count += 1;
    current.direction *= -1;
    d.path = [d.source]
      .concat(innerJoints)
      .concat([d.target]);
  }

  var line = d3.svg.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .tension(1.5)
    .interpolate('bundle');

  function inner(selection) {
    // edges
    var links = selection.selectAll('g.edge')
      .data(function (d) {
        return d.links;
      }, function (d) {
        return d.id;
      });
    links.enter().append('g')
      .attr('class', 'edge')
      .attr('id', function (d) { return utils.ns(d.id); });

    // update
    var meta = {
      // adjacent: adjacent,
      // nodes: nodes.data()
    };

    links
      .each(function (d) {
        var self = d3.select(this);
        var cls = [
          (d.directed || owner.options.directed) && 'directed',
          'source-' + d.source.id,
          'target-' + d.target.id
        ].filter(Boolean).join(' ');
        self.classed(cls, true);
      });

    links.each(function (d) {
      createPath(d, meta, 17);
    });

    // path enter
    var paths = links.selectAll('path')
      .data(function (d) { return [d.path]; });
    paths.enter()
      .append('path')
      .style('stroke', '#999')
      .style('fill', 'transparent')
      .style('opacity', .3)
      .style('stroke-width', 2);

    // path update
    utils.conditionalTransition(paths, !owner.nodeDragging)
      .attr('d', line);

    paths.each(function () {
      var path = d3.select(this);
      var parent = d3.select(this.parentNode);
      path.attr('marker-end',
        parent.classed('directed')
          ? 'url(#' + owner.markerId + ')'
          : null
      );
    });

    function weightPosition(selection) {
      selection
        .attr('opacity', 1)
        .attr('transform', function (d) {
          var angle = Vector.angleDeg(d.unit);
          var v = d.path[Math.floor(d.path.length / 2)];
          return utils.transform({
            translate: v,
            rotate: angle
          });
        });
    }

    var weights = links.selectAll('text')
      .data(function (d) { return [d]; });

    // weight enter
    weights.enter()
      .append('text')
      .attr('opacity', 0)
      .style('font-size', '10px')
      .style('dominant-baseline', 'text-after-edge')
      .style('text-anchor', 'middle')
      .text(function (d) {
        return d.weight || '';
      })
      .call(weightPosition);

    // weight update
    utils.conditionalTransition(weights, !owner.nodeDragging)
      .call(weightPosition);

    // weight exit
    weights.exit()
      .remove();

    // exit
    links.exit()
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
