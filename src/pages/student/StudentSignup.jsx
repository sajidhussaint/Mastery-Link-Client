import { Link } from "react-router-dom";
import StudentLoginForm from "../../components/auth/StudentSignupForm";

const StudentSignup = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <Link to={"/"}>
              <img src="./logo.svg" className="w-mx-auto" alt="logo" />
            </Link>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div className="w-full flex-1 ">
              <div className="mx-auto max-w-xs">
                <StudentLoginForm />
                <hr className="mb-6 border-t" />
                
                <div className="text-center">
                  <span>Already a member! </span>

                  <Link to={"/login"}>
                    <span className="inline-block text-sm text-grey-500 dark:text-blue-500 align-baseline hover:text-blue-800">
                      Log in
                    </span>
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    to={"/instructor/signup"}
                    className="inline-block text-sm text-grey-500 dark:text-blue-500 align-baseline hover:text-blue-800 underline" 
                  >
                    Become an instructor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('./images/Learning-amico.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
