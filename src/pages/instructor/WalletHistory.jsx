import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import InstructorNavbar from "../../components/instructorComponent/InstructorNavbar";

const WalletHistory = () => {
  const instructor = useSelector((state) => state.instructor.instructor);
  const [walletHistory, setWalletHistory] = useState([]);

  useEffect(() => {
    if (instructor?.walletHistory) {
      setWalletHistory(instructor.walletHistory);
    }
  }, [instructor]); // Added instructor to the dependency array

  return (
    <div className="w-full h-full">
      <InstructorNavbar />
      <div className="p-4 md:p-8 lg:p-12 xl:p-16">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Wallet Balance : ₹{instructor?.wallet}
          </h1>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-sm mt-14">
          <table className="w-full text-sm text-left text-gray-500 pr-6">
            <thead className="text-xs text-white uppercase bg-sky-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {walletHistory.length > 0 ? (
                walletHistory.map((history, index) => (
                  <tr key={index} className="bg-white border-b font-medium">
                    <td className="px-6 py-4 cursor-pointer text-blue-800 hover:underline">
                      {moment(history.date).format('LL')}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
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
      </div>
    </div>
  );
};

export default WalletHistory;
