import { useVideo } from "./VideoContext";
import { useSelector } from "react-redux";

const Overview = () => {
  const module = useSelector((state) => state.selectedCourse.module);
  const { handleSeek } = useVideo();

  return (
    <div className="text-black p-5">
      <h1 className="font-bold">Description</h1>
      <p>{module?.description}</p>

      {/* <button onClick={() => handleSeek(6)}>Skip to 30 seconds</button>
      <button onClick={() => handleSeek(3)}>Skip to 60 seconds</button> */}
    </div>
  );
};

export default Overview;
