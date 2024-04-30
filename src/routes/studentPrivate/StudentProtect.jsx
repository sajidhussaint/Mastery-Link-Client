import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const StudentProtected = ({ element }) => {
  const user = useSelector(store => store.user.user)
  if (user) {
    if (user.role === 'student') {
      return <>{element}</>
    }
  }else{
    return <Navigate to="/login" />
  }

  return <>{element}</>
}

export default StudentProtected;
