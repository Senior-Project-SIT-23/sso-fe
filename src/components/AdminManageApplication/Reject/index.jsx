import React, { useCallback, useContext, useEffect, useState } from 'react'
import StickyHeadTable from '../../Common/Table/StickyHeadTable'
import { applicationMangeStoresContext } from '../context'

export default function Index(props) {
  const { applicationManageStore } = useContext(applicationMangeStoresContext)
  const [rows, setRows] = useState([])

  const fetchAllReject = useCallback(async () => {
    await applicationManageStore.fetchAllReject()
    setRows(applicationManageStore.applicationReject)
  }, [applicationManageStore])

  useEffect(() => {
    fetchAllReject()
  }, [fetchAllReject])

  const handleStatus = async (id, status) => {
    await applicationManageStore.updateStatusById(id, status)
    fetchAllReject()
  }

  const columns = [
    { id: 'name', label: 'App Name', width: 90, linkId: true, link: '/manage/applications/' },
    { id: 'detail', label: 'Detail', width: 200 },
    { id: 'user_name_en', label: 'Request Name', width: 170 },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 90,
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
