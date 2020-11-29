import React, { useEffect } from 'react'
import { Router, navigate } from '@reach/router'

/**
 |--------------------------------------------------
 | ROOT COMPONENT
 |--------------------------------------------------
 */
import LDAP from './pages/LDAP'
import AdminManage from './pages/AdminManage'
import Applications from './pages/Applications'
import ApplicationsDetail from './pages/ApplicationsDetail'
import MainLayout from './components/MainLayout'
import User from './pages/User'
import Landing from './pages/Landing'

/**
 |--------------------------------------------------
 | STYLE
 |--------------------------------------------------
 */
import './style/App.css'
import './style/Font.css'

function App() {
  useEffect(() => {}, [])
  return (
    <Router>
      <MainLayout path="/manage/requested/applications" title={'Manage Service'} index={0} component={AdminManage} />
      <MainLayout path="/manage/users" title={'Manage Service'} index={1} component={AdminManage} />
      <MainLayout path="/manage/users/:user_id" title={'Manage Service'} index={1} component={User} />
      <MainLayout path="/manage/applications" title={'Application Service'} component={Applications} />
      <MainLayout path="/manage/applications/:app_id" component={ApplicationsDetail} />
      <LDAP path="/login" />
      <Landing path="/" />
    </Router>
  )
}

export default App
