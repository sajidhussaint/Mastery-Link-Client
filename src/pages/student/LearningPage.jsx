import React, { useEffect, useState } from "react";
import Navbar from "../../components/StudentComponent/Navbar";
import { getEnrolledCourse } from "../../api/studentApi";
import Modules from "./Modules";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LearningPage = () => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const [course, setCourse] = useState();
  const [progression, setProgression] = useState([]);

  const getCourse = async () => {
    try {
      const response = await getEnrolledCourse(
        location.state.courseId,
        user._id
      );
      if (response) {
        console.log(response.courseId);
        setCourse(response.courseId);
        setProgression(response.progression);
        //   setNotes(response.notes);
        //   setEnrolledId(response.id);
        // dispatch(selectCourseActions.selectCourse(response));
        //   socket.emit("join-room", { courseId: response?.courseId.id });
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
          {/* <TabContent courseId={enrolledId} notes={notes} socket={socket} /> */}
        </div>
      </div>
    </>
  );
};

export default LearningPage;
