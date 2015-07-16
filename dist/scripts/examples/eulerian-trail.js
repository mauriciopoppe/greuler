'use strict';
window.d3.json('scripts/examples/data/eulerian-graph.json', function (error, data) {

  var instance = greuler({
    target: '#eulerian-trail',
    width: 600,
    height: 600,
    animationTime: 500,
    data: data
  }).update();

  window.examples['eulerian-trail'] = function () {
    var greuler = window.greuler;

    var player = new greuler.player.Generator(instance);
    player.run(function *algorithm(instance) {
      var stack = [];
      var trail = [];

      function eulerianTrail(u) {
        stack.push(u);
        var edges = instance.graph.getIncidentEdges({ id: u });
        for (var i = 0; i < edges.length; i += 1) {
          var e = edges[i];
          var next = e.target.id === u ? e.source.id : e.target.id;

          if (e.used) { continue; }
          e.used = true;

          eulerianTrail(next);
        }
        trail.push(stack.pop());
      }
      eulerianTrail(0);

      // node traversal is given by trail
      for (var i = 0; i < trail.length; i += 1) {
        yield function () {
          instance.selector.traverseAllEdgesBetween(
            { source: trail[i], target: trail[i + 1] }
          );
        };
      }
    });
  };
});
