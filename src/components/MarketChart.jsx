import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, ComposedChart, BarChart, Bar } from 'recharts';
import { useCrypto } from '../context/CryptoContext';
import { BarChart3, TrendingUp } from 'lucide-react';

const MarketChart = () => {
  const { coins } = useCrypto();
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'

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
    <div className="space-y-4">
      {/* Chart Type Toggle */}
      <div className="flex justify-end">
        <div className="flex bg-[#0B0E11] rounded-xl p-1 border border-[#2B3139]">
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chartType === 'line'
                ? 'bg-[#00D4AA] text-[#0B0E11]'
                : 'text-[#848E9C] hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              chartType === 'bar'
                ? 'bg-[#00D4AA] text-[#0B0E11]'
                : 'text-[#848E9C] hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Bar
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
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
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4AA" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#00B4D8" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" vertical={false} />
              <XAxis dataKey="name" stroke="#848E9C" tick={{ fill: '#848E9C', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#848E9C" tick={{ fill: '#848E9C', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 212, 170, 0.1)' }} />
              <Bar dataKey="price" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;