import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";
  const previousDataRef = useRef(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch both APIs simultaneously with individual error handling
        const [explorerResult, fillsResult] = await Promise.allSettled([
          // Fetch hash and method from explorer API
          fetch("https://rpc.hyperliquid.xyz/explorer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "userDetails",
              user: walletAddress,
              n: 50,
            }),
          }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Explorer API error: ${res.status}`)
          ),

          // Fetch To, Amount, Token, Price, and Age from userFills API
          fetch("https://api-ui.hyperliquid.xyz/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "userFills",
              user: walletAddress,
            }),
          }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Fills API error: ${res.status}`)
          ),
        ]);

        // Handle explorer response
        let explorerData = { txs: [] };
        if (explorerResult.status === "fulfilled") {
          const json = explorerResult.value;
          if (json.txs && Array.isArray(json.txs)) {
            explorerData = json;
          }
        } else {
          console.warn("Explorer API failed:", explorerResult.reason);
        }

        // Handle fills response
        let fillsData = [];
        if (fillsResult.status === "fulfilled") {
          if (Array.isArray(fillsResult.value)) {
            fillsData = fillsResult.value;
          }
        } else {
          console.warn("Fills API failed:", fillsResult.reason);
        }

        // Check if data has changed to avoid unnecessary re-renders
        const currentDataString = JSON.stringify({
          txs: explorerData.txs,
          fills: fillsData,
        });
        if (previousDataRef.current === currentDataString) {
          return; // No changes, skip update
        }
        previousDataRef.current = currentDataString;

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

        // Create a map of fills by hash for quick lookup
        const fillsMap = new Map();
        fillsData.forEach((fill) => {
          if (fill.hash) {
            fillsMap.set(fill.hash, fill);
          }
        });

        // Merge data: match each transaction from txs with corresponding fill by hash
        const mapped = explorerData.txs.slice(0, 10).map((tx) => {
          // Hash and Method from explorer data
          const fullHash = tx.hash || "";
          const hash = fullHash ? `${fullHash.slice(0, 10)}...` : "N/A";
          const method = tx.action?.type || "N/A";

          // Find matching fill by hash
          const matchingFill = fillsMap.get(fullHash);

          let to = "N/A";
          let amount = "N/A";
          let token = "N/A";
          let price = "N/A";
          let age = "N/A";

          if (matchingFill) {
            // To - from orderType
            to = matchingFill.orderType || "N/A";

            // Amount - from size with thousand separators
            if (matchingFill.size) {
              amount = new Intl.NumberFormat("en-US").format(parseFloat(matchingFill.size));
            }

            // Token - from coin
            token = matchingFill.coin || "N/A";

            // Price - format with 4 decimals if < 1000, otherwise 2 decimals, followed by $
            if (matchingFill.price) {
              const priceValue = parseFloat(matchingFill.price);
              if (priceValue >= 1000) {
                price = `${priceValue.toFixed(2)}$`;
              } else {
                price = `${priceValue.toFixed(4)}$`;
              }
            }

            // Age - calculated from fill's time, fallback to explorer's time
            const fillTime = matchingFill.time || tx.time;
            age = formatTimeAgo(fillTime);
          } else {
            // Fallback to explorer time if no matching fill
            age = formatTimeAgo(tx.time);
          }

          return {
            hash,
            fullHash,
            method,
            age,
            from: "Arbitrum", // Fixed From column
            to,
            amount,
            token,
            price,
            value: "$0.00", // Fixed $ column
            status: "success",
          };
        });

        setTransactions(mapped);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        // Don't crash the UI, just log the error
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
          <th className="text-left py-2 px-3 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start">
              Hash
            </span>
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
            <span className="flex items-center justify-start">
              Price
            </span>
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
        {transactions.length === 0 ? (
          <tr>
            <td colSpan="9" className="py-12 text-center">
              <span className="text-gray-400 text-sm">Loading transactions...</span>
            </td>
          </tr>
        ) : (
          transactions.map((tx, index) => (
            <tr
              key={`${tx.fullHash}-${index}`}
              className="transition-colors duration-150 border-b border-gray-700"
            >
              <td className="py-2 px-3">
                <span
                  className="text-teal-400 font-mono text-[10px] underline hover:text-teal-300 cursor-pointer flex items-start"
                  title={tx.fullHash}
                >
                  {tx.hash}
                </span>
              </td>
              <td className="py-2 px-3">
                <span className="text-white text-[11px] font-medium flex items-start">
                  {tx.method}
                </span>
              </td>
              <td className="py-2 px-3">
                <span className="text-gray-300 text-[11px] flex items-start">
                  {tx.age}
                </span>
              </td>
              <td className="py-2 px-3">
                <span className="text-teal-400 text-[11px] underline hover:text-teal-300 cursor-pointer flex items-start">
                  {tx.from}
                </span>
              </td>
              <td className="py-2 px-3">
                <span className="text-white-400 text-[11px] font-medium flex items-start">
                  {tx.to}
                </span>
              </td>
              <td className="py-2 px-3">
                <span className="text-white text-[11px] font-semibold flex items-start">
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
              <td className="py-2 px-3">
                <span className="text-white text-[11px] font-semibold">
                  {tx.value}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </>
  );
};

export default Transactions;