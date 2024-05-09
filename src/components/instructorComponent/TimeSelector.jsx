import React, { useEffect, useState } from "react";

const VideoTimePicker = ({ maxTime, onTimeChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleInputChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0;

    switch (type) {
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
      default:
        break;
    }
  };

  // Function to format time values with leading zeros
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  if (maxTime) {
    var [hr, min, ss] = maxTime.split(":").map((part) => parseInt(part, 10));

    
  }

  if (onTimeChange ) {
    const data = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    onTimeChange(
      data
    );
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Hours:
          <input
            type="number"
            // max={maxTime ? Number(hr) : 0}
            max={24}
            min={0}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={hours}
            onChange={(e) => handleInputChange(e, "hours")}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Minutes:
          <input
          
            // max={maxTime ? Number(min) : 0}
            max={59}
            maxLength={2}
            min={0}
            type="number"
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={minutes}
            onChange={(e) => handleInputChange(e, "minutes")}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          Seconds:
          <input
            // max={maxTime ? Number(ss) : 0}
            max={59}
            min={0}
            type="number"
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={seconds}
            onChange={(e) => handleInputChange(e, "seconds")}
          />
        </label>
      </div>
      <p className="text-lg font-semibold">
        Selected Time: {formatTime(hours)}:{formatTime(minutes)}:
        {formatTime(seconds)}
      </p>
      <p className="text-lg font-semibold">
        Max Length : {maxTime}
      </p>
    </div>
  );
};

export default VideoTimePicker;
