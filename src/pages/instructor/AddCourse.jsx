import React, { useEffect, useState } from "react";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { courseSchema } from "../../validations/courseSchema";
import { addCourse } from "../../api/instructorApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAllCategory,
  getLevelList,
  getLanguageList,
} from "../../api/adminApi";
import { useSelector } from "react-redux";
const AddCourse = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  const InstructorId = useSelector((store) => store.instructor.instructor._id);

  const [err, setErr] = useState("");

  const getCategoryList = async () => {
    const category = await getAllCategory();
    const activeCategory = category.filter((value) => {
      return value.status != false;
    });

    console.log(activeCategory);
    setCategoryList(activeCategory);
  };
  const getAllLevelList = async () => {
    const level = await getLevelList();
    const activeLevel = level.filter((value) => {
      return value.status != false;
    });

    setLevelList(activeLevel);
  };
  const getAllLanguageList = async () => {
    const language = await getLanguageList();
    const activeLanguage = language.filter((value) => {
      return value.status != false;
    });
    setLanguageList(activeLanguage);
  };
  const onSubmit = async (data) => {
    setErr("");
    try {
      const response = await addCourse(data);

      if (response) {
        toast.success("Course successfully added", {
          theme: "colored",
        });
        setTimeout(() => navigate("/instructor/my-courses"), 2000);
      }
      console.log(data);
    } catch (error) {
      if (typeof error === "string") {
        setErr(error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
  });

  useEffect(() => {
    getCategoryList();
    getAllLevelList();
    getAllLanguageList();
  }, []);

  return (
    <>
      <InstructorNavbar />
      <div className="relative bg-gradient-to-bl  via-transparent dark:from-blue-950 dark:via-transparent animate-fade animate-ease-in-out">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-7 mx-auto ">
          <div className="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              {/* Form */}
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                {err && (
                  <div className="err">
                    <h3 className="text-red-900 font-semibold bg-red-400 w-full py-2 px-3 border-2 rounded-md">
                      {err}
                    </h3>
                  </div>
                )}
                <div className="lg:max-w-lg lgmx-auto lg:me-0 ms-auto">
                  {/* Card */}
                  <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg  dark:bg-slate-900">
                    <div className="text-center">
                      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                        Add Course
                      </h1>
                    </div>
                    <div className="mt-5">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Input Group */}
                        <div>
                          {/* Floating Input */}
                          <div className="relative">
                            <input
                              type="text"
                              {...register("name", {
                                required: "Course name requred",
                              })}
                              id="hs-hero-signup-form-floating-input-first-name"
                              className="bg-gray-100 peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                              placeholder="John"
                            />
                            <label
                              htmlFor="hs-hero-signup-form-floating-input-first-name"
                              className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:text-xs
                  peer-focus:-translate-y-1.5
                  peer-focus:text-gray-500
                  peer-[:not(:placeholder-shown)]:text-xs
                  peer-[:not(:placeholder-shown)]:-translate-y-1.5
                  peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                              Course Name
                            </label>
                            {errors.name && (
                              <span className="text-red-600 text-sm italic">
                                *{errors.name.message}
                              </span>
                            )}
                          </div>
                          {/* End Floating Input */}
                        </div>
                        {/* End Input Group */}
                        {/* Input Group */}
                        <div>
                          {/* Floating Input */}
                          <div className="relative">
                            <input
                              type="hidden"
                              value={InstructorId}
                              {...register("instructor")}
                            />
                            <input
                              type="text"
                              {...register("price", { min: 2 })}
                              id="hs-hero-signup-form-floating-input-last-name"
                              className="bg-gray-100 peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                              placeholder="Doe"
                            />
                            <label
                              htmlFor="hs-hero-signup-form-floating-input-last-name"
                              className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:text-xs
                  peer-focus:-translate-y-1.5
                  peer-focus:text-gray-500
                  peer-[:not(:placeholder-shown)]:text-xs
                  peer-[:not(:placeholder-shown)]:-translate-y-1.5
                  peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                              Price
                            </label>

                            {errors.price && (
                              <span className="text-red-600 text-sm italic">
                                *{errors.price.message}
                              </span>
                            )}
                          </div>
                          {/* End Floating Input */}
                        </div>
                        {/* End Input Group */}
                        {/* Input Group */}
                        <select
                          {...register("language")}
                          className="bg-gray-100 p-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        >
                          <option value="" disabled selected>
                            Select language
                          </option>
                          {languageList &&
                            languageList.map((value) => (
                              <option value={value.id}>{value.language}</option>
                            ))}
                        </select>
                        {errors.language && (
                          <span className="text-red-600 text-sm italic">
                            *{errors.language.message}
                          </span>
                        )}
                        {/* End Input Group */}
                        {/* Input Group */}
                        <div>
                          {/* Floating Input */}
                          <select
                            {...register("level")}
                            className="bg-gray-100 p-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          >
                            <option value="" disabled selected>
                              Select level
                            </option>
                            {levelList &&
                              levelList.map((value) => (
                                <option value={value.id}>{value.level}</option>
                              ))}
                          </select>
                          {errors.level && (
                            <span className="text-red-600 text-sm italic">
                              *{errors.level.message}
                            </span>
                          )}
                          {/* End Floating Input */}
                        </div>
                        {/* End Input Group */}
                        {/* Input Group */}
                        <div>{/* End Floating Input */}</div>
                        {/* End Input Group */}
                      </div>
                      <div className="relative">
                        <select
                          {...register("category")}
                          className="bg-gray-100 p-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        >
                          <option value="" disabled selected>
                            Select Category
                          </option>
                          {categoryList &&
                            categoryList.map((value) => (
                              <option value={value.id}>{value.category}</option>
                            ))}
                        </select>
                        {errors.category && (
                          <span className="text-red-600 text-sm italic">
                            *{errors.category.message}
                          </span>
                        )}
                      </div>

                      {/* Floating Input */}
                      <div className="relative mt-5">
                        <textarea
                          {...register("description")}
                          id="hs-hero-signup-form-floating-input-message"
                          className="bg-gray-100 peer  p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                          placeholder="Write your message..."
                        />
                        {errors.description && (
                          <span className="text-red-600 text-sm italic">
                            *{errors.description.message}
                          </span>
                        )}
                        <label
                          htmlFor="hs-hero-signup-form-floating-input-message"
                          className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:text-xs
                  peer-focus:-translate-y-1.5
                  peer-focus:text-gray-500
                  peer-[:not(:placeholder-shown)]:text-xs
                  peer-[:not(:placeholder-shown)]:-translate-y-1.5
                  peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                          Course Content
                        </label>
                      </div>
                    </div>
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Course
                      </button>
                    </div>
                  </div>
                  {/* End Card */}
                </div>
              </form>
              {/* End Form */}
            </div>
            <div className="bg-green-600 w-full hidden sm:block">
              <img src="/images/add_course.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
