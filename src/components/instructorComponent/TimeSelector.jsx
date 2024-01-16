import React, { useState, useEffect } from "react";

const TimeInput = ({ maxTime, onTimeChange }) => {
  const [selectedTime, setSelectedTime] = useState("00:00:00");
  const [error, setError] = useState("");

  const handleTimeChange = (event) => {
    setError("");
    const newTime = event.target.value;

    // Validate if the entered time is not greater than the maximum time
    if (
      new Date(`1970-01-01T${newTime}Z`) > new Date(`1970-01-01T${maxTime}Z`)
    ) {
      setError(`Time should not exceed ${maxTime}`);
    } else {
      setSelectedTime(newTime);
      setError("");
      // Pass the selected time to the parent component using the callback
      onTimeChange(newTime);
    }
  };

  // useEffect to reset state when the component unmounts
  useEffect(() => {
    return () => {
      setSelectedTime("00:00:00");
      setError("");
    };
  }, []);

  // Function to reset state

  return (
    <div>
      <label htmlFor="timeInput" className="font-semibold">
        Select Time:
      </label>
      <input
        className="bg-slate-300 rounded-md shadow-lg placeholder:text-black placeholder:italic border px-4"
        type="time"
        id="timeInput"
        value={selectedTime}
        onChange={handleTimeChange}
        step="1"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Call resetState when the modal is closed */}
    </div>
  );
};

export default TimeInput;
