import React, { useContext, useEffect, useCallback, useState } from 'react'
import Cookie from 'js-cookie'
import { continueLogin } from '../service/auth'
import { getAuthFormData } from '../form/authHelper'
import { navigate } from '@reach/router'
import * as queryString from 'query-string'
import { storesContext } from '../context'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import Loading from '../components/Common/Loading'
import SnackBar from '../components/Common/SnackBar'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/pepea23">
        SSO SIT PROJECT
      </Link>{' '}
      {'2020'}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function LDAPLayout(props) {
  const classes = useStyles()

  const { authenticationStore, applicationStore } = useContext(storesContext)
  const [isPrefecth, setIsPrefecth] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const [snackBar, setSnackBar] = useState({ message: '', open: false, status: 'success' })
  const queryParams = queryString.parse(props.location.search)

  const checkClientId = useCallback(async () => {
    applicationStore.setRedirectURI('/manage/applications')
    if (queryParams.response_type === 'code') {
      if (queryParams.state && queryParams.state !== '') {
        try {
          let response = await applicationStore.checkClientId(queryParams.client_id, queryParams.redirect_uri)
          if (response.status === 200) {
            if (queryParams.redirect_uri && (queryParams.redirect_uri.search('https://') === 0 || queryParams.redirect_uri.search('http://') === 0)) {
              applicationStore.setRedirectURI(queryParams.redirect_uri)
              setShowCode(true)
            }
          }
        } catch (error) {
          setSnackBar({ message: error.response.data.message, open: true, status: 'error' })
        }
      } else {
        setSnackBar({ message: 'Can Not Find param state', open: true, status: 'warning' })
      }
    }
    await authenticationStore.me()
    setIsPrefecth(false)
  }, [applicationStore, authenticationStore, queryParams.client_id, queryParams.redirect_uri, queryParams.response_type, queryParams.state])

  useEffect(() => {
    checkClientId()
  }, [checkClientId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      is_remember: e.target.is_remember.checked,
    }
    const formdata = getAuthFormData(data)
    try {
      const response = await authenticationStore.signIn(formdata)
      if (showCode) {
        window.location.href = `${applicationStore.redirectURI}?code=${response.data.auth_code}?state=${queryParams.state}`
      } else {
        window.location.href = `${applicationStore.redirectURI}`
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleContinueLogin = async (data) => {
    try {
      const response = await continueLogin()
      if (showCode) {
        window.location.href = `${applicationStore.redirectURI}?code=${response.data.auth_code}?state=${queryParams.state}`
      } else {
        window.location.href = `${applicationStore.redirectURI}`
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {!isPrefecth ? (
            <>
              {!authenticationStore.is_auth ? (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel control={<Checkbox name="is_remember" id="is_remember" color="primary" />} label="Remember me" />
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Sign In
                  </Button>
                </form>
              ) : (
                <>
                  <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={() => handleContinueLogin()}>
                    Continue this account {authenticationStore.currentUser.name_en}
                  </Button>
                  <div onClick={() => authenticationStore.signOut()} className="my-1 text-center mx-auto">
                    <label className=" hover:text-blue-800 cursor-pointer">logout</label>
                  </div>
                </>
              )}
            </>
          ) : (
            <Loading className={'mt-24'} />
          )}
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  )
}
