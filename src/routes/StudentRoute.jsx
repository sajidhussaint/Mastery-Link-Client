import { Route, Routes } from "react-router-dom";
import StudentSignup from "../pages/student/StudentSignup";
import StudentLogin from "../pages/student/StudentLogin";
import Home from "../pages/student/Home";
import VerifyOtp from "../pages/student/VerifyOtp";
import StudentPublic from "./studentPrivate/StudentPublic";
import StudentProtected from "./studentPrivate/StudentProtect";

import Courses from "../pages/student/Courses";
import SingleCourseStudent from "../pages/student/SingleCourseStudent";

const StudentRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<StudentPublic  element={<StudentLogin/>} />} />
        <Route path="/signup" element={<StudentPublic  element={<StudentSignup/>} />} />
        <Route
          path="/verify-otp"
          element={<VerifyOtp isInstructor={false} />}
        />
        {/* <Route path="/test" element={<Test/>} /> */}
        <Route path="/courses" element={<Courses/>} />
        <Route path="/view-course" element={<SingleCourseStudent/>} />


      </Routes>
    </>
  );
};

export default StudentRoute;
