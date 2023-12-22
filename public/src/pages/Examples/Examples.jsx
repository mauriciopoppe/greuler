import React, { useEffect } from 'react'

import ExamplesSVG from './examples.svg'

export const Examples = (props) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: ExamplesSVG }} />
      <p>Hello world!</p>
    </div>
  )
}
