import React, { useState } from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getAllCourse, approveCourse, rejectCourse } from "../../api/adminApi";

const CourseList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const {
    data: courseList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourse,
  });

  const approveCourseMutation = useMutation({
    mutationFn: approveCourse,
  });

  const rejectCourseMutation = useMutation({
    mutationFn: rejectCourse,
  });

  const handleApprove = async (courseId, e) => {
    e.preventDefault();
    await approveCourseMutation.mutateAsync(courseId);
    refetch();
  };

  const handleReject = async (courseId, e) => {
    e.preventDefault();
    await rejectCourseMutation.mutateAsync(courseId);
    refetch();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courseList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />

      <div className="flex flex-col py-14 px-20  overflow-y-auto w-full animate-fade animate-ease-in-out">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
          {!isLoading && currentCourses.length == 0 && (
            <div className=" h-5 flex flex-col items-center justify-center mt-36 animate-fade ">
              <img className="w-30 h-40" src="/images/empty_data.png" alt="" />
              <h1 className="font-semibold text-lg text-center">
                No Courses found..:(
              </h1>
            </div>
          )}
          <table className="w-full text-sm text-left rtl:text-right text-white-800 ">
            {!currentCourses.length == 0 && (
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
            )}
            <tbody className="text-black">
              {isLoading && <h1 className="mx-5 my-5 text-center">Loading...</h1>}
              {isError && currentCourses.length == 0 && (
                <h1 className="mx-5 my-5">An error occurred</h1>
              )}

              {currentCourses.map((course) => (
                <tr
                  key={course.id}
                  className="bg-white border-b dark:border-gray-700"
                >
                  <td className="sm:px-6 py-4 font-medium text-black whitespace-nowrap ">
                    {course.name}
                  </td>
                  <td className="sm:px-6 py-4 font-medium ">
                    {course.description}
                  </td>
                  <td className="sm:px-6 py-4 font-medium">{course.price}</td>
                  <td className="sm:px-6 py-4 font-medium">
                    {course.level.level}
                  </td>
                  <td className="sm:px-6 py-4 font-medium">
                    {course.category.category}
                  </td>
                  <td className="px-6 py-4">
                    {course.approval === "rejected" && (
                      <p className="text-xs text-red-500 py-1">
                        Course already rejected
                      </p>
                    )}
                    {course.approval === "pending" ||
                    course.approval === "rejected" ? (
                      <div className="flex">
                        <button
                          onClick={(e) => handleApprove(course.id, e)}
                          className={`text-white mt-1 bg-green-700 hover:bg-green-800
                         font-medium rounded-lg text-xs px-3 py-2 mr-2 mb-1`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => handleReject(course.id, e)}
                          className={`text-white mt-1 bg-red-700 hover:bg-red-300-800
                         font-medium rounded-lg text-xs px-3 py-2 mr-2 mb-1 ${
                           course.approval === "rejected"
                             ? "cursor-not-allowed"
                             : ""
                         }`}
                          disabled={course.approval === "rejected"}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p
                        className={` font-bold text-base ${
                          course.approval === "rejected"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {course.approval}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {!currentCourses.length == 0 && (
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
                  { length: Math.ceil(courseList.length / itemsPerPage) },
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
                  currentPage === Math.ceil(courseList.length / itemsPerPage)
                }
              >
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
