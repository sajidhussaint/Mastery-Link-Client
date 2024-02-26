import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import ChatBody from "../../components/StudentComponent/chat/ChatBody";
import { useState, useEffect, useRef } from "react";
// import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { socket } from "../../components/socket/socket";
import ChatFooter from "../../components/StudentComponent/chat/ChatFooter";

const InstructorChat = () => {
  const [messages, setMessages] = useState([]);

  const user = useSelector((state) => state.instructor.instructor);
  const response = useSelector((state) => state.selectedCourse.course);
  const course = response?.courseId;
  console.log(course, "ayoooo");
  const lastMessageRef = useRef(null);
  socket.emit("join-room", { courseId: response?.courseId.id });

  const getAllMessages = async () => {
    socket.emit("get-all-messages", { courseId: course?.id });
    socket.on("get-course-response", (messages) => {
      console.log("runnn get course socket");
      if (messages?.courseId === course?.id) {
        setMessages(messages.messages);
      }
    });
  };

  useEffect(() => {
    getAllMessages();
  }, []);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log(data, "final data");
      const newMessage = data.message;
      setMessages([...messages, newMessage]);
    });
  }, [socket, messages]);
  return (
    <>
      <InstructorNavbar />
      <div className="  shadow-lg rounded-lg  ">
        <div className="flex flex-row justify-between  ">
          <div className="flex flex-col w-2/6 border-r-2   bg-blue-gray-400 h-screen">
            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-md"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Python</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-md"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Python</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-md"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Python</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>
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
