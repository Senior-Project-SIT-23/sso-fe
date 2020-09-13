import React, { useCallback, useEffect, useContext } from 'react'
import ShowDetailApplication from '../components/ShowDetailApplication'

export default function ApplicationsDetail(props) {
  return (
    <div>
      <ShowDetailApplication {...props} />
    </div>
  )
}
