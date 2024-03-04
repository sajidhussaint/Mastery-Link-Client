import React, { useEffect, useState } from "react";
import Navbar from "../../components/StudentComponent/Navbar";
import TabContent from "../../components/StudentComponent/learning page/TabContent";
import { getEnrolledCourse } from "../../api/studentApi";
import Modules from "./Modules";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../components/socket/socket";
import { selectCourseActions } from "../../redux/selectedCourseSlice";

const LearningPage = () => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const [course, setCourse] = useState();
  const [progression, setProgression] = useState([]);
  const [notes, setNotes] = useState([]);
  const [enrolledId, setEnrolledId] = useState("");

  const getCourse = async () => {
    try {
      const response = await getEnrolledCourse(
        location.state.courseId,
        user._id
      );
      if (response) {
        setCourse(response.courseId);
        setProgression(response.progression);
        setNotes(response.notes);
        setEnrolledId(response.id);
        dispatch(selectCourseActions.selectCourse(response));
        socket.emit("join-room", { courseId: response?.courseId.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
    return () => {};
  }, []);
  return (
    <>
      <Navbar />
      <div className="pt-20 text-black ">
        <Modules modules={course?.modules} progression={progression} />
        <div className="mt-6">
          <TabContent courseId={enrolledId} notes={notes} socket={socket} />
        </div>
      </div>
    </>
  );
};

export default LearningPage;
