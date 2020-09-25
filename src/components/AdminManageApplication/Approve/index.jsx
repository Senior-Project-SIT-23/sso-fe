import React, { useCallback, useContext, useEffect, useState } from 'react'
import StickyHeadTable from '../../Common/Table/StickyHeadTable'
import { applicationMangeStoresContext } from '../context'

export default function Index(props) {
  const { applicationManageStore } = useContext(applicationMangeStoresContext)
  const [rows, setRows] = useState([])

  const fetchAllApprove = useCallback(async () => {
    await applicationManageStore.fetchAllApprove()
    setRows(applicationManageStore.applicationApprove)
  }, [applicationManageStore])

  useEffect(() => {
    fetchAllApprove()
  }, [fetchAllApprove])

  const handleStatus = async (id, status) => {
    await applicationManageStore.updateStatusById(id, status)
    fetchAllApprove()
  }

  const columns = [
    { id: 'name', label: 'App Name', width: 90, linkId: true, link: '/manage/applications/' },
    { id: 'detail', label: 'Detail', width: 200 },
    { id: 'user_name_en', label: 'Request Name', width: 50 },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 170,
      align: 'center',
      action: true,
    },
  ]

  return (
    <div>
      <StickyHeadTable handleAction={handleStatus} rows={rows} columns={columns}></StickyHeadTable>
    </div>
  )
}
