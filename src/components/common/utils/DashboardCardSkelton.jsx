import React from "react";

const DashboardCardSkelton = () => {
  return (
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow animate-pulse">
      <div className="p-4">
        <div className="rounded-full bg-gray-300 h-12 w-12" />
      </div>
      <div className="px-4 text-gray-700 ">
        <div className="h-4 w-20 bg-gray-300 rounded " />
        <div className="h-4 w-10 bg-gray-300 rounded mt-2" />
      </div>
    </div>
  );
};

export default DashboardCardSkelton;
