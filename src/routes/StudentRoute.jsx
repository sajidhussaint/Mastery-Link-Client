import { Route, Routes } from "react-router-dom";
import StudentSignup from "../pages/student/StudentSignup";
import StudentLogin from "../pages/student/StudentLogin";
import Home from "../pages/student/Home";
import VerifyOtp from "../pages/student/VerifyOtp";
import StudentPublic from "./studentPrivate/StudentPublic";
import StudentProtected from "./studentPrivate/StudentProtect";
import Test from "../pages/student/Test";

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
        <Route path="/test" element={<Test/>} />


      </Routes>
    </>
  );
};

export default StudentRoute;
