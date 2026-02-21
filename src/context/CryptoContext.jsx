import { createContext, useState, useContext, useEffect } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  // Use localStorage for currency
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('cryptoCurrency');
    return saved ? JSON.parse(saved) : 'USD';
  });

  const [coins, setCoins] = useState([]);

  // Save to localStorage when currency changes
  useEffect(() => {
    localStorage.setItem('cryptoCurrency', JSON.stringify(currency));
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) throw new Error('useCrypto must be used within CryptoProvider');
  return context;
};