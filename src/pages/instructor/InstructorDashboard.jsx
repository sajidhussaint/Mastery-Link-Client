import React from "react";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import InstructorSidebar from "../../components/instructorComponent/InstructorSidebar";


const InstructorDashboard = () => {
  return (
    <>
      <InstructorNavbar />
      <div className="mx-auto w-full flex ">
        <InstructorSidebar/>
        {/* contents */}
        <h1>DashBoard</h1>

      </div>
    </>
  );
};

export default InstructorDashboard;
