import React, { useEffect, useState } from 'react'
import Prism from 'prismjs'
import ReactMarkdown from 'react-markdown'

import ApiSVG from './api.svg'
import UsageSVG from './usage.svg'
import GraphSVG from './graph.svg'
import SelectorSVG from './selector.svg'

const EvalExample = ({ fnId, fn }) => {
  const items = fn
    .toString()
    .split('\n')
    .map(function (d) {
      return d.replace(/^\s{2}/, '')
    })
  items.pop()
  items.shift()
  const fnString = Prism.highlight(items.join('\n'), Prism.languages.javascript, 'javascript')

  useEffect(() => {
    fn()
  }, [])

  return (
    <div className="columns" style={{ fontSize: '0.9rem', lineHeight: 1 }}>
      <div className="column" id={fnId} />
      <div className="column">
        <pre>
          <code className="language-javascript" dangerouslySetInnerHTML={{ __html: fnString }} />
        </pre>
      </div>
    </div>
  )
}

const ApiExample = ({ exampleGetter, targetId }) => {
  const [graphInstance, setGraphInstance] = useState()

  const [graphExampleTitle, setGraphExampleTitle] = useState('Choose an example below')
  const [graphExampleCode, setGraphExampleCode] = useState('/* Code from the example will be shown here */')
  useEffect(() => {
    setGraphInstance(exampleGetter())
  }, [])

  function highlightExample(example) {
    // set the example title
    setGraphExampleTitle(example.title)

    // set the example code
    const items = example.fn
      .toString()
      .split('\n')
      .map(function (d) {
        return d.replace(/^\s{6}/, '')
      })
    items.pop()
    items.shift()
    setGraphExampleCode(Prism.highlight(items.join('\n'), Prism.languages.javascript, 'javascript'))
  }

  return (
    <>
      <div className="columns" style={{ height: 600, fontSize: '0.9rem', lineHeight: 1 }}>
        <div className="column" id={targetId} />
        <div className="column">
          <pre>
            <code className="language-javascript" dangerouslySetInnerHTML={{ __html: graphExampleCode }} />
          </pre>
        </div>
      </div>
      <div className="has-text-centered">{graphExampleTitle}</div>
      <div className="is-flex is-justify-content-center">
        {graphInstance &&
          graphInstance.fns.map((v, i) => {
            return (
              <div
                className="has-text-centered"
                style={{
                  width: '3em',
                  height: '3em',
                  borderRadius: '1.5em',
                  margin: 4,
                  backgroundColor: '#2980B9',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onMouseEnter={() => highlightExample(v)}
                onClick={() => v.fn()}
                key={i}
              >
                {i + 1}
              </div>
            )
          })}
      </div>
    </>
  )
}

function FullApi() {
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

* \`options.width=700\` Width of the graph
* \`options.height=300\` Height of the graph
* \`options.directed=false\` True to make the graph directed
* \`options.animationTime=1000\` Time in ms used for the transitions done with \`instance.selector.*\`
* \`options.labels=true\` False to hide the labels on the nodes

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

function UsageNotes() {
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

export const Api = (props) => {
  useEffect(() => {
    new window.Vivus('api-svg', { type: 'oneByOne', duration: 200 })
    new window.Vivus('usage-svg', { type: 'oneByOne', duration: 200 })
    new window.Vivus('graph-svg', { type: 'oneByOne', duration: 200 })
    new window.Vivus('selector-svg', { type: 'oneByOne', duration: 200 })
  }, [])

  return (
    <div className="container content">
      <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: UsageSVG }} />
      <p>
        The hello world program requires calling <code>greuler</code> with an object that has the following properties:
      </p>
      <ul>
        <li>
          <code>target</code> a selector to the DOM node to hold the graph
        </li>
        <li>
          <code>data</code> a selector to the DOM node to hold the graph
        </li>
        <ul>
          <li>
            <code>data.nodes</code> The nodes of the graph, they need to have an <code>id</code>
          </li>
          <li>
            <code>data.edges</code> The edges of the graph, they join two nodes by <code>id</code>
          </li>
        </ul>
      </ul>
      <EvalExample fn={window.apiHello} fnId={'hello-world'} />
      <p>
        Start with <code>instance = greuler(options)</code>
      </p>
      <ul>
        <li>
          Every time there's an update in the <b>structure</b> of the graph (new/deleted nodes or edges) call{' '}
          <code>instance.update()</code>
        </li>
        <li>
          Or if there were only changes on some visual properties of existing edges/nodes call{' '}
          <code>{'instance.update({ skipLayout: true }})'}</code> to avoid recomputing the position of the edges/nodes
        </li>
      </ul>
      <hr />
      <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: GraphSVG }} />
      <p>
        <code>instance.graph</code> holds utility methods to manipulate the graph like adding/removing nodes and edges
        and other utility methods like querying the adjacent nodes of some node, etc.
      </p>
      <p>
        The convention I used for the project is to{' '}
        <b>always use objects as the first parameter to describe a node or edge</b> (an array/function is needed in some
        cases of some methods of
        <code>instance.graph</code> but they describe multiple nodes/edges), also all the methods of{' '}
        <code>instance.graph</code> (but the ones who add nodes and edges) receive a single parameter
      </p>
      <ApiExample exampleGetter={() => window.apiGraph()} targetId={'graph-example'} />
      <hr />
      <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: SelectorSVG }} />
      <p>
        <code>instance.selector</code> holds utility methods to animate existing nodes/edges of the graph, under the
        hood it uses <code>instance.graph</code> and wraps the returning values inside d3 selections
      </p>
      <p>
        Just like <code>instance.graph</code> the first method will always be an object describing a node / edge, the
        second parameter is an override of the styles predefined to be used during the animation
      </p>
      <ApiExample exampleGetter={() => window.apiSelector()} targetId={'selector-example'} />
      <hr />
      <UsageNotes />
      <hr />
      <FullApi />
    </div>
  )
}
