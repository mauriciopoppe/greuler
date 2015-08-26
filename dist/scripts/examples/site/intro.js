'use strict';

(function () {
  var d3 = window.d3;
  var greuler = window.greuler;
  var instance = greuler({
    target: '#intro',
    width: 960,
    height: 400,
    animationTime: 3000,
    data: {
      nodes: [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ],
      links: [
        {source: 0, target: 1},
        {source: 0, target: 2},
        {source: 0, target: 3},
        {source: 1, target: 2},
        {source: 1, target: 3},
        {source: 2, target: 3},
        {source: 2, target: 4},
        {source: 3, target: 4}
      ]
    }
  }).update();

  var instruction = d3.select('#intro-description');

  function updateText(text) {
    var duration = 300;
    instruction
      .transition()
      .duration(duration)
      .style('opacity', 0)
      .each('end', function () {
        d3.select(this).html(text);
      })
      .transition()
      .duration(duration)
      .style('opacity', 1);
  }

  var gen = window.site.generator = new greuler.player.Generator(instance);

  gen.run(function *algorithm(instance) {
    yield function () {
      updateText('an undirected graph G');
    };

    yield function () {
      updateText('note that the layout has been automatically computed by WebCola');
    };

    yield function () {
      updateText('let\'s add a single node');
      instance.graph.addNode({ id: 5 });
      instance.update();
    };

    yield function () {
      updateText('and connect it with some existing nodes');
      instance.graph.addEdge(
        { source: 5, target: 1 },
        { source: 5, target: 0 }
      );
      instance.update();
    };

    yield function () {
      updateText('let\'s add another graph');
      instance.graph.addNode(
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
      );
      instance.graph.addEdge(
        { source: 6, target: 7 },
        { source: 7, target: 8 },
        { source: 6, target: 8 },
        { source: 8, target: 9 }
      );
      instance.update();
    };

    yield function () {
      updateText('and connect it to the original graph with some directed edges');

      instance.graph.addEdge(
        { source: 8, target: 1, directed: true },
        { source: 9, target: 2, directed: true }
      );
      instance.update();
    };

    yield function () {
      updateText('now let\'s remove node 2, see? the incident edges are now gone');

      instance.graph.removeNode({ id: 2 });
      instance.update();
    };

    yield function () {
      updateText('now let\'s remove the (8, 1) edge');
      instance.graph.removeEdges(
        instance.graph.getEdgesBetween({ source: 8, target: 1 })
      );
      instance.update();
    };

    yield function () {
      updateText('and add multiple edges between (8, 0) and (9, 4)');
      instance.graph.addEdge(
        { source: 8, target: 0 },
        { source: 8, target: 0, multiEdge: true },
        { source: 9, target: 4 },
        { source: 9, target: 4, multiEdge: true },
        { source: 9, target: 4, multiEdge: true }
      );
      instance.update();
    };

    yield function () {
      updateText('and also between (5, 5) and (1, 1)');
      instance.graph.addEdge(
        { source: 5, target: 5, multiEdge: true},
        { source: 5, target: 5, multiEdge: true},
        { source: 1, target: 1, multiEdge: true}
      );
      instance.update();
    };

    yield function () {
      updateText('let\'s make the graph directed');
      instance.options.directed = true;
      instance.update({ skipLayout: true });
    };

    yield function () {
      updateText('and add a weight to each edge');
      instance.graph.edges.forEach(function (e) {
        e.weight = Math.floor(Math.random() * 100);
      });
      instance.update({ skipLayout: true });
    };

    yield function () {
      updateText('now let\'s work with the existing nodes/edges');
    };

    yield function () {
      updateText("let's highlight the node we will work with, node 0");
      instance.selector.highlightNode({ id: 0 });
      instance.selector.getNode({ id: 0 })
        .transition()
        .attr('fill', greuler.colors.RED);
    };

    yield function () {
      updateText('moving from 0 to its successor nodes');
      instance.selector.traverseOutgoingEdges({ id: 0 });
    };

    yield function () {
      updateText('moving from predecessor nodes of 0 to 0 through its incoming edges');
      instance.selector.traverseIncomingEdges({ id: 0 });
    };

    yield function () {
      updateText('reset the style of the nodes and edges');
      instance.selector.getNodes()
        .transition()
        .attr('fill', greuler.colors.BLUE);
      instance.selector.getEdges()
        .transition()
        .attr('stroke', greuler.colors.LIGHT_GRAY);
    };

    yield function () {
      updateText('removing the weights');
      instance.graph.edges.forEach(function (e) {
        delete e.weight;
      });
      instance.update({ skipLayout: true });
    };

    yield function () {
      updateText('making the graph undirected again');
      instance.options.directed = false;
      instance.update({ skipLayout: true });
    };

    yield function () {
      updateText('removing parallel and loop edges');
      instance.graph.removeEdgesByFn(function (e) {
        return e.multiEdge;
      });
      instance.update({ skipLayout: true });
    };

    yield function () {
      updateText('now let\'s do something simple and fun <br/> let\'s find the number of backedges in an undirected graph!');
    };

    yield function () {
      updateText('ready?');
    };

    function *innerDfs(source) {
      updateText('in the visualization an edge colored as ' +
      '<span style="color: cyan">cyan</span> first and then <span style="color: red">red</span> ' +
      'is a back edge, <br /> it\'s found by checking if the both end vertices of a non traversed edge were visited before');

      instance.options.animationTime = 1000;
      gen.speed = 1000;

      var timeSpent = 0;
      var timeIn = [];
      var low = [];

      instance.graph.nodes.forEach(function (n) {
        timeIn[n.id] = -1;
      });

      function *dfs(u, p) {
        timeIn[u] = low[u] = ++timeSpent;

        yield function () {
          //instance.graph.getNode({ id: u }).topRightLabel = timeIn[u] + '/' + low[u];
          instance.selector.highlightNode({ id: u });
          instance.selector.getNode({ id: u })
            .transition()
            .attr('fill', 'black');
          //instance.update({ skipLayout: true });
        };

        var adjacent = instance.graph.getAdjacentNodes({ id: u });
        for (var i = 0; i < adjacent.length; i += 1) {
          var v = adjacent[i].id;

          if (v === p) { continue; }

          if (timeIn[v] === -1) {
            yield function () {
              instance.selector.traverseAllEdgesBetween({ source: u, target: v });
            };
            yield *dfs(v, u);
            low[u] = Math.min(low[u], low[v]);
          } else if (timeIn[v] < timeIn[u]) {
            // back edge
            //console.log(++total);

            yield function () {
              instance.selector.traverseAllEdgesBetween({ source: u, target: v }, {stroke: 'cyan'});
            };

            yield function () {
              instance.selector.traverseAllEdgesBetween({ source: u, target: v });
            };
            low[u] = Math.min(low[u], timeIn[v]);

            yield function () {
              //instance.graph.getNode({ id: u }).topRightLabel = timeIn[u] + '/' + low[u];
              instance.selector.highlightNode({ id: u });
              //instance.update({ skipLayout: true });
            };
          }
        }
      }

      yield *dfs(source, -1);

    }

    yield *innerDfs(0);

    yield function () {
      updateText('there are 4 backedges in the graph! <br /> that\'s it! thanks for watching :)');
    };
  });

})();
