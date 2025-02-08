import React, { useState } from "react";
import { useStore } from "../utils/store";
import { IoMdClose } from "react-icons/io";

const MEETING_TYPES = {
  GMEET: "gmeet",
  ZOOM: "zoom"
};

const API_BASE_URL = "https://1065-2409-40c2-103f-63f5-59a1-ca4d-de21-3adb.ngrok-free.app";

const INITIAL_FORM_STATE = {
  meetingLink: "",
  passcode: "",
  time: "",
  date: "",
};

function MeetingForm({ type = "schedule" }) {
  const { showMeetForm, setShowMeetForm } = useStore();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function convertISTToUTC(date, time) {
    if (!date || !time) {
      throw new Error("Both date and time are required");
    }

    try {
      const istDateTime = new Date(`${date}T${time}:00+05:30`);
      if (isNaN(istDateTime.getTime())) {
        throw new Error("Invalid date or time format");
      }
      return istDateTime.toISOString();
    } catch (error) {
      throw new Error("Failed to convert date and time: " + error.message);
    }
  }

  const validateForm = () => {
    if (!formData.meetingLink?.trim()) {
      setError("Meeting link is required");
      return false;
    }

    if (showMeetForm === MEETING_TYPES.ZOOM && !formData.passcode?.trim()) {
      setError("Passcode is required for Zoom meetings");
      return false;
    }

    if (type === "schedule") {
      if (!formData.date) {
        setError("Date is required");
        return false;
      }
      if (!formData.time) {
        setError("Time is required");
        return false;
      }

      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
      if (selectedDateTime < new Date()) {
        setError("Selected date and time cannot be in the past");
        return false;
      }
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const endpoint = type === "schedule" ? "/schedule-meet" : "/join-meet";
      const scheduleTime = type === "schedule" 
        ? convertISTToUTC(formData.date, formData.time)
        : null;

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingId: formData.meetingLink.trim(),
          passcode: formData.passcode.trim(),
          type: showMeetForm,
          date: formData.date,
          time: formData.time,
          scheduleTime
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to process request');
      }

      setShowMeetForm("");
      setFormData(INITIAL_FORM_STATE);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="bg-white relative rounded-lg shadow-sm p-6">
      <button
        type="button"
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
        onClick={() => setShowMeetForm("")}
        aria-label="Close form"
      >
        <IoMdClose className="w-5 h-5" />
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="meetingLink" className="sr-only">
            {showMeetForm === MEETING_TYPES.GMEET ? "Google Meet" : "Zoom"} Link
          </label>
          <input
            id="meetingLink"
            type="text"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleInputChange}
            placeholder={`Enter ${
              showMeetForm === MEETING_TYPES.GMEET ? "Google Meet" : "Zoom"
            } link`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-roboto"
            disabled={isSubmitting}
          />
        </div>

        {showMeetForm === MEETING_TYPES.ZOOM && (
          <div>
            <label htmlFor="passcode" className="sr-only">
              Zoom Passcode
            </label>
            <input
              id="passcode"
              type="text"
              name="passcode"
              value={formData.passcode}
              onChange={handleInputChange}
              placeholder="Enter Zoom passcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-roboto"
              disabled={isSubmitting}
            />
          </div>
        )}

        {type === "schedule" && (
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-roboto disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            type === "schedule" ? "Schedule" : "Join Meeting"
          )}
        </button>
      </form>
    </div>
  );
}

export default MeetingForm;