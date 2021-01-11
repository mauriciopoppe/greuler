import React, { useEffect, useState } from 'react'
import Prism from 'prismjs'

import { FullApi } from './FullApi.jsx'
import { UsageNotes } from './UsageNotes.jsx'

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
    <div className="columns" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
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
        return d.replace(/^\s{8}/, '')
      })
    items.pop()
    items.shift()
    setGraphExampleCode(Prism.highlight(items.join('\n'), Prism.languages.javascript, 'javascript'))
  }

  return (
    <>
      <div className="columns" style={{ minHeight: 600, fontSize: '1.1rem', lineHeight: 1 }}>
        <div className="column" id={targetId} />
        <div className="column" style={{ minHeight: 600 }}>
          <pre>
            <code className="language-javascript" dangerouslySetInnerHTML={{ __html: graphExampleCode }} />
          </pre>
        </div>
      </div>
      <div className="has-text-centered is-italic">{graphExampleTitle}</div>
      <div className="is-flex is-justify-content-center">
        {graphInstance &&
          graphInstance.fns.map((v, i) => {
            return (
              <button
                className="button is-rounded is-link is-light m-1"
                style={{
                  width: '3em',
                  height: '3em'
                }}
                onMouseEnter={() => highlightExample(v)}
                onClick={() => v.fn()}
                key={i}
              >
                {i + 1}
              </button>
            )
          })}
      </div>
    </>
  )
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
