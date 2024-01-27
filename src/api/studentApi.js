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
