import React from "react";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CountUp from 'react-countup';
// import InstructorSidebar from "../../components/instructorComponent/InstructorSidebar";//TODO:remove page;

const InstructorHome = () => {
  const instructor = useSelector((state) => state.instructor.instructor);
  return (
    <>
      <InstructorNavbar />
      <section className="bg-gradient-to-bl from-green-100 via-transparent dark:bg-gray-900 animate-fade animate-ease-in-out">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-10">
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/images/instructor-home.png" alt="hero image" />
          </div>
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="text-black max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              "Empowering Students to Reach New Heights"
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Educate, Inspire, and Transform with MasteryLink Teachnology
            </p>

            <Link to={"/instructor/my-courses"}>
              <div className="relative inline-flex  group p-5">
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r  from-[#44BCFF] via-[#4aff44] to-[#d4ff5e] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <button
                  className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="url(#gradient)"
                    className="w-9 h-9"
                  >
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" style={{ stopColor: "#FFD700" }} />
                        <stop offset="100%" style={{ stopColor: "#FFA500" }} />
                      </linearGradient>
                    </defs>
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                  Visit Your Courses
                </button>
              </div>
            </Link>
            <Link to={"/instructor/wallet-history"}>
              <div className="relative inline-flex  group p-5">
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#4aff44] to-[#d4ff5e] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <button
                  
                  className="tracking-widest relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="url(#gradient3)"
                    className="w-9 h-9"
                  >
                    <defs>
                      <linearGradient
                        id="gradient3"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" style={{ stopColor: "#008000" }} />
                        <stop offset="100%" style={{ stopColor: "#00FF00" }} />
                      </linearGradient>
                    </defs>
                    <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                  </svg>
                  ₹ <CountUp start={0} end={instructor?.wallet?.toFixed(0)} enableScrollSpy={true} className="mr-2" />  Earned
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstructorHome;
