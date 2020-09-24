import { Card, Container, CssBaseline } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { getCreateApplicationFormData } from '../../../form/applicationHelper'
import { applicationStoreStoresContext } from '../context'
import ApplicationForm from './form'
import SnackBar from '../../Common/SnackBar'

export default function Index(props) {
  const { applicationStore } = useContext(applicationStoreStoresContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      detail: e.target.detail.value,
    }
    try {
      await applicationStore.createApplication(getCreateApplicationFormData(data))
      props.setSnackBar({ open: true, message: 'Created Application', status: 'success' })
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
