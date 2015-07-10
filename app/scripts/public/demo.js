'use strict';

var greuler = window.greuler;
(function () {
  var options = {
    target: '#hello-world',
    linkDistance: 70,
    height: 500,
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

  setTimeout(function () {
    instance.manager.addNode({ id: 11 });
    instance.update();
  }, 1000);

  setTimeout(function () {
    instance.manager.removeNode(11);
    instance.update();
  }, 2000);

  setTimeout(function () {
    //var nodeEl = instance.manager.getNodeSelection(1);
    //nodeEl.selectAll('circle')
    //  .transition()
    //  .attr('r', 20);
  }, 3000);
})();
