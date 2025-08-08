import { useEffect, useState } from "react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Staking = () => {
  const [stakingData, setStakingData] = useState({
    staked: 0,
    pendingWithdrawal: 0,
    stakingBalance: 0,
    fromRewards: 467.08
  });
  const [loading, setLoading] = useState(true);
  const walletAddress = "0xc513fbdfdcb114719753f0950e2352a0e194e9ae";

  useEffect(() => {
    const fetchStakingData = async () => {
      try {
        const response = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "delegatorSummary",
            user: walletAddress,
          }),
        });

        const data = await response.json();

        if (data) {
          const formatNumber = (num) => {
            return parseFloat(num || 0).toFixed(2);
          };

          setStakingData({
            staked: formatNumber(data.delegated),
            pendingWithdrawal: formatNumber(data.totalPendingWithdrawal),
            stakingBalance: "0.00", // Hardcoded as requested
            fromRewards: "467.08" // Hardcoded as requested
          });
        }
      } catch (error) {
        console.error("Error fetching staking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStakingData();
  }, []);
  return (
    <div className="bg-[#1e2d29] rounded-xl shadow-lg overflow-hidden">
      {/* Top Stats Section */}
      <div className="bg-[#171b1a] px-6 py-4">
        {loading ? (
          <div className="text-center">
            <span className="text-gray-400 text-sm">Loading staking data...</span>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <div className="text-left">
              <div className="text-white text-sm font-medium">
                Staked: {stakingData.staked}$
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                from rewards: {stakingData.fromRewards}
              </div>
            </div>
            <div className="text-center">
              <div className="text-white text-sm font-medium">
                Staking balance: {stakingData.stakingBalance}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm font-medium">
                Pending withdrawal: {stakingData.pendingWithdrawal} (0)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delegations Section */}
      <div className="mx-4 my-3">
        <h3 className="text-white text-sm font-medium mb-4 px-2">
          Delegations
        </h3>
        <div className="bg-[#171b1a] rounded-[10px]">
          {/* Delegations Table Header */}
          <div className="flex items-center py-4 px-6 border-b border-gray-700">
            <div className="flex-1 text-left">
              <span className="text-white font-semibold text-[11px]">
                Validator
              </span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-white font-semibold text-[11px]">
                Amount
              </span>
            </div>
            <div className="flex-1 text-right">
              <span className="text-white font-semibold text-[11px]">
                Locked until
              </span>
            </div>
          </div>
          {/* Delegations No Data */}
          <div className="py-12 text-center">
            <span className="text-gray-400 text-sm">No data available</span>
          </div>
          {/* Delegations Footer */}
          <div className="bg-[#1f1f1f] px-4 py-2 flex items-center justify-between border-t border-gray-700 rounded-b-[10px]">
            <div></div>
            <div className="flex items-center gap-3 text-[11px] text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">Items per page:</span>
                <select className="bg-[#2a2a2a] border border-gray-600 hover:border-white rounded px-2 py-1 text-white focus:outline-none focus:border-white text-[11px] min-w-[50px] transition-colors duration-200">
                  <option value="10" className="bg-[#2a2a2a]">
                    10
                  </option>
                  <option value="25" className="bg-[#2a2a2a]">
                    25
                  </option>
                  <option value="50" className="bg-[#2a2a2a]">
                    50
                  </option>
                </select>
              </div>
              <span className="text-gray-300 font-medium">0 to 0 of 0</span>
              <div className="flex items-center gap-1">
                <div
                  className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                  disabled
                >
                  <FirstPageIcon style={{ fontSize: 16 }} />
                </div>
                <div
                  className="w-7 h-7  text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                  disabled
                >
                  <NavigateBeforeIcon style={{ fontSize: 16 }} />
                </div>
                <div
                  className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                  disabled
                >
                  <NavigateNextIcon style={{ fontSize: 16 }} />
                </div>
                <div
                  className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                  disabled
                >
                  <LastPageIcon style={{ fontSize: 16 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History and Rewards Section */}
      <div className="mx-4 mb-4">
        <div className="grid grid-cols-2 gap-6">
          {/* History Section */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4 px-2">
              History
            </h3>
            <div className="bg-[#171b1a] rounded-[10px]">
              {/* History Table Header */}
              <div className="flex items-center py-4 px-4 border-b border-gray-700">
                <div className="flex-1 text-left">
                  <span className="text-white font-semibold text-[11px]">
                    Time
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-white font-semibold text-[11px]">
                    Hash
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-white font-semibold text-[11px]">
                    Method
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-white font-semibold text-[11px]">
                    Amount
                  </span>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-white font-semibold text-[11px]">
                    Details
                  </span>
                </div>
              </div>
              {/* History No Data */}
              <div className="py-12 text-center">
                <span className="text-gray-400 text-sm">No data available</span>
              </div>
              {/* History Footer */}
              <div className="bg-[#1f1f1f] px-4 py-2 flex items-center justify-between border-t border-gray-700 rounded-b-[10px]">
                <div></div>
                <div className="flex items-center gap-3 text-[11px] text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      Items per page:
                    </span>
                    <select className="bg-[#2a2a2a] border border-gray-600 hover:border-white rounded px-2 py-1 text-white focus:outline-none focus:border-white text-[11px] min-w-[50px] transition-colors duration-200">
                      <option value="10" className="bg-[#2a2a2a]">
                        10
                      </option>
                      <option value="25" className="bg-[#2a2a2a]">
                        25
                      </option>
                      <option value="50" className="bg-[#2a2a2a]">
                        50
                      </option>
                    </select>
                  </div>
                  <span className="text-gray-300 font-medium">0 to 0 of 0</span>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <FirstPageIcon style={{ fontSize: 16 }} />
                    </div>
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <NavigateBeforeIcon style={{ fontSize: 16 }} />
                    </div>
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <NavigateNextIcon style={{ fontSize: 16 }} />
                    </div>
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <LastPageIcon style={{ fontSize: 16 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div>
            <h3 className="text-white text-sm font-medium mb-4 px-2">
              Rewards
            </h3>
            <div className="bg-[#171b1a] rounded-[10px]">
              {/* Rewards Table Header */}
              <div className="flex items-center py-4 px-4 border-b border-gray-700">
                <div className="flex-1 text-left">
                  <span className="text-white font-semibold text-[11px]">
                    Time
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-white font-semibold text-[11px]">
                    Source
                  </span>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-white font-semibold text-[11px]">
                    Total Amount
                  </span>
                </div>
              </div>
              {/* Rewards No Data */}
              <div className="py-12 text-center">
                <span className="text-gray-400 text-sm">No data available</span>
              </div>
              {/* Rewards Footer */}
              <div className="bg-[#1f1f1f] px-4 py-2 flex items-center justify-between border-t border-gray-700 rounded-b-[10px]">
                <div></div>
                <div className="flex items-center gap-3 text-[11px] text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      Items per page:
                    </span>
                    <select className="bg-[#2a2a2a] border border-gray-600 hover:border-white rounded px-2 py-1 text-white focus:outline-none focus:border-white text-[11px] min-w-[50px] transition-colors duration-200">
                      <option value="10" className="bg-[#2a2a2a]">
                        10
                      </option>
                      <option value="25" className="bg-[#2a2a2a]">
                        25
                      </option>
                      <option value="50" className="bg-[#2a2a2a]">
                        50
                      </option>
                    </select>
                  </div>
                  <span className="text-gray-300 font-medium">0 to 0 of 0</span>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <FirstPageIcon style={{ fontSize: 16 }} />
                    </div>
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <NavigateBeforeIcon style={{ fontSize: 16 }} />
                    </div>
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <NavigateNextIcon style={{ fontSize: 16 }} />
                    </div>
                    <div
                      className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors"
                      disabled
                    >
                      <LastPageIcon style={{ fontSize: 16 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
