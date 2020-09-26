import { Paper } from '@material-ui/core'
import { AssignmentTurnedIn, Person, SupervisorAccount } from '@material-ui/icons'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CommonCard from '../../Common/Card'
import Loading from '../../Common/Loading'
import { userRoleStoreStoreStoresContext } from '../context'
import SnackBar from '../../Common/SnackBar'

export default function Index(prop) {
  const { userRoleStore } = useContext(userRoleStoreStoreStoresContext)
  const [user, setUser] = useState({})
  const [roles, setRoles] = useState([])
  const [isFetch, setIsFetch] = useState(true)
  const [snackBar, setSnackBar] = useState({ open: false, message: '', status: '' })

  const fetchUserByID = useCallback(async () => {
    setIsFetch(true)
    await userRoleStore.fetchUserByID(prop.user_id)
    await userRoleStore.fetchRoles()
    setUser(userRoleStore.currentUser)
    setRoles(userRoleStore.roles)
    setIsFetch(false)
  }, [prop.user_id, userRoleStore])

  const handleChangeRole = async (hasRole, role_id) => {
    await userRoleStore.handleChangeRole(hasRole, role_id, user.user_id)
    setSnackBar({ open: true, message: 'Role Changed', status: 'success' })
    fetchUserByID()
  }

  useEffect(() => {
    fetchUserByID()
  }, [fetchUserByID])

  const checkRole = (role) => {
    if (role === 'Admin')
      return (
        <>
          <SupervisorAccount style={{ fontSize: '4.5rem' }} />
          <h3 className="font-sarabun font-bold">{role}</h3>
        </>
      )
    if (role === 'User')
      return (
        <>
          <Person style={{ fontSize: '4.5rem' }} />
          <h3 className="font-sarabun font-bold">{role}</h3>
        </>
      )
    if (role === 'Approver')
      return (
        <>
          <AssignmentTurnedIn style={{ fontSize: '4.5rem' }} />
          <h3 className="font-sarabun font-bold">{role}</h3>
        </>
      )
  }
  if (!isFetch) {
    return (
      <CommonCard title={`${user.user_id}`}>
        <SnackBar snackBar={snackBar} setSnackBar={setSnackBar}></SnackBar>

        <div className="text-center mb-3">
          <h1 className="text-xl">{user.name_en}</h1>
          <h1 className="text-lg">{user.name_th || '-'}</h1>
        </div>
        <div className="flex" style={{ placeContent: 'center' }}>
          {roles.map((role) => {
            let hasRole = false
            for (let index = 0; index < user.roles.length; index++) {
              hasRole = user.roles[index].role_id === role.role_id
              if (hasRole) {
                break
              }
            }
            return (
              <Paper
                className={`mx-3 cursor-pointer hover:bg-blue-700 hover:text-white ${hasRole ? 'bg-blue-700-text-white-impotent' : ''}`}
                key={role.role_id}
                onClick={() => (role.name === 'User' ? '' : handleChangeRole(hasRole, role.role_id))}
                style={{ width: '125px', height: '125px' }}
                elevation={1}
              >
                <div className="my-2 h-full text-center">{checkRole(role.name)}</div>
              </Paper>
            )
          })}
        </div>
      </CommonCard>
    )
  } else {
    return <Loading></Loading>
  }
}
