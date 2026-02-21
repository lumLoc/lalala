import { useCrypto } from '../context/CryptoContext';

const Settings = () => {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      
      <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Currency</h3>
        <select 
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-4 py-3 bg-[#0B0E11] border border-[#2B3139] rounded-xl text-white"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="PHP">PHP - Philippine Peso</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;