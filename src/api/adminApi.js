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
    const category = await axiosInstance.get("/admin/categories");
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
export const editCategory = async (categoryId, value) => {
  try {
    console.log(categoryId, value, "======oooop");
    const response = await axiosInstance.patch("/admin/edit-category", {
      categoryId,
      value,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const addCategory = async (category) => {
  try {
    const response = await axiosInstance.post("/admin/add-category", {
      category,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const listCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.patch("/admin/list-category", {
      categoryId,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const unlistCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.patch("/admin/unlist-category", {
      categoryId,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const getLanguageList = async () => {
  try {
    const response = await axiosInstance.get("/admin/languages");
    const { language } = response.data;
    console.log(language);
    return Promise.resolve(language);
  } catch (error) {
    return Promise.reject();
  }
};

export const listLanguage = async (languageId) => {
  try {
    const response = await axiosInstance.patch("/admin/list-language", {
      languageId,
    });
    const { success } = response.data;
    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const unlistLanguage = async (languageId) => {
  try {
    const response = await axiosInstance.patch("/admin/unlist-language", {
      languageId,
    });
    const { success } = response.data;
    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const addLanguage = async (language) => {
  try {
    const response = await axiosInstance.post("/admin/add-language", {
      language,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const editLanguage = async (languageId, value) => {
  try {
    console.log(languageId, value, "======oooop");
    const response = await axiosInstance.patch("/admin/edit-language", {
      languageId,
      value,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const getLevelList = async () => {
  try {
    const response = await axiosInstance.get("/admin/levels");
    const { level } = response.data;
    console.log(level);
    return Promise.resolve(level);
  } catch (error) {
    return Promise.reject();
  }
};

export const listLevel = async (levelId) => {
  try {
    const response = await axiosInstance.patch("/admin/list-level", {
      levelId,
    });
    const { success } = response.data;
    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const unlistLevel = async (levelId) => {
  try {
    const response = await axiosInstance.patch("/admin/unlist-level", {
      levelId,
    });
    const { success } = response.data;
    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const addLevel = async (level) => {
  try {
    const response = await axiosInstance.post("/admin/add-level", {
      level,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const editLevel = async (levelId, value) => {
  try {
    console.log(levelId, value, "======oooop");
    const response = await axiosInstance.patch("/admin/edit-level", {
      levelId,
      value,
    });
    const { success } = response.data;

    return Promise.resolve(success);
  } catch (error) {
    return Promise.reject();
  }
};

export const dashboard = async () => {
  try {
    const response = await axiosAuthorized.get("/admin/dashboard");
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject();
  }
};
