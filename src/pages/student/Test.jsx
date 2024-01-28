// import React from "react";

// const Test = () => {
//   return (
//     <div>

//     </div>
//   );
// };

// export default Test;

import React, { useState } from "react";
import { Steps, Avatar, Flex, Segmented, Menu } from "antd";

const Modules = ({}) => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("1", "sub1"),
    getItem("2", "sub1"),
    getItem("3", "sub1"),
  ];

  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {/* Switched order of the components */}
        <div className="col-span-1 h-auto md:h-[70vh] bg-slate-50 overflow-hidden pb-5 shadow-slate-400 shadow-md">
          <div className="h-14 bg-slate-200 flex items-center">
            <h1 className="px-4 font-bold">Modules</h1>
          </div>
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-slate-900 dark:scrollbar-track-gray-300 h-full">
            {/* Module list content */}
            <div className="flex flex-col">
              <Menu onClick={onClick} mode="inline" items={items} />

              <div className="w-full flex flex-row items-center">
                <div className="w-2/12 flex justify-center  items-center flex-row my-6">
                  <i className="fa-solid fa-circle-check"></i>
                </div>

                <div className="w-8/12 cursor-pointer">
                  <h3 className="font-semibold">intro</h3>
                </div>
                <div className="w-2/12">
                  <h3 className="font-semibold">00:01:00</h3>
                </div>
              </div>
              <hr className="h-[2px] bg-slate-300" />
            </div>
            <div className="flex flex-col">
              <div className="w-full flex flex-row items-center">
                <div className="w-2/12 flex justify-center  items-center flex-row my-6">
                  <i className="fa-solid fa-circle-check"></i>
                </div>

                <div className="w-8/12 cursor-pointer">
                  <h3 className="font-semibold">basics</h3>
                </div>
                <div className="w-2/12">
                  <h3 className="font-semibold">00:22:00</h3>
                </div>
              </div>
              <hr className="h-[2px] bg-slate-300" />
            </div>
          </div>
        </div>

        <div className="col-span-2 h-auto md:h-[70vh] bg-black">
          {" "}
          video player Area
        </div>
      </div>
      <div>
        <Steps
          type="navigation"
          size="small"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
          items={[
            {
              title: "Step 1",
              subTitle: "00:00:05",
              status: "finish",
            },
            {
              title: "Step 2",
              subTitle: "00:01:02",
              status: "process",
            },
            {
              title: "Step 3",
              subTitle: "waiting for longlong time",
              status: "wait",
            },
            {
              title: "Step 3",
              subTitle: "waiting for longlong time",
              status: "wait",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Modules;
