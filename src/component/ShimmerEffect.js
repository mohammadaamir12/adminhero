import React from "react";

function ShimmerEffect() {
  return (
    <div className="flex flex-col space-y-4 p-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-6 w-full bg-gray-300 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
}

export default ShimmerEffect;
