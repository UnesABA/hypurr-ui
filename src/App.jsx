import "./index.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Overview from "./components/Overview";
import TransactionTable from "./components/TransactionTable";

function App() {
  const [walletAddress, setWalletAddress] = useState("0xc513fbdfdcb114719753f0950e2352a0e194e9ae");

  useEffect(() => {
    const fetchHyperliquidData = async () => {
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
        
        if (data && data.length > 0) {
          const firstEntry = data[0];
          const delta = firstEntry.delta;
          
          // Calculate age in hours
          const currentTime = Date.now();
          const transactionTime = firstEntry.time;
          const ageInHours = Math.floor((currentTime - transactionTime) / (1000 * 60 * 60));
          
          // Extract fields
          const hash = firstEntry.hash;
          const method = delta.type;
          const age = `${ageInHours} hours ago`;
          const from = "Arbitrum";
          const to = (delta.user === walletAddress || delta.destination === walletAddress) ? "Self" : (delta.destination || delta.user);
          const amount = delta.usdc || delta.amount;
          const token = delta.usdc !== undefined ? "USDC" : delta.token;
          
          // Calculate price
          let price;
          if (delta.usdcValue && delta.amount) {
            price = `${(delta.usdcValue / delta.amount).toFixed(2)}$`;
          } else {
            price = "1$";
          }
          
          // Format dollar value
          const dollarValue = `${(delta.usdcValue || delta.usdc || 0)}$`;
          
          console.log("Hyperliquid Transaction Data:");
          console.log("Hash:", hash);
          console.log("Method:", method);
          console.log("Age:", age);
          console.log("From:", from);
          console.log("To:", to);
          console.log("Amount:", amount);
          console.log("Token:", token);
          console.log("Price:", price);
          console.log("Dollar Value:", dollarValue);
        }
      } catch (error) {
        console.error("Error fetching Hyperliquid data:", error);
      }
    };

    fetchHyperliquidData();
  }, []);

  return (
    <div className="bg-body-bg text-white min-h-screen">
      <Header />
      <SearchBar walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
      <div className="flex flex-col">
        <Overview walletAddress={walletAddress} />
        <TransactionTable />
      </div>
    </div>
  );
}

export default App;
