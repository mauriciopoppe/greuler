'use strict';

(function () {
  var greuler = window.greuler;
  var instance = greuler({
    target: '#dfs',
    height: 500,
    animationTime: 500,
    data: {
      nodes: [
        {id: 0, x: 0, y: 0},
        {id: 1, x: 150, y: 150},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10}
      ],
      links: [
        {source: 0, target: 0, weight: 50},
        {source: 0, target: 0, weight: 70},
        {source: 0, target: 0, weight: 100},
        {source: 0, target: 1, weight: 50},
        {source: 0, target: 1, directed: true},
        {source: 1, target: 2, weight: 30},
        {source: 2, target: 3},
        {source: 3, target: 6},
        {source: 6, target: 7},
        {source: 7, target: 10},
        {source: 0, target: 10},
        {source: 8, target: 10},
        {source: 8, target: 9},
        {source: 9, target: 10},
        {source: 5, target: 8},
        {source: 5, target: 7},
        {source: 7, target: 8},
        {source: 5, target: 6},
        {source: 4, target: 5},
        {source: 3, target: 4},
        {source: 1, target: 3},
        {source: 1, target: 6}
      ]
    }
  }).update();

  window.examples.dfs = function () {
    var gen = new greuler.player.Generator(instance);

    gen.run(function *algorithm(instance) {
      var visited = [];

      function *dfs(u) {
        yield function () {
          instance.selector.highlightNode({ source: u });
        };
        visited[u] = true;

        var adjacent = instance.graph.getAdjacentNodes(u);
        for (var i = 0; i < adjacent.length; i += 1) {
          var v = adjacent[i].id;
          if (!visited[v]) {
            yield {
              type: 'selector',
              op: 'traverseEdgesBetween',
              args: [{ source: u, target: v}]
            };
            yield *dfs(v);
          } else {
            yield {
              type: 'selector',
              op: 'traverseEdgesBetween',
              args: [{ source: u, target: v, keepStroke: false }]
            };
          }
        }

        instance.graph.getNode(u).topRight = '✔';
        instance.update({ skipLayout: true });
        yield {
          type: 'selector',
          op: 'updateNode',
          args: [{ source: u, fill: 'black' }]
        };
      }

      yield *dfs(0);
    });
  };
})();
