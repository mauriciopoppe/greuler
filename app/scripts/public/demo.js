'use strict';

var greuler = window.greuler;
(function () {
  var options = {
    target: '#hello-world',
    directed: true,
    height: 500,
    animationTime: 500,

    data: {
      nodes: [
        {id: 0},
        {id: 1},
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
  };
  var instance = greuler(options);

  //window.player = new greuler.player.FixedInterval([
  //  function () {
  //    instance.manager.addNode({ id: 11 });
  //    instance.update();
  //  },
  //  function () {
  //    instance.manager.removeNode(11);
  //    instance.update();
  //  },
  //  function () {
  //    instance.manager.removeNode(1);
  //    instance.update();
  //  },
  //  function () {
  //    instance.manager.addNode({ id: 1 });
  //    instance.manager.addEdge({ source: 1, target: 10, directed: true, weight: 50 });
  //    instance.manager.addEdge({ source: 1, target: 6, directed: true, weight: 100 });
  //    instance.update();
  //  },
  //  function () {
  //    instance.manager.removeNode(1);
  //    instance.update();
  //  },
  //  function () {
  //    var node = instance.manager.getNode(0);
  //    node.label = 'e';
  //    instance.selector.highlightNode({ source: 0 });
  //    instance.selector.highlightIncidentEdges({ source: 0 });
  //    instance.update();
  //  },
  //  function () {
  //    var edge = options.data.links[10];
  //    instance.manager.removeEdge(edge.id);
  //    instance.update();
  //  },
  //  function () {
  //    instance.selector.traverseEdgesBetween({
  //      source: 7,
  //      target: 8
  //    });
  //    instance.selector.traverseEdgesBetween({
  //      source: 7,
  //      target: 6
  //    });
  //    instance.selector.traverseIncidentEdges({
  //      source: 4,
  //      color: 'orange'
  //    });
  //  }
  //], 1000);
  //window.player.play();

  var gen = new greuler.player.Generator(instance);

  setTimeout(function () {
    gen.run(function *algorithm(instance) {
      var visited = [];

      function *dfs(u) {
        yield function () {
          instance.selector.highlightNode({ source: u });
        };
        visited[u] = true;

        var adjacent = instance.graph.getSuccessorNodes(u);
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
        instance.update();
        yield {
          type: 'selector',
          op: 'updateNode',
          args: [{ source: u, fill: 'black' }]
        };
      }

      yield *dfs(0);
    });
  }, 1000);

})();
