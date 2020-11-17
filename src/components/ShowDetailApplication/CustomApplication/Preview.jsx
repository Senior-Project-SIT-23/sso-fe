import React, { useContext, useEffect, useCallback, useState } from 'react'
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

export default function LDAPPreview(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    rightBGColor: {
      backgroundColor: `${props.customPage.rightBGColor} !important`,
    },
    image: {
      backgroundImage: `url(${props.customPage.backgroundImage})`,
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
      backgroundColor: props.customPage.iconColor || theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    customText: {
      color: props.customText.color,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      transitionDuration: '0.4s',
      color: props.customPage.btnColorText,
      backgroundColor: props.customPage.btnColor,
      '&:hover': {
        transitionDuration: '0.4s',
        color: props.customPage.btnHoverColorText,
        backgroundColor: props.customPage.btnHover,
      },
    },
  }))
  let classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.rightBGColor}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.customText} component="h1" variant="h5">
            {props.customText.singIn}
          </Typography>
          <label className={classes.customText}>{props.customText.label}</label>
          <>
            <form className={classes.form}>
              <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />
              <FormControlLabel control={<Checkbox name="is_remember" id="is_remember" color="primary" />} label="Remember me" />
              <Button fullWidth variant="contained" className={`${classes.submit}`}>
                Sign In
              </Button>
            </form>
          </>

          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  )
}
