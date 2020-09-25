import React, { useCallback, useContext, useEffect, useState } from 'react'
import StickyHeadTable from '../../Common/Table/StickyHeadTable'
import { userRoleStoreStoreStoresContext } from '../context'

export default function Index(props) {
  const { userRoleStore } = useContext(userRoleStoreStoreStoresContext)
  const [rows, setRows] = useState([])

  const fetchAllUsersRole = useCallback(async () => {
    await userRoleStore.fetchUserRoles()
    setRows(userRoleStore.usersRole)
  }, [userRoleStore])

  useEffect(() => {
    fetchAllUsersRole()
  }, [fetchAllUsersRole])

  const columns = [
    { id: 'user_id', label: 'ID', width: 90, linkId: true, link: '/manage/users/' },
    { id: 'name_th', label: 'NameTH', width: 200 },
    { id: 'name_en', label: 'NameEN', width: 50 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'user_type',
      label: 'Type',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'roles',
      label: 'Roles',
      minWidth: 170,
      align: 'center',
    },
  ]

  return (
    <div>
      <StickyHeadTable {...props} rows={rows} columns={columns}></StickyHeadTable>
    </div>
  )
}
