import { Link } from "react-router-dom";
import StudentLoginForm from "../../components/auth/StudentLoginForm";

const StudentLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <Link to={"/"}>
              <img src="./logo.svg" className="w-mx-auto" alt="logo" />
            </Link>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 ">
              <div className="mx-auto max-w-xs">
                <StudentLoginForm />
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link to={"forgot-password"}>
                    <p className="inline-block text-sm text-gray-500 dark:text-blue-500 align-baseline hover:text-blue-800">
                      Forgot Password?
                    </p>
                  </Link>
                </div>
                <div className="text-center">
                  <span>Don't have an account! </span>

                  <Link to={"/signup"}>
                    <span className="inline-block text-sm text-grey-500 dark:text-blue-500 align-baseline hover:text-blue-800">
                      Sign Up
                    </span>
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    to={"/instructor/login"}
                    className="inline-block text-sm text-grey-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Login as Instructor
                  </Link>
                </div>
                {/* <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Cartesian Kinetics
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('./images/Login-amico.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
