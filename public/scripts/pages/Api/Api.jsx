import React, { useEffect, useState } from 'react'
import Prism from 'prismjs'

import ApiSVG from './api.svg'
import GraphSVG from './graph.svg'
import SelectorSVG from './selector.svg'

import exampleGraph from './exampleGraph'
import exampleSelector from './exampleSelector'

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
      <div className="flex" style={{ height: 700 }}>
        <div className="w-6/12" id={targetId} />
        <div className="w-6/12 text-sm">
          <pre>
            <code className="language-javascript" dangerouslySetInnerHTML={{ __html: graphExampleCode }} />
          </pre>
        </div>
      </div>
      <div className="text-center">{graphExampleTitle}</div>
      <div className="flex">
        {graphInstance &&
          graphInstance.fns.map((v, i) => {
            return (
              <div
                className="flex-1 text-center"
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

export const Api = (props) => {
  useEffect(() => {
    // new window.Vivus('api-svg', {type: 'oneByOne', duration: 200});
    // new window.Vivus('graph-svg', {type: 'oneByOne', duration: 200});
    // new window.Vivus('selector-svg', {type: 'oneByOne', duration: 200});
  }, [])

  return (
    <div className="container mx-auto">
      <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: ApiSVG }} />
      Assuming that <code>instance = greuler(options).update()</code> is called there are two ways to interact with the
      graph
      <hr />
      <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: GraphSVG }} />
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
      <p>
        Please take a look at all the methods of <code>instance.graph</code> which can be found
        <a href="https://github.com/mauriciopoppe/greuler/blob/master/src/Graph.js">here</a>
      </p>
      <ApiExample exampleGetter={exampleGraph} targetId={'graph-example'} />
      <hr />
      <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: SelectorSVG }} />
      <p>
        <code>instance.selector</code> holds utility methods to animate existing nodes/edges of the graph, under the
        hood it uses <code>instance.graph</code> and wraps the returning values inside d3 selections Just like{' '}
        <code>instance.graph</code> the first method will always be an object describing a node / edge, the second
        parameter is an override of the styles predefined to be used during the animation
      </p>
      <ApiExample exampleGetter={exampleSelector} targetId={'selector-example'} />
    </div>
  )
}
