import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[270px]">
      <div className="animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-blue-500 h-16 w-16"></div>
    </div>
  );
};

export default Spinner;
