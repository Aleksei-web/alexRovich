import React from 'react'
import {useSelector} from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const AdminRouter = ({childrin, ...res}) => {

  const user = useSelector(state => state.user)

  return (
    user ? (<Route {...res}>{childrin}</Route>) : (<Redirect to='/login' />) 
  )
}
