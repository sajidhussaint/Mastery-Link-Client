import React from "react"
import { useNavigate } from "react-router-dom"

const SingleCourse = ({ course }) => {
  const navigate = useNavigate()
  return (
    <div className="max-w-[270px] bg-white border border-gray-200 rounded-sm shadow">
      <div className=" flex justify-center ">
        <img
          className="rounded-t-sm h-44 object-cover"
          src={course.image ? course.image : "/image not found.png"}
          alt="product image"
        />
      </div>
      <div className="px-4 pb-4">
        <div>
          <h5 className="text-lg font-bold tracking-tight text-gray-900">
            {course.name}
          </h5>
          <div className="pb-2">
            <p className="truncate text-xs italic">
              {typeof course.category === "object"
                ? course.category.category
                : course.category}
            </p>
          </div>
        </div>
        <div className="pb-2">
          {course.approval === "approved" && (
            <h6 className="text-sm font-bold text-green-600">Aprroved</h6>
          )}
          {course.approval === "rejected" && (
            <h6 className="text-sm font-bold text-red-600">Rejected</h6>
          )}
          {course.approval === "pending" && (
            <h6 className="text-sm font-bold text-blue-600">Pending</h6>
          )}
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-md font-bold text-gray-900">
            ${course.price}
          </span>
          <button
            onClick={() => {
              navigate("/instructor/course-overview", {
                state: { courseId: course.id }
              })
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-3 py-1 text-center"
          >
            View course
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleCourse
