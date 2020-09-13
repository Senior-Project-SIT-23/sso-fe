import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles({
  root: {
    minWidth: 478,
    minHeight: 450,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function CommonCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      {props.title && <CardHeader className="text-blue-700 font-bold text-center" title={props.title} />}
      <CardContent>{props.children}</CardContent>
    </Card>
  )
}
