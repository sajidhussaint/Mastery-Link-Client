import React from "react";
import { Chip, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const SingleCourse = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <a href="#" />
      <div className="relative">
        <img
          className="w-full xl:h-36 lg:h-36 md:h-30"
          src={course.image}
          alt={course.name}
        />

        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>

        <div className="absolute bottom-0 left-0 bg-green-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-green-600 transition duration-500 ease-in-out">
          ₹{course.price}
        </div>
      </div>
      <div className="px-6 py-4">
        <span
          onClick={() => {
            navigate("/view-course", {
              state: { courseId: course.id },
            });
          }}
          className="font-semibold text-lg inline-block hover:text-green-600 transition duration-500 ease-in-out cursor-pointer"
        >
          {course.name}
        </span>
        <p className="text-gray-500 text-sm  h-10">
          {course.description.length > 40
            ? course.description.slice(0, 40) + "..."
            : course.description}
        </p>
      </div>
      <div className="flex items-center my-2 mx-5 pb-5 cursor-default gap-2">
        <Chip value={course.category.category} size="sm" variant="circular" />
        <Chip
          color="green"
          value={course.level.level}
          size="sm"
          variant="circular"
        />
      </div>
    </div>
  );
};

export default SingleCourse;
