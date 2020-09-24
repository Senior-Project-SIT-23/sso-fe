import React, { useCallback, useEffect, useContext } from 'react'
import AdminManageApplication from '../components/AdminManageApplication'
import AdminManageRole from '../components/AdminManageRole'

export default function AdminManage(props) {
  const { index } = props
  return <div>
    {index === 0 && <AdminManageApplication />}
    {index === 1 && <AdminManageRole />}
  </div>
}
