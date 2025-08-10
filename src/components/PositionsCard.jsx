import { useEffect, useState } from "react";

const PositionsCard = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "clearinghouseState",
            user: walletAddress,
          }),
        });

        const data = await response.json();

        if (data && data.assetPositions) {
          const positionsData = data.assetPositions.map((position) => {
            const szi = parseFloat(position.position.szi);
            const isLong = szi > 0;
            
            return {
              token: position.position.coin,
              side: isLong ? "LONG" : "SHORT",
              isLong: isLong,
              pair: `${position.position.coin}-USD`
            };
          });
          
          setPositions(positionsData);
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  return (
    <div className="bg-[#1e2d29] p-2 rounded-[10px]">
      <div className="mb-2">
        <h3 className="text-white text-base font-medium">Positions</h3>
      </div>

      {/* Position Cards */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-gray-400 text-sm">Loading positions...</div>
        ) : positions.length === 0 ? (
          <div className="text-gray-400 text-sm">No positions available</div>
        ) : (
          positions.map((position, index) => (
            <div key={index} className="flex flex-col gap-2 space-y-0">
              {/* Spot position (blue card with just token name) */}
              <div className="relative h-8 rounded-sm flex items-center justify-center text-black text-[10px] transition-transform duration-200 hover:-translate-y-[2px] cursor-pointer bg-blue-300">
                <span className="text-center font-semibold">
                  {position.token}
                </span>
              </div>
              
              {/* Horizontal separator line */}
              <div className="h-[1px] bg-gray-500 opacity-50 w-full"></div>
              
              {/* Perp position (green card with token-USD) */}
              <div className="relative h-8 rounded-sm flex items-center justify-center text-white text-[10px] transition-transform duration-200 hover:-translate-y-[2px] cursor-pointer bg-green-500">
                <span className="text-center font-semibold">
                  {position.pair}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PositionsCard;