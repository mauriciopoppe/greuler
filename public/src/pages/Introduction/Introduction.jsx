import React, { useEffect } from 'react'

import InstallationSVG from './installation.svg'

export const Introduction = (props) => {
  useEffect(() => {
    window.presentationExample()
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
          <code>npm install greuler@alpha</code>
        </pre>
        <p>Or as a script</p>
        <pre>
          <code>&lt;script src="https://unpkg.com/greuler@alpha"&gt;&lt;/script&gt;</code>
        </pre>
        <p>Try it now on Codesandbox!</p>
        {PRODUCTION && (
          <iframe
            src="https://codesandbox.io/embed/greuler-ujl3e?fontsize=14&hidenavigation=1&theme=light"
            style={{ width: '100%', height: 500, border: 0, borderRadius: 4, overflow: 'hidden' }}
            title="greuler"
            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        )}
      </div>
    </div>
  )
}
