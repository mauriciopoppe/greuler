import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { Introduction } from './pages/Introduction/Introduction.jsx'
import { Api } from './pages/Api/Api.jsx'
import { Heart } from './Heart.jsx'

import GreulerSVG from './banner.svg'
import './index.scss'

// eslint-ignore
!(function (d, s, id) {
  // eslint-ignore
  var js,
    fjs = d.getElementsByTagName(s)[0],
    p = /^http:/.test(d.location) ? 'http' : 'https'
  if (!d.getElementById(id)) {
    js = d.createElement(s)
    js.id = id
    js.src = p + '://platform.twitter.com/widgets.js'
    fjs.parentNode.insertBefore(js, fjs)
  }
})(document, 'script', 'twitter-wjs')

const App = () => {
  useEffect(() => {
    new window.Vivus('banner-svg', { type: 'oneByOne', duration: 200 })
  }, [])

  return (
    <div className="section">
      <div className="container">
        <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: GreulerSVG }} />
        <div className="has-text-centered">
          <iframe
            title="foo"
            src="https://ghbtns.com/github-btn.html?user=mauriciopoppe&repo=greuler&type=star&count=true"
            height="20px"
          />
          <a
            href="https://twitter.com/share"
            className="twitter-share-button"
            data-via="mauricio_poppe"
            data-url="http://mauriciopoppe.github.io/greuler/"
            data-hashtags="visualization,graphtheory,dataviz"
          >
            Tweet
          </a>
        </div>
        <hr />
      </div>

      <div className="container">
        <Introduction />
        <hr />
        <Api />
        <hr />
      </div>

      <footer className="container has-text-centered">
        Made with <Heart>♥</Heart> by <a href="https://mauriciopoppe.com">Mauricio Poppe</a>
      </footer>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
