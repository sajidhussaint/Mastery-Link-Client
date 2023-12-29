import { axiosAuthorized, axiosInstance } from "./config";
import axios from "axios";

export const getMyCourses = async (req, res) => {
  try {
    const response = await axiosAuthorized.get("/instructor/my-courses");
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
