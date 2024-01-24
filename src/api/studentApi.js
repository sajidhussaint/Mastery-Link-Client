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
