window.apiSelector = function () {
  const target = document.querySelector('#selector-example')

  const instance = greuler({
    target: target,
    directed: true,
    data: {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 1, target: 2 },
        { source: 4, target: 0 },
        { source: 5, target: 0 },
        { source: 4, target: 5 }
      ]
    }
  }).update()

  // prettier-ignore
  instance.fns = [
    {
      title: 'highlighting a random node and edge',
      fn: function () {
        // highlights a random node in the graph
        // the default animation modifies the `r` attribute of the circle that represents the node
        const order = instance.graph.nodes.length
        const nodeIndex = Math.floor(Math.random() * order)
        instance.selector.highlightNode(instance.graph.nodes[nodeIndex])

        // if we have the edge we can pass that object to the highlight edge method
        // however let's assume that we don't have it, we can pass the edge itself
        // and the selector will automatically get the d3 selection and perform the
        // highlight animation
        const size = instance.graph.edges.length
        const edgeIndex = Math.floor(Math.random() * size)
        instance.selector.highlightEdge(instance.graph.edges[edgeIndex])
      }
    },
    {
      title: 'highlighting the incident edges of a node',
      fn: function () {
        const order = instance.graph.nodes.length
        const id = Math.floor(Math.random() * order)
        instance.selector.highlightNode({ id: id })

        // a utility method that changes the color of all the incident
        // edges of the node `id`
        instance.selector.highlightIncidentEdges({ id: id })

        // highlight methods
        // - selector.highlightIncomingEdges
        // - selector.highlightOutgoingEdges
        // - selector.highlightIncidentEdges
      }
    },
    {
      title: 'traversing through the outgoing edges of a node',
      fn: function () {
        const order = instance.graph.nodes.length
        const id = Math.floor(Math.random() * order)

        // get all the edges and reset their stroke style
        // with the `stroke` property stored in the edge datum
        instance.selector.getEdges()
          .attr('stroke', d => d.stroke)

        instance.selector.highlightNode({ id: id })

        // traverse an edge with a custom animation, when an edge is
        // traversed it's automatically marked as red for you
        instance.selector.traverseOutgoingEdges({ id: id })

        // edge traversal methods
        // - selector.traverseIncomingEdges
        // - selector.traverseOutgoingEdges
        // - selector.traverseIncidentEdges
      }
    },
    {
      title: 'traversing through the incoming edges using additional options',
      fn: function () {
        const order = instance.graph.nodes.length
        const id = Math.floor(Math.random() * order)

        instance.selector.getEdges()
          .attr('stroke', d => d.stroke)

        instance.selector.highlightNode({ id: id })

        // same as the previous example, but this time the stroke is
        // not kept
        instance.selector.traverseIncomingEdges({ id: id }, { keepStroke: false })
      }
    },
    {
      title: 'traversing the edges between a source node and a target node',
      fn: function () {
        const order = instance.graph.nodes.length
        const u = Math.floor(Math.random() * order)
        const v = Math.floor(Math.random() * order)

        instance.selector.getEdges()
          .attr('stroke', d => d.stroke)

        instance.selector.highlightNode({ id: u })
        instance.selector.highlightNode({ id: v })
        instance.selector.traverseAllEdgesBetween({
          source: u,
          target: v
        })
      }
    },
    {
      title: 'custom transitions on nodes',
      fn: function () {
        const order = instance.graph.nodes.length
        const id = Math.floor(Math.random() * order)

        // you can always create your custom transition if you want
        // here a random node is colored with a random color from
        // a predefined d3 palette
        instance.selector
          .getNode({ id: id })
          .transition('custom')
          .duration(1000)
          .attr('fill', greuler.colors.randomFromPalette())

        // check out `greuler.colors` for the palette
      }
    },
    {
      title: 'custom transitions on edges',
      fn: function () {
        const size = instance.graph.edges.length
        const edgeIndex = Math.floor(Math.random() * size)
        const edge = instance.graph.edges[edgeIndex]

        // you can always create your custom transition if you want
        // here a random node is colored with a random color from
        // a predefined d3 palette
        instance.selector
          .getEdge({ id: edge.id })
          .transition('custom')
          .duration(1000)
          .attr('stroke', greuler.colors.randomFromPalette())
      }
    }
  ]

  return instance
}
