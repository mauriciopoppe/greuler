window.apiHello = function () {
  // prettier-ignore
  const instance = greuler({
    target: '#hello-world',
    data: {
      nodes: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 }
      ],
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
}
