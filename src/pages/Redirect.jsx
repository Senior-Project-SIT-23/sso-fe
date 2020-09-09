import React, { useContext, useEffect, useCallback, useState } from 'react'
import Cookie from 'js-cookie'
import CommonCard from '../components/Common/Card'
import { navigate } from '@reach/router'
import { storesContext } from '../context'

export default function Redirect(props) {
  const { authenticationStore, applicationStore } = useContext(storesContext)

  useEffect(() => {
    console.log(applicationStore.redirectURI)
    setTimeout(() => {
      window.location.href = `${applicationStore.redirectURI}?code=${props.auth_code}`
    }, 2000)
  }, [])
  return (
    <div className="flex flex-col flex-1 mx-auto max-w-screen-lg h-screen">
      <h1>This is first prototype login sso</h1>
      <CommonCard>
        <h1>Please feel free {authenticationStore.currentUser?.name_en}</h1>
        <p>We are redirecting to {applicationStore.currentApp?.name} </p>
      </CommonCard>
    </div>
  )
}
