import React, { useState } from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getAllStudents, blockStudent, unblockStudent } from "../../api/adminApi";

const StudentList = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { data: userList = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: getAllStudents,
  });

  const blockStudentMutation = useMutation({
    mutationFn: blockStudent,
  });
  
  const unblockStudentMutation = useMutation({
    mutationFn: unblockStudent,
  });

  const handleBlock = async (id, e) => {
    e.preventDefault();
    await blockStudentMutation.mutateAsync(id);
    refetch();
  };

  const handleUnblock = async (id, e) => {
    e.preventDefault();
    await unblockStudentMutation.mutateAsync(id);
    refetch();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = userList.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />
      <div className="flex flex-col py-14 px-20 h-screen overflow-y-auto w-full animate-fade animate-ease-in-out">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
          <table className="w-full text-sm text-left rtl:text-right text-white-800 ">
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
              {isLoading && <h1 className="mx-5 my-5">Loading...</h1>}
              {isError && currentUsers.length === 0 && (
                <h1 className="mx-5 my-5">An error occurred</h1>
              )}
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:border-gray-700"
                >
                  <td className="sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {user.firstname}
                  </td>
                  <td className="sm:px-6 py-4">{user.lastname}</td>
                  <td className="sm:px-6 py-4">{user.email}</td>
                  <td className="sm:px-6 py-4">{user.mobile}</td>
                  <td className="sm:px-6 py-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (user.isBlocked) {
                          handleUnblock(user.id, e);
                        } else {
                          handleBlock(user.id, e);
                        }
                      }}
                      className={`text-white  ${
                        user.isBlocked
                          ? "bg-red-700 hover:bg-red-800"
                          : "bg-green-700 hover:bg-green-800"
                      } font-medium rounded text-sm px-5 py-2 mr-2 mb-2`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
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
                { length: Math.ceil(userList.length / itemsPerPage) },
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
              disabled={currentPage === Math.ceil(userList.length / itemsPerPage)}
            >
              Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
