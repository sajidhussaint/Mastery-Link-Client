import React from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";

const Dashbord = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />
      <div className="flex flex-col py-20 px-20 h-screen overflow-y-auto w-full">
      <h1>content</h1>
      </div>
    </div>
  );
};

export default Dashbord;
