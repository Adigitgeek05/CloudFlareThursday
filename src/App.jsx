import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Hero from './hero'


function App() {
  return (
    
    <div className='flex '>
      <div className=" h-screen w-1/6 bg-[#1a1a1a] text-white p-6 flex flex-col"><Sidebar /></div>
      <div className='w-5/6 h-screen bg-gray-100 p-6'>
      <Hero/>
        </div>
     </div>
    
  )
}

export default App
