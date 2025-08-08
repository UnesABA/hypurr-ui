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
            type: "userNonFundingLedgerUpdates",
            user: walletAddress,
          }),
        });

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.slice(0, 10).map((entry) => {
            const { delta, hash, time } = entry;

            const now = Date.now();
            const ageInHours = Math.floor((now - time) / (1000 * 60 * 60));
            const age = `${ageInHours} hours ago`;

            const shortHash = hash ? `${hash.slice(0, 10)}...` : "unknown...";

            const to =
              delta.user === walletAddress || delta.destination === walletAddress
                ? "Self"
                : "Other";

            const rawAmount = parseFloat(delta.usdc || delta.amount || 0);
            const amount = `+${rawAmount.toFixed(2)}`;

            const token =
              delta.usdc !== undefined
                ? "USDC"
                : delta.token || "UNKNOWN";

            const usdcValue = parseFloat(delta.usdcValue || delta.usdc || 0);
            const value = `${usdcValue.toFixed(2)}$`;

            let price = "1$";
            if (delta.usdcValue && delta.amount) {
              const amt = parseFloat(delta.amount);
              if (amt !== 0) {
                price = (parseFloat(delta.usdcValue) / amt).toFixed(0);
              }
            }

            return {
              hash: shortHash,
              method: delta.type || "Unknown",
              age,
              from: "Arbitrum",
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
            <span className="flex items-center justify-start gap-2">
              Age <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-start gap-2">
              From <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-start gap-2">
              To <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-start gap-2">
              Amount <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-start gap-2">
              Token <FaFilter />
            </span>
          </th>
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            Price
          </th>
          <th className="text-right py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-center justify-start gap-2">
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
            <td className="py-2 px-3 text-gray-300 text-[11px]">
              {tx.age}
            </td>
            <td className="py-2 px-3">
              <span className="text-teal-400 text-[11px] underline hover:text-teal-300 cursor-pointer">
                {tx.from}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-red-400 text-[11px] font-medium">
                {tx.to}
              </span>
            </td>
            <td className="py-2 px-3">
              <span
                className={`text-[11px] font-semibold ${
                  tx.amount.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {tx.amount}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className="text-white text-[11px] font-medium">
                {tx.token}
              </span>
            </td>
            <td className="py-2 px-3 text-gray-300 text-[11px] font-mono">
              {tx.price}
            </td>
            <td className="py-2 px-3 text-white text-[11px] font-semibold">
              {tx.value}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default Transactions;
