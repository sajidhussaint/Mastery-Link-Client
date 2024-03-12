import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const WalletHistory = () => {
  const instructor = useSelector((state) => state.instructor.instructor);
  const [walletHistory, setWalletHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    if (instructor?.walletHistory) {
      setWalletHistory(instructor.walletHistory);
    }
  }, [instructor]); // Added instructor to the dependency array

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = walletHistory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => paginate(index),
  });

  const next = () => {
    if (currentPage === Math.ceil(walletHistory.length / itemsPerPage)) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full h-full">
      <InstructorNavbar />
      <div className="p-4 md:p-8 lg:p-12 xl:p-16">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Wallet Balance : ₹{instructor?.wallet}
          </h1>
        </div>
        <div className="relative  shadow-md sm:rounded-sm  h-80">
          <table className="w-full text-sm text-left text-gray-500 pr-6 ">
            <thead className="text-xs text-gray-700 uppercase bg-sky-800 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((history, index) => (
                  <tr key={index} className="bg-white border-b font-medium ">
                    <td className="px-6 py-4 cursor-pointer text-blue-800 hover:underline">
                      {moment(history.date).format("LL")}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-black">
                      {history.amount}
                    </td>
                    <td className="px-6 py-4">{history.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 font-semibold">
                    No history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {walletHistory.length > itemsPerPage && (
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={currentPage === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array.from(
                  { length: Math.ceil(walletHistory.length / itemsPerPage) },
                  (_, index) => (
                    <IconButton key={index} {...getItemProps(index + 1)}>
                      {index + 1}
                    </IconButton>
                  )
                )}
              </div>
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={
                  currentPage === Math.ceil(walletHistory.length / itemsPerPage)
                }
              >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletHistory;
