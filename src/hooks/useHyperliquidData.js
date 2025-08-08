import { useState, useEffect } from 'react';

const useHyperliquidData = () => {
  const [data, setData] = useState({
    universe: null,
    tokens: null,
    prices: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHyperliquidData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://api.hyperliquid.xyz/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type: 'spotMetaAndAssetCtxs' }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        setData({
          universe: result.universe || null,
          tokens: result.tokens || null,
          prices: result.prices || null
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Hyperliquid data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHyperliquidData();
  }, []);

  return { ...data, loading, error };
};

export default useHyperliquidData;