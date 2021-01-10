window.apiGraph = function () {
  const target = document.querySelector('#graph-example')

  const instance = greuler({
    target: target,
    data: {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2, directed: true },
        { source: 0, target: 3 },
        { source: 1, target: 2, directed: true },
        { source: 4, target: 0 },
        { source: 5, target: 0, directed: true },
        { source: 4, target: 5 }
      ]
    }
  }).update()

  instance.fns = [
    {
      title: 'add node',
      fn: function () {
        // let's keep this example simple and add a maximum of 10
        // nodes, this isn't related with the API btw, it's just to
        // avoid the creation of unnecessary nodes
        const nextId = instance.graph.nodes.length
        if (nextId === 10) {
          return
        }

        // add a single node
        instance.graph.addNode({ id: nextId })

        // after the structure of the graph has been changed it's
        // needed to trigger a new layout
        instance.update()
      }
    },
    {
      title: 'remove node',
      fn: function () {
        const order = instance.graph.nodes.length
        const last = instance.graph.nodes[order - 1]

        if (!last) {
          return
        }

        // remove a node with an id < 10 if it exists in the graph
        // note that you can also call it with the node itself
        // e.g.
        //      instance.graph.removeNode(last)
        //
        instance.graph.removeNode({ id: last.id })

        // after the structure of the graph has been changed it's
        // needed to trigger a new layout
        instance.update()
      }
    },
    {
      title: 'update node',
      fn: function () {
        const order = instance.graph.nodes.length

        if (!order) {
          return
        }

        const nodeIndex = Math.floor(Math.random() * order)
        const node = instance.graph.nodes[nodeIndex]

        const update = instance.graph.getNode({ id: node.id })
        update.label = '✓'
        update.topRightLabel = '∞'
        update.topLeftLabel = 'n'

        // note that this time the structure of the graph wasn't changed
        // only new properties were added to an existing node, therefore
        // we don't need to trigger a new layout
        instance.update({ skipLayout: true })
      }
    },
    {
      title: 'add edge',
      fn: function () {
        const order = instance.graph.nodes.length
        const size = instance.graph.edges.length

        if (!order || size > 15) return

        const uIndex = Math.floor(Math.random() * order)
        const vIndex = Math.floor(Math.random() * order)
        const u = instance.graph.nodes[uIndex]
        const v = instance.graph.nodes[vIndex]

        const edge = { source: u.id, target: v.id }

        // random edges have weight & become directed
        if (Math.random() > 0.5) {
          edge.weight = Math.floor(Math.random() * 10)
          edge.directed = true
        }

        // Adding an edge to the graph between some existing nodes
        // in the graph
        instance.graph.addEdge(edge)

        // after the structure of the graph has been changed it's
        // needed to trigger a new layout
        instance.update()
      }
    },
    {
      title: 'remove edge',
      fn: function () {
        const size = instance.graph.edges.length
        const last = instance.graph.edges[size - 1]

        if (!last) {
          return
        }

        // remove a node with an id < 10 if it exists in the graph
        // note that you can also call it with the node itself
        // e.g.
        //      instance.graph.removeNode(last)
        //
        instance.graph.removeEdge({ id: last.id })

        // after the structure of the graph has been changed it's
        // needed to trigger a new layout
        instance.update()
      }
    },
    {
      title: 'update edge',
      fn: function () {
        const size = instance.graph.edges.length

        if (!size) {
          return
        }

        const edgeIndex = Math.floor(Math.random() * size)
        const edge = instance.graph.edges[edgeIndex]

        const update = instance.graph.getEdge({ id: edge.id })
        update.weight = '∞'
        update.directed = !update.directed

        // note that this time the structure of the graph wasn't changed
        // only new properties were changed in an existing edge, therefore
        // we don't need to trigger a new layout
        instance.update({ skipLayout: true })
      }
    },
    {
      title: 'removing multiple nodes in a batch operation',
      fn: function () {
        // we must explicitly tell greuler to trigger a new layout process,
        // this allows adding/removing multiple edges/nodes without updating
        // the layout
        instance.graph.removeNodesByFn((n) => n.id > 5)
        instance.update()
      }
    }
  ]

  return instance
}
