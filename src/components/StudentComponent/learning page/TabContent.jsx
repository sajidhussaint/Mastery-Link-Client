import { Tabs, Tab } from "./Tabs";
import ChatPage from "../chat/ChatPage";
import React from "react";
import Notes from "./Notes";
import Overview from "./OverView";

const TabContent = ({ courseId, notes, socket }) => {
  return (
    <div className="pb-10">
      <Tabs>
        <Tab label="Course overview">
          <div className="py-4">
            <Overview />
          </div>
        </Tab>
        <Tab label="Chat room">
          <div className="container shadow-md border border-slate-300">
            <div className="h-[70vh] ">
              <ChatPage socket={socket} />
            </div>
          </div>
        </Tab>
        <Tab label="Notes">
          <div className="py-4">
            <Notes courseId={courseId} notes={notes} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabContent;
