import React, { useEffect, useState, useRef } from "react";
import { TfiSearch, TfiSignal, TfiClose } from "react-icons/tfi";
import { MdArrowDropDown } from "react-icons/md";
import profile from "../assets/life-profile.png";
import { TiArrowSortedUp } from "react-icons/ti";
import imgg from "../assets/img.png";
import { useNavigate } from "react-router-dom";
import profileCon from "../assets/user.png";

const DashboardHeader = ({ onToggleDrawer, setAuth ,theme,setTheme}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsProfileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);

  const getData = () => {
    const retrievedData = localStorage.getItem("data");
    const parsedData = JSON.parse(retrievedData);
    setUserData(parsedData);
    console.log("usersdata", parsedData);
  };

  const setLogout = () => {
    localStorage.removeItem("responseData");
    setAuth(false);
    navigate("/login");
  };

  const handleClick = () => {
    setIsActive(!isActive);
    onToggleDrawer();
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleProfileModal = () => {
    setIsDropdownOpen(false);
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <div className="flex h-16 w-full justify-between items-center relative z-10 bg-backgrd dark:bg-dark1 px-4">
      <div className="flex md:ml-1 lg:ml-7 ml-0 items-center">
        <img
          src={imgg}
          alt="Hamburg"
          onClick={handleClick}
          className="h-14 w-12 cursor-pointer dark:bg-white rounded-lg"
        />
        <h1 className="text-black dark:text-white text-md md:pl-3 lg:pl-12 pl-2">DASHBOARD</h1>
      </div>
      <div className="flex items-center gap-x-6">
      <h1></h1>
        <div className="flex items-center relative">
        <h1 className="font-semibold text-sm mr-1 text-black">{userData?userData.details.staffname:''}</h1>
          <img
            src={profile}
            className="w-12 h-12 cursor-pointer"
            alt="Profile"
            onClick={toggleDropdown}
          />
          <MdArrowDropDown
            className="h-4 w-4 cursor-pointer dark:text-white"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-5 mt-36 bg-white dark:bg-dark3 shadow-lg rounded p-2 w-28">
              <TiArrowSortedUp className="absolute -top-2 right-3 text-white" />
              <div
                className="py-1 cursor-pointer text-gray-400"
                onClick={toggleProfileModal}
              >
                Profile
              </div>
              <div
                className="py-1 cursor-pointer text-gray-400"
                onClick={setLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white dark:bg-dark3 rounded-lg p-6 shadow-lg relative w-80 h-64"
          >
            <TfiClose
              className="absolute top-2 right-2 h-5 w-5 cursor-pointer text-gray-400"
              onClick={toggleProfileModal}
            />
            <div className="flex justify-center mb-4">
              <img
                src={profileCon}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-gray-600"
              />
            </div>
            <h2 className="text-base dark:text-white font-semibold font-serif text-center">
              Staff Id : {userData.details.staffid}
            </h2>
            <h2 className="text-base dark:text-white font-semibold font-serif text-center">
              Branch Id : {userData.details.branchid}
            </h2>
            <h2 className="text-base dark:text-white font-semibold font-serif text-center">
              Staff Name : {userData.details.staffname}
            </h2>
            <h2 className="text-base dark:text-white font-semibold font-serif text-center">
              Phone Number : {userData.details.phone}
            </h2>
            <h2 className="text-base dark:text-white font-semibold font-serif text-center">
              Branch Name : {userData.details.branchname}
            </h2>
            <h2 className="text-base dark:text-white font-semibold font-serif text-center">
              Country : {userData.details.country}
            </h2>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-80 focus:outline-none"
              onBlur={() => setIsSearchOpen(false)}
            />
            <TfiClose
              className="h-4 w-4 cursor-pointer ml-2 text-gray-400"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
