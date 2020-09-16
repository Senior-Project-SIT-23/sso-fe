import React, { useCallback, useEffect, useContext, useState } from 'react'
import MyApplication from '../components/Application'
import SnackBar from '../components/Common/SnackBar'

export default function Applications() {
  const [snackBar, setSnackBar] = useState({ open: false, message: '', status: '' })

  return (
    <div>
      <SnackBar snackBar={snackBar} setSnackBar={setSnackBar}></SnackBar>
      <MyApplication setSnackBar={setSnackBar} />
    </div>
  )
}
