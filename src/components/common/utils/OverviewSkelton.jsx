import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col items-center p-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="w-80 h-60 ">
        <div className="relative sm:mb-0 mb-3 h-full">
          <div className="h-full bg-gray-300"></div>
        </div>
      </div>

      <div className="mx-10 flex flex-col justify-center p-4  leading-normal w-full">
        <div className="flex justify-between">
          <div className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white bg-gray-300 w-2/3 h-8 rounded"></div>
          <div className="flex justify-end">
            {/* <div className="text-white bg-gray-400 w-20 h-8 rounded-full"></div> */}
          </div>
        </div>
        <div className="flex justify-start gap-5">
          <div className="my-3 text-lg font-semibold bg-gray-300 w-1/2 h-6 rounded"></div>
        </div>
        <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white bg-gray-300 w-1/3 h-8 rounded"></div>
        <div className="my-2 text-lg font-semibold bg-gray-300 w-1/3 h-6 rounded"></div>
        <div className="my-2 text-lg font-semibold bg-gray-300 w-1/3 h-6 rounded"></div>
        <div className="container bg-gray-300">
          <hr />
          <div className="flex justify-between mb-2 bg-gray-300">
            <div className="text-gray-600 text-sm font-medium bg-gray-300 w-4/5 h-6 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
