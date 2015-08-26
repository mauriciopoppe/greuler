'use strict'

;(function () {
  var greuler = window.greuler

  var instance = greuler({
    target: '#demo',
    height: 500,
    animationTime: 1000,
    data: greuler.Graph.random({
      size: 10
    })
  }).update()

  window.site.run = function () {
    var player = window.site.generator = new greuler.player.Generator(instance)
    player.run(function *algorithm(instance) {
      var visited = []
      var timeIn = []
      var back = []
      var timeSpent = 0

      function *dfs(u, p) {
        var children = 0
        var isCutVertex = false
        var node = instance.graph.getNode({ id: u })

        visited[u] = true
        back[u] = timeIn[u] = ++timeSpent
        yield function () {
          node.topLeftLabel = timeIn[u]
          node.topRightLabel = timeIn[u]
          instance.selector.highlightNode(node)
          instance.update({ skipLayout: true })
        }

        var adjacent = instance.graph.getAdjacentNodes({ id: u })
        for (var i = 0; i < adjacent.length; i += 1) {
          var v = adjacent[i].id

          if (v === p) { continue; }

          if (timeIn[v] === -1) {
            // non-visited node
            yield function () {
              instance.selector.traverseAllEdgesBetween({ source: u, target: v })
            }
            yield *dfs(v, u)

            // after the dfs process check if this node is a cut vertex
            if (back[v] >= timeIn[u] && p !== -1) {
              isCutVertex = true
              yield function () {
                instance.selector.getNode(node)
                  .transition('custom')
                  .duration(1000)
                  .attr('fill', 'red')
              }
            }

            back[u] = Math.min(back[u], back[v])
            yield function () {
              node.topRightLabel = back[u]
              instance.update({ skipLayout: true })
            }
            ++children
          } else {
            // back-edge
            back[u] = Math.min(back[u], timeIn[v])
            yield function () {
              instance.selector.traverseAllEdgesBetween(
                { source: u, target: v },
                { keepStroke: false }
              )
              node.topRightLabel = back[u]
              instance.update({ skipLayout: true })
            }
          }
        }

        // check if the root node has more than 1 child
        if (p === -1 && children > 1) {
          yield function () {
            instance.selector.getNode(node)
              .transition('custom')
              .duration(1000)
              .attr('fill', 'red')
          }
        }
      }

      // initialization
      var i
      var nodes = instance.graph.nodes
      for (i = 0; i < nodes.length; i += 1) {
        timeIn[i] = back[i] = -1
      }
      for (i = 0; i < nodes.length; i += 1) {
        if (timeIn[i] === -1) {
          yield *dfs(i, -1)
        }
      }
    })
  }
})()
