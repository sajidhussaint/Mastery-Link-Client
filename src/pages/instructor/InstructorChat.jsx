import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import ChatBody from "../../components/StudentComponent/chat/ChatBody";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../components/socket/socket";
import ChatFooter from "../../components/StudentComponent/chat/ChatFooter";
import { getMyCourses } from "../../api/instructorApi";
import { selectCourseActions } from "../../redux/selectedCourseSlice";

const InstructorChat = () => {
  const Instructor = useSelector((store) => store.instructor.instructor);
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();

  const dispatch = useDispatch();
  // dispatch(selectCourseActions.selectCourse({ courseId: { id: id } }));

  const instructor = useSelector((state) => state.instructor.instructor);

  useEffect(() => {
    dispatch(
      selectCourseActions.selectCourse({
        courseId: { id: instructor.courses[0] },
      })
    );
    setSelectedCourse(instructor.courses[0]);
  }, []);


  const lastMessageRef = useRef(null);

  socket.emit("join-room", {
    courseId:
      //  response?.courseId.id
      selectedCourse,
  });

  const getAllMessages = async () => {
    const courseList = await getMyCourses(Instructor?._id);
    setCourses(courseList);
    socket.emit("get-all-messages", {
      courseId:
        //  course?.id
        selectedCourse,
    });
    socket.on("get-course-response", (messages) => {
      if (!messages) {
      }
      if (
        messages?.courseId ===
        //  course?.id
        selectedCourse
      ) {
        setMessages(messages.messages);
      }
    });
  };

  useEffect(() => {
    getAllMessages();
  }, [selectedCourse]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedCourse]);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      const newMessage = data.message;

      setMessages([...messages, newMessage]);
    });
  }, [socket, messages, selectedCourse]);
  const handleSelectCourse = (id) => {
    setMessages([]);
    setSelectedCourse(id);
    dispatch(selectCourseActions.selectCourse({ courseId: { id: id } }));
  };

  return (
    <>
      {/* <div className="  shadow-lg rounded-lg  "> */}

      <InstructorNavbar />

      <div className="flex h-screen bg-gray-100">
        {/* sidebar */}
        <div className="  md:flex flex-col w-36 bg-gray-100 md:w-80 border">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {courses &&
              courses.map((course) => (
                <div
                  className={`animate-fade animate-ease-in-out flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer ${
                    course.id === selectedCourse ? "bg-green-100" : "bg-white"
                  }`}
                  onClick={() => handleSelectCourse(course.id)}
                >
                  <div className="w-1/4 ">
                    {course?.image ? (
                      <img
                        src={course.image}
                        alt=""
                        className="object-cover h-6 w-6  md:h-12 md:w-12 rounded-md"
                      />
                    ) : (
                      <img
                        src="/images/dummy_img.jpg"
                        alt=""
                        className="object-cover h-6 w-6  md:h-12 md:w-12 rounded-md "
                      />
                    )}
                  </div>
                  <div className="w-full">
                    <div className="text-xs sm:text-sm md:text-md font-semibold">
                      {course.name}
                    </div>
                    <span className="text-gray-500 text-xs sm:text-sm md:text-md">
                      {course.category.category}
                    </span>
                  </div>
                </div>
              ))}
            {/* <nav className="flex-1 px-2 py-4 bg-gray-800">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Messages
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Settings
              </a>
            </nav> */}
          </div>
        </div>
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
            <p className="mt-2 text-gray-600">
              This is an example dashboard using Tailwind CSS.
            </p> */}
          {selectedCourse && courses.length > 0 && (
            <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden animate-fade animate-ease-in-out ">
              <ChatBody
                lastMessageRef={lastMessageRef}
                messages={messages}
                user={instructor}
              />
              <ChatFooter
                socket={socket}
                user={instructor}
                isInstructor={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* <div className="flex flex-row justify-between  h-screen">
        <div className="flex flex-col w-2/6 border-r-2    mb-28 ">
          {courses &&
            courses.map((course) => (
              <div
                className={`animate-fade animate-ease-in-out flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer ${
                  course.id === selectedCourse ? "bg-green-100" : "bg-white"
                }`}
                onClick={() => handleSelectCourse(course.id)}
              >
                <div className="w-1/4">
                {course?.image ? (
                <img
                  src={course.image}
                  alt=""
                  className="object-cover h-12 w-12 rounded-md"
                />
              ) : (
                <img
                  src='/images/dummy_img.jpg'
                  alt=""
                  className="object-cover h-12 w-12 rounded-md"
                />
              )}
                  
                </div>
                <div className="w-full">
                  <div className="text-md font-semibold">{course.name}</div>
                  <span className="text-gray-500">
                    {course.category.category}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {selectedCourse && courses.length > 0 && (
          <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden animate-fade animate-ease-in-out ">
            <ChatBody
              lastMessageRef={lastMessageRef}
              messages={messages}
              user={instructor}
            />
            <ChatFooter socket={socket} user={instructor} isInstructor={true} />
          </div>
        )}
      </div> */}
    </>
  );
};

export default InstructorChat;
