import { axiosAuthorized, axiosInstance } from "./config";
import axios from "axios";

export const getMyCourses = async () => {
  try {
    const mycourse = await axiosInstance.get("/instructor/my-courses");
    if (mycourse) {
      return Promise.resolve(mycourse.data.course);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addCourse = async (courseCredentials) => {
  try {
    const response = await axiosInstance.post(
      "/instructor/add-course",
      courseCredentials
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/instructor/course/${courseId}`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
  }
};
