import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";
  const previousDataRef = useRef(null);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://rpc.hyperliquid.xyz/explorer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "userDetails",
            user: walletAddress,
          }),
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        if (!data.txs || !Array.isArray(data.txs)) return;

        const currentDataString = JSON.stringify(data.txs);
        if (previousDataRef.current === currentDataString) return;
        previousDataRef.current = currentDataString;

        const formatTimeAgo = (timestamp) => {
          if (!timestamp) return "N/A";
          const diff = Date.now() - timestamp;
          const seconds = Math.floor(diff / 1000);
          if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
          const minutes = Math.floor(seconds / 60);
          if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
          const hours = Math.floor(minutes / 60);
          if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
          const days = Math.floor(hours / 24);
          return `${days} day${days !== 1 ? "s" : ""} ago`;
        };

        // Map transactions and filter out amount = 0
        const mapped = data.txs
          .map((tx, index) => {
            const hash = tx.hash ? `${tx.hash.slice(0, 10)}...` : "N/A";
            const method = tx.action?.type || "N/A";
            const age = formatTimeAgo(tx.time);
            const from = "Self";
            const order = tx.action?.orders?.[0];
            const to = order?.t?.limit ? "limit" : "N/A";
            const amount = order?.s ? parseFloat(order.s) : 0;
            if (amount === 0) return null; // skip 0 amount
            const token = order?.coin || "HYPE";
            const price = order?.p ? `${parseFloat(order.p)}$` : "0$";
            const value = amount && order?.p ? `${(amount * parseFloat(order.p)).toLocaleString()}$` : "$0";

            return {
              hash,
              method,
              age,
              from,
              to,
              amount,
              token,
              price,
              value,
              side: order?.b ? "B" : "S",
              originalIndex: index,
            };
          })
          .filter(Boolean); // remove nulls

        setTransactions(mapped);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTransactions();

    const intervalId = setInterval(fetchAllTransactions, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <table className="w-full border-collapse">
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="py-2 px-3 text-white text-[11px] font-semibold">
            <div className="flex items-center gap-1">Hash</div>
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
            <div className="flex items-center gap-1">Price</div>
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
              Loading all transactions...
            </td>
          </tr>
        ) : transactions.length === 0 ? (
          <tr>
            <td colSpan="9" className="py-12 text-center text-gray-400 text-sm">
              No transactions found
            </td>
          </tr>
        ) : (
          transactions.map((tx, index) => (
            <tr key={`${tx.hash}-${index}`} className="transition-colors duration-150 border-b border-gray-700">
              <td className="py-2 px-3 text-teal-400 font-mono text-[10px] underline hover:text-teal-300">{tx.hash}</td>
              <td className="py-2 px-3 text-white text-[11px] font-medium">{tx.method}</td>
              <td className="py-2 px-3 text-gray-300 text-[11px]">{tx.age}</td>
              <td className="py-2 px-3 text-teal-400 text-[11px] font-mono">{tx.from}</td>
              <td className="py-2 px-3 text-white text-[11px] font-mono">{tx.to}</td>
              <td className={`py-2 px-3 text-[11px] font-semibold ${tx.side === "B" ? "text-green-500" : "text-red-500"}`}>
                {tx.amount.toLocaleString()}
              </td>
              <td className="py-2 px-3 text-white text-[11px] font-medium">{tx.token}</td>
              <td className="py-2 px-3 text-gray-300 text-[11px] font-mono">{tx.price}</td>
              <td className="py-2 px-3 text-white text-[11px] font-semibold">{tx.value}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Transactions;