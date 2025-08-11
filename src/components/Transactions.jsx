import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch orders data from frontendOpenOrders (Token, Price, Amount, To, Age)
        const ordersResponse = await fetch("https://api-ui.hyperliquid.xyz/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "frontendOpenOrders",
            user: walletAddress,
          }),
        });

        const ordersData = await ordersResponse.json();

        // Fetch explorer data (for Hash, time and action)
        let explorerTxs = [];
        try {
          const explorerResponse = await fetch("https://rpc.hyperliquid.xyz/explorer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "userDetails",
              user: walletAddress,
              n: 50,
            }),
          });

          if (explorerResponse.ok) {
            const explorerJson = await explorerResponse.json();
            if (explorerJson.txs && Array.isArray(explorerJson.txs)) {
              explorerTxs = explorerJson.txs;
            }
          }
        } catch (e) {
          console.warn("Explorer fetch failed:", e);
        }

        // Helper: format timestamp to relative time ago string
        const formatTimeAgo = (timestamp) => {
          if (!timestamp) return "N/A";

          const now = Date.now();
          const diffMs = now - timestamp;

          if (diffMs < 0) return "Just now";

          const seconds = Math.floor(diffMs / 1000);
          if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

          const minutes = Math.floor(diffMs / 60000);
          if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

          const hours = Math.floor(diffMs / 3600000);
          if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

          const days = Math.floor(diffMs / 86400000);
          return `${days} day${days !== 1 ? "s" : ""} ago`;
        };

        if (Array.isArray(ordersData) && ordersData.length > 0) {
          const mapped = ordersData.slice(0, 10).map((order, index) => {
            const { coin, limitPx, origSz, orderType, timestamp } = order;

            // Token
            const token = coin || "N/A";

            // Price
            const priceValue = parseFloat(limitPx || 0);
            let price;
            if (priceValue >= 1) price = `${priceValue.toFixed(3)}$`;
            else price = `${priceValue.toFixed(4)}$`;

            // Amount
            const amount = origSz
              ? new Intl.NumberFormat("en-US").format(parseFloat(origSz))
              : "N/A";

            // To
            const to = orderType || "N/A";

            // Explorer hash, time and action
            const explorerTx = explorerTxs[index];
            const hashData = explorerTx
              ? {
                  short: explorerTx.hash ? `${explorerTx.hash.slice(0, 10)}...` : "N/A",
                  full: explorerTx.hash || "",
                  time: explorerTx.time,
                  method: explorerTx.action?.type || "N/A",
                }
              : { short: "N/A", full: "", time: null, method: "N/A" };

            return {
              hash: hashData.short,
              fullHash: hashData.full,
              method: hashData.method,
              age: formatTimeAgo(hashData.time),
              from: "Arbitrum",
              to,
              amount,
              token,
              price,
              value: "$0.00",
              status: "success",
            };
          });

          setTransactions(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    // Initial fetch
    fetchTransactions();

    // Set up polling to fetch data every 10 seconds
    const intervalId = setInterval(fetchTransactions, 10000);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {/* Table Header */}
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">Hash</th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">Method</th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">Age</th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">From</th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">To</th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">Amount</th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">Token</th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">Price</th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">$</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {transactions.map((tx, i) => (
          <tr key={i} className="border-b border-gray-700">
            <td className="py-2 px-3">
              <span
                className="text-teal-400 font-mono text-[10px] underline hover:text-teal-300 cursor-pointer"
                title={tx.fullHash}
              >
                {tx.hash}
              </span>
            </td>
            <td className="py-2 px-3 text-[11px]">{tx.method}</td>
            <td className="py-2 px-3 text-[11px]">{tx.age}</td>
            <td className="py-2 px-3 text-[11px]">{tx.from}</td>
            <td className="py-2 px-3 text-[11px]">{tx.to}</td>
            <td className="py-2 px-3 text-[11px]">{tx.amount}</td>
            <td className="py-2 px-3 text-[11px]">{tx.token}</td>
            <td className="py-2 px-3 text-[11px]">{tx.price}</td>
            <td className="py-2 px-3 text-[11px] text-right">{tx.value}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default Transactions;
