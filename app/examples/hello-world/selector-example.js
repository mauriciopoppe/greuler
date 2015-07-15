'use strict';
(function () {
  var d3 = window.d3;
  var greuler = window.greuler;

  var instance = greuler({
    target: '#selector-example',
    directed: true,
    width: 480,
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

  instance.fns = [
// keeping the indentation
function () {
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
},
function () {
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
},
function () {
  var order = instance.graph.nodes.length;
  var id = Math.floor(Math.random() * order);

  // get all the edges and reset their stroke style
  // with the `stroke` property stored in the edge datum
  instance.selector.getEdges()
    .attr('stroke', function (d) { return d.stroke; });

  instance.selector.highlightNode({ id: id });

  // traverse an edge with a custom animation, when an edge is
  // traversed it's automatically marked as red for you
  instance.selector.traverseIncomingEdges({ id: id });

  // edge traversal methods
  // - selector.traverseIncomingEdges
  // - selector.traverseOutgoingEdges
  // - selector.traverseIncidentEdges
},
function () {
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
},
function () {
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
}, function () {
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
}, function () {
  var size = instance.graph.edges.length;
  var edgeIndex = Math.floor(Math.random() * size);
  var edge = instance.graph.edges[edgeIndex];

  // you can always create your custom transition if you want
  // here a random node is colored with a random color from
  // a predefined d3 palette
  instance.selector.getEdge(edge)
    .transition('custom')
    .duration(1000)
    .attr('stroke', greuler.colors.randomFromPalette());
}
  ];

  var description = d3.select('#selector-example-description');

  function replaceText(d) {
    var items = d.toString().split('\n')
      .map(function (d) {
        return d.replace(/^\s\s/, '');
      });
    items.pop();
    items.shift();
    description.html(items.join('\n'));
    hljs.highlightBlock(description.node());
    d();
  }

  replaceText(instance.fns[0]);

  d3.select('#selector-example-numbers')
    .selectAll('span')
    .data(function () { return instance.fns; })
    .enter()
    .append('span')
    .html(function (d, i) { return i + 1; })
    .on('click', replaceText);
})();
