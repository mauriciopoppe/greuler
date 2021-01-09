'use strict';
greuler({
  target: '#random',
  width: 480,
  height: 300,
  data: greuler.Graph.random({
    order: 5,
    size: 5,
    connected: true
  })
}).update()
