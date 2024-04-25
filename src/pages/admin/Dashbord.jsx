import React from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import LineChart from "../../components/adminComponent/LineChart";
import { useQuery, useMutation } from "@tanstack/react-query";
import { dashboard } from "../../api/adminApi";
import DashboardCardSkelton from "../../components/common/utils/DashboardCardSkelton";
import CountUp from 'react-countup';

const Dashbord = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: dashboard,
  });

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />

      <div className="flex flex-col pt-5 h-screen  w-full">
        <div className="grid grid-cols-1 gap-4 px-4 mt-2 sm:grid-cols-4 sm:px-8 ">
          {(isLoading || (isError && data.length == 0)) && (
            <>
              <DashboardCardSkelton />
              <DashboardCardSkelton />
              <DashboardCardSkelton />
              <DashboardCardSkelton />
            </>
          )}
          {data && (
            <>
              <div className="flex items-center bg-white border  overflow-hidden shadow animate-fade animate-ease-in-out rounded-md">
                <div className="p-4 bg-green-400 rounded-md shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Total Students</h3>
                  <p className="text-3xl"><CountUp start={0} end={data?.studentCount} enableScrollSpy={true} /></p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-md overflow-hidden shadow animate-fade animate-ease-in-out">
                <div className="p-4 bg-blue-400 rounded-md shadow-md">
                  <i
                    className="fa-solid fa-person-chalkboard text-5xl"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Total Instructor</h3>
                  <p className="text-3xl"><CountUp start={0} end={data?.instructorCount} enableScrollSpy={true} /></p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-md overflow-hidden shadow animate-fade animate-ease-in-out">
                <div className="p-4 bg-indigo-400 rounded-md shadow-md">
                  <i
                    className="fa-solid fa-book text-5xl"
                    style={{ color: "#ffffff" }}
                  ></i>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Total Courses</h3>
                  <p className="text-3xl"><CountUp start={0} end={data?.courseCount} enableScrollSpy={true} /></p>
                </div>
              </div>
              <div className="flex items-center bg-white border rounded-md overflow-hidden shadow animate-fade animate-ease-in-out">
                <div className="p-4 bg-red-400 rounded-md shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    ></path>
                  </svg>
                </div>
                <div className="px-4 text-gray-700">
                  <h3 className="text-sm tracking-wider">Total Revenue</h3>
                  <p className="text-3xl">₹<CountUp start={0} end={data?.totalRevenue} enableScrollSpy={true} /></p>
                </div>
              </div>
            </>
          )}
        </div>

        {data && (
          <div className="flex flex-col shadow-lg px-3 border rounded-md m-10 animate-fade animate-ease-in-out">
            <h1 className="py-3 font-bold text-black text-lg">
              Course enrollment data
            </h1>
            <LineChart data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
