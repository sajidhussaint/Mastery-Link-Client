import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import ChatBody from "../../components/StudentComponent/chat/ChatBody";
import { useState, useEffect, useRef } from "react";
// import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { socket } from "../../components/socket/socket";
import ChatFooter from "../../components/StudentComponent/chat/ChatFooter";
import { getMyCourses } from "../../api/instructorApi";

const InstructorChat = () => {
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("657835bea15a220603e8f8ee");

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
  }, [messages,selectedCourse]);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log(data, "final data");
      const newMessage = data.message;
      setMessages([...messages, newMessage]);
    });
  }, [socket, messages,selectedCourse]);
  console.log(selectedCourse, "zzzzzzz");
  const handleSelectCourse = (id) => {
    setSelectedCourse(id);
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
                  className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer  {if(${course.id}==${selectedCourse}{
                    bg-blue-gray-100
                  })}`}
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
