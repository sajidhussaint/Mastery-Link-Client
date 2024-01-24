import React, { useState } from "react";
import ReactPlayer from "react-player";
import { BiLock } from "react-icons/bi";

const CourseDetailPage = () => {
  const [showMore, setShowMore] = useState(false);

  const modules = [
    { id: 1, title: "Introduction", duration: "2 hours" },
    { id: 2, title: "Advanced Topics", duration: "1.5 hours" },
    { id: 3, title: "Final Project", duration: "2.5 hours" },
    { id: 3, title: "Final Project", duration: "2.5 hours" },
    { id: 3, title: "Final Project", duration: "2.5 hours" },
    { id: 3, title: "Final Project", duration: "2.5 hours" },
    { id: 3, title: "Final Project", duration: "2.5 hours" },
    { id: 3, title: "Final Project", duration: "2.5 hours" },
    // Add more modules as needed
  ];

  const visibleModules = showMore ? modules : modules.slice(0, 3);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video Player */}
          <div className="lg:w-full">
            <ReactPlayer
              width="100%"
              height="100%"
              loop={true}
              playing={true}
              controls={true}
            />
          </div>

          {/* Course Details */}
          <div className="lg:w-full">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Course Title
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Course Subtitle or Description goes here. Provide a brief overview
              of the course content.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {/* Level */}
              <div>
                <p className="text-gray-700 font-semibold">
                  <i className="fas fa-signal mr-2"></i> Intermediate
                </p>
              </div>

              {/* Price */}
              <div>
                <p className="text-gray-700 font-semibold">
                  <i className="fas fa-rupee-sign mr-2"></i> $99.99
                </p>
              </div>

              {/* Instructor */}
              <div>
                <p className="text-gray-700 font-semibold">
                  <i className="fas fa-chalkboard-teacher mr-2"></i> John Doe
                </p>
              </div>
            </div>

            
          </div>
        </div>

        {/* Module Listing */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Lessons in this course
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {visibleModules.map((module) => (
              <div
                key={module.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300"
              >
                <div className="flex items-center mb-2">
                  <span className="mr-2">
                    <BiLock size={20} color="#3498db" />
                  </span>
                  <h3 className="text-md font-semibold text-gray-800">
                    {module.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600">{`Duration: ${module.duration}`}</p>
              </div>
            ))}
            <div className="flex items-center">
              <a
                href="#"
                onClick={() => setShowMore(!showMore)}
                className="text-blue-500 hover:underline"
              >
                {showMore ? "Show Less" : "Show More"}
              </a>
            </div>
          </div>
        </div>

        {/* About the Course */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            About the Course
          </h2>
          <p className="text-gray-700">
            Course description goes here. Provide detailed information about the
            course content, goals, and what students will learn.
          </p>
        </div>

        {/* About the Instructor */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Meet your Instructor
          </h2>
          <div className="flex items-center">
            <img
              alt="Instructor"
              className="w-16 h-16 rounded-full mr-4"
              src="instructor-image.jpg" // Replace with the actual image URL
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-700 mt-1">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                  Instructor Skill
                </span>
              </p>
            </div>
          </div>
          <p className="text-gray-700 mt-4">
            Bio or additional information about the instructor goes here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
