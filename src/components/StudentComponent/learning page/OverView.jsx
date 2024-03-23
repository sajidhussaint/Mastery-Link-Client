import { useVideo } from "./VideoContext";
import { useSelector } from "react-redux";

const Overview = () => {
  const course = useSelector((state) => state.selectedCourse.course.courseId);
  const chapter = useSelector((state) => state.selectedModule.module);

  const { handleSeek } = useVideo();

  return (
    <div className="text-black p-5">
      <h1 className="font-bold">Description</h1>
      <p className="mt-5">{course?.description}</p>
      <p className="mt-2 italic">{chapter?.description}</p>
    </div>
  );
};

export default Overview;
