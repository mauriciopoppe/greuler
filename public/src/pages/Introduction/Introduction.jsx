import React, { useEffect } from 'react'
import InstallationSVG from './installation.svg'
import UsageSVG from './usage.svg'

import example from './example'

export const Introduction = (props) => {
  useEffect(() => {
    example()
  }, [])

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter has-text-centered">
          <b>greuler</b> is graph theory visualization tool powered by <a href="http://d3js.org/">d3</a> and on top of{' '}
          <a href="http://marvl.infotech.monash.edu/webcola/">WebCola</a> which allows the creation and manipulation of
          graphs with a simple api
        </div>
      </div>

      {/* used by the example script */}
      <div className="has-text-centered is-flex is-justify-content-center" id="intro" />
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <div className="has-text-centered" id="intro-description" style={{ height: 100 }} />
        </div>
      </div>

      <hr />

      <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: InstallationSVG }} />
      <div>
        <pre>npm install greuler</pre>
        <p>Or</p>
        <pre>{/* TODO: add browser */}</pre>
      </div>

      <hr />

      <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: UsageSVG }} />
      <div>
        The hello world program requires calling <code>greuler</code> with an object that has the following properties:
        <ul className="">
          <li>
            <code>target</code> a selector to the DOM node to hold the graph
          </li>
          <li>
            <code>data</code> a selector to the DOM node to hold the graph
          </li>
          <ul className="">
            <li>
              <code>data.nodes</code> The nodes of the graph, they need to have an <code>id</code>
            </li>
            <li>
              <code>data.edges</code> The edges of the graph, they join two nodes by <code>id</code>
            </li>
          </ul>
        </ul>
        A full description of the properties can be found in the API After the instance is created call{' '}
        <code>instance.update()</code> to run an initial layout
      </div>
    </div>
  )
}
