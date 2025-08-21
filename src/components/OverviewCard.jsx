import { useEffect, useMemo, useState } from "react";

const OverviewCard = ({ walletAddress, stakedOverride = 0 }) => {
  const [loading, setLoading] = useState(true);

  // Perps
  const [perpsTotalUsd, setPerpsTotalUsd] = useState(0);
  const [perpsDistinctCount, setPerpsDistinctCount] = useState(0);

  // Spot
  const [spotTotalUsd, setSpotTotalUsd] = useState(0);
  const [spotNonZeroCount, setSpotNonZeroCount] = useState(0);

  // Vault
  const [vaultTotalUsd] = useState(0);

  // Staked
  const [stakedTotalUsd, setStakedTotalUsd] = useState(stakedOverride);

  useEffect(() => {
    let alive = true;
    if (!walletAddress) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // --- 1) Spot balances + prices ---
        const [balancesRes, midsRes] = await Promise.all([
          fetch("https://api.hyperliquid.xyz/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "spotClearinghouseState",
              user: walletAddress,
            }),
          }),
          fetch("https://api.hyperliquid.xyz/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "allMids" }),
          }),
        ]);

        const balancesJson = await balancesRes.json();
        const midsJson = await midsRes.json();

        let spotSum = 0;
        let spotCount = 0;
        if (balancesJson?.balances && Array.isArray(balancesJson.balances)) {
          for (const b of balancesJson.balances) {
            const total = parseFloat(b?.total ?? 0);
            if (total > 0) {
              spotCount += 1;
              const px = parseFloat(midsJson?.[b.coin] ?? 0);
              spotSum += total * (isFinite(px) ? px : 0);
            }
          }
        }
        if (!alive) return;
        setSpotTotalUsd(spotSum);
        setSpotNonZeroCount(spotCount);

        // --- 2) Perps (first 25 userFills only) ---
        const fillsRes = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "userFills",
            user: walletAddress,
          }),
        });
        const fillsJson = await fillsRes.json();

        let perpsSum = 0;
        const distinctCoins = new Set();

        if (Array.isArray(fillsJson)) {
          const first25 = fillsJson.slice(0, 25);
          for (const f of first25) {
            const px = parseFloat(f?.px ?? 0);
            const sz = parseFloat(f?.sz ?? 0);
            if (f?.coin) distinctCoins.add(f.coin);
            if (isFinite(px) && isFinite(sz)) perpsSum += px * sz;
          }
        }
        if (!alive) return;
        setPerpsTotalUsd(perpsSum);
        setPerpsDistinctCount(distinctCoins.size);

        // --- 3) Staked (from clearinghouseState) ---
        const stakedRes = await fetch("https://api.hyperliquid.xyz/info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "clearinghouseState",
            user: walletAddress,
          }),
        });
        const stakedJson = await stakedRes.json();

        const stakedValue = parseFloat(stakedJson?.userState?.staked ?? stakedOverride ?? 0);
        if (!alive) return;
        setStakedTotalUsd(isFinite(stakedValue) ? stakedValue : 0);

      } catch (e) {
        console.error("Overview fetch error:", e);
        if (!alive) return;
        setSpotTotalUsd(0);
        setSpotNonZeroCount(0);
        setPerpsTotalUsd(0);
        setPerpsDistinctCount(0);
        setStakedTotalUsd(stakedOverride || 0);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchAll();
    const id = setInterval(fetchAll, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [walletAddress, stakedOverride]);

  const overviewTotal = useMemo(
    () => perpsTotalUsd + spotTotalUsd + vaultTotalUsd + stakedTotalUsd,
    [perpsTotalUsd, spotTotalUsd, vaultTotalUsd, stakedTotalUsd]
  );

  const fmtUSD = (n) =>
    `${(n || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}$`;

  return (
    <div className="bg-[#1e2d29] p-2 rounded-[10px] h-[110px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm font-medium">Overview</h3>
        <span className="text-white text-sm font-medium">
          {loading ? "Loading..." : fmtUSD(overviewTotal)}
        </span>
      </div>

      <div className="space-y-[2px] leading-[1.2]">
        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px]">
            Perps{" "}
            <span className="text-white-900 font-semibold text-[11px]">
              ({perpsDistinctCount})
            </span>{" "}
            :
          </span>
          <span className="text-white font-normal text-[11px]">
            {loading ? "Loading..." : fmtUSD(perpsTotalUsd)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px]">
            Spot{" "}
            <span className="text-white-900 font-semibold text-[11px]">
              ({spotNonZeroCount})
            </span>{" "}
            :
          </span>
          <span className="text-white text-[11px]">
            {loading ? "Loading..." : fmtUSD(spotTotalUsd)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px]">Vault :</span>
          <span className="text-white text-[11px]">{fmtUSD(vaultTotalUsd)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white-900 font-normal text-[11px]">Staked :</span>
          <span className="text-white text-[11px]">
            {loading ? "Loading..." : fmtUSD(stakedTotalUsd)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
