import { useState, useEffect } from 'react';

const PortfolioDebugger = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);

        const requestBody = [
          { type: "portfolio", user: "0xc513fbdfdcb114719753f0950e2352a0e194e9ae" }
        ];

        const response = await fetch('https://api-ui.hyperliquid.xyz/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setPortfolioData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="p-6 bg-[#0f1419] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Portfolio Data Debugger</h1>
          <p className="text-gray-400">
            Fetching portfolio data from: <span className="text-teal-400 font-mono">https://api-ui.hyperliquid.xyz/info</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">
            User: <span className="text-teal-400 font-mono">0xc513fbdfdcb114719753f0950e2352a0e194e9ae</span>
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            <span className="ml-3 text-white text-lg">Fetching portfolio data...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-red-400 font-bold text-lg">Error Fetching Data</h2>
            </div>
            <p className="text-red-300">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success State - JSON Display */}
        {!loading && !error && portfolioData && (
          <div className="space-y-4">
            {/* Response Info */}
            <div className="bg-[#1e2d29] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">API Response</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-green-400 text-sm flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Success
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* JSON Data Display */}
            <div className="bg-[#1e2d29] rounded-lg overflow-hidden">
              <div className="bg-[#2a3f35] px-4 py-2 border-b border-gray-600">
                <h3 className="text-white font-medium">Portfolio JSON Response</h3>
              </div>
              <div className="p-4">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono leading-relaxed whitespace-pre-wrap border border-gray-700">
                  {JSON.stringify(portfolioData, null, 2)}
                </pre>
              </div>
            </div>

            {/* Copy Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 2));
                  // You could add a toast notification here
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy JSON
              </button>
            </div>

            {/* Quick Stats */}
            {portfolioData[0] && (
              <div className="bg-[#1e2d29] rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Quick Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-[#2a3f35] rounded p-3">
                    <span className="text-gray-400">Response Type:</span>
                    <p className="text-white font-mono">{typeof portfolioData[0]}</p>
                  </div>
                  <div className="bg-[#2a3f35] rounded p-3">
                    <span className="text-gray-400">Data Size:</span>
                    <p className="text-white font-mono">{JSON.stringify(portfolioData).length} chars</p>
                  </div>
                  <div className="bg-[#2a3f35] rounded p-3">
                    <span className="text-gray-400">Keys Count:</span>
                    <p className="text-white font-mono">
                      {portfolioData[0] && typeof portfolioData[0] === 'object' 
                        ? Object.keys(portfolioData[0]).length 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && !portfolioData && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400">No data received from API</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioDebugger;