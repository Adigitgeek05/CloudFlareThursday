export default  Test() {
    const [showMeetForm, setShowMeetForm] = useState(false);
    const [showZoomForm, setShowZoomForm] = useState(false);
    const [recentMeetings] = useState([
      {
        id: 1,
        type: "Google Meet",
        title: "Weekly Team Sync",
        time: "Today at 2:00 PM",
        participants: 8,
        icon: "fas fa-video",
      },
      {
        id: 2,
        type: "Zoom",
        title: "Client Presentation",
        time: "Yesterday at 11:00 AM",
        participants: 12,
        icon: "fas fa-video",
      },
      {
        id: 3,
        type: "Google Meet",
        title: "Product Review",
        time: "Yesterday at 9:00 AM",
        participants: 5,
        icon: "fas fa-video",
      },
    ]);
  
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar selected="dashboard" />
  
        <div className="flex-1 ml-64">
          <Header pageTitle="Dashboard" />
  
          <main className="pt-20 px-6 pb-6 overflow-y-auto h-[calc(100vh-1rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className="bg-white rounded-lg shadow-sm p-8 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col items-center"
                onClick={() => setShowMeetForm(true)}
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#4285f4]">
                  <i className="fas fa-video text-4xl"></i>
                </div>
                <h3 className="text-xl font-roboto text-gray-800 mb-2">
                  Google Meet
                </h3>
                <button className="mt-4 bg-[#4285f4] text-white px-6 py-2 rounded-lg hover:bg-[#3367d6] transition-colors duration-200 font-roboto">
                  Join Google Meet
                </button>
              </div>
  
              <div
                className="bg-white rounded-lg shadow-sm p-8 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col items-center"
                onClick={() => setShowZoomForm(true)}
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#2D8CFF]">
                  <i className="fas fa-video text-4xl"></i>
                </div>
                <h3 className="text-xl font-roboto text-gray-800 mb-2">Zoom</h3>
                <button className="mt-4 bg-[#2D8CFF] text-white px-6 py-2 rounded-lg hover:bg-[#2681F2] transition-colors duration-200 font-roboto">
                  Join Zoom Meeting
                </button>
              </div>
            </div>
  
            {showMeetForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-md">
                  <MeetingForm type="meet" />
                  <button
                    onClick={() => setShowMeetForm(false)}
                    className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-roboto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
  
            {showZoomForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-md">
                  <MeetingForm type="zoom" />
                  <button
                    onClick={() => setShowZoomForm(false)}
                    className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-roboto"
                  >
                    Cancel
                  </button>
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
                      <i className={meeting.icon}></i>
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
        </div>
      </div>
    );
  }
  
  
  