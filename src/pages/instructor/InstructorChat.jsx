import React from "react";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";

const InstructorChat = () => {
  return (
    <>
      <InstructorNavbar />
      <div className=" mx-auto shadow-lg rounded-lg  ">
        <div className="flex flex-row justify-between bg-white  ">
          <div className="flex flex-col w-2/6 border-r-2  max-h-full overflow-hidden">
            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-md"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Python</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>

            {/* end user list */}
          </div>
          {/* end chat list */}
          {/* message */}
          <div className="w-full px-5 flex flex-col justify-between ">
            <div className="flex flex-col mt-5 overflow-y-scroll ">
              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-green-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Welcome to group everyone !
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>

              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                  happy holiday guys!
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-initial justify-between items-center gap-3 sticky">
              <input
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
              />
              <i
                className="fa-solid fa-paper-plane text-2xl  cursor-pointer rounded-md text-green-700 "
                // onClick={handleSendMessage}
              ></i>
            </div>
          </div>
          {/* end message */}
          {/* <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
                alt=""
              />
              <div className="font-semibold py-4">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, perspiciatis!
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default InstructorChat;
