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
      <NavigationLink to="/examples">examples</NavigationLink>
    </div>
  )
}

const App = () => {
  useEffect(() => {
    // new window.Vivus('banner-svg', {type: 'oneByOne', duration: 200});
  }, [])

  return (
    <>
      <div className="container">
        <div className="is-flex is-justify-content-center" dangerouslySetInnerHTML={{ __html: GreulerSVG }} />
        {/* TODO: github & twitter logos */}
        <hr />
        <Navigation />
        <hr />
      </div>

      <Router>
        <Introduction path="/" />
        <Api path="/api" />
        <Examples path="/examples" />
      </Router>

      <div className="container">
        <hr />
        Made with ♥ by <a href="https://twitter.com/mauricio_poppe">Mauricio Poppe</a>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
