import React from 'react'
import { Helmet } from 'react-helmet'

export default function MainLayout(props) {
  const { component: Child } = props

  return (
    <div className="App">
      <Helmet>
        <title>SIT SSO</title>
      </Helmet>

      <div>
        <div className="sticky top-0"></div>
        <div>
          <Child {...props} />
        </div>
      </div>
    </div>
  )
}
