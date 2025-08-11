import { useState } from "react";
import Transactions from "./Transactions";
import Holdings from "./Holdings";
import Perps from "./Perps";
import Orders from "./Orders";
import More from "./More";
import Footer from "./Footer";
import Staking from "./Staking";

const TransactionTable = () => {
  const [activeTab, setActiveTab] = useState("TRANSACTIONS");

  const tabs = [
    "TRANSACTIONS",
    "HOLDINGS",
    "PERPS",
    "ORDERS",
    "VAULTS",
    "STAKING",
    "MORE",
  ];

  const renderTabContent = () => {
  switch (activeTab) {
    case "TRANSACTIONS":
      return <Transactions />;
    case "HOLDINGS":
      return <Holdings />;
    case "PERPS":
      return <Perps />;
    case "ORDERS":
      return <Orders />;
    case "STAKING":
      return <Staking />;
    case "MORE":
      return <More />;
    default:
      return <Transactions />;
  }
};


  return (
    <div className="mx-12 my-4">
      {/* Tab Navigation */}
      <div className="bg-header-bg rounded-t-lg">
        <nav className="flex space-x-0">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-[10px] tracking-wider font-medium cursor-pointer transition-all duration-200 border-b-2
          ${
            activeTab === tab
              ? "border-b-white brightness-125"
              : "border-transparent hover:brightness-110"
          }`}
            >
              {tab}
            </div>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="mx-3 my-3 overflow-x-auto rounded-[10px]">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full bg-[#171b1a] min-w-full">
            {renderTabContent()}
          </table>
        </div>
      </div>

      {/* Footer with pagination */}
      <Footer activeTab={activeTab} />
    </div>
  );
};

export default TransactionTable;
