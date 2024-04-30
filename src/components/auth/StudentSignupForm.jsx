import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../validations/signupSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../redux/userSlice";
import { studentSignup } from "../../api/authenticationApi";

const StudentSignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitData = async (data) => {
    try {
      const response = await studentSignup(data);
      if (response?.success) {
        dispatch(userActions.setEmail(response.email));
        navigate("/verify-otp");
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        setErr(error?.response?.data?.message);
      } else {
        setErr("An unexpected error occurred..");
      }
      console.log(error.message);
    }
    
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <input
        type="text"
        {...register("firstname")}
        placeholder="First name"
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  "
      />
      {errors.firstname && (
        <span className="text-red-600 text-sm italic">
          *{errors.firstname.message}
        </span>
      )}
      <input
        type="text"
        {...register("lastname")}
        placeholder="Last name"
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  mt-2"
      />
      {errors.lastname && (
        <span className="text-red-600 text-sm italic">
          *{errors.lastname.message}
        </span>
      )}
      <input
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  mt-2"
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
        type="number"
        {...register("mobile", { valueAsNumber: true })}
        placeholder="Mobile"
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  mt-2"
      />
      {errors.mobile && (
        <span className="text-red-600 text-sm italic">
          *{errors.mobile.message}
        </span>
      )}

      <input
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && (
        <span className="text-red-600 text-sm italic">
          *{errors.password.message}
        </span>
      )}
      <input
        className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
        type="password"
        {...register("confirmpassword")}
        placeholder="Confirm password"
      />
      {errors.confirmpassword && (
        <span className="text-red-600 text-sm italic">
          *{errors.confirmpassword.message}
        </span>
      )}
      {err && (
        <div className="animate-fade bg-red-200 px-6 py-2 mx-2 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
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
        className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
        <span className="ml-">Sign Up</span>
      </button>
    </form>
  );
};

export default StudentSignupForm;
