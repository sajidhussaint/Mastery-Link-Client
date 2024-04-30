import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const InstructorProtected = ({ element }) => {
  const instructor = useSelector((store) => store.instructor.instructor);
  if (instructor) {
    if (instructor.role === "instructor") {
      return <>{element}</>;
    }
  } else {
    return <Navigate to="/instructor/login" />;
  }
};

export default InstructorProtected;
