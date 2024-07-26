import React from 'react'

function Sidebar() {
  return (
    <>
      <aside className="w-60 bg-[#1c212c] flex flex-col items-center pt-5 pb-2 space-y-7">
        <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
          <div className="font-QuicksandMedium pl-4 text-white text-xs text-[11px] font-bold uppercase">
            Kanban Column
          </div>
          <select className="w-full pl-4 pr-2 py-2 mx-auto ml-2 bg-[#2d333d] text-gray-400 border-none rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="option1" className="bg-[#1c212c]">Delivered</option>
            <option value="option2" className="bg-[#1c212c]">Option 2</option>
            <option value="option3" className="bg-[#1c212c]">Option 3</option>
          </select>
        </div>
        <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
          <div className="font-QuicksandMedium pl-4 text-white text-xs text-[11px] font-bold uppercase">
            Assignee Column
          </div>
          <select className="w-full pl-4 pr-2 py-2 mx-auto ml-2 bg-[#2d333d] text-gray-400 border-none rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="option1" className="bg-[#1c212c]">Person</option>
            <option value="option2" className="bg-[#1c212c]">Option 2</option>
            <option value="option3" className="bg-[#1c212c]">Option 3</option>
          </select>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
