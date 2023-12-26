import { axiosAuthorized, axiosInstance } from "./config";
import axios from "axios";

export const getAllStudents = async () => {
  try {
    const students = await axiosInstance.get("/admin/student-list");
    if (students) {
      return Promise.resolve(students.data.student);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllInstructor = async () => {
  try {
    const instructor = await axiosInstance.get("/admin/instructor-list");
    if (instructor) {
      return Promise.resolve(instructor.data.instructor);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourse = async () => {
  try {
    const course = await axiosInstance.get("/admin/course-list");
    if (course) {
      return Promise.resolve(course.data.course);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategory = async () => {
  try {
    const category = await axiosInstance.get("/admin/category-list");
    if (category) {
      return Promise.resolve(category.data.category);
    }
  } catch (error) {
    console.log(error);
  }
};




export const blockStudent = async (studentId) => {
  try {
    const response = await axiosInstance.patch("/admin/block-student", {
      studentId,
    });
    const { success } = response.data;
    if (success) {
      return Promise.resolve(success);
    }
  } catch (error) {
    return Promise.reject();
  }
};

export const unblockStudent = async (studentId) => {
  try {
    const response = await axiosInstance.patch("/admin/unblock-student", {
      studentId,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const blockInstructor = async (instructorId) => {
  try {
    const response = await axiosInstance.patch("/admin/block-instructor", {
      instructorId,
    });
    const { success } = response.data;
    if (success) {
      return Promise.resolve(success);
    }
  } catch (error) {
    return Promise.reject();
  }
};

export const unblockInstructor = async (instructorId) => {
  try {
    const response = await axiosInstance.patch("/admin/unblock-instructor", {
      instructorId,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};
export const editCategory = async (categoryId,value) => {
  try {
    console.log(categoryId,value,'======oooop');
    const response = await axiosInstance.patch("/admin/category-list", {
      categoryId,value
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const addCategory = async (category) => {
  try {
    const response = await axiosInstance.post("/admin/category-list", {
      category
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

