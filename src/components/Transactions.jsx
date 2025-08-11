import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "frontendOpenOrders",
            user: walletAddress,
          }),
        });

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.slice(0, 10).map((order) => {
            // Destructure directly from order (not order.order)
            const { coin, limitPx, origSz, orderType, timestamp } = order;

            // Calculate age from timestamp (minutes only)
            const minutesAgo = Math.floor((Date.now() - timestamp) / 60000);
            const age = `${minutesAgo} minutes ago`;

            // Token from coin (direct from order)
            const token = coin || "UNKNOWN";

            // Price from limitPx with $ appended
            const price = `${parseFloat(limitPx || 0)}$`;

            // Amount from origSz (direct from order)
            const amount = origSz || "0";

            // To from orderType (direct from order)
            const to = orderType || "Unknown";

            // Keep other values unchanged
            const hash = order.oid ? `${order.oid.toString().slice(0, 10)}...` : "unknown...";
            const method = "Order";
            const from = "Arbitrum";
            const value = "0.00$";

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
              status: "success",
            };
          });

          setTransactions(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      {/* Table Header */}
      <thead className="w-[10px] bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="flex items-start text-left py-2 px-3 text-white font-semibold text-[11px]">
            Hash
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-start">
              Method <FaFilter className="bg-body-bg rounded-full" />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              Age <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-start gap-2">
              From <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              To <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              Amount <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              Token <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start">
              Price
            </span>
          </th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-end gap-2">
              $ <FaFilter />
            </span>
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {transactions.map((tx, index) => (
          <tr
            key={index}
            className="transition-colors duration-150 border-b border-gray-700"
          >
            <td className="py-2 px-3">
              <span className="text-teal-400 font-mono text-[10px] underline hover:text-teal-300 cursor-pointer">
                {tx.hash}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-white text-[11px] font-medium rounded-full">
                {tx.method}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-gray-300 text-[11px] flex items-start">
                {tx.age}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-teal-400 text-[11px] underline hover:text-teal-300 cursor-pointer">
                {tx.from}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-white-400 text-[11px] font-medium flex items-start">
                {tx.to}
              </span>
            </td>
            <td className="py-2 px-3">
              <span
                className={`text-[11px] font-semibold flex items-start`}
              >
                {tx.amount}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-white text-[11px] font-medium flex items-start">
                {tx.token}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-gray-300 text-[11px] font-mono flex items-start">
                {tx.price}
              </span>
            </td>
            <td className="py-2 px-3 text-right">
              <span className="text-white text-[11px] font-semibold">
                {tx.value}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default Transactions;
