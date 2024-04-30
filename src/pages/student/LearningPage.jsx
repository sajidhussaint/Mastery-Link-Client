import React, { useEffect, useState } from "react";
import Navbar from "../../components/StudentComponent/Navbar";
import TabContent from "../../components/StudentComponent/learning page/TabContent";
import Modules from "./Modules";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../components/socket/socket";
import { selectCourseActions } from "../../redux/selectedCourseSlice";
import { useQuery } from "@tanstack/react-query";
import { getEnrolledCourse } from "../../api/studentApi";
import PlayerSkelton from "../../components/common/utils/PlayerSkelton";

const LearningPage = () => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  // const [course, setCourse] = useState();
  // const [notes, setNotes] = useState([]);
  // const [enrolledId, setEnrolledId] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["enrolledCourse", location.state.courseId],
    queryFn: () => getEnrolledCourse(location.state.courseId, user._id),
  });

  if (data) {
    dispatch(selectCourseActions.selectCourse(data));
    socket.emit("join-room", { courseId: data?.courseId.id });
  }
  // useEffect(() => {
  //   if (data) {
  //     setCourse(data.courseId);
  //     setNotes(data.notes);
  //     setEnrolledId(data.id);
  //     dispatch(selectCourseActions.selectCourse(data));
  //     socket.emit("join-room", { courseId: data?.courseId.id });
  //   }
  // }, [data, dispatch]);

  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="pt-20">
          <PlayerSkelton />
        </div>
      </>
    );
  if (error) return `An error occurred: ${error.message}`;

  return (
    <>
      <Navbar />
      <div className="pt-20 text-black  ">
        <Modules modules={data?.courseId?.modules} />
        <div className="mt-6">
          <TabContent courseId={data?.id} notes={data?.notes} socket={socket} />
        </div>
      </div>
    </>
  );
};

export default LearningPage;
