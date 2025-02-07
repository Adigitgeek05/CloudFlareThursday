import { useState } from "react";
import { FaVideo } from "react-icons/fa";
import MeetingForm from "./components/form";
import { useStore } from "./utils/store";

export default function Hero() {
  const {showMeetForm, setShowMeetForm} = useStore();
  const [type, setType] = useState("");
  const [recentMeetings] = useState([
    {
      id: 1,
      type: "Google Meet",
      title: "Weekly Team Sync",
      time: "Today at 2:00 PM",
      participants: 8,
      icon: FaVideo,
    },
    {
      id: 2,
      type: "Zoom",
      title: "Client Presentation",
      time: "Yesterday at 11:00 AM",
      participants: 12,
      icon: FaVideo,
    },
    {
      id: 3,
      type: "Google Meet",
      title: "Product Review",
      time: "Yesterday at 9:00 AM",
      participants: 5,
      icon: FaVideo,
    },
  ]);
  return (
    <>
      <main className="pt-20 px-6 pb-6 overflow-y-auto h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-8 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col items-center">
            
            <FaVideo className=" mb-4 text-[#4285f4]" size={40} />
           
            <h3 className="text-xl font-roboto text-gray-800 mb-2">Google Meet</h3>
            <div className="mt-6 flex gap-4">
              <button
                className=" bg-[#2D8CFF] text-white px-6 py-2 rounded-lg hover:bg-[#2681F2] transition-colors duration-200 font-roboto"
                onClick={() => {setShowMeetForm("gmeet")
                setType("instant")
                }}
              >
              Instant Meeting
              </button>
              <button
                className=" bg-[#2D8CFF] text-white px-6 py-2 rounded-lg hover:bg-[#2681F2] transition-colors duration-200 font-roboto"
                onClick={() => {setShowMeetForm("gmeet")
                    setType("schedule")
                    }}
              >
                Schedule Meeting
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col items-center">
            
            <FaVideo className=" mb-4 text-[#4285f4]" size={40} />
           
            <h3 className="text-xl font-roboto text-gray-800 mb-2">Zoom</h3>
            <div className="mt-6 flex gap-4">
              <button
                className=" bg-[#2D8CFF] text-white px-6 py-2 rounded-lg hover:bg-[#2681F2] transition-colors duration-200 font-roboto"
                onClick={() => {setShowMeetForm("zoom")
                    setType("instant")
                    }}
              >
                Instant Meeting
              </button>
              <button
                className=" bg-[#2D8CFF] text-white px-6 py-2 rounded-lg hover:bg-[#2681F2] transition-colors duration-200 font-roboto"
                onClick={() => {setShowMeetForm("zoom")
                    setType("schedule")
                    }}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>

        {showMeetForm === "gmeet" && (
          <div className="fixed inset-0 bg-white/10 backdrop-blur-md  flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md">
              <MeetingForm type={type} />
            </div>
          </div>
        )}

        {showMeetForm === "zoom" && (
          <div className="fixed inset-0 bg-white/10 backdrop-blur-md  flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md">
              <MeetingForm type={type} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-roboto text-gray-800 mb-4">
            Recent Meetings
          </h2>
          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    meeting.type === "Google Meet"
                      ? "bg-blue-100 text-[#4285f4]"
                      : "bg-blue-100 text-[#2D8CFF]"
                  }`}
                >
                  <meeting.icon />
                </div>
                <div className="flex-1">
                  <p className="font-roboto text-gray-800">{meeting.title}</p>
                  <p className="text-sm text-gray-500 font-roboto">
                    {meeting.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-roboto">
                    {meeting.time}
                  </p>
                  <p className="text-sm text-gray-500 font-roboto">
                    {meeting.participants} participants
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
