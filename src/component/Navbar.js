import React, { useState } from 'react';
import { TfiSearch, TfiSignal, TfiClose } from 'react-icons/tfi';
import { MdArrowDropDown } from 'react-icons/md';
import profile from '../assets/life-profile.png'
import { TiArrowSortedUp } from "react-icons/ti";
import glass from '../assets/glass.png';
import activity from '../assets/activity.png'
import humburg from '../assets/hamburg.png'
import humburgopen from '../assets/menuli.png'

const DashboardHeader = ({onToggleDrawer}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onToggleDrawer()
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className='flex h-16 w-full justify-between items-center relative z-10 bg-backgrd px-4 '>
      <div className='flex md:ml-1 lg:ml-8 ml-0 items-center'>
      <img 
 src={isActive ? humburgopen : humburg}
  alt="Humburg" 
  onClick={handleClick}
  className='h-6 w-6 cursor-pointer' 
  
/>
        <h1 className='text-black text-md md:pl-3 lg:pl-12 pl-2'>DASHBOARD</h1>
      </div>
      <div className='flex items-center gap-x-6'>
      <img 
  src={glass}
  alt="Search" 
  className='h-6 w-6 cursor-pointer' 
  onClick={toggleSearch} 
/>
<img 
  src={activity} 
  alt="Notification" 
  className='h-5 w-5 cursor-pointer'  
/>
        <div className='flex items-center relative'>
          <img 
            src={profile} 
            className='w-12 h-12 cursor-pointer' 
            alt="Profile" 
            onClick={toggleDropdown} 
          />
          <MdArrowDropDown className='h-4 w-4 cursor-pointer' onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className='absolute right-5 mt-36 bg-white shadow-lg rounded p-2 w-28'>
              <TiArrowSortedUp className='absolute -top-2 right-3 text-white'/>
              <div className='py-1 cursor-pointer text-gray-400'>Profile</div>
              <div className='py-1 cursor-pointer text-gray-400'>Logout</div>
            </div>
          )}
        </div>
      </div>
      {isSearchOpen && (
        <div className='absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded'>
          <div className='flex items-center'>
            <input 
              type='text' 
              placeholder='Search...' 
              className='p-2 w-80 focus:outline-none' 
              onBlur={() => setIsSearchOpen(false)} 
            />
            <TfiClose 
              className='h-4 w-4 cursor-pointer ml-2 text-gray-400' 
              onClick={() => setIsSearchOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
