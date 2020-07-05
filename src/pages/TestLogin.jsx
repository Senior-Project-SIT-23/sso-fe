import React, { useContext, useEffect, useCallback, useState } from 'react'
import { Formik, Form } from 'formik'
import Cookie from 'js-cookie'
import FormLogin from '../components/Login/FormLogin'
import CommonCard from '../components/Common/Card'
import { continueLogin } from '../service/auth'
import { getAuthFormData } from '../form/authHelper'
import { navigate } from '@reach/router'
import * as queryString from 'query-string'
import { storesContext } from '../context'

export default function TestLogin(props) {
  const { authenticationStore, applicationStore } = useContext(storesContext)
  const [isPrefecth, setIsPrefecth] = useState(true)

  const checkClientId = useCallback(async () => {
    const queryParams = queryString.parse(props.location.search)
    let response = await applicationStore.checkClientId(queryParams.client_id)
    if (response.status === 200) {
      applicationStore.setRedirectURI(queryParams.redirect_uri)
      applicationStore.setCurrentApp(response.data)
      await authenticationStore.me()
      setIsPrefecth(false)
    }
  }, [applicationStore, authenticationStore, props.location.search])

  useEffect(() => {
    checkClientId()
  }, [checkClientId])

  const handleSubmit = async (data) => {
    const fromdata = getAuthFormData(data)
    try {
      const response = await authenticationStore.signIn(fromdata)
      navigate(`/redirect/${response.data.auth_code}`)
    } catch (error) {
      alert(error)
    }
  }
  const handleContinueLogin = async (data) => {
    try {
      const response = await continueLogin()
      navigate(`/redirect/${response.data.auth_code}`)
    } catch (error) {
      alert(error)
    }
  }
  if (!isPrefecth) {
    return (
      <div className="flex flex-col flex-1 mx-auto max-w-screen-lg h-screen">
        <h1>This is first prototpye login sso</h1>
        <CommonCard>
          <Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
            {(formikProps) => (
              <div className=" mt-6 mx-auto">
                {authenticationStore.is_auth ? (
                  <>
                    <h1 className="text-center my-1">Welcome {authenticationStore.currentUser?.name_en}</h1>
                    <button className="my-1 bg-blue-500 text-white rounded-sm w-full" onClick={() => handleContinueLogin()}>
                      Continue this account
                    </button>
                    <div onClick={() => authenticationStore.signOut()} className="my-1 text-center mx-auto">
                      <label className=" hover:text-blue-800 cursor-pointer">logout</label>
                    </div>
                  </>
                ) : (
                  <Form>
                    <FormLogin formikProps={formikProps} />
                    <div className="w-full mx-auto mt-6">
                      <button className="my-1 bg-blue-500 text-white rounded-sm w-full" type="submit">
                        Login
                      </button>
                    </div>
                  </Form>
                )}
              </div>
            )}
          </Formik>
        </CommonCard>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col flex-1 mx-auto max-w-screen-lg h-screen">
        <h1>This is first prototpye login sso</h1>
        <div>
          <CommonCard>
            <h1>Client not Found please check your client_id</h1>
          </CommonCard>
        </div>
      </div>
    )
  }
}
