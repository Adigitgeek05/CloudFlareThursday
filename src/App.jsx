import { useState } from 'react'
import Sidebar from './components/Sidebar'


function App() {
  return (
    
    <div className='flex '>
      <div className=" h-screen w-1/6 bg-[#1a1a1a] text-white p-6 flex flex-col"><Sidebar /></div>
      <div className='w-5/6 bg-gray-100 p-6'>
        <h2 className="text-xl font-roboto">Main Content Area</h2>
        <p className="mt-4">
          This shows how the sidebar looks with main content.
        </p>
        </div>
     </div>
    
  )
}

export default App
