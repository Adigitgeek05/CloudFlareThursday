import React, { useState } from "react";
import { useStore } from "../utils/store";
import { GiIronCross } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function MeetingForm({ type = "schedule" }) {
  const { showMeetForm, setShowMeetForm } = useStore();
  const [formData, setFormData] = useState({
    meetingLink: "",
    passcode: "",
    time: "",
    date: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = async () => {
    if (!formData.meetingLink) {
      setError("Meeting link is required");
      return;
    }
    if (showMeetForm === "zoom" && !formData.passcode) {
      setError("Passcode is required for Zoom meetings");
      return;
    }

    try {
      console.log("submitting form");
      const endpoint = type === "schedule" ? "/schedule-meet" : "/join-meet";
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingId: formData.meetingLink,
          passcode: formData.passcode,
          date: formData.date,
          time: formData.time,
        }),
      });
      if (!response.ok) throw new Error('Failed to process request');
      setShowMeetForm("");
    } catch (err) {
      setError(err.message);
    }
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="bg-white relative rounded-lg shadow-sm p-6">
      <button
        className="absolute top-2 right-2"
        onClick={() => setShowMeetForm("")}
      >
        <IoMdClose />
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleInputChange}
            placeholder={`Enter ${
             showMeetForm === "gmeet" ? "Google Meet" : "Zoom"
            } link`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-roboto"
          />
        </div>

        {showMeetForm === "zoom" && (
          <div>
            <input
              type="text"
              name="passcode"
              value={formData.passcode}
              onChange={handleInputChange}
              placeholder="Enter Zoom passcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-roboto"
            />
          </div>
        )}
        {type === "schedule" && (
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="p-2 border rounded-md"
                />
              </div>
            </div>
          )}
    
       

        <button
          type="submit"
          
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-roboto"
        >
          {type==="schedule" ? "Schedule" : "Join Meeting"}
        </button>
      </form>
    </div>
  );
}

export default MeetingForm;
