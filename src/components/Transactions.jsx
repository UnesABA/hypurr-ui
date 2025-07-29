import { FaFilter } from "react-icons/fa";

const Transactions = () => {
  const transactions = [
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "38 seconds ago",
      from: "HIP-2",
      to: "HIP-2",
      amount: "+638.3",
      token: "APTR-USD",
      price: "0.206545",
      value: "377.663",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "38 seconds ago",
      from: "HIP-2",
      to: "HIP-2",
      amount: "+638.3",
      token: "APTR-USD",
      price: "0.206545",
      value: "377.663",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "38 seconds ago",
      from: "HIP-2",
      to: "HIP-2",
      amount: "+638.3",
      token: "APTR-USD",
      price: "0.206545",
      value: "377.663",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Long",
      age: "38 seconds ago",
      from: "HIP-2",
      to: "HIP-2",
      amount: "+1.6",
      token: "GMX-USD",
      price: "1.52355",
      value: "16.785",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "39 seconds ago",
      from: "HIP-2",
      to: "22",
      amount: "5.2",
      token: "MINU-USD",
      price: "0.232188",
      value: "16.725",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "39 seconds ago",
      from: "HIP-2",
      to: "22",
      amount: "5.2",
      token: "MINU-USD",
      price: "0.232188",
      value: "16.725",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "39 seconds ago",
      from: "HIP-2",
      to: "22",
      amount: "5.2",
      token: "MINU-USD",
      price: "0.232188",
      value: "16.725",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "39 seconds ago",
      from: "HIP-2",
      to: "22",
      amount: "5.2",
      token: "MINU-USD",
      price: "0.232188",
      value: "16.725",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "39 seconds ago",
      from: "HIP-2",
      to: "22",
      amount: "5.2",
      token: "MINU-USD",
      price: "0.232188",
      value: "16.725",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Close Long",
      age: "39 seconds ago",
      from: "Sell",
      to: "HIP-2",
      amount: "6.6",
      token: "FIL-USD",
      price: "2.84159",
      value: "19.355",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "40 seconds ago",
      from: "Sell",
      to: "HIP-2",
      amount: "+60.7",
      token: "BUH-USD",
      price: "3.81725",
      value: "746.055",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "40 seconds ago",
      from: "Sell",
      to: "HIP-2",
      amount: "+70.8",
      token: "WLD-USD",
      price: "1.20135",
      value: "340.875",
      status: "success",
    },
    {
      hash: "ba324ea9f...",
      method: "Open Short",
      age: "40 seconds ago",
      from: "Sell",
      to: "HIP-2",
      amount: "+11.1",
      token: "WLD-USD",
      price: "1.20135",
      value: "659.335",
      status: "success",
    },
  ];

  return (
    <>
      {/* Table Header */}
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="flex items-start text-left py-4 px-6 text-white font-semibold text-[11px]">
            Hash
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start">
              Method <FaFilter className="bg-body-bg rounded-full" />
            </span>
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              Age <FaFilter />
            </span>
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              From <FaFilter />
            </span>
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              To <FaFilter />
            </span>
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              Amount <FaFilter />
            </span>
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            <span className="flex items-start justify-start gap-2">
              Token <FaFilter />
            </span>
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Price
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
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
            <td className="py-1.5 px-6">
              <span className="text-teal-400 font-mono text-[10px] underline hover:text-teal-300 hover:underline cursor-pointer transition-colors">
                {tx.hash}
              </span>
            </td>
            <td className="py-1.5 px-6">
              <span className="text-white text-[11px] font-medium rounded-full">
                {tx.method}
              </span>
            </td>
            <td className="py-1.5 px-6 text-gray-300 text-[11px]">
              {tx.age}
            </td>
            <td className="py-1.5 px-6">
              <span className="text-teal-400 text-[11px] underline hover:text-teal-300 hover:underline cursor-pointer transition-colors rounded">
                {tx.from}
              </span>
            </td>
            <td className="py-1.5 px-6">
              {tx.to && (
                <span className="text-red-400 text-[11px] font-medium rounded">
                  {tx.to}
                </span>
              )}
            </td>
            <td className="py-1.5 px-6">
              {tx.amount && (
                <span
                  className={`text-[11px] font-semibold rounded ${
                    tx.amount.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.amount}
                </span>
              )}
            </td>
            <td className="py-1.5 px-6">
              <span className="text-white text-[11px] font-medium rounded">
                {tx.token}
              </span>
            </td>
            <td className="py-1.5 px-6 text-gray-300 text-[11px] font-mono">
              {tx.price}
            </td>
            <td className="py-1.5 px-6 flex items-center justify-start text-right text-white text-[11px] font-semibold">
              {tx.value}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default Transactions;