import { Card, Container, CssBaseline } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { getCreateApplicationFormData } from '../../../form/applicationHelper'
import { applicationStoreStoresContext } from '../context'
import ApplicationForm from './form'

export default function Index(props) {
  const { applicationStore } = useContext(applicationStoreStoresContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      detail: e.target.detail.value,
      redirect_uri: e.target.redirect_uri.value,
    }
    try {
      await applicationStore.createApplication(getCreateApplicationFormData(data))
      props.setSnackBar({ open: true, message: 'Created Application', status: 'success' })
      props.handleChange(0, 0)
    } catch (error) {
      props.setSnackBar({ open: true, message: 'Created Application Fail', status: 'error' })
    }
  }
  return (
    <Card>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <ApplicationForm handleSubmit={handleSubmit}></ApplicationForm>
      </Container>
    </Card>
  )
}
