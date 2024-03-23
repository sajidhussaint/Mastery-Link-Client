import { useState, useEffect, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
// import { Socket } from "socket.io-client";
import { useSelector } from "react-redux";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  const user = useSelector((state) => state.user.user);
  const response = useSelector((state) => state.selectedCourse.course);
  const course = response?.courseId;
  const lastMessageRef = useRef(null);
  

  const getAllMessages = async () => {
    socket.emit("get-all-messages", { courseId:
       course?.id 
      // '657835bea15a220603e8f8ee'
      });
    socket.on("get-course-response", (messages) => {
      
      if (messages?.courseId === 
        course?.id
        // '657835bea15a220603e8f8ee'
        ) {
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
    <div className="w-full h-full flex flex-col  rounded-sm">
      <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <ChatBody
          lastMessageRef={lastMessageRef}
          messages={messages}
          user={user}
        />
        <ChatFooter socket={socket} user={user} />
      </div>
    </div>
  );
};

export default ChatPage;
