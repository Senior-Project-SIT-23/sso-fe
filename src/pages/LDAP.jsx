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
import defaultBGIMAGE from '../asset/bg_login.jpg'

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

export default function LDAPLayout(props) {
  const [customPage, setCustomPage] = useState({
    rightBGColor: 'white',
    backgroundImage: `${defaultBGIMAGE}`,
    iconColor: '#3f51b5',
    btnColor: '#3f51b5',
    btnHover: '#3f51b5d9',
    btnHoverColorText: '#fff',
    btnColorText: '#fff',
    customText: {
      label: '',
      singIn: 'Sign in',
      color: '#000',
    },
  })
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    rightBGColor: {
      backgroundColor: `${customPage.rightBGColor} !important`,
    },
    image: {
      backgroundImage: `url(${customPage.backgroundImage})`,
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
      backgroundColor: customPage.iconColor || theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    customText: {
      color: customPage.customText.color,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      transitionDuration: '0.4s',
      color: customPage.btnColorText,
      backgroundColor: customPage.btnColor,
      '&:hover': {
        transitionDuration: '0.4s',
        color: customPage.btnHoverColorText,
        backgroundColor: customPage.btnHover,
      },
    },
  }))
  let classes = useStyles()

  const { authenticationStore, applicationStore } = useContext(storesContext)
  const [isPrefetch, setIsPrefetch] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [snackBar, setSnackBar] = useState({ message: '', open: false, status: 'success' })
  const queryParams = queryString.parse(props.location.search)

  const handleLogin = async (e) => {
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
        window.location.href = `${applicationStore.redirectURI}?code=${response.data.auth_code}&state=${queryParams.state}`
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
        window.location.href = `${applicationStore.redirectURI}?code=${response.data.auth_code}&state=${queryParams.state}`
      } else {
        window.location.href = `${applicationStore.redirectURI}`
      }
    } catch (error) {
      alert(error)
    }
  }

  const formatCustomPages = (data) => {
    const pages = data.data.app_pages
    setCustomPage({
      rightBGColor: pages.BACKGROUND_COLOR,
      backgroundImage: pages.IMAGE_URL,
      iconColor: pages.ICON_COLOR,
      btnColor: pages.BUTTON_COLOR,
      btnHover: pages.BUTTON_HOVER_COLOR,
      btnHoverColorText: pages.BUTTON_HOVER_TEXT_COLOR,
      btnColorText: pages.BUTTON_TEXT_COLOR,
      customText: {
        label: pages.LABEL_WORD,
        singIn: pages.SIGN_IN_WORD,
        color: pages.TEXT_COLOR,
      },
    })
  }

  const checkClientId = useCallback(async () => {
    applicationStore.setRedirectURI('/manage/applications')
    if (queryParams.response_type === 'code') {
      if (queryParams.state && queryParams.state !== '') {
        try {
          const response = await applicationStore.checkClientId(queryParams.client_id, queryParams.redirect_uri)
          if (response.status === 200) {
            await formatCustomPages(response.data)
            if (queryParams.redirect_uri && (queryParams.redirect_uri.search('https://') === 0 || queryParams.redirect_uri.search('http://') === 0)) {
              applicationStore.setRedirectURI(queryParams.redirect_uri)
              setShowCode(true)
            } else {
              setSnackBar({ message: 'Format url not correct its will redirect not correctly ', open: true, status: 'warning' })
            }
          }
        } catch (error) {
          setIsDisabled(true)
          setSnackBar({ message: error.response.data.message, open: true, status: 'error' })
        }
      } else {
        setIsDisabled(true)
        setSnackBar({ message: 'Can Not Find param state', open: true, status: 'warning' })
      }
    }
    await authenticationStore.me()
    setIsPrefetch(false)
  }, [applicationStore, authenticationStore, queryParams.client_id, queryParams.redirect_uri, queryParams.response_type, queryParams.state])

  useEffect(() => {
    checkClientId()
  }, [checkClientId])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.rightBGColor}>
        <div className={classes.paper}>
          <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.customText} component="h1" variant="h5">
            {customPage.customText.singIn}
          </Typography>
          <label className={classes.customText}>{customPage.customText.label}</label>
          {!isPrefetch ? (
            <>
              {!authenticationStore.is_auth ? (
                <form className={classes.form} onSubmit={handleLogin}>
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
                  <Button disabled={isDisabled} type="submit" fullWidth variant="contained" className={`${classes.submit}`}>
                    Sign In
                  </Button>
                </form>
              ) : (
                <>
                  <Button disabled={isDisabled} fullWidth variant="contained" className={classes.submit} onClick={() => handleContinueLogin()}>
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
