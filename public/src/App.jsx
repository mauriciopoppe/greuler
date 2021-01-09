import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Router, Link } from '@reach/router'

import { Introduction } from './pages/Introduction/Introduction.jsx'
import { Api } from './pages/Api/Api.jsx'
import { Examples } from './pages/Examples/Examples.jsx'
import GreulerSVG from './banner.svg'
import './index.scss'

const NavigationLink = ({ to, children, ...other } = props) => {
  return (
    <Link to={to} className="has-text-centered is-flex-grow-1" {...other}>
      {children}
    </Link>
  )
}

const Navigation = () => {
  return (
    <div className="is-flex">
      <NavigationLink to="/">introduction</NavigationLink>
      <NavigationLink to="/api">api</NavigationLink>
      {/*<NavigationLink to="/examples">examples</NavigationLink>*/}
    </div>
  )
}

// twitter fragment
!(function (d, s, id) {
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
            src="https://ghbtns.com/github-btn.html?user=mauriciopoppe&repo=greuler&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="90px"
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
        {/*<Navigation />*/}
        {/*<hr />*/}
      </div>

      {/*<Router>*/}
      <Introduction path="/" />
      <hr />
      <Api path="/api" />
      <hr />
      {/*<Examples path="/examples" />*/}
      {/*</Router>*/}

      <footer className="container has-text-centered">
        Made with ♥ by <a href="https://twitter.com/mauricio_poppe">Mauricio Poppe</a>
      </footer>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
