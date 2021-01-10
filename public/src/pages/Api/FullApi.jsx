import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import ApiSVG from './api.svg'

export function FullApi() {
  const markdown = `
\`\`\`javascript
import greuler from 'greuler'
\`\`\`

### \`instance = greuler(options)\`

**params**

The smallest program consists of call to \`greuler\` with an object with two properties

* \`options.target\`: The container to hold the graph
* \`options.data\`: The data that contains the description of the graph, all the properties are mapped
to calls to methods of the layout program, check [WebCola's documentation](http://marvl.infotech.monash.edu/webcola/doc/classes/cola.layout.html#alpha)
for a full overview of the layout options

The required properties of \`data\` are:

* \`nodes=[]\` An array of objects, each object describes the properties of a node
  * \`node.id\` (required) The \`id\` of the node, the mapping of the endpoints of an edge is done by id
  * \`node.x=undefined\` The \`x\` position in the graph of this node
  * \`node.y=undefined\` The \`y\` position in the graph of this node
  * \`node.fixed=false\` True to keep this node in a fixed position after it was dragged,
  (style properties)
  * \`node.fill\` The fill of the circle representing a node
  * \`node.r\` The radius of the circle representing a node
  * \`node.label=''\` Label to be shown inside the node, the \`id\` is shown by default
  * \`node.topRightLabel=''\` Label to be shown on the top right of the node, useful for additional
  annotations

* \`edges=[]\` An array of objects, each object describes the properties of an edge
  * \`edge.source\` The id of the source node
  * \`edge.target\` The id of the target node
  (style properties)
  * \`edge.directed=false\` True to make the edge directed
  * \`edge.weight=n\` If set, it's added as an annotation to the center of the edge

Additional options

* \`options.width=computed\` Width of the graph (defaults to the container width)
* \`options.height=computed\` Height of the graph (defaults to the container height)
* \`options.directed=false {bool}\` True to make the graph directed (defaults to false)
* \`options.animationTime=1000\` Time in ms used for the transitions done with \`instance.selector.*\`
* \`options.labels=true\` False to hide the labels on the nodes (defaults to true)

**returns**

A greuler instance used to interact with the graph

#### \`instance.events\`

All the events are exposed through this object

**events**

* \`firstLayoutEnd\` fired when the initial layout has finished, it's fired only once

#### \`instance.update([options])\`

**params**

* \`options={}\`
  * \`options.skipLayout=false\` True to skip layout and only bind the data to the svg elements (a layout
  operations needs to be done only when nodes/edges are added/removed to the graph, any other operation
  that modifies existing properties of the nodes/edges don't need a layout)
  * \`options.iterations=[]\` The number of iterations run by WebCola see [layout.start](http://marvl.infotech.monash.edu/webcola/doc/classes/cola.layout.html#start)

#### \`instance.graph\`

Check out [the GraphManager class](https://github.com/mauriciopoppe/greuler/blob/master/src/GraphManager.js)

#### \`instance.selector\`

Check out [the Selector class](https://github.com/mauriciopoppe/greuler/blob/master/src/selector/GreulerDefaultTransition.js)

  `

  return (
    <div>
      <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: ApiSVG }} />
      <ReactMarkdown children={markdown} />
    </div>
  )
}
