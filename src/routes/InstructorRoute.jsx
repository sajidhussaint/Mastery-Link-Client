import React from 'react'
import { Route, Routes } from "react-router-dom";
import InstructorHome from '../pages/instructor/InstructorHome';
import InstructorLogin from '../pages/instructor/InstructorLogin';
import InstructorSignup from '../pages/instructor/InstructorSignup';
import VerifyOtp from "../pages/student/VerifyOtp";
import InstructorProtected from "./instructorPrivate/InstructorProtect";
import InstructorPublic from "./instructorPrivate/InstructorPublic";
import MyCourses from '../pages/instructor/MyCourses';



const InstructorRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<InstructorProtected element={<InstructorHome />}/>} />
        <Route path="/my-courses" element={<InstructorProtected element={<MyCourses/>}/>} />
        <Route path="/signup" element={<InstructorPublic element={<InstructorSignup />}/>} />
        <Route path="/login" element={<InstructorPublic element={<InstructorLogin />}/>} />
        <Route path="/verify-otp" element={<VerifyOtp isInstructor={true}/>} />
      </Routes>
    </>
  )
}

export default InstructorRoute
