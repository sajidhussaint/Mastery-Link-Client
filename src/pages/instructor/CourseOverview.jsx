import React, { useEffect, useRef, useState } from "react";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import { useLocation } from "react-router-dom";
import {
  getSingleCourse,
  // addModule,
  addCourseImage,
} from "../../api/instructorApi";
import TimeInput from "../../components/instructorComponent/TimeSelector";

const CourseOverview = () => {
  const [course, setCourse] = useState();
  const [updating, setUpdating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [chapter, setChapter] = useState("");
  const [err, setErr] = useState("");

  const fileInputRef = useRef(null);

  const location = useLocation();

  const getCourse = async () => {
    const response = await getSingleCourse(location.state.courseId);
    console.log(response);
    setCourse(response);
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("courseId", location.state.courseId);
        setUpdating(true);
        const response = await addCourseImage(formData);
        if (response) {
          setUpdating(false);
          setCourse({ ...response });
        }
      } catch (error) {
        setErr("Fail to update image");
        setTimeout(() => {
          setErr("");
        }, 1000);
      }
    }
  };

  const handleTimeChange = (newTime) => {
    // Handle the selected time in the parent component
    const seconds = timeToSeconds(newTime);
    setSelectedTime(seconds);
  };

  const handleAddModuleClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddChapter = async () => {
    console.log(chapter, "mo");
    if (currentModuleId && chapter.trim() !== "") {
      const formData = new FormData();
      formData.append("chapter", chapter.trim());
      formData.append("time", selectedTime?.toString() || "");
      formData.append("moduleId", currentModuleId);
      try {
        console.log([...formData.entries()], "data");
        await addChapter(formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <>
      <InstructorNavbar />
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <div className="flex flex-col items-center p-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="md:w-2/4 ">
          <div className="relative    sm:mb-0 mb-3">
            {/* <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-l-lg"
              src="/images/image not found.png"
              alt=""
            /> */}

            {/* <img src={course.image} alt="" /> */}

            {course?.image ? (
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-l-lg"
                src={course.image}
                alt=""
              />
            ) : (
              <div>
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-l-lg"
                  src="/images/image not found.png"
                  alt=""
                />
                {updating ? (
                  <div
                    className="w-12 h-12 rounded-full animate-spin
                      border-8 border-solid border-blue-700 border-t-transparent"
                  ></div>
                ) : (
                  <h1 className="font-semibold">Upload image</h1>
                )}

                {err && <h1 className="font-semibold text-red-700">{err}</h1>}
              </div>
            )}

            <div>
              {err && <h1 className="font-semibold text-red-700">{err}</h1>}
              <button
                onClick={handleImageUploadClick}
                className="absolute  bottom-2 ml-2  text-white p-2 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-4  w-full leading-normal">
          <div className="flex justify-between">
            <h1 className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {course?.name}
            </h1>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="flex justify-start gap-5">
            <p className="my-3 text-lg font-semibold"></p>
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            price: ₹ {course?.price}
          </h1>
          <p className="my-2 text-lg font-semibold">{course?.level.level}</p>
          <p className="my-2 text-lg font-semibold">
            {course?.language.language}
          </p>
          <div className="container">
            <hr />
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {course?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>






      <div className=" p-6 flex justify-center  text-black">
        <div className="p-6  container bg-white">
          <div className="w-full flex justify-between px-3">
            <h1 className="font-bold text-lg">Modules</h1>

            <button
              className="bg-green-700 text-white font-semibold px-4 py-1 rounded-t-sm shadow-lg"
              onClick={handleAddModuleClick}
            >
              Add module
            </button>

            {showPopup && (
              <AddModulePopup
                onClose={handleClosePopup}
                onSubmit={handleAddModuleSubmit}
              />
            )}
          </div>
          <div id="modal-root"></div>
          {course?.modules && course?.modules?.length > 0 ? (
            <div className="py-5">
              {course.modules.map((module, index) => (
                <div key={index} className="w-full">
                  <div className="icon flex justify-between items-center px-3 mb-3">
                    <div>
                      <i className="fa-regular fa-circle-play px-2"></i>
                      <span className="px-2 font-semibold">
                        {typeof module?.module === "object"
                          ? module.module.name
                          : module?.module}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <h4 className="text-right font-semibold ">
                        {typeof module?.module === "object"
                          ? module.module.duration
                          : module?.module}
                      </h4>
                    </div>

                    <div>
                      <button
                        className=" text-sm text-white bg-[#2F327D] px-2 py-1"
                        onClick={() =>
                          handleClick(
                            typeof module?.module === "object"
                              ? module?.module.id
                              : module.module
                          )
                        }
                      >
                        Add chapters
                      </button>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle text-black "
                      >
                        <div className="modal-box bg-white">
                          <h3 className="font-bold text-lg">Hello!</h3>
                          <p className="py-4">
                            Selected time is : {selectedTime}
                          </p>
                          <div className="modal-action">
                            <div className="flex flex-col w-full gap-4">
                              <div className="flex flex-row justify-between">
                                <input
                                  type="text"
                                  placeholder="Enter text"
                                  value={chapter}
                                  onChange={(e) => setChapter(e.target.value)}
                                  className="bg-slate-300 rounded-md shadow-lg placeholder:text-black placeholder:italic border px-4"
                                />
                                <TimeInput
                                  maxTime={
                                    typeof module?.module === "object" &&
                                    module.module?.duration
                                      ? module.module.duration
                                      : "00:00:00"
                                  }
                                  onTimeChange={handleTimeChange}
                                  onClose={handleClosePopup}
                                />
                              </div>
                              <div className="flex-row flex gap-2">
                                <button
                                  onClick={() => handleAddChapter()}
                                  className="text-sm bg-[#2F327D] text-white px-3 py-1 rounded-md"
                                >
                                  Add chapter
                                </button>
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="text-sm bg-red-700 text-white px-3 py-1 rounded-md">
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                  <hr className="mb-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-5 ">
              <h1 className="font-semibold text-lg text-center">
                No course found
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseOverview;
