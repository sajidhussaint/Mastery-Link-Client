import { axiosAuthorized, axiosInstance } from "./config";
import axios from "axios";

export const getMyCourses = async (req, res) => {
  try {
    const mycourse = await axiosInstance.get("/instructor/my-courses");
    if (mycourse) {
      return Promise.resolve(mycourse.data.course);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
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
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
