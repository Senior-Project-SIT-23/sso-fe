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
import AdminManage from './pages/AdminManage'
import Applications from './pages/Applications'
import ApplicationsDetail from './pages/ApplicationsDetail'
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
      <MainLayout path="/manage/admin" title={'Manage Service'} component={AdminManage} />
      <MainLayout path="/manage/applications" title={'Application Service'} component={Applications} />
      <MainLayout path="/manage/applications/:app_id" component={ApplicationsDetail} />
      <MainLayout path="/redirect/:auth_code" component={Redirect} />
      <MainLayout path="/applications" component={ApplicationsTest} />
      <LDAP path="/login" />
    </Router>
  )
}

export default App
