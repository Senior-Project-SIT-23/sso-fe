import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ApplicationForm(props) {
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Application
      </Typography>
      <form className={classes.form} onSubmit={props.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField variant="outlined" required fullWidth id="name" label="Application Name" name="name" />
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} variant="outlined" required fullWidth id="detail" label="Detail" name="detail" />
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} variant="outlined" required fullWidth id="policy" label="Policy" name="policy" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox required value="allowExtraEmails" color="primary" />}
              label="I want understand  how to integrate my application to sso service"
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Create
        </Button>
      </form>
    </div>
  )
}
