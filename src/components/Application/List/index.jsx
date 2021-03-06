import React, { useCallback, useContext, useEffect, useState } from 'react'
import StickyHeadTable from '../../Common/Table/StickyHeadTable'
import { applicationStoreStoresContext } from '../context'

export default function Index(props) {
  const { applicationStore } = useContext(applicationStoreStoresContext)
  const [rows, setRows] = useState([])

  const fetchAllApplication = useCallback(async () => {
    await applicationStore.fetchAllApplication()
    setRows(applicationStore.applicationAll)
  }, [applicationStore])

  useEffect(() => {
    fetchAllApplication()
  }, [fetchAllApplication])

  const handleDelete = async (id, status) => {
    await applicationStore.deleteApplication(id)
    fetchAllApplication()
  }

  const columns = [
    { id: 'name', label: 'App Name', width: 90, linkId: true, link: '/manage/applications/' },
    { id: 'detail', label: 'Detail', width: 200 },
    { id: 'status', label: 'status', width: 50, chip: true },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 50,
      align: 'center',
      delete: true,
    },
  ]

  return (
    <div>
      <StickyHeadTable {...props} handleAction={handleDelete} rows={rows} columns={columns}></StickyHeadTable>
    </div>
  )
}
