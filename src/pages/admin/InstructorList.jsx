import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import {
  getAllInstructor,
  blockInstructor,
  unblockInstructor,
} from "../../api/adminApi";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const InstructorList = () => {
  const [instructorList, setInstructorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page

  const getInstructors = async () => {
    try {
      const instructors = await getAllInstructor();
      setInstructorList(instructors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (id, e) => {
    e.preventDefault();
    const response = await blockInstructor(id);
    if (response) {
      const newList = instructorList.map((instructor) =>
        instructor.id === id ? { ...instructor, isBlocked: true } : instructor
      );
      setInstructorList(newList);
    }
  };

  const handleUnblock = async (id, e) => {
    e.preventDefault();
    const response = await unblockInstructor(id);

    if (response) {
      const newList = instructorList.map((instructor) =>
        instructor.id === id ? { ...instructor, isBlocked: false } : instructor
      );
      setInstructorList(newList);
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  // Logic to get current instructors based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstructors = instructorList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />
      <div className="flex flex-col py-14 px-20 h-screen overflow-y-auto w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-white-800  ">
            <thead className="text-xs text-white uppercase bg-white-200 bg-green-700 white:text-white-400">
              <tr>
                <th className="sm:px-6 py-3">FIRST NAME</th>
                <th className="sm:px-6 py-3">LAST NAME</th>
                <th className="sm:px-6 py-3">EMAIL</th>
                <th className="sm:px-6 py-3">MOBILE</th>
                <th className="sm:px-6 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentInstructors.map((instructor) => (
                <tr
                  key={instructor.id}
                  className="bg-white border-b dark:border-gray-700"
                >
                  <td className="sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {instructor.firstname}
                  </td>
                  <td className="sm:px-6 py-4">{instructor.lastname}</td>
                  <td className="sm:px-6 py-4">{instructor.email}</td>
                  <td className="sm:px-6 py-4">{instructor.mobile}</td>
                  <td className="sm:px-6 py-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (instructor.isBlocked) {
                          handleUnblock(instructor.id, e);
                        } else {
                          handleBlock(instructor.id, e);
                        }
                      }}
                      className={`text-white mt-2 ${
                        instructor.isBlocked
                          ? "bg-red-700 hover:bg-red-800"
                          : "bg-green-700 hover:bg-green-800"
                      } font-medium rounded text-sm px-5 py-2 mr-2 mb-2 sm:btn-sm `}
                    >
                      {instructor.isBlocked ? "Blocked" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-4">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from(
                { length: Math.ceil(instructorList.length / itemsPerPage) },
                (_, index) => (
                  <IconButton
                    key={index}
                    onClick={() => paginate(index + 1)}
                    {...(currentPage === index + 1
                      ? { color: "green", size: "md" }
                      : { color: "gray", size: "sm" })}
                  >
                    {index + 1}
                  </IconButton>
                )
              )}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(instructorList.length / itemsPerPage)
              }
            >
              Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorList;
