import React, { useCallback, useEffect, useContext, useState } from 'react'
import SnackBar from '../components/Common/SnackBar'
import ShowDetailApplication from '../components/ShowDetailApplication'

export default function ApplicationsDetail(props) {
  const [snackBar, setSnackBar] = useState({ open: false, message: '', status: '' })

  return (
    <div>
      <SnackBar snackBar={snackBar} setSnackBar={setSnackBar}></SnackBar>
      <ShowDetailApplication setSnackBar={setSnackBar} {...props} />
    </div>
  )
}
