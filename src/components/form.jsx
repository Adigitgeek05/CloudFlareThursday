"use client";
import React, { useState } from "react";

function MeetingForm({ type = "meet" }) {
  const [formData, setFormData] = useState({
    meetingLink: "",
    passcode: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.meetingLink) {
      setError("Meeting link is required");
      return;
    }
    if (type === "zoom" && !formData.passcode) {
      setError("Passcode is required for Zoom meetings");
      return;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleInputChange}
            placeholder={`Enter ${
              type === "meet" ? "Google Meet" : "Zoom"
            } link`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-roboto"
          />
        </div>

        {type === "zoom" && (
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

        {error && (
          <div className="text-red-500 text-sm font-roboto">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-roboto"
        >
          Join Meeting
        </button>
      </form>
    </div>
  );
}


export default MeetingForm;