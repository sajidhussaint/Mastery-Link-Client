import React from "react";
import moment from "moment";

const ChatBody = ({ messages, user, lastMessageRef }) => {
  return (
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
      
      {/*  */}
      {messages &&
        messages.map((messaage, index) =>
          messaage.firstname !== user?.firstname &&
          messaage.lastname !== user?.lastname ? (
            <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex justify-center items-center">
                <h1 className="text-center font-bold uppercase">
                  {messaage.firstname.charAt(0)}
                </h1>
              </div>

              <div>
                <div
                  className={`${
                    messaage.isInstructor ? "bg-blue-300" : "bg-gray-300"
                  } p-3 rounded-r-lg rounded-bl-lg`}
                >
                  <h1 className="font-bold italic pb-2 text-sm">
                    {messaage.firstname} {messaage.lastname}
                  </h1>
                  <p className="text-sm">{messaage.message} </p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  {moment(messaage.createdAt).fromNow()}
                </span>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
            >
              <div>
                <div
                  className={`${
                    messaage.isInstructor ? "bg-blue-300" : "bg-green-600"
                  } p-3 rounded-r-lg rounded-bl-lg`}
                >
                  <h1 className="font-bold italic pb-2 text-sm">{messaage.firstname}</h1>
                  <p className="text-sm">{messaage.message}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  {moment(messaage.createdAt).fromNow()}
                </span>
              </div>
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100  flex justify-center items-center">
                <h1 className="text-center font-bold uppercase">
                  {messaage.firstname.charAt(0)}
                </h1>
              </div>
            </div>
          )
        )}
      <div ref={lastMessageRef} />
      {/*  */}
    </div>
  );
};

export default ChatBody;
