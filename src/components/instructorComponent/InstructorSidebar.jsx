import React, { useState, useEffect } from "react";
import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  Clock4Icon,
  LayoutDashboard,
  HelpCircleIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import RightArrowIcon from "../../icons/rightArrow.svg";

const variants = {
  expanded: { width: "20%" },
  nonexpanded: { width: "100px" }, // Set a fixed width for non-expanded state
};

const InstructorSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1140) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    // Set initial state based on window width
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
        (isExpanded ? " px-10" : " px-6")
      }
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#14cf3d] flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" alt="Arrow" />
      </div>

      <div className="flex flex-col space-y-8 mt-12">
        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded bg-[#14cf3d] text-white">
            <LayoutDashboard />
            <span className={!isExpanded ? "hidden" : "block"}>Dashboard</span>
          </div>
        </div>

        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded">
            <Clock4Icon />
            <span className={!isExpanded ? "hidden" : "block"}>Activity</span>
          </div>
        </div>

        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded">
            <BarChart3Icon />
            <span className={!isExpanded ? "hidden" : "block"}>Analytics</span>
          </div>
        </div>

        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded">
            <ArrowLeftRightIcon />
            <span className={!isExpanded ? "hidden" : "block"}>
              Transactions
            </span>
          </div>
        </div>

        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded">
            <HelpCircleIcon />
            <span className={!isExpanded ? "hidden" : "block"}>
              Help Center
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InstructorSidebar;
