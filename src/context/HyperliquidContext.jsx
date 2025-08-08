import React, { createContext, useContext } from 'react';
import useHyperliquidData from '../hooks/useHyperliquidData';

const HyperliquidContext = createContext();

export const HyperliquidProvider = ({ children }) => {
  const hyperliquidData = useHyperliquidData();

  return (
    <HyperliquidContext.Provider value={hyperliquidData}>
      {children}
    </HyperliquidContext.Provider>
  );
};

export const useHyperliquid = () => {
  const context = useContext(HyperliquidContext);
  if (!context) {
    throw new Error('useHyperliquid must be used within a HyperliquidProvider');
  }
  return context;
};

export default HyperliquidContext;