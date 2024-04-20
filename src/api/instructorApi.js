import { axiosAuthorized, axiosInstance } from "./config";
import axios from "axios";


export const getMyCourses = async (instructor) => {
  try {
    const mycourse = await axiosInstance.get(
      `/instructor/my-courses?instructor=${instructor}`
    );
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

export const addCourseImage = async (image) => {
  try {
    const response = await axiosInstance.put(
      "/instructor/add-course-image",
      image
    );
    if (response) {
      return Promise.resolve(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addModule = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/instructor/create-module",
      formData
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const addChapter = async (formData) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  try {
    const response = await axiosInstance.post(
      "/instructor/add-chapter",
      formData,
      { headers }
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
  }
};
