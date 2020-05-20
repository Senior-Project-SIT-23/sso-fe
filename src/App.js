import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from './components/template/homepage'
import './utils/GlobalStyle.css'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  )
}
