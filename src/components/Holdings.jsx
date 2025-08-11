import { useEffect, useState } from "react";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchHoldingsData = async () => {
      try {
        // First API call - get spot balances
        const balancesResponse = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "spotClearinghouseState",
            user: walletAddress,
          }),
        });

        const balancesData = await balancesResponse.json();

        // Second API call - get current prices
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

        // Third API call - get rank data
        let rankData = {};
        try {
          const rankResponse = await fetch(`https://api.hypurrscan.io/rank/${walletAddress}`, {
            method: "GET",
          });
          rankData = await rankResponse.json();
        } catch (rankError) {
          console.warn("Could not fetch rank data:", rankError);
        }

        if (balancesData && balancesData.balances && pricesData) {
          const holdingsData = balancesData.balances
            .filter(balance => parseFloat(balance.total) > 0) // Only show non-zero balances
            .map((balance) => {
              const coin = balance.coin;
              const total = parseFloat(balance.total);
              const entryNtl = parseFloat(balance.entryNtl || 0);
              
              // Find price for this token
              const price = parseFloat(pricesData[coin] || 1);
              
              // Get rank for this token
              const rank = rankData && rankData[coin] ? rankData[coin] : 'N/A';
              
              // Calculate values
              const value = total * price;
              const pnl = value - entryNtl;
              const pnlPercent = entryNtl !== 0 ? (pnl / entryNtl) * 100 : 0;
              
              // Format numbers with commas
              const formatNumber = (num) => {
                return new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(num);
              };
              
              const formatCurrency = (num) => {
                return `$${formatNumber(num)}`;
              };
              
              const formatPercent = (num) => {
                const sign = num >= 0 ? '+' : '';
                return `${sign}${formatNumber(Math.abs(num))}%`;
              };
              
              return {
                token: coin,
                value: formatCurrency(value),
                amount: `${formatNumber(total)} ${coin}`,
                price: `$${formatNumber(price)}`,
                rank: rank,
                pnl: `${pnl >= 0 ? '+' : ''}${formatCurrency(Math.abs(pnl))} (${formatPercent(pnlPercent)})`,
                pnlValue: pnl // for styling
              };
            });
          
          setHoldings(holdingsData);
        }
      } catch (error) {
        console.error("Error fetching holdings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldingsData();
  }, []);
  return (
    <>
      {/* Table Header */}
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            Token
          </th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-end justify-end gap-2">
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Value
            </span>
          </th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">
            Amount
          </th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">
            Price
          </th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">
            Rank
          </th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">
            PnL
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6" className="py-12 text-center">
              <span className="text-gray-400 text-sm">Loading...</span>
            </td>
          </tr>
        ) : holdings.length === 0 ? (
          <tr>
            <td colSpan="6" className="py-12 text-center">
              <span className="text-gray-400 text-sm">No holdings available</span>
            </td>
          </tr>
        ) : (
          holdings.map((holding, index) => (
            <tr
              key={index}
              className="transition-colors duration-150 border-b border-gray-700"
            >
              <td className="py-2 px-3 text-left">
                <span className="text-white text-[11px] font-medium">
                  {holding.token}
                </span>
              </td>
              <td className="py-2 px-3 text-right">
                <span className="text-white text-[11px] font-semibold">
                  {holding.value}
                </span>
              </td>
              <td className="py-2 px-3 text-right">
                <span className="text-white-400 text-[11px] font-semibold">
                  {holding.amount}
                </span>
              </td>
              <td className="py-2 px-3 text-right">
                <span className="text-white-400 text-[11px] font-semibold font-mono">
                  {holding.price}
                </span>
              </td>
              <td className="py-2 px-3 text-right">
                <span className="text-white-400 text-[11px] font-semibold">
                  {holding.rank}
                </span>
              </td>
              <td className="py-2 px-3 text-right">
                <span
                  className={`text-[11px] font-semibold ${
                    holding.pnlValue >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {holding.pnl}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
};

export default Holdings;