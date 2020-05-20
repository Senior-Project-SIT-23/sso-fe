import React, { useEffect } from 'react'
import { Router, navigate } from '@reach/router'
import Cookies from 'js-cookie'

/**
 |--------------------------------------------------
 | ROOT COMPONENT
 |--------------------------------------------------
 */

/**
 |--------------------------------------------------
 | STYLE
 |--------------------------------------------------
 */
import './style/App.css'
import './style/Font.css'
import MainLayout from './components/MainLayout'
import TestLogin from './pages/TestLogin'
import Redirect from './pages/Redirect'
import ApplicationsTest from './pages/ApplicationsTest'
/**
 |--------------------------------------------------
 | BASEUI SETUP
 |--------------------------------------------------
 */

function App() {
  useEffect(() => {}, [])
  return (
    <Router>
      <MainLayout path="/" component={TestLogin} />
      <MainLayout path="/applications" component={ApplicationsTest} />
      <MainLayout path="/redirect/:auth_code" component={Redirect} />
    </Router>
  )
}

export default App
