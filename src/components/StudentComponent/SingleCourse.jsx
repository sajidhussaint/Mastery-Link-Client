import React from "react";

const SingleCourse = ({course}) => {
  return (
    
    
    <div className="rounded overflow-hidden shadow-lg">
      
      <a href="#" />
      <div className="relative">
        <a href="#">
          <img
            className="w-full"
            src={course.image}
            alt="Sunset in the mountains"
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </a>
        <a href="#!">
          <div className="absolute bottom-0 left-0 bg-green-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-green-600 transition duration-500 ease-in-out">
            ₹{course.price}
          </div>
        </a>
        <a href="!#">
          {/* <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                  <span className="font-bold">15</span>
                  <small>April</small>
                </div> */}
        </a>
      </div>
      <div className="px-6 py-4">
        <a
          href="#"
          className="font-semibold text-lg inline-block hover:text-green-600 transition duration-500 ease-in-out"
        >
          JavaScript Tutorial
        </a>
        <p className="text-gray-500 text-sm">included all topics full course</p>
      </div>
      <div className="flex items-center my-2 mx-5 pb-5">
        <h4 className="font-medium px-3 py-1 text-sm rounded-full text-green-900 bg-[#cecfcf]">
          Category
        </h4>
        <span className="mx-1"></span>
        <h4 className="font-medium px-3 py-1 text-sm rounded-full  text-green-900 bg-[#cecfcf]">
          Level
        </h4>
      </div>
      {/* <div className="px-6 py-4 flex flex-row items-center">
              <span
                href="#"
                className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row justify-between items-center"
              >
                <svg
                  height="13px"
                  width="13px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                    </g>
                  </g>
                </svg>
                <span className="ml-1">6 Hrs</span>
              </span>
            </div> */}
    </div>
    
  );
};

export default SingleCourse;
