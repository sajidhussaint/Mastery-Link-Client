import { GridLoader } from "react-spinners";

const SpinnerMain = () => {
  return (
    <div className="fixed top-0 left-0 z-10 w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
        {/* <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full animate-pulse bg-green-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-green-500"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-green-400"></div>
        </div> */}
        <GridLoader
          color="#0d9739"
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default SpinnerMain;
