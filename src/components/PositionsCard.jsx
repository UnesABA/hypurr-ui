const PositionsCard = () => {
  return (
    <div className="bg-[#1e2d29] p-2 rounded-[10px] h-[85px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white text-sm font-medium">Positions</h3>
      </div>

      {/* Position Bars */}
      <div className="space-y-2">
        <div className="flex h-8">
          {/* First wide red block with BTC-USD */}
          <div className="relative flex-[10] bg-red-500 rounded-[1px] hover:-translate-y-[2px] transition-transform duration-200 ease-out">
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white whitespace-nowrap scale-[0.9]">
              BTC-USD
            </span>
          </div>

          {/* Second wide red block with ETH-USD */}
          <div className="relative flex-[10] bg-red-500 rounded-[1px] hover:-translate-y-[2px] transition-transform duration-200 ease-out">
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white whitespace-nowrap scale-[0.9]">
              ETH-USD
            </span>
          </div>

          {/* Rest of small bars - equal narrow width */}
          {[
            "red-500",
            "red-500",
            "red-500",
            "green-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "green-500",
            "red-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "green-500",
            "red-500",
            "red-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "green-500",
            "red-500",
            "green-500",
            "green-500",
            "green-500",
            "red-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
            "green-500",
            "red-500",
          ].map((color, index) => (
            <div
              key={index}
              className={`flex-1 bg-${color} w-[2px] rounded-[1px] hover:-translate-y-[2px] transition-transform duration-200 ease-out`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PositionsCard;