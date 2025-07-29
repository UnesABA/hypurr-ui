import { useState } from "react";

const AddressHeader = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true); // Light up the button
    setTimeout(() => {
      setIsActive(false); // Turn it off after 1 second
    }, 1000);
  };

  return (
    <div className="bg-[#060e10] w-full h-9 rounded-[8px] flex items-center justify-between px-2 py-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-white text-[11px] font-medium tracking-wider">
            Address:
          </span>
          <span className="text-white text-[11px] font-mono">
            0x010461c14e146ac35fe42271bdc1134ee31c703a
          </span>
        </div>
      </div>
      <button
        onClick={handleClick}
        className={`bg-transparent border-none outline-none focus:outline-none focus:ring-0 transition-colors ${
          isActive ? "brightness-150" : "text-white"
        } hover:text-gray-300`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddressHeader;