import { axiosAuthorized, axiosInstance } from "./config";
import axios from "axios";

export const getCourses = async (category, search) => {
  try {
    const response = await axiosInstance.get(
      `/courses?category=${category}&&search=${search}`
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
  }
};
export const getCategory = async () => {
  try {
    const response = await axiosInstance.get("/courses-category");

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
export const changePassword = async (
  newPassword,
  currentPassword,
  studentId
) => {
  try {
    const response = await axiosAuthorized.patch("/change-password", {
      newPassword,
      currentPassword,
      studentId,
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateProfile = async (firstname, lastname, mobile, studentId) => {
  try {
    const response = await axiosAuthorized.put("/update-profile", {
      firstname,
      lastname,
      mobile,
      studentId,
    });
    if (response) {
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const addProgression = async (enrollmentId, moduleId) => {
  try {
    const response = await axiosAuthorized.get(
      `/add-progression?enrollmentId=${enrollmentId}&moduleId=${moduleId}`
    );
    if (response) {
      return Promise.resolve(response);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
