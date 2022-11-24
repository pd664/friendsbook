import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';
import { getToken } from './token'

function PrivateRoute(Component) {
  const token = getToken();

  return (
    token ? <Outlet /> : <Navigate to="/signin" />
  )
  
}

export default PrivateRoute