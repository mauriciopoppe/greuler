var assert = chai.assert;

describe('greuler', function () {

  describe('graph', function () {
    var data;
    var manager;
    var nEdges, nNodes;
    beforeEach(function () {
      data = {
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
      };

      // source
      data.links.forEach(function (e, i) {
        var u = e.source;
        var v = e.target;
        e.source = data.nodes[u];
        e.target = data.nodes[v];
        e.id = i;
      });

      manager = new greuler.Graph({ options: {} }, data);
      nEdges = data.links.length;
      nNodes = data.nodes.length;
    });

    it('should have a constructor', function () {
      assert(new greuler.Graph(undefined, data));
    });

    describe('nodes', function () {
      it('should add a node', function () {
        manager.addNode({id: 11});
        assert(manager.nodes.length === nNodes + 1);
        assert.throws(function () {
          manager.addNode({id: 11});
        });
      });

      it('should get nodes by id', function () {
        assert(manager.getNode({ id: 0 }));
        assert(manager.getNode({ id: 10 }));
        assert(!manager.getNode({ id: 11 }));
      });

      it('should get nodes by fn', function () {
        var nodes = manager.getNodesByFn(function (v) {
          return v.id > 5;
        });
        assert(nodes.length === 5);
        assert(!manager.getNodesByFn(function (v) {
          return v.id === 11;
        }).length);
      });

      it('should remove a single node', function () {
        manager.removeNode({ id: 1 });
        manager.removeNode({ id: 2 });
        assert(manager.nodes.length === 9);
        manager.removeNode({ id: 1 });
        assert(manager.nodes.length === 9);
        manager.removeNode({ id: 3 });
        assert(manager.nodes.length === 8);
      });

      it('should remove nodes by fn', function () {
        manager.removeNodesByFn(function (v) {
          return v.id > 5;
        });
        assert(manager.nodes.length === 6);
      });

      it('should get adjacent nodes', function () {
        var nodes = manager.getAdjacentNodes({ id: 1 });
        assert(nodes.length === 4);
      });

      it('should get successor nodes', function () {
        assert(manager.getSuccessorNodes({ id: 0 }).length === 2);  // 1, 10
        assert(manager.getSuccessorNodes({ id: 1 }).length === 3);  // 1, 3, 6
        assert(manager.getSuccessorNodes({ id: 10 }).length === 0);
      });

      it('should get predecessor nodes', function () {
        assert(manager.getPredecessorNodes({ id: 0 }).length === 0);  // empty
        assert(manager.getPredecessorNodes({ id: 1 }).length === 1);  // 0
        assert(manager.getPredecessorNodes({ id: 10 }).length === 4); // 7, 0, 8, 9
      });
    });

    describe('edges', function () {
      it('should add an edge', function () {
        manager.addEdge({source: 0, target: 1});
        assert(manager.edges.length === nEdges + 1);
        assert.throws(function () {
          manager.addEdge({source: 0, target: 11});
        });
      });

      it('should get a single edge', function () {
        assert(manager.getEdge({ id: 0 }));
      });

      it('should get multiple edges', function () {
        assert(
          manager.getEdgesByFn(function (e) {
            return e.source.id === 0 || e.target.id === 0;
          }).length === 3
        );
        assert(
          manager.getEdgesByFn(function (e) {
            return e.source.id === 1 || e.target.id === 1;
          }).length === 5
        );
      });

      it('should get outgoing edges', function () {
        assert(manager.getOutgoingEdges({ id: 0 }).length === 3);
        assert(manager.getOutgoingEdges({ id: 1 }).length === 3);
      });

      it('should get incoming edges', function () {
        assert(manager.getIncomingEdges({ id: 0 }).length === 0);
        assert(manager.getIncomingEdges({ id: 1 }).length === 2);
      });

      it('should get incident edges', function () {
        assert(manager.getIncidentEdges({ id: 0 }).length === 3);
        assert(manager.getIncidentEdges({ id: 1 }).length === 5);
      });

      it('should get edges between two vertices', function () {
        assert(manager.getEdgesBetween({ source: 0, target: 1 }).length === 2);
        assert(manager.getEdgesBetween({ source: 2, target: 3 }).length === 1);
        assert(manager.getEdgesBetween({ source: 3, target: 6 }).length === 1);

        assert(manager.getEdgesBetween({ source: 1, target: 0 }).length === 0);
        assert(manager.getEdgesBetween({ source: 3, target: 2 }).length === 0);
        assert(manager.getEdgesBetween({ source: 6, target: 3 }).length === 0);
      });

      it('should get all edges between two vertices', function () {
        assert(manager.getAllEdgesBetween({ source: 0, target: 1 }).length === 2);
        assert(manager.getAllEdgesBetween({ source: 3, target: 6 }).length === 1);

        assert(manager.getAllEdgesBetween({ source: 1, target: 0 }).length === 2);
        assert(manager.getAllEdgesBetween({ source: 6, target: 3 }).length === 1);
      });

      it('should remove a single edge', function () {
        manager.removeEdge({ id: 0 });
        assert(manager.edges.length === nEdges - 1);
      });

      it('should remove multiple edges', function () {
        var edges = manager.getIncidentEdges({ id: 1 });
        manager.removeEdges(edges);
        assert(manager.edges.length === nEdges - 5);
      });
    });

    describe('operations', function () {
      it('should remove edges on single node removals', function () {
        manager.removeNode({ id: 1 });
        assert(manager.edges.length === nEdges - 5);
        manager.removeNode({ id: 5 });
        assert(manager.edges.length === nEdges - 9);
      });

      it('should remove edges on multiple node removal', function () {
        var nodes = manager.getNodesByFn(function (v) {
          return v.id > 5;
        });
        manager.removeNodes(nodes);
        assert(manager.edges.length === nEdges - 12);
      });
    });

  });
});

mocha.run();
