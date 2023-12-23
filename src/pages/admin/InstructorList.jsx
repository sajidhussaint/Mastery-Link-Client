import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import {
  getAllInstructor,
  blockInstructor,
  unblockInstructor,
} from "../../api/adminApi";

const InstructorList = () => {
  const [InstructorList, setInstructorList] = useState([]);

  const getInstructors = async () => {
    try {
      const Instructors = await getAllInstructor();
      setInstructorList(Instructors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (id, e) => {
    e.preventDefault();
    const response = await blockInstructor(id);
    if (response) {
      const newList = InstructorList.map((Instructor) =>
        Instructor.id === id ? { ...Instructor, isBlocked: true } : Instructor
      );
      setInstructorList(newList);
    }
  };

  const handleUnblock = async (id, e) => {
    e.preventDefault();
    const response = await unblockInstructor(id);

    if (response) {
      const newList = InstructorList.map((Instructor) =>
        Instructor.id === id ? { ...Instructor, isBlocked: false } : Instructor
      );
      setInstructorList(newList);
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />
      <div className="flex flex-col py-20 px-20 h-screen overflow-y-auto w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-white-800 ">
            <thead className="text-xs text-white uppercase bg-white-200 dark:bg-green-700 white:text-white-400">
              <tr>
                <th className="sm:px-6 py-3">FIRST NAME</th>
                <th className="sm:px-6 py-3">LAST NAME</th>
                <th className="sm:px-6 py-3">EMAIL</th>
                <th className="sm:px-6 py-3">MOBILE</th>
                <th className="sm:px-6 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {InstructorList &&
                InstructorList.map((Instructor) => (
                  <tr
                    key={Instructor.id}
                    className="bg-white border-b dark:border-gray-700"
                  >
                    <td className="sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {Instructor.firstname}
                    </td>
                    <td className="sm:px-6 py-4">{Instructor.lastname}</td>
                    <td className="sm:px-6 py-4">{Instructor.email}</td>
                    <td className="sm:px-6 py-4">{Instructor.mobile}</td>
                    <td className="sm:px-6 py-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          if (Instructor.isBlocked) {
                            handleUnblock(Instructor.id, e);
                          } else {
                            handleBlock(Instructor.id, e);
                          }
                        }}
                        className={`text-white mt-2 ${
                          Instructor.isBlocked
                            ? "bg-red-700 hover:bg-red-800"
                            : "bg-green-700 hover:bg-green-800"
                        } font-medium rounded text-sm px-5 py-2 mr-2 mb-2 sm:btn-sm `}
                      >
                        {Instructor.isBlocked ? "Blocked" : "Active"}
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

export default InstructorList;
