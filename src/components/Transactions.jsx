import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch frontendOpenOrders
        const ordersResponse = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "frontendOpenOrders",
            user: walletAddress,
          }),
        });
        if (!ordersResponse.ok)
          throw new Error(`Orders API error: ${ordersResponse.status}`);
        const ordersData = await ordersResponse.json();

        // 2️⃣ Fetch userDetails
        const detailsResponse = await fetch(
          "https://rpc.hyperliquid.xyz/explorer",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "userDetails",
              user: walletAddress,
            }),
          }
        );
        if (!detailsResponse.ok)
          throw new Error(`UserDetails API error: ${detailsResponse.status}`);
        const detailsData = await detailsResponse.json();

        // Helper to format timestamp
        const formatTimeAgo = (timestamp) => {
          if (!timestamp) return "N/A";
          const diffMs = Date.now() - timestamp;
          if (diffMs < 0) return "Just now";
          const seconds = Math.floor(diffMs / 1000);
          if (seconds < 60)
            return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
          const minutes = Math.floor(diffMs / 60000);
          if (minutes < 60)
            return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
          const hours = Math.floor(diffMs / 3600000);
          if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
          const days = Math.floor(diffMs / 86400000);
          return `${days} day${days !== 1 ? "s" : ""} ago`;
        };

        // Map transactions: match frontendOpenOrders by index with userDetails txs
        const mapped = ordersData.map((order, index) => {
          const matchedTx = detailsData.txs && detailsData.txs[index];
          const hash = matchedTx?.hash || "N/A";
          const method = matchedTx?.action?.type || "order";
          const timestamp = order.timestamp || matchedTx?.time || Date.now();
          const amount = parseFloat(order.sz);
          const price = parseFloat(order.limitPx);
          const totalValue = (amount * price).toFixed(1);

          return {
            hash,
            method,
            age: formatTimeAgo(timestamp),
            from: "Self",
            to: "limit",
            amount: amount.toLocaleString(),
            token: order.coin,
            price: `${price}$`,
            value: `${totalValue}$`,
          };
        });

        setTransactions(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <table className="w-full text-left">
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              Hash
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              Method <FaFilter />
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              Age <FaFilter />
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              From <FaFilter />
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              To <FaFilter />
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              Amount <FaFilter />
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              Token <FaFilter />
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              Price
            </div>
          </th>
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">
              $ <FaFilter />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="9" className="py-12 text-center text-gray-400 text-sm">
              Loading...
            </td>
          </tr>
        ) : transactions.length === 0 ? (
          <tr>
            <td colSpan="9" className="py-12 text-center text-gray-400 text-sm">
              No transactions found
            </td>
          </tr>
        ) : (
          transactions.map((tx, idx) => (
            <tr key={`${tx.hash}-${idx}`} className="border-b border-gray-700">
              <td className="py-2 px-3 text-teal-400 font-mono text-[10px] underline">
                {tx.hash.slice(0, 10)}...
              </td>
              <td className="py-2 px-3 text-white text-[11px] font-medium">
                {tx.method}
              </td>
              <td className="py-2 px-3 text-gray-300 text-[11px]">{tx.age}</td>
              <td className="py-2 px-3 text-teal-400 text-[11px] underline">
                {tx.from}
              </td>
              <td className="py-2 px-3 text-white text-[11px] font-mono">
                {tx.to}
              </td>
              <td className="py-2 px-3 text-white text-[11px] font-semibold">
                {tx.amount}
              </td>
              <td className="py-2 px-3 text-white text-[11px] font-medium">
                {tx.token}
              </td>
              <td className="py-2 px-3 text-gray-300 text-[11px] font-mono">
                {tx.price}
              </td>
              <td className="py-2 px-3 text-white text-[11px] font-semibold">
                {tx.value}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Transactions;
