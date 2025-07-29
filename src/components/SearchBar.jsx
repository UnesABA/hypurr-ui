import { useState } from "react";

const SearchBar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="bg-searchBar-bg border-b border-white hover:border-b-[1.5px] hover:border-white hover:brightness-110 mx-10 px-4 rounded-t-[3px] transition-all duration-75 ease-in-out cursor-text mb-[5px] shadow-lg">
      <div className="relative h-[40px] flex items-center">
        <label
          className={`absolute text-gray-400 font-medium tracking-wide transition-all duration-300 pointer-events-none ${
            isInputFocused || inputValue
              ? "text-xs scale-90 left-0 top-1"
              : "text-sm left-0 top-1/2 -translate-y-1/2"
          }`}
        >
          Search
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder={
            isInputFocused ? "ZE8C4Z8E4VRZG4G84ZVREFZAEFEFSC4" : ""
          }
          className="w-full h-full bg-transparent border-none outline-none text-xs text-gray-300 placeholder-gray-400 transition-all duration-200 pt-5"
        />
      </div>
    </div>
  );
};

export default SearchBar;