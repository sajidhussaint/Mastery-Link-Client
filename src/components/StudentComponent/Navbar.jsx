import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "react-scroll-progress-bar";
import { userLogout } from "../../api/authenticationApi";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user.user);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (user) {
      toast.success("Logout successfully", {
        position: "top-left",
      });
    }
    userLogout();

    dispatch(userActions.userLogout());
    if (user && user != null) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed w-full z-50 ">
        <ProgressBar bgcolor="green" />
        <nav className="bg-white bg-opacity-25 border-gray-200 py-2.5 dark:bg-gray-900 dark:bg-opacity-50 backdrop-filter backdrop-blur-md ">
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
                onClick={() => navigate("/login")}
                className=" font-bold mr-3 relative text-black hover:text-green-600 hover:font-extrabold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]  "
              >
                {user ? "" : "Sign in"}
              </button>

              <button
                onClick={handleLogout}
                className=" font-bold  inline-flex items-center justify-center rounded-xl bg-green-600 py-2 px-5 font-dm text-base  text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]   "
              >
                {user ? "Sign out" : "Join"}
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
              <ul className="flex flex-col mt-4  lg:flex-row lg:space-x-8 lg:mt-0 font-bold">
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
                {user && (
                  <li>
                    <Link
                      to="/profile"
                      className={
                        location.pathname === "/profile"
                          ? "block py-2 pl-3 pr-4 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 dark:text-white"
                          : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                      }
                      aria-current="page"
                    >
                      profile
                    </Link>
                  </li>
                )}

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
