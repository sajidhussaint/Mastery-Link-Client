import React from "react";
import moment from "moment";

const EnrolledStudentsTable = ({ modules, enrollments }) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-md mt-5 sm:w-4/5 w-full ">
      <table className="w-full text-sm text-left text-gray-500 pr-6 bg-green-700">
        <thead className="text-xs text-white uppercase bg-sky-800 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Student Name
            </th>
            <th scope="col" className="px-6 py-3">
              Enrolled Date
            </th>
            <th scope="col" className="px-6 py-3">
              Progression
            </th>
          </tr>
        </thead>
        <tbody>
          {enrollments &&
            enrollments.map((enrollment) => (
              <tr key={enrollment.id} className="bg-white border-b font-medium">
                <td className="px-6 py-4 cursor-pointer text-blue-800 hover:underline">
                  {typeof enrollment.studentId === "object"
                    ? enrollment.studentId.firstname +
                      " " +
                      enrollment.studentId.lastname
                    : enrollment.studentId}
                </td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {/* {course.description} */}
                  {enrollment.date &&
                    moment(enrollment.date).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                  {(enrollment.progression?.length / modules) * 100}
                  {""}%
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledStudentsTable;
