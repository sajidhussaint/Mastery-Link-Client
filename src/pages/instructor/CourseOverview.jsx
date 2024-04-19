import React, { useRef, useState } from "react";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import { useLocation } from "react-router-dom";
import { Badge } from "antd";
import HoverVideoPlayer from "react-hover-video-player";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Button,
  Tooltip,
  Chip,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  getSingleCourse,
  addChapter,
  addCourseImage,
} from "../../api/instructorApi";
import TimeInput from "../../components/instructorComponent/TimeSelector";

import AddModulePopup from "../../components/instructorComponent/AddModulePopup";
import SpinnerMain from "../../components/common/utils/SpinnerMain";
import OverviewSkelton from "../../components/common/utils/OverviewSkelton";
import EnrolledStudentsTable from "../../components/instructorComponent/EnrolledStudentsTable";
import { toast } from "react-toastify";

const CourseOverview = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [chapter, setChapter] = useState("");
  const [err, setErr] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const [timeFormat, setTimeFormat] = useState("");
  const [currentModuleId, setCurrentModuleId] = useState(null);

  const fileInputRef = useRef(null);
  const location = useLocation();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["courseoverview", location.state.courseId],
    queryFn: () => getSingleCourse(location.state.courseId),
  });

  const course = data?.course;
  const enrollments = data?.enrollments;

  if (course?.modules?.length == 0) {
    toast.warn("please add modules", {
      theme: "colored",
      position: "bottom-left",
    });
  }

  const addChapterMutation = useMutation({
    mutationFn: addChapter,
  });
  const addCourseImageMutation = useMutation({
    mutationFn: addCourseImage,
  });

  function timeToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Calculate the total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  }

  const handleSpinner = (value) => {
    setSpinner(value);
  };
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClick = (moduleTime, moduleId) => {
    setCurrentModuleId(moduleId);
    setOpen(!open);
    setTimeFormat(moduleTime);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("courseId", location.state.courseId);
        setSpinner(true);

        await addCourseImageMutation.mutateAsync(formData);
        // const response = await addCourseImage(formData);

        setSpinner(false);
        refetch();
      } catch (error) {
        setErr("Fail to update image");
        setTimeout(() => {
          setErr("");
        }, 1000);
      }
    }
  };

  function handleTimeChange(newTime) {
    const seconds = timeToSeconds(newTime);
    setSelectedTime(seconds);
    console.log(seconds);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddChapter = async () => {
    if (currentModuleId && chapter.trim() !== "") {
      const formData = new FormData();
      formData.append("chapter", chapter.trim());
      formData.append("time", selectedTime?.toString() || "");
      formData.append("moduleId", currentModuleId);
      try {
        await addChapterMutation.mutateAsync(formData);
        refetch();
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <InstructorNavbar />
        <OverviewSkelton />
      </>
    );
  }
  return (
    <>
      {spinner && <SpinnerMain />}

      <InstructorNavbar />

      <>
        <div className="flex flex-col items-center p-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 animate-fade animate-ease-in-out">
          <div className="md:w-2/4 ">
            <div className="relative    sm:mb-0 mb-3">
              {course?.image ? (
                <img
                  className="object-cover w-full  h-96 md:h-auto md:w-72  md:rounded-lg overflow-hidden"
                  src={course?.image}
                  // src="/images/sample.jpg"
                  alt="img-course"
                />
              ) : (
                <div>
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-l-lg overflow-hidden"
                    src="/images/image not found.png"
                    alt="not found"
                  />

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

              {/* <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSpinner(true);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Edit
                  </button>
                </div> */}
            </div>
            <div className="flex justify-start gap-5">
              <p className="my-3 text-lg font-semibold"></p>
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <i className="fas fa-rupee-sign mr-2 text-green-700"></i>:
              {course?.price}
            </h1>
            <p className="my-1 text-lg font-semibold">
              <i className="fas fa-signal mr-2 text-green-700"></i>
              {course?.level.level}
            </p>
            <p className="my-1 text-lg font-semibold">
              <i className="fas fa-solid fa-language text-green-700 mr-2"></i>
              {course?.language.language}
            </p>
            <div className="container">
              <hr />
              <div className="flex justify-between my-1 mb-2">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {course?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" p-6 flex justify-center  text-black ">
          <div className="p-6  container bg-white">
            <div className="w-full flex justify-between px-3">
              <h1 className="font-bold text-lg">Modules</h1>

              <AddModulePopup handleSpinner={handleSpinner} refetch={refetch} />
              {showPopup && (
                <AddModulePopup
                  onClose={handleClosePopup}
                  onSubmit={handleAddModuleSubmit}
                />
              )}
            </div>

            {course?.modules && course?.modules?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {course.modules.map((module, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Popover>
                          <PopoverHandler>
                            <i className="fa-regular fa-circle-play px-2 scale-150 cursor-pointer hover:text-blue-800 animate-pulse"></i>
                          </PopoverHandler>
                          <PopoverContent>
                            <HoverVideoPlayer
                              videoSrc={
                                typeof module?.module === "object"
                                  ? module.module.module
                                  : module?.module
                              }
                              style={{
                                width: "400px",
                              }}
                              loop={true}
                              controls
                              muted={false}
                            />
                          </PopoverContent>
                        </Popover>

                        {/* <i className="fa-regular fa-circle-play px-2"></i> */}

                        {typeof module?.module === "object"
                          ? module.module.name
                          : module?.module}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        {typeof module?.module === "object"
                          ? module.module.duration
                          : module?.module}
                        <Tooltip
                          placement="bottom"
                          className=" border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 "
                          content={
                            <div>
                              <Typography
                                color="blue-gray"
                                className="font-medium"
                              >
                                Durations
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-80"
                              >
                                <div className="flex flex-row  gap-2 ">
                                  {module.module.chapters.map((item, index) => (
                                    <Chip
                                      key={index}
                                      color="green"
                                      value={item.duration}
                                      size="sm"
                                    />
                                  ))}
                                </div>
                              </Typography>
                            </div>
                          }
                        >
                          <Badge
                            count={module.module.chapters.length}
                            className="cursor-pointer ml-2"
                          />
                        </Tooltip>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="flex px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out text-sm"
                          onClick={() =>
                            handleClick(
                              module?.module.duration,
                              module?.module.id
                            )
                          }
                        >
                          Add chapters
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-5 flex flex-col items-center justify-center mt-10 mb-20">
                <img
                  className="w-28 h-32"
                  src="/images/empty_data.png"
                  alt=""
                />
                <h1 className="font-semibold text-lg text-center">
                  No Modules found.
                </h1>
              </div>
            )}
          </div>
        </div>

        {enrollments?.length > 0 && (
          <div className="pt-1 p-6 flex justify-center bg-slate-100 text-black">
            <div className="p-6  container bg-white">
              <div className="w-full ">
                <h1 className="font-bold text-lg">Enrolled Students</h1>
              </div>
              <div className="text-md ">
                <EnrolledStudentsTable
                  modules={course?.modules?.length}
                  enrollments={enrollments}
                />
              </div>
            </div>
          </div>
        )}
      </>

      <Dialog
        open={open}
        size="xs"
        handler={() => setOpen(false)}
        sx={{ zIndex: 1 }}
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h5">
              Add Chapter
            </Typography>
          </DialogHeader>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <DialogBody>
          <div>
            <form
              // onSubmit={handleSubmit}
              className="grid gap-3"
            >
              <Input
                onChange={(e) => setChapter(e.target.value)}
                label="Name"
                value={chapter}
              />
              <TimeInput maxTime={timeFormat} onTimeChange={handleTimeChange} />
            </form>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="gray"
            type="submit"
            onClick={() => handleAddChapter()}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default CourseOverview;
