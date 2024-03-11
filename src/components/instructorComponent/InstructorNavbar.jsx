import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
// import { partnerLogout } from "../../../reduxStore/slices/partnerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { initFlowbite } from "flowbite";
import { instructorActions } from "../../redux/InstructorSlice";

const InstructorNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instructor = useSelector((state) => state.instructor.instructor);

  useEffect(() => {
    initFlowbite();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("instructor-token");
    dispatch(instructorActions.instructorLogout());
    dispatch(instructorActions.setEmail(null));
    navigate("/instructor/login");
    toast.success("Logout successfully");
  };
  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/instructor/home" className="flex  items-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-40 md:w-50 h-10 md:mr-2 overflow-visible object-contain md:object-cover"
          />
        </Link>
        <div className="flex gap-4 items-center md:order-2">
          <div>
            <Link
              to="/instructor/chat"
              className={
                location.pathname === "/instructor/my-courses"
                  ? "animate-none block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark-text-blue-500 "
                  : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700 animate-bounce"
              }
            >
              <FontAwesomeIcon
                icon={faCommentAlt}
                className="w-8 h-8 mt-1"
                size="lg"
                style={
                  location.pathname === "/instructor/chat"
                    ? { color: "#0099ff" }
                    : { color: "#00060f" }
                }
              />
            </Link>
          </div>
          <div className="relative" onClick={toggleDropdown}>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full object-contain"
                src="/images/profile.jpg"
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="absolute z-50 right-0 mt-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {instructor?.firstname} {instructor?.lastname}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {instructor?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {/* <li>
                    <Link
                      to="/instructor/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                    >
                      Profile
                    </Link>
                  </li> */}
                  <li>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover-bg-gray-100 focus:outline-none focus:ring-2 focus-ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus-ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark-bg-gray-900 dark-border-gray-700">
            <li>
              <Link
                to="/instructor/home"
                className={
                  location.pathname === "/instructor/home"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark-text-blue-500"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/instructor/my-courses"
                className={
                  location.pathname === "/instructor/my-courses"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark-text-blue-500"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                My Courses
              </Link>
            </li>
            <li>
              <Link
                to="/instructor/add-course"
                className={
                  location.pathname === "/instructor/add-course"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark-text-blue-500"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                add-course
              </Link>
            </li>
            <li>
              <Link
                to="/instructor/about"
                className={
                  location.pathname === "/instructor/about"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark-text-blue-500"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                About
              </Link>
            </li>
            {/* Add more header items here */}
          </ul>
        </div>
      </div>
      {/* Mobile menu items */}
      {/* {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="py-2 bg-gray-100 md:bg-transparent">
            <li>
              <Link
                to='/partner'
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to='/partner/dashboard'
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                About
              </a>
            </li>
            <Link to='/partner/chat'><FontAwesomeIcon icon={faCommentAlt} className="w-8 h-8 mt-1" size="lg" style={{color: "#00060f",}} /></Link>
            
          </ul>
        </div>
      )} */}
    </nav>
  );
};

export default InstructorNavbar;
