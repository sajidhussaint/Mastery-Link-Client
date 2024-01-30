import React, { useEffect, useRef, useState } from "react";
import { Steps } from "antd";
import { Player, BigPlayButton, ControlBar } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";

const Modules = ({ modules, progression }) => {
  const [current, setCurrent] = useState(0);
  const [selectedModule, setSelectedModule] = useState([]);
  const [chapters, setChapter] = useState([]);

  const seek = (seconds) => {
    playerRef.current.seek(seconds);
  };
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
    seek(chapters[value].seconds);
  };

  const playerRef = useRef(null);

  const end = () => {
    const { player } = playerRef.current.getState();
    console.log(player.ended); //true or false
  };

  const addChapter = (module) => {
    const chapterObjects = module.chapters.map((data) => ({
      title: data.chapter,
      subTitle: data.duration,
      status: "wait",
      seconds: data.seconds,
    }));
    return chapterObjects;
  };

  const playVideo = (module) => {
    setSelectedModule(module);
    setChapter(addChapter(module));
  };

  useEffect(() => {
    if (modules) {
      playVideo(modules[0]);
      console.log("use efff");
      console.log(modules[0].module);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {/* Switched order of the components */}
        <div className="col-span-1 h-auto md:h-[70vh] bg-slate-50 overflow-hidden pb-5 shadow-slate-400 shadow-md">
          <div className="h-14 bg-slate-200 flex items-center">
            <h1 className="px-4 font-bold">Modules</h1>
          </div>
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-slate-900 dark:scrollbar-track-gray-300 h-full">
            {/* Module list content */}
            {modules && modules.length > 0 ? (
              modules.map((currentModule) => (
                <div className="flex flex-col">
                  <div className="w-full flex flex-row items-center">
                    <div className="w-2/12 flex justify-center  items-center flex-row my-6">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>

                    <div className="w-8/12 cursor-pointer">
                      <button
                        className="font-semibold"
                        onClick={() => playVideo(currentModule.module)}
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
              // poster="/assets/poster.png"
              height={425}
              fluid={false}
              // src={modules?.module}
              src={
                selectedModule.module
                  ? selectedModule.module
                  : modules[0].module.module
              }
              // src="https://masterylink.s3.ap-south-1.amazonaws.com/courses/module/lukkkdcv/file_example_MP4_480_1_5MG.mp4"
              startTime={0}
              autoHide={true}
            >
              <BigPlayButton position="center" />
              {console.log(modules[0].module.module, "ffff")}
            </Player>
          )}
        </div>
        <button onClick={() => seek(14)} className="mr-3">
          seeek
        </button>
        <button onClick={end} className="mr-3">
          complete
        </button>
      </div>
      <div>
        {selectedModule && (
          <Steps
            type="navigation"
            size="small"
            current={current}
            onChange={onChange}
            className="site-navigation-steps"
            items={
              chapters
              //   [
              //   {
              //     title: "Step 2",
              //     subTitle: "00:01:02",
              //     status: "process",
              //   },
              //   {
              //     title: "Step 3",
              //     subTitle: "waiting for longlong time",
              //     status: "wait",
              //   },
              //   {
              //     title: "Step 3",
              //     subTitle: "waiting for longlong time",
              //     status: "wait",
              //   },
              // ]
            }
          />
        )}
      </div>
    </div>
  );
};

export default Modules;
