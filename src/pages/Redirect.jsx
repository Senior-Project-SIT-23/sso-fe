import React, { useEffect } from 'react'
import Cookie from 'js-cookie'
import CommonCard from '../components/Common/Card'
import { navigate } from '@reach/router'
import * as queryString from 'query-string';

export default function Redirect(props) {
  useEffect(() => {
    setTimeout(() => {
      navigate(`/applications?code=${props.auth_code}`)
    }, 4500)
  }, [])
  return (
    <div className="flex flex-col flex-1 mx-auto max-w-screen-lg h-screen">
      <h1>This is first prototpye login sso</h1>
      <CommonCard>
        <h1>Welcome {Cookie.get(process.env.REACT_APP_ACCESS_NAME)}</h1>
        <p>We are redirect to test applcations </p>
      </CommonCard>
    </div>
  )
}
