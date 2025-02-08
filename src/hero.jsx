import { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa";
import MeetingForm, { API_BASE_URL } from "./components/form";
import { useStore } from "./utils/store";
import { Recents } from "./components/recent";

export default function Hero() {
  const {showMeetForm, setShowMeetForm} = useStore();
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchMeetings = async () => {
        try {
            
            const response = await fetch(`${API_BASE_URL}/scheduled-meetings`,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },}

            );
            if (!response.ok) {
                throw new Error("Failed to fetch meetings");
            }
            const data = await response.json();
            setRecentMeetings(data)
            console.log(data)
        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
    };

    fetchMeetings();
}, []);
  const [recentMeetings, setRecentMeetings] = useState([
    
  ]);
  console.log("hi",recentMeetings)
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

        <Recents/>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-roboto text-gray-800 mb-4">
            Recent Meetings
          </h2>
          {recentMeetings.length === 0 && (
            <p className="text-gray-500">No recent meetings</p>
          )}
          {recentMeetings.map((meeting) => (
            <div
              key={meeting}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
            >
              <div>
                <h3 className="text-lg font-roboto text-gray-800">
                  
                </h3>
                <p className="text-sm text-gray-500">{meeting.jobName}</p>
              </div>
              <div> 
                {meeting.nextInvocation}
                </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Join
              </button>
            </div>
          ))}
          
        </div>
      </main>
    </>
  );
}
