import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RightArrowIcon from "../../icons/rightArrow.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminLogout } from "../../api/authenticationApi";
import { useDispatch } from "react-redux";
import {
  LayoutPanelTop,
  LayoutDashboard,
  BookOpenText,
  GraduationCap,
  UsersRound,
  LogOut,
} from "lucide-react";
import { adminActions } from "../../redux/adminSlice";
import { toast } from "react-toastify";
// const variants = {
//   expanded: { width: "20%" },
//   nonexpanded: { width: "100px" },
// };

const AdminSidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout successfully");
    adminLogout()
    dispatch(adminActions.adminLogout());
    navigate("/admin/login");
  };

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
      // animate={isExpanded ? "expanded" : "nonexpanded"}
      // variants={variants}
      className={`py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative ${
        isExpanded ? "px-4" : "px-2"
      }`}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#14cf3d] flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" alt="Arrow" />
      </div>

      <div className="logo-div flex space-x-4 items-center">
        <img
          src="/logo.svg"
          alt="Logo"
          className={`ml-5 w-28 ${!isExpanded ? "hidden" : "block"}`}
        />
        {/* <span className={!isExpanded ? "hidden" : "block"}>Money Tracker</span> */}
      </div>

      <div className="flex flex-col space-y-5 mt-12 text-black h-full  ">
        <div className=" nav-links w-full mr-7">
          <Link to={"/admin/dashboard"}>
            <div
              className={
                location.pathname === "/admin/dashboard"
                  ? "flex space-x-3 w-full p-2 rounded bg-[#14cf3d] text-white "
                  : "flex space-x-3 w-full p-2 rounded "
              }
            >
              <LayoutDashboard
                className={!isExpanded ? "ml-5 animate-spin" : ""}
              />
              <span className={!isExpanded ? "hidden" : "block"}>
                Dashboard
              </span>
            </div>
          </Link>
        </div>

        <div className="nav-links w-full">
          <Link to={"/admin/student-list"}>
            <div
              className={
                location.pathname === "/admin/student-list"
                  ? "flex space-x-3 w-full p-2 rounded bg-[#14cf3d] text-white "
                  : "flex space-x-3 w-full p-2 rounded "
              }
            >
              <UsersRound className={!isExpanded ? "ml-5" : ""} />
              <span className={!isExpanded ? "hidden" : "block"}>
                Student List
              </span>
            </div>
          </Link>
        </div>

        <div className="nav-links w-full ">
          <Link to={"/admin/instructor-list"}>
            <div
              className={
                location.pathname === "/admin/instructor-list"
                  ? "flex space-x-3 w-full p-2 rounded bg-[#14cf3d] text-white "
                  : "flex space-x-3 w-full p-2 rounded "
              }
            >
              <GraduationCap className={!isExpanded ? "ml-5" : ""} />
              <span className={!isExpanded ? "hidden" : "block"}>
                Instructor List
              </span>
            </div>
          </Link>
        </div>

        <div className="nav-links w-full">
          <Link to={"/admin/course-list"}>
            <div
              className={
                location.pathname === "/admin/course-list"
                  ? "flex space-x-3 w-full p-2 rounded bg-[#14cf3d] text-white "
                  : "flex space-x-3 w-full p-2 rounded "
              }
            >
              <BookOpenText className={!isExpanded ? "ml-5" : ""} />
              <span className={!isExpanded ? "hidden" : "block"}>Courses</span>
            </div>
          </Link>
        </div>

        <div className="nav-links w-full">
          <Link to={"/admin/categories"}>
            <div
              className={
                location.pathname === "/admin/categories"
                  ? "flex space-x-3 w-full p-2 rounded bg-[#14cf3d] text-white "
                  : "flex space-x-3 w-full p-2 rounded "
              }
            >
              <LayoutPanelTop className={!isExpanded ? "ml-5" : ""} />
              <span className={!isExpanded ? "hidden" : "block"}>
                Categories
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex mt-10 justify-center">
        <button
          onClick={handleLogout}
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-600 rounded-xl group"
        >
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-800 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-700 rounded-2xl group-hover:mb-12 group-hover:translate-x-0" />
          <span className="flex relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            <LogOut className="mr-2 " />
            <span className={!isExpanded ? "hidden" : "block"}>Log-out</span>
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
