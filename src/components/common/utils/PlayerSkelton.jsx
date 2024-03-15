import React from "react";

const PlayerSkelton = () => {
  return (
    <div className="flex h-full w-full  pl-5 pr-20 gap-16 animate-pulse  mb-20">
      <div className="bg-gray-200 h-96 w-3/6  p-5 ">
        <div className="my-5 mx-2 text-lg font-semibold bg-gray-300 w-2/6 h-6 rounded "></div>
        <div className="mx-5 my-8 text-lg font-semibold bg-gray-300  h-6 rounded"></div>
        <div className="mx-5 my-8 text-lg font-semibold bg-gray-300  h-6 rounded"></div>
        <div className="mx-5 my-8 text-lg font-semibold bg-gray-300  h-6 rounded"></div>
      </div>
      <div className="bg-gray-200 h-96 w-full flex justify-center items-center">
        <img src="./images/play.png" alt="play" className="h-16 " />
      </div>
    </div>
  );
};

export default PlayerSkelton;
