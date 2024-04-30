import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


const InstructorPublic= ({ element }) => {
  const instructor = useSelector(store => store.instructor.instructor)
  if (!instructor) {
    return <>{element}</>
  }else{
    return <Navigate to="/instructor/home"/>
  }
}

export default InstructorPublic;