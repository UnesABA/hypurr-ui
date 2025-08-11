import { useState, useEffect } from "react";

const SearchBar = ({ walletAddress, setWalletAddress }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Helper function to shorten wallet address
  const shortenAddress = (address) => {
    if (!address || address.length < 16) return address;
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  const handleFocus = () => {
    setIsInputFocused(true);
    // When focused, show the full wallet address in the input
    setInputValue(walletAddress);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    // Update wallet address if user typed a new one
    if (inputValue && inputValue !== walletAddress) {
      setWalletAddress(inputValue);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Update wallet address on Enter key
      if (inputValue && inputValue !== walletAddress) {
        setWalletAddress(inputValue);
      }
      e.target.blur(); // Remove focus
    }
  };

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
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          placeholder={
            isInputFocused ? "Enter wallet address or search..." : ""
          }
          className="w-full h-full bg-transparent border-none outline-none text-xs text-gray-300 placeholder-gray-400 transition-all duration-200 pt-5"
        />
      </div>
    </div>
  );
};

export default SearchBar;