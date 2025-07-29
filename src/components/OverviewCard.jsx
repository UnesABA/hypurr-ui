const OverviewCard = () => {
  return (
    <div className="bg-[#1e2d29] p-2 rounded-[10px] h-[110px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm font-medium">Overview</h3>
        <span className="text-white text-sm font-medium">
          116,567,015.77$
        </span>
      </div>
      <div className="space-y-[2px] leading-[1.2]">
        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px] ">
            Perps{" "}
            <span className="text-white-900 font-semibold text-[11px]">
              (179)
            </span>{" "}
            :
          </span>
          <span className="text-white font-normal text-[11px]">
            116,567,015.77$
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px]">
            Spot :
          </span>
          <span className="text-white text-[11px]">0.00$</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px]">
            Vault :
          </span>
          <span className="text-white text-[11px]">0.00$</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px]">
            Staked :
          </span>
          <span className="text-white text-[11px]">0.00$</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;