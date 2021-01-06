const app = document.createElement('div')
app.id = 'root'
document.body.appendChild(app)

greuler({
  target: "#root",
  animationTime: 500,
  linkDistance: 100,
  avoidOverlaps: true,
  width: 480,
  data: {
    nodes: [
      { id: 0, fixed: false },
      { id: 1, fixed: false },
      { id: 2, fixed: false },
      { id: 3, fixed: false },
      { id: 4, fixed: false }
    ],
    links: [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 0 },
      { source: 3, target: 4 }
    ]
  }
}).update();
