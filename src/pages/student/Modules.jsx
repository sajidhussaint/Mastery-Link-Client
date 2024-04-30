import React, { useEffect, useRef, useState } from "react";
import { Steps } from "antd";
import { Player, BigPlayButton } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import PlayerSkelton from "../../components/common/utils/PlayerSkelton";
import { addProgression } from "../../api/studentApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCourseActions } from "../../redux/selectedCourseSlice";
import { selectModuleActions } from "../../redux/SelectedModuleSlice";
import { FaCheckCircle } from "react-icons/fa";

const Modules = ({ modules }) => {
  const [current, setCurrent] = useState(Infinity);
  const [selectedModule, setSelectedModule] = useState([]);

  const dispatch = useDispatch();

  const selectedCourse = useSelector((state) => state.selectedCourse.course);
  const chapters = useSelector((state) => state.selectedModule.chapter);
  const playerRef = useRef(null);

  const seek = (seconds) => {
    playerRef.current.seek(seconds);
  };
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
    seek(chapters[value].seconds);
  };

  // Function to handle video end event
  const handleVideoEnd = async (moduleId) => {
    console.log(selectedCourse?.id, "selected", moduleId);
    const response = await addProgression(
      selectedCourse?.courseId.id,
      moduleId
    );

    if (response) {
      dispatch(selectCourseActions.addModule(moduleId));
    }

    // console.log(ModuleId); // true or false
    // modules = modules.map((module) =>
    //   module.module.id === ModuleId
    //     ? {
    //         ...module,
    //         module: { ...module.module, isCompleted: true }, // Spread the module and update its isCompleted field
    //       }
    //     : module
    // );
    // console.log(modules);
    // setCurrent(0)
    // // Do something when the video ends
  };

  const addChapter = (module) => {
    const chapterObjects = module.chapters.map((data) => ({
      title: data.chapter,
      subTitle: data.duration,
      status: "wait",
      seconds: data.seconds,
    }));
    dispatch(selectModuleActions.selectChapter(chapterObjects));
    return chapterObjects;
  };

  const playVideo = (module) => {
    setSelectedModule(module);
    dispatch(selectModuleActions.selectModule(module));
  };
  useEffect(() => {
    if (modules) {
      addChapter(modules[0].module);
    }
  }, [modules]);

  return (
    <div className="container mx-auto">
      {modules ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 animate-fade animate-ease-in-out">
          {/* Switched order of the components */}
          <div className="col-span-1  md:h-[70vh] bg-slate-50  pb-5 shadow-slate-400 shadow-md overflow-y-auto">
            <div className=" ">
              <h1 className="px-4 font-bold">Modules</h1>
              {/* Module list content */}
              {/* {modules && modules.length > 0&& setChapter(addChapter(modules[0]))} */}
              {modules && modules.length > 0 ? (
                modules.map((currentModule, index) => (
                  <>
                    <div className="flex flex-col" key={index}>
                      <div
                        className={`w-full flex flex-row items-center ${
                          index == 0 &&
                          selectedModule.length == 0 &&
                          "bg-green-100"
                        } ${
                          selectedModule.id == currentModule.module.id &&
                          "bg-green-100"
                        }`}
                      >
                        <div className="w-2/12 flex justify-center  items-center flex-row my-5 ">
                          {selectedCourse?.progression?.includes(
                            typeof currentModule.module === "object"
                              ? currentModule.module.id
                              : ""
                          ) ? (
                            <FaCheckCircle color="green" />
                          ) : (
                            <i className="fa-regular fa-circle-check"></i>
                          )}
                        </div>

                        <div className="w-8/12 cursor-pointer">
                          <button
                            className="font-semibold"
                            onClick={() => {
                              playVideo(currentModule.module);

                              // dispatch(
                              //   selectModuleActions.selectChapter(
                              //     currentModule.module.chapters
                              //   )
                              // );
                              addChapter(currentModule?.module);
                              console.log("selop", currentModule.module.name);
                              // addDescription(currentModule.module.description);
                            }}
                          >
                            {currentModule.module.name}
                          </button>
                        </div>
                        <div className="w-2/12">
                          <h3 className="font-semibold">
                            {currentModule.module.duration}
                          </h3>
                        </div>
                      </div>
                      <hr className="h-[2px] bg-slate-300" />
                    </div>
                  </>
                ))
              ) : (
                <div className="w-full flex justify-center items-center h-16">
                  <h1 className="font-bold">No modules found</h1>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 h-auto md:h-[70vh] flex justify-center items-center ">
            {modules && (
              <Player
                ref={playerRef}
                playsInline
                height={425}
                fluid={false}
                src={
                  selectedModule.module
                    ? selectedModule.module
                    : modules[0].module.module
                }
                startTime={0}
                autoHide={true}
                // Add event listener for video end
                onEnded={() => {
                  handleVideoEnd(
                    selectedModule.length > 0
                      ? selectedModule.id
                      : modules[0].module.id
                  );
                }}
              >
                
                <BigPlayButton position="center" />
              </Player>
            )}
          </div>
        </div>
      ) : (
        <PlayerSkelton />
      )}

      <div>
        {selectedModule && chapters?.length > 1 && (
          <Steps
            type="navigation"
            size="small"
            current={current}
            onChange={onChange}
            className="site-navigation-steps "
            items={chapters}
            responsive={true}
            colorPrimary="#ff4d4f"
            
          />
        )}
      </div>
    </div>
  );
};

export default Modules;
