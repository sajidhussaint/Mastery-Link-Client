import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import ChatBody from "../../components/StudentComponent/chat/ChatBody";
import { useState, useEffect, useRef } from "react";
// import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../components/socket/socket";
import ChatFooter from "../../components/StudentComponent/chat/ChatFooter";
import { getMyCourses } from "../../api/instructorApi";
import { selectCourseActions } from "../../redux/selectedCourseSlice";

const InstructorChat = () => {
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.instructor.instructor);
  const response = useSelector((state) => state.selectedCourse.course);
  const course = response?.courseId;

  const lastMessageRef = useRef(null);

  socket.emit("join-room", {
    courseId:
      //  response?.courseId.id
      selectedCourse,
  });

  const getAllMessages = async () => {
    const courseList = await getMyCourses();
    setCourses(courseList);
    socket.emit("get-all-messages", {
      courseId:
        //  course?.id
        selectedCourse,
    });
    socket.on("get-course-response", (messages) => {
      console.log(messages, "real message");
      if (!messages) {
        console.log("not working");
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
      console.log(messages, "final data");
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
      <InstructorNavbar />
      <div className="  shadow-lg rounded-lg  ">
        <div className="flex flex-row justify-between  ">
          <div className="flex flex-col w-2/6 border-r-2   h-screen">
            {courses &&
              courses.map((course) => (
                <div
                  className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer ${
                    course.id === selectedCourse ? "bg-green-100" : "bg-white"
                  }`}
                  onClick={() => handleSelectCourse(course.id)}
                >
                  <div className="w-1/4">
                    <img
                      src={course?.image}
                      className="object-cover h-12 w-12 rounded-md"
                      alt={course.name}
                    />
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

          <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <ChatBody
              lastMessageRef={lastMessageRef}
              messages={messages}
              user={user}
            />
            <ChatFooter socket={socket} user={user} isInstructor={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorChat;
