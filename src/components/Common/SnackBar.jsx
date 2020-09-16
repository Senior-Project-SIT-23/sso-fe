import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

export default function SnackBar(props) {
  const handleClose = () => {
    props.setSnackBar({ ...props.snackBar, open: false })
  }
  return (
    <Snackbar className="z-50" open={props.snackBar.open} autoHideDuration={6000} onClick={handleClose} onClose={() => handleClose}>
      <Alert onClose={() => handleClose} onClick={handleClose} severity={props.snackBar?.status}>
        {props.snackBar?.message}
      </Alert>
    </Snackbar>
  )
}
