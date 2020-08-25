import React, { useContext, useEffect, useCallback, useState } from 'react'
import { Formik, Form } from 'formik'
import Cookie from 'js-cookie'
import FormLogin from '../components/Login/FormLogin'
import CommonCard from '../components/Common/Card'
import { login, continueLogin, fetchUserDataByAuthCode } from '../service/auth'
import { getAuthFormData } from '../form/authHelper'
import { navigate } from '@reach/router'
import { storesContext } from '../context'
import * as queryString from 'query-string'

export default function ApplicationsTest(props) {
  const [user, setUser] = useState({})
  const { authenticationStore, applicationStore } = useContext(storesContext)

  const fecthUserData = useCallback(
    async (data) => {
      const queryParams = queryString.parse(props.location.search)
      console.log(queryParams)
      try {
        const response = await fetchUserDataByAuthCode(applicationStore.currentApp, queryParams.code)
        setUser(response.data)
      } catch (error) {
        alert(error)
      }
    },
    [props.location.search]
  )
  useEffect(() => {
    fecthUserData()
  }, [fecthUserData])

  return (
    <div className="flex flex-col flex-1 mx-auto max-w-screen-lg h-screen">
      <h1>This is first prototype login sso</h1>
      <CommonCard>
        <div>User Data got from Auth Code</div>
        <p>user_id: {user.user_id}</p>
        <p>name_th:{user.name_th}</p>
        <p> name_en: {user.name_en}</p>
        <p>email: {user.email}</p>
        <p>group: {user.user_group}</p>
        <p>token: {user.token?.token}</p>
        <p>created_at: {user.created_at} </p>
        <p>updated_at: {user.updated_at}</p>
      </CommonCard>
    </div>
  )
}
