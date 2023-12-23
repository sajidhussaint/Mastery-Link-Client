import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AdminPublic= ({ element }) => {
  const admin = useSelector(store => store.admin.admin)
  if (!admin) {
    return <>{element}</>
  }else{
    return <Navigate to="/admin/dashboard"/>
  }
}

export default AdminPublic;