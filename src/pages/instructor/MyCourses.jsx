import React, { useState, useEffect } from "react";
import SingleCourse from "../../components/instructorComponent/SingleCourse";
import { getMyCourses } from "../../api/instructorApi";
import CardSkeleton from "../../components/common/utils/CardSkeleton";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const MyCourses = () => {
  const instructor = useSelector((store) => store.instructor.instructor);
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["myCourses"],
    queryFn: () => getMyCourses(instructor?._id),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <InstructorNavbar />

      <div className="bg-gradient-to-bl from-green-100 via-transparent p-2">
        <h1 className="text-2xl font-bold px-5 md:px-20 ">My courses</h1>
        <div className="mt-4 md:flex-none flex justify-center">
          {currentCourses.length == 0 && !isLoading &&(
            <div className=" h-5 flex flex-col items-center justify-center mt-36 animate-fade ">
              <img className="w-30 h-40" src="/images/empty_data.png" alt="" />
              <h1 className="font-semibold text-lg text-center">
                No Courses found.. :(
              </h1>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-8 gap-y-10">
            {isLoading
              ? Array.from({ length: itemsPerPage }, (_, index) => (
                  <CardSkeleton key={index} />
                ))
              : currentCourses.map((course) => (
                  <SingleCourse key={course.id} course={course} />
                ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={currentPage === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <IconButton
                    key={index + 1}
                    variant={currentPage === index + 1 ? "filled" : "text"}
                    color="gray"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </IconButton>
                ))}
              </div>
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={currentPage === totalPages}
              >
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;
