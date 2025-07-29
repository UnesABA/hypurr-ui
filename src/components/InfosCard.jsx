const InfosCard = () => {
  return (
    <div className="bg-[#1e2d29] p-2 rounded-[10px] h-[75px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm font-medium">Infos</h3>
      </div>
      <div className="space-y-1 flex items-center justify-between">
        <div className="text-white-400 text-xs font-mono">
          0x010461c1...e31c703a
        </div>
        <button className=" bg-[#223530] text-[#4f634c] text-[9px] font-medium rounded border-none hover:brightness-125 transition-colors">
          ADD ALIAS
        </button>
      </div>
    </div>
  );
};

export default InfosCard;