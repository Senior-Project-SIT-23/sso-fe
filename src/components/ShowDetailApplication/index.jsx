import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TransitionsModal from '../Common/TransitionsModal'
import ApplicationDetail from './ApplicationDetail'
import ApplicationPage from './ApplicationPage'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}))

export default function Index(props) {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const [openShowDetail, setOpenShowDetail] = React.useState({ open: false })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
    <div className={classes.root}>
      <TransitionsModal open={openShowDetail.open} setOpen={setOpenShowDetail}></TransitionsModal>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Application" {...a11yProps(0)} />
          <Tab label="Page" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ApplicationDetail {...props} setOpenShowDetail={setOpenShowDetail}></ApplicationDetail>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ApplicationPage {...props} setOpenShowDetail={setOpenShowDetail}></ApplicationPage>
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}
