import React from 'react'
import { Route, Routes } from "react-router-dom";
import InstructorHome from '../pages/instructor/InstructorHome';
import InstructorLogin from '../pages/instructor/InstructorLogin';
import InstructorSignup from '../pages/instructor/InstructorSignup';
import VerifyOtp from "../pages/student/VerifyOtp";
import InstructorProtected from "./instructorPrivate/InstructorProtect";
import InstructorPublic from "./instructorPrivate/InstructorPublic";
import MyCourses from '../pages/instructor/MyCourses';
import AddCourse from '../pages/instructor/AddCourse';
import CourseOverview from '../pages/instructor/CourseOverview';
import WalletHistory from '../pages/instructor/WalletHistory';
import InstructorChat from '../pages/instructor/InstructorChat';



const InstructorRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<InstructorPublic element={<InstructorSignup />}/>} />
        <Route path="/login" element={<InstructorPublic element={<InstructorLogin />}/>} />

        <Route path="/verify-otp" element={<VerifyOtp isInstructor={true}/>} />
        <Route path="/home" element={<InstructorProtected element={<InstructorHome />}/>} />
        <Route path="/add-course" element={<InstructorProtected element={<AddCourse />}/>} />
        <Route path="/course-overview" element={<InstructorProtected element={<CourseOverview />}/>} />
        <Route path="/my-courses" element={<InstructorProtected element={<MyCourses/>}/>} />
        <Route path="/wallet-history"  element={<InstructorProtected element={<WalletHistory />}/>} />
        <Route path="/chat" element={<InstructorProtected element={<InstructorChat/>}/>} />
      </Routes>
    </>
  )
}

export default InstructorRoute;
