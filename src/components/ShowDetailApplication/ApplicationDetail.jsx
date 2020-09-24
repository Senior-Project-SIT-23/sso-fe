import React, { useCallback, useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CommonCard from '../Common/Card'
import { applicationDetailStoresContext } from './context'
import Loading from '../Common/Loading'
import { Chip } from '@material-ui/core'
import { getCreateApplicationFormData } from '../../form/applicationHelper'

export default function ApplicationDetail(props) {
  const { applicationDetail } = useContext(applicationDetailStoresContext)
  const [application, setApplication] = useState({})
  const [isFetch, setIsFetch] = useState(true)
  const [isEdit, setIsEdit] = useState(false)

  const fetchApplication = useCallback(async () => {
    await applicationDetail.fetchAllApplication(props.app_id)
    setApplication(applicationDetail.application)
    setIsFetch(false)
  }, [applicationDetail, props.app_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEdit) {
      setIsEdit(false)
      const data = {
        name: e.target.name.value,
        detail: e.target.detail.value,
      }
      await applicationDetail.updateApplication(props.app_id, getCreateApplicationFormData(data))
      fetchApplication()
    } else {
      setIsEdit(true)
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [fetchApplication])

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))
  const classes = useStyles()
  const color = { approve: 'primary', reject: 'secondary', pending: 'default' }
  return (
    <CommonCard>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {isFetch ? (
          <Loading className="text-center my-auto"></Loading>
        ) : (
          <div className={classes.paper}>
            <Typography component="h1" variant="h3">
              {application.name}
            </Typography>
            <Chip className="my-3" color={color[application.status]} variant="outlined" label={application.status} />
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField variant="outlined" fullWidth label="Client ID" disabled value={application.secret_id} autoFocus />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField variant="outlined" fullWidth label="Secret ID" disabled value={application.app_id} autoFocus />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    fullWidth
                    disabled={!isEdit}
                    onChange={(e) => setApplication({ ...application, detail: e.target.value })}
                    value={application.detail}
                    id="detail"
                    label="Detail"
                    name="detail"
                  />
                </Grid>
              </Grid>
              {application.status === 'approve' && (
                <>
                  {isEdit ? (
                    <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
                      Save
                    </Button>
                  ) : (
                    <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
                      Edit
                    </Button>
                  )}
                </>
              )}
            </form>
          </div>
        )}
      </Container>
    </CommonCard>
  )
}
