import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validations/loginSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../redux/userSlice";
import { studentLogin } from "../../api/authenticationApi";

const StudentLoginForm = () => {
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submitData = async (data) => {
    setErr("");
    try {
      dispatch(userActions.setEmail(data.email));
      const response = await studentLogin(data);
      if (response) {
        console.log(response);
        dispatch(userActions.saveUser(response));
        navigate("/");
      }
    } catch (error) {
      if (
        error?.response?.status == 401 &&
        error?.response?.data?.message == "Not verified"
      ) {
        navigate("/verify-otp");
      } else if (error?.response?.status == 401) {
        setErr(error?.response?.data?.message);
      } else {
        setErr("An unexpected error occurred..");
      }
      console.log(error.message);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(submitData)}>
      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="email"
        {...register("email")}
        placeholder="Email"
      />

      {errors.email && (
        <span className="text-red-600 text-sm italic">
          *{errors.email.message}
        </span>
      )}

      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && (
        <span className="text-red-600 text-sm italic">
          *{errors.password.message}
        </span>
      )}
      {err && (
        <div className="animate-fade bg-red-200 px-6 py-2 mx-2 my-4 rounded-md text-lg flex items-center max-w-lg">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-4 h-4 sm:w-4 sm:h-4 mr-2"
          >
            <path
              fill="currentColor"
              d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
            ></path>
          </svg>
          <span className="text-sm text-red-800"> {err} </span>
        </div>
      )}
      <button
        type="submit"
        className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none text-white"
      >
        <svg
          className="w-6 h-6 -ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M20 8v6M23 11h-6" />
        </svg>
        <span className="ml-">Sign In</span>
      </button>
    </form>
  );
};

export default StudentLoginForm;
