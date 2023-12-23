import React from 'react'
import { Route, Routes } from "react-router-dom";
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import InstructorLogin from '../pages/instructor/InstructorLogin';
import InstructorSignup from '../pages/instructor/InstructorSignup';
import VerifyOtp from "../pages/student/VerifyOtp";
import InstructorProtected from "./instructorPrivate/InstructorProtect";
import InstructorPublic from "./instructorPrivate/InstructorPublic";



const InstructorRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<InstructorProtected element={<InstructorDashboard />}/>} />
        <Route path="/signup" element={<InstructorPublic element={<InstructorSignup />}/>} />
        <Route path="/login" element={<InstructorPublic element={<InstructorLogin />}/>} />
        <Route path="/verify-otp" element={<VerifyOtp isInstructor={true}/>} />
      </Routes>
    </>
  )
}

export default InstructorRoute
