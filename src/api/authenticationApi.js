import { axiosInstance } from "./config";


const studentSignup = async (studentCredentials) => {
  const response = await axiosInstance.post("/signup", studentCredentials);

  const { message, email } = response.data;

  if (message === "OTP generated") {
    return Promise.resolve({ success: true, email });
  }
};

const verifyOtp = async (otp, email) => {
  const response = await axiosInstance.post("/verify-otp", { otp, email });
  const { token, student } = response.data;
  localStorage.setItem("token", token);
  return Promise.resolve(student);
};

const resendOtp = async (email) => {
  await axiosInstance.post("/resend-otp", { email });
};

const studentLogin = async (studentCredentials) => {
  const response = await axiosInstance.post("/login", studentCredentials);
  if (response.data.success) {
    localStorage.setItem("token", response.data.token);
    return Promise.resolve(response.data.student);
  }
};

const adminLogin = async (adminCredentials) => {
  const response = await axiosInstance.post("/admin/login", adminCredentials);
  console.log(response, "resp");
  const { token, success } = response.data;
  if (success) {
    localStorage.setItem("admintoken", token);
  }
  return Promise.resolve(response.data.admin);
};

const userLogout = async () => {
  localStorage.removeItem("token");
};
const adminLogout = async () => {
  localStorage.removeItem("admintoken");
};

const instructorSignup = async (instructorCredentials) => {
  const response = await axiosInstance.post(
    "/instructor/signup",
    instructorCredentials
  );

  const { message, email } = response.data;

  if (message === "OTP generated") {
    console.log("running otp instSignup");
    return Promise.resolve({ success: true, email });
  }
};

const instructorLogin = async (instructorCredentials) => {
  const response = await axiosInstance.post(
    "/instructor/login",
    instructorCredentials
  );
  if (response.data.success) {
    localStorage.setItem("instructor-token", response.data.token);
    return Promise.resolve(response.data.instructor);
  }
};

const InstructorVerifyOtp = async (otp, email) => {
  const response = await axiosInstance.post("/instructor/verify-otp", {
    otp,
    email,
  });
  const { token, instructor } = response.data;
  localStorage.setItem("instructor-token", token);
  return Promise.resolve(instructor);
};

export {
  studentLogin,
  studentSignup,
  verifyOtp,
  resendOtp,
  adminLogin,
  adminLogout,
  userLogout,
  instructorSignup,
  instructorLogin,
  InstructorVerifyOtp,
};
