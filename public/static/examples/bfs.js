'use strict';

(function () {
  var greuler = window.greuler;

  var instance = greuler({
    target: '#demo',
    width: 600,
    height: 600,
    animationTime: 500,
    data: greuler.Graph.random({ connected: true })
  }).update();

  window.site.run = function () {
    var player = window.site.generator = new greuler.player.Generator(instance);
    player.run(function *algorithm(instance) {

      function *bfs(source) {
        // queue
        var distance = [];
        var q = [];
        var parent = [];

        function highlight(id, visit) {
          return function () {
            var node = instance.graph.getNode({ id: id });
            node.topRightLabel = distance[id];
            instance.selector.highlightNode({ id: id });
            if (visit) {
              instance.selector.getNode({ id: id })
                .transition()
                .attr('fill', 'black');
            }
            instance.update({skipLayout: true});
          };
        }

        distance[source] = 0;
        q.push(source);

        while (q.length) {
          var top = q.shift();
          var adjacent = instance.graph.getAdjacentNodes({ id: top });
          yield highlight(top, true);

          for (var i = 0; i < adjacent.length; i += 1) {
            var next = adjacent[i].id;

            if (next === parent[top]) { continue; }

            if (typeof distance[next] === 'undefined') {
              distance[next] = distance[top] + 1;
              parent[next] = top;
              q.push(next);

              yield function () {
                instance.selector.traverseAllEdgesBetween(
                  { source: top, target: next }
                );
              };
              yield highlight(next);
            } else {
              yield function () {
                instance.selector.traverseAllEdgesBetween(
                  { source: top, target: next },
                  { keepStroke: false }
                )
                  .transition()
                  .attr('opacity', 0.3);
              };
            }
          }
        }
      }

      yield *bfs(0);
    });
  };
})();
