import { Route, Routes } from "react-router-dom";
import StudentSignup from "../pages/student/StudentSignup";
import StudentLogin from "../pages/student/StudentLogin";
import StripeStatus from "../pages/student/StripeStatus";
import Home from "../pages/student/Home";
import VerifyOtp from "../pages/student/VerifyOtp";
import StudentPublic from "./studentPrivate/StudentPublic";
import StudentProtected from "./studentPrivate/StudentProtect";

import Courses from "../pages/student/Courses";
import SingleCourseStudent from "../pages/student/SingleCourseStudent";
import LearningPage from "../pages/student/LearningPage";
import StudentProfile from "../pages/student/StudentProfile";
import ChangePassword from "../pages/student/ChangePassword";
import Contact from "../pages/student/Contact";

const StudentRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<StudentPublic element={<StudentLogin />} />}
        />
        <Route
          path="/signup"
          element={<StudentPublic element={<StudentSignup />} />}
        />
        <Route
          path="/verify-otp"
          element={<VerifyOtp isInstructor={false} />}
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/view-course" element={<SingleCourseStudent />} />
        <Route path="/status" element={<StripeStatus />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
};

export default StudentRoute;
