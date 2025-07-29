const Orders = () => {
  const ordersData = [
    {
      token: "TST-USD(5 orders)",
      side: "BUY",
      price: "0.058673 - 0.058143",
      value: "5,226.758",
      size: "135,141",
    },
    {
      token: "GMT-USD(3 orders)",
      side: "SELL",
      price: "0.048203 - 0.048735",
      value: "4,154.433",
      size: "86,054",
    },
    {
      token: "MANTA-USD(4 orders)",
      side: "BUY",
      price: "0.21847 - 0.218668",
      value: "3,491.465",
      size: "15,975.8",
    },
    {
      token: "PNUT-USD(1 orders)",
      side: "SELL",
      price: "0.26304 - 0.26613",
      value: "3,178.185",
      size: "11,945.3",
    },
    {
      token: "PYTH-USD(3 orders)",
      side: "SELL",
      price: "0.12312 - 0.123105",
      value: "2,865.085",
      size: "23,263",
    },
    {
      token: "BSV-USD(4 orders)",
      side: "SELL",
      price: "28.353 - 28.4463",
      value: "2,755.675",
      size: "97.05",
    },
    {
      token: "MANTA-USD(2 orders)",
      side: "SELL",
      price: "0.21857 - 0.218998",
      value: "2,369.325",
      size: "10,804",
    },
    {
      token: "TST-USD(4 orders)",
      side: "SELL",
      price: "0.058643 - 0.0589463",
      value: "2,300.065",
      size: "60,694",
    },
    {
      token: "SAND-USD(7 orders)",
      side: "SELL",
      price: "0.29439 - 0.294915",
      value: "2,982.695",
      size: "7,747",
    },
    {
      token: "PNUT-USD(2 orders)",
      side: "BUY",
      price: "0.26579 - 0.266855",
      value: "2,167.675",
      size: "8,155",
    },
    {
      token: "UNI-USD(2 orders)",
      side: "SELL",
      price: "10.069 - 10.0715",
      value: "2,033.225",
      size: "202.1",
    },
    {
      token: "MKR-USD(2 orders)",
      side: "SELL",
      price: "2174.5 - 2176.45",
      value: "1,786.35",
      size: "0.82",
    },
    {
      token: "ADA-USD(2 orders)",
      side: "SELL",
      price: "0.78383 - 0.784055",
      value: "1,746.695",
      size: "2,228",
    },
  ];

  return (
    <>
      {/* Table Header */}
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Token
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Side
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Price
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Value
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            Size
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {ordersData.map((order, index) => (
          <tr
            key={index}
            className="transition-colors duration-150 border-b border-gray-700"
          >
            <td className="py-1.5 px-6">
              <span className="text-white text-[11px] font-medium">
                {order.token}
              </span>
            </td>
            <td className="py-1.5 px-6">
              <span
                className={`text-[11px] font-semibold ${
                  order.side === "SELL" ? "text-red-400" : "text-green-400"
                }`}
              >
                {order.side}
              </span>
            </td>
            <td className="py-1.5 px-6">
              <span className="text-gray-300 text-[11px] font-mono">
                {order.price}
              </span>
            </td>
            <td className="py-1.5 px-6">
              <span className="text-white text-[11px] font-medium">
                {order.value}
              </span>
            </td>
            <td className="py-1.5 px-6 text-right">
              <span className="text-gray-300 text-[11px] font-mono">
                {order.size}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default Orders;