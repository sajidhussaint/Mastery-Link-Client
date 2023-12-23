import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AdminProtected = ({ element }) => {
  const admin = useSelector(store => store.admin.admin)
  if (admin) {
    if (admin.role === 'student') {
      return <Navigate to="/admin/dashboard" replace />
    }
  }else{
    return <Navigate to="/admin/login" />
  }
  return <>{element}</>
}

export default AdminProtected;