import { Link } from "react-router-dom";
import AdminLoginForm from "../../components/auth/AdminLoginForm";

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center animate-fade animate-ease-in-out">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <Link to={"/"}>
              <img src="/logo.svg" className="w-mx-auto" alt="logo" />
            </Link>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 ">
              <div className="mx-auto max-w-xs">
                <AdminLoginForm />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/admin-login.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
