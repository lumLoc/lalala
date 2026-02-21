import { useState, useEffect } from 'react';

const Settings = () => {
  // Local state with localStorage
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('cryptoCurrency');
      return saved ? JSON.parse(saved) : 'USD';
    } catch {
      return 'USD';
    }
  });

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('cryptoCurrency', JSON.stringify(currency));
    } catch (error) {
      console.error('Error saving:', error);
    }
  }, [currency]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      
      <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Currency</h3>
        <select 
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-4 py-3 bg-[#0B0E11] border border-[#2B3139] rounded-xl text-white focus:border-[#00D4AA] focus:outline-none cursor-pointer"
        >
          <option value="USD" className="bg-[#151A21]">USD - US Dollar</option>
          <option value="EUR" className="bg-[#151A21]">EUR - Euro</option>
          <option value="PHP" className="bg-[#151A21]">PHP - Philippine Peso</option>
        </select>
        <p className="text-[#848E9C] text-sm mt-2">Current: {currency}</p>
      </div>
    </div>
  );
};

export default Settings;