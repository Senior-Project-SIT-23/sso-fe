import { Card, Container, CssBaseline } from '@material-ui/core'
import React, { useContext } from 'react'
import { getCreateApplicationFormData } from '../../../form/applicationHelper'
import { applicationStoreStoresContext } from '../context'
import ApplicationForm from './form'

export default function Index() {
  const { applicationStore } = useContext(applicationStoreStoresContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      detail: e.target.detail.value,
      policy: e.target.policy.value,
    }

    applicationStore.createApplication(getCreateApplicationFormData(data))
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
