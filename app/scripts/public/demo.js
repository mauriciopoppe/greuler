'use strict';

var greuler = window.greuler;
(function () {
  var options = {
    target: '#hello-world',
    directed: true,
    linkDistance: 70,
    height: 500,
    animationTime: 1000,
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

  function play(actions, speed, delay) {
    var id;
    var i = 0;
    function doPlay() {
      if (i >= actions.length) {
        return;
      }
      id = setTimeout(function () {
        actions[i++]();
        doPlay(i);
      }, speed);
    }

    setTimeout(function () {
      doPlay(i);
    }, delay || 0);

    return {
      pause: function () {
        clearTimeout(id);
      },
      resume: function () {
        doPlay(i);
      }
    };
  }

  window.player = play([
    function () {
      instance.manager.addNode({ id: 11 });
      instance.update();
    },
    function () {
      instance.manager.removeNode(11);
      instance.update();
    },
    function () {
      instance.manager.removeNode(1);
      instance.update();
    },
    function () {
      instance.manager.addNode({ id: 1 });
      instance.manager.addEdge({ source: 1, target: 10, directed: true, weight: 50 });
      instance.manager.addEdge({ source: 1, target: 6, directed: true, weight: 100 });
      instance.update();
    },
    function () {
      instance.manager.removeNode(1);
      instance.update();
    },
    function () {
      var node = instance.manager.getNode(0);
      node.label = 'e';
      instance.update();
      instance.selector.highlightNode(0);
      instance.selector.highlightIncidentEdges(0);
    },
    function () {
      var edge = options.data.links[10];
      instance.manager.removeEdge(edge.id);
      instance.update();
    },
    function () {
      instance.selector.traverseEdgesBetween(7, 8);
      instance.selector.traverseEdgesBetween(7, 6);
      instance.selector.traverseIncidentEdges(4);
    }
    //function () {
    //  instance.selector.incomingEdges(3)
    //    .selectAll('path')
    //    .transition('test')
    //    .attr('stroke', 'red');
    //},
    //function () {
    //  instance.selector.outgoingEdges(3)
    //    .selectAll('path')
    //    .transition('test')
    //    .attr('stroke', 'red');
    //},
    //function () {
    //  instance.selector.outgoingEdges(3)
    //    .selectAll('path')
    //    .transition('test')
    //    .attr('stroke', 'red');
    //}
  ], 1000);
})();
