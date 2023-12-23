import { axiosInstance } from "./config";
import axios from "axios";

const studentSignup = async (studentCredentials) => {
  try {
    const response = await axiosInstance.post("/signup", studentCredentials);

    const { message, email } = response.data;

    if (message === "OTP generated") {
      return Promise.resolve({ success: true, email });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.errors
      ) {
        if (
          axiosError.response.data.errors[0].message === "Student already exist"
        ) {
          return Promise.reject(axiosError.response.data.errors[0].message);
        } else {
          return Promise.reject("Validation Error");
        }
      } else {
        return Promise.reject("An unexpected error occurred.----");
      }
    } else {
      return Promise.reject("An unexpected error occurred.1111111");
    }
  }
};

const verifyOtp = async (otp, email) => {
  try {
    const response = await axiosInstance.post("/verify-otp", { otp, email });
    const { token, student } = response.data;
    localStorage.setItem("token", token);
    return Promise.resolve(student);
  } catch (error) {
    return Promise.reject(error);
  }
};


const resendOtp = async (email) => {
  await axiosInstance.post("/resend-otp", { email });
};

const studentLogin = async (studentCredentials) => {
  try {
    const response = await axiosInstance.post("/login", studentCredentials);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      return Promise.resolve(response.data.student);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.errors
      ) {
        return Promise.reject(axiosError.response.data.errors[0].message);
      } else {
        return Promise.reject("An unexpected error occurred.");
      }
    } else {
      return Promise.reject("An unexpected error occurred.");
    }
  }
};

const adminLogin = async (adminCredentials) => {
  try {
    const response = await axiosInstance.post("/admin/login", adminCredentials);
    console.log(response);
    const { token, success } = response.data;
    if (success) {
      localStorage.setItem("admintoken", token);
    }
    return Promise.resolve(response.data.admin);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.errors
      ) {
        return Promise.reject(axiosError.response.data.errors[0].message);
      } else {
        return Promise.reject("An unexpected error occurred.");
      }
    } else {
      return Promise.reject("An unexpected error occurred.");
    }
  }
};

const userLogout = async () => {
  localStorage.removeItem("token");
};

const instructorSignup = async (instructorCredentials) => {
  try {
    const response = await axiosInstance.post(
      "/instructor/signup",
      instructorCredentials
    );

    const { message, email } = response.data;

    if (message === "OTP generated") {
      console.log('running otp instSignup');
      return Promise.resolve({ success: true, email });

    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.errors
      ) {
        if (
          axiosError.response.data.errors[0].message ===
          "instructor already exist"
        ) {
          return Promise.reject(axiosError.response.data.errors[0].message);
        } else {
          return Promise.reject("Validation Error");
        }
      } else {
        return Promise.reject("An unexpected error occurred.");
      }
    } else {
      return Promise.reject("An unexpected error occurred.");
    }
  }
};

const instructorLogin = async (instructorCredentials) => {
  try {
    const response = await axiosInstance.post(
      "/instructor/login",
      instructorCredentials
    );
    if (response.data.success) {
      localStorage.setItem("instructor-token", response.data.token);
      return Promise.resolve(response.data.instructor);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.errors
      ) {
        return Promise.reject(axiosError.response.data.errors[0].message);
      } else {
        return Promise.reject("An unexpected error occurred.");
      }
    } else {
      return Promise.reject("An unexpected error occurred.");
    }
  }
};

const InstructorVerifyOtp = async (otp, email) => {
  try {
    const response = await axiosInstance.post("/instructor/verify-otp", {
      otp,
      email,
    });
    const { token, instructor } = response.data;
    localStorage.setItem("instructor-token", token);
    return Promise.resolve(instructor);
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  studentLogin,
  studentSignup,
  verifyOtp,
  resendOtp,
  adminLogin,
  userLogout,
  instructorSignup,
  instructorLogin,
  InstructorVerifyOtp,
};
