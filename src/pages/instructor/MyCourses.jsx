import { useEffect, useState } from "react"
import SingleCourse from "../../components/instructorComponent/SingleCourse"
import { getMyCourses } from "../../api/instructorApi"
import CardSkeleton from "../../components/common/utils/CardSkeleton"

const MyCourses = () => {
  const [courses, setCourses] = useState([])
  const [loader, setLoader] = useState(true)

  const myCourses = async () => {
    setLoader(true)
    const response = await getMyCourses()
    setCourses(response)
    setLoader(false)
  }

  useEffect(() => {
    myCourses()
  }, [])

  return (
    <div className="container mx-auto px-5 md:px-20 my-24 bg-white">
      <h1 className="text-2xl font-bold">My courses</h1>
      <div className="mt-4 md:flex-none flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {courses.map(course => (
            <SingleCourse course={course} />

          ))}

          {loader && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyCourses
