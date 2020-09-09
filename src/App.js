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
import Redirect from './pages/Redirect'
import ApplicationsTest from './pages/ApplicationsTest'
import LDAP from './pages/LDAP'
import MainLayout from './components/MainLayout'
/**
 |--------------------------------------------------
 | BASEUI SETUP
 |--------------------------------------------------
 */

function App() {
  useEffect(() => {}, [])
  return (
    <Router>
      <MainLayout path="/manage" title={'Manage Service'} component={() => <></>} />
      <MainLayout path="/applications" component={ApplicationsTest} />
      <MainLayout path="/redirect/:auth_code" component={Redirect} />
      <LDAP path="/login" />
    </Router>
  )
}

export default App
