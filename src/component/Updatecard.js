import React from "react";
import chat from "../assets/chat.png";
import { MdAutoGraph, MdChat } from "react-icons/md";

function Updatecard({ data, txt }) {
  return (
    <div className="bg-white w-full sm:w-[22%] h-[25vh] md:h-[12vh] lg:h-[20vh] rounded-sm flex flex-col justify-between p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 flex-shrink-0">
          <MdChat className="h-7 w-7 text-white" />
        </div>
        <div className="md:text-right lg:text-right text-center mt-2 sm:mt-0">
          {/* <h1 className='text-gray-400 text-xs'>Number</h1> */}
          <h1 className="text-2xl">{data}</h1>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <hr className="border-t border-gray-300" />
        <div className="flex gap-x-2 mt-2 items-center">
          <MdAutoGraph className="text-gray-400" />
          <h1 className="text-sm text-gray-400">{txt}</h1>
        </div>
      </div>
    </div>
  );
}

export default Updatecard;
