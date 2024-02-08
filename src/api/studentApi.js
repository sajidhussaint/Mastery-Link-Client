import { axiosAuthorized, axiosInstance } from "./config";
import axios from "axios";

export const getCourses = async () => {
  try {
    const response = await axiosInstance.get(
      // `/courses?page=${page}&category=${category}`
      "/courses"
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const courseEnroll = async (courseId, studentId) => {
  try {
    console.log(courseId, studentId);
    const response = await axiosInstance.post("create-payment-intent", {
      courseId,
      studentId,
    });
    if (response.data) {
      return Promise.resolve(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const enrollment = async (courseId, studentId) => {
  try {
    const response = await axiosAuthorized.post("create-payment", {
      courseId,
      studentId,
    });
    if (response) {
      return Promise.resolve(response.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getEnrolledCourse = async (courseId, studentId) => {
  try {
    console.log("runnn get enroll", studentId);
    const response = await axiosAuthorized.get(
      `/get-enrolled-course?courseId=${courseId}&&studentId=${studentId}`
    );
    if (response) {
      return Promise.resolve(response.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const addNotes = async (enrolledId, notes) => {
  try {
    const response = await axiosAuthorized.post("/add-notes", {
      enrolledId,
      notes,
    });

    if (response) {
      return Promise.resolve(response.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const changePassword = async (newPassword, currentPassword,studentId) => {
  try {
    const response = await axiosAuthorized.patch("/change-password", {
      newPassword,
      currentPassword,
      studentId
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
