import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InstructorVerifyOtp, verifyOtp } from "../../api/authenticationApi";
import { userActions } from "../../redux/userSlice";
import { instructorActions } from "../../redux/InstructorSlice";

const OtpVerificationForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  if (!props.isInstructor) {
    var email = useSelector((store) => store.user.userEmail);
  } else {
    var email = useSelector((store) => store.instructor.instructorEmail);
  }

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!props.isInstructor) {
        const response = await verifyOtp(otp, email);

        if (response) {
          dispatch(userActions.saveUser(response));
          navigate("/");
        }
      } else {
        const response = await InstructorVerifyOtp(otp, email);

        if (response) {
          dispatch(instructorActions.saveInstructor(response));
          navigate("/instructor/home");
        }
      }
    } catch (error) {
      console.log(error);

      if (error) {
        setErr("OTP verification failed");
      }
    }
  };
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email </p>
            </div>
          </div>

          <div>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-5">
                <div className="items-center justify-between mx-auto w-full max-w-xs">
                  <div className=" h-16">
                    <input
                      value={otp}
                      onChange={handleInputChange}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                    />
                  </div>
                </div>
                {err && (
                  <div className="animate-fade bg-red-200 px-6 py-2  my-2 rounded-md text-lg flex items-center mx-auto w-full max-w-xs">
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
                <div className="flex flex-col space-y-5 mx-auto w-full max-w-xs">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-400 border-none hover:bg-green-700 text-white text-sm shadow-sm font-semibold"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
