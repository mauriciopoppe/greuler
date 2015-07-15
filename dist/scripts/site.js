'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var d3 = window.d3;
  var hljs = window.hljs;
  var site = window.site = {};

  site.fnShowcase = function (fns, ns) {
    var description = d3.select('#' + ns + '-description');
    var title = d3.select('#' + ns + '-title');
    var numbers = d3.select('#' + ns + '-numbers');

    function replaceText(d) {
      var items = d.fn.toString().split('\n')
        .map(function (d) {
          return d.replace(/^\s{6}/, '');
        });
      items.pop();
      items.shift();
      description.html(items.join('\n'));
      hljs.highlightBlock(description.node());
    }

    replaceText(fns[0]);

    numbers
      .selectAll('span')
      .data(function () { return fns; })
      .enter()
      .append('span')
      .html(function (d, i) { return i + 1; })
      .on('click', function (d) { d.fn(); })
      .on('mouseover', function (d) {
        replaceText(d);
        title.html(d.title);
      })
      .on('mouseout', function () {
        title.html(null);
      });
  };

  // code highligh
  d3.selectAll('pre code')
    .each(function () {
      hljs.highlightBlock(this);
    });

});

'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var d3 = window.d3;
  var greuler = window.greuler;

  var instance = greuler({
    target: '#graph-example',
    width: 480,
    height: 350,
    data: {
      nodes: [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5}
      ],
      links: [
        {source: 0, target: 1},
        {source: 0, target: 2, directed: true},
        {source: 0, target: 3},
        {source: 1, target: 2, directed: true},
        {source: 4, target: 0},
        {source: 5, target: 0, directed: true},
        {source: 4, target: 5}
      ]
    }
  }).update();

  instance.fns = [{
    title: 'add node',
    fn: function () {
      // let's keep this example simple and add a maximum of 10
      // nodes, this isn't related with the api btw, it's just to
      // avoid the creation of unnecessary nodes
      var id = -1;
      var nodes = [];
      var i;
      instance.graph.nodes.forEach(function (node) {
        nodes[node.id] = true;
      });
      for (i = 0; i < 10; i += 1) {
        if (typeof nodes[i] === 'undefined' && id === -1) {
          id = i;
          break;
        }
      }
      if (id === -1) {
        return;
      }

      instance.graph.addNode({ id: id });

      // after the structure of the graph has been changed it's
      // needed to trigger a new layout
      instance.update();
    }
  }, {
    title: 'remove node',
    fn: function () {
      var order = instance.graph.nodes.length;
      var last = instance.graph.nodes[order - 1];

      if (!last) {
        return;
      }

      // remove a node with an id < 10 if it exists in the graph
      // note that you can also call it with the node itself
      // e.g.
      //      instance.graph.removeNode(last)
      //
      instance.graph.removeNode({ id: last.id });

      // after the structure of the graph has been changed it's
      // needed to trigger a new layout
      instance.update();
    }
  }, {
    title: 'update node',
    fn: function () {
      var order = instance.graph.nodes.length;

      if (!order) { return; }

      var nodeIndex = Math.floor(Math.random() * order);
      var node = instance.graph.nodes[nodeIndex];

      var update = instance.graph.getNode({ id: node.id });
      update.label = '✓';
      update.topRightLabel = '∞';
      update.topLeftLabel = 'n';

      // note that this time the structure of the graph wasn't changed
      // only new properties were added to an existing node, therefore
      // we don't need to trigger a new layout
      instance.update({ skipLayout: true });
    }
  }, {
    title: 'add edge',
    fn: function () {
      var order = instance.graph.nodes.length;
      var size = instance.graph.edges.length;

      if (!order || size > 15) { return; }

      var uIndex = Math.floor(Math.random() * order);
      var vIndex = Math.floor(Math.random() * order);
      var u = instance.graph.nodes[uIndex];
      var v = instance.graph.nodes[vIndex];

      var edge = { source: u.id, target: v.id };
      // random edges have weight
      if (Math.random() > 0.5) {
        edge.weight = Math.floor(Math.random() * 10);
      }
      // random edges are directed
      Math.random() > 0.5 && (edge.directed = true);

      // Adding an edge to the graph between some existing nodes
      // in the graph
      instance.graph.addEdge(edge);

      // after the structure of the graph has been changed it's
      // needed to trigger a new layout
      instance.update();
    }
  }, {
    title: 'remove edge',
    fn: function () {
      var size = instance.graph.edges.length;
      var last = instance.graph.edges[size - 1];

      if (!last) {
        return;
      }

      // remove a node with an id < 10 if it exists in the graph
      // note that you can also call it with the node itself
      // e.g.
      //      instance.graph.removeNode(last)
      //
      instance.graph.removeEdge({ id: last.id });

      // after the structure of the graph has been changed it's
      // needed to trigger a new layout
      instance.update();
    }
  }, {
    title: 'update edge',
    fn: function () {
      var size = instance.graph.edges.length;

      if (!size) { return; }

      var edgeIndex = Math.floor(Math.random() * size);
      var edge = instance.graph.edges[edgeIndex];

      var update = instance.graph.getEdge({ id: edge.id });
      update.weight = '∞';
      update.directed = !update.directed;

      // note that this time the structure of the graph wasn't changed
      // only new properties were changed in an existing edge, therefore
      // we don't need to trigger a new layout
      instance.update({ skipLayout: true });
    }
  }, {
    title: 'removing multiple nodes in a batch operation',
    fn: function () {
      // we must explicitly tell greuler to trigger a new layout process,
      // this allows adding/removing multiple edges/nodes without updating
      // the layout
      instance.graph.removeNodesByFn(function (n) {
        return n.id > 5;
      });

      instance.update();
    }
  }];

  window.site.fnShowcase(instance.fns, 'graph-example');
});

'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var d3 = window.d3;
  var greuler = window.greuler;

  var instance = greuler({
    target: '#selector-example',
    directed: true,
    width: 480,
    height: 350,
    data: {
      nodes: [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5}
      ],
      links: [
        {source: 0, target: 1},
        {source: 0, target: 2},
        {source: 0, target: 3},
        {source: 1, target: 2},
        {source: 4, target: 0},
        {source: 5, target: 0},
        {source: 4, target: 5}
      ]
    }
  }).update();

  instance.fns = [{
    title: 'highlighting a node',
    fn: function () {
      var order = instance.graph.nodes.length;
      var size = instance.graph.edges.length;

      var id = Math.floor(Math.random() * order);

      // highlight the node whose id is `id`, the highlight
      // animation is predefined but the user can easily define a
      // custom animation, the default animation works by modifying
      // the `r` attribute of the circle that represents the node
      instance.selector.highlightNode({ id: id });

      // if we have the edge we can pass that object to the highlight edge method
      // however let's assume that we don't have it, we can pass the edge itself
      // and the selector will automatically get the d3 selection and perform the
      // highlight animation
      var edgeIndex = Math.floor(Math.random() * size);
      instance.selector.highlightEdge(
        instance.graph.edges[edgeIndex]
      );
    }
  }, {
    title: 'highlighting the incident edges of a node',
    fn: function () {
      var order = instance.graph.nodes.length;
      var id = Math.floor(Math.random() * order);
      instance.selector.highlightNode({ id: id });

      // a utility method that changes the color of all the incident
      // edges of the node `id`
      instance.selector.highlightIncidentEdges({ id: id });

      // highlight methods
      // - selector.highlightIncomingEdges
      // - selector.highlightOutgoingEdges
      // - selector.highlightIncidentEdges
    }
  }, {
    title: 'traversing through the outgoing edges of a node',
    fn: function () {
      var order = instance.graph.nodes.length;
      var id = Math.floor(Math.random() * order);

      // get all the edges and reset their stroke style
      // with the `stroke` property stored in the edge datum
      instance.selector.getEdges()
        .attr('stroke', function (d) { return d.stroke; });

      instance.selector.highlightNode({ id: id });

      // traverse an edge with a custom animation, when an edge is
      // traversed it's automatically marked as red for you
      instance.selector.traverseOutgoingEdges({ id: id });

      // edge traversal methods
      // - selector.traverseIncomingEdges
      // - selector.traverseOutgoingEdges
      // - selector.traverseIncidentEdges
    }
  }, {
    title: 'traversing through the incoming edges using additional options',
    fn: function () {
      var order = instance.graph.nodes.length;
      var id = Math.floor(Math.random() * order);

      instance.selector.getEdges()
        .attr('stroke', function (d) { return d.stroke; });

      instance.selector.highlightNode({ id: id });

      // same as the previous example, but this time the stroke is
      // not kept
      instance.selector.traverseIncomingEdges(
        { id: id },
        { keepStroke: false }
      );
    }
  }, {
    title: 'traversing the edges between a source node and a target node',
    fn: function () {
      var order = instance.graph.nodes.length;
      var u = Math.floor(Math.random() * order);
      var v = Math.floor(Math.random() * order);

      instance.selector.getEdges()
        .attr('stroke', function (d) { return d.stroke; });

      instance.selector.highlightNode({ id: u });
      instance.selector.highlightNode({ id: v });
      instance.selector.traverseAllEdgesBetween({
        source: u,
        target: v
      });
    }
  }, {
    title: 'custom transitions on nodes',
    fn: function () {
      var order = instance.graph.nodes.length;
      var id = Math.floor(Math.random() * order);

      // you can always create your custom transition if you want
      // here a random node is colored with a random color from
      // a predefined d3 palette
      instance.selector.getNode({ id: id })
        .transition('custom')
        .duration(1000)
        .attr('fill', greuler.colors.randomFromPalette());

      // check out `greuler.colors` for the palette
    }
  }, {
    title: 'custom transitions on edges',
    fn: function () {
      var size = instance.graph.edges.length;
      var edgeIndex = Math.floor(Math.random() * size);
      var edge = instance.graph.edges[edgeIndex];

      // you can always create your custom transition if you want
      // here a random node is colored with a random color from
      // a predefined d3 palette
      instance.selector.getEdge({ id: edge.id })
        .transition('custom')
        .duration(1000)
        .attr('stroke', greuler.colors.randomFromPalette());
    }
  }];

  window.site.fnShowcase(instance.fns, 'selector-example');
});

//{
//"name": "greuler",
//  "dependencies": {
//  "skeleton": "~2.0.4",
//    "vivus": "~0.2.2"
//}
//}
