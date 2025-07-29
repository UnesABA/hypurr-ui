const More = () => {
  return (
    <div className="p-4">
      <div className="flex justify-start gap-8">
        {/* Left Side - PnL Section */}
        <div className="w-[400px] h-[140px] flex flex-col justify-center bg-[#1e1e1e] p-[12px] rounded-[10px] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm font-medium ">PnL</h3>
            <select className="bg-[#1d1c1c] rounded px-2 py-1.5 text-white focus:outline-none focus:border-white text-xs min-w-[60px] transition-colors duration-200">
              <option value="All" className="bg-[#2a2a2a]">
                All
              </option>
              <option value="Active" className="bg-[#2a2a2a]">
                Perps
              </option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-white-400 text-[11px]">All time:</span>
              <span className="text-green-400 text-[11px] font-medium">
                +166,321,678
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white-400 text-[11px]">30D:</span>
              <span className="text-green-400 text-[11px] font-medium">
                +31,252,554
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white-400 text-[11px]">7D:</span>
              <span className="text-red-400 text-[11px] font-medium">
                -8,123,445
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white-400 text-[11px]">24H:</span>
              <span className="text-red-400 text-[11px] font-medium">
                -126,319,578
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Referrals Section */}
        <div className="w-[400px] h-[160px] flex flex-col bg-[#1e1e1e] p-[10px] rounded-[10px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="text-center mb-2">
            <h3 className="text-white text-sm font-medium">Referrals</h3>
          </div>

          <div className="space-y-2">
            <div>
              <div className="text-white-400 text-[11px] [11px] font-semibold">
                Do not have a referral code
              </div>
              <div className="text-white-400 text-[11px] font-semibold">
                Not using any referral code
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <span className="text-white-400 font-bold text-[11px]">
                  Fees (Taker/Maker):
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white-400 text-[11px] font-semibold">Perps :</span>
                <span className="text-white text-[11px] font-semibold">0.055% / 0%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white-400 text-[11px] font-semibold">Spot :</span>
                <span className="text-white text-[11px] font-semibold">0.100% / 0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
