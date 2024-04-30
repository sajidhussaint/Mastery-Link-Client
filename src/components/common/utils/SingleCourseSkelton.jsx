import React from "react";

const SingleCourseSkelton = () => {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="container mx-auto p-8 animate-fade animate-ease-in-out">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video Player Skeleton */}
          <div className="lg:w-full">
            <div className="bg-gray-200 h-80"></div>
          </div>

          {/* Course Details Skeleton */}
          <div className="lg:w-full">
            <h2 className="text-4xl font-bold mb-4 bg-gray-200 h-10"></h2>
            <p className="text-lg text-gray-600 mb-6 bg-gray-200 h-6"></p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-8">
              {/* Level Skeleton */}
              <div className="bg-gray-200 h-6"></div>

              {/* Language Skeleton */}
              <div className="bg-gray-200 h-6"></div>

              {/* Price Skeleton */}
              <div className="bg-gray-200 h-6"></div>

              {/* Instructor Skeleton */}
              <div className="bg-gray-200 h-6"></div>
            </div>
          </div>
        </div>

        {/* Module Listing Skeleton */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 bg-gray-200 h-10"></h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Module Item Skeleton */}
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300">
              <div className="flex items-center mb-2">
                <span className="mr-2 bg-gray-200 h-6 w-6 rounded-full"></span>
                <h3 className="text-md font-semibold text-gray-800 bg-gray-200 h-6 w-32"></h3>
              </div>
              <p className="text-xs text-gray-600 bg-gray-200 h-4"></p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300">
              <div className="flex items-center mb-2">
                <span className="mr-2 bg-gray-200 h-6 w-6 rounded-full"></span>
                <h3 className="text-md font-semibold text-gray-800 bg-gray-200 h-6 w-32"></h3>
              </div>
              <p className="text-xs text-gray-600 bg-gray-200 h-4"></p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300">
              <div className="flex items-center mb-2">
                <span className="mr-2 bg-gray-200 h-6 w-6 rounded-full"></span>
                <h3 className="text-md font-semibold text-gray-800 bg-gray-200 h-6 w-32"></h3>
              </div>
              <p className="text-xs text-gray-600 bg-gray-200 h-4"></p>
            </div>
          </div>
        </div>

        {/* Instructor Details Skeleton */}
        <div className="mt-5 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 bg-gray-200 h-10"></h2>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 h-16 w-16 rounded-full"></div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 bg-gray-200 h-6 w-40"></h3>
              <p className="text-gray-700 mt-1 bg-gray-200 h-4 w-32"></p>
            </div>
          </div>
          <p className="text-gray-700 mt-4 bg-gray-200 h-4"></p>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseSkelton;
