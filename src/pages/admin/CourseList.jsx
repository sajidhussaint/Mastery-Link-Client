import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import { getAllCourse } from "../../api/adminApi";

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

  //   const handleBlock = async (id, e) => {
  //     e.preventDefault();
  //     const response = await blockCourse(id);
  //     if (response) {
  //       const newList = CourseList.map((Course) =>
  //         Course.id === id ? { ...Course, isBlocked: true } : Course
  //       );
  //       setCourseList(newList);
  //     }
  //   };

  //   const handleUnblock = async (id, e) => {
  //     e.preventDefault();
  //     const response = await unblockCourse(id);

  //     if (response) {
  //       const newList = CourseList.map((Course) =>
  //         Course.id === id ? { ...Course, isBlocked: false } : Course
  //       );
  //       setCourseList(newList);
  //     }
  //   };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />
      <div className="flex flex-col py-20 px-20 h-screen overflow-y-auto w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-white-800 ">
            <thead className="text-xs text-white uppercase bg-white-200 dark:bg-green-700 white:text-white-400">
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
                    <td className="sm:px-6 py-4 font-medium">{Course.level}</td>
                    <td className="sm:px-6 py-4 font-medium">
                      {Course.category.category}
                    </td>
                    <td className="sm:px-6 py-4 font-medium">
                      <button
                        type="button"
                        // onClick={(e) => {
                        //   if (Course.isBlocked) {
                        //     handleUnblock(Course.id, e);
                        //   } else {
                        //     handleBlock(Course.id, e);
                        //   }
                        // }}
                        className={` mt-2 
                        
                         font-medium rounded text-sm px-5 py-2 mr-2 mb-2 sm:btn-sm `}
                      >
                        approve
                      </button>
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
