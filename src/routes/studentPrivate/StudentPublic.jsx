import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const StudentPublic= ({ element }) => {
  const student = useSelector(store => store.user.user)
  if (!student) {
    return <>{element}</>
  }else{
    return <Navigate to="/"/>
  }
}

export default StudentPublic;