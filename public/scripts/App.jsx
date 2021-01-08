import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Router, Link } from "@reach/router"

import { Introduction } from './pages/Introduction/Introduction.jsx'
import { Api } from './pages/Api/Api.jsx'
import GreulerSVG from '../svg/banner.svg'

const NavigationLink = ({to, children, ...other} = props) => {
  const cls = 'text-2xl font-bold flex-1 text-center'
  return (
    <Link to={to} className={cls} {...other}>
      {children}
    </Link>
  )
}

const Navigation = () => {
  return (
    <div className="flex space-x-4">
      <NavigationLink to="/">introduction</NavigationLink>
      <NavigationLink to="/api">api</NavigationLink>
    </div>
  )
}

const App = () => {
  useEffect(() => {
    // new window.Vivus('banner-svg', {type: 'oneByOne', duration: 200});
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: GreulerSVG }} />
        {/* TODO: github & twitter logos */}
        <hr />
        <Navigation />
        <hr />
      </div>

      <Router>
        <Introduction path="/" />
        <Api path="/api" />
      </Router>

      <div className="container mx-auto text-center">
        <hr/>
        Made with ♥ by <a href="https://twitter.com/mauricio_poppe">Mauricio Poppe</a>
      </div>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)

