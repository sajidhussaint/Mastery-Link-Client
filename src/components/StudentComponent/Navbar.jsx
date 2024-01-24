import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user.user);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("working Logout");
    dispatch(userActions.userLogout());
    if (user?.role === "student") {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed w-full z-10">
        <nav className="bg-white bg-opacity-75 border-gray-200 py-2.5 dark:bg-gray-900 dark:bg-opacity-50 backdrop-filter backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <Link to="/" className="flex items-center">
              <img
                src="./logo.svg"
                className="h-6 mr-3 sm:h-9"
                alt="MastreyLink Logo"
              />
            </Link>
            <div className="flex items-center lg:order-2">
              <div className="hidden mt-2 mr-4 sm:inline-block">
                {/* Add your GitHub button or any other content here */}
              </div>
              <button
                onClick={handleLogout}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
              >
                {user?.role === "student" ? "Log Out" : "Log In"}
              </button>
              <button
                onClick={handleMobileMenuToggle}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Toggle mobile menu</span>
                {/* Use appropriate icons for menu toggle */}
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/"
                    className={
                      location.pathname === "/"
                        ? "block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white"
                        : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    }
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className={
                      location.pathname === "/courses"
                        ? "block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white"
                        : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    }
                    aria-current="page"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className={
                      location.pathname === "/team"
                        ? "block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white"
                        : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    }
                    aria-current="page"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={
                      location.pathname === "/contact"
                        ? "block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white"
                        : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    }
                    aria-current="page"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
