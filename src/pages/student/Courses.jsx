import React, { useState, useEffect } from "react";
import Navbar from "../../components/StudentComponent/Navbar";
import SingleCourse from "../../components/StudentComponent/SingleCourse";
import { getCourses } from "../../api/studentApi";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  // const [categories, setCategories] = useState();

  const getCourse = async () => {
    const response = await getCourses();
    console.log(response);
    setCourses(response);
    // setCategories(response?.categories)
  };
  useEffect(() => {
    getCourse();
  }, []);
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto  p-5 sm:p-10 md:p-16 ">
        <div className="mt-12 w-full flex flex-col md:flex-row justify-between items-center gap-5">
          <h1 className="p-6 font-bold text-2xl">All Courses</h1>
          <div className="flex md:flex-row gap-4 items-center">
            <h3 className="font-semibold">Filter by category</h3>
            <select
              name="selectCategory"
              id="selectCategory"
              className=" py-2 text-white shadow-lg shadow-[#bdbdbd] border rounded-md bg-green-800 focus:border-none px-4 font-semibold"
              // onChange={(e) => handleSelect(e)}
            >
              <option value="">All categories</option>
              {/* {categories?.map((category) => (
                  <option value={category.id}>{category.category}</option>
                ))} */}
            </select>
          </div>
          <div className="search flex items-center md:pb-0 pb-2 md:px-5">
            <input
              type="search"
              // ref={searchInputRef}
              className="px-2 py-2 focus:border-0 placeholder:italic shadow-lg rounded-s-md bg-white border"
              // onChange={handleChange}
              placeholder="Enter something..."
            />
            <button
              className="bg-green-800 px-4 py-2 text-center text-white shadow-lg rounded-e-md"
              // onClick={handleSearch}
            >
              search
            </button>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-10">
          {/* cards */}

          {courses &&
            courses.map((course, index) => (
              <SingleCourse key={index} course={course} />
            ))}

          {/* cards */}
        </div>
      </div>
    </>
  );
};

export default Courses;
