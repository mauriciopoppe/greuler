'use strict';
greuler({
  target: '#hello-world',
  width: 480,
  data: {
    nodes: [
      {id: 0},
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4}
    ],
    links: [
      {source: 0, target: 1},
      {source: 1, target: 2},
      {source: 2, target: 0},
      {source: 3, target: 4}
    ]
  }
}).update()
