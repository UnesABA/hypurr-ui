import { useEffect, useState } from "react";

const Perps = () => {
  const [perps, setPerps] = useState([]);
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchPerpsData = async () => {
      try {
        // Fetch positions data
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

        // Fetch current prices
        const pricesResponse = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "allMids",
          }),
        });

        const pricesData = await pricesResponse.json();

        if (data && data.assetPositions) {
          const perpsData = data.assetPositions.map((position) => {
            const szi = parseFloat(position.position.szi);
            const side = szi > 0 ? "LONG" : "SHORT";
            const leverage = `${position.position.leverage.value}X (cross)`;

            // Get current price for this token
            const currentPrice = parseFloat(
              pricesData[position.position.coin] || position.position.entryPx
            );

            // Format numbers with commas
            const formatNumber = (num) => {
              return new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(Math.abs(num));
            };

            const formatCurrency = (num) => {
              return `$${formatNumber(num)}`;
            };

            return {
              token: position.position.coin,
              side: side,
              leverage: leverage,
              value: formatCurrency(
                parseFloat(position.position.positionValue)
              ),
              amount: `${formatNumber(Math.abs(szi))} ${
                position.position.coin
              }`,
              entry: formatCurrency(parseFloat(position.position.entryPx)),
              price: formatCurrency(currentPrice),
              pnl: `${
                parseFloat(position.position.unrealizedPnl) >= 0 ? "+" : ""
              }${formatCurrency(parseFloat(position.position.unrealizedPnl))}`,
              funding: formatCurrency(
                parseFloat(position.position.cumFunding.sinceOpen)
              ),
              liquidation: formatCurrency(
                parseFloat(position.position.liquidationPx)
              ),
              pnlValue: parseFloat(position.position.unrealizedPnl), // for styling
            };
          });

          setPerps(perpsData);
        }
      } catch (error) {
        console.error("Error fetching perps data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerpsData();
  }, []);

  return (
    <>
      {/* Table Header */}
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Token
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Side
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Leverage
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Value
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Amount
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Entry
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Price
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            PnL
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Funding
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Liquidation
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="10" className="py-12 text-center">
              <span className="text-gray-400 text-sm">Loading...</span>
            </td>
          </tr>
        ) : perps.length === 0 ? (
          <tr>
            <td colSpan="10" className="py-12 text-center">
              <span className="text-gray-400 text-sm">
                No perp positions available
              </span>
            </td>
          </tr>
        ) : (
          perps.map((perp, index) => (
            <tr
              key={index}
              className="transition-colors duration-150 border-b border-gray-700"
            >
              <td className="py-1.5 px-6">
                <span className="text-white text-[11px] font-medium">
                  {perp.token}
                </span>
              </td>
              <td className="py-1.5 px-6">
                <span
                  className={`text-[11px] font-semibold ${
                    perp.side === "LONG" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {perp.side}
                </span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span className="text-gray-300 text-[11px]">
                  {perp.leverage}
                </span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span className="text-white text-[11px] font-semibold">
                  {perp.value}
                </span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span className="text-gray-300 text-[11px]">{perp.amount}</span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span className="text-gray-300 text-[11px] font-mono">
                  {perp.entry}
                </span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span className="text-gray-300 text-[11px] font-mono">
                  {perp.price}
                </span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span
                  className={`text-[11px] font-semibold ${
                    perp.pnlValue >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {perp.pnl}
                </span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span className="text-gray-300 text-[11px]">
                  {perp.funding}
                </span>
              </td>
              <td className="py-1.5 px-6 text-right">
                <span className="text-gray-300 text-[11px] font-mono">
                  {perp.liquidation}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
};

export default Perps;
