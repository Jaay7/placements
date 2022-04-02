import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'

const Dashboard = () => {

  if (localStorage.getItem('token') === null) {
    return (
      <Navigate to="/login" />
    )
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Dashboard