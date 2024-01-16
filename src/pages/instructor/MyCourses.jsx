import { useEffect, useState } from "react";
import SingleCourse from "../../components/instructorComponent/SingleCourse";
import { getMyCourses } from "../../api/instructorApi";
import CardSkeleton from "../../components/common/utils/CardSkeleton";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);

  const myCourses = async () => {
    setLoader(true);
    const response = await getMyCourses();
    setCourses(response);
    setLoader(false);
  };

  useEffect(() => {
    myCourses();
  }, []);

  return (
    <>
      <InstructorNavbar />
      <div className="   bg-gradient-to-bl from-green-100 via-transparent">
        <h1 className="  text-2xl font-bold px-5 md:px-20">My courses</h1>
        <div className="mt-4 md:flex-none flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {courses.map((course) => (
              <SingleCourse course={course} />
            ))}

            {loader && (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;
