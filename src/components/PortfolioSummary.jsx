import { useState, useEffect } from 'react';

const PortfolioSummary = () => {
  const [data, setData] = useState({
    portfolio: null,
    userFees: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);

        const payload = [
          { type: "portfolio", user: "0xc513fbdfdcb114719753f0950e2352a0e194e9ae" },
          { type: "userFees", user: "0xc513fbdfdcb114719753f0950e2352a0e194e9ae" }
        ];

        const response = await fetch('https://api-ui.hyperliquid.xyz/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // The API returns an array with responses for each request
        setData({
          portfolio: result[0] || null,
          userFees: result[1] || null
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value) => {
    if (!value && value !== 0) return '0.00%';
    return `${(parseFloat(value) * 100).toFixed(4)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <span className="ml-3 text-white">Loading portfolio data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 m-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-400 font-medium">Error loading portfolio data</span>
        </div>
        <p className="text-red-300 text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Portfolio Summary Card */}
      <div className="bg-[#1e2d29] rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          Portfolio Summary
        </h2>
        
        {data.portfolio ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Account Value */}
            <div className="bg-[#2a3f35] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Account Value</h3>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(data.portfolio.marginSummary?.accountValue)}
              </p>
            </div>

            {/* Total PnL */}
            <div className="bg-[#2a3f35] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total PnL</h3>
              <p className={`text-2xl font-bold ${
                parseFloat(data.portfolio.marginSummary?.totalPnl || 0) >= 0 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}>
                {formatCurrency(data.portfolio.marginSummary?.totalPnl)}
              </p>
            </div>

            {/* Total Margin Used */}
            <div className="bg-[#2a3f35] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Margin Used</h3>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(data.portfolio.marginSummary?.totalMarginUsed)}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No portfolio data available</p>
        )}

        {/* Open Positions */}
        {data.portfolio?.assetPositions && data.portfolio.assetPositions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Open Positions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 text-gray-400 font-medium">Asset</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Size</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Entry Price</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Mark Price</th>
                    <th className="text-right py-2 text-gray-400 font-medium">PnL</th>
                  </tr>
                </thead>
                <tbody>
                  {data.portfolio.assetPositions.map((position, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-2 text-white font-medium">{position.position?.coin}</td>
                      <td className="py-2 text-right text-white">{position.position?.szi}</td>
                      <td className="py-2 text-right text-gray-300">{position.position?.entryPx}</td>
                      <td className="py-2 text-right text-gray-300">{position.position?.markPx}</td>
                      <td className={`py-2 text-right font-medium ${
                        parseFloat(position.position?.unrealizedPnl || 0) >= 0 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {formatCurrency(position.position?.unrealizedPnl)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* User Fees Card */}
      <div className="bg-[#1e2d29] rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Trading Fees
        </h2>
        
        {data.userFees ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Maker Fee */}
            <div className="bg-[#2a3f35] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Maker Fee Rate</h3>
              <p className="text-xl font-bold text-white">
                {formatPercentage(data.userFees.makerRate)}
              </p>
            </div>

            {/* Taker Fee */}
            <div className="bg-[#2a3f35] rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Taker Fee Rate</h3>
              <p className="text-xl font-bold text-white">
                {formatPercentage(data.userFees.takerRate)}
              </p>
            </div>

            {/* Total Fees Paid */}
            {data.userFees.totalFeesPaid && (
              <div className="bg-[#2a3f35] rounded-lg p-4 md:col-span-2">
                <h3 className="text-gray-400 text-sm font-medium mb-1">Total Fees Paid</h3>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(data.userFees.totalFeesPaid)}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400">No fee data available</p>
        )}
      </div>

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-800 rounded-lg p-4 text-xs">
          <h3 className="text-white font-bold mb-2">Debug Data</h3>
          <pre className="text-gray-300 overflow-auto max-h-40">
            {JSON.stringify({ portfolio: data.portfolio, userFees: data.userFees }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PortfolioSummary;