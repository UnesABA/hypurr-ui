import { useEffect, useState } from "react";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchHoldingsData = async () => {
      try {
        // 1️⃣ Spot balances
        const balancesResponse = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "spotClearinghouseState",
            user: walletAddress,
          }),
        });
        const balancesData = await balancesResponse.json();

        // 2️⃣ Prices
        const pricesResponse = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "allMids" }),
        });
        const pricesData = await pricesResponse.json();

        // 3️⃣ Rank data
        let rankData = {};
        try {
          const rankResponse = await fetch(`https://api.hypurrscan.io/rank/${walletAddress}`);
          rankData = await rankResponse.json();
        } catch (err) {
          console.warn("Could not fetch rank data:", err);
        }

        if (balancesData && balancesData.balances && pricesData) {
          let holdingsData = balancesData.balances
            .filter((b) => parseFloat(b.total) > 0)
            .map((b) => {
              const coin = b.coin;
              const total = parseFloat(b.total);
              const entryNtl = parseFloat(b.entryNtl || 0);

              // Entry price
              const entryPrice = total > 0 && entryNtl > 0 ? entryNtl / total : parseFloat(pricesData[coin] || 0);

              // Value = entry notional
              const value = entryNtl;

              // PnL
              const marketValue = total * parseFloat(pricesData[coin] || 0);
              const pnl = marketValue - entryNtl;
              const pnlPercent = entryNtl > 0 ? (pnl / entryNtl) * 100 : 0;

              // Rank
              const rank = rankData[coin] ?? "-";

              // Formatters
              const formatNumber = (num, digits = 2) =>
                new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: digits,
                  maximumFractionDigits: digits,
                }).format(num);

              const formatCurrency = (num) => `${formatNumber(num, 2)}$`;
              const formatPercent = (num) => {
                const sign = num >= 0 ? "+" : "-";
                return `${sign}${formatNumber(Math.abs(num), 2)}%`;
              };

              const pnlDisplay = pnl === 0 ? "-" : `${pnl >= 0 ? "+" : "-"}${formatCurrency(Math.abs(pnl))} (${formatPercent(pnlPercent)})`;

              return {
                token: coin,
                value: formatCurrency(value),
                amount: `${formatNumber(total, 2)} ${coin}`,
                price: formatCurrency(entryPrice),
                rank,
                pnl: pnlDisplay,
                pnlValue: pnl,
              };
            });

          // Custom sort order
          const customOrder = ["USDC", "HYPE", "HFUN", "LIQD", "VAPOR", "FARM", "PERP", "LICKO"];
          holdingsData.sort((a, b) => customOrder.indexOf(a.token) - customOrder.indexOf(b.token));

          setHoldings(holdingsData);
        }
      } catch (err) {
        console.error("Error fetching holdings:", err);
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
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">Token</th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">Value</th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">Amount</th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">Price</th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">Rank</th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">PnL</th>
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
          holdings.map((h, i) => (
            <tr key={i} className="transition-colors duration-150 border-b border-gray-700">
              <td className="py-2.5 px-3 text-left text-white text-[11px] font-medium">{h.token}</td>
              <td className="py-2.5 px-3 text-right text-white text-[11px] font-semibold">{h.value}</td>
              <td className="py-2.5 px-3 text-right text-gray-400 text-[11px] font-semibold">{h.amount}</td>
              <td className="py-2.5 px-3 text-right text-gray-400 text-[11px] font-mono font-semibold">{h.price}</td>
              <td className="py-2.5 px-3 text-right text-gray-400 text-[11px] font-semibold">{h.rank}</td>
              <td className="py-2.5 px-3 text-right text-[11px] font-semibold" style={{ color: h.pnlValue > 0 ? "#34d399" : h.pnlValue < 0 ? "#f87171" : "white" }}>
                {h.pnl}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
};

export default Holdings;
