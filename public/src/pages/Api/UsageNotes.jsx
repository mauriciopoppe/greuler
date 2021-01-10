import React from 'react'
import ReactMarkdown from 'react-markdown'

export function UsageNotes() {
  const markdown = `
  - The \`data\` property of the configuration option sent to greuler maps all the properties to calls to methods of WebCola

  \`\`\`javascript
  // e.g.
  greuler({
    // ...
    data: {
      linkDistance: 100,
      avoidOverlaps: true,
      nodes: [...],
      edges: [...],
      groups: [...],
    }
  })

  // is mapped to
  cola.d3Adaptor()
    .linkDistance(data.linkDistance)
    .avoidOverlaps(data.avoidOverlaps)
    .nodes(data.nodes)
    .links(data.edges)
  // ...
  \`\`\`

  - layout methods that receive multiple arguments are sent in data in an array form

  e.g. \`layout.flowLayout('y', 50)\`

  \`\`\`javascript
  data: {
    // ...
    symmetricDiffLinkLengths: ['y', 50]
  }
  \`\`\`

  On runtime, you can add/remove/update the properties through \`instance.options.data\`, make sure you don't modify
  \`instance.options.data.nodes\` or \`instance.options.data.links\` to avoid layout errors, after all this is the job of
  \`instance.graph.*\` methods :)

  - The layout adaptor instance can be accessed through \`instance.layout\`
  - To make the nodes have a fixed position listen for the \`firstLayoutEnd\` event and add the \`fixed\` property
  to each one of the nodes you want to be fixed e.g.

  \`\`\`javascript
  instance.events.on('firstLayoutEnd', function () {
    instance.graph.nodes.forEach(function (d) {
      d.fixed = true
    })
  });
  \`\`\`

  - Custom animations can easily be created, for any of the values returned from \`instance.graph.*\` call
  \`instance.selector.select\` and you obtain the group that represents the node/edge e.g.

  \`\`\`javascript
  const nodes = instance.graph.getNodesByFn(function (node) {
    return node.id > 5;
  });

  // a selection of <g> tags
  const selection = instance.selection.select(nodes);
  \`\`\`
`
  return <ReactMarkdown children={markdown} />
}
