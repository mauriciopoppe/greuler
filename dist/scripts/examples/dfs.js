'use strict';

(function () {
  var greuler = window.greuler;

  var instance = greuler({
    target: '#demo',
    height: 500,
    animationTime: 500,
    data: greuler.Graph.random({ connected: true })
  }).update();

  window.site.run = function () {
    var player = window.site.generator = new greuler.player.Generator(instance);
    player.run(function *algorithm(instance) {
      var visited = [];

      function *dfs(u, p) {
        yield function () {
          instance.selector.highlightNode({ id: u });
        };
        visited[u] = true;

        var adjacent = instance.graph.getAdjacentNodes({ id: u });
        for (var i = 0; i < adjacent.length; i += 1) {
          var v = adjacent[i].id;

          if (v === p) { continue; }

          if (!visited[v]) {
            yield function () {
              instance.selector.traverseAllEdgesBetween({ source: u, target: v });
            };
            yield *dfs(v, u);
          } else {
            yield function () {
              instance.selector.traverseAllEdgesBetween(
                { source: u, target: v },
                { keepStroke: false }
              )
                .transition()
                .attr('opacity', 0.3);
            };
          }
        }

        yield function () {
          instance.selector.getNode({ id: u })
            .transition()
            .attr('fill', 'black');
        };
      }

      yield *dfs(0, -1);
    });
  };
})();
