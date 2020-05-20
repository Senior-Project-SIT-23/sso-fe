import React from 'react'
import { Formik, Form } from 'formik'
import Cookie from 'js-cookie'
import FormLogin from '../components/Login/FormLogin'
import CommonCard from '../components/Common/Card'
import { login, continueLogin } from '../service/auth'
import { getAuthFormData } from '../form/authHelper'
import { navigate } from '@reach/router'
import * as queryString from 'query-string'

export default function TestLogin(props) {
  const handleSubmit = async (data) => {
    const fromdata = getAuthFormData(data)
    try {
      const response = await login(fromdata)
      console.log(response)
      Cookie.set(process.env.REACT_APP_ACCESS_TOKEN_NAME, response.data.token)
      Cookie.set(process.env.REACT_APP_ACCESS_NAME, response.data.name)
      navigate(`/redirect/${response.data.auth_code}`)
    } catch (error) {
      alert(error)
    }
  }
  const handleContinueLogin = async (data) => {
    const fromdata = getAuthFormData(data)
    try {
      const response = await continueLogin(fromdata)
      navigate(`/redirect/${response.data.auth_code}`)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="flex flex-col flex-1 mx-auto max-w-screen-lg h-screen">
      <h1>This is first prototpye login sso</h1>
      <CommonCard>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
          {(formikProps) => (
            <div className=" mt-6 mx-auto">
              {Cookie.get(process.env.REACT_APP_ACCESS_TOKEN_NAME) ? (
                <>
                  <h1>This is first prototpye login sso</h1>
                  <h1>Welcome {Cookie.get(process.env.REACT_APP_ACCESS_NAME)}</h1>
                  <button onClick={() => handleContinueLogin()}>Continue this account</button>
                </>
              ) : (
                <Form>
                  <FormLogin formikProps={formikProps} />
                  <div className="w-full mx-auto mt-6">
                    <button type="submit">Login</button>
                  </div>
                </Form>
              )}
            </div>
          )}
        </Formik>
      </CommonCard>
    </div>
  )
}
