import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import { getAllCourse, approveCourse, rejectCourse } from "../../api/adminApi";

const CourseList = () => {
  const [CourseList, setCourseList] = useState([]);

  const getCourses = async () => {
    try {
      const Courses = await getAllCourse();
      setCourseList(Courses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (courseId, e) => {
    e.preventDefault();
    const response = await approveCourse(courseId);
    if (response) {
      const newList = CourseList.map((course) =>
        course.id === courseId ? { ...course, approval: "approved" } : course
      );
      setCourseList(newList);
    }
  };

  const handleReject = async (courseId, e) => {
    e.preventDefault();
    const response = await rejectCourse(courseId);
    if (response) {
      const newList = CourseList.map((course) =>
        course.id === courseId ? { ...course, approval: "rejected" } : course
      );
      setCourseList(newList);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />

      <div className="flex flex-col py-20 px-20 h-screen overflow-y-auto w-full">
        <div className="relative  shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-white-800 ">
            <thead className="text-xs text-white uppercase bg-white-200 bg-green-700 white:text-white-400">
              <tr>
                <th className="sm:px-6 py-3">NAME</th>
                <th className="sm:px-6 py-3">DESCRIPTION</th>
                <th className="sm:px-6 py-3">PRICE</th>
                <th className="sm:px-6 py-3">LEVEL</th>
                <th className="sm:px-6 py-3">CATEGORY</th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="text-black">
              {CourseList &&
                CourseList.map((Course) => (
                  <tr
                    key={Course.id}
                    className="bg-white border-b dark:border-gray-700"
                  >
                    <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                      {Course.name}
                    </td>
                    <td className="sm:px-6 py-4 font-medium ">
                      {Course.description}
                    </td>
                    <td className="sm:px-6 py-4 font-medium">{Course.price}</td>
                    <td className="sm:px-6 py-4 font-medium">
                      {Course.level.level}
                    </td>
                    <td className="sm:px-6 py-4 font-medium">
                      {Course.category.category}
                    </td>
                    <td className="px-6 py-4">
                      {Course.approval === "rejected" && (
                        <p className="text-xs text-red-500 py-1  ">
                          Course already rejected
                        </p>
                      )}
                      {Course.approval === "pending" ||
                      Course.approval === "rejected" ? (
                        <div className="flex">
                          <button
                            onClick={(e) => {
                              handleApprove(Course.id, e);
                            }}
                            className={`text-white mt-1 bg-green-700 hover:bg-green-800
                           font-medium rounded-lg text-xs px-3 py-2 mr-2 mb-1`}
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              handleReject(Course.id, e);
                            }}
                            className={`text-white mt-1 bg-red-700 hover:bg-red-300-800
                           font-medium rounded-lg text-xs px-3 py-2 mr-2 mb-1 ${
                             Course.approval === "rejected"
                               ? "cursor-not-allowed"
                               : ""
                           }`}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <p
                          className={` font-bold text-base ${
                            Course.approval === "rejected"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {Course.approval}
                        </p>
                      )}
                    </td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
