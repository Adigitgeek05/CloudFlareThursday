import {react} from 'react'


export default function Sidebar({ selected = "dashboard" }) {
    return (
      <div className="fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold font-roboto">Create</h1>
        </div>
  
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className={`flex items-center space-x-3 p-2 rounded-lg ${selected === "dashboard" ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"}`}
              >
                <i className="fas fa-th-large text-lg"></i>
                <span className="font-roboto">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center space-x-3 p-2 rounded-lg ${selected === "analytics" ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"}`}
              >
                <i className="fas fa-chart-bar text-lg"></i>
                <span className="font-roboto">Analytics</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center space-x-3 p-2 rounded-lg ${selected === "settings" ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"}`}
              >
                <i className="fas fa-cog text-lg"></i>
                <span className="font-roboto">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
  function StoryComponent() {
    return (
      <div className="min-h-screen bg-gray-100">
        <MainComponent selected="dashboard" />
        <div className="ml-64 p-8">
          <h2 className="text-xl font-roboto">Main Content Area</h2>
          <p className="mt-4">
            This shows how the sidebar looks with main content.
          </p>
        </div>
      </div>
    );
  }
  
  
  