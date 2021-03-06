window.presentationExample = async function () {
  const instruction = d3.select('#intro-description')
  const instance = window
    .greuler({
      target: '#intro',
      animationTime: 3000,
      data: {
        nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        edges: [
          { source: 0, target: 1 },
          { source: 0, target: 2 },
          { source: 0, target: 3 },
          { source: 1, target: 2 },
          { source: 1, target: 3 },
          { source: 2, target: 3 },
          { source: 2, target: 4 },
          { source: 3, target: 4 }
        ]
      }
    })
    .update()

  const transitionDuration = 1000

  async function delay(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function updateText(text) {
    await instruction.transition('opacity').duration(transitionDuration).style('opacity', 0).end()

    await instruction
      .transition('text')
      .duration(transitionDuration)
      .each(function () {
        d3.select(this).html(text)
      })
      .style('opacity', 1)
      .end()

    await delay(transitionDuration)
  }

  await (async () => {
    await updateText('an undirected graph G')

    await updateText('note that the layout has been automatically computed by WebCola')

    await updateText("let's add the node 5")
    instance.graph.addNode({ id: 5 })
    instance.update()

    await updateText('and connect 5 with 0 and 1')
    instance.graph.addEdge({ source: 5, target: 1 }, { source: 5, target: 0 })
    instance.update()

    await updateText("let's add another graph")
    instance.graph.addNode({ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 })
    instance.graph.addEdge(
      { source: 6, target: 7 },
      { source: 7, target: 8 },
      { source: 6, target: 8 },
      { source: 8, target: 9 }
    )
    instance.update()

    await updateText('and connect it to the original graph with some directed edges')
    instance.graph.addEdge({ source: 8, target: 1, directed: true }, { source: 9, target: 2, directed: true })
    instance.update()

    await updateText("now let's remove node 2, see? the incident edges are now gone")
    instance.graph.removeNode({ id: 2 })
    instance.update()

    await updateText("now let's remove the (8, 1) edge")
    instance.graph.removeEdges(instance.graph.getEdgesBetween({ source: 8, target: 1 }))
    instance.update()

    await updateText('and add multiple edges between (8, 0) and (9, 4)')
    instance.graph.addEdge(
      { source: 8, target: 0 },
      { source: 8, target: 0, multiEdge: true },
      { source: 9, target: 4 },
      { source: 9, target: 4, multiEdge: true },
      { source: 9, target: 4, multiEdge: true }
    )
    instance.update()

    await updateText('and also between (5, 5) and (1, 1)')
    instance.graph.addEdge(
      { source: 5, target: 5, multiEdge: true },
      { source: 5, target: 5, multiEdge: true },
      { source: 1, target: 1, multiEdge: true }
    )
    instance.update()

    await updateText("let's make the graph directed")
    instance.options.directed = true
    instance.update({ skipLayout: true })

    await updateText('and add a weight to each edge')
    instance.graph.edges.forEach(function (e) {
      e.displayWeight = Math.floor(Math.random() * 100)
    })
    instance.update({ skipLayout: true })

    await updateText("now let's work with the existing nodes/edges")

    await updateText("let's highlight the node we will work with, node 0")
    instance.selector.highlightNode({ id: 0 })
    instance.selector.getNode({ id: 0 }).transition().attr('fill', greuler.colors.RED)

    await updateText('moving from 0 to its successor nodes')
    await instance.selector.traverseOutgoingEdges({ id: 0 })

    await updateText('moving from predecessor nodes of 0 to 0 through its incoming edges')
    await instance.selector.traverseIncomingEdges({ id: 0 })

    await updateText('reset the style of the nodes and edges')
    instance.selector.getNodes().transition().attr('fill', greuler.colors.DEFAULT_NODE)
    instance.selector.getEdges().transition().attr('stroke', greuler.colors.DEFAULT_EDGE)

    await updateText('removing the weights')
    instance.graph.edges.forEach(function (e) {
      delete e.displayWeight
    })
    instance.update({ skipLayout: true })

    await updateText('making the graph undirected again')
    instance.options.directed = false
    instance.update({ skipLayout: true })

    await updateText('removing parallel and loop edges')
    instance.graph.removeEdgesByFn(function (e) {
      return e.multiEdge
    })
    instance.update({ skipLayout: true })

    await updateText(
      "now let's do something simple and fun <br/> let's find the number of backedges in an undirected graph!"
    )

    await updateText('ready?')

    await updateText(
      'in the visualization an edge colored as ' +
        '<span style="color: cyan">cyan</span> first and then <span style="color: red">red</span> ' +
        "is a back edge, <br /> it's found by checking if the both end vertices of a non traversed edge were visited before"
    )

    let timeSpent = 0
    const timeIn = []
    const low = []
    instance.options.animationTime = 1000
    instance.graph.nodes.forEach((n) => (timeIn[n.id] = -1))

    async function dfs(u, p) {
      timeIn[u] = low[u] = ++timeSpent

      await instance.selector.highlightNode({ id: u })
      await instance.selector.getNode({ id: u }).transition().attr('fill', 'black').end()

      const adjacent = instance.graph.getAdjacentNodes({ id: u })
      for (let i = 0; i < adjacent.length; i += 1) {
        const v = adjacent[i].id

        if (v === p) {
          continue
        }

        if (timeIn[v] === -1) {
          await instance.selector.traverseAllEdgesBetween({ source: u, target: v })
          await dfs(v, u)
          low[u] = Math.min(low[u], low[v])
        } else if (timeIn[v] < timeIn[u]) {
          await instance.selector.traverseAllEdgesBetween({ source: u, target: v }, { stroke: 'cyan' })
          await instance.selector.traverseAllEdgesBetween({ source: u, target: v })
          low[u] = Math.min(low[u], timeIn[v])
          await instance.selector.highlightNode({ id: u })
        }
      }
    }

    await dfs(0, -1)

    await updateText("there are 4 backedges in the graph! <br /> that's it! thanks for watching :)")
  })()
}
