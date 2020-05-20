import React from 'react'
import { Field } from 'formik'
import _ from 'lodash'

import TextInput from '../Common/Input'

export default function FormLogin(props) {
  return (
    <div className="my-6">
      <h1 className="text-center font-bold text-4xl p-6 ">SIT SSO</h1>
      <div className="w-full my-2">
        <Field name="username">
          {(field, meta) => <Field name={`username`}>{({ field, meta }) => <TextInput inputProps={{ ...field }} required label="username" />}</Field>}
        </Field>
      </div>
      <div className="w-full my-2">
        <Field name="password">
          {(field, meta) => (
            <Field name={`password`}>{({ field, meta }) => <TextInput inputProps={{ ...field }} required type="password" label="password" />}</Field>
          )}
        </Field>
      </div>
    </div>
  )
}
