import _ from 'lodash'
import React, { useContext, useCallback, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { AssignmentTurnedIn, ExitToApp, Person, SupervisorAccount } from '@material-ui/icons'

import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Dashboard as DashboardIcon } from '@material-ui/icons'
import { ListItem, ListItemText, ListItemIcon, Tooltip } from '@material-ui/core'
import { navigate } from '@reach/router'
import { storesContext } from '../context'
import { useEffect } from 'react'
import SnackBar from './Common/SnackBar'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

export default function MainLayout2(props) {
  const { authenticationStore } = useContext(storesContext)
  const { component: Child } = props
  const classes = useStyles()

  const [open, setOpen] = useState(true)
  const [user, setUser] = useState(authenticationStore.currentUser)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const fetchMe = useCallback(async () => {
    try {
      if (!(await authenticationStore.me())) {
        window.location.href = '/login'
      }
    } catch (error) {
      window.location.href = '/login'
    }
    setUser(authenticationStore.currentUser)
  }, [authenticationStore])

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  const checkRole = () => {
    if (user?.roles) {
      const list = []
      for (let index = 0; index < user.roles.length; index++) {
        if (user.roles[index].name === 'Admin') {
          list.push(
            <>
              <ListItem button onClick={() => navigate('/manage/users')}>
                <ListItemIcon>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText primary="Role Manage" />
              </ListItem>
              <ListItem button onClick={() => navigate('/manage/requested/applications')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="App Requested" />
              </ListItem>
            </>
          )
          break
        } else if (user.roles[index].name === 'Approver') {
          list.push(
            <ListItem button onClick={() => navigate('/manage/requested/applications')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="App Requested" />
            </ListItem>
          )
          break
        }
      }
      list.push(
        <ListItem button onClick={() => navigate('/manage/applications')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
      )
      return <div>{_.map(list, (item) => item)}</div>
    }
    return <div></div>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.title}
          </Typography>
          <IconButton edge="end" color="inherit">
            <Tooltip
              title={
                <>
                  <Typography color="inherit"> ID : {user?.user_id}</Typography>
                  <Typography color="inherit"> NameEn : {user?.name_en}</Typography>
                  <Typography color="inherit"> NameTh : {user?.name_th || '-'}</Typography>
                  {user?.roles &&
                    _.map(user.roles, (role) => {
                      if (role.name === 'Admin')
                        return (
                          <Tooltip title={role.name}>
                            <SupervisorAccount />
                          </Tooltip>
                        )
                      if (role.name === 'User')
                        return (
                          <Tooltip title={role.name}>
                            <Person />
                          </Tooltip>
                        )
                      if (role.name === 'Approver')
                        return (
                          <Tooltip title={role.name}>
                            <AssignmentTurnedIn />
                          </Tooltip>
                        )
                    })}
                </>
              }
            >
              <label>{user?.name_en}</label>
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{checkRole()}</List>
        <Divider />
        <div className="mt-auto mb-3">
          <Divider />
          <ListItem button onClick={() => authenticationStore.signOut()}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </div>
        <Divider />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <SnackBar></SnackBar>
          <Child {...props} />
        </Container>
      </main>
    </div>
  )
}
