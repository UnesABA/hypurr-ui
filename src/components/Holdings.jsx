const Holdings = () => {
  return (
    <>
      {/* Table Header */}
      <thead className="bg-[#1f1f1f] sticky top-0">
        <tr className="border-b border-slate-700">
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Token
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            <span className="flex items-center gap-2">
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Value
            </span>
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Amount
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Price
          </th>
          <th className="text-left py-4 px-6 text-white font-semibold text-[11px]">
            Rank
          </th>
          <th className="text-right py-4 px-6 text-white font-semibold text-[11px]">
            PnL
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        <tr>
          <td colSpan="6" className="py-12 text-center">
            <span className="text-gray-400 text-sm">No data available</span>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Holdings;