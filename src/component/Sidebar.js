import React, { useState } from 'react';
import logo from '../assets/project.png'
import pie from '../assets/pie.png'
import bar from '../assets/bar.png'
import dough from '../assets/doughnut.png'
import hart from '../assets/hart.png'
import stats from '../assets/stats.png'

import { TiArrowSortedUp } from "react-icons/ti";

function Sidebar({isOpen}) {
  console.log(isOpen);


  return (
    <div 
      className={`fixed h-[55vh] p-2 mt-20 ml-4 rounded-md lg:block md:hidden hidden z-20`} 
     
    >
     

      {/* Upward Arrow Outside */}
      <div className="absolute top-[-6px] left-7 cursor-pointer">
        <TiArrowSortedUp className="text-2xl text-primary" />
      </div>

      {/* Company Logo and Icons */}
      <div className="flex flex-col shadow-xl rounded-lg bg-primary w-24  h-full transition-all duration-300 ease-in-out hover:w-48 p-2 group">
  {/* Logo Section */}
  <div className="flex items-center my-1 pl-6 mb-3 mt-2">
    <img src={logo} alt="Logo" className="w-8 h-8" />
    <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Star</span>
  </div>
  <hr className="border-t border-gray-300 w-full mb-2" />

  {/* Icons Section with Names */}
  <div className="flex flex-col w-full hover:items-start pl-6">
    {/* Scrollable Container */}
    <div className="overflow-y-hidden hover:overflow-y-auto h-60 overflow-x-hidden w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-primary"> {/* Adjust the height as needed */}
        {/* Icon Row */}
        <div className="flex items-center my-1 mb-6 mt-4">
            <img src={pie} alt="Logo" className="w-6 h-6 filter invert" />
            <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Star</span>
        </div>
        <div className="flex items-center my-1 mb-6">
            <img src={stats} alt="Logo" className="w-6 h-6 filter invert" />
            <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Earth</span>
        </div>
        <div className="flex items-center my-1 mb-6">
            <img src={hart} alt="Logo" className="w-6 h-6 filter invert" />
            <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Love</span>
        </div>
        <div className="flex items-center my-1 mb-6">
            <img src={bar} alt="Logo" className="w-6 h-6 filter invert" />
            <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Rocket</span>
        </div>
        <div className="flex items-center my-1 mb-6">
            <img src={dough} alt="Logo" className="w-6 h-6 filter invert" />
            <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Logout</span>
        </div>
        <div className="flex items-center my-1 mb-6">
            <img src={dough} alt="Logo" className="w-6 h-6 filter invert" />
            <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Logout</span>
        </div>
        <div className="flex items-center my-1">
            <img src={dough} alt="Logo" className="w-6 h-6 filter invert" />
            <span className="text-white ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Logout</span>
        </div>
    </div>
</div>

</div>






    </div>
  );
}

export default Sidebar;
