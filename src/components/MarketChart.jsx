import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, ComposedChart } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();

  const chartData = [...coins]
    .sort((a, b) => b.market_cap - a.market_cap)
    .slice(0, 10)
    .map((coin) => ({
      name: coin.symbol.toUpperCase(),
      price: coin.current_price,
      fullName: coin.name,
      change: coin.price_change_percentage_24h,
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#151A21] border border-[#2B3139] rounded-xl p-4 shadow-2xl">
          <p className="font-bold text-white mb-1">{data.fullName}</p>
          <p className="text-[#848E9C] text-sm mb-2">{data.name}</p>
          <p className="text-lg font-mono font-bold text-[#00D4AA]">
            ${data.price.toLocaleString()}
          </p>
          <p className={`text-sm font-medium ${data.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
            {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00D4AA" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" vertical={false} />
          <XAxis dataKey="name" stroke="#848E9C" tick={{ fill: '#848E9C', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#848E9C" tick={{ fill: '#848E9C', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00D4AA', strokeWidth: 1, strokeDasharray: '5 5' }} />
          <Area type="monotone" dataKey="price" stroke="none" fill="url(#colorPrice)" />
          <Line type="monotone" dataKey="price" stroke="#00D4AA" strokeWidth={3} dot={{ fill: '#00D4AA', strokeWidth: 2, r: 4, stroke: '#0B0E11' }} activeDot={{ r: 6, fill: '#00D4AA', stroke: '#fff', strokeWidth: 2 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;