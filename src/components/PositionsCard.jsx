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
    <div className="bg-[#1e2d29] p-4 rounded-[10px]">
      <div className="mb-3">
        <h3 className="text-white text-base font-medium">Positions</h3>
      </div>

      {/* Position Cards */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-gray-400 text-sm">Loading positions...</div>
        ) : positions.length === 0 ? (
          <div className="text-gray-400 text-sm">No positions available</div>
        ) : (
          positions.map((position, index) => {
            // Create both spot and perp versions for each position
            const cards = [];
            
            // Add spot position (blue card with just token name)
            cards.push(
              <div
                key={`${index}-spot`}
                className="relative h-8 rounded-sm flex items-center justify-center text-white font-medium text-xs transition-all duration-200 hover:brightness-110 cursor-pointer bg-blue-400"
              >
                <span className="text-center font-semibold">
                  {position.token}
                </span>
              </div>
            );
            
            // Add perp position (green card with token-USD)
            cards.push(
              <div
                key={`${index}-perp`}
                className="relative h-8 rounded-sm flex items-center justify-center text-white font-medium text-xs transition-all duration-200 hover:brightness-110 cursor-pointer bg-green-500"
              >
                <span className="text-center font-semibold">
                  {position.pair}
                </span>
              </div>
            );
            
            return cards;
          }).flat()
        )}
      </div>
    </div>
  );
};

export default PositionsCard;