import React, { useEffect } from 'react'

import InstallationSVG from './installation.svg'

import example from './example'

export const Introduction = (props) => {
  useEffect(() => {
    example()
    new window.Vivus('installation-svg', { type: 'oneByOne', duration: 200 })
  }, [])

  return (
    <div className="container content">
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
        <pre>
          <code className="language-bash">npm install greuler</code>
        </pre>
        <p>Or</p>
        <pre>
          <code className="language-html">https://unpkg.com/greuler</code>
        </pre>
      </div>

      {/* TODO: add sandbox */}
    </div>
  )
}
