const AddressOverview = () => {
  const address = "0x010461c14e146ac35fe42271bdc1134ee31c703a";

  return (
    <div className="mb-8">
      {/* Address Header */}
      <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <span className="text-gray-400 text-sm font-medium">Address:</span>
            <div className="flex items-center space-x-3 mt-2">
              <span className="font-mono text-white text-lg bg-slate-700 px-4 py-2 rounded-lg border border-slate-600">
                {address}
              </span>
              <button className="p-2 text-gray-400 hover:text-teal-400 hover:bg-slate-700 rounded-lg transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Stats */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
            Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-gray-400 font-medium">Port (79)</span>
              <span className="text-white font-bold text-lg">
                116,213,102.42$
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-gray-400 font-medium">Spot</span>
              <span className="text-gray-300 font-semibold">0.00$</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-700">
              <span className="text-gray-400 font-medium">Vault</span>
              <span className="text-gray-300 font-semibold">0.00$</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 font-medium">Staked</span>
              <span className="text-gray-300 font-semibold">0.00$</span>
            </div>
          </div>
        </div>

        {/* Infos */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Infos
          </h3>
          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-2xl font-bold text-white mb-2">
                116,213,102.42$
              </div>
              <div className="text-gray-400 font-mono text-sm bg-slate-600 px-3 py-2 rounded-md">
                0x010461c1...31c703a
              </div>
            </div>
          </div>
        </div>

        {/* Positions */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Positions
            </h3>
            <span className="text-gray-400 text-sm font-semibold bg-slate-700 px-3 py-1 rounded-full">
              240.61.8$
            </span>
          </div>

          {/* Position Bars */}
          <div className="space-y-3">
            <div className="flex space-x-1 h-6 rounded-lg overflow-hidden shadow-inner">
              <div className="bg-red-500 flex-1 hover:bg-red-400 transition-colors cursor-pointer"></div>
              <div className="bg-yellow-500 flex-1 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
              <div className="bg-green-500 flex-1 hover:bg-green-400 transition-colors cursor-pointer"></div>
              <div className="bg-blue-500 flex-1 hover:bg-blue-400 transition-colors cursor-pointer"></div>
              <div className="bg-purple-500 flex-1 hover:bg-purple-400 transition-colors cursor-pointer"></div>
              <div className="bg-pink-500 flex-1 hover:bg-pink-400 transition-colors cursor-pointer"></div>
              <div className="bg-indigo-500 flex-1 hover:bg-indigo-400 transition-colors cursor-pointer"></div>
              <div className="bg-orange-500 flex-1 hover:bg-orange-400 transition-colors cursor-pointer"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 font-medium">
              <span className="bg-slate-700 px-2 py-1 rounded">WLCRD</span>
              <span className="bg-slate-700 px-2 py-1 rounded">LTCUSD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressOverview;
