import React from 'react'
import { Route, Routes } from "react-router-dom";
import AdminLogin from '../pages/admin/AdminLogin'
import Dashbord from '../pages/admin/Dashbord';
import AdminProtected from "./adminPrivate/AdminProtect";
import AdminPublic from "./adminPrivate/AdminPublic";
import StudentList from '../pages/admin/StudentList';
import InstructorList from '../pages/admin/InstructorList';
import CourseList from '../pages/admin/CourseList';
import Categories from '../pages/admin/Categories';

const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<AdminPublic element={<AdminLogin/>}/>} />
        <Route path="/dashboard" element={<AdminProtected element={<Dashbord />} />} />
        <Route path="/student-list" element={<AdminProtected element={<StudentList />} />} />
        <Route path="/instructor-list" element={<AdminProtected element={<InstructorList />} />} />
        <Route path="/course-list" element={<AdminProtected element={<CourseList />} />} />
        <Route path="/categories" element={<AdminProtected element={<Categories />} />} />
      </Routes>
    </>
  )
}

export default AdminRoute
