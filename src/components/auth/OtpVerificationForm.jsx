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
        console.log("save user Response====");
        const response = await verifyOtp(otp, email);

        if (response) {
          dispatch(userActions.saveUser(response));
          navigate("/");
        }
      } else {
        console.log("save instr Response====");
        const response = await InstructorVerifyOtp(otp, email);

        if (response) {
          dispatch(instructorActions.saveInstructor(response));
          navigate("/instructor/dashboard");
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
              <div className="flex flex-col space-y-16">
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
                  <p className="my-2 rounded-md border-2 border-red-950 bg-red-400 text-red-950 font-semibold px-3 pt-1">
                    {err}
                  </p>
                )}
                <div className="flex flex-col space-y-5">
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
